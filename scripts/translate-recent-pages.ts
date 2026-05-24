/**
 * One-shot: backfill EN + JP translations for SiteContent groups that
 * were seeded MN-only:
 *   • careers         — careers.info.* (deadline, materials, contacts)
 *   • ahlah-programs  — levels.* (Бага / Дунд / Ахлах + 3 категори)
 *   • ahlah-cooperation — HS Хамтын ажиллагаа hero + exchange block
 *
 * Re-runnable. Only updates valueEn / valueJa.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface T {
  en: string;
  ja: string;
}

const TRANSLATIONS: Record<string, T> = {
  // ─── careers.info.* ──────────────────────────────────────────
  'careers.info.title': { en: 'Application info', ja: '応募について' },
  'careers.info.subtitle': {
    en:
      'Combine the documents below into a single PDF and send it during the application window.',
    ja:
      '下記の書類を1つのPDFにまとめ、受付期間内にお送りください。',
  },
  'careers.info.materials': {
    en:
      'Application form\nNotarised copies of diplomas, certificates and other credentials\nCopy of national ID, reference letter\nCopy of social-insurance booklet, reference letter',
    ja:
      '応募フォーム\n卒業証明書・その他証明書・資格証明書の公証謄本\n身分証明書のコピー、推薦状\n社会保険手帳のコピー、参考資料',
  },
  'careers.info.deadlineLabel': { en: 'Application window', ja: '受付期間' },
  'careers.info.deadlineValue': {
    en: '2026/05/18 — 2026/08/25',
    ja: '2026/05/18 — 2026/08/25',
  },
  'careers.info.emailLabel': { en: 'Email', ja: 'メール' },
  'careers.info.emails': {
    en: 'info@soyolerdem.edu.mn; nasaa1217@gmail.com',
    ja: 'info@soyolerdem.edu.mn; nasaa1217@gmail.com',
  },
  'careers.info.phoneLabel': { en: 'Phone', ja: '電話' },
  'careers.info.phone': { en: '98112008', ja: '98112008' },
  'careers.info.requirementsTitle': {
    en: 'Requirements',
    ja: '応募条件',
  },
  'careers.info.requirements': {
    en:
      "Master's or doctoral degree. Prior experience at a university or research institute is a plus.\nMinimum GPA: 2.8 at bachelor's, 3.0 at master's level.\nMature, ethical, communicative, and able to handle a busy workload.",
    ja:
      '修士または博士の学位を有すること。大学や研究機関での勤務経験があれば望ましい。\nGPA: 学士課程で2.8以上、修士課程で3.0以上。\n人格的に成熟し、倫理観があり、コミュニケーション力と業務負荷に耐える力を持つこと。',
  },

  // ─── ahlah-programs.levels.* ────────────────────────────────
  'ahlah-programs.levels.title': {
    en: 'Educational stages — what to expect',
    ja: '学校段階別 ― 特色',
  },
  'ahlah-programs.levels.subtitle': {
    en:
      'A short introduction to how Soyol Erdem delivers quality education and unlocks students\' abilities at each stage.',
    ja:
      '各段階でソヨル・エルデムがどのように質の高い教育を提供し、生徒の力を引き出すかを簡潔に紹介します。',
  },
  'ahlah-programs.levels.elementary.name': {
    en: 'Primary school',
    ja: '小学校',
  },
  'ahlah-programs.levels.elementary.education': {
    en:
      'We build solid foundations in reading, writing and arithmetic inside a bilingual Japanese-Mongolian environment. Each class has a teacher plus a teaching assistant.',
    ja:
      '日本語とモンゴル語のバイリンガル環境で、読む・書く・計算の基礎を確実に身につけます。各クラスに担任と副担任を配置。',
  },
  'ahlah-programs.levels.elementary.curriculum': {
    en:
      'Mongolian, Mathematics, Japanese (beginner), Natural Science, Social Studies, Arts, Music, Physical Education.',
    ja:
      '国語、算数、日本語(初級)、自然科学、社会科、図工、音楽、体育。',
  },
  'ahlah-programs.levels.elementary.extracurricular': {
    en:
      'Japanese language club, drawing, chess, dance, origami, sports games. Two or three field trips per year.',
    ja:
      '日本語クラブ、絵画、チェス、ダンス、折り紙、スポーツ・ゲーム。年に2〜3回の見学旅行。',
  },
  'ahlah-programs.levels.middle.name': { en: 'Middle school', ja: '中学校' },
  'ahlah-programs.levels.middle.education': {
    en:
      'Students reach JLPT N5–N4 in Japanese, develop positive thinking and build the foundations of scientific reasoning. Strong STEM focus.',
    ja:
      '日本語能力をJLPT N5〜N4まで引き上げ、前向きな思考と科学の基礎を養います。STEM重視。',
  },
  'ahlah-programs.levels.middle.curriculum': {
    en:
      'Mongolian, Mathematics, Japanese, English, Physics, Chemistry, Biology, Geography, History, IT basics.',
    ja:
      '国語、数学、日本語、英語、物理、化学、生物、地理、歴史、IT基礎。',
  },
  'ahlah-programs.levels.middle.extracurricular': {
    en:
      'JLPT preparation club, robotics, mini research projects, sports (karate, volleyball), public-speaking club.',
    ja:
      'JLPT対策クラブ、ロボティクス、ミニ研究プロジェクト、スポーツ(空手・バレーボール)、スピーチクラブ。',
  },
  'ahlah-programs.levels.high.name': { en: 'High school', ja: '高等学校' },
  'ahlah-programs.levels.high.education': {
    en:
      'Japanese (JLPT N3–N2) and a general-education programme specialised in IT. 2+2 exchange options and pathways to continue study in Japan.',
    ja:
      '日本語(JLPT N3〜N2)、ITに特化した普通教育。2+2交換プログラムや日本への進学経路。',
  },
  'ahlah-programs.levels.high.curriculum': {
    en:
      'Advanced Japanese, IT (programming, web, databases), Mathematics, Physics, Chemistry, English, Social Studies.',
    ja:
      '上級日本語、IT(プログラミング・Web・データベース)、数学、物理、化学、英語、社会科。',
  },
  'ahlah-programs.levels.high.extracurricular': {
    en:
      'Japan studies club, IT hackathon, JLPT prep, student council, sports (basketball, table tennis), exchange visits to Japan.',
    ja:
      '日本研究クラブ、ITハッカソン、JLPT対策、生徒会、スポーツ(バスケットボール・卓球)、日本への交換訪問。',
  },

  // ─── ahlah-cooperation.* ────────────────────────────────────
  'ahlah-cooperation.hero.subtitle': {
    en:
      'Japan-based and Mongolia-based partner institutions, and our student-exchange programme.',
    ja:
      '日本国内・モンゴル国内のパートナー機関と、生徒交換プログラム。',
  },
  'ahlah-cooperation.intro.body': {
    en:
      "Our high school benefits from Soyol Erdem University's long-standing network of partner institutions in Japan and Mongolia. The network opens up rich international-education opportunities for students and teachers alike.",
    ja:
      '本校は、ソヨル・エルデム大学の長年にわたる日本国内・モンゴル国内のパートナー機関との関係から恩恵を受けています。このネットワークは、生徒と教員双方に豊かな国際教育の機会をもたらしています。',
  },
  'ahlah-cooperation.exchange.title': {
    en: 'Student exchange programme',
    ja: '生徒交換プログラム',
  },
  'ahlah-cooperation.exchange.body': {
    en:
      'Soyol Erdem High School organises a student-exchange programme every year together with its partner high schools in Japan. Participating students study in Japan for one week up to one year and experience Japanese language and culture first-hand.',
    ja:
      'ソヨル・エルデム高校は、提携先の日本の高校とともに、毎年生徒交換プログラムを実施しています。参加者は1週間〜1年間、日本に滞在し、日本語と文化を直接体験します。',
  },
  'ahlah-cooperation.exchange.highlights': {
    en:
      '1-week to 1-year exchanges\nDirect immersion in Japanese language & culture\nHost-family arrangements\nOngoing school supervision and care',
    ja:
      '1週間〜1年間の交換留学\n日本語・日本文化への直接的な没入\nホストファミリーの手配\n学校による継続的なサポート',
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
