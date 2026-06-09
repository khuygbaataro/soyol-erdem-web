/**
 * Seed all admission page texts into SiteContent (group: 'admission').
 * Idempotent — safe to re-run.
 * Run: npx tsx scripts/seed-admission-content.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Row = { key: string; value: string; label: string; hint?: string; multiline?: boolean; order: number };

const ROWS: Row[] = [
  /* Hero */
  { key:'admission.hero.title',    value:'ЭЛСЭЛТ',                                                 label:'Hero гарчиг',        order:1 },
  { key:'admission.hero.subtitle', value:'2026-2027 оны хичээлийн жилийн элсэлтийн мэдээлэл.',     label:'Hero дэд гарчиг',    order:2 },

  /* Section titles */
  { key:'admission.section.info.title',           value:'МЭРГЭЖЛЭЭ СОНГОХ',                                                    label:'Хэсэг 1 — гарчиг',            order:10 },
  { key:'admission.section.info.subtitle',        value:'2026-2027 оны хичээлийн жилийн элсэлтийн журам, тэтгэлэг ба элсэлтийн төрлүүд.', label:'Хэсэг 1 — дэд гарчиг', order:11 },
  { key:'admission.section.steps.title',          value:'ЭЛСЭЛТИЙН АЛХАМ',                         label:'Алхамт процесс — гарчиг',      order:12 },
  { key:'admission.section.steps.subtitle',       value:'5 алхамт энгийн процесс.',                label:'Алхамт процесс — дэд гарчиг', order:13 },
  { key:'admission.section.requirements.heading', value:'Элсэгчдэд тавигдах нийтлэг шаардлага',   label:'Шаардлага — гарчиг',           order:14 },
  { key:'admission.section.foreign.title',        value:'ГАДААД ОЮУТАН ЭЛСЭХ',                     label:'Гадаад оюутан — гарчиг',       order:15 },
  { key:'admission.section.payment.title',        value:'ТӨЛБӨР, ХӨНГӨЛӨЛТ',                       label:'Төлбөр — гарчиг',              order:16 },
  { key:'admission.section.payment.subtitle',     value:'Элсэгчидэд зориулсан төлбөрийн хөнгөлөлтийн нөхцөл.', label:'Төлбөр — дэд гарчиг', order:17 },
  { key:'admission.section.faq.title',            value:'Тогтмол асуултууд',                       label:'FAQ — гарчиг',                 order:18 },

  /* Programs */
  { key:'admission.program.bachelor.title',  value:'БАКАЛАВРЫН ЭЛСЭЛТ (2026–2027)', label:'Программ: Бакалавр — гарчиг', order:20 },
  { key:'admission.program.bachelor.intro',  value:'2026–2027 оны хичээлийн жилд дараах мэргэжлүүдээр элсэлт авч байна.', label:'Программ: Бакалавр — тайлбар', multiline:true, order:21 },
  { key:'admission.program.bachelor.bullets', value:'Программ хангамж\nБусад бакалаврын хөтөлбөрүүд', label:'Программ: Бакалавр — жагсаалт', hint:'Мөр тус бүр = нэг мөр', multiline:true, order:22 },
  { key:'admission.program.bachelor.bullets2Label', value:'Тайлбар', label:'Программ: Бакалавр — 2-р жагсаалтын гарчиг', order:23 },
  { key:'admission.program.bachelor.bullets2', value:'Элсэгчид ЭЕШ-ийн онооны шаардлагыг хангасан байна.', label:'Программ: Бакалавр — 2-р жагсаалт', multiline:true, order:24 },
  { key:'admission.program.bachelor.cta', value:'Бүртгүүлэх', label:'Программ: Бакалавр — товчны текст', order:25 },

  { key:'admission.program.software.title',  value:'ПРОГРАММ ХАНГАМЖИЙН МЭРГЭЖИЛ', label:'Программ: Программ хангамж — гарчиг', order:30 },
  { key:'admission.program.software.intro',  value:'Ирээдүйн эрэлттэй салбарт суралцах боломж.', label:'Программ: Программ хангамж — тайлбар', multiline:true, order:31 },
  { key:'admission.program.software.bullets', value:'Орчин үеийн IT хөтөлбөр\nПрактикт суурилсан сургалт\nДотоод, гадаадын ажлын боломж', label:'Программ: Программ хангамж — жагсаалт', multiline:true, order:32 },
  { key:'admission.program.software.cta', value:'Дэлгэрэнгүй харах', label:'Программ: Программ хангамж — товчны текст', order:33 },

  { key:'admission.program.master.title',  value:'МАГИСТРЫН ЭЛСЭЛТ', label:'Программ: Магистр — гарчиг', order:40 },
  { key:'admission.program.master.intro',  value:'Магистрын шатны элсэлт дараах чиглэлээр явагдана.', label:'Программ: Магистр — тайлбар', multiline:true, order:41 },
  { key:'admission.program.master.bullets', value:'Гадаад хэл шинжлэл', label:'Программ: Магистр — жагсаалт', multiline:true, order:42 },
  { key:'admission.program.master.bullets2Label', value:'Давуу тал', label:'Программ: Магистр — 2-р жагсаалтын гарчиг', order:43 },
  { key:'admission.program.master.bullets2', value:'Судалгаанд суурилсан сургалт\nАжлын хажуугаар суралцах боломж', label:'Программ: Магистр — 2-р жагсаалт', multiline:true, order:44 },
  { key:'admission.program.master.cta', value:'Бүртгүүлэх', label:'Программ: Магистр — товчны текст', order:45 },

  { key:'admission.program.thirty-plus.title', value:'30+ ХӨТӨЛБӨР', label:'Программ: 30+ — гарчиг', order:50 },
  { key:'admission.program.thirty-plus.intro', value:'30-аас дээш насны, ЭЕШ өгөөгүй иргэдэд зориулсан тусгай элсэлт.', label:'Программ: 30+ — тайлбар', multiline:true, order:51 },
  { key:'admission.program.thirty-plus.bulletsLabel', value:'Шаардлага', label:'Программ: 30+ — жагсаалтын гарчиг', order:52 },
  { key:'admission.program.thirty-plus.bullets', value:'Мэргэжлээрээ 3+ жил ажилласан байх\nАжлын газрын тодорхойлолт\nБүрэн дунд боловсролын гэрчилгээ', label:'Программ: 30+ — жагсаалт', multiline:true, order:53 },
  { key:'admission.program.thirty-plus.cta', value:'Хүсэлт илгээх', label:'Программ: 30+ — товчны текст', order:54 },

  { key:'admission.program.transfer-major.title', value:'МЭРГЭЖИЛ ХӨРВӨХ ХӨТӨЛБӨР', label:'Программ: Мэргэжил хөрвөх — гарчиг', order:60 },
  { key:'admission.program.transfer-major.intro', value:'Өмнө нь өөр мэргэжлээр төгссөн бол шинэ чиглэлээр суралцах боломж.', label:'Программ: Мэргэжил хөрвөх — тайлбар', multiline:true, order:61 },
  { key:'admission.program.transfer-major.bulletsLabel', value:'Хэнд тохиромжтой вэ?', label:'Программ: Мэргэжил хөрвөх — 1-р жагсаалтын гарчиг', order:62 },
  { key:'admission.program.transfer-major.bullets', value:'Коллеж, МСҮТ, их дээд сургууль төгсөгчид\nШинэ мэргэжил эзэмших хүсэлтэй хүмүүс\nЯпон хэл сураад Япон улсад үргэлжлүүлэн суралцах сонирхолтой', label:'Программ: Мэргэжил хөрвөх — 1-р жагсаалт', multiline:true, order:63 },
  { key:'admission.program.transfer-major.bullets2Label', value:'Бүрдүүлэх материал', label:'Программ: Мэргэжил хөрвөх — 2-р жагсаалтын гарчиг', order:64 },
  { key:'admission.program.transfer-major.bullets2', value:'Диплом, үнэмлэх\nХолбогдох бичиг баримтууд', label:'Программ: Мэргэжил хөрвөх — 2-р жагсаалт', multiline:true, order:65 },
  { key:'admission.program.transfer-major.cta', value:'Дэлгэрэнгүй', label:'Программ: Мэргэжил хөрвөх — товчны текст', order:66 },

  { key:'admission.program.transfer-abroad.title', value:'ГАДААДААС ШИЛЖИН СУРАЛЦАХ', label:'Программ: Гадаадаас шилжин — гарчиг', order:70 },
  { key:'admission.program.transfer-abroad.intro', value:'Гадаадад суралцаж байгаад шилжин ирэх боломжтой.', label:'Программ: Гадаадаас шилжин — тайлбар', multiline:true, order:71 },
  { key:'admission.program.transfer-abroad.bulletsLabel', value:'Нэмэлт шаардлага', label:'Программ: Гадаадаас шилжин — жагсаалтын гарчиг', order:72 },
  { key:'admission.program.transfer-abroad.bullets', value:'Суралцаж байсан сургуулийн дүнгийн хуулга\nБаталгаат орчуулга', label:'Программ: Гадаадаас шилжин — жагсаалт', multiline:true, order:73 },
  { key:'admission.program.transfer-abroad.cta', value:'Шилжилт хүсэх', label:'Программ: Гадаадаас шилжин — товчны текст', order:74 },

  { key:'admission.program.online.title', value:'ОНЛАЙН СУРГАЛТ', label:'Программ: Онлайн — гарчиг', order:80 },
  { key:'admission.program.online.intro', value:'Гадаадад ажиллаж, амьдарч буй иргэдэд зориулсан уян хатан хэлбэр.', label:'Программ: Онлайн — тайлбар', multiline:true, order:81 },
  { key:'admission.program.online.bullets', value:'100% онлайн сургалт\nБакалавр, магистрын зэрэг олгоно\nХаанаас ч суралцах боломж', label:'Программ: Онлайн — жагсаалт', multiline:true, order:82 },
  { key:'admission.program.online.cta', value:'Онлайнаар бүртгүүлэх', label:'Программ: Онлайн — товчны текст', order:83 },

  { key:'admission.program.preparation.title', value:'БЭЛТГЭЛ АНГИ', label:'Программ: Бэлтгэл анги — гарчиг', order:90 },
  { key:'admission.program.preparation.intro', value:'ЭЕШ-ийн оноо хүрээгүй элсэгчдэд зориулсан хөтөлбөр.', label:'Программ: Бэлтгэл анги — тайлбар', multiline:true, order:91 },
  { key:'admission.program.preparation.bullets', value:'1 жилийн бэлтгэл сургалт\nЭЕШ-д бэлтгэнэ\nОноо авсны дараа үндсэн ангид шилжинэ', label:'Программ: Бэлтгэл анги — жагсаалт', multiline:true, order:92 },
  { key:'admission.program.preparation.cta', value:'Бүртгүүлэх', label:'Программ: Бэлтгэл анги — товчны текст', order:93 },

  /* Steps */
  { key:'admission.step.1.title',       value:'МЭДЭЭЛЭЛ АВАХ',         label:'Алхам 1 — гарчиг', order:100 },
  { key:'admission.step.1.description', value:'Манай мэргэжлүүд, сургалтын төлбөр, тэтгэлэгийн талаар судал. Утсаар эсвэл биечлэн ирж зөвлөгөө аваарай.', label:'Алхам 1 — тайлбар', multiline:true, order:101 },
  { key:'admission.step.2.title',       value:'БҮРТГҮҮЛЭХ',            label:'Алхам 2 — гарчиг', order:102 },
  { key:'admission.step.2.description', value:'Онлайн эсвэл биечлэн бүртгүүлэх. ЭЕШ-ын батламж, гэрчилгээ, бусад баримт бичгээ бэлдээд ирээрэй.', label:'Алхам 2 — тайлбар', multiline:true, order:103 },
  { key:'admission.step.3.title',       value:'БАРИМТ ӨГӨХ',           label:'Алхам 3 — гарчиг', order:104 },
  { key:'admission.step.3.description', value:'ЭЕШ-ын батламж, суурь боловсролын гэрчилгээ, бүрэн дунд боловсролын гэрчилгээ, бусад шаардагдах баримт.', label:'Алхам 3 — тайлбар', multiline:true, order:105 },
  { key:'admission.step.4.title',       value:'ШАЛГАЛТ / ЯРИЛЦЛАГА',   label:'Алхам 4 — гарчиг', order:106 },
  { key:'admission.step.4.description', value:'Зарим мэргэжлийн ангид нэмэлт шалгалт эсвэл ярилцлага байж болно. Гадаадын иргэн, дээд боловсролтой иргэн эссэ бичиж, ярилцлагад орно.', label:'Алхам 4 — тайлбар', multiline:true, order:107 },
  { key:'admission.step.5.title',       value:'ҮР ДҮН',                label:'Алхам 5 — гарчиг', order:108 },
  { key:'admission.step.5.description', value:'Тэнцсэн элсэгчдэд суралцах эрхийн бичиг олгоно. Сургалтын төлбөр төлж бүртгэлээ дуусгана.', label:'Алхам 5 — тайлбар', multiline:true, order:109 },

  /* Requirements */
  { key:'admission.requirements', value:'Элсэлтийн ерөнхий шалгалтын батламжтай байх\nСуурь боловсролын гэрчилгээ болон бүрэн дунд боловсролын гэрчилгээтэй байх\nЭрүүл мэнд, сэтгэцийн хувьд тус сургуульд элсэхэд харшлах зүйлгүй байна\nГадаадын иргэн болон дээд боловсролтой Монгол улсын иргэн эссэ бичиж, ярилцлагад орно\nБүрдүүлэх материал: ЭЕШ батламж, гэрчилгээнүүд, иргэний үнэмлэх, цээж зураг', label:'Элсэгчдэд тавигдах шаардлага (мөр тус бүр = нэг шаардлага)', hint:'Мөр тус бүр тусдаа жагсаалтын мөр болно.', multiline:true, order:120 },

  /* Scholarships */
  { key:'admission.scholarship.1.title',       value:'Япон улсад 50% эсвэл 100% тэтгэлэгтэй суралцах', label:'Тэтгэлэг 1 — гарчиг', order:130 },
  { key:'admission.scholarship.1.description', value:'Шилдэг оюутнуудад Япон улсын 30 гаруй хамтран ажиллагч их сургуулиар тэтгэлэгтэй сургалт.', label:'Тэтгэлэг 1 — тайлбар', multiline:true, order:131 },
  { key:'admission.scholarship.2.title',       value:'Интерншип — цалинтай дадлага', label:'Тэтгэлэг 2 — гарчиг', order:132 },
  { key:'admission.scholarship.2.description', value:'Сард 2.5 сая төгрөгтэй тэнцэх (150,000 иений) цалинтай япон хэл, соёлын практик дадлага.', label:'Тэтгэлэг 2 — тайлбар', multiline:true, order:133 },
  { key:'admission.scholarship.3.title',       value:'Зуны амралтын тэтгэлэг', label:'Тэтгэлэг 3 — гарчиг', order:134 },
  { key:'admission.scholarship.3.description', value:'Багш, оюутнууд зуны амралтаараа 100% тэтгэлэгтэй хэлний бэлтгэлд суралцах боломж.', label:'Тэтгэлэг 3 — тайлбар', multiline:true, order:135 },
  { key:'admission.scholarship.4.title',       value:'Хөгжлийн бэрхшээлтэй элсэгчид', label:'Тэтгэлэг 4 — гарчиг', order:136 },
  { key:'admission.scholarship.4.description', value:'Хөгжлийн бэрхшээлтэй эсвэл эцэг эх нь хоёулаа хөгжлийн бэрхшээлтэй элсэгчдэд төлбөрийн хөнгөлөлт.', label:'Тэтгэлэг 4 — тайлбар', multiline:true, order:137 },
  { key:'admission.scholarship.5.title',       value:'Олон хүүхэдтэй өрхийн тэтгэлэг', label:'Тэтгэлэг 5 — гарчиг', order:138 },
  { key:'admission.scholarship.5.description', value:'Нэг өрхийн 3 болон түүнээс дээш хүүхэд дээд боловсрол эзэмшихээр зэрэг суралцаж буй бол 1 хүүхдийн төлбөрийн хөнгөлөлт.', label:'Тэтгэлэг 5 — тайлбар', multiline:true, order:139 },

  /* FAQ */
  { key:'admission.faq.1.question', value:'Япон хэл огт мэдэхгүй элсэж болох уу?', label:'FAQ 1 — асуулт', order:150 },
  { key:'admission.faq.1.answer',   value:'Тийм. Манай сургуульд япон хэлний бүх түвшний оюутан элсэх боломжтой. Бид анхан шатнаас N1 түвшин хүртэл системтэй сургалт явуулдаг.', label:'FAQ 1 — хариулт', multiline:true, order:151 },
  { key:'admission.faq.2.question', value:'Япон улсад ажиллах баталгаатай юу?', label:'FAQ 2 — асуулт', order:152 },
  { key:'admission.faq.2.answer',   value:'Манай төгсөгчдийн 40% Япон улсад ажиллаж байна. Интерншип хөтөлбөр болон 30 гаруй японы хамтрагч сургуулиар дамжуулан Япон улсад очих боломж өндөр.', label:'FAQ 2 — хариулт', multiline:true, order:153 },
  { key:'admission.faq.3.question', value:'Сургалтын төлбөр хэд вэ?', label:'FAQ 3 — асуулт', order:154 },
  { key:'admission.faq.3.answer',   value:'Жил тутмын сургалтын төлбөр болон төлбөрийн нөхцөлийн талаар манай элсэлтийн алба руу 7011-8584 утсаар лавлана уу.', label:'FAQ 3 — хариулт', multiline:true, order:155 },
  { key:'admission.faq.4.question', value:'Дотуур байр байгаа юу?', label:'FAQ 4 — асуулт', order:156 },
  { key:'admission.faq.4.answer',   value:'Тийм. Сургуулийн дэргэд дотуур байр ажиллаж байна. Орон нутгаас ирсэн оюутнуудыг хариуцлагатай шууд хариуцана.', label:'FAQ 4 — хариулт', multiline:true, order:157 },
  { key:'admission.faq.5.question', value:'Хэдэн настай элсэх боломжтой вэ?', label:'FAQ 5 — асуулт', order:158 },
  { key:'admission.faq.5.answer',   value:'Бүрэн дунд боловсрол эзэмшсэн, ЭЕШ-ын батламжтай 17 наснаас дээш насны иргэн элсэх боломжтой. Насны дээд хязгааргүй.', label:'FAQ 5 — хариулт', multiline:true, order:159 },
];

async function main() {
  console.log(`🌱 Seeding ${ROWS.length} admission SiteContent rows…`);
  let created = 0, skipped = 0;
  for (const row of ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: row.key } });
    if (ex) { skipped++; continue; }
    await prisma.siteContent.create({ data: { key: row.key, group: 'admission', type: 'TEXT', value: row.value, label: row.label, hint: row.hint ?? null, multiline: row.multiline ?? false, order: row.order } });
    created++;
  }
  console.log(`✅  Created: ${created}  Skipped: ${skipped}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
