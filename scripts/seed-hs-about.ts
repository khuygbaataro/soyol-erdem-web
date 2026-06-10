/**
 * Seed editable about-page sections (stats, director message, partnerships)
 * into SiteContent group ahlah-about. Idempotent.
 * Run: npx tsx scripts/seed-hs-about.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Row = { key: string; value: string; label: string; multiline?: boolean; order: number };

const ROWS: Row[] = [
  // Stats band
  { key: 'ahlah-about.stat.1.value', value: '2023', label: 'Статистик 1 — тоо', order: 40 },
  { key: 'ahlah-about.stat.1.label', value: 'Үүсгэн байгуулагдсан', label: 'Статистик 1 — тайлбар', order: 41 },
  { key: 'ahlah-about.stat.2.value', value: '100%', label: 'Статистик 2 — тоо', order: 42 },
  { key: 'ahlah-about.stat.2.label', value: 'Мэргэжлийн багш', label: 'Статистик 2 — тайлбар', order: 43 },
  { key: 'ahlah-about.stat.3.value', value: '11+', label: 'Статистик 3 — тоо', order: 44 },
  { key: 'ahlah-about.stat.3.label', value: 'Мэргэжлийн багш нар', label: 'Статистик 3 — тайлбар', order: 45 },
  { key: 'ahlah-about.stat.4.value', value: '2', label: 'Статистик 4 — тоо', order: 46 },
  { key: 'ahlah-about.stat.4.label', value: 'Япон хэлний багш', label: 'Статистик 4 — тайлбар', order: 47 },

  // Director's message
  { key: 'ahlah-about.director.title', value: 'ЗАХИРЛЫН МЭНДЧИЛГЭЭ', label: 'Захирал — хэсгийн гарчиг', order: 50 },
  { key: 'ahlah-about.director.name', value: 'Д. Эрдэнэцэцэг', label: 'Захирал — нэр', order: 51 },
  { key: 'ahlah-about.director.role', value: 'Захирал · Соёл Эрдэм Ахлах сургууль', label: 'Захирал — албан тушаал', order: 52 },
  { key: 'ahlah-about.director.body.1', value: 'Манай сургуулийг үүсгэн байгуулагч Макихара Соичи гуайны итгэл найдвар, япон улсын 100% хөрөнгө оруулалтаар 1996 онд эх сургууль Соёл Эрдэм Дээд Сургууль үүсэн байгуулагдсанаас хойш ~1500 төгсөгчийг бэлтгэж, тэдгээрийн 40 орчим хувь нь Япон улсад суралцаж, ажиллаж байна.', label: 'Захирал — 1-р догол мөр', multiline: true, order: 53 },
  { key: 'ahlah-about.director.body.2', value: 'Энэхүү 30 гаруй жилийн япон судлалын баялаг туршлагаа үндэс болгож, бид 2023 онд ахлах сургуулиа байгуулсан. Багш, ажилтан, сурагч, эцэг эх, хамтрагч байгууллагууд та бүхэндээ халуун мэндчилгээ дэвшүүлж байна.', label: 'Захирал — 2-р догол мөр', multiline: true, order: 54 },
  { key: 'ahlah-about.director.body.3', value: 'Бид олон улсын стандартын дагуу боловсрол олгож, монгол сэтгэлгээ, япон ёс, чанартай ажлын зан үйлийг хослуулсан мэргэжилтнүүдийг бэлтгэхийг эрхэмлэн ажилладаг. Соёл Эрдэм сурагч байх нь зөвхөн хичээл биш — нэг гэр бүлийн гишүүн болохыг хэлнэ.', label: 'Захирал — 3-р догол мөр', multiline: true, order: 55 },

  // Japan partnerships
  { key: 'ahlah-about.partnerships.title', value: 'ЯПОН УЛСТАЙ ХАМТЫН АЖИЛЛАГАА', label: 'Хамтын ажиллагаа — гарчиг', order: 60 },
  { key: 'ahlah-about.partnerships.subtitle', value: 'Эх сургууль Соёл Эрдэм ДС-ийн япон сүлжээтэй хамтран сурагчдад дараах боломжуудыг олгодог.', label: 'Хамтын ажиллагаа — дэд гарчиг', multiline: true, order: 61 },
  { key: 'ahlah-about.partnerships.item.1', value: '50–100% хүртэлх тэтгэлэгт хөтөлбөрүүд', label: 'Хамтын ажиллагаа — 1', order: 62 },
  { key: 'ahlah-about.partnerships.item.2', value: 'Япон руу хэлний практик дадлага (сард ~2.5 сая төгрөгийн цалинтай)', label: 'Хамтын ажиллагаа — 2', order: 63 },
  { key: 'ahlah-about.partnerships.item.3', value: '2+2 болон 1+3 солилцооны хөтөлбөр', label: 'Хамтын ажиллагаа — 3', order: 64 },
  { key: 'ahlah-about.partnerships.item.4', value: 'Япон засгийн газрын Монбукагакүшо тэтгэлэг', label: 'Хамтын ажиллагаа — 4', order: 65 },
  { key: 'ahlah-about.partnerships.item.5', value: 'Оберлин их сургуультай байгаль-экологийн жил тутмын дадлага', label: 'Хамтын ажиллагаа — 5', order: 66 },
  { key: 'ahlah-about.partnerships.item.6', value: 'Риккёо, Чюоүгакүин их сургуулиудтай судалгааны хамтын ажиллагаа', label: 'Хамтын ажиллагаа — 6', order: 67 },
];

async function main() {
  let created = 0, skipped = 0;
  for (const r of ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: r.key } });
    if (ex) { skipped++; continue; }
    await prisma.siteContent.create({ data: { key: r.key, group: 'ahlah-about', type: 'TEXT', value: r.value, label: r.label, multiline: r.multiline ?? false, order: r.order } });
    created++;
  }
  console.log(`Created: ${created}  Skipped: ${skipped}`);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
