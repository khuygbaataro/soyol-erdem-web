/**
 * One-shot: register the 5 new teaching positions from Munkhchimeg's
 * "СЭДС-д багш сонгон шалгаруулж авна" announcement (2026 spring
 * intake) into the JobOpening table.
 *
 * Per the docx, the positions break down across 2 departments:
 *   Япон судлалын тэнхим
 *     - Гадаад хэлний орчуулга /япон/   × 2 орон тоо
 *     - Олон улс, орон судлал, япон судлал × 1
 *     - Аялал жуулчлал, зочлох үйлчилгээ   × 1
 *   Мэдээллийн технологийн тэнхим
 *     - Программ хангамж, кибер аюулгүй байдал × 1
 *
 * Idempotent — re-runnable. Each row is keyed on slug, and `update: {}`
 * preserves admin edits made after the first run.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Row = {
  slug: string;
  title: string;
  description: string;
  titleEn: string;
  titleJa: string;
  descriptionEn: string;
  descriptionJa: string;
  order: number;
};

const ROWS: Row[] = [
  {
    slug: 'japan-translation-teacher',
    title: 'Гадаад хэлний орчуулга (Япон) — багш',
    description:
      'Япон судлалын тэнхим · 2 орон тоо. JLPT N2-аас дээш түвшинтэй. Ахисан, дунд япон хэлний унших, бичих, ярих, сонсох; ханз; үгийн сан судлал заана.',
    titleEn: 'Japanese-Mongolian Translation Instructor',
    titleJa: '日本語通訳・翻訳 教員',
    descriptionEn:
      'Japanese Studies Department · 2 positions. JLPT N2 or higher. Teaches advanced/intermediate Japanese (reading, writing, speaking, listening), kanji, and vocabulary studies.',
    descriptionJa:
      '日本研究学科・2名募集。JLPT N2以上。中上級日本語（読解・作文・会話・聴解）、漢字、語彙論を担当。',
    order: 10,
  },
  {
    slug: 'japan-area-studies-teacher',
    title: 'Олон улс, орон судлал, япон судлал — багш',
    description:
      'Япон судлалын тэнхим · 1 орон тоо. Дэлхийн түүх; Японы түүх; Японы нийгэм, соёл; Японы эдийн засгийн газар зүй; Японы улс төр, гадаад харилцаа.',
    titleEn: 'International / Japanese Area Studies Instructor',
    titleJa: '国際・地域研究（日本研究）教員',
    descriptionEn:
      'Japanese Studies Department · 1 position. Teaches World History, Japanese History, Japanese Society & Culture, Economic Geography of Japan, Japanese Politics & Foreign Relations.',
    descriptionJa:
      '日本研究学科・1名募集。世界史、日本史、日本の社会・文化、日本経済地理、日本政治・外交を担当。',
    order: 11,
  },
  {
    slug: 'tourism-hospitality-teacher',
    title: 'Аялал жуулчлал, зочлох үйлчилгээ — багш',
    description:
      'Япон судлалын тэнхим · 1 орон тоо. Аялал жуулчлалын газар зүй, зураг зүй; байгалийн газар зүй; менежмент; маркетинг; зочлох, угтах үйлчилгээ.',
    titleEn: 'Tourism & Hospitality Instructor',
    titleJa: '観光・ホスピタリティ 教員',
    descriptionEn:
      'Japanese Studies Department · 1 position. Tourism Geography & Cartography, Physical Geography, Tourism Management, Tourism Marketing, Hospitality Services.',
    descriptionJa:
      '日本研究学科・1名募集。観光地理学・地図学、自然地理学、観光経営、観光マーケティング、ホスピタリティ実務を担当。',
    order: 12,
  },
  {
    slug: 'software-cybersecurity-teacher',
    title: 'Программ хангамж, кибер аюулгүй байдал — багш',
    description:
      'Мэдээллийн технологийн тэнхим · 1 орон тоо. Үйлдлийн систем; өгөгдлийн бүтэц; өгөгдлийн сангийн програмчлал; хиймэл оюун; машин сургалт; зүйлсийн интернет.',
    titleEn: 'Software & Cybersecurity Instructor',
    titleJa: 'ソフトウェア・サイバーセキュリティ 教員',
    descriptionEn:
      'Information Technology Department · 1 position. Operating Systems, Data Structures, Database Programming, AI, Machine Learning, Internet of Things.',
    descriptionJa:
      '情報技術学科・1名募集。オペレーティングシステム、データ構造、データベースプログラミング、AI、機械学習、IoTを担当。',
    order: 13,
  },
];

async function main() {
  let created = 0;
  let existing = 0;
  for (const r of ROWS) {
    const existed = await prisma.jobOpening.findUnique({
      where: { slug: r.slug },
      select: { id: true },
    });
    await prisma.jobOpening.upsert({
      where: { slug: r.slug },
      update: {},
      create: {
        slug: r.slug,
        title: r.title,
        description: r.description,
        titleEn: r.titleEn,
        titleJa: r.titleJa,
        descriptionEn: r.descriptionEn,
        descriptionJa: r.descriptionJa,
        active: true,
        order: r.order,
      },
    });
    if (existed) existing++;
    else created++;
  }
  console.log(
    `✔ done. created=${created}, already-existed=${existing}, total=${ROWS.length}`,
  );
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
