/**
 * 1) Delete the now-removed IT-detail SiteContent keys (ahlah-programs.it.*).
 * 2) Seed news hero title/subtitle (ahlah-news) + Green Jade keys
 *    (ahlah-programs.jade.*) so they become admin-editable.
 * Idempotent. Run: npx tsx scripts/fix-programs-jade-news.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Row = { key: string; group: string; value: string; label: string; multiline?: boolean; order: number };

const ROWS: Row[] = [
  // News hero
  { key: 'ahlah-news.hero.title', group: 'ahlah-news', value: 'МЭДЭЭ МЭДЭЭЛЭЛ', label: 'Hero — гарчиг', order: 2 },
  { key: 'ahlah-news.hero.subtitle', group: 'ahlah-news', value: 'Ахлах сургуулийн сүүлийн мэдээ, үйл явдал, амжилт.', label: 'Hero — доод текст', multiline: true, order: 3 },

  // Green Jade
  { key: 'ahlah-programs.jade.badge', group: 'ahlah-programs', value: 'Ногоон Жэйд боловсролын төв', label: 'Жэйд — badge', order: 100 },
  { key: 'ahlah-programs.jade.title', group: 'ahlah-programs', value: 'Олон улсад суралцах хувилбар (Ногоон Жэйд)', label: 'Жэйд — гарчиг', order: 101 },
  { key: 'ahlah-programs.jade.body', group: 'ahlah-programs', value: '"Ногоон Жэйд" боловсролын төв нь 2013 оноос Соёл Эрдэм Ахлах Сургуультай хамтран Англи, АНУ, Австрали, Канад зэрэг 10+ улсын 500+ их, дээд сургуультай зуучлал явуулж байна. Жил бүр 6,000+ оюутан зөвлөгөө авч, бэлдсэн сурагчдын 98% нь хүссэн сургуульдаа элсэн ордог. Манай сурагч ахлах ангиа төгсмөгцөө гадаадад үргэлжлүүлэн суралцах бэлэн замыг санал болгож байна.', label: 'Жэйд — тайлбар', multiline: true, order: 102 },
  { key: 'ahlah-programs.jade.stat.1.value', group: 'ahlah-programs', value: '10+', label: 'Жэйд статистик 1 — тоо', order: 103 },
  { key: 'ahlah-programs.jade.stat.1.label', group: 'ahlah-programs', value: 'жилийн туршлага', label: 'Жэйд статистик 1 — тайлбар', order: 104 },
  { key: 'ahlah-programs.jade.stat.2.value', group: 'ahlah-programs', value: '500+', label: 'Жэйд статистик 2 — тоо', order: 105 },
  { key: 'ahlah-programs.jade.stat.2.label', group: 'ahlah-programs', value: 'хамтрагч сургууль', label: 'Жэйд статистик 2 — тайлбар', order: 106 },
  { key: 'ahlah-programs.jade.stat.3.value', group: 'ahlah-programs', value: '98%', label: 'Жэйд статистик 3 — тоо', order: 107 },
  { key: 'ahlah-programs.jade.stat.3.label', group: 'ahlah-programs', value: 'хүссэн сургуульдаа ордог', label: 'Жэйд статистик 3 — тайлбар', order: 108 },
  { key: 'ahlah-programs.jade.stat.4.value', group: 'ahlah-programs', value: '99%', label: 'Жэйд статистик 4 — тоо', order: 109 },
  { key: 'ahlah-programs.jade.stat.4.label', group: 'ahlah-programs', value: 'визний амжилт', label: 'Жэйд статистик 4 — тайлбар', order: 110 },
  { key: 'ahlah-programs.jade.services.title', group: 'ahlah-programs', value: 'Санал болгож буй үйлчилгээ', label: 'Жэйд — үйлчилгээний гарчиг', order: 111 },
  { key: 'ahlah-programs.jade.service.1.title', group: 'ahlah-programs', value: "Kid's English", label: 'Жэйд үйлч. 1 — гарчиг', order: 112 },
  { key: 'ahlah-programs.jade.service.1.body', group: 'ahlah-programs', value: 'Бага насны (5+) хүүхдийн англи хэлний 5 түвшний сургалт — олон улсад хүлээн зөвшөөрөгдсөн хөтөлбөрөөр.', label: 'Жэйд үйлч. 1 — тайлбар', multiline: true, order: 113 },
  { key: 'ahlah-programs.jade.service.2.title', group: 'ahlah-programs', value: 'Junior English', label: 'Жэйд үйлч. 2 — гарчиг', order: 114 },
  { key: 'ahlah-programs.jade.service.2.body', group: 'ahlah-programs', value: '11–14 насны өсвөрийн англи хэлний сонирхолтой сургалт — дүрэм, унших, бичих, ярих, сонсох 4 чадварыг зэрэг хөгжүүлнэ.', label: 'Жэйд үйлч. 2 — тайлбар', multiline: true, order: 115 },
  { key: 'ahlah-programs.jade.service.3.title', group: 'ahlah-programs', value: 'General English', label: 'Жэйд үйлч. 3 — гарчиг', order: 116 },
  { key: 'ahlah-programs.jade.service.3.body', group: 'ahlah-programs', value: 'Ахлах ангид болон насанд хүрэгчдэд зориулсан 5-шатлалт ерөнхий англи хэлний сургалт — Англи, Монгол багштай.', label: 'Жэйд үйлч. 3 — тайлбар', multiline: true, order: 117 },
  { key: 'ahlah-programs.jade.service.4.title', group: 'ahlah-programs', value: 'IELTS бэлтгэл', label: 'Жэйд үйлч. 4 — гарчиг', order: 118 },
  { key: 'ahlah-programs.jade.service.4.body', group: 'ahlah-programs', value: 'IELTS-д өндөр оноо авах системтэй бэлтгэл — цаг хуваарилах, оновчтой хариулах дадал суулгана.', label: 'Жэйд үйлч. 4 — тайлбар', multiline: true, order: 119 },
  { key: 'ahlah-programs.jade.service.5.title', group: 'ahlah-programs', value: 'NIFY — Олон улсын суурь хөтөлбөр', label: 'Жэйд үйлч. 5 — гарчиг', order: 120 },
  { key: 'ahlah-programs.jade.service.5.body', group: 'ahlah-programs', value: 'Австралийн Eynesbury College-ийн Navitas International Foundation Year, Австралид үргэлжлүүлэн суралцахад зориулсан албан ёсны хөтөлбөр.', label: 'Жэйд үйлч. 5 — тайлбар', multiline: true, order: 121 },
  { key: 'ahlah-programs.jade.service.6.title', group: 'ahlah-programs', value: 'OXFY — Олон улсын суурь хөтөлбөр', label: 'Жэйд үйлч. 6 — гарчиг', order: 122 },
  { key: 'ahlah-programs.jade.service.6.body', group: 'ahlah-programs', value: 'Oxford International Foundation Year — Англид суралцах хүсэлтэй сурагчдад мэргэжлийн багш нар дор их сургуулийн түвшний хичээлийг үзүүлнэ.', label: 'Жэйд үйлч. 6 — тайлбар', multiline: true, order: 123 },
  { key: 'ahlah-programs.jade.service.7.title', group: 'ahlah-programs', value: 'Боловсрол зуучлал', label: 'Жэйд үйлч. 7 — гарчиг', order: 124 },
  { key: 'ahlah-programs.jade.service.7.body', group: 'ahlah-programs', value: '500+ их, дээд сургууль, 150–500 мэргэжлээс сонгон тэтгэлэгтэй элсэх зуучлалын үйлчилгээ — материал бүрдүүлэх, өргөдөл явуулах, виз авах хүртэл бүх алхамд дэмжинэ.', label: 'Жэйд үйлч. 7 — тайлбар', multiline: true, order: 125 },
  { key: 'ahlah-programs.jade.countries.title', group: 'ahlah-programs', value: 'Хамтрагч улсууд', label: 'Жэйд — улсуудын гарчиг', order: 126 },
  { key: 'ahlah-programs.jade.countries', group: 'ahlah-programs', value: 'Англи · Америк · Австрали · Канад · Швейцар · Хятад · Голланд · Унгар · Сингапур · Япон', label: 'Жэйд — хамтрагч улсууд', multiline: true, order: 127 },
];

async function main() {
  // 1) Delete IT-detail keys (section removed from page)
  const del = await prisma.siteContent.deleteMany({ where: { key: { startsWith: 'ahlah-programs.it.' } } });
  console.log(`Deleted ${del.count} ahlah-programs.it.* rows.`);

  // 2) Seed news hero + Green Jade
  let created = 0, skipped = 0;
  for (const r of ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: r.key } });
    if (ex) { skipped++; continue; }
    await prisma.siteContent.create({ data: { key: r.key, group: r.group, type: 'TEXT', value: r.value, label: r.label, multiline: r.multiline ?? false, order: r.order } });
    created++;
  }
  console.log(`Created ${created}, skipped ${skipped}`);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
