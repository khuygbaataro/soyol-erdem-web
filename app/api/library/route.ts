import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { librarySchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export async function GET() {
  const books = await prisma.libraryBook.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ data: books });
}

export async function POST(req: Request) {
  const { error } = await requireApiUser(['ADMIN', 'LIBRARIAN']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = librarySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }
  const book = await prisma.libraryBook.create({
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
  return NextResponse.json({ data: book }, { status: 201 });
}
