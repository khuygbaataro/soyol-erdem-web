/**
 * One-shot: seed all editable international-page texts into SiteContent.
 * Idempotent — safe to re-run.
 *
 * Run:
 *   npx tsx scripts/seed-international-content.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Row = {
  key: string;
  value: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  order: number;
};

const ROWS: Row[] = [
  /* ── Hero ─────────────────────────────────────────── */
  { key: 'international.hero.title',    value: 'ГАДААД ХАРИЛЦАА',                                                                                      label: 'Hero гарчиг',         order: 1 },
  { key: 'international.hero.subtitle', value: 'Япон улсын 30+ их сургууль, мэргэжлийн сургууль, олон улсын байгууллагатай хамтрах сүлжээ.',            label: 'Hero дэд гарчиг',     order: 2 },

  /* ── Нэвтрүүлэх ───────────────────────────────────── */
  {
    key: 'international.intro',
    value: 'Соёл Эрдэм Дээд Сургууль нь байгуулагдсан цагаасаа эхлэн гадаад харилцааны асуудлыг түлхүү анхаарч ирсэн. Япон улсын олон их дээд сургууль, хувийн хэвшил, олон улсын байгууллагуудтай сургалт, эрдэм шинжилгээний хамтын ажиллагааг хөгжүүлэхээс гадна оюутан, багш солилцооны хөтөлбөрийг хэрэгжүүлдэг.',
    label: 'Нэвтрүүлэх текст', multiline: true, order: 3,
  },

  /* ── 3 callout block ──────────────────────────────── */
  { key: 'international.block.1.heading', value: 'Оюутан солилцооны хөтөлбөр',                   label: '1-р блок — гарчиг', order: 10 },
  {
    key: 'international.block.1.body',
    value: 'Гадаад харилцаа, хамтын ажиллагааны хүрээнд оюутан солилцооны хөтөлбөр хэрэгжүүлдэг нь оюутнуудад Япон улсын их дээд сургуулиудад 50–100%-ийн тэтгэлэгээр суралцах таатай боломжийг олгодог. Одоогийн байдлаар энэхүү оюутан солилцооны хөтөлбөрт 100 гаруй оюутан хамрагдаад байна. Ирэх 2024–2025 оны хичээлийн жилд Программ хангамжийн хөтөлбөрөөр 2+2 хөтөлбөрийг хэрэгжүүлэхээр Япон улсын Велнесс Спортын их сургуультай хамтран ажиллах гэрээ байгуулан оюутнуудыг суралцуулах боломжтой болоод байна.',
    label: '1-р блок — текст', multiline: true, order: 11,
  },
  { key: 'international.block.2.heading', value: 'Интерншип — цалинтай дадлага (2014 оноос)',     label: '2-р блок — гарчиг', order: 12 },
  {
    key: 'international.block.2.body',
    value: 'СЭДС нь Монголд анх удаа Интерншип буюу цалинтай дадлагын хөтөлбөрийг 2014 оноос хэрэгжүүлж эхэлсэн. Энэхүү хөтөлбөр нь оюутнууд 3 сараас 1 жилийн хугацаатай Япон улсад ажиллаж амьдрахын зэрэгцээ Япон улсын түүх, соёл, аж амьдралын хэв маягаас суралцаж, халуун рашаан болон зочид буудалд ажиллан олон талын мэдлэг олж авдаг. Энэ хөтөлбөрийн хүрээнд оюутнууд сард 160,000 иен буюу монгол мөнгөөр 2,500,000 гаруй төгрөгийн цалин авдаг.',
    label: '2-р блок — текст', multiline: true, order: 13,
  },
  { key: 'international.block.3.heading', value: 'Байгаль экологийн хамтарсан дадлага',          label: '3-р блок — гарчиг', order: 14 },
  {
    key: 'international.block.3.body',
    value: '2006 оноос эхлэн жил бүр Япон улсын Оберлин их сургуультай хамтран хоёр улсын оюутнуудын байгаль экологийн хамтарсан дадлагыг зохион байгуулсаар ирсэн. Уг дадлагын хүрээнд хоёр орны оюутнууд харилцан мэдлэг солилцож, соёл, гадаад харилцаа, олон улс, түүх, хүрээлэн байгаа орчны тухай судалгаа хийдэг.',
    label: '3-р блок — текст', multiline: true, order: 15,
  },

  /* ── Хэсгийн гарчгууд ─────────────────────────────── */
  { key: 'international.japanPartners.title',    value: 'ХАМТРАГЧ ЯПОН СУРГУУЛИУДЫН ТАНИЛЦУУЛГА',                                                           label: 'Япон сургуулиуд — гарчиг',     order: 20 },
  { key: 'international.japanPartners.subtitle', value: '{count} их, дээд сургууль. Карт дээр дарж дэлгэрэнгүй танилцуулга, мэргэжил, тэтгэлгийн нөхцөлийг харна уу.', label: 'Япон сургуулиуд — дэд гарчиг', hint: '{count} нь автоматаар тоогоор орно.', order: 21 },
  { key: 'international.highSchools.title',      value: 'ХАМТРАГЧ ЯПОН АХЛАХ СУРГУУЛИУД',                                                                   label: 'Ахлах сургуулиуд — гарчиг',    order: 22 },
  { key: 'international.highSchools.subtitle',   value: 'НЕБ-ын Соёл Эрдэм сургуулийн сурагчдад нээлттэй хамтрагч сургуулиуд.',                             label: 'Ахлах сургуулиуд — дэд гарчиг', order: 23 },
  { key: 'international.domestic.title',         value: 'ДОТООД ХАМТЫН АЖИЛЛАГААТАЙ БАЙГУУЛЛАГУУД',                                                         label: 'Дотоод байгуулл. — гарчиг',    order: 24 },
  { key: 'international.domestic.subtitle',      value: 'Монгол улсад үйл ажиллагаа явуулдаг хамтрагч байгууллагууд.',                                      label: 'Дотоод байгуулл. — дэд гарчиг', order: 25 },

  /* ── 18 Япон хамтрагч их сургуулиуд ─────────────── */
  { key: 'international.japan.1.name', value: 'Сэйжо их сургууль', label: 'Япон 1 — нэр', order: 100 },
  { key: 'international.japan.1.headline', value: '50% хөнгөлөлт (их сургууль)', label: 'Япон 1 — badge', order: 101 },
  { key: 'international.japan.1.location', value: 'Япон, Аичи муж', label: 'Япон 1 — байршил', order: 102 },
  { key: 'international.japan.1.partnerSince', value: '2005 оны 9 сар', label: 'Япон 1 — хамтарсан', order: 103 },
  { key: 'international.japan.1.detail', value: 'Япон улсын Аичи мужид байрладаг. Эдийн засгийн факультетдаа гадаадын улс орнуудаас оюутан элсүүлдэг. Тус сургуульд СЭДС-ийн бакалаврын хөтөлбөрийн оюутан их сургуульд 50%, япон хэлний сургуульд 10–20% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 1 — тайлбар', multiline: true, order: 104 },

  { key: 'international.japan.2.name', value: 'Такүшёкү их сургууль', label: 'Япон 2 — нэр', order: 110 },
  { key: 'international.japan.2.headline', value: '10–20% хөнгөлөлт', label: 'Япон 2 — badge', order: 111 },
  { key: 'international.japan.2.location', value: 'Япон, Токио (Бүнкёо, Хачико)', label: 'Япон 2 — байршил', order: 112 },
  { key: 'international.japan.2.partnerSince', value: '2006 оны 1 сар', label: 'Япон 2 — хамтарсан', order: 113 },
  { key: 'international.japan.2.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Олон улсын харилцаа, Худалдаа, Улс төр, Эдийн засаг зэрэг мэргэжлээр 10–20% хөнгөлөлттэй элсэн суралцах боломжтой.', label: 'Япон 2 — тайлбар', multiline: true, order: 114 },

  { key: 'international.japan.3.name', value: 'Оберлин их сургууль', label: 'Япон 3 — нэр', order: 120 },
  { key: 'international.japan.3.headline', value: '100% тэтгэлэг — 1 жил', label: 'Япон 3 — badge', order: 121 },
  { key: 'international.japan.3.location', value: 'Япон, Токио', label: 'Япон 3 — байршил', order: 122 },
  { key: 'international.japan.3.partnerSince', value: '2009 он', label: 'Япон 3 — хамтарсан', order: 123 },
  { key: 'international.japan.3.detail', value: 'Оюутан солилцооны хөтөлбөрийг өнөөг хүртэл амжилттай хэрэгжүүлж байна. Жил бүр СЭДС-ийн бакалаврын хөтөлбөрийн 2–4 оюутныг сонгон шалгаруулж, сургалтын төлбөрийн 100%-ийн хөнгөлөлттэй нэг жил хүртэл хугацаанд суралцуулдаг.', label: 'Япон 3 — тайлбар', multiline: true, order: 124 },

  { key: 'international.japan.4.name', value: 'Гакко Хоүжин Охара Гакүэн', label: 'Япон 4 — нэр', order: 130 },
  { key: 'international.japan.4.headline', value: '10–20% хөнгөлөлт', label: 'Япон 4 — badge', order: 131 },
  { key: 'international.japan.4.location', value: 'Япон (бүх мужид салбартай)', label: 'Япон 4 — байршил', order: 132 },
  { key: 'international.japan.4.partnerSince', value: '2010 он', label: 'Япон 4 — хамтарсан', order: 133 },
  { key: 'international.japan.4.detail', value: 'Япон улсын бүх мужид салбартай "Оохара" Япон хэлний сургууль. СЭДС-ийн бакалаврын хөтөлбөрийн оюутан 10–20% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 4 — тайлбар', multiline: true, order: 134 },

  { key: 'international.japan.5.name', value: 'Ёкохама Дэзайн Гакүин', label: 'Япон 5 — нэр', order: 140 },
  { key: 'international.japan.5.headline', value: '10–20% хөнгөлөлт', label: 'Япон 5 — badge', order: 141 },
  { key: 'international.japan.5.location', value: 'Япон, Канагава муж (Ёкохама)', label: 'Япон 5 — байршил', order: 142 },
  { key: 'international.japan.5.partnerSince', value: '2012 оны 11 сар', label: 'Япон 5 — хамтарсан', order: 143 },
  { key: 'international.japan.5.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Visual Design, Хувцасны дизайн, Манга зурагт номны дизайн, Япон хэл чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 5 — тайлбар', multiline: true, order: 144 },

  { key: 'international.japan.6.name', value: 'Гакко Хоүжин Дэнпа Коүка их сургуулийн групп', label: 'Япон 6 — нэр', order: 150 },
  { key: 'international.japan.6.headline', value: '10–20% хөнгөлөлт', label: 'Япон 6 — badge', order: 151 },
  { key: 'international.japan.6.location', value: 'Япон, Айчи муж (Нагаоя)', label: 'Япон 6 — байршил', order: 152 },
  { key: 'international.japan.6.partnerSince', value: '2013 оны 5 сар', label: 'Япон 6 — хамтарсан', order: 153 },
  { key: 'international.japan.6.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Айчи Технологийн их сургууль, Нагоя технологийн мэргэжлийн сургууль, Токай үйлдвэрлэл-урлагийн сургууль зэрэг 8 сургуульд 10–20% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 6 — тайлбар', multiline: true, order: 154 },

  { key: 'international.japan.7.name', value: 'Нийгата Сангёо их сургууль', label: 'Япон 7 — нэр', order: 160 },
  { key: 'international.japan.7.headline', value: '10–20% хөнгөлөлт', label: 'Япон 7 — badge', order: 161 },
  { key: 'international.japan.7.location', value: 'Япон, Нийгата муж (Кашивазаки)', label: 'Япон 7 — байршил', order: 162 },
  { key: 'international.japan.7.partnerSince', value: '2014 оны 4 сар', label: 'Япон 7 — хамтарсан', order: 163 },
  { key: 'international.japan.7.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Эдийн засаг, Байгууллагын менежмент, Санхүүгийн чиглэлээр 10–20% хөнгөлөлттэй элсэн суралцах боломжтой.', label: 'Япон 7 — тайлбар', multiline: true, order: 164 },

  { key: 'international.japan.8.name', value: 'Гакко Хоүжин Норт Азиа их сургууль', label: 'Япон 8 — нэр', order: 170 },
  { key: 'international.japan.8.headline', value: '10–20% хөнгөлөлт', label: 'Япон 8 — badge', order: 171 },
  { key: 'international.japan.8.location', value: 'Япон, Акита муж (Акита)', label: 'Япон 8 — байршил', order: 172 },
  { key: 'international.japan.8.partnerSince', value: '2015 оны 6 сар', label: 'Япон 8 — хамтарсан', order: 173 },
  { key: 'international.japan.8.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Эдийн засаг, Олон улсын харилцааны чиглэлээр 10–20%-ийн хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 8 — тайлбар', multiline: true, order: 174 },

  { key: 'international.japan.9.name', value: 'Чюүоү Гакүин их сургууль', label: 'Япон 9 — нэр', order: 180 },
  { key: 'international.japan.9.headline', value: '10–20% хөнгөлөлт', label: 'Япон 9 — badge', order: 181 },
  { key: 'international.japan.9.location', value: 'Япон, Чиба муж (Абико)', label: 'Япон 9 — байршил', order: 182 },
  { key: 'international.japan.9.partnerSince', value: '2015 оны 9 сар', label: 'Япон 9 — хамтарсан', order: 183 },
  { key: 'international.japan.9.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Хүмүүнлэгийн ухаан, Бизнес удирдлагын чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 9 — тайлбар', multiline: true, order: 184 },

  { key: 'international.japan.10.name', value: 'Хоккай Гакүэн их сургууль', label: 'Япон 10 — нэр', order: 190 },
  { key: 'international.japan.10.headline', value: '10–20% хөнгөлөлт', label: 'Япон 10 — badge', order: 191 },
  { key: 'international.japan.10.location', value: 'Япон, Хоккайдо муж (Саппоро)', label: 'Япон 10 — байршил', order: 192 },
  { key: 'international.japan.10.partnerSince', value: '2015 оны 9 сар', label: 'Япон 10 — хамтарсан', order: 193 },
  { key: 'international.japan.10.detail', value: 'СЭДС-ийн бакалавр, магистрын хөтөлбөрийн оюутан Инженер, Эдийн засаг, Бизнесийн удирдлага, Хүмүүнлэгийн чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 10 — тайлбар', multiline: true, order: 194 },

  { key: 'international.japan.11.name', value: 'ABK Гаккан Нихонго Гакко', label: 'Япон 11 — нэр', order: 200 },
  { key: 'international.japan.11.headline', value: '10–20% хөнгөлөлт', label: 'Япон 11 — badge', order: 201 },
  { key: 'international.japan.11.location', value: 'Япон, Токио (Бүнкёо)', label: 'Япон 11 — байршил', order: 202 },
  { key: 'international.japan.11.partnerSince', value: '2016 оны 4 сар', label: 'Япон 11 — хамтарсан', order: 203 },
  { key: 'international.japan.11.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан 10–20% хөнгөлөлттэй япон хэлний сургуульд суралцах боломжтой.', label: 'Япон 11 — тайлбар', multiline: true, order: 204 },

  { key: 'international.japan.12.name', value: 'Нихон эм зүйн их сургууль', label: 'Япон 12 — нэр', order: 210 },
  { key: 'international.japan.12.headline', value: '10–20% хөнгөлөлт', label: 'Япон 12 — badge', order: 211 },
  { key: 'international.japan.12.location', value: 'Япон, Сайтама муж + Токио', label: 'Япон 12 — байршил', order: 212 },
  { key: 'international.japan.12.partnerSince', value: '2017 оны 12 сар', label: 'Япон 12 — хамтарсан', order: 213 },
  { key: 'international.japan.12.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан эм зүйн чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 12 — тайлбар', multiline: true, order: 214 },

  { key: 'international.japan.13.name', value: 'Хокүто Бүнка Гакүэн', label: 'Япон 13 — нэр', order: 220 },
  { key: 'international.japan.13.headline', value: 'Хүртэл 50% хөнгөлөлт', label: 'Япон 13 — badge', order: 221 },
  { key: 'international.japan.13.location', value: 'Япон, Хоккайдо муж (Саппоро)', label: 'Япон 13 — байршил', order: 222 },
  { key: 'international.japan.13.partnerSince', value: '2021 оны 5 сар', label: 'Япон 13 — хамтарсан', order: 223 },
  { key: 'international.japan.13.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Нийгмийн халамжийн мэргэжлийн коллежид 10–20%, япон хэлний сургуульд 10–50% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 13 — тайлбар', multiline: true, order: 224 },

  { key: 'international.japan.14.name', value: 'Токива их сургууль', label: 'Япон 14 — нэр', order: 230 },
  { key: 'international.japan.14.headline', value: '100% тэтгэлэг — 6 сар–1 жил', label: 'Япон 14 — badge', order: 231 },
  { key: 'international.japan.14.location', value: 'Япон, Ибараки муж (Мито)', label: 'Япон 14 — байршил', order: 232 },
  { key: 'international.japan.14.partnerSince', value: '2023 оны 2 сар', label: 'Япон 14 — хамтарсан', order: 233 },
  { key: 'international.japan.14.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан 100% хөнгөлөлттэй 6 сараас 1 жилийн хугацаанд япон хэл болон Хүмүүнлэг, Бизнесийн удирдлага, Сувилахуйн чиглэлээр суралцах боломжтой.', label: 'Япон 14 — тайлбар', multiline: true, order: 234 },

  { key: 'international.japan.15.name', value: 'Нихон Вэлнэс Спорт их сургууль', label: 'Япон 15 — нэр', order: 240 },
  { key: 'international.japan.15.headline', value: '10–20% хөнгөлөлт', label: 'Япон 15 — badge', order: 241 },
  { key: 'international.japan.15.location', value: 'Япон, Токио', label: 'Япон 15 — байршил', order: 242 },
  { key: 'international.japan.15.partnerSince', value: '2023 оны 4 сар', label: 'Япон 15 — хамтарсан', order: 243 },
  { key: 'international.japan.15.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Биеийн тамир, Эдийн засгийн чиглэлээр 10–20%-ийн хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 15 — тайлбар', multiline: true, order: 244 },

  { key: 'international.japan.16.name', value: 'Комазава охидын их сургууль', label: 'Япон 16 — нэр', order: 250 },
  { key: 'international.japan.16.headline', value: '10–20% хөнгөлөлт (зөвхөн эмэгтэй)', label: 'Япон 16 — badge', order: 251 },
  { key: 'international.japan.16.location', value: 'Япон, Токио', label: 'Япон 16 — байршил', order: 252 },
  { key: 'international.japan.16.partnerSince', value: '2024 оны 5 сар', label: 'Япон 16 — хамтарсан', order: 253 },
  { key: 'international.japan.16.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн эмэгтэй оюутан Хүмүүнлэг, Сэтгэл судлал, Аялал жуулчлал, Нийтийн эрүүл мэнд, Сувилахуй зэрэг мэргэжлээр 10–20% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 16 — тайлбар', multiline: true, order: 254 },

  { key: 'international.japan.17.name', value: 'Иватани Хигаши Хоккайдо коллеж', label: 'Япон 17 — нэр', order: 260 },
  { key: 'international.japan.17.headline', value: 'Хүртэл 50% хөнгөлөлт', label: 'Япон 17 — badge', order: 261 },
  { key: 'international.japan.17.location', value: 'Япон, Канагава муж (Ёкохама)', label: 'Япон 17 — байршил', order: 262 },
  { key: 'international.japan.17.partnerSince', value: '', label: 'Япон 17 — хамтарсан', order: 263 },
  { key: 'international.japan.17.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан IT мэргэжлийн, Гоо зүйн мэргэжлийн коллеж, Япон хэлний сургуульд 10–50% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 17 — тайлбар', multiline: true, order: 264 },

  { key: 'international.japan.18.name', value: 'Нийгата эм зүйн их сургууль', label: 'Япон 18 — нэр', order: 270 },
  { key: 'international.japan.18.headline', value: '50% хөнгөлөлт (их сургууль)', label: 'Япон 18 — badge', order: 271 },
  { key: 'international.japan.18.location', value: 'Япон, Нийгата муж (Нийгата)', label: 'Япон 18 — байршил', order: 272 },
  { key: 'international.japan.18.partnerSince', value: '', label: 'Япон 18 — хамтарсан', order: 273 },
  { key: 'international.japan.18.detail', value: 'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан эм зүйн чиглэлээр их сургуульд 50%, япон хэлний сургуульд 10–20% хөнгөлөлттэй суралцах боломжтой.', label: 'Япон 18 — тайлбар', multiline: true, order: 274 },

  /* ── 2 Ахлах сургууль ─────────────────────────────── */
  { key: 'international.hs.1.name', value: 'Комазава ахлах сургууль', label: 'АС 1 — нэр', order: 300 },
  { key: 'international.hs.1.headline', value: '50% хөнгөлөлт (эмэгтэй сурагч)', label: 'АС 1 — badge', order: 301 },
  { key: 'international.hs.1.location', value: 'Япон, Токио (Инаги дүүрэг)', label: 'АС 1 — байршил', order: 302 },
  { key: 'international.hs.1.partnerSince', value: '2025 оны 5 сар', label: 'АС 1 — хамтарсан', order: 303 },
  { key: 'international.hs.1.detail', value: 'Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн эмэгтэй сурагчдыг 50%-ийн хөнгөлөлттэй элсүүлэн суралцуулах боломжтой.', label: 'АС 1 — тайлбар', multiline: true, order: 304 },

  { key: 'international.hs.2.name', value: 'Нихон Вэлнэс ахлах сургууль', label: 'АС 2 — нэр', order: 310 },
  { key: 'international.hs.2.headline', value: '50% хөнгөлөлт', label: 'АС 2 — badge', order: 311 },
  { key: 'international.hs.2.location', value: 'Япон, Мияги муж (Сэндай) + Нагано муж (Хигашичикума)', label: 'АС 2 — байршил', order: 312 },
  { key: 'international.hs.2.partnerSince', value: '2024 оны 5 сар', label: 'АС 2 — хамтарсан', order: 313 },
  { key: 'international.hs.2.detail', value: 'Спортын чиглэлтэй ахлах сургууль. Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн сурагчдыг 50%-ийн хөнгөлөлттэй элсүүлэн суралцуулах боломжтой.', label: 'АС 2 — тайлбар', multiline: true, order: 314 },

  /* ── 3 Дотоод байгууллага ─────────────────────────── */
  { key: 'international.dom.1.name', value: 'Монгол Улс дахь Япон Улсын Элчин сайдын яам', label: 'Дотоод 1 — нэр', order: 400 },
  { key: 'international.dom.1.detail', value: 'Соёл Эрдэм Дээд Сургууль нь Японы Элчин сайдын яамтай хамтран Японы хэл, соёл, боловсролыг таниулсан олон арга хэмжээнд оюутнууд, багш нараа идэвхтэй оролцуулсаар ирсэн.', label: 'Дотоод 1 — тайлбар', multiline: true, order: 401 },
  { key: 'international.dom.1.activities', value: '"Япон киноны өдөрлөг"\n"Японд суралцах талаар танилцуулах сургалт"', label: 'Дотоод 1 — үйл ажиллагаа', hint: 'Мөр тус бүр тусдаа цэгтэй жагсаалт болно.', multiline: true, order: 402 },

  { key: 'international.dom.2.name', value: 'Монгол-Японы Хүний Нөөцийн Хөгжлийн Төв', label: 'Дотоод 2 — нэр', order: 410 },
  { key: 'international.dom.2.detail', value: 'Сургууль анх байгуулагдсан цагаасаа эхлэн "Монгол-Япон төв"-тэй нягт хамтран ажиллаж ирсэн. Тус төвөөс зохион байгуулдаг Японы соёл, боловсролын олон арга хэмжээ, сургалтад багш, оюутнууд тогтмол идэвхтэй оролцдог.', label: 'Дотоод 2 — тайлбар', multiline: true, order: 411 },
  { key: 'international.dom.2.activities', value: '"Япон хэлний түвшин тогтоох жишиг шалгалт"\n"Японы их дээд сургуулиудыг танилцуулах мэдээллийн ярмаг"\n"Япон хэлний багш нарын заах аргын сургалт"\n"Японы соёлыг танилцуулах баяр"\n"Нээлттэй семинар"', label: 'Дотоод 2 — үйл ажиллагаа', hint: 'Мөр тус бүр тусдаа цэгтэй жагсаалт болно.', multiline: true, order: 412 },

  { key: 'international.dom.3.name', value: 'Монголын Япон Хэлний Багш нарын Холбоо', label: 'Дотоод 3 — нэр', order: 420 },
  { key: 'international.dom.3.detail', value: 'Тус холбооноос зохион байгуулдаг багшийн хөгжлийг дэмжсэн арга хэмжээнд багш нараа тогтмол хамруулан хамтран ажиллаж байна.', label: 'Дотоод 3 — тайлбар', multiline: true, order: 421 },
  { key: 'international.dom.3.activities', value: 'Жилд 2 удаа зохион байгуулагддаг "Япон хэлний түвшин тогтоох шалгалт — JLPT"-ийн зохион байгуулалт\n"Япон хэлний боловсролын симпозиум"', label: 'Дотоод 3 — үйл ажиллагаа', hint: 'Мөр тус бүр тусдаа цэгтэй жагсаалт болно.', multiline: true, order: 422 },
];

async function main() {
  console.log(`🌱 Seeding ${ROWS.length} international SiteContent rows…`);
  let created = 0;
  let skipped = 0;

  for (const row of ROWS) {
    const existing = await prisma.siteContent.findUnique({ where: { key: row.key } });
    if (existing) { skipped++; continue; }
    await prisma.siteContent.create({
      data: {
        key:       row.key,
        group:     'international',
        type:      'TEXT',
        value:     row.value,
        label:     row.label,
        hint:      row.hint ?? null,
        multiline: row.multiline ?? false,
        order:     row.order,
      },
    });
    created++;
  }

  console.log(`✅  Created: ${created}  Skipped: ${skipped}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
