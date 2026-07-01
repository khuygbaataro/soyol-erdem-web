/**
 * One-shot: register the Шилийн булаг tourist-camp page content
 * (hero, intro, 4 feature cards, gallery, activities, contact) in
 * SiteContent so admin can edit every field from /admin/site-content
 * → "Шилийн булаг" tab.
 *
 * Idempotent — re-runnable.
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
  // ── Hero ─────────────────────────────────────────────────────
  {
    key: 'shiliin-bulag.hero.image',
    type: 'IMAGE',
    label: 'Hero — баннер зураг',
    hint: 'Хуудасны дээд талын баннер. Хоосон бол default зураг.',
    value: '/shiliin-bulag/hero.jpg',
    order: 1,
  },
  {
    key: 'shiliin-bulag.hero.subtitle',
    type: 'TEXT',
    label: 'Hero — доод текст',
    value:
      'Соёл Эрдэм Дээд Сургуулийн харьяа жуулчны бааз — Улаанбаатар хотоос зүүн тийш 63 км, японы ОДА-ийн төслөөр шинэчилсэн зам дагуу.',
    multiline: true,
    order: 2,
  },

  // ── Intro ────────────────────────────────────────────────────
  {
    key: 'shiliin-bulag.intro.title',
    type: 'TEXT',
    label: 'Танилцуулга — гарчиг',
    value: 'Сургалт ба бизнесийн хослол',
    order: 10,
  },
  {
    key: 'shiliin-bulag.intro.body',
    type: 'TEXT',
    label: 'Танилцуулга — параграф',
    hint: 'Олон догол мөр бичих боломжтой.',
    value:
      'Бидний удирдан явуулдаг "Шилийн булаг морин жуулчны бааз" нь оюутнуудын дадлагын газар бөгөөд сургуулийн санхүүгийн дэмжлэгийг бүрдүүлэх бизнесийн нэгж юм. Бид "Шинцолын олон улсын аяллын" компанитай хамтран ажилладаг.\n\nМанай оюутнууд болон харьяа ахлах сургуулийн сурагчид морин дасгалжуулагчдын туслах, цэвэрлэгээ, рестораны үйлчилгээ, мөн захиргааны ажил хүртэл өргөн хүрээтэйгээр ажилладаг. 35 жилийн турш ноцтой осолгүй ажилласан туршлагатай.',
    multiline: true,
    order: 11,
  },

  // ── Feature cards (4) ────────────────────────────────────────
  {
    key: 'shiliin-bulag.feature.1.title',
    type: 'TEXT',
    label: 'Онцлог 1 — гарчиг',
    value: 'Хүчин чадал',
    order: 20,
  },
  {
    key: 'shiliin-bulag.feature.1.body',
    type: 'TEXT',
    label: 'Онцлог 1 — текст',
    value: '130 орчим хүний багтаамжтай, гэр / байр.',
    multiline: true,
    order: 21,
  },
  {
    key: 'shiliin-bulag.feature.2.title',
    type: 'TEXT',
    label: 'Онцлог 2 — гарчиг',
    value: 'Аюулгүй байдал',
    order: 22,
  },
  {
    key: 'shiliin-bulag.feature.2.body',
    type: 'TEXT',
    label: 'Онцлог 2 — текст',
    value: '35 жилийн турш ноцтой осолгүй ажилласан.',
    multiline: true,
    order: 23,
  },
  {
    key: 'shiliin-bulag.feature.3.title',
    type: 'TEXT',
    label: 'Онцлог 3 — гарчиг',
    value: 'Тав тухтай орчин',
    order: 24,
  },
  {
    key: 'shiliin-bulag.feature.3.body',
    type: 'TEXT',
    label: 'Онцлог 3 — текст',
    value: 'Усан жорлон, шүршүүр, саун, рестораны үйлчилгээ.',
    multiline: true,
    order: 25,
  },
  {
    key: 'shiliin-bulag.feature.4.title',
    type: 'TEXT',
    label: 'Онцлог 4 — гарчиг',
    value: 'Оюутны дадлага',
    order: 26,
  },
  {
    key: 'shiliin-bulag.feature.4.body',
    type: 'TEXT',
    label: 'Онцлог 4 — текст',
    value:
      'Япон хэл сурч буй оюутнууд танай зочдод үйлчлэн, япон хэл, соёлын солилцоо хийнэ.',
    multiline: true,
    order: 27,
  },

  // ── Activities ───────────────────────────────────────────────
  {
    key: 'shiliin-bulag.activities.title',
    type: 'TEXT',
    label: 'Үйл ажиллагаа — гарчиг',
    value: 'Юу хийж болох вэ?',
    order: 30,
  },
  {
    key: 'shiliin-bulag.activities.items',
    type: 'TEXT',
    label: 'Үйл ажиллагаа — жагсаалт',
    hint: 'Шинэ мөр бүрд нэг үйл ажиллагаа бичнэ. Жагсаалт болж харагдана.',
    value:
      'Малчин айлын гэрт зочлох\nЦагаан идээ — сүүтэй цай, бяслаг, айраг, тараг\nМорь унаж сурах (анхан, ахисан түвшин)\nОдтой тэнгэрийг харах\nЯпон хэл / соёлын солилцоо\nБайгальд зугаалах, ой модны жимс түүх',
    multiline: true,
    order: 31,
  },

  // ── Horsemanship ─────────────────────────────────────────────
  {
    key: 'shiliin-bulag.horsemanship.title',
    type: 'TEXT',
    label: 'Морь унах сургалт — гарчиг',
    value: 'Морь унах сургалт — алхам алхамаар',
    order: 40,
  },
  {
    key: 'shiliin-bulag.horsemanship.body',
    type: 'TEXT',
    label: 'Морь унах сургалт — тайлбар',
    value:
      'Анхан шатанд нэг-нэгээр нь хөтөлж сургана. Дараа нь: алхах → жороор явах → posting trot (босож-суух) → жогсох (canter) → давхих (gallop) хүртэл шат шатаар суралцана.',
    multiline: true,
    order: 41,
  },

  // ── Gallery (unlimited, JSON array of URLs) ─────────────────
  {
    key: 'shiliin-bulag.gallery.images',
    type: 'IMAGE',
    label: 'Зургийн цомог',
    hint: 'Олон зураг нэмэх, дараалал өөрчлөх, устгах боломжтой.',
    value: JSON.stringify([
      '/shiliin-bulag/01.jpg',
      '/shiliin-bulag/02.jpg',
      '/shiliin-bulag/03.jpg',
      '/shiliin-bulag/04.jpg',
      '/shiliin-bulag/05.jpg',
    ]),
    order: 50,
  },

  // ── Contact / location ───────────────────────────────────────
  {
    key: 'shiliin-bulag.contact.title',
    type: 'TEXT',
    label: 'Холбоо барих — гарчиг',
    value: 'Захиалга өгөх / лавлах',
    order: 60,
  },
  {
    key: 'shiliin-bulag.contact.phone1',
    type: 'TEXT',
    label: 'Холбоо барих — утас 1',
    value: '+976 7011-8584',
    order: 61,
  },
  {
    key: 'shiliin-bulag.contact.phone2',
    type: 'TEXT',
    label: 'Холбоо барих — утас 2',
    value: '+976 9526-6868',
    order: 62,
  },
  {
    key: 'shiliin-bulag.contact.email',
    type: 'TEXT',
    label: 'Холбоо барих — имэйл',
    value: 'info@soyolerdem.edu.mn',
    order: 63,
  },
  {
    key: 'shiliin-bulag.contact.location',
    type: 'TEXT',
    label: 'Байршил',
    value: 'Улаанбаатар хотоос зүүн тийш ойролцоогоор 63 км.',
    multiline: true,
    order: 64,
  },
  {
    key: 'shiliin-bulag.contact.partner',
    type: 'TEXT',
    label: 'Хамтрагч',
    value: 'Шинцолын олон улсын аяллын компани',
    order: 65,
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
        type: r.type,
        value: r.value,
        group: 'shiliin-bulag',
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
