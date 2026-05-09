import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { jobOpeningSchema } from '@/lib/validation';
import { slugify } from '@/lib/admin-helpers';

interface RouteParams {
  params: { id: string };
}

export async function PUT(req: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = jobOpeningSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const updated = await prisma.jobOpening
    .update({
      where: { id: params.id },
      data: {
        slug: slugify(data.slug),
        title: data.title,
        description: data.description || null,
        active: data.active ?? true,
        order: data.order,
      },
    })
    .catch(() => null);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await prisma.jobOpening.delete({ where: { id: params.id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
