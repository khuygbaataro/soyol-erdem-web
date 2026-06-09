/**
 * One-shot: import all existing Japan partner universities + high schools
 * into the Partner table.
 * Run: npx tsx scripts/seed-partners.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const JP_UNIVERSITIES = [
  { name: 'Сэйжо их сургууль', nameJp: '星城大学 / Seijoh University', headline: '50% хөнгөлөлт (их сургууль)', location: 'Япон, Аичи муж', partnerSince: '2005 оны 9 сар', logo: '/partners/japan/01-seijoh.png', detail: 'Япон улсын Аичи мужид байрладаг. Эдийн засгийн факультетдаа гадаадын улс орнуудаас оюутан элсүүлдэг. Тус сургуульд СЭДС-ийн бакалаврын хөтөлбөрийн оюутан их сургуульд 50%, япон хэлний сургуульд 10–20% хөнгөлөлттэй суралцах боломжтой.', order: 1 },
  { name: 'Такүшёкү их сургууль', nameJp: '拓殖大学 / Takushoku University', headline: '10–20% хөнгөлөлт', location: 'Япон, Токио (Бүнкёо, Хачико)', partnerSince: '2006 оны 1 сар', logo: '/partners/japan/02-takushoku.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Олон улсын харилцаа, Худалдаа, Улс төр, Эдийн засаг зэрэг мэргэжлээр 10–20% хөнгөлөлттэй элсэн суралцах боломжтой.', order: 2 },
  { name: 'Оберлин их сургууль', nameJp: '桜美林大学 / J.F. Oberlin University', headline: '100% тэтгэлэг — 1 жил', location: 'Япон, Токио', partnerSince: '2009 он', logo: '/partners/japan/03-oberlin.png', detail: 'Оюутан солилцооны хөтөлбөрийг өнөөг хүртэл амжилттай хэрэгжүүлж байна. Жил бүр СЭДС-ийн бакалаврын хөтөлбөрийн 2–4 оюутныг сонгон шалгаруулж, сургалтын төлбөрийн 100%-ийн хөнгөлөлттэй нэг жил хүртэл хугацаанд суралцуулдаг.', order: 3 },
  { name: 'Гакко Хоүжин Охара Гакүэн', nameJp: '学校法人大原学園 / Group of Ohara Academy', headline: '10–20% хөнгөлөлт', location: 'Япон (бүх мужид салбартай)', partnerSince: '2010 он', logo: '/partners/japan/04-ohara.png', detail: '"Оохара" Япон хэлний сургууль. СЭДС-ийн бакалаврын хөтөлбөрийн оюутан 10–20% хөнгөлөлттэй суралцах боломжтой.', order: 4 },
  { name: 'Ёкохама Дезайн Гакүин', nameJp: '横浜デザイン学院 / Yokohama Design Gakuin', headline: '10–20% хөнгөлөлт', location: 'Япон, Канагава муж (Ёкохама)', partnerSince: '2012 оны 11 сар', logo: '/partners/japan/05-yokohama-design.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Visual Design, Хувцасны дизайн, Манга зурагт номны дизайн, Япон хэл чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', order: 5 },
  { name: 'Гакко Хоүжин Дэнпа Коүка их сургуулийн групп', nameJp: '学校法人電波学園愛知工科大学グループ / Denpa Gakuen', headline: '10–20% хөнгөлөлт', location: 'Япон, Айчи муж (Нагаоя)', partnerSince: '2013 оны 5 сар', logo: '/partners/japan/06-denpa.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Айчи Технологийн их сургууль, Нагоя технологийн мэргэжлийн сургууль зэрэг 8 сургуульд 10–20% хөнгөлөлттэй суралцах боломжтой.', order: 6 },
  { name: 'Нийгата Сангёо их сургууль', nameJp: '新潟産業大学 / Niigata Sangyo University', headline: '10–20% хөнгөлөлт', location: 'Япон, Нийгата муж (Кашивазаки)', partnerSince: '2014 оны 4 сар', logo: '/partners/japan/07-niigata-sangyo.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Эдийн засаг, Байгууллагын менежмент, Санхүүгийн чиглэлээр 10–20% хөнгөлөлттэй элсэн суралцах боломжтой.', order: 7 },
  { name: 'Гакко Хоүжин Норт Азиа их сургууль', nameJp: '学校法人ノースアジア大学 / North Asia University', headline: '10–20% хөнгөлөлт', location: 'Япон, Акита муж (Акита)', partnerSince: '2015 оны 6 сар', logo: '/partners/japan/08-north-asia.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Эдийн засаг, Олон улсын харилцааны чиглэлээр 10–20%-ийн хөнгөлөлттэй суралцах боломжтой.', order: 8 },
  { name: 'Чюүоү Гакүин их сургууль', nameJp: '中央学院大学 / Chuo Gakuin University', headline: '10–20% хөнгөлөлт', location: 'Япон, Чиба муж (Абико)', partnerSince: '2015 оны 9 сар', logo: '/partners/japan/09-chuo-gakuin.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Хүмүүнлэгийн ухаан, Бизнес удирдлагын чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', order: 9 },
  { name: 'Хоккай Гакүэн их сургууль', nameJp: '学校法人北海学園大学 / Hokkai-Gakuen University', headline: '10–20% хөнгөлөлт', location: 'Япон, Хоккайдо муж (Саппоро)', partnerSince: '2015 оны 9 сар', logo: '/partners/japan/10-hokkai-gakuen.png', detail: 'СЭДС-ийн бакалавр, магистрын хөтөлбөрийн оюутан Инженер, Эдийн засаг, Бизнесийн удирдлага, Хүмүүнлэгийн чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', order: 10 },
  { name: 'ABK Гаккан Нихонго Гакко', nameJp: '学校法人ABK学館 / ABK College', headline: '10–20% хөнгөлөлт', location: 'Япон, Токио (Бүнкёо)', partnerSince: '2016 оны 4 сар', logo: '/partners/japan/12-abk.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан 10–20% хөнгөлөлттэй япон хэлний сургуульд суралцах боломжтой.', order: 11 },
  { name: 'Нихон эм зүйн их сургууль', nameJp: '日本薬科大学 / Nihon Pharmaceutical University', headline: '10–20% хөнгөлөлт', location: 'Япон, Сайтама муж + Токио', partnerSince: '2017 оны 12 сар', logo: '/partners/japan/13-nihon-pharm.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан эм зүйн чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', order: 12 },
  { name: 'Хокүто Бүнка Гакүэн', nameJp: '学校法人北斗文化学園 / Hokuto Bunka Gakuen', headline: 'Хүртэл 50% хөнгөлөлт', location: 'Япон, Хоккайдо муж (Саппоро)', partnerSince: '2021 оны 5 сар', logo: '/partners/japan/14-hokuto-bunka.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Нийгмийн халамжийн мэргэжлийн коллежид 10–20%, япон хэлний сургуульд 10–50% хөнгөлөлттэй суралцах боломжтой.', order: 13 },
  { name: 'Токива их сургууль', nameJp: '常盤大学 / Tokiwa University', headline: '100% тэтгэлэг — 6 сар–1 жил', location: 'Япон, Ибараки муж (Мито)', partnerSince: '2023 оны 2 сар', logo: '/partners/japan/15-tokiwa.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан 100% хөнгөлөлттэй 6 сараас 1 жилийн хугацаанд япон хэл болон Хүмүүнлэг, Бизнесийн удирдлага, Сувилахуйн чиглэлээр суралцах боломжтой.', order: 14 },
  { name: 'Нихон Вэлнэс Спорт их сургууль', nameJp: '学校法人タイケン学園 日本ウェルネススポーツ大学 / Nihon Wellness Sports University', headline: '10–20% хөнгөлөлт', location: 'Япон, Токио', partnerSince: '2023 оны 4 сар', logo: '/partners/japan/11-nihon-wellness.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Биеийн тамир, Эдийн засгийн чиглэлээр 10–20%-ийн хөнгөлөлттэй суралцах боломжтой.', order: 15 },
  { name: 'Комазава охидын их сургууль', nameJp: "駒沢女子大学 / Komazawa Women's University", headline: '10–20% хөнгөлөлт (зөвхөн эмэгтэй)', location: 'Япон, Токио', partnerSince: '2024 оны 5 сар', logo: '/partners/japan/16-komazawa-women.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн эмэгтэй оюутан Хүмүүнлэг, Сэтгэл судлал, Аялал жуулчлал, Нийтийн эрүүл мэнд, Сувилахуй зэрэг мэргэжлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', order: 16 },
  { name: 'Иватани Хигаши Хоккайдо коллеж', nameJp: '岩谷学園 / Iwatani Higashi Hokkaido College', headline: 'Хүртэл 50% хөнгөлөлт', location: 'Япон, Канагава муж (Ёкохама)', logo: '/partners/japan/17-iwatani.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан IT мэргэжлийн, Гоо зүйн мэргэжлийн коллеж, Япон хэлний сургуульд 10–50% хөнгөлөлттэй суралцах боломжтой.', order: 17 },
  { name: 'Нийгата эм зүйн их сургууль', nameJp: '新潟薬科大学 / Niigata University of Pharmacy and Medical Life Sciences', headline: '50% хөнгөлөлт (их сургууль)', location: 'Япон, Нийгата муж (Нийгата)', logo: '/partners/japan/18-niigata-pharm.png', detail: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан эм зүйн чиглэлээр их сургуульд 50%, япон хэлний сургуульд 10–20% хөнгөлөлттэй суралцах боломжтой.', order: 18 },
];

const JP_HIGHSCHOOLS = [
  { name: 'Комазава ахлах сургууль', nameJp: '駒沢学園女子高等学校 / Komazawa Gakuen High School', headline: '50% хөнгөлөлт (эмэгтэй сурагч)', location: 'Япон, Токио (Инаги дүүрэг)', partnerSince: '2025 оны 5 сар', logo: '/partners/komazawa-hs.svg', detail: 'Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн эмэгтэй сурагчдыг 50%-ийн хөнгөлөлттэй элсүүлэн суралцуулах боломжтой.', order: 1 },
  { name: 'Нихон Вэлнэс ахлах сургууль', nameJp: '日本ウェルネス高等学校 / Nihon Wellness High School', headline: '50% хөнгөлөлт', location: 'Япон, Мияги муж (Сэндай) + Нагано муж (Хигашичикума)', partnerSince: '2024 оны 5 сар', detail: 'Спортын чиглэлтэй ахлах сургууль. Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн сурагчдыг 50%-ийн хөнгөлөлттэй элсүүлэн суралцуулах боломжтой.', order: 2 },
];

async function main() {
  const existing = await prisma.partner.count();
  if (existing > 0) { console.log(`Already seeded: ${existing} partners. Skipping.`); return; }
  for (const p of JP_UNIVERSITIES) {
    await prisma.partner.create({ data: { type: 'japan-university', ...p, active: true } });
  }
  for (const p of JP_HIGHSCHOOLS) {
    await prisma.partner.create({ data: { type: 'japan-highschool', ...p, active: true } });
  }
  console.log(`✅ Seeded ${JP_UNIVERSITIES.length + JP_HIGHSCHOOLS.length} partners.`);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
