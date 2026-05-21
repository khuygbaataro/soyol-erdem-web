/**
 * One-shot: extend the `careers` SiteContent group with the shared
 * "Тавигдах шаардлага" list from Munkhchimeg's СЭДС-д багш сонгон
 * шалгаруулж авна docx. These render inside every job-opening
 * detail page (`/careers/<slug>`) since the requirements are the
 * same across positions.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ROWS = [
  {
    key: 'careers.info.requirementsTitle',
    label: 'Тавигдах шаардлага — гарчиг',
    value: 'Тавигдах шаардлага',
    order: 20,
  },
  {
    key: 'careers.info.requirements',
    label: 'Тавигдах шаардлага (мөр бүр шинэ шаардлага)',
    hint: 'Мөр бүрд нэг шаардлага бичнэ.',
    value:
      'Магистр, докторын зэрэгтэй. Их, дээд сургууль, эрдэм шинжилгээний байгууллагад ажилласан бол давуу тал болно.\nДипломын голч дүн бакалаврын зэрэгт 2.8-аас, магистрын зэрэгт 3.0-оос доошгүй.\nТөлөвшсөн, ёс зүйтэй, эерэг харилцаа, хандлагатай, ачаалал даах чадвартай.',
    multiline: true,
    order: 21,
  },
];

async function main() {
  let created = 0;
  let existing = 0;
  for (const r of ROWS) {
    const e = await prisma.siteContent.findUnique({
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
        group: 'careers',
        label: r.label,
        hint: r.hint,
        multiline: r.multiline ?? false,
        order: r.order,
      },
    });
    if (e) existing++;
    else created++;
  }
  console.log(`✔ done. created=${created}, already-existed=${existing}, total=${ROWS.length}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
