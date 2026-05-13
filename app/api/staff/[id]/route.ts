import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { staffSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

interface Ctx {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Ctx) {
  const item = await prisma.staff.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: item });
}

export async function PUT(req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = staffSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Block clashes if the positionKey moves to a value already used by
  // another row.
  const clash = await prisma.staff.findFirst({
    where: { positionKey: parsed.data.positionKey, NOT: { id: params.id } },
  });
  if (clash) {
    return NextResponse.json(
      { error: 'Энэ албан тушаалын мэдээлэл өөр бичлэгт орсон байна' },
      { status: 409 },
    );
  }

  const item = await prisma.staff.update({
    where: { id: params.id },
    data: {
      positionKey: parsed.data.positionKey,
      position: parsed.data.position,
      name: parsed.data.name,
      degree: parsed.data.degree || null,
      photo: parsed.data.photo || null,
      bio: parsed.data.bio || null,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      active: parsed.data.active ?? true,
      order: parsed.data.order ?? 0,
    },
  });
  return NextResponse.json({ data: item });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  await prisma.staff.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
