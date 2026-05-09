import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { jobOpeningSchema } from '@/lib/validation';
import { slugify } from '@/lib/admin-helpers';

/** GET — public list of openings (active only by default). */
export async function GET(req: Request) {
  const includeInactive = new URL(req.url).searchParams.get('all') === '1';
  const session = await auth();
  // Only authenticated admins can request the inactive ones.
  const all = includeInactive && !!session?.user;

  const items = await prisma.jobOpening
    .findMany({
      where: all ? {} : { active: true },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
    })
    .catch(() => []);
  return NextResponse.json(items);
}

/** POST — admin creates a new opening. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = jobOpeningSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const created = await prisma.jobOpening.create({
    data: {
      slug: slugify(data.slug),
      title: data.title,
      description: data.description || null,
      active: data.active ?? true,
      order: data.order,
    },
  });
  return NextResponse.json(created, { status: 201 });
}
