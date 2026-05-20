/**
 * One-shot: register the "Бага / Дунд / Ахлах сургуулийн онцлог"
 * comparison section on /high-school/programs so admins can edit it
 * from the high-school admin → "Сургалт" group.
 *
 * Per level (elementary / middle / high) we store 4 TEXT rows:
 *   .name             — display name (e.g. "Бага сургууль")
 *   .education        — Боловсролын онцлог
 *   .curriculum       — Сургалтын хөтөлбөрүүд
 *   .extracurricular  — Хичээлээс гадуурх үйл ажиллагаа
 * Plus 2 section-level rows: title + subtitle.
 *
 * Idempotent — re-runnable via `npx tsx scripts/add-hs-program-levels.ts`.
 * `update: {}` preserves any admin edits if the row already exists.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Row = {
  key: string;
  label: string;
  value: string;
  hint?: string;
  order: number;
  multiline?: boolean;
};

// Defaults are written in Mongolian; admins can edit valueEn / valueJa
// columns from the admin panel for EN / JP visitors.
const ROWS: Row[] = [
  {
    key: 'ahlah-programs.levels.title',
    label: 'Ангиудын онцлог — гарчиг',
    value: 'Бага, Дунд, Ахлах сургуулийн онцлог',
    order: 50,
  },
  {
    key: 'ahlah-programs.levels.subtitle',
    label: 'Ангиудын онцлог — дэд гарчиг',
    value:
      'Ангийн түвшин бүрд хэрхэн чанартай боловсрол олгож, хүүхдийн чадварыг нээж байгаа товч танилцуулга.',
    multiline: true,
    order: 51,
  },

  // ───────── Бага сургууль ─────────
  {
    key: 'ahlah-programs.levels.elementary.name',
    label: 'Бага сургууль — нэр',
    value: 'Бага сургууль',
    order: 60,
  },
  {
    key: 'ahlah-programs.levels.elementary.education',
    label: 'Бага сургууль — Боловсролын онцлог',
    hint: 'Энэ түвшний боловсролын гол онцлог, чиглэл.',
    value:
      'Уншиж, бичих, тоо бодох суурь чадварыг япон-монгол хосолсон хэлний орчинд бат суулгана. Анги бүрд багш + туслах багштай.',
    multiline: true,
    order: 61,
  },
  {
    key: 'ahlah-programs.levels.elementary.curriculum',
    label: 'Бага сургууль — Сургалтын хөтөлбөрүүд',
    hint: 'Боломжтой сургалтын хөтөлбөрийн тойм.',
    value:
      'Монгол хэл, математик, япон хэл (анхан шат), байгалийн судлал, нийгмийн ухаан, урлаг, хөгжим, биеийн тамир.',
    multiline: true,
    order: 62,
  },
  {
    key: 'ahlah-programs.levels.elementary.extracurricular',
    label: 'Бага сургууль — Хичээлээс гадуурх үйл ажиллагаа',
    hint: 'Дугуйлан, клуб, аялал зэрэг.',
    value:
      'Япон хэлний клуб, уран зураг, шатар, бүжиг, оригами, спорт-тоглоомын дугуйлан. Жилд 2-3 удаа танилцах аялал.',
    multiline: true,
    order: 63,
  },

  // ───────── Дунд сургууль ─────────
  {
    key: 'ahlah-programs.levels.middle.name',
    label: 'Дунд сургууль — нэр',
    value: 'Дунд сургууль',
    order: 70,
  },
  {
    key: 'ahlah-programs.levels.middle.education',
    label: 'Дунд сургууль — Боловсролын онцлог',
    value:
      'Япон хэлний түвшинг N5–N4-д хүргэх, эерэг сэтгэлгээ, шинжлэх ухааны үндэс суурийг тогтоох. STEM-н чиглэлд анхаарна.',
    multiline: true,
    order: 71,
  },
  {
    key: 'ahlah-programs.levels.middle.curriculum',
    label: 'Дунд сургууль — Сургалтын хөтөлбөрүүд',
    value:
      'Монгол хэл, математик, япон хэл, англи хэл, физик, хими, биологи, газарзүй, түүх, мэдээллийн технологийн үндэс.',
    multiline: true,
    order: 72,
  },
  {
    key: 'ahlah-programs.levels.middle.extracurricular',
    label: 'Дунд сургууль — Хичээлээс гадуурх үйл ажиллагаа',
    value:
      'JLPT бэлтгэл клуб, робототехникийн дугуйлан, бичил-судалгааны төсөл, спорт (карате, волейбол), уран илтгэлийн клуб.',
    multiline: true,
    order: 73,
  },

  // ───────── Ахлах сургууль ─────────
  {
    key: 'ahlah-programs.levels.high.name',
    label: 'Ахлах сургууль — нэр',
    value: 'Ахлах сургууль',
    order: 80,
  },
  {
    key: 'ahlah-programs.levels.high.education',
    label: 'Ахлах сургууль — Боловсролын онцлог',
    value:
      'Япон хэл (N3–N2), мэдээллийн технологид төрөлжсөн ерөнхий боловсрол. 2+2 солилцооны хөтөлбөр, японд үргэлжлүүлэн суралцах боломж.',
    multiline: true,
    order: 81,
  },
  {
    key: 'ahlah-programs.levels.high.curriculum',
    label: 'Ахлах сургууль — Сургалтын хөтөлбөрүүд',
    value:
      'Гүнзгийрүүлсэн япон хэл, IT (програмчлал, веб, мэдээллийн сан), математик, физик, хими, англи хэл, нийгмийн ухаан.',
    multiline: true,
    order: 82,
  },
  {
    key: 'ahlah-programs.levels.high.extracurricular',
    label: 'Ахлах сургууль — Хичээлээс гадуурх үйл ажиллагаа',
    value:
      'Япон судлалын клуб, IT хакатон, JLPT бэлтгэл, оюутны зөвлөл, спорт (баскетбол, ширээний теннис), Япон-руу солилцоо.',
    multiline: true,
    order: 83,
  },
];

async function main() {
  let created = 0;
  let existing = 0;
  for (const r of ROWS) {
    const existed = await prisma.siteContent.findUnique({
      where: { key: r.key },
      select: { id: true },
    });
    await prisma.siteContent.upsert({
      where: { key: r.key },
      update: {},
      create: {
        key: r.key,
        type: 'TEXT',
        value: r.value,
        group: 'ahlah-programs',
        label: r.label,
        hint: r.hint,
        multiline: r.multiline ?? false,
        order: r.order,
      },
    });
    if (existed) existing++;
    else created++;
  }
  console.log(`✔ done. created=${created}, already-existed=${existing}, total=${ROWS.length}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
