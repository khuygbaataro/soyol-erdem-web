import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { researchSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export async function GET() {
  const items = await prisma.research.findMany({
    orderBy: { createdAt: 'desc' },
    include: { uploadedBy: { select: { id: true, name: true } } },
  });
  return NextResponse.json({ data: items });
}

export async function POST(req: Request) {
  const { user, error } = await requireApiUser(['ADMIN', 'RESEARCHER']);
  if (error) return error;
  const json = await req.json().catch(() => null);
  const parsed = researchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }
  const exists = await prisma.research.findUnique({ where: { slug: parsed.data.slug } });
  if (exists) {
    return NextResponse.json({ error: 'Энэ slug аль хэдийн байна' }, { status: 409 });
  }
  const item = await prisma.research.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      abstract: parsed.data.abstract,
      authors: parsed.data.authors,
      type: parsed.data.type,
      area: parsed.data.area,
      fileUrl: parsed.data.fileUrl || null,
      status: parsed.data.status,
      publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : (parsed.data.status === 'PUBLISHED' ? new Date() : null),
      uploadedById: user.id,
    },
  });
  return NextResponse.json({ data: item }, { status: 201 });
}
