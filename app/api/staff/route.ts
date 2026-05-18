import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { staffSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export async function GET() {
  const items = await prisma.staff.findMany({
    orderBy: [{ order: 'asc' }, { position: 'asc' }],
  });
  return NextResponse.json({ data: items });
}

export async function POST(req: Request) {
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

  const exists = await prisma.staff.findUnique({
    where: { positionKey: parsed.data.positionKey },
  });
  if (exists) {
    return NextResponse.json(
      { error: `Энэ албан тушаалын мэдээлэл аль хэдийн орсон байна` },
      { status: 409 },
    );
  }

  const item = await prisma.staff.create({
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
  return NextResponse.json({ data: item }, { status: 201 });
}
