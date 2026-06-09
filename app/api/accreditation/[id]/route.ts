import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';
export const dynamic = 'force-dynamic';
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await requireRole(['ADMIN']);
  const d = await req.json();
  const item = await prisma.accreditation.update({ where: { id: params.id }, data: { year: Number(d.year), title: d.title, image: d.image, active: d.active ?? true, order: Number(d.order) || 0 } });
  return NextResponse.json(item);
}
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await requireRole(['ADMIN']);
  await prisma.accreditation.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
