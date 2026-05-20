/**
 * One-shot: register the SiteContent rows that back the new
 * /high-school/cooperation page so admins can edit the hero banner,
 * intro paragraph and the "Сурагч солилцооны хөтөлбөр" block from
 * /high-school/admin/site-content → group "Хамтын ажиллагаа".
 *
 * The partner directory itself (Japan universities, JP high schools,
 * Mongolia partners) is sourced from `lib/content.ts` +
 * `INTERNATIONAL_CONTENT` and is intentionally NOT admin-editable —
 * those lists are shared with the main university's /international
 * page and should stay in sync.
 *
 * Idempotent — re-runnable via `npx tsx scripts/add-hs-cooperation.ts`.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Row = {
  key: string;
  type: 'TEXT' | 'IMAGE';
  label: string;
  value: string;
  hint?: string;
  order: number;
  multiline?: boolean;
};

const ROWS: Row[] = [
  {
    key: 'ahlah-cooperation.hero.image',
    type: 'IMAGE',
    label: 'Hero — баннер зураг',
    hint: 'Дээд талын баннер. Хоосон бол default баннер.',
    value: '',
    order: 1,
  },
  {
    key: 'ahlah-cooperation.hero.subtitle',
    type: 'TEXT',
    label: 'Hero — доод текст',
    value: 'Япон болон дотоодын түнш байгууллагууд, сурагч солилцооны хөтөлбөр.',
    multiline: true,
    order: 2,
  },
  {
    key: 'ahlah-cooperation.intro.body',
    type: 'TEXT',
    label: 'Танилцуулга — нэг параграф',
    hint: 'Хамтын ажиллагааны товч танилцуулга. Хуудасны эхэн хэсэгт хэвтээгээр гарна.',
    value:
      'Манай ахлах сургууль эх сургууль болох Соёл Эрдэм Дээд Сургуулийн олон жилийн япон болон дотоодын түнш байгууллагуудтай хамтран ажилладаг. Энэхүү сүлжээ нь сурагчид болон багш нарт олон улсын боловсролын баялаг боломжийг нээж өгдөг.',
    multiline: true,
    order: 3,
  },
  {
    key: 'ahlah-cooperation.exchange.title',
    type: 'TEXT',
    label: 'Сурагч солилцооны хөтөлбөр — гарчиг',
    value: 'Сурагч солилцооны хөтөлбөр',
    order: 10,
  },
  {
    key: 'ahlah-cooperation.exchange.body',
    type: 'TEXT',
    label: 'Сурагч солилцооны хөтөлбөр — тайлбар',
    hint: 'Олон догол мөр бичих боломжтой.',
    value:
      'Соёл Эрдэм сургууль нь хамтран ажилладаг япон ахлах сургуулиудтайгаа жил бүр сурагч солилцооны хөтөлбөр зохион байгуулдаг. Хөтөлбөрт хамрагдсан сурагчид Япон улсад 1 долоо хоног — 1 жилийн хугацаатай суралцаж, япон хэл соёлыг шууд танин мэдэх боломжтой.',
    multiline: true,
    order: 11,
  },
  {
    key: 'ahlah-cooperation.exchange.highlights',
    type: 'TEXT',
    label: 'Сурагч солилцооны хөтөлбөр — онцлог цэг (мөр бүр шинэ цэг)',
    hint: 'Шинэ мөр бүрд нэг онцлог бичнэ. Жагсаалт болж харагдана.',
    value:
      '1 долоо хоног – 1 жилийн солилцоо\nЯпон хэл, соёлын нэвтрэлт\nХүлээн авах гэр бүлийн зохион байгуулалт\nСургуулийн хяналт ба харилцаа',
    multiline: true,
    order: 12,
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
        type: r.type,
        value: r.value,
        group: 'ahlah-cooperation',
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
