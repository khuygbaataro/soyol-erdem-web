/**
 * Seed high-school home page + footer editable texts into SiteContent.
 * Group: ahlah-home (footer keys use ahlah-footer prefix but same group).
 * Idempotent — safe to re-run.
 * Run: npx tsx scripts/seed-hs-home.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Row = { key: string; value: string; label: string; hint?: string; multiline?: boolean; order: number };

const ROWS: Row[] = [
  // Hero
  { key: 'ahlah-home.hero.title', value: 'СОЁЛ ЭРДЭМ СУРГУУЛЬ', label: 'Hero гарчиг', order: 1 },

  // Philosophy
  { key: 'ahlah-home.philosophy.1.label', value: 'Алсын хараа', label: 'Зорилго 1 — label', order: 30 },
  { key: 'ahlah-home.philosophy.1.title', value: 'Тэргүүлэгч төрөлжсөн ЕБС', label: 'Зорилго 1 — гарчиг', order: 31 },
  { key: 'ahlah-home.philosophy.1.body', value: 'Япон хэл, соёл болон Мэдээллийн технологийн төрөлжсөн ахлах сургуулийн хувьд тэргүүлэгч ЕБС болох.', label: 'Зорилго 1 — текст', multiline: true, order: 32 },
  { key: 'ahlah-home.philosophy.2.label', value: 'Эрхэм зорилго', label: 'Зорилго 2 — label', order: 33 },
  { key: 'ahlah-home.philosophy.2.title', value: 'Чадварлаг багш — Чанартай боловсрол', label: 'Зорилго 2 — гарчиг', order: 34 },
  { key: 'ahlah-home.philosophy.2.body', value: 'Хичээнгүй суралцагч, чадварлаг багш, Япон хэл соёлд тулгуурласан чанартай боловсрол.', label: 'Зорилго 2 — текст', multiline: true, order: 35 },
  { key: 'ahlah-home.philosophy.3.label', value: 'Үнэт зүйл', label: 'Зорилго 3 — label', order: 36 },
  { key: 'ahlah-home.philosophy.3.title', value: 'С · Э · А · С', label: 'Зорилго 3 — гарчиг', order: 37 },
  { key: 'ahlah-home.philosophy.3.body', value: 'С – Соёл уламжлалаа дээдэлсэн · Э – Эрдэм мэдлэгийг эрхэмлэсэн · А – Амьдрах арга ухаанд суралцсан · С – Сурлагын хоцрогдолгүй суралцагч бэлтгэх.', label: 'Зорилго 3 — текст', multiline: true, order: 38 },

  // Stats
  { key: 'ahlah-home.stat.1.value', value: '2023', label: 'Статистик 1 — тоо', order: 40 },
  { key: 'ahlah-home.stat.1.label', value: 'Үүсгэн байгуулагдсан он', label: 'Статистик 1 — тайлбар', order: 41 },
  { key: 'ahlah-home.stat.2.value', value: '100%', label: 'Статистик 2 — тоо', order: 42 },
  { key: 'ahlah-home.stat.2.label', value: 'Мэргэжлийн багшийн бүрэлдэхүүн', label: 'Статистик 2 — тайлбар', order: 43 },
  { key: 'ahlah-home.stat.3.value', value: '2+2', label: 'Статистик 3 — тоо', order: 44 },
  { key: 'ahlah-home.stat.3.label', value: 'Япон-Монгол солилцоо', label: 'Статистик 3 — тайлбар', order: 45 },
  { key: 'ahlah-home.stat.4.value', value: 'N5–N2', label: 'Статистик 4 — тоо', order: 46 },
  { key: 'ahlah-home.stat.4.label', value: 'Япон хэлний түвшин', label: 'Статистик 4 — тайлбар', order: 47 },

  // Programs
  { key: 'ahlah-home.program.1.title', value: 'Япон хэл, соёл', label: 'Хөтөлбөр 1 — гарчиг', order: 50 },
  { key: 'ahlah-home.program.1.description', value: 'Эх хэлтэй багш нар JLPT-д тулгуурлан N5–N2 хүртэл түвшинд хүргэж, япон уламжлал, ёс заншил, соёлтой бүрэн танилцуулна.', label: 'Хөтөлбөр 1 — тайлбар', multiline: true, order: 51 },
  { key: 'ahlah-home.program.2.title', value: 'Төрөлжсөн IT', label: 'Хөтөлбөр 2 — гарчиг', order: 52 },
  { key: 'ahlah-home.program.2.description', value: 'Алгоритм, хэл, веб болон AI-ийн үндсэн ойлголтыг сурагч төвтэй, оролцооны аргаар заана. AI-Digital-IT мэргэжлийн сургуультай 2+2 солилцоо.', label: 'Хөтөлбөр 2 — тайлбар', multiline: true, order: 53 },
  { key: 'ahlah-home.program.3.title', value: 'Бүрэн дунд боловсрол', label: 'Хөтөлбөр 3 — гарчиг', order: 54 },
  { key: 'ahlah-home.program.3.description', value: '10–11 ангийн ердийн хичээлийн хөтөлбөрийг шинжлэх ухаан, эрэгцүүлэхүйд тулгуурласан аргачлалаар сурагч төвтэй заана.', label: 'Хөтөлбөр 3 — тайлбар', multiline: true, order: 55 },
  { key: 'ahlah-home.program.4.title', value: '2+2 Солилцооны хөтөлбөр', label: 'Хөтөлбөр 4 — гарчиг', order: 56 },
  { key: 'ahlah-home.program.4.description', value: 'AI-Digital-IT мэргэжлийн сургуультай хамтарсан 2+2 хөтөлбөрөөр оюутнууд бэлэн мэргэжилтэй болно.', label: 'Хөтөлбөр 4 — тайлбар', multiline: true, order: 57 },

  // Highlights
  { key: 'ahlah-home.highlights.title', value: 'ОНЦЛОХ АРГА ХЭМЖЭЭ, АМЖИЛТ', label: 'Онцлох — гарчиг', order: 60 },
  { key: 'ahlah-home.highlight.1.title', value: 'Бүнкёосай — Соёлын наадам', label: 'Онцлох 1 — гарчиг', order: 61 },
  { key: 'ahlah-home.highlight.1.body', value: 'Япон уламжлалт "Бүнкёосай" наадмыг 26 удаа дараалан амжилттай зохион байгуулсан.', label: 'Онцлох 1 — текст', multiline: true, order: 62 },
  { key: 'ahlah-home.highlight.2.title', value: '"Алтан бүргэд" медаль', label: 'Онцлох 2 — гарчиг', order: 63 },
  { key: 'ahlah-home.highlight.2.body', value: 'Математикийн багш С. Боозоо "Алтан бүргэд" медалаар шагнагдсан.', label: 'Онцлох 2 — текст', multiline: true, order: 64 },
  { key: 'ahlah-home.highlight.3.title', value: 'Спортын аварга', label: 'Онцлох 3 — гарчиг', order: 65 },
  { key: 'ahlah-home.highlight.3.body', value: 'Сагсан бөмбөг, гар бөмбөгийн аварга шалгаруулах тэмцээнд эзэн болж байсан.', label: 'Онцлох 3 — текст', multiline: true, order: 66 },
  { key: 'ahlah-home.highlight.4.title', value: 'Эмнэлэгийн дадлага', label: 'Онцлох 4 — гарчиг', order: 67 },
  { key: 'ahlah-home.highlight.4.body', value: 'Бүс нутгийн эмнэлэгүүдтэй хамтран эрүүл мэндийн чиглэлээр дадлага хийдэг.', label: 'Онцлох 4 — текст', multiline: true, order: 68 },

  // Contact
  { key: 'ahlah-home.contact.eyebrow', value: 'Холбоо барих', label: 'Холбоо — eyebrow текст', order: 70 },
  { key: 'ahlah-home.contact.title', value: 'Бидэнтэй холбоо барих', label: 'Холбоо — гарчиг', order: 71 },
  { key: 'ahlah-home.contact.phone.label', value: 'Утас', label: 'Холбоо — утасны label', order: 72 },
  { key: 'ahlah-home.contact.phone.primary', value: '7011-8589', label: 'Холбоо — үндсэн утас', order: 73 },
  { key: 'ahlah-home.contact.phone.secondary', value: '9953-3738', label: 'Холбоо — нэмэлт утас', order: 74 },
  { key: 'ahlah-home.contact.email.label', value: 'И-мэйл', label: 'Холбоо — и-мэйл label', order: 75 },
  { key: 'ahlah-home.contact.email.value', value: 'info@soyolerdem.edu.mn', label: 'Холбоо — и-мэйл хаяг', order: 76 },
  { key: 'ahlah-home.contact.admission.label', value: 'Элсэлт нээлттэй', label: 'Холбоо — элсэлт label', order: 77 },
  { key: 'ahlah-home.contact.admission.value', value: '10-р анги · 2025–2026 оны хичээлийн жил', label: 'Холбоо — элсэлт утга', order: 78 },
  { key: 'ahlah-home.contact.admission.cta', value: 'Элсэлтийн мэдээлэл', label: 'Холбоо — элсэлт товч', order: 79 },
  { key: 'ahlah-home.contact.other.cta', value: 'Бусад асуулт', label: 'Холбоо — бусад товч', order: 80 },

  // Banner
  { key: 'ahlah-home.banner.title', value: 'Соёл Эрдэм Ахлах Сургууль', label: 'Banner — гарчиг', order: 90 },
  { key: 'ahlah-home.banner.subtitle', value: 'Чанартай боловсрол, Япон хэл, соёл, IT-ийн чиглэлээр ирээдүйгээ эндээс эхлүүл.', label: 'Banner — дэд гарчиг', multiline: true, order: 91 },
  { key: 'ahlah-home.banner.cta', value: 'Элсэлтийн мэдээлэл', label: 'Banner — үндсэн товч', order: 92 },
  { key: 'ahlah-home.banner.secondary.cta', value: 'Холбоо барих', label: 'Banner — 2-р товч', order: 93 },

  // Footer (ahlah-footer prefix, same group)
  { key: 'ahlah-footer.tagline', value: 'Соёл Эрдэм Дээд Сургуулийн харьяа төрөлжсөн ерөнхий боловсролын ахлах сургууль. Япон хэл, соёл, IT-ийн чиглэлээр чанартай боловсрол олгоно.', label: 'Footer — тайлбар текст', multiline: true, order: 100 },
  { key: 'ahlah-footer.phone.primary', value: '7011-8589', label: 'Footer — үндсэн утас', order: 101 },
  { key: 'ahlah-footer.phone.secondary', value: '9953-3738', label: 'Footer — нэмэлт утас', order: 102 },
  { key: 'ahlah-footer.email', value: 'info@soyolerdem.edu.mn', label: 'Footer — и-мэйл', order: 103 },
  { key: 'ahlah-footer.address', value: 'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Олимпийн гудамж', label: 'Footer — хаяг', multiline: true, order: 104 },
];

async function main() {
  console.log(`Seeding ${ROWS.length} high-school home/footer rows...`);
  let created = 0, skipped = 0;
  for (const r of ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: r.key } });
    if (ex) { skipped++; continue; }
    await prisma.siteContent.create({ data: { key: r.key, group: 'ahlah-home', type: 'TEXT', value: r.value, label: r.label, hint: r.hint ?? null, multiline: r.multiline ?? false, order: r.order } });
    created++;
  }
  console.log(`Created: ${created}  Skipped: ${skipped}`);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
