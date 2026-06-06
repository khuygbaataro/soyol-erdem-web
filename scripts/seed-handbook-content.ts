/**
 * One-shot: add the student handbook PDF URL field to SiteContent.
 * Idempotent — safe to re-run.
 *
 * Run:
 *   npx tsx scripts/seed-handbook-content.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const key = 'student-life.handbook.fileUrl';
  const existing = await prisma.siteContent.findUnique({ where: { key } });
  if (existing) {
    console.log('✅ Already exists — skipped.');
    return;
  }
  await prisma.siteContent.create({
    data: {
      key,
      group: 'student-life',
      type: 'IMAGE',           // IMAGE type → FileUpload component renders in admin
      value: '',               // Admin will upload the PDF here
      label: 'Гарын авлага — PDF файл',
      hint: 'PDF-г upload хийсний дараа оюутны амьдрал хуудсанд "Нээж унших" товч гарч ирнэ.',
      multiline: false,
      order: 999,
    },
  });
  console.log('✅ Created student-life.handbook.fileUrl in SiteContent.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
