/**
 * Seed the home-page internship highlight texts (badge/title/body/
 * bullets/cta) into SiteContent group "home". Idempotent.
 * Run: npx tsx scripts/seed-home-internship.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const ROWS = [
  { key: 'home.internship.badge', value: 'Онцлох хөтөлбөр', label: 'Интерншип — badge', multiline: false, order: 20 },
  { key: 'home.internship.title', value: 'Япон улсад цалинтай дадлага хий', label: 'Интерншип — гарчиг', multiline: false, order: 21 },
  { key: 'home.internship.body', value: 'Сард 150,000 иений (≈2.5 сая төгрөг) цалинтай практик дадлага. 2014 оноос Монгол улсад анх удаа нэвтэрсэн интерншип хөтөлбөр.', label: 'Интерншип — тайлбар', multiline: true, order: 22 },
  { key: 'home.internship.bullets', value: 'Япон улсын зочид буудал, ресторан, халуун рашаанд дадлага\nЯпон хэлний дадлага + цалин\nЯпон соёл, ёс заншилтай танилцах боломж', label: 'Интерншип — жагсаалт (мөр тус бүр = нэг мөр)', multiline: true, order: 23 },
  { key: 'home.internship.cta', value: 'Дэлгэрэнгүй мэдэх', label: 'Интерншип — товчны текст', multiline: false, order: 24 },
];

async function main() {
  let created = 0, skipped = 0;
  for (const r of ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: r.key } });
    if (ex) { skipped++; continue; }
    await prisma.siteContent.create({ data: { key: r.key, group: 'home', type: 'TEXT', value: r.value, label: r.label, multiline: r.multiline, order: r.order } });
    created++;
  }
  console.log(`Created: ${created}  Skipped: ${skipped}`);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
