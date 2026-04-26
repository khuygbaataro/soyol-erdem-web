import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireApiUser } from '@/lib/auth-helpers';

interface Ctx { params: { id: string } }

export async function DELETE(_req: Request, { params }: Ctx) {
  const { user, error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  if (params.id === user.id) {
    return NextResponse.json({ error: 'Та өөрийгөө устгаж болохгүй' }, { status: 400 });
  }
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
