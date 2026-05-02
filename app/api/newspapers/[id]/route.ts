import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { newspaperSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

interface Ctx {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Ctx) {
  const item = await prisma.newspaper.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: item });
}

export async function PUT(req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = newspaperSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Block clashes if the issueNumber moves to a value that already exists.
  const clash = await prisma.newspaper.findFirst({
    where: { issueNumber: parsed.data.issueNumber, NOT: { id: params.id } },
  });
  if (clash) {
    return NextResponse.json(
      { error: `№${parsed.data.issueNumber} дугаартай хэвлэл аль хэдийн байна` },
      { status: 409 },
    );
  }

  const item = await prisma.newspaper.update({
    where: { id: params.id },
    data: {
      issueNumber: parsed.data.issueNumber,
      title: parsed.data.title || null,
      fileUrl: parsed.data.fileUrl,
      coverImage: parsed.data.coverImage || null,
      status: parsed.data.status,
      publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null,
    },
  });
  return NextResponse.json({ data: item });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;
  await prisma.newspaper.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
