/**
 * Move ahlah-footer.* keys into their own "ahlah-footer" group (new
 * "Footer ба Navbar" admin tab), seed the shared bottom CTA banner
 * title/subtitle, and re-order. Idempotent.
 * Run: npx tsx scripts/migrate-hs-footer-group.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const moved = await prisma.siteContent.updateMany({
    where: { key: { startsWith: 'ahlah-footer.' } },
    data: { group: 'ahlah-footer' },
  });
  console.log('Moved', moved.count, 'keys to group ahlah-footer');

  const ROWS = [
    { key: 'ahlah-footer.banner.title', value: 'Соёл Эрдэм Ахлах Сургуульд тавтай морил', label: 'Banner (footer дээрх) — гарчиг', multiline: false, order: 1 },
    { key: 'ahlah-footer.banner.subtitle', value: 'Япон хэл, соёл, мэдээллийн технологийг хосолсон чанартай боловсрол.', label: 'Banner (footer дээрх) — доод текст', multiline: true, order: 2 },
  ];
  let created = 0, skipped = 0;
  for (const r of ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: r.key } });
    if (ex) { skipped++; continue; }
    await prisma.siteContent.create({ data: { key: r.key, group: 'ahlah-footer', type: 'TEXT', value: r.value, label: r.label, multiline: r.multiline, order: r.order } });
    created++;
  }
  console.log('Banner keys: created', created, 'skipped', skipped);

  const ORDER: Record<string, number> = {
    'ahlah-footer.banner.title': 1,
    'ahlah-footer.banner.subtitle': 2,
    'ahlah-footer.tagline': 10,
    'ahlah-footer.phone.primary': 11,
    'ahlah-footer.phone.secondary': 12,
    'ahlah-footer.email': 13,
    'ahlah-footer.address': 14,
  };
  for (const [key, order] of Object.entries(ORDER)) {
    await prisma.siteContent.updateMany({ where: { key }, data: { order } });
  }
  console.log('Re-ordered footer keys');
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
