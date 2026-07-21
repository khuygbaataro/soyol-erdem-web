import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireApiUser } from '@/lib/auth-helpers';

/** Гэрээ устгах (админ). */
export async function DELETE(
  _req: Request,
  { params }: { params: { token: string } },
) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  await prisma.studentContract
    .delete({ where: { token: params.token } })
    .catch(() => null);

  return NextResponse.json({ ok: true });
}
