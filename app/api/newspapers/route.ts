import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { newspaperSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export async function GET() {
  const items = await prisma.newspaper.findMany({
    orderBy: { issueNumber: 'desc' },
  });
  return NextResponse.json({ data: items });
}

export async function POST(req: Request) {
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

  const exists = await prisma.newspaper.findUnique({
    where: { issueNumber: parsed.data.issueNumber },
  });
  if (exists) {
    return NextResponse.json(
      { error: `№${parsed.data.issueNumber} дугаартай хэвлэл аль хэдийн байна` },
      { status: 409 },
    );
  }

  const item = await prisma.newspaper.create({
    data: {
      issueNumber: parsed.data.issueNumber,
      title: parsed.data.title || null,
      fileUrl: parsed.data.fileUrl,
      coverImage: parsed.data.coverImage || null,
      status: parsed.data.status,
      publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null,
    },
  });
  return NextResponse.json({ data: item }, { status: 201 });
}
