import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { regulationSchema } from '@/lib/validation';
import { slugify } from '@/lib/admin-helpers';

interface Params {
  params: { id: string };
}

export async function PUT(req: Request, { params }: Params) {
  const session = await auth();
  if (
    !session?.user ||
    !['ADMIN', 'EDITOR'].includes(session.user.role as string)
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = regulationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const d = parsed.data;
  const updated = await prisma.regulation
    .update({
      where: { id: params.id },
      data: {
        slug: slugify(d.slug),
        title: d.title,
        description: d.description || null,
        fileUrl: d.fileUrl,
        coverImage: d.coverImage || null,
        status: d.status,
        order: d.order,
      },
    })
    .catch(() => null);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await prisma.regulation.delete({ where: { id: params.id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
