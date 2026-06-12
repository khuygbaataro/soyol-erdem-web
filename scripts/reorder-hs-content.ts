/**
 * High-school content housekeeping (idempotent, re-runnable):
 *
 *   1) Register NEW editable rows for the HS "Танилцуулга" (about) intro
 *      block + director portrait so they can be edited from
 *      /high-school/admin/site-content?group=ahlah-about.
 *   2) Re-sequence the SiteContent `order` of EVERY ahlah-home and
 *      ahlah-about key so the admin panel lists fields top-to-bottom in the
 *      SAME order they appear on the public page (no interleaving).
 *
 * Only `order` (and the new rows) are touched — existing `value`s edited by
 * admins are never overwritten.
 *
 * Run: npx tsx scripts/reorder-hs-content.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ── 1) New about-intro + director-image rows (create-if-missing) ──────────
type NewRow = {
  key: string;
  type: 'TEXT' | 'IMAGE';
  value: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  order: number;
};

const NEW_ABOUT_ROWS: NewRow[] = [
  {
    key: 'ahlah-about.intro.badge',
    type: 'TEXT',
    value: 'Японы хөрөнгө оруулалттай · 2023 онд байгуулагдсан',
    label: 'Танилцуулга — pill',
    hint: 'Гарчгийн дээр харагдах жижиг алтан pill.',
    order: 10,
  },
  {
    key: 'ahlah-about.intro.title1',
    type: 'TEXT',
    value: 'Хичээнгүй суралцагч,',
    label: 'Танилцуулга — гарчиг 1-р мөр',
    order: 11,
  },
  {
    key: 'ahlah-about.intro.title2',
    type: 'TEXT',
    value: 'Чадварлаг багш, Япон хэл, соёл',
    label: 'Танилцуулга — гарчиг 2-р мөр',
    order: 12,
  },
  {
    key: 'ahlah-about.intro.body1',
    type: 'TEXT',
    value:
      'Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургууль нь {date}-нд япон улсын хөрөнгө оруулалттайгаар үүсгэн байгуулагдаж, 2023–2024 оны хичээлийн жилд 10–11 ангитайгаар, нийт мэргэжлийн 11 багш, 2 япон хэлний багштайгаар үйл ажиллагаагаа эхэлсэн.',
    label: 'Танилцуулга — 1-р параграф',
    hint: '{date} гэсэн хэсэгт доорх "огноо" талбарын утга тод (bold) орж харагдана. {date}-г байрлуулсан газраа үлдээнэ үү.',
    multiline: true,
    order: 13,
  },
  {
    key: 'ahlah-about.intro.body1.date',
    type: 'TEXT',
    value: '2023 оны 8-р сарын 30',
    label: 'Танилцуулга — 1-р параграф доторх тод огноо',
    order: 14,
  },
  {
    key: 'ahlah-about.intro.body2',
    type: 'TEXT',
    value:
      'Манай сургууль нь эх сургууль болох Соёл Эрдэм Дээд Сургуулийн 30+ жилийн япон судлалын баялаг туршлагад тулгуурлан япон хэл, соёл болон мэдээллийн технологид төрөлжсөн ерөнхий боловсролын сургалт явуулдаг.',
    label: 'Танилцуулга — 2-р параграф',
    multiline: true,
    order: 15,
  },
  {
    key: 'ahlah-about.intro.poster.line1',
    type: 'TEXT',
    value: 'Senior High School',
    label: 'Танилцуулга зураг — дээд жижиг текст',
    order: 17,
  },
  {
    key: 'ahlah-about.intro.poster.line2',
    type: 'TEXT',
    value: 'Соёл Эрдэм',
    label: 'Танилцуулга зураг — гарчиг',
    order: 18,
  },
  {
    key: 'ahlah-about.intro.poster.line3',
    type: 'TEXT',
    value: 'Япон-Монголын боловсролын гүүр',
    label: 'Танилцуулга зураг — товч тайлбар',
    order: 19,
  },
  {
    key: 'ahlah-about.director.image',
    type: 'IMAGE',
    value: '',
    label: 'Захирлын мэндчилгээ — захирлын зураг',
    hint: 'Босоо (4:5) зураг сайн харагдана. Хоосон бол default зураг харагдана.',
    order: 33,
  },
];

// ── 2) Canonical order maps (match the public page section flow) ──────────
const HOME_ORDER: Record<string, number> = {
  'ahlah-home.hero.title': 1,
  'ahlah-home.hero.subtitle': 2,
  'ahlah-home.hero.image': 3,
  'ahlah-home.intro.badge': 10,
  'ahlah-home.intro.title': 11,
  'ahlah-home.intro.body': 12,
  'ahlah-home.intro.body2': 13,
  'ahlah-home.intro.image': 14,
  'ahlah-home.intro.overlay.eyebrow': 15,
  'ahlah-home.intro.overlay.title': 16,
  'ahlah-home.intro.overlay.subtitle': 17,
  'ahlah-home.philosophy.title': 20,
  'ahlah-home.philosophy.1.label': 21,
  'ahlah-home.philosophy.1.title': 22,
  'ahlah-home.philosophy.1.body': 23,
  'ahlah-home.philosophy.2.label': 24,
  'ahlah-home.philosophy.2.title': 25,
  'ahlah-home.philosophy.2.body': 26,
  'ahlah-home.philosophy.3.label': 27,
  'ahlah-home.philosophy.3.title': 28,
  'ahlah-home.philosophy.3.body': 29,
  'ahlah-home.stat.1.value': 30,
  'ahlah-home.stat.1.label': 31,
  'ahlah-home.stat.2.value': 32,
  'ahlah-home.stat.2.label': 33,
  'ahlah-home.stat.3.value': 34,
  'ahlah-home.stat.3.label': 35,
  'ahlah-home.stat.4.value': 36,
  'ahlah-home.stat.4.label': 37,
  'ahlah-home.programs.title': 40,
  'ahlah-home.programs.subtitle': 41,
  'ahlah-home.program.1.title': 42,
  'ahlah-home.program.1.description': 43,
  'ahlah-home.program.2.title': 44,
  'ahlah-home.program.2.description': 45,
  'ahlah-home.program.3.title': 46,
  'ahlah-home.program.3.description': 47,
  'ahlah-home.program.4.title': 48,
  'ahlah-home.program.4.description': 49,
  'ahlah-home.highlights.title': 50,
  'ahlah-home.highlight.1.title': 51,
  'ahlah-home.highlight.1.body': 52,
  'ahlah-home.highlight.2.title': 53,
  'ahlah-home.highlight.2.body': 54,
  'ahlah-home.highlight.3.title': 55,
  'ahlah-home.highlight.3.body': 56,
  'ahlah-home.highlight.4.title': 57,
  'ahlah-home.highlight.4.body': 58,
  'ahlah-home.news.title': 60,
  'ahlah-home.contact.eyebrow': 70,
  'ahlah-home.contact.title': 71,
  'ahlah-home.contact.phone.label': 72,
  'ahlah-home.contact.phone.primary': 73,
  'ahlah-home.contact.phone.secondary': 74,
  'ahlah-home.contact.email.label': 75,
  'ahlah-home.contact.email.value': 76,
  'ahlah-home.contact.admission.label': 77,
  'ahlah-home.contact.admission.value': 78,
  'ahlah-home.contact.admission.cta': 79,
  'ahlah-home.contact.other.cta': 80,
  'ahlah-home.banner.title': 90,
  'ahlah-home.banner.subtitle': 91,
  'ahlah-home.banner.cta': 92,
  'ahlah-home.banner.secondary.cta': 93,
};

const ABOUT_ORDER: Record<string, number> = {
  'ahlah-about.hero.image': 1,
  'ahlah-about.hero.title': 2,
  'ahlah-about.hero.subtitle': 3,
  'ahlah-about.intro.badge': 10,
  'ahlah-about.intro.title1': 11,
  'ahlah-about.intro.title2': 12,
  'ahlah-about.intro.body1': 13,
  'ahlah-about.intro.body1.date': 14,
  'ahlah-about.intro.body2': 15,
  'ahlah-about.intro.image': 16,
  'ahlah-about.intro.poster.line1': 17,
  'ahlah-about.intro.poster.line2': 18,
  'ahlah-about.intro.poster.line3': 19,
  'ahlah-about.director.title': 30,
  'ahlah-about.director.name': 31,
  'ahlah-about.director.role': 32,
  'ahlah-about.director.image': 33,
  'ahlah-about.director.body.1': 34,
  'ahlah-about.director.body.2': 35,
  'ahlah-about.director.body.3': 36,
  'ahlah-about.stat.1.value': 40,
  'ahlah-about.stat.1.label': 41,
  'ahlah-about.stat.2.value': 42,
  'ahlah-about.stat.2.label': 43,
  'ahlah-about.stat.3.value': 44,
  'ahlah-about.stat.3.label': 45,
  'ahlah-about.stat.4.value': 46,
  'ahlah-about.stat.4.label': 47,
  'ahlah-about.partnerships.title': 50,
  'ahlah-about.partnerships.subtitle': 51,
  'ahlah-about.partnerships.item.1': 52,
  'ahlah-about.partnerships.item.2': 53,
  'ahlah-about.partnerships.item.3': 54,
  'ahlah-about.partnerships.item.4': 55,
  'ahlah-about.partnerships.item.5': 56,
  'ahlah-about.partnerships.item.6': 57,
  // Legacy generic key the page no longer renders — keep last.
  'ahlah-about.body': 99,
};

// The footer/navbar (app/high-school/(public)/layout.tsx) reads these from
// the `ahlah-footer` group, but they were originally created in `ahlah-home`
// — so footer edits had no effect AND they cluttered the home admin tab.
// Move them into ahlah-footer with a clean order (banner.* already there at
// 1–2; footer contact info follows).
const FOOTER_MOVE: Record<string, number> = {
  'ahlah-footer.tagline': 10,
  'ahlah-footer.phone.primary': 11,
  'ahlah-footer.phone.secondary': 12,
  'ahlah-footer.email': 13,
  'ahlah-footer.address': 14,
};

async function main() {
  // 1) Create new about rows if absent (never overwrite existing values).
  let created = 0,
    skipped = 0;
  for (const r of NEW_ABOUT_ROWS) {
    const ex = await prisma.siteContent.findUnique({ where: { key: r.key } });
    if (ex) {
      skipped++;
      continue;
    }
    await prisma.siteContent.create({
      data: {
        key: r.key,
        group: 'ahlah-about',
        type: r.type,
        value: r.value,
        label: r.label,
        hint: r.hint ?? null,
        multiline: r.multiline ?? false,
        order: r.order,
      },
    });
    created++;
  }
  console.log(`New about rows: created ${created}, skipped ${skipped}`);

  // 2) Re-sequence orders for both groups.
  let reordered = 0;
  for (const [key, order] of [
    ...Object.entries(HOME_ORDER),
    ...Object.entries(ABOUT_ORDER),
  ]) {
    const res = await prisma.siteContent.updateMany({
      where: { key },
      data: { order },
    });
    reordered += res.count;
  }
  console.log(`Re-ordered ${reordered} rows (ahlah-home + ahlah-about).`);

  // 3) Move mis-grouped footer rows out of ahlah-home into ahlah-footer.
  let moved = 0;
  for (const [key, order] of Object.entries(FOOTER_MOVE)) {
    const res = await prisma.siteContent.updateMany({
      where: { key },
      data: { group: 'ahlah-footer', order },
    });
    moved += res.count;
  }
  console.log(`Moved ${moved} footer rows into the ahlah-footer group.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
