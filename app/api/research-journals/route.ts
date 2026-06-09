import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';
export const dynamic = 'force-dynamic';
export async function GET() {
  const items = await prisma.researchJournal.findMany({ where: { active: true }, orderBy: { order: 'asc' } });
  return NextResponse.json(items);
}
export async function POST(req: Request) {
  await requireRole(['ADMIN']);
  const d = await req.json();
  const item = await prisma.researchJournal.create({
    data: { slug: d.slug, title: d.title, subtitle: d.subtitle, volume: Number(d.volume), year: Number(d.year), issue: d.issue, fileUrl: d.fileUrl, cover: d.cover || null, active: d.active ?? true, order: Number(d.order) || 0 },
  });
  return NextResponse.json(item, { status: 201 });
}
