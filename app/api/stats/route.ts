import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { statSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await prisma.stat.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ data: items });
}

export async function POST(req: Request) {
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
  const exists = await prisma.stat.findUnique({ where: { key: parsed.data.key } });
  if (exists) {
    return NextResponse.json({ error: 'Энэ key аль хэдийн байна' }, { status: 409 });
  }
  const stat = await prisma.stat.create({
    data: {
      key: parsed.data.key,
      icon: parsed.data.icon,
      number: parsed.data.number,
      label: parsed.data.label,
      order: parsed.data.order,
      active: parsed.data.active ?? true,
    },
  });
  return NextResponse.json({ data: stat }, { status: 201 });
}
