/**
 * One-shot: seed a few starter admission email templates so the compose UI
 * (/admin/messages/[id]) has something to pick from on day one. Admin can
 * edit / add more at /admin/email-templates.
 *
 * Idempotent — matches on `name`, skips if it already exists.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Row = {
  name: string;
  category: string;
  subject: string;
  body: string;
  order: number;
};

const ROWS: Row[] = [
  {
    name: 'Ерөнхий — сонирхсон хүнд хариу',
    category: 'erunhii',
    order: 1,
    subject: 'Соёл Эрдэм Дээд Сургууль — таны сонирхолд баярлалаа',
    body:
      'Сайн байна уу, {{firstName}}.\n\n' +
      'Соёл Эрдэм Дээд Сургуулийг сонирхсонд баярлалаа. Таны асуусан ' +
      'элсэлттэй холбоотой мэдээллийг хүргэж байна:\n\n' +
      '• Хөтөлбөрүүд болон элсэлтийн ерөнхий нөхцөл\n' +
      '• Бүрдүүлэх материал\n' +
      '• Төлбөр, тэтгэлэгийн боломж\n\n' +
      'Нэмэлт асуулт байвал энэ имэйлд хариу бичих эсвэл +976 7011-8584 ' +
      'дугаараар холбогдоно уу.\n\n' +
      'Хүндэтгэсэн,\nСоёл Эрдэм Дээд Сургууль — Элсэлтийн алба',
  },
  {
    name: 'Аялал жуулчлал — танилцуулга',
    category: 'aylal-juulchlal',
    order: 2,
    subject: 'Соёл Эрдэм — "{{programName}}" хөтөлбөрийн мэдээлэл',
    body:
      'Сайн байна уу, {{firstName}}.\n\n' +
      'Таны сонирхсон "{{programName}}" хөтөлбөрийн талаарх мэдээллийг ' +
      'хүргэж байна. Энэ хөтөлбөр нь аялал жуулчлалын менежмент, ' +
      'үйлчилгээний ур чадвар, гадаад хэлний бэлтгэлийг хамардаг бөгөөд ' +
      'манай Шилийн булаг жуулчны баазад дадлага хийх боломжтой.\n\n' +
      'Бүрдүүлэх материал, төлбөр, элсэлтийн хуваарийг хавсаргав. ' +
      'Асуух зүйл байвал чөлөөтэй холбогдоорой.\n\n' +
      'Хүндэтгэсэн,\nСоёл Эрдэм Дээд Сургууль — Элсэлтийн алба',
  },
  {
    name: 'Програм хангамж — танилцуулга',
    category: 'programm-hangamj',
    order: 3,
    subject: 'Соёл Эрдэм — "{{programName}}" хөтөлбөрийн мэдээлэл',
    body:
      'Сайн байна уу, {{firstName}}.\n\n' +
      'Таны сонирхсон "{{programName}}" хөтөлбөрийн талаарх дэлгэрэнгүй ' +
      'мэдээллийг хүргэж байна. Хөтөлбөр нь програмчлал, вэб болон ' +
      'аппликейшн хөгжүүлэлт, өгөгдлийн ухааны суурь мэдлэгийг олгодог.\n\n' +
      'Элсэлтийн шаардлага, бүрдүүлэх материал, төлбөрийн мэдээллийг ' +
      'хавсаргав. Нэмэлт асуулт байвал энэ имэйлд хариу бичээрэй.\n\n' +
      'Хүндэтгэсэн,\nСоёл Эрдэм Дээд Сургууль — Элсэлтийн алба',
  },
];

async function main() {
  let created = 0;
  let existing = 0;
  for (const r of ROWS) {
    const found = await prisma.emailTemplate.findFirst({
      where: { name: r.name },
      select: { id: true },
    });
    if (found) {
      existing++;
      continue;
    }
    await prisma.emailTemplate.create({
      data: {
        name: r.name,
        category: r.category,
        subject: r.subject,
        body: r.body,
        locale: 'MN',
        active: true,
        order: r.order,
      },
    });
    created++;
  }
  console.log(`✔ done. created=${created}, already-existed=${existing}, total=${ROWS.length}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
