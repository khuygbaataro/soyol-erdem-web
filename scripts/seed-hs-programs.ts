/**
 * Seed editable programs-page sections (structure, Japanese, IT, resources)
 * into SiteContent group ahlah-programs. Idempotent.
 * Run: npx tsx scripts/seed-hs-programs.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Row = { key: string; value: string; label: string; multiline?: boolean; order: number };

const ROWS: Row[] = [
  // СУРГАЛТЫН БҮТЭЦ
  { key: 'ahlah-programs.structure.title', value: 'СУРГАЛТЫН БҮТЭЦ', label: 'Бүтэц — гарчиг', order: 10 },
  { key: 'ahlah-programs.structure.subtitle', value: 'Ерөнхий боловсролын тогтсон стандартыг япон хэл, соёл болон IT-ийн төрөлжсөн хөтөлбөртэй хослуулсан.', label: 'Бүтэц — дэд гарчиг', multiline: true, order: 11 },
  { key: 'ahlah-programs.structure.1.title', value: 'Ерөнхий боловсролын суурь', label: 'Бүтэц 1 — гарчиг', order: 12 },
  { key: 'ahlah-programs.structure.1.description', value: 'Боловсролын тухай хуулийн дагуу 10–12 анги бүрэн дунд боловсролын стандарт хөтөлбөр — Монгол хэл-уран зохиол, Математик, Хими, Физик, Биологи, Газарзүй, Түүх, Иргэний боловсрол, Биеийн тамир.', label: 'Бүтэц 1 — тайлбар', multiline: true, order: 13 },
  { key: 'ahlah-programs.structure.2.title', value: 'Япон хэл, соёл', label: 'Бүтэц 2 — гарчиг', order: 14 },
  { key: 'ahlah-programs.structure.2.description', value: '10–12 ангид JLPT N5 → N3 түвшинд хүрэхүйц хичээл. Япон ёс заншил, нийгмийн харилцаа, соёлын онцлогийг танилцуулсан хичээлүүд.', label: 'Бүтэц 2 — тайлбар', multiline: true, order: 15 },
  { key: 'ahlah-programs.structure.3.title', value: 'Төрөлжсөн IT', label: 'Бүтэц 3 — гарчиг', order: 16 },
  { key: 'ahlah-programs.structure.3.description', value: 'Алгоритм, өгөгдлийн бүтэц, програмчлал, веб болон AI-ийн үндэс — сурагч төвтэй практикаар суралцана.', label: 'Бүтэц 3 — тайлбар', multiline: true, order: 17 },

  // Япон хэлний түвшинт хөтөлбөр
  { key: 'ahlah-programs.jp.badge', value: 'Япон хэл, соёл', label: 'Япон — badge', order: 30 },
  { key: 'ahlah-programs.jp.title', value: 'Япон хэлний түвшинт хөтөлбөр', label: 'Япон — гарчиг', order: 31 },
  { key: 'ahlah-programs.jp.body', value: 'Сургуулийн төгсөгчид Япон руу үргэлжлүүлэн суралцах, япон байгууллагад ажиллах түвшинд хүрэхэд тулгуурлан 3 жилд JLPT N5-аас N3-N2 хүртэлх түвшинд хүргэх системтэй хөтөлбөртэй. Долоо хоногт 4 цагийн япон хэлний хичээл явагдана.', label: 'Япон — тайлбар', multiline: true, order: 32 },
  { key: 'ahlah-programs.jp.1.tag', value: '10-р анги', label: 'Япон 1 — анги', order: 33 },
  { key: 'ahlah-programs.jp.1.title', value: 'JLPT N5 (Эхлэн суралцагч)', label: 'Япон 1 — гарчиг', order: 34 },
  { key: 'ahlah-programs.jp.1.bullets', value: 'Хирагана, катакана үсэг бичих, унших\nҮндсэн 100+ кандзи\nЭнгийн өдөр тутмын хэллэг (өөрийгөө танилцуулах, цаг, хоол)\nЯпон ёс заншлын танилцуулга, бүх хичээлд 4 цаг/долоо хоног', label: 'Япон 1 — жагсаалт', multiline: true, order: 35 },
  { key: 'ahlah-programs.jp.2.tag', value: '11-р анги', label: 'Япон 2 — анги', order: 36 },
  { key: 'ahlah-programs.jp.2.title', value: 'JLPT N4 (Дунд эхлэл)', label: 'Япон 2 — гарчиг', order: 37 },
  { key: 'ahlah-programs.jp.2.bullets', value: 'Кандзи 300+\nИлүү нарийвчилсан грамматик, өнгөрсөн-ирээдүй цаг хэлбэр\nЯпон уран зохиолоос ишлэл, дуу, кино\nХичээлээс гадуур "Bunkyousai" наадамд оролцох', label: 'Япон 2 — жагсаалт', multiline: true, order: 38 },
  { key: 'ahlah-programs.jp.3.tag', value: '12-р анги', label: 'Япон 3 — анги', order: 39 },
  { key: 'ahlah-programs.jp.3.title', value: 'JLPT N3 → N2 түвшин', label: 'Япон 3 — гарчиг', order: 40 },
  { key: 'ahlah-programs.jp.3.bullets', value: 'Кандзи 650+\nЯпон руу солилцоонд явах түвшинд бичгийн болон ярианы орчуулга\nЯпон их сургуулийн элсэлтийн шалгалтын дасгал\nОлон улсын эрх бүхий шалгалтаар чадвараа баталгаажуулна', label: 'Япон 3 — жагсаалт', multiline: true, order: 41 },

  // Мэдээллийн технологийн төрөлжсөн анги
  { key: 'ahlah-programs.it.badge', value: 'Төрөлжсөн IT', label: 'IT — badge', order: 50 },
  { key: 'ahlah-programs.it.title', value: 'Мэдээллийн технологийн төрөлжсөн анги', label: 'IT — гарчиг', order: 51 },
  { key: 'ahlah-programs.it.body', value: '10–11 ангид сурагч төвтэй, оролцоонд тулгуурласан аргачлалаар программчлал, веб технологи, AI, өгөгдлийн шинжилгээний ойлголтуудыг тус сургуулийн дэргэдэх IT-Digital-AI мэргэжлийн сургуультай хамтран заана. Эх сургууль СЭДС-ын Программ хангамжийн мэргэжилтэй 2+2 хөтөлбөрөөр шууд үргэлжлүүлэн суралцаж болно.', label: 'IT — тайлбар', multiline: true, order: 52 },
  { key: 'ahlah-programs.it.1.title', value: 'Алгоритм ба програмчлал', label: 'IT 1 — гарчиг', order: 53 },
  { key: 'ahlah-programs.it.1.body', value: 'Логик сэтгэлгээний үндэс, Python/JavaScript хэлээр практик дасгал.', label: 'IT 1 — тайлбар', multiline: true, order: 54 },
  { key: 'ahlah-programs.it.2.title', value: 'Өгөгдлийн бүтэц', label: 'IT 2 — гарчиг', order: 55 },
  { key: 'ahlah-programs.it.2.body', value: 'Жагсаалт, харгалзаа, мод болон график бүтцийн ойлголт.', label: 'IT 2 — тайлбар', multiline: true, order: 56 },
  { key: 'ahlah-programs.it.3.title', value: 'Веб технологи', label: 'IT 3 — гарчиг', order: 57 },
  { key: 'ahlah-programs.it.3.body', value: 'HTML, CSS, JavaScript ашиглан төсөл хийж, хэрэглэгчийн интерфейс зохиох.', label: 'IT 3 — тайлбар', multiline: true, order: 58 },
  { key: 'ahlah-programs.it.4.title', value: 'AI болон өгөгдөл', label: 'IT 4 — гарчиг', order: 59 },
  { key: 'ahlah-programs.it.4.body', value: 'Хиймэл оюун ухааны үндсэн ойлголт, өгөгдлийн шинжилгээний эхлэн суралцах хичээл.', label: 'IT 4 — тайлбар', multiline: true, order: 60 },

  // СУРГАЛТЫН ОРЧИН
  { key: 'ahlah-programs.resources.title', value: 'СУРГАЛТЫН ОРЧИН', label: 'Орчин — гарчиг', order: 70 },
  { key: 'ahlah-programs.resources.1.title', value: 'IT кабинет', label: 'Орчин 1 — гарчиг', order: 71 },
  { key: 'ahlah-programs.resources.1.body', value: 'Орчин үеийн компьютер, дэлгэц, сүлжээний техник хангамжтай суралцагч төвтэй кабинет.', label: 'Орчин 1 — тайлбар', multiline: true, order: 72 },
  { key: 'ahlah-programs.resources.2.title', value: 'Номын сан', label: 'Орчин 2 — гарчиг', order: 73 },
  { key: 'ahlah-programs.resources.2.body', value: 'Япон, монгол хэл дээрх 5000+ номтой; сурагчид JLPT номон материалаар бэлтгэнэ.', label: 'Орчин 2 — тайлбар', multiline: true, order: 74 },
  { key: 'ahlah-programs.resources.3.title', value: 'Хими, физикийн лаборатори', label: 'Орчин 3 — гарчиг', order: 75 },
  { key: 'ahlah-programs.resources.3.body', value: 'Бодит туршилт хийх боломжтой шинжлэх ухааны лабораторийн өрөөнүүдтэй.', label: 'Орчин 3 — тайлбар', multiline: true, order: 76 },
];

async function main() {
  let created = 0, skipped = 0;
  for (const r of ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: r.key } });
    if (ex) { skipped++; continue; }
    await prisma.siteContent.create({ data: { key: r.key, group: 'ahlah-programs', type: 'TEXT', value: r.value, label: r.label, multiline: r.multiline ?? false, order: r.order } });
    created++;
  }
  console.log(`Created: ${created}  Skipped: ${skipped}`);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
