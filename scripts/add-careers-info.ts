/**
 * One-shot: register the "Бүртгэлийн мэдээлэл" panel that appears on
 * /careers under the openings list. The panel carries the SHARED
 * information from Munkhchimeg's "СЭДС-д багш сонгон шалгаруулж
 * авна" notice: required documents, application window, contact
 * email + phone — all admin-editable from /admin/site-content under
 * the new "careers" group.
 *
 * Idempotent — re-runnable. `update: {}` preserves any admin edits.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Row = {
  key: string;
  type: 'TEXT';
  label: string;
  value: string;
  hint?: string;
  order: number;
  multiline?: boolean;
};

const ROWS: Row[] = [
  {
    key: 'careers.info.title',
    type: 'TEXT',
    label: 'Бүртгэлийн мэдээлэл — гарчиг',
    value: 'Бүртгэлийн мэдээлэл',
    order: 1,
  },
  {
    key: 'careers.info.subtitle',
    type: 'TEXT',
    label: 'Бүртгэлийн мэдээлэл — дэд гарчиг',
    value:
      'Дараах материалуудыг нэг PDF файл болгон тэмдэглэсэн хугацаанд имэйлээр илгээнэ үү.',
    multiline: true,
    order: 2,
  },
  {
    key: 'careers.info.materials',
    type: 'TEXT',
    label: 'Шаардлагатай материалууд (мөр бүр нэг материал)',
    hint: 'Шинэ мөр бүрд нэг материал бичнэ. Жагсаалт болж харагдана.',
    value:
      'Анкет\nБоловсролын зэргийн диплом, бусад үнэмлэх, сертификатын нотариатаар баталгаажуулсан хуулбар\nИргэний үнэмлэхийн хуулбар, лавлагаа\nНийгмийн даатгалын дэвтрийн хуулбар, лавлагаа',
    multiline: true,
    order: 3,
  },
  {
    key: 'careers.info.deadlineLabel',
    type: 'TEXT',
    label: 'Хүлээн авах хугацаа — талбарын нэр',
    value: 'Хүлээн авах хугацаа',
    order: 4,
  },
  {
    key: 'careers.info.deadlineValue',
    type: 'TEXT',
    label: 'Хүлээн авах хугацаа — утга',
    hint: 'Жишээ: 2026/05/18 — 2026/08/25',
    value: '2026/05/18 — 2026/08/25',
    order: 5,
  },
  {
    key: 'careers.info.emailLabel',
    type: 'TEXT',
    label: 'Имэйл — талбарын нэр',
    value: 'Имэйл',
    order: 6,
  },
  {
    key: 'careers.info.emails',
    type: 'TEXT',
    label: 'Имэйл хаягууд (таслалаар тусгаарласан)',
    hint: 'Олон хаягийг ";"-аар тусгаарлана.',
    value: 'info@soyolerdem.edu.mn; nasaa1217@gmail.com',
    order: 7,
  },
  {
    key: 'careers.info.phoneLabel',
    type: 'TEXT',
    label: 'Утас — талбарын нэр',
    value: 'Утас',
    order: 8,
  },
  {
    key: 'careers.info.phone',
    type: 'TEXT',
    label: 'Утас',
    value: '98112008',
    order: 9,
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
        group: 'careers',
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
