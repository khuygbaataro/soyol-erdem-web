import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { newsSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

interface Ctx {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Ctx) {
  const news = await prisma.news.findUnique({
    where: { id: params.id },
    include: { author: { select: { id: true, name: true } } },
  });
  if (!news) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: news });
}

export async function PUT(req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = newsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }

  const news = await prisma.news.update({
    where: { id: params.id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      body: parsed.data.body,
      coverImage: parsed.data.coverImage || null,
      category: parsed.data.category,
      status: parsed.data.status,
      publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null,
    },
  });
  return NextResponse.json({ data: news });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;
  await prisma.news.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
