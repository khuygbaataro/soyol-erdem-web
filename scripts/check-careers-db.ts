/**
 * Diagnostic: list every JobOpening row in the production DB so we
 * can tell whether admin /admin/careers/new entries are actually
 * being persisted (vs. being rejected by validation / silently
 * dropped).
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const all = await prisma.jobOpening.findMany({
    orderBy: [{ order: 'asc' }, { title: 'asc' }],
  });
  console.log(`Total JobOpening rows in DB: ${all.length}`);
  for (const o of all) {
    console.log(
      `  • [${o.active ? 'ACTIVE' : 'HIDDEN'}] order=${o.order} ` +
        `slug=${o.slug} title=${JSON.stringify(o.title)}`,
    );
  }
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
