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

  // positionKey can repeat freely now (multi-staff per node) — no
  // duplicate guard needed.

  const item = await prisma.staff.update({
    where: { id: params.id },
    data: {
      positionKey: parsed.data.positionKey,
      position: parsed.data.position,
      name: parsed.data.name,
      degree: parsed.data.degree || null,
      photo: parsed.data.photo || null,
      bio: parsed.data.bio || null,
      positionEn: parsed.data.positionEn || null,
      positionJa: parsed.data.positionJa || null,
      degreeEn: parsed.data.degreeEn || null,
      degreeJa: parsed.data.degreeJa || null,
      bioEn: parsed.data.bioEn || null,
      bioJa: parsed.data.bioJa || null,
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
