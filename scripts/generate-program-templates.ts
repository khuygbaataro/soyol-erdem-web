/**
 * Хөтөлбөр бүрд анхдагч имэйл загвар үүсгэнэ (загваргүй байгаад нь).
 * /admin/email-templates дэх "Хөтөлбөр бүрээр загвар үүсгэх" товчтой ижил
 * логик, гэхдээ CLI-аас нэг удаа ажиллуулахад зориулав.
 *
 * Ажиллуулах:
 *   DATABASE_URL='postgres://...' npx tsx scripts/generate-program-templates.ts
 */
import { PrismaClient } from '@prisma/client';
import { categoryForProgram, defaultProgramTemplate } from '../lib/program-email';

const prisma = new PrismaClient();

async function main() {
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
    console.log(`+ ${tpl.name}  (category=${category})`);
  }
  console.log(`✔ done. created=${created}, programs=${programs.length}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
