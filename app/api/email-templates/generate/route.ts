import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireApiUser } from '@/lib/auth-helpers';
import { categoryForProgram, defaultProgramTemplate } from '@/lib/program-email';

export const dynamic = 'force-dynamic';

/**
 * Create one default email template per active program that doesn't already
 * have one (matched by category). Idempotent — re-running only fills gaps.
 */
export async function POST() {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const programs = await prisma.program.findMany({
    where: { active: true },
    select: { name: true, slug: true, department: true },
    orderBy: { order: 'asc' },
  });
  const existing = await prisma.emailTemplate.findMany({ select: { category: true } });
  const taken = new Set(existing.map((t) => t.category));

  let created = 0;
  let order = 100;
  for (const p of programs) {
    const category = categoryForProgram(p);
    if (taken.has(category)) continue;
    const tpl = defaultProgramTemplate(p);
    await prisma.emailTemplate.create({
      data: {
        name: tpl.name,
        category,
        subject: tpl.subject,
        body: tpl.body,
        locale: 'MN',
        active: true,
        order: order++,
      },
    });
    taken.add(category);
    created++;
  }

  return NextResponse.json({ created, totalPrograms: programs.length });
}
