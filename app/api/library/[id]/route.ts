import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { librarySchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

interface Ctx { params: { id: string } }

export async function GET(_req: Request, { params }: Ctx) {
  const book = await prisma.libraryBook.findUnique({ where: { id: params.id } });
  if (!book) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: book });
}

export async function PUT(req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'LIBRARIAN']);
  if (error) return error;
  const json = await req.json().catch(() => null);
  const parsed = librarySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }
  const book = await prisma.libraryBook.update({
    where: { id: params.id },
    data: {
      title: parsed.data.title,
      author: parsed.data.author,
      isbn: parsed.data.isbn || null,
      language: parsed.data.language,
      category: parsed.data.category,
      publisher: parsed.data.publisher || null,
      publishYear: parsed.data.publishYear,
      totalCopies: parsed.data.totalCopies,
      availableCopies: parsed.data.availableCopies,
      coverImage: parsed.data.coverImage || null,
      description: parsed.data.description || null,
      shelfLocation: parsed.data.shelfLocation || null,
    },
  });
  return NextResponse.json({ data: book });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'LIBRARIAN']);
  if (error) return error;
  await prisma.libraryBook.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
