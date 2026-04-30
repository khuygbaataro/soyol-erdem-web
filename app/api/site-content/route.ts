import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { siteContentBulkSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const group = url.searchParams.get('group') ?? undefined;
  const items = await prisma.siteContent.findMany({
    where: group ? { group } : undefined,
    orderBy: [{ group: 'asc' }, { order: 'asc' }],
  });
  return NextResponse.json({ data: items });
}

/** Bulk upsert by key — admin form posts all visible items at once. */
export async function PUT(req: Request) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  const json = await req.json().catch(() => null);
  const parsed = siteContentBulkSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const updates = await prisma.$transaction(
    parsed.data.items.map((item) =>
      prisma.siteContent.update({
        where: { key: item.key },
        data: { value: item.value },
      }),
    ),
  );
  return NextResponse.json({ data: updates });
}
