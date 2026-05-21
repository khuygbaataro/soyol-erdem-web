/**
 * One-shot: rename the banner SiteContent label "Хамтын ажиллагаа
 * хуудасны banner" → "Гадаад харилцаа хуудасны banner" so the admin
 * panel reflects the new public-side section name.
 *
 * Only updates the `label` column (admin display); leaves the value
 * (uploaded URL) untouched. Idempotent.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.siteContent.update({
    where: { key: 'page.international.banner' },
    data: { label: 'Гадаад харилцаа хуудасны banner' },
  });
  console.log(`✔ label updated → ${result.label}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
