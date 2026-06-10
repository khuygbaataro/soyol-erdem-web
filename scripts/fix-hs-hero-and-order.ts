/**
 * 1) Seed hero title/subtitle keys for HS about/programs/admission/contact/
 *    cooperation pages + navbar header.address.
 * 2) Re-sequence ahlah-programs SiteContent `order` to match page flow so
 *    the admin panel reads cleanly top-to-bottom (no interleaving).
 * Idempotent. Run: npx tsx scripts/fix-hs-hero-and-order.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Row = { key: string; group: string; value: string; label: string; multiline?: boolean; order: number };

const HERO_ROWS: Row[] = [
  { key: 'ahlah-about.hero.title', group: 'ahlah-about', value: 'ТАНИЛЦУУЛГА', label: 'Hero — гарчиг', order: 2 },
  { key: 'ahlah-about.hero.subtitle', group: 'ahlah-about', value: 'Нийслэлийн Ерөнхий боловсролын Соёл Эрдэм сургууль — япон хэл, соёл, мэдээллийн технологийн чиглэлээр төрөлжсөн ахлах сургууль.', label: 'Hero — доод текст', multiline: true, order: 3 },
  { key: 'ahlah-programs.hero.title', group: 'ahlah-programs', value: 'СУРГАЛТ', label: 'Hero — гарчиг', order: 2 },
  { key: 'ahlah-admission.hero.title', group: 'ahlah-admission', value: 'ЭЛСЭЛТ', label: 'Hero — гарчиг', order: 2 },
  { key: 'ahlah-admission.hero.subtitle', group: 'ahlah-admission', value: 'Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн 10-р ангид элсэх журам, шаардлага.', label: 'Hero — доод текст', multiline: true, order: 3 },
  { key: 'ahlah-contact.hero.title', group: 'ahlah-contact', value: 'ХОЛБОО БАРИХ', label: 'Hero — гарчиг', order: 2 },
  { key: 'ahlah-contact.hero.subtitle', group: 'ahlah-contact', value: 'Лавлах, элсэлт, хамтын ажиллагааны санал — бидэнтэй чөлөөтэй холбоо барина уу.', label: 'Hero — доод текст', multiline: true, order: 3 },
  { key: 'ahlah-cooperation.hero.title', group: 'ahlah-cooperation', value: 'ХАМТЫН АЖИЛЛАГАА', label: 'Hero — гарчиг', order: 2 },
  { key: 'header.address', group: 'footer', value: 'Сүхбаатар дүүрэг, Улаанбаатар', label: 'Navbar дээд талын хаяг', order: 5 },
];

// New order for every ahlah-programs key, matching the page section flow.
const PROGRAM_ORDER: Record<string, number> = {
  'ahlah-programs.hero.image': 1,
  'ahlah-programs.hero.title': 2,
  'ahlah-programs.hero.subtitle': 3,
  'ahlah-programs.structure.title': 10,
  'ahlah-programs.structure.subtitle': 11,
  'ahlah-programs.structure.1.title': 12,
  'ahlah-programs.structure.1.description': 13,
  'ahlah-programs.structure.2.title': 14,
  'ahlah-programs.structure.2.description': 15,
  'ahlah-programs.structure.3.title': 16,
  'ahlah-programs.structure.3.description': 17,
  'ahlah-programs.levels.title': 20,
  'ahlah-programs.levels.subtitle': 21,
  'ahlah-programs.levels.elementary.name': 22,
  'ahlah-programs.levels.elementary.education': 23,
  'ahlah-programs.levels.elementary.curriculum': 24,
  'ahlah-programs.levels.elementary.extracurricular': 25,
  'ahlah-programs.levels.middle.name': 26,
  'ahlah-programs.levels.middle.education': 27,
  'ahlah-programs.levels.middle.curriculum': 28,
  'ahlah-programs.levels.middle.extracurricular': 29,
  'ahlah-programs.levels.high.name': 30,
  'ahlah-programs.levels.high.education': 31,
  'ahlah-programs.levels.high.curriculum': 32,
  'ahlah-programs.levels.high.extracurricular': 33,
  'ahlah-programs.culture.title': 40,
  'ahlah-programs.culture.subtitle': 41,
  'ahlah-programs.culture.items': 42,
  'ahlah-programs.jp.badge': 50,
  'ahlah-programs.jp.title': 51,
  'ahlah-programs.jp.body': 52,
  'ahlah-programs.jp.1.tag': 53,
  'ahlah-programs.jp.1.title': 54,
  'ahlah-programs.jp.1.bullets': 55,
  'ahlah-programs.jp.2.tag': 56,
  'ahlah-programs.jp.2.title': 57,
  'ahlah-programs.jp.2.bullets': 58,
  'ahlah-programs.jp.3.tag': 59,
  'ahlah-programs.jp.3.title': 60,
  'ahlah-programs.jp.3.bullets': 61,
  'ahlah-programs.it.badge': 70,
  'ahlah-programs.it.title': 71,
  'ahlah-programs.it.body': 72,
  'ahlah-programs.it.1.title': 73,
  'ahlah-programs.it.1.body': 74,
  'ahlah-programs.it.2.title': 75,
  'ahlah-programs.it.2.body': 76,
  'ahlah-programs.it.3.title': 77,
  'ahlah-programs.it.3.body': 78,
  'ahlah-programs.it.4.title': 79,
  'ahlah-programs.it.4.body': 80,
  'ahlah-programs.resources.title': 90,
  'ahlah-programs.resources.1.title': 91,
  'ahlah-programs.resources.1.body': 92,
  'ahlah-programs.resources.2.title': 93,
  'ahlah-programs.resources.2.body': 94,
  'ahlah-programs.resources.3.title': 95,
  'ahlah-programs.resources.3.body': 96,
};

async function main() {
  // 1) Hero + header.address
  let created = 0, skipped = 0;
  for (const r of HERO_ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: r.key } });
    if (ex) { skipped++; continue; }
    await prisma.siteContent.create({ data: { key: r.key, group: r.group, type: 'TEXT', value: r.value, label: r.label, multiline: r.multiline ?? false, order: r.order } });
    created++;
  }
  console.log(`Hero/header: created ${created}, skipped ${skipped}`);

  // 2) Re-order ahlah-programs
  let updated = 0;
  for (const [key, order] of Object.entries(PROGRAM_ORDER)) {
    const res = await prisma.siteContent.updateMany({ where: { key }, data: { order } });
    updated += res.count;
  }
  console.log(`Re-ordered ${updated} ahlah-programs rows.`);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
