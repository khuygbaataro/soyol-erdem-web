import { NextResponse } from 'next/server';
import type { Site } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { newsSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const siteParam = url.searchParams.get('site');
  const site =
    siteParam === 'HIGH_SCHOOL' || siteParam === 'UNIVERSITY'
      ? (siteParam as Site)
      : undefined;

  const news = await prisma.news.findMany({
    where: site ? { site } : undefined,
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { id: true, name: true } } },
  });
  return NextResponse.json({ data: news });
}

export async function POST(req: Request) {
  const { user, error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = newsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }

  const exists = await prisma.news.findUnique({ where: { slug: parsed.data.slug } });
  if (exists) {
    return NextResponse.json({ error: 'Энэ slug аль хэдийн байна' }, { status: 409 });
  }

  const gallery = (parsed.data.gallery ?? []).filter(
    (u) => typeof u === 'string' && u.trim().length > 0,
  );

  const news = await prisma.news.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      body: parsed.data.body,
      coverImage: parsed.data.coverImage || null,
      gallery: gallery.length > 0 ? JSON.stringify(gallery) : null,
      titleEn: parsed.data.titleEn || null,
      titleJa: parsed.data.titleJa || null,
      excerptEn: parsed.data.excerptEn || null,
      excerptJa: parsed.data.excerptJa || null,
      bodyEn: parsed.data.bodyEn || null,
      bodyJa: parsed.data.bodyJa || null,
      category: parsed.data.category,
      status: parsed.data.status,
      site: parsed.data.site ?? 'UNIVERSITY',
      publishedAt: parsed.data.publishedAt
        ? new Date(parsed.data.publishedAt)
        : parsed.data.status === 'PUBLISHED'
          ? new Date()
          : null,
      authorId: user.id,
    },
  });
  return NextResponse.json({ data: news }, { status: 201 });
}
