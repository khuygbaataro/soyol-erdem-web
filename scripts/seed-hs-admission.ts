/**
 * Seed editable HS admission-page sections (poster, requirements, steps,
 * tuition, docs, timeline) into SiteContent group ahlah-admission. Idempotent.
 * Run: npx tsx scripts/seed-hs-admission.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Row = { key: string; value: string; label: string; type?: 'TEXT' | 'IMAGE'; multiline?: boolean; order: number };

const ROWS: Row[] = [
  // Poster image
  { key: 'ahlah-admission.poster.image', value: '/ahlah/admission-poster.jpg', label: 'Элсэлтийн зурагт хуудас', type: 'IMAGE', order: 5 },

  // Requirements
  { key: 'ahlah-admission.requirements.title', value: 'ЭЛСЭЛТИЙН ШААРДЛАГА', label: 'Шаардлага — гарчиг', order: 30 },
  { key: 'ahlah-admission.req.1.title', value: '9 жилийн боловсролын гэрчилгээтэй', label: 'Шаардлага 1 — гарчиг', order: 31 },
  { key: 'ahlah-admission.req.1.body', value: 'Тухайн оны хичээлийн жилийн 9-р ангиа төгссөн, ерөнхий боловсролын дунд боловсролын гэрчилгээтэй сурагч элсэх боломжтой.', label: 'Шаардлага 1 — тайлбар', multiline: true, order: 32 },
  { key: 'ahlah-admission.req.2.title', value: 'Дундаж голч 70-аас дээш', label: 'Шаардлага 2 — гарчиг', order: 33 },
  { key: 'ahlah-admission.req.2.body', value: '9-р ангийн жилийн эцсийн дүнгийн дундаж голч оноо 70%-аас дээш байх шаардлагатай.', label: 'Шаардлага 2 — тайлбар', multiline: true, order: 34 },
  { key: 'ahlah-admission.req.3.title', value: 'Япон хэл, IT-д сонирхолтой', label: 'Шаардлага 3 — гарчиг', order: 35 },
  { key: 'ahlah-admission.req.3.body', value: 'Япон хэл, соёлд эсвэл мэдээллийн технологийн чиглэлд сонирхолтой, цаашид Япон руу үргэлжлүүлэн суралцах эсвэл IT мэргэжлийн чиглэлээр явахыг хүсэж буй сурагч.', label: 'Шаардлага 3 — тайлбар', multiline: true, order: 36 },
  { key: 'ahlah-admission.req.4.title', value: 'Эцэг эх, асран хамгаалагчтай зөвлөлдсөн', label: 'Шаардлага 4 — гарчиг', order: 37 },
  { key: 'ahlah-admission.req.4.body', value: 'Сурагч ба эцэг эхийн хамтарсан шийдвэрээр элсэлтийн материал бүрдүүлсэн байна.', label: 'Шаардлага 4 — тайлбар', multiline: true, order: 38 },

  // Steps
  { key: 'ahlah-admission.steps.title', value: 'ЭЛСЭХ ҮЕ ШАТУУД', label: 'Үе шат — гарчиг', order: 40 },
  { key: 'ahlah-admission.steps.subtitle', value: '4 алхамаар манай сургуульд элсэх ажиллагаа дуусна.', label: 'Үе шат — дэд гарчиг', order: 41 },
  { key: 'ahlah-admission.step.1.title', value: '1. Бүртгүүлэх', label: 'Алхам 1 — гарчиг', order: 42 },
  { key: 'ahlah-admission.step.1.body', value: 'Дараах формоор урьдчилсан бүртгэлд хамрагдана. Утсаар (7011-8589) холбоо барьж мэдээлэл авч болно.', label: 'Алхам 1 — тайлбар', multiline: true, order: 43 },
  { key: 'ahlah-admission.step.2.title', value: '2. Материал бүрдүүлэх', label: 'Алхам 2 — гарчиг', order: 44 },
  { key: 'ahlah-admission.step.2.body', value: 'Иргэний үнэмлэхний хуулбар, дүнгийн тодорхойлолт, эрүүл мэндийн хуудас, өргөдөл зэргийг бүрдүүлэн авчирна.', label: 'Алхам 2 — тайлбар', multiline: true, order: 45 },
  { key: 'ahlah-admission.step.3.title', value: '3. Ярилцлага / шалгалт', label: 'Алхам 3 — гарчиг', order: 46 },
  { key: 'ahlah-admission.step.3.body', value: 'Япон хэлний онцлох ангид элсэх бол ерөнхий мэдлэгийн тест + ярилцлага хийгдэнэ.', label: 'Алхам 3 — тайлбар', multiline: true, order: 47 },
  { key: 'ahlah-admission.step.4.title', value: '4. Шийдвэр + гэрээ', label: 'Алхам 4 — гарчиг', order: 48 },
  { key: 'ahlah-admission.step.4.body', value: 'Шалгалтын дүн гарсны дараа сургалтын гэрээ байгуулна. Анхны ангид хичээл эхлэх өдөр бүртгэлээ баталгаажуулна.', label: 'Алхам 4 — тайлбар', multiline: true, order: 49 },

  // Docs
  { key: 'ahlah-admission.docs.title', value: 'БҮРДҮҮЛЭХ МАТЕРИАЛ', label: 'Материал — гарчиг', order: 50 },
  { key: 'ahlah-admission.docs.items', value: '9-р ангийн жилийн эцсийн дүнгийн тодорхойлолт (эх)\n9 жилийн боловсролын гэрчилгээ (хуулбар)\nИргэний үнэмлэхний хуулбар (сурагч + эцэг эх)\nЭрүүл мэндийн хуудас (М-Д хэвлэмэл маягт)\n3×4 хэмжээний 2 хувь зураг\nЭлсэлтийн өргөдөл (сургуулиас өгнө)', label: 'Материал — жагсаалт (мөр тус бүр = нэг материал)', multiline: true, order: 51 },

  // Timeline
  { key: 'ahlah-admission.timeline.title', value: 'ХУГАЦАА', label: 'Хугацаа — гарчиг', order: 52 },
  { key: 'ahlah-admission.timeline.items', value: '5–6 сар | Урьдчилсан бүртгэл нээлттэй\n6–7 сар | Материал хүлээн авах хугацаа\n7 сар | Ярилцлага, шалгалт\n8 сар | Дүн зарлах, гэрээ байгуулах\n9 сар | Хичээл эхлэх', label: 'Хугацаа — жагсаалт ("огноо | үйл явдал" мөр тус бүр)', multiline: true, order: 53 },

  // Tuition
  { key: 'ahlah-admission.tuition.title', value: 'Сургалтын төлбөр, тэтгэлгийн боломж', label: 'Төлбөр — гарчиг', order: 60 },
  { key: 'ahlah-admission.tuition.body', value: 'Сургалтын төлбөр болон тэтгэлгийн боломжуудын тухай мэдээлэл элсэлтийн хугацаанд өргөдөл өгсөн сурагч, эцэг эхэд тус тус танилцуулга хийгдэнэ. Эх сургуулийн япон тэтгэлэгт хамрагдах, солилцооны хөтөлбөрт орох боломжийг хэлэлцэх боломжтой.', label: 'Төлбөр — тайлбар', multiline: true, order: 61 },
];

async function main() {
  let created = 0, skipped = 0;
  for (const r of ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: r.key } });
    if (ex) { skipped++; continue; }
    await prisma.siteContent.create({ data: { key: r.key, group: 'ahlah-admission', type: r.type ?? 'TEXT', value: r.value, label: r.label, multiline: r.multiline ?? false, order: r.order } });
    created++;
  }
  console.log(`Created: ${created}  Skipped: ${skipped}`);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
