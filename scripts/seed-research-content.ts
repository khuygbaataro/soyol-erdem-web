/**
 * One-shot: seed all editable research-page texts into SiteContent.
 * Idempotent — safe to re-run; existing admin edits are preserved.
 *
 * Run:
 *   npx tsx scripts/seed-research-content.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Row = {
  key: string;
  value: string;
  valueEn?: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  order: number;
};

const ROWS: Row[] = [
  /* ── Hero ─────────────────────────────────────────────── */
  {
    key: 'research.hero.title',
    value: 'ЭРДЭМ ШИНЖИЛГЭЭ, СУДАЛГААНЫ АЖИЛ',
    valueEn: 'RESEARCH & SCHOLARSHIP',
    label: 'Hero гарчиг',
    order: 1,
  },
  {
    key: 'research.hero.subtitle',
    value: 'Тэнхимүүдийн судалгааны тэргүүлэх чиглэл, ахисан түвшний судалгаа, олон улсын хамтын ажиллагаа.',
    valueEn: 'Departmental research priorities, graduate-level studies, and international research partnerships.',
    label: 'Hero дэд гарчиг',
    order: 2,
  },

  /* ── Нэвтрүүлэх ─────────────────────────────────────── */
  {
    key: 'research.intro',
    value: 'Соёл Эрдэм Дээд Сургуулийн эрдэм шинжилгээ, судалгааны ажил нь мэргэжлийн тэнхимүүдийн тэргүүлэх чиглэлд төвлөрсөн судалгаа, ахисан түвшний эрдэм шинжилгээний бүтээл, олон улсын хамтын ажиллагаатай хослон явагддаг.',
    valueEn: 'Research at Soyol Erdem University combines department-led priority studies, graduate-level scholarship and active international cooperation.',
    label: 'Нэвтрүүлэх текст',
    multiline: true,
    order: 3,
  },

  /* ── Судалгааны чиглэлүүд (Areas) ─────────────────── */
  {
    key: 'research.areas.title',
    value: 'СЭДС-ИЙН СУДАЛГААНЫ ТЭРГҮҮЛЭХ ЧИГЛЭЛҮҮД',
    valueEn: 'PRIORITY RESEARCH AREAS',
    label: 'Чиглэлүүд — хэсгийн гарчиг',
    order: 10,
  },
  {
    key: 'research.areas.subtitle',
    value: 'Мэргэжлийн тэнхимүүдийн судалгааны үндсэн 3 чиглэл.',
    valueEn: 'Three core research directions led by our academic departments.',
    label: 'Чиглэлүүд — хэсгийн дэд гарчиг',
    order: 11,
  },
  {
    key: 'research.area.1.title',
    value: 'Япон хэл утга зохиол судлал, орчуулга зүй',
    valueEn: 'Japanese linguistics, literature & translation studies',
    label: '1-р чиглэл — нэр',
    order: 12,
  },
  {
    key: 'research.area.1.description',
    value: 'Япон судлалын тэнхимийн тэргүүлэх чиглэл: хэл шинжлэл, утга зохиол, орчуулга зүй.',
    valueEn: 'The Department of Japanese Studies focuses on linguistics, literature and translation theory.',
    label: '1-р чиглэл — тайлбар',
    multiline: true,
    order: 13,
  },
  {
    key: 'research.area.2.title',
    value: 'Мэдээлэл харилцааны технологи',
    valueEn: 'Information & communication technology',
    label: '2-р чиглэл — нэр',
    order: 14,
  },
  {
    key: 'research.area.2.description',
    value: 'Сүлжээний аюулгүй байдал, программ хангамж, автоматжуулалтын чиглэл.',
    valueEn: 'Network security, software engineering and automation.',
    label: '2-р чиглэл — тайлбар',
    multiline: true,
    order: 15,
  },
  {
    key: 'research.area.3.title',
    value: 'Монгол судлал, Монгол утга зохиол судлал',
    valueEn: 'Mongolian studies & Mongolian literature',
    label: '3-р чиглэл — нэр',
    order: 16,
  },
  {
    key: 'research.area.3.description',
    value: 'Монгол утга зохиол, хэл, соёлын судалгаа — ахисан түвшний хөтөлбөртэй.',
    valueEn: 'Mongolian literature, language and cultural research — with a graduate-level programme.',
    label: '3-р чиглэл — тайлбар',
    multiline: true,
    order: 17,
  },

  /* ── Тэнхимүүд (Departments) ────────────────────────── */
  {
    key: 'research.departments.title',
    value: 'СУДАЛГААНЫ ЧИГЛЭЛ',
    valueEn: 'RESEARCH STREAMS',
    label: 'Тэнхимүүд — хэсгийн гарчиг',
    order: 20,
  },
  {
    key: 'research.departments.subtitle',
    value: 'Тэнхим, ахисан түвшнээр ангилсан судалгааны нарийвчилсан чиглэлүүд.',
    valueEn: 'Detailed research topics grouped by department and by graduate level.',
    label: 'Тэнхимүүд — хэсгийн дэд гарчиг',
    order: 21,
  },
  {
    key: 'research.dept.1.title',
    value: 'Япон судлалын тэнхим',
    valueEn: 'Department of Japanese Studies',
    label: '1-р тэнхим — нэр',
    order: 22,
  },
  {
    key: 'research.dept.1.topics',
    value: 'Япон хэл утга зохиол судлал\nЯпон-монгол, Монгол-япон хэлний орчуулга зүй\nЯпон хэл заах арга\nЯпон хэл соёл судлал\nМонгол-Япон, Япон-Монгол харилцаа судлал\nЯпон орон судлал',
    label: '1-р тэнхим — сэдвүүд (мөр тус бүр = нэг сэдэв)',
    hint: 'Мөр тус бүр тусдаа жагсаалтын мөр болно.',
    multiline: true,
    order: 23,
  },
  {
    key: 'research.dept.2.title',
    value: 'Мэдээллийн технологийн тэнхим',
    valueEn: 'Department of Information Technology',
    label: '2-р тэнхим — нэр',
    order: 24,
  },
  {
    key: 'research.dept.2.topics',
    value: 'Сүлжээний аюулгүй байдал\nПрограмм хангамжийн хэрэглээ\nАвтоматжуулалт',
    label: '2-р тэнхим — сэдвүүд',
    hint: 'Мөр тус бүр тусдаа жагсаалтын мөр болно.',
    multiline: true,
    order: 25,
  },
  {
    key: 'research.dept.3.title',
    value: 'Ахисан түвшний судалгаа',
    valueEn: 'Graduate-level research',
    label: '3-р тэнхим — нэр',
    order: 26,
  },
  {
    key: 'research.dept.3.topics',
    value: 'Япон хэл утга зохиол судлал\nЯпон-монгол, Монгол-япон хэлний орчуулга зүй\nЯпон хэл заах арга\nЯпон хэл соёл судлал\nМонгол судлал, Монгол утга зохиол судлал',
    label: '3-р тэнхим — сэдвүүд',
    hint: 'Мөр тус бүр тусдаа жагсаалтын мөр болно.',
    multiline: true,
    order: 27,
  },

  /* ── Онцлох үйл ажиллагаа (Highlights) ─────────────── */
  {
    key: 'research.highlights.title',
    value: 'ОНЦЛОХ ҮЙЛ АЖИЛЛАГАА',
    valueEn: 'RESEARCH HIGHLIGHTS',
    label: 'Онцлох — хэсгийн гарчиг',
    order: 30,
  },
  {
    key: 'research.highlights.subtitle',
    value: 'Судалгааны профессорын баг, олон улсын гэрчилгээт сургалт, цахим хэрэглэгдэхүүн.',
    valueEn: 'Research professor teams, internationally certified training and digital tools.',
    label: 'Онцлох — хэсгийн дэд гарчиг',
    order: 31,
  },
  {
    key: 'research.highlight.1',
    value: 'Тус сургуулийн эрдэмтэн багш нар судалгааны чиглэлээр судалгааны профессорын баг байгуулан үйл ажиллагаагаа явуулдаг.',
    label: '1-р онцлох карт',
    multiline: true,
    order: 32,
  },
  {
    key: 'research.highlight.2',
    value: 'Программ хангамжийн мэргэжлийн оюутнуудыг 2023 оноос эхлэн CISCO академийн албан ёсны гэрчилгээтэй төгсдөг болсноор олон улсад IT компаниудад ажиллах боломжийг олгодог. Мөн мэдээллийн аюулгүй байдлын мэргэшүүлэх сургалт, компьютерын сүлжээ, Internet of Things, Программ хангамж, OS & IT, Packet Tracer сургалтуудыг Дээд сургуулийн оюутанд үнэ төлбөргүй зааж сургалт явуулж байна.',
    label: '2-р онцлох карт',
    multiline: true,
    order: 33,
  },
  {
    key: 'research.highlight.3',
    value: 'Тус хичээлийн жилээс эхлэн СЭДС нь онлайн болон цахим сургалтандаа MOODLE зайн сургалтын платформыг хэрэглэж эхэллээ. Ингэснээр гадаадаас элсэн суралцаж буй магиструуд болон интерншип хөтөлбөрт хамрагдсан бакалаврын хөтөлбөрийн оюутнууд хугацаа алдалгүй сургалтаа үргэлжлүүлэн суралцах боломж нээгдэж байна.',
    label: '3-р онцлох карт',
    multiline: true,
    order: 34,
  },

  /* ── Feed (хэвлэлийн) ────────────────────────────────── */
  {
    key: 'research.feed.title',
    value: 'ЭРДЭМ ШИНЖИЛГЭЭНИЙ МЭДЭЭ, БҮТЭЭЛҮҮД',
    valueEn: 'PUBLICATIONS & RESEARCH NEWS',
    label: 'Бүтээлүүд — хэсгийн гарчиг',
    order: 40,
  },
  {
    key: 'research.feed.subtitle',
    value: 'Манай эрдэмтэн багш нарын шинэ нийтлэл, илтгэл, ном, диссертаци болон төслийн мэдээ.',
    valueEn: 'Latest articles, conference papers, books, dissertations and project news from our faculty.',
    label: 'Бүтээлүүд — хэсгийн дэд гарчиг',
    order: 41,
  },

  /* ── Сэтгүүл (Journals) ──────────────────────────────── */
  {
    key: 'research.journals.title',
    value: 'ЭРДЭМ ШИНЖИЛГЭЭНИЙ СЭТГҮҮЛ',
    valueEn: 'ACADEMIC JOURNALS',
    label: 'Сэтгүүл — хэсгийн гарчиг',
    order: 50,
  },
  {
    key: 'research.journals.subtitle',
    value: 'Соёл Эрдэм Дээд Сургуулиас гаргадаг боть тус бүрийг номын хуудас эргүүлэн уншиж танилцана уу.',
    valueEn: 'Browse each volume of Soyol Erdem University\'s academic journal as a page-turning flipbook.',
    label: 'Сэтгүүл — хэсгийн дэд гарчиг',
    order: 51,
  },
];

async function main() {
  console.log(`🌱 Seeding ${ROWS.length} research SiteContent rows…`);
  let created = 0;
  let skipped = 0;

  for (const row of ROWS) {
    const existing = await prisma.siteContent.findUnique({ where: { key: row.key } });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.siteContent.create({
      data: {
        key: row.key,
        group: 'research',
        type: 'TEXT',
        value: row.value,
        valueEn: row.valueEn ?? '',
        label: row.label,
        hint: row.hint ?? null,
        multiline: row.multiline ?? false,
        order: row.order,
      },
    });
    created++;
  }

  console.log(`✅  Created: ${created}  Skipped (already exists): ${skipped}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
