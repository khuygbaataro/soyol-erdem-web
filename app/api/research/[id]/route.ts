import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { researchSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

interface Ctx { params: { id: string } }

export async function PUT(req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'RESEARCHER']);
  if (error) return error;
  const json = await req.json().catch(() => null);
  const parsed = researchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }
  const item = await prisma.research.update({
    where: { id: params.id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      abstract: parsed.data.abstract,
      authors: parsed.data.authors,
      type: parsed.data.type,
      area: parsed.data.area,
      fileUrl: parsed.data.fileUrl || null,
      status: parsed.data.status,
      publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null,
    },
  });
  return NextResponse.json({ data: item });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'RESEARCHER']);
  if (error) return error;
  await prisma.research.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
