/**
 * One-shot: register the "Бидний 10 соёл" panel on /high-school/programs
 * so admin can edit the section title + 10 culture items from
 * /high-school/admin/site-content → "Сургалт" group. Icons are kept
 * code-side (lucide-react) and matched per item index.
 *
 * Re-runnable.
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

const ROWS: Row[] = [
  {
    key: 'ahlah-programs.culture.title',
    label: 'Бидний 10 соёл — гарчиг',
    value: 'Бидний 10 соёл',
    order: 90,
  },
  {
    key: 'ahlah-programs.culture.subtitle',
    label: 'Бидний 10 соёл — дэд гарчиг (сонгомол)',
    value:
      'Сурагч бүрд бид өдөр тутамд тулгуурлаж явдаг 10 соёлыг танилцуулж байна.',
    multiline: true,
    order: 91,
  },
  {
    key: 'ahlah-programs.culture.items',
    label: 'Бидний 10 соёл — жагсаалт (мөр бүр шинэ соёл)',
    hint:
      'Мөр бүрд нэг соёл бичнэ. Картууд тэр дарааллаар render-длэнэ. ' +
      'Icon нь кодын талаас урьдчилан таарсан тул дараалал чухал.',
    value: [
      'Мэндлэх, хүндлэх',
      'Дүрэмт хувцас өмсөх, гутлаа солих',
      'Зөв хооллох, Эрүүл мэнддээ анхаарах',
      'Ариг гамтай байх',
      'Цаг баримтлах',
      'Чигч шударга байх',
      'Цэвэр цэгцтэй байх',
      'Олон нийтийн газар биеэ зөв авч явах',
      'Гар утас зохистой хэрэглэх',
      'Ил задгай хог хаяхгүй байх',
    ].join('\n'),
    multiline: true,
    order: 92,
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
        group: 'ahlah-programs',
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
