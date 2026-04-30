import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { statSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const item = await prisma.stat.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: item });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  const json = await req.json().catch(() => null);
  const parsed = statSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const stat = await prisma.stat.update({
    where: { id: params.id },
    data: {
      key: parsed.data.key,
      icon: parsed.data.icon,
      number: parsed.data.number,
      label: parsed.data.label,
      order: parsed.data.order,
      active: parsed.data.active ?? true,
    },
  });
  return NextResponse.json({ data: stat });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  await prisma.stat.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
