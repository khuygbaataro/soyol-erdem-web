import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireApiUser } from '@/lib/auth-helpers';

interface Ctx {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const item = await prisma.highSchoolApplication.findUnique({
    where: { id: params.id },
  });
  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ data: item });
}

/** Toggle / set `read` flag. Body: `{ read: boolean }`. */
export async function PATCH(req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const body = (await req.json().catch(() => ({}))) as { read?: boolean };
  const read = typeof body.read === 'boolean' ? body.read : true;

  const item = await prisma.highSchoolApplication.update({
    where: { id: params.id },
    data: { read },
  });
  return NextResponse.json({ data: item });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  await prisma.highSchoolApplication.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
