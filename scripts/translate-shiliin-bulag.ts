/**
 * One-shot: backfill EN + JP translations for the Шилийн булаг
 * SiteContent rows. The original seed in add-shiliin-bulag.ts populated
 * only `value` (MN), which meant JP / EN visitors saw empty strings
 * because the site-content resolver intentionally does NOT fall back
 * from valueJa/valueEn to the canonical MN.
 *
 * Re-runnable. Only updates valueEn / valueJa (leaves value alone),
 * so admin edits to the canonical MN copy are not disturbed.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface T {
  en: string;
  ja: string;
}

const TRANSLATIONS: Record<string, T> = {
  'shiliin-bulag.hero.subtitle': {
    en: 'The university-run horseback-riding tourist camp — 63 km east of Ulaanbaatar along a road developed with Japanese ODA support.',
    ja: '本学が運営する乗馬ツーリストキャンプ — ウランバートル市から東へ約63km、日本のODA支援で整備された道路沿いに位置します。',
  },

  'shiliin-bulag.intro.title': {
    en: 'Training ground and business in one',
    ja: '実践研修と事業の融合',
  },
  'shiliin-bulag.intro.body': {
    en:
      'Soyol Erdem University runs the Shiliin Bulag Equestrian Tourist Camp as both a practical training ground for students and a business unit that supports the university\'s operational funding. The camp is operated jointly with the Newshilin International Travel Company.\n\nOur students and the affiliated high-school pupils take part in everything from assisting the riding instructors and cleaning to restaurant service and back-office work. The camp has been run with "safety first" as its motto for 35 years with no major incidents.',
    ja:
      '本学が運営する「シリンボラグ乗馬ツーリストキャンプ」は、学生たちの実践研修の場であると同時に、大学運営資金を補うための事業として、ニューシリン・インターナショナル国際旅行社と共同で運営しています。\n\n本学の学生や附属高等学校の生徒たちが、乗馬インストラクターの補助、清掃作業、レストラン業務、事務管理まで幅広く担当し、運営の中心となっています。創設以来35年間、大きな事故もなく安全第一をモットーに運営してきました。',
  },

  // ── Features ─────────────────────────────────────────────────
  'shiliin-bulag.feature.1.title': { en: 'Capacity', ja: '収容人数' },
  'shiliin-bulag.feature.1.body': {
    en: 'Around 130 guests can be accommodated in gers and lodging.',
    ja: '約130名収容可能。ゲル(伝統的住居)と客室。',
  },
  'shiliin-bulag.feature.2.title': { en: 'Safety record', ja: '安全実績' },
  'shiliin-bulag.feature.2.body': {
    en: 'Operated for 35 years without a major incident.',
    ja: '35年間、大きな事故もなく運営。',
  },
  'shiliin-bulag.feature.3.title': { en: 'Comfortable facilities', ja: '快適な設備' },
  'shiliin-bulag.feature.3.body': {
    en: 'Flush toilets, showers, sauna and full restaurant service.',
    ja: '水洗トイレ、シャワー、サウナ、レストランを完備。',
  },
  'shiliin-bulag.feature.4.title': { en: 'Student-led', ja: '学生主体' },
  'shiliin-bulag.feature.4.body': {
    en:
      'Japanese-learning students serve guests directly, opening up genuine language and cultural exchange.',
    ja:
      '日本語を学ぶ学生たちが直接お客様をおもてなしし、日本語・文化交流の機会が広がります。',
  },

  // ── Activities ───────────────────────────────────────────────
  'shiliin-bulag.activities.title': { en: 'What you can do', ja: '体験できること' },
  'shiliin-bulag.activities.items': {
    en:
      'Visit a nomad family in their ger\nTry traditional dairy — milk tea, cheese, airag (fermented mare\'s milk), yoghurt\nLearn to ride a horse (beginner & advanced)\nStargazing under a clear Mongolian sky\nJapanese language & culture exchange\nWalk in nature and pick forest berries',
    ja:
      '遊牧民のゲルを訪問\n伝統的な乳製品 — ミルクティー、チーズ、馬乳酒、ヨーグルト\n乗馬体験(初級・上級)\n満天の星空観賞\n日本語・日本文化の交流\n自然散策、森のベリー狩り',
  },

  // ── Horsemanship ─────────────────────────────────────────────
  'shiliin-bulag.horsemanship.title': {
    en: 'Step-by-step horseback riding',
    ja: '段階的な乗馬レッスン',
  },
  'shiliin-bulag.horsemanship.body': {
    en:
      'Beginners start with a 1-on-1 lead. From there the progression goes: walk → trot → posting trot → canter → gallop.',
    ja:
      '初心者はマンツーマンで引き馬から始めます。その後、常歩 → 速歩 → 軽速歩 → 駈歩 → 襲歩へと段階的にレッスンします。',
  },

  // ── Contact ─────────────────────────────────────────────────
  'shiliin-bulag.contact.title': {
    en: 'Booking & enquiries',
    ja: 'ご予約・お問い合わせ',
  },
  // phone1 / phone2 / email — same value across locales, but copying
  // ensures the site-content resolver doesn't fall through to ''.
  'shiliin-bulag.contact.phone1': {
    en: '+976 7011-8584',
    ja: '+976 7011-8584',
  },
  'shiliin-bulag.contact.phone2': {
    en: '+976 9526-6868',
    ja: '+976 9526-6868',
  },
  'shiliin-bulag.contact.email': {
    en: 'info@soyolerdem.edu.mn',
    ja: 'info@soyolerdem.edu.mn',
  },
  'shiliin-bulag.contact.location': {
    en: 'About 63 km east of Ulaanbaatar.',
    ja: 'ウランバートル市から東へ約63km。',
  },
  'shiliin-bulag.contact.partner': {
    en: 'Newshilin International Travel Company',
    ja: 'ニューシリン・インターナショナル国際旅行社',
  },
};

async function main() {
  let updated = 0;
  let missing = 0;
  for (const [key, t] of Object.entries(TRANSLATIONS)) {
    const existing = await prisma.siteContent.findUnique({
      where: { key },
      select: { id: true },
    });
    if (!existing) {
      console.warn(`  ⚠ key not found, skip: ${key}`);
      missing++;
      continue;
    }
    await prisma.siteContent.update({
      where: { key },
      data: { valueEn: t.en, valueJa: t.ja },
    });
    updated++;
  }
  console.log(
    `✔ done. updated=${updated}, missing=${missing}, total=${Object.keys(TRANSLATIONS).length}`,
  );
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
