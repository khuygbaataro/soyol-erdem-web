import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { regulationSchema } from '@/lib/validation';
import { slugify } from '@/lib/admin-helpers';

/** GET — public list of PUBLISHED regulations by `order`. */
export async function GET(req: Request) {
  const includeAll = new URL(req.url).searchParams.get('all') === '1';
  const session = await auth();
  const all = includeAll && !!session?.user;

  const items = await prisma.regulation
    .findMany({
      where: all ? {} : { status: 'PUBLISHED' },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    })
    .catch(() => []);
  return NextResponse.json(items);
}

export async function POST(req: Request) {
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
  const created = await prisma.regulation.create({
    data: {
      slug: slugify(d.slug),
      title: d.title,
      description: d.description || null,
      fileUrl: d.fileUrl,
      coverImage: d.coverImage || null,
      status: d.status,
      order: d.order,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
