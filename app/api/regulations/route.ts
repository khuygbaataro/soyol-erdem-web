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
  try {
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
  } catch (err) {
    return mapPrismaError(err);
  }
}

/**
 * Translate the common Prisma failure modes into a human-friendly JSON
 * error so the admin toast surfaces the real issue instead of "
 * Хадгалахад алдаа гарлаа".
 */
function mapPrismaError(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.error('[regulations] prisma error:', message);

  // Table-doesn't-exist — happens when `prisma db push` hasn't been run
  // against the production DB after schema additions.
  if (
    message.includes('does not exist in the current database') ||
    message.includes('"Regulation"') ||
    /relation .* does not exist/i.test(message) ||
    message.includes('P2021')
  ) {
    return NextResponse.json(
      {
        error:
          'Production DB-д "Regulation" хүснэгт байхгүй байна. Vercel CLI-аар DATABASE_URL татаад `npm run db:push` ажиллуулна уу.',
      },
      { status: 500 },
    );
  }

  // Unique-constraint — duplicate slug.
  if (message.includes('Unique constraint') || message.includes('P2002')) {
    return NextResponse.json(
      { error: 'Энэ slug-тэй журам аль хэдийн бүртгэгдсэн байна.' },
      { status: 409 },
    );
  }

  return NextResponse.json(
    { error: 'Сервер дээр алдаа гарлаа. Дахин оролдоно уу.' },
    { status: 500 },
  );
}
