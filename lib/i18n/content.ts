/**
 * Structured page-level translations. Each export here is keyed by
 * Language (MN | JP | EN) so server / client can grab the localised
 * variant in one lookup:
 *
 *     const c = HOME_CONTENT[locale];
 *
 * Missing locale → Mongolian fallback via `localised()` below.
 */

import type { Language } from '@/lib/constants';

/** Safe locale getter — falls back to MN when a locale is missing. */
export function localised<T>(table: Record<Language, T>, locale: Language): T {
  return table[locale] ?? table.MN;
}

/* ───────────────────────── Common UI ──────────────────────────────── */

export const COMMON = {
  MN: {
    readMore: 'Дэлгэрэнгүй',
    viewAll: 'Бүх мэдээг үзэх',
    viewMore: 'Дэлгэрэнгүй мэдэх',
    learnMore: 'Илүү ихийг үзэх',
    seeAllPrograms: 'Бүх мэргэжлээ үзэх',
    contactUs: 'Бидэнтэй холбогдох',
    sendMessage: 'Зурвас илгээх',
    apply: 'Бүртгүүлэх',
    backToList: 'Жагсаалт руу буцах',
    address: 'Хаяг',
    phone: 'Утас',
    email: 'И-мэйл',
    hours: 'Ажиллах цаг',
    featured: 'Онцлох хөтөлбөр',
    badge2023: 'Японы хөрөнгө оруулалттай · 2023 онд байгуулагдсан',
    requirements: 'Шаардлага',
    documents: 'Бүрдүүлэх материал',
    additionalRequirements: 'Нэмэлт шаардлага',
    description: 'Дэлгэрэнгүй',
    note: 'Тайлбар',
    suitableFor: 'Хэнд тохиромжтой вэ?',
  },
  EN: {
    readMore: 'Read more',
    viewAll: 'View all news',
    viewMore: 'Learn more',
    learnMore: 'Find out more',
    seeAllPrograms: 'See all programs',
    contactUs: 'Contact us',
    sendMessage: 'Send a message',
    apply: 'Apply',
    backToList: 'Back to list',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Hours',
    featured: 'Featured program',
    badge2023: 'Japanese-funded · established 2023',
    requirements: 'Requirements',
    documents: 'Required documents',
    additionalRequirements: 'Additional requirements',
    description: 'Details',
    note: 'Note',
    suitableFor: 'Who is it for?',
  },
  JP: {
    readMore: '詳細を見る',
    viewAll: 'すべてのニュース',
    viewMore: '詳しく見る',
    learnMore: 'もっと見る',
    seeAllPrograms: 'すべての専攻',
    contactUs: 'お問い合わせ',
    sendMessage: 'メッセージを送る',
    apply: '出願する',
    backToList: '一覧に戻る',
    address: '住所',
    phone: '電話',
    email: 'メール',
    hours: '営業時間',
    featured: '特集プログラム',
    badge2023: '日本資本 · 2023年設立',
    requirements: '応募条件',
    documents: '必要書類',
    additionalRequirements: '追加要件',
    description: '詳細',
    note: '備考',
    suitableFor: '対象となる方',
  },
};

/* ───────────────────────── Home page ──────────────────────────────── */

export const HOME_CONTENT = {
  MN: {
    hero: {
      titleLine1: 'ИРЭЭДҮЙГЭЭ',
      titleLine2: 'ЭНДЭЭС ЭХЭЛ',
      italic: 'Япон хэлний боловсролын манлайлагч',
      body: 'Япон улсын 100% хөрөнгө оруулалттай Соёл Эрдэм Дээд Сургууль 1993 онд байгуулагдсан. Манай сургууль нь япон хэлний боловсролын чиглэлээр Монгол улсдаа тэргүүлэгч сургууль бөгөөд япон улсын 30 гаруй их, дээд сургуультай хамтран ажиллаж, оюутан солилцооны хөтөлбөр амжилттай хэрэгжүүлсээр байна. Бид одоогийн байдлаар 1500 гаруй оюутныг төгсгөж, нийт төгсөгчдийн 40 орчим хувь нь Япон улсад суралцаж, ажиллаж байна.',
      ctaPrimary: 'Мэргэжлээ сонгох',
      ctaSecondary: 'Элсэлтийн мэдээлэл',
      heroAlt: 'Соёл Эрдэм Их Сургуулийн зураг',
    },
    internship: {
      badge: 'Онцлох хөтөлбөр',
      title: 'Япон улсад цалинтай дадлага хий',
      body: 'Сард 150,000 иений (≈2.5 сая төгрөг) цалинтай практик дадлага. 2014 оноос Монгол улсад анх удаа нэвтэрсэн интерншип хөтөлбөр.',
      bullets: [
        'Япон улсын зочид буудал, ресторан, халуун рашаанд дадлага',
        'Япон хэлний дадлага + цалин',
        'Япон соёл, ёс заншилтай танилцах боломж',
      ],
      cta: 'Дэлгэрэнгүй мэдэх',
    },
    news: {
      heading: 'СҮҮЛИЙН МЭДЭЭ',
      viewAll: 'Бүх мэдээг үзэх',
    },
  },
  EN: {
    hero: {
      titleLine1: 'START YOUR',
      titleLine2: 'FUTURE HERE',
      italic: 'Leader in Japanese-language education',
      body: 'Soyol Erdem University was established in 1993 as a 100%-Japanese-funded institution. It is Mongolia\'s leading school for Japanese-language education, partnering with more than 30 universities in Japan to run successful student-exchange programs. So far, more than 1,500 students have graduated and around 40% of our alumni study or work in Japan.',
      ctaPrimary: 'Browse programs',
      ctaSecondary: 'Admission info',
      heroAlt: 'Photo of Soyol Erdem University building',
    },
    internship: {
      badge: 'Featured program',
      title: 'Earn while you intern in Japan',
      body: 'Monthly stipend of ¥150,000 (≈ MNT 2.5M). The first paid-internship program of its kind in Mongolia, running since 2014.',
      bullets: [
        'Placement at Japanese hotels, restaurants, and onsen resorts',
        'On-the-job Japanese-language practice with a real salary',
        'Direct exposure to Japanese culture and customs',
      ],
      cta: 'Find out more',
    },
    news: {
      heading: 'LATEST NEWS',
      viewAll: 'View all news',
    },
  },
  JP: {
    hero: {
      titleLine1: '未来は',
      titleLine2: 'ここから始まる',
      italic: '日本語教育のリーディング・スクール',
      body: '1993年に設立された日本資本100%の私立大学、ソヨル・エルデム大学。モンゴル国における日本語教育の中心的存在として、日本国内30以上の大学と連携した交換留学プログラムを運営しています。これまでに1,500名以上が卒業し、卒業生の約40%が日本で学び・働いています。',
      ctaPrimary: '専攻を選ぶ',
      ctaSecondary: '入学案内を見る',
      heroAlt: 'ソヨル・エルデム大学のキャンパス写真',
    },
    internship: {
      badge: '特集プログラム',
      title: '日本での有給インターンシップ',
      body: '月給150,000円(約250万トゥグルグ)で実践的なインターンシップに参加できます。2014年からモンゴルで初めて導入された有給インターン制度です。',
      bullets: [
        '日本のホテル・レストラン・温泉旅館でのインターン',
        '実務を通した日本語の実践と給与の両立',
        '日本の文化・習慣に直に触れる絶好の機会',
      ],
      cta: '詳しく見る',
    },
    news: {
      heading: '最新ニュース',
      viewAll: 'すべてのニュース',
    },
  },
};

/* ──────────────────────── About page ─────────────────────────────── */

export const ABOUT_CONTENT = {
  MN: {
    heroTitle1: 'СОЁЛ ЭРДЭМ',
    heroTitle2: 'ДЭЭД СУРГУУЛЬ',
    heroBody:
      'Япон улсын 100% хөрөнгө оруулалттай Соёл Эрдэм Дээд Сургууль 1993 онд байгуулагдсан. Манай сургууль нь япон хэлний боловсролын чиглэлээр Монгол улсдаа тэргүүлэгч сургууль бөгөөд япон улсын 30 гаруй их, дээд сургуультай хамтран ажиллаж, оюутан солилцооны хөтөлбөр амжилттай хэрэгжүүлсээр байна. Бид одоогийн байдлаар 1500 гаруй оюутныг төгсгөж, нийт төгсөгчдийн 40 орчим хувь нь Япон улсад суралцаж, ажиллаж байна.',
    heroCta: 'Бидний тухай дэлгэрэнгүй',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Сургуулийн тухай',
    introEyebrow: 'Танилцуулга',
    introTitle: 'МАНАЙ СУРГУУЛИЙН ТҮҮХТЭЙ ТАНИЛЦАХ ХЭСЭГ',
    mvvEyebrow: 'Бидний үнэт зүйлс',
    sections: [
      {
        number: '01',
        title: 'ҮҮСГЭН БАЙГУУЛАГЧ',
        text: 'Үүсгэн байгуулагч, Удирдах зөвлөлийн дарга Макихара Соичи — сургуулийн үүсэл, эрхэм зорилгын тухай.',
      },
      {
        number: '02',
        title: 'ЗАХИРЛЫН МЭНДЧИЛГЭЭ',
        text: 'Гүйцэтгэх захирал Д.Эрдэнэчимэг — багш, оюутан, төгсөгчид болон хамтран ажиллагч нартаа зориулсан мэндчилгээ.',
      },
      {
        number: '03',
        title: 'БҮТЭЦ, ЗОХИОН БАЙГУУЛАЛТ',
        text: 'Удирдах зөвлөл, Эрдмийн зөвлөл, Захирал, Чанарын үнэлгээний алба болон 4 үндсэн зохион байгуулалт.',
      },
      {
        number: '04',
        title: 'МАГАДЛАН ИТГЭМЖЛЭЛ',
        text: '2003, 2010, 2020 онуудад магадлан итгэмжлэгдсэн. 2026 оны 4 дэх удаагийн магадлан итгэмжлэлийн үйл ажиллагаа явагдаж байна.',
      },
    ],
    mvv: {
      mission: {
        title: 'ЭРХЭМ ЗОРИЛГО',
        text: 'Монгол болон Япон улсын зах зээлд хүлээн зөвшөөрөгдөхүйц мэргэжилтэн бэлтгэнэ.',
      },
      vision: {
        title: 'АЛСЫН ХАРАА',
        text: 'Япон судлалын чиглэлээр Монгол улсдаа тэргүүлэгч сургууль байх.',
      },
      values: {
        title: 'ҮНЭТ ЗҮЙЛС',
        text: 'С — Соёл уламжлалаа дээдэлсэн\nЭ — Эрдэм мэдлэгийг эрхэмлэсэн\nД — Даяар хөгжлийг хүндэтгэж, судалгааны төгөлдөршилд тэмүүлсэн\nС — Соёл-Эрдэм болж тэмүүлсэн',
      },
      slogan: {
        title: 'УРИА',
        text: 'Эрдмийн өндөр оргилоос ертөнцийг харъя',
      },
    },
  },
  EN: {
    heroTitle1: 'SOYOL ERDEM',
    heroTitle2: 'UNIVERSITY',
    heroBody:
      'Soyol Erdem University was founded in 1993 as a 100%-Japanese-funded institution. It is the leading school in Mongolia for Japanese-language education, partnering with more than 30 universities in Japan to run successful student-exchange programs. To date, over 1,500 students have graduated, and around 40% of our alumni study or work in Japan.',
    heroCta: 'Learn more about us',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'About',
    introEyebrow: 'Overview',
    introTitle: 'GET TO KNOW OUR UNIVERSITY',
    mvvEyebrow: 'Our values',
    sections: [
      {
        number: '01',
        title: 'FOUNDER',
        text: 'Founder and chairman of the board Soichi Makihara — on the origins and mission of the school.',
      },
      {
        number: '02',
        title: 'DIRECTOR\'S MESSAGE',
        text: 'Director D. Erdenechimeg — a message to faculty, students, alumni, and partners.',
      },
      {
        number: '03',
        title: 'GOVERNANCE & STRUCTURE',
        text: 'Board of Trustees, Academic Council, Director, Quality Assurance Office, and the four core divisions.',
      },
      {
        number: '04',
        title: 'ACCREDITATION',
        text: 'Accredited in 2003, 2010, and 2020. The fourth round of accreditation is currently in progress (2026).',
      },
    ],
    mvv: {
      mission: {
        title: 'MISSION',
        text: 'To prepare professionals recognised in both the Mongolian and Japanese labour markets.',
      },
      vision: {
        title: 'VISION',
        text: 'To be Mongolia\'s leading university in the field of Japanese studies.',
      },
      values: {
        title: 'VALUES',
        text: 'С — Cherish cultural heritage\nЭ — Pursue knowledge with rigour\nД — Embrace global development and research excellence\nС — Strive to embody Soyol Erdem',
      },
      slogan: {
        title: 'MOTTO',
        text: 'See the world from the heights of scholarship',
      },
    },
  },
  JP: {
    heroTitle1: 'ソヨル・エルデム',
    heroTitle2: '大学',
    heroBody:
      '1993年設立、日本資本100%のソヨル・エルデム大学。モンゴルにおける日本語教育の中心的存在として、日本国内30以上の大学と提携し、交換留学プログラムを成功裏に運営してきました。これまでに1,500名以上が卒業し、卒業生の約40%が日本で学び・働いています。',
    heroCta: '大学について詳しく',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: '大学について',
    introEyebrow: '紹介',
    introTitle: '本学について知る',
    mvvEyebrow: '私たちの価値観',
    sections: [
      {
        number: '01',
        title: '創立者',
        text: '創立者・理事長 牧原 聡一 — 大学の創立とミッションについて。',
      },
      {
        number: '02',
        title: '学長メッセージ',
        text: '学長 D. エルデネチメグ — 教職員・学生・卒業生・関係者の皆さまへのメッセージ。',
      },
      {
        number: '03',
        title: '組織構成',
        text: '理事会、学術評議会、学長、品質保証室、および4つの基幹部門。',
      },
      {
        number: '04',
        title: '認定・認証',
        text: '2003年・2010年・2020年に認証を取得。現在、第4回目の認証取得手続きを進行中です(2026年)。',
      },
    ],
    mvv: {
      mission: {
        title: '使命',
        text: 'モンゴル・日本両国の労働市場で通用する人材を育成する。',
      },
      vision: {
        title: 'ビジョン',
        text: '日本研究の分野でモンゴル屈指の大学であること。',
      },
      values: {
        title: '価値観',
        text: 'С — 文化遺産を大切に\nЭ — 学識と研鑽の追求\nД — 世界基準の発展と研究の卓越\nС — ソヨル・エルデムらしさの追求',
      },
      slogan: {
        title: 'スローガン',
        text: '学問の頂きから世界を見渡そう',
      },
    },
  },
};

/* ──────────────────────── Stats labels ───────────────────────────── */

export const STATS_LABELS = {
  MN: {
    history: 'Жилийн түүхтэй',
    graduates: 'Төгсөгчид',
    partners: 'Япон хамтрагч их сургууль',
    inJapan: 'Япон улсад ажиллаж байна',
  },
  EN: {
    history: 'years of history',
    graduates: 'graduates',
    partners: 'partner universities in Japan',
    inJapan: 'now study or work in Japan',
  },
  JP: {
    history: '年の歴史',
    graduates: '卒業生',
    partners: '日本国内の提携大学',
    inJapan: '日本で学び・働く卒業生',
  },
};

/* ──────────────────────── Admission page ──────────────────────────── */

interface AdmissionProgramTr {
  id: string;
  title: string;
  intro: string;
  bulletsLabel?: string;
  bullets: string[];
  bullets2Label?: string;
  bullets2?: string[];
  cta: string;
}

interface AdmissionStepTr {
  number: string;
  title: string;
  description: string;
}

interface ScholarshipTr {
  title: string;
  description: string;
}

interface FaqItemTr {
  question: string;
  answer: string;
}

interface AdmissionBundle {
  heroTitle: string;
  heroSubtitle: string;
  subNav: { info: string; foreign: string; payment: string };
  sectionInfoTitle: string;
  sectionInfoSubtitle: string;
  stepsTitle: string;
  stepsSubtitle: string;
  requirementsHeading: string;
  foreignTitle: string;
  paymentTitle: string;
  paymentSubtitle: string;
  faqTitle: string;
  programs: AdmissionProgramTr[];
  steps: AdmissionStepTr[];
  requirements: string[];
  scholarships: ScholarshipTr[];
  faq: FaqItemTr[];
}

export const ADMISSION_CONTENT: Record<Language, AdmissionBundle> = {
  MN: {
    heroTitle: 'ЭЛСЭЛТ',
    heroSubtitle: '2026-2027 оны хичээлийн жилийн элсэлтийн мэдээлэл.',
    subNav: {
      info: 'Мэргэжлээ сонгох',
      foreign: 'Гадаад оюутан элсэх',
      payment: 'Төлбөр, хөнгөлөлт',
    },
    sectionInfoTitle: 'МЭРГЭЖЛЭЭ СОНГОХ',
    sectionInfoSubtitle:
      '2026-2027 оны хичээлийн жилийн элсэлтийн журам, тэтгэлэг ба элсэлтийн төрлүүд.',
    stepsTitle: 'ЭЛСЭЛТИЙН АЛХАМ',
    stepsSubtitle: '5 алхамт энгийн процесс.',
    requirementsHeading: 'Элсэгчдэд тавигдах нийтлэг шаардлага',
    foreignTitle: 'ГАДААД ОЮУТАН ЭЛСЭХ',
    paymentTitle: 'ТӨЛБӨР, ХӨНГӨЛӨЛТ',
    paymentSubtitle: 'Элсэгчидэд зориулсан төлбөрийн хөнгөлөлтийн нөхцөл.',
    faqTitle: 'Тогтмол асуултууд',
    programs: [
      { id: 'bachelor', title: 'БАКАЛАВРЫН ЭЛСЭЛТ (2026–2027)', intro: '2026–2027 оны хичээлийн жилд дараах мэргэжлүүдээр элсэлт авч байна.', bullets: ['Программ хангамж', 'Бусад бакалаврын хөтөлбөрүүд'], bullets2Label: 'Тайлбар', bullets2: ['Элсэгчид ЭЕШ-ийн онооны шаардлагыг хангасан байна.'], cta: 'Бүртгүүлэх' },
      { id: 'software', title: 'ПРОГРАММ ХАНГАМЖИЙН МЭРГЭЖИЛ', intro: 'Ирээдүйн эрэлттэй салбарт суралцах боломж.', bullets: ['Орчин үеийн IT хөтөлбөр', 'Практикт суурилсан сургалт', 'Дотоод, гадаадын ажлын боломж'], cta: 'Дэлгэрэнгүй харах' },
      { id: 'master', title: 'МАГИСТРЫН ЭЛСЭЛТ', intro: 'Магистрын шатны элсэлт дараах чиглэлээр явагдана.', bullets: ['Гадаад хэл шинжлэл'], bullets2Label: 'Давуу тал', bullets2: ['Судалгаанд суурилсан сургалт', 'Ажлын хажуугаар суралцах боломж'], cta: 'Бүртгүүлэх' },
      { id: 'thirty-plus', title: '30+ ХӨТӨЛБӨР', intro: '30-аас дээш насны, ЭЕШ өгөөгүй иргэдэд зориулсан тусгай элсэлт.', bulletsLabel: 'Шаардлага', bullets: ['Мэргэжлээрээ 3+ жил ажилласан байх', 'Ажлын газрын тодорхойлолт', 'Бүрэн дунд боловсролын гэрчилгээ'], cta: 'Хүсэлт илгээх' },
      { id: 'transfer-major', title: 'МЭРГЭЖИЛ ХӨРВӨХ ХӨТӨЛБӨР', intro: 'Өмнө нь өөр мэргэжлээр төгссөн бол шинэ чиглэлээр суралцах боломж.', bulletsLabel: 'Хэнд тохиромжтой вэ?', bullets: ['Коллеж, МСҮТ, их дээд сургууль төгсөгчид', 'Шинэ мэргэжил эзэмших хүсэлтэй хүмүүс', 'Япон хэл сураад Япон улсад үргэлжлүүлэн суралцах сонирхолтой'], bullets2Label: 'Бүрдүүлэх материал', bullets2: ['Диплом, үнэмлэх', 'Холбогдох бичиг баримтууд'], cta: 'Дэлгэрэнгүй' },
      { id: 'transfer-abroad', title: 'ГАДААДААС ШИЛЖИН СУРАЛЦАХ', intro: 'Гадаадад суралцаж байгаад шилжин ирэх боломжтой.', bulletsLabel: 'Нэмэлт шаардлага', bullets: ['Суралцаж байсан сургуулийн дүнгийн хуулга', 'Баталгаат орчуулга'], cta: 'Шилжилт хүсэх' },
      { id: 'online', title: 'ОНЛАЙН СУРГАЛТ', intro: 'Гадаадад ажиллаж, амьдарч буй иргэдэд зориулсан уян хатан хэлбэр.', bullets: ['100% онлайн сургалт', 'Бакалавр, магистрын зэрэг олгоно', 'Хаанаас ч суралцах боломж'], cta: 'Онлайнаар бүртгүүлэх' },
      { id: 'preparation', title: 'БЭЛТГЭЛ АНГИ', intro: 'ЭЕШ-ийн оноо хүрээгүй элсэгчдэд зориулсан хөтөлбөр.', bullets: ['1 жилийн бэлтгэл сургалт', 'ЭЕШ-д бэлтгэнэ', 'Оноо авсны дараа үндсэн ангид шилжинэ'], cta: 'Бүртгүүлэх' },
    ],
    steps: [
      { number: '01', title: 'МЭДЭЭЛЭЛ АВАХ', description: 'Манай мэргэжлүүд, сургалтын төлбөр, тэтгэлэгийн талаар судал. Утсаар эсвэл биечлэн ирж зөвлөгөө аваарай.' },
      { number: '02', title: 'БҮРТГҮҮЛЭХ', description: 'Онлайн эсвэл биечлэн бүртгүүлэх. ЭЕШ-ын батламж, гэрчилгээ, бусад баримт бичгээ бэлдээд ирээрэй.' },
      { number: '03', title: 'БАРИМТ ӨГӨХ', description: 'ЭЕШ-ын батламж, суурь боловсролын гэрчилгээ, бүрэн дунд боловсролын гэрчилгээ, бусад шаардагдах баримт.' },
      { number: '04', title: 'ШАЛГАЛТ / ЯРИЛЦЛАГА', description: 'Зарим мэргэжлийн ангид нэмэлт шалгалт эсвэл ярилцлага байж болно. Гадаадын иргэн, дээд боловсролтой иргэн эссэ бичиж, ярилцлагад орно.' },
      { number: '05', title: 'ҮР ДҮН', description: 'Тэнцсэн элсэгчдэд суралцах эрхийн бичиг олгоно. Сургалтын төлбөр төлж бүртгэлээ дуусгана.' },
    ],
    requirements: [
      'Элсэлтийн ерөнхий шалгалтын батламжтай байх',
      'Суурь боловсролын гэрчилгээ болон бүрэн дунд боловсролын гэрчилгээтэй байх',
      'Эрүүл мэнд, сэтгэцийн хувьд тус сургуульд элсэхэд харшлах зүйлгүй байна',
      'Гадаадын иргэн болон дээд боловсролтой Монгол улсын иргэн эссэ бичиж, ярилцлагад орно',
      'Бүрдүүлэх материал: ЭЕШ батламж, гэрчилгээнүүд, иргэний үнэмлэх, цээж зураг',
    ],
    scholarships: [
      { title: 'Япон улсад 50% эсвэл 100% тэтгэлэгтэй суралцах', description: 'Шилдэг оюутнуудад Япон улсын 30 гаруй хамтран ажиллагч их сургуулиар тэтгэлэгтэй сургалт.' },
      { title: 'Интерншип — цалинтай дадлага', description: 'Сард 2.5 сая төгрөгтэй тэнцэх (150,000 иений) цалинтай япон хэл, соёлын практик дадлага.' },
      { title: 'Зуны амралтын тэтгэлэг', description: 'Багш, оюутнууд зуны амралтаараа 100% тэтгэлэгтэй хэлний бэлтгэлд суралцах боломж.' },
      { title: 'Хөгжлийн бэрхшээлтэй элсэгчид', description: 'Хөгжлийн бэрхшээлтэй эсвэл эцэг эх нь хоёулаа хөгжлийн бэрхшээлтэй элсэгчдэд төлбөрийн хөнгөлөлт.' },
      { title: 'Олон хүүхэдтэй өрхийн тэтгэлэг', description: 'Нэг өрхийн 3 болон түүнээс дээш хүүхэд дээд боловсрол эзэмшихээр зэрэг суралцаж буй бол 1 хүүхдийн төлбөрийн хөнгөлөлт.' },
    ],
    faq: [
      { question: 'Япон хэл огт мэдэхгүй элсэж болох уу?', answer: 'Тийм. Манай сургуульд япон хэлний бүх түвшний оюутан элсэх боломжтой. Бид анхан шатнаас N1 түвшин хүртэл системтэй сургалт явуулдаг.' },
      { question: 'Япон улсад ажиллах баталгаатай юу?', answer: 'Манай төгсөгчдийн 40% Япон улсад ажиллаж байна. Интерншип хөтөлбөр болон 30 гаруй японы хамтрагч сургуулиар дамжуулан Япон улсад очих боломж өндөр.' },
      { question: 'Сургалтын төлбөр хэд вэ?', answer: 'Жил тутмын сургалтын төлбөр болон төлбөрийн нөхцөлийн талаар манай элсэлтийн алба руу 7011-8584 утсаар лавлана уу.' },
      { question: 'Дотуур байр байгаа юу?', answer: 'Тийм. Сургуулийн дэргэд дотуур байр ажиллаж байна. Орон нутгаас ирсэн оюутнуудыг хариуцлагатай шууд хариуцана.' },
      { question: 'Хэдэн настай элсэх боломжтой вэ?', answer: 'Бүрэн дунд боловсрол эзэмшсэн, ЭЕШ-ын батламжтай 17 наснаас дээш насны иргэн элсэх боломжтой. Насны дээд хязгааргүй.' },
    ],
  },
  EN: {
    heroTitle: 'ADMISSION',
    heroSubtitle: 'Admission information for the 2026–2027 academic year.',
    subNav: {
      info: 'Choose your major',
      foreign: 'International students',
      payment: 'Tuition & scholarships',
    },
    sectionInfoTitle: 'CHOOSE YOUR MAJOR',
    sectionInfoSubtitle:
      'Admission policies, scholarships, and program types for the 2026–2027 academic year.',
    stepsTitle: 'APPLICATION STEPS',
    stepsSubtitle: 'A straightforward five-step process.',
    requirementsHeading: 'General admission requirements',
    foreignTitle: 'INTERNATIONAL STUDENTS',
    paymentTitle: 'TUITION & SCHOLARSHIPS',
    paymentSubtitle: 'Discount and scholarship options for applicants.',
    faqTitle: 'Frequently asked questions',
    programs: [
      { id: 'bachelor', title: 'BACHELOR\'S ADMISSION (2026–2027)', intro: 'Admission for the 2026–2027 academic year is open in the majors below.', bullets: ['Software Engineering', 'Other bachelor\'s programs'], bullets2Label: 'Note', bullets2: ['Applicants must meet the national entrance-exam (EYESH) score requirement.'], cta: 'Apply' },
      { id: 'software', title: 'SOFTWARE ENGINEERING', intro: 'Train for one of the highest-demand fields of the future.', bullets: ['Modern IT curriculum', 'Hands-on, practice-based learning', 'Career opportunities at home and abroad'], cta: 'Learn more' },
      { id: 'master', title: 'MASTER\'S ADMISSION', intro: 'Master\'s admission runs in the following track.', bullets: ['Foreign Linguistics'], bullets2Label: 'Why study with us', bullets2: ['Research-based curriculum', 'Study while you work'], cta: 'Apply' },
      { id: 'thirty-plus', title: '30+ PROGRAM', intro: 'A dedicated admission track for applicants over 30 who did not sit the EYESH.', bulletsLabel: 'Eligibility', bullets: ['Three or more years of work experience in the field', 'Letter of employment', 'Certificate of complete secondary education'], cta: 'Submit application' },
      { id: 'transfer-major', title: 'MAJOR-CHANGE PROGRAM', intro: 'An opportunity for graduates of other fields to retrain in a new specialty.', bulletsLabel: 'Who is it for?', bullets: ['Graduates of colleges, vocational schools, and universities', 'Anyone wishing to acquire a new profession', 'Those learning Japanese with the intention of continuing studies in Japan'], bullets2Label: 'Required documents', bullets2: ['Diploma and ID', 'Relevant supporting paperwork'], cta: 'Learn more' },
      { id: 'transfer-abroad', title: 'TRANSFER FROM ABROAD', intro: 'Transfer in from another institution overseas.', bulletsLabel: 'Additional requirements', bullets: ['Transcript from the previous institution', 'Certified translation'], cta: 'Request transfer' },
      { id: 'online', title: 'ONLINE LEARNING', intro: 'A flexible track designed for Mongolians living and working overseas.', bullets: ['100% online instruction', 'Bachelor\'s and master\'s degrees offered', 'Study from anywhere'], cta: 'Apply online' },
      { id: 'preparation', title: 'PREP COURSE', intro: 'A pathway for applicants whose EYESH score did not yet meet the threshold.', bullets: ['One-year preparatory program', 'EYESH coaching included', 'Promotion to the main program once the score is achieved'], cta: 'Apply' },
    ],
    steps: [
      { number: '01', title: 'GATHER INFORMATION', description: 'Read up on our majors, tuition, and scholarship options. Call us or come in person for a consultation.' },
      { number: '02', title: 'REGISTER', description: 'Register online or in person. Bring your EYESH certificate, transcripts, and other required documents.' },
      { number: '03', title: 'SUBMIT DOCUMENTS', description: 'EYESH certificate, basic-education certificate, complete-secondary certificate, and any other supporting documents.' },
      { number: '04', title: 'EXAM / INTERVIEW', description: 'Some majors require an extra entrance exam or interview. International applicants and those with prior higher education complete an essay and interview.' },
      { number: '05', title: 'RESULT', description: 'Successful applicants receive their letter of enrolment. Pay the tuition fee to finalise registration.' },
    ],
    requirements: [
      'Hold a valid national entrance-exam (EYESH) certificate',
      'Hold a basic-education certificate and a complete-secondary-education certificate',
      'Be in good physical and mental health, with no medical contraindications to enrolment',
      'International applicants and Mongolian citizens with prior higher education complete an essay and interview',
      'Application packet: EYESH certificate, school certificates, ID, passport photos',
    ],
    scholarships: [
      { title: 'Study in Japan with a 50% or 100% scholarship', description: 'Top students receive scholarships at our 30+ partner universities in Japan.' },
      { title: 'Internship — paid practical experience', description: 'A paid Japanese-language and culture internship worth roughly MNT 2.5M (¥150,000) per month.' },
      { title: 'Summer scholarship', description: 'Faculty and students can join a fully-funded summer Japanese-language program.' },
      { title: 'Applicants with disabilities', description: 'Tuition discount for applicants with disabilities or whose both parents are disabled.' },
      { title: 'Large-family scholarship', description: 'When three or more children from the same household are studying in higher education at the same time, one child\'s tuition is discounted.' },
    ],
    faq: [
      { question: 'Can I enrol without any Japanese-language background?', answer: 'Yes. We accept students at every level of Japanese ability and run a structured curriculum from beginner all the way up to JLPT N1.' },
      { question: 'Is employment in Japan guaranteed?', answer: 'About 40% of our alumni currently work in Japan. Through the internship program and our 30+ Japanese partner universities, the chances of going to Japan are high.' },
      { question: 'How much is tuition?', answer: 'Please call our admissions office at 7011-8584 for the latest annual tuition and payment terms.' },
      { question: 'Is on-campus housing available?', answer: 'Yes. We operate a residence hall on the campus grounds and prioritise placement for students from outside the capital.' },
      { question: 'What is the age range for admission?', answer: 'Anyone aged 17 or above who has completed secondary education and holds an EYESH certificate may apply. There is no upper age limit.' },
    ],
  },
  JP: {
    heroTitle: '入学案内',
    heroSubtitle: '2026–2027年度入試の最新情報。',
    subNav: {
      info: '専攻を選ぶ',
      foreign: '留学生の方へ',
      payment: '学費・奨学金',
    },
    sectionInfoTitle: '専攻を選ぶ',
    sectionInfoSubtitle:
      '2026–2027年度の入試要項、奨学金、選考方式の一覧。',
    stepsTitle: '出願ステップ',
    stepsSubtitle: '5ステップで完結するシンプルな手続き。',
    requirementsHeading: '一般的な出願資格',
    foreignTitle: '留学生の方へ',
    paymentTitle: '学費・奨学金',
    paymentSubtitle: '入学者向けの学費減免・奨学金制度の概要。',
    faqTitle: 'よくあるご質問',
    programs: [
      { id: 'bachelor', title: '学士課程入試(2026–2027)', intro: '2026–2027年度は以下の専攻で出願を受け付けます。', bullets: ['ソフトウェア工学', 'その他の学士課程'], bullets2Label: '備考', bullets2: ['全国共通入試(EYESH)の合格基準点を満たす必要があります。'], cta: '出願する' },
      { id: 'software', title: 'ソフトウェア工学', intro: '将来性の高い分野で学ぶチャンス。', bullets: ['最新のIT教育', '実務に直結した実践型学習', '国内外での就職機会'], cta: '詳しく見る' },
      { id: 'master', title: '修士課程入試', intro: '修士課程は以下の研究領域で募集します。', bullets: ['外国語学・言語学'], bullets2Label: '本学の強み', bullets2: ['研究中心のカリキュラム', '社会人と並行して学べる柔軟さ'], cta: '出願する' },
      { id: 'thirty-plus', title: '30+(30歳以上)プログラム', intro: 'EYESH未受験の30歳以上の方を対象とした特別入試枠。', bulletsLabel: '応募条件', bullets: ['当該分野での実務経験3年以上', '勤務先の証明書', '中等教育修了証'], cta: '申請する' },
      { id: 'transfer-major', title: '専攻転換プログラム', intro: 'すでに別分野で卒業された方が新しい専攻に挑戦できます。', bulletsLabel: '対象となる方', bullets: ['短大・専門学校・大学の既卒者', '新しい職能を身に付けたい方', '日本語を学び将来日本での進学を目指す方'], bullets2Label: '必要書類', bullets2: ['卒業証書、身分証', '関連する補足書類'], cta: '詳しく見る' },
      { id: 'transfer-abroad', title: '海外からの編入', intro: '海外で在学中の方も編入できます。', bulletsLabel: '追加要件', bullets: ['在学先大学の成績証明書', '公証付き翻訳'], cta: '編入を申し込む' },
      { id: 'online', title: 'オンライン学習', intro: '海外在住・在勤のモンゴル人向け、柔軟な学習形態。', bullets: ['100%オンライン授業', '学士・修士の学位授与', '世界中どこからでも受講可能'], cta: 'オンラインで出願' },
      { id: 'preparation', title: '予備コース', intro: 'EYESHの基準点に届かなかった方のための準備プログラム。', bullets: ['1年間の予備課程', 'EYESH対策込み', '基準点取得後は本科に移行'], cta: '出願する' },
    ],
    steps: [
      { number: '01', title: '情報収集', description: '専攻、学費、奨学金について調べる。電話または来校の上、相談員にご相談ください。' },
      { number: '02', title: '出願登録', description: 'オンラインまたは来校で出願。EYESH合格証、卒業証書、その他必要書類をご準備ください。' },
      { number: '03', title: '書類提出', description: 'EYESH合格証、基礎教育修了証、中等教育修了証、その他必要書類を提出。' },
      { number: '04', title: '試験・面接', description: '一部の専攻では追加試験または面接があります。留学生および既卒者は小論文と面接が課されます。' },
      { number: '05', title: '結果通知', description: '合格者には入学許可書を発行。学費納付をもって入学手続き完了です。' },
    ],
    requirements: [
      'EYESH(モンゴル全国共通入試)合格証を保有していること',
      '基礎教育修了証および中等教育修了証を保有していること',
      '心身ともに本学での就学に支障がないこと',
      '留学生およびモンゴル国籍の既卒者は小論文と面接を受けること',
      '提出書類:EYESH合格証、各種卒業証、身分証、顔写真',
    ],
    scholarships: [
      { title: '日本で50%または100%の奨学金で留学', description: '優秀な学生は日本の30以上の提携校で奨学金留学のチャンス。' },
      { title: 'インターンシップ - 有給実習', description: '月額約MNT 2,500,000(150,000円)相当の有給日本語・文化研修。' },
      { title: '夏期奨学金', description: '教職員と学生が夏期休暇中に100%奨学金で日本語集中講座を受講可能。' },
      { title: '障がいのある方', description: '本人または両親が障がいをお持ちの場合、学費を減免します。' },
      { title: '多子世帯奨学金', description: '同一世帯から3人以上が同時期に高等教育を受ける場合、1名分の学費を減免します。' },
    ],
    faq: [
      { question: '日本語の知識がなくても入学できますか?', answer: 'はい。日本語の習熟度を問わず、すべてのレベルの学生を受け入れます。初級からJLPT N1まで体系的なカリキュラムを用意しています。' },
      { question: '日本で働ける保証はありますか?', answer: '本学の卒業生の約40%が日本で就労しています。インターンシップ制度と30以上の提携校を通じて、日本での進路の機会は豊富です。' },
      { question: '学費はいくらですか?', answer: '年間の学費および支払い条件については、入学事務室(7011-8584)までお問い合わせください。' },
      { question: '寮はありますか?', answer: 'はい。学内に学生寮を備えており、地方出身の学生を優先的に受け入れます。' },
      { question: '何歳から出願できますか?', answer: '中等教育を修了し、EYESH合格証を持つ17歳以上の方であればご出願いただけます。年齢の上限はありません。' },
    ],
  },
};


export const SECTION_TITLES = {
  MN: {
    homeLatestNews: 'СҮҮЛИЙН МЭДЭЭ',
    homeViewAllNews: 'Бүх мэдээг үзэх',
    studentLifeTitle: 'ОЮУТНЫ АМЬДРАЛ',
    researchTitle: 'ЭРДЭМ ШИНЖИЛГЭЭ, СУДАЛГААНЫ АЖИЛ',
    internationalTitle: 'СУРГУУЛИЙН ГАДААД, ДОТООД ХАМТЫН АЖИЛЛАГАА',
    programsTitle: 'МЭРГЭЖЛҮҮД',
    admissionTitle: 'ЭЛСЭЛТ',
    contactTitle: 'ХОЛБОО БАРИХ',
    libraryTitle: 'НОМЫН САН',
    careersTitle: 'НЭЭЛТТЭЙ АЖЛЫН БАЙР',
    regulationsTitle: 'ДҮРЭМ ЖУРАМ',
    newsTitle: 'МЭДЭЭ',
    soninTitle: 'СОНИН ХЭВЛЭЛ',
    elearningTitle: 'ЦАХИМ СУРГАЛТ',
  },
  EN: {
    homeLatestNews: 'LATEST NEWS',
    homeViewAllNews: 'View all news',
    studentLifeTitle: 'STUDENT LIFE',
    researchTitle: 'RESEARCH & SCHOLARSHIP',
    internationalTitle: 'INTERNATIONAL & DOMESTIC PARTNERSHIPS',
    programsTitle: 'PROGRAMS',
    admissionTitle: 'ADMISSION',
    contactTitle: 'CONTACT US',
    libraryTitle: 'LIBRARY',
    careersTitle: 'CAREERS',
    regulationsTitle: 'REGULATIONS',
    newsTitle: 'NEWS',
    soninTitle: 'SCHOOL NEWSPAPER',
    elearningTitle: 'ONLINE LEARNING',
  },
  JP: {
    homeLatestNews: '最新ニュース',
    homeViewAllNews: 'すべてのニュース',
    studentLifeTitle: '学生生活',
    researchTitle: '研究・学術活動',
    internationalTitle: '国際・国内連携',
    programsTitle: '専攻一覧',
    admissionTitle: '入学案内',
    contactTitle: 'お問い合わせ',
    libraryTitle: '図書館',
    careersTitle: '採用情報',
    regulationsTitle: '規則・規程',
    newsTitle: 'ニュース',
    soninTitle: '広報誌',
    elearningTitle: 'オンライン学習',
  },
};

/* ───────────────────────── Research page ──────────────────────────── */

interface ResearchBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbThis: string;
  intro: string;
  areasTitle: string;
  areasSubtitle: string;
  /** Order must match RESEARCH_AREAS in lib/content.ts (icons stay there). */
  areas: { title: string; description: string }[];
  departmentsTitle: string;
  departmentsSubtitle: string;
  /** Three department blocks — order matches RESEARCH_DEPARTMENTS. */
  departments: { title: string; topics: string[] }[];
  highlightsTitle: string;
  highlightsSubtitle: string;
  /** Three highlight paragraphs — order matches RESEARCH_HIGHLIGHTS. */
  highlights: string[];
  feedTitle: string;
  feedSubtitle: string;
  journalsTitle: string;
  journalsSubtitle: string;
  download: string;
  publishing: string;
}

export const RESEARCH_CONTENT: Record<Language, ResearchBundle> = {
  MN: {
    heroTitle: 'ЭРДЭМ ШИНЖИЛГЭЭ, СУДАЛГААНЫ АЖИЛ',
    heroSubtitle:
      'Тэнхимүүдийн судалгааны тэргүүлэх чиглэл, ахисан түвшний судалгаа, олон улсын хамтын ажиллагаа.',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Эрдэм шинжилгээ',
    intro:
      'Соёл Эрдэм Дээд Сургуулийн эрдэм шинжилгээ, судалгааны ажил нь мэргэжлийн тэнхимүүдийн тэргүүлэх чиглэлд төвлөрсөн судалгаа, ахисан түвшний эрдэм шинжилгээний бүтээл, олон улсын хамтын ажиллагаатай хослон явагддаг.',
    areasTitle: 'СЭДС-ИЙН СУДАЛГААНЫ ТЭРГҮҮЛЭХ ЧИГЛЭЛҮҮД',
    areasSubtitle: 'Мэргэжлийн тэнхимүүдийн судалгааны үндсэн 3 чиглэл.',
    areas: [
      {
        title: 'Япон хэл утга зохиол судлал, орчуулга зүй',
        description:
          'Япон судлалын тэнхимийн тэргүүлэх чиглэл: хэл шинжлэл, утга зохиол, орчуулга зүй.',
      },
      {
        title: 'Мэдээлэл харилцааны технологи',
        description:
          'Сүлжээний аюулгүй байдал, программ хангамж, автоматжуулалтын чиглэл.',
      },
      {
        title: 'Монгол судлал, Монгол утга зохиол судлал',
        description:
          'Монгол утга зохиол, хэл, соёлын судалгаа — ахисан түвшний хөтөлбөртэй.',
      },
    ],
    departmentsTitle: 'СУДАЛГААНЫ ЧИГЛЭЛ',
    departmentsSubtitle:
      'Тэнхим, ахисан түвшнээр ангилсан судалгааны нарийвчилсан чиглэлүүд.',
    departments: [
      {
        title: 'Япон судлалын тэнхим',
        topics: [
          'Япон хэл утга зохиол судлал',
          'Япон-монгол, Монгол-япон хэлний орчуулга зүй',
          'Япон хэл заах арга',
          'Япон хэл соёл судлал',
          'Монгол-Япон, Япон-Монгол харилцаа судлал',
          'Япон орон судлал',
        ],
      },
      {
        title: 'Мэдээллийн технологийн тэнхим',
        topics: [
          'Сүлжээний аюулгүй байдал',
          'Программ хангамжийн хэрэглээ',
          'Автоматжуулалт',
        ],
      },
      {
        title: 'Ахисан түвшний судалгаа',
        topics: [
          'Япон хэл утга зохиол судлал',
          'Япон-монгол, Монгол-япон хэлний орчуулга зүй',
          'Япон хэл заах арга',
          'Япон хэл соёл судлал',
          'Монгол судлал, Монгол утга зохиол судлал',
        ],
      },
    ],
    highlightsTitle: 'ОНЦЛОХ ҮЙЛ АЖИЛЛАГАА',
    highlightsSubtitle:
      'Судалгааны профессорын баг, олон улсын гэрчилгээт сургалт, цахим хэрэглэгдэхүүн.',
    highlights: [
      'Тус сургуулийн эрдэмтэн багш нар судалгааны чиглэлээр судалгааны профессорын баг байгуулан үйл ажиллагаагаа явуулдаг.',
      'Программ хангамжийн мэргэжлийн оюутнуудыг 2023 оноос эхлэн CISCO академийн албан ёсны гэрчилгээтэй төгсдөг болсноор олон улсад IT компаниудад ажиллах боломжийг олгодог. Мөн мэдээллийн аюулгүй байдлын мэргэшүүлэх сургалт, компьютерын сүлжээ, Internet of Things, Программ хангамж, OS & IT, Packet Tracer сургалтуудыг Дээд сургуулийн оюутанд үнэ төлбөргүй зааж сургалт явуулж байна.',
      'Тус хичээлийн жилээс эхлэн СЭДС нь онлайн болон цахим сургалтандаа MOODLE зайн сургалтын платформыг хэрэглэж эхэллээ. Ингэснээр гадаадаас элсэн суралцаж буй магиструуд болон интерншип хөтөлбөрт хамрагдсан бакалаврын хөтөлбөрийн оюутнууд хугацаа алдалгүй сургалтаа үргэлжлүүлэн суралцах боломж нээгдэж байна.',
    ],
    feedTitle: 'ЭРДЭМ ШИНЖИЛГЭЭНИЙ МЭДЭЭ, БҮТЭЭЛҮҮД',
    feedSubtitle:
      'Манай эрдэмтэн багш нарын шинэ нийтлэл, илтгэл, ном, диссертаци болон төслийн мэдээ.',
    journalsTitle: 'ЭРДЭМ ШИНЖИЛГЭЭНИЙ СЭТГҮҮЛ',
    journalsSubtitle:
      'Соёл Эрдэм Дээд Сургуулиас гаргадаг боть тус бүрийг номын хуудас эргүүлэн уншиж танилцана уу.',
    download: 'Татах',
    publishing: 'Хэвлэгдэх шатанд',
  },
  EN: {
    heroTitle: 'RESEARCH & SCHOLARSHIP',
    heroSubtitle:
      'Departmental research priorities, graduate-level studies, and international research partnerships.',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'Research',
    intro:
      'Research at Soyol Erdem University combines department-led priority studies, graduate-level scholarship and active international cooperation.',
    areasTitle: 'PRIORITY RESEARCH AREAS',
    areasSubtitle: 'Three core research directions led by our academic departments.',
    areas: [
      {
        title: 'Japanese linguistics, literature & translation studies',
        description:
          'The Department of Japanese Studies focuses on linguistics, literature and translation theory.',
      },
      {
        title: 'Information & communication technology',
        description:
          'Network security, software engineering and automation.',
      },
      {
        title: 'Mongolian studies & Mongolian literature',
        description:
          'Mongolian literature, language and cultural research — with a graduate-level programme.',
      },
    ],
    departmentsTitle: 'RESEARCH STREAMS',
    departmentsSubtitle:
      'Detailed research topics grouped by department and by graduate level.',
    departments: [
      {
        title: 'Department of Japanese Studies',
        topics: [
          'Japanese linguistics and literature',
          'Japanese–Mongolian and Mongolian–Japanese translation studies',
          'Japanese-language teaching methodology',
          'Japanese language & cultural studies',
          'Mongolia–Japan and Japan–Mongolia relations',
          'Japan area studies',
        ],
      },
      {
        title: 'Department of Information Technology',
        topics: [
          'Network security',
          'Applied software engineering',
          'Automation',
        ],
      },
      {
        title: 'Graduate-level research',
        topics: [
          'Japanese linguistics and literature',
          'Japanese–Mongolian and Mongolian–Japanese translation studies',
          'Japanese-language teaching methodology',
          'Japanese language & cultural studies',
          'Mongolian studies and Mongolian literature',
        ],
      },
    ],
    highlightsTitle: 'PROGRAMME HIGHLIGHTS',
    highlightsSubtitle:
      'Research-professor teams, internationally accredited training and digital learning tools.',
    highlights: [
      'Our academic staff form dedicated research-professor teams that pursue work along each priority area.',
      'Since 2023, students graduating from our software-engineering programme earn an official CISCO Academy certificate, opening the door to IT careers worldwide. We also offer free training to all undergraduates in information-security specialisation, computer networking, Internet of Things, software, OS & IT, and Cisco Packet Tracer.',
      'Starting this academic year, Soyol Erdem has adopted the MOODLE distance-learning platform for both online and blended courses. This lets international master\'s students and visiting interns continue their studies without losing momentum.',
    ],
    feedTitle: 'RESEARCH NEWS & PUBLICATIONS',
    feedSubtitle:
      'New articles, talks, books, dissertations and project updates from our faculty.',
    journalsTitle: 'ACADEMIC JOURNALS',
    journalsSubtitle:
      'Browse each volume published by Soyol Erdem University by flipping through the pages.',
    download: 'Download',
    publishing: 'In press',
  },
  JP: {
    heroTitle: '研究・学術活動',
    heroSubtitle:
      '各学科の重点研究分野、大学院レベルの研究、国際共同研究まで。',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: '研究',
    intro:
      'ソヨル・エルデム大学の研究活動は、各専門学科の重点課題、大学院レベルの研究成果、そして国際協力を組み合わせて進められています。',
    areasTitle: '本学の重点研究分野',
    areasSubtitle: '専門学科が主導する3つの中核研究分野。',
    areas: [
      {
        title: '日本語学・日本文学・翻訳論',
        description:
          '日本研究学科の重点分野 — 言語学、文学、翻訳理論を扱います。',
      },
      {
        title: '情報通信技術',
        description:
          'ネットワークセキュリティ、ソフトウェア工学、オートメーション。',
      },
      {
        title: 'モンゴル学・モンゴル文学研究',
        description:
          'モンゴル文学・言語・文化の研究 — 大学院プログラムを併設。',
      },
    ],
    departmentsTitle: '研究分野',
    departmentsSubtitle:
      '学科別および大学院レベル別に整理した詳細な研究テーマ。',
    departments: [
      {
        title: '日本研究学科',
        topics: [
          '日本語学・日本文学',
          '日蒙・蒙日翻訳論',
          '日本語教授法',
          '日本語・日本文化研究',
          '日蒙関係・蒙日関係研究',
          '日本地域研究',
        ],
      },
      {
        title: '情報技術学科',
        topics: [
          'ネットワークセキュリティ',
          'ソフトウェア応用',
          'オートメーション',
        ],
      },
      {
        title: '大学院レベルの研究',
        topics: [
          '日本語学・日本文学',
          '日蒙・蒙日翻訳論',
          '日本語教授法',
          '日本語・日本文化研究',
          'モンゴル学・モンゴル文学',
        ],
      },
    ],
    highlightsTitle: '特色ある取り組み',
    highlightsSubtitle:
      '研究教授チーム、国際認定研修、デジタル学習環境。',
    highlights: [
      '本学の教員は、各重点分野ごとに研究教授チームを編成し、共同で研究活動を進めています。',
      '2023年度からソフトウェア工学専攻の卒業生はCISCOアカデミーの公式認定証を取得して卒業し、国際的なIT企業で活躍する道が開かれました。さらに学部生全員に対して、情報セキュリティ専門研修、コンピュータネットワーク、IoT、ソフトウェア、OS & IT、Cisco Packet Tracerなどの講習を無償で提供しています。',
      '本年度よりソヨル・エルデムは、オンライン授業およびハイブリッド授業にMOODLE遠隔学習プラットフォームを導入しました。これにより海外から学ぶ大学院生や、交換留学・インターンシップ参加の学部生が、ブランクを生じることなく学業を継続できる環境が整いました。',
    ],
    feedTitle: '研究ニュース・成果',
    feedSubtitle:
      '本学教員による最新の論文・発表・書籍・学位論文・プロジェクト情報。',
    journalsTitle: '学術ジャーナル',
    journalsSubtitle:
      'ソヨル・エルデム大学が発行する各号を、ページをめくる感覚でご覧いただけます。',
    download: 'ダウンロード',
    publishing: '刊行準備中',
  },
};

/* ───────────────────── International page ────────────────────────── */

/** A localised partner profile — same shape as PartnerDetailed minus
 *  the structural fields (logo, nameJp). Joined by index with the
 *  canonical Mongolian list in lib/content.ts. */
interface LocalisedPartner {
  name: string;
  location: string;
  partnerSince?: string;
  detail: string;
  headline?: string;
}

interface LocalisedDomestic {
  name: string;
  detail: string;
  activities: string[];
}

interface LocalisedPartnerUni {
  name: string;
  location: string;
  type: string;
}

interface InternationalBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbThis: string;
  intro: string;
  /** Three callout block heading/body pairs — order matches
   *  INTERNATIONAL_BLOCKS in lib/content.ts. */
  blocks: { heading: string; body: string }[];
  japanPartnersTitle: string;
  /** Template with `{count}` placeholder substituted at render time.
   *  Kept as a string (not a function) so the value can serialise
   *  cleanly when passed through a server→client boundary. */
  japanPartnersSubtitle: string;
  highSchoolsTitle: string;
  highSchoolsSubtitle: string;
  domesticTitle: string;
  domesticSubtitle: string;
  otherPartnersTitle: string;
  otherPartnersSubtitle: string;
  /** Collapsible card affordance. */
  expand: string;
  collapse: string;
  /** Inline label inside each domestic partner card. */
  jointActivities: string;
  /** 18 Japan partners — same order as JAPAN_PARTNERS_DETAILED. */
  japanPartners: LocalisedPartner[];
  /** 2 high-school partners — same order as JAPAN_HIGH_SCHOOLS. */
  highSchools: LocalisedPartner[];
  /** 3 domestic partners — same order as DOMESTIC_PARTNERS. */
  domestic: LocalisedDomestic[];
  /** 16 directory entries — same order as PARTNER_UNIVERSITIES. */
  otherPartners: LocalisedPartnerUni[];
}

export const INTERNATIONAL_CONTENT: Record<Language, InternationalBundle> = {
  MN: {
    heroTitle: 'СУРГУУЛИЙН ГАДААД, ДОТООД ХАМТЫН АЖИЛЛАГАА',
    heroSubtitle:
      'Япон улсын 30+ их сургууль, мэргэжлийн сургууль, олон улсын байгууллагатай хамтрах сүлжээ.',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Хамтын ажиллагаа',
    intro:
      'Соёл Эрдэм Дээд Сургууль нь байгуулагдсан цагаасаа эхлэн гадаад харилцааны асуудлыг түлхүү анхаарч ирсэн. Япон улсын олон их дээд сургууль, хувийн хэвшил, олон улсын байгууллагуудтай сургалт, эрдэм шинжилгээний хамтын ажиллагааг хөгжүүлэхээс гадна оюутан, багш солилцооны хөтөлбөрийг хэрэгжүүлдэг.',
    blocks: [
      {
        heading: 'Оюутан солилцооны хөтөлбөр',
        body: 'Гадаад харилцаа, хамтын ажиллагааны хүрээнд оюутан солилцооны хөтөлбөр хэрэгжүүлдэг нь оюутнуудад Япон улсын их дээд сургуулиудад 50–100%-ийн тэтгэлэгээр суралцах таатай боломжийг олгодог. Одоогийн байдлаар энэхүү оюутан солилцооны хөтөлбөрт 100 гаруй оюутан хамрагдаад байна. Ирэх 2024–2025 оны хичээлийн жилд Программ хангамжийн хөтөлбөрөөр 2+2 хөтөлбөрийг хэрэгжүүлэхээр Япон улсын Велнесс Спортын их сургуультай хамтран ажиллах гэрээ байгуулан оюутнуудыг суралцуулах боломжтой болоод байна.',
      },
      {
        heading: 'Интерншип — цалинтай дадлага (2014 оноос)',
        body: 'СЭДС нь Монголд анх удаа Интерншип буюу цалинтай дадлагын хөтөлбөрийг 2014 оноос хэрэгжүүлж эхэлсэн. Энэхүү хөтөлбөр нь оюутнууд 3 сараас 1 жилийн хугацаатай Япон улсад ажиллаж амьдрахын зэрэгцээ Япон улсын түүх, соёл, аж амьдралын хэв маягаас суралцаж, халуун рашаан болон зочид буудалд ажиллан олон талын мэдлэг олж авдаг. Энэ хөтөлбөрийн хүрээнд оюутнууд сард 160,000 иен буюу монгол мөнгөөр 2,500,000 гаруй төгрөгийн цалин авдаг.',
      },
      {
        heading: 'Байгаль экологийн хамтарсан дадлага',
        body: '2006 оноос эхлэн жил бүр Япон улсын Оберлин их сургуультай хамтран хоёр улсын оюутнуудын байгаль экологийн хамтарсан дадлагыг зохион байгуулсаар ирсэн. Уг дадлагын хүрээнд хоёр орны оюутнууд харилцан мэдлэг солилцож, соёл, гадаад харилцаа, олон улс, түүх, хүрээлэн байгаа орчны тухай судалгаа хийдэг. Энэ хамтарсан дадлага нь цар хүрээгээ тэлэн 2016 оноос Риккё их сургууль, 2017 оноос Чюоү Гакүин их сургууль оролцох болсон. Оюутнууд хүрээлэн байгаа орчны тандалт ажиглалт хийж, Туул голын эрэг орчмын дагуу хог хаягдлыг түүж, байгаль орчинд ээлтэй сайн дурын ажлыг хамтдаа хийдэг нь дадлагыг улам илүү ач холбогдолтой болгодог.',
      },
    ],
    japanPartnersTitle: 'ХАМТРАГЧ ЯПОН СУРГУУЛИУДЫН ТАНИЛЦУУЛГА',
    japanPartnersSubtitle:
      '{count} их, дээд сургууль. Карт дээр дарж дэлгэрэнгүй танилцуулга, мэргэжил, тэтгэлгийн нөхцөлийг харна уу.',
    highSchoolsTitle: 'ХАМТРАГЧ ЯПОН АХЛАХ СУРГУУЛИУД',
    highSchoolsSubtitle:
      'НЕБ-ын Соёл Эрдэм сургуулийн сурагчдад нээлттэй хамтрагч сургуулиуд.',
    domesticTitle: 'ДОТООД ХАМТЫН АЖИЛЛАГААТАЙ БАЙГУУЛЛАГУУД',
    domesticSubtitle: 'Монгол улсад үйл ажиллагаа явуулдаг хамтрагч байгууллагууд.',
    otherPartnersTitle: 'БУСАД ХАМТРАГЧ БАЙГУУЛЛАГУУД',
    otherPartnersSubtitle:
      'Гэрээт хамтрагч их, дээд сургууль, мэргэжлийн сургууль, холбоод.',
    expand: 'Дэлгэрэнгүй',
    collapse: 'Хаах',
    jointActivities: 'Хамтарсан арга хэмжээ',
    japanPartners: [
      {
        name: 'Сэйжо их сургууль',
        headline: '50% хөнгөлөлт (их сургууль)',
        location: 'Япон, Аичи муж',
        partnerSince: '2005 оны 9 сар',
        detail:
          'Япон улсын Аичи мужид байрладаг. Эдийн засгийн факультетдаа гадаадын улс орнуудаас оюутан элсүүлдэг. Тус сургуульд СЭДС-ийн бакалаврын хөтөлбөрийн оюутан их сургуульд 50%, япон хэлний сургуульд 10–20% хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Такүшёкү их сургууль',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Токио (Бүнкёо, Хачико)',
        partnerSince: '2006 оны 1 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Олон улсын харилцаа, Худалдаа, Улс төр, Эдийн засаг зэрэг мэргэжлээр 10–20% хөнгөлөлттэй элсэн суралцах боломжтой.',
      },
      {
        name: 'Оберлин их сургууль',
        headline: '100% тэтгэлэг — 1 жил',
        location: 'Япон, Токио',
        partnerSince: '2009 он',
        detail:
          'Оюутан солилцооны хөтөлбөрийг өнөөг хүртэл амжилттай хэрэгжүүлж байна. Жил бүр СЭДС-ийн бакалаврын хөтөлбөрийн 2–4 оюутныг сонгон шалгаруулж, сургалтын төлбөрийн 100%-ийн хөнгөлөлттэй нэг жил хүртэл хугацаанд суралцуулдаг.',
      },
      {
        name: 'Гакко Хоүжин Охара Гакүэн',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон (бүх мужид салбартай)',
        partnerSince: '2010 он',
        detail:
          'Япон улсын бүх мужид салбартай "Оохара" Япон хэлний сургууль. СЭДС-ийн бакалаврын хөтөлбөрийн оюутан 10–20% хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Ёкохама Дезайн Гакүин',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Канагава муж (Ёкохама)',
        partnerSince: '2012 оны 11 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Visual Design, Хувцасны дизайн, Манга зурагт номны дизайн, Япон хэл чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Гакко Хоүжин Дэнпа Коүка их сургуулийн групп',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Айчи муж (Нагаоя)',
        partnerSince: '2013 оны 5 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Айчи Технологийн их сургууль (механик, цахилгаан, тээвэр), Нагоя технологийн мэргэжлийн сургууль (компьютер, IT, CAD, тоглоом), Токай үйлдвэрлэл-урлалын сургууль (барилгын инженер, интерьер), Айчи бизнесийн мэргэжлийн сургууль, Айчи загвар дизайны сургууль, Айчи нийгмийн халамж эмнэлгийн сургууль, Нагоя гадаад хэл-зочид буудлын сургууль, Айчи мэдээллийн системийн сургууль зэрэг 8 сургуульд 10–20% хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Нийгата Сангёо их сургууль',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Нийгата муж (Кашивазаки)',
        partnerSince: '2014 оны 4 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Эдийн засаг, Байгууллагын менежмент, Санхүүгийн чиглэлээр 10–20% хөнгөлөлттэй элсэн суралцах боломжтой.',
      },
      {
        name: 'Гакко Хоүжин Норт Азиа их сургууль',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Акита муж (Акита)',
        partnerSince: '2015 оны 6 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Эдийн засаг, Олон улсын харилцааны чиглэлээр 10–20%-ийн хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Чюүоү Гакүин их сургууль',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Чиба муж (Абико)',
        partnerSince: '2015 оны 9 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Хүмүүнлэгийн ухаан, Бизнес удирдлагын чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Хоккай Гакүэн их сургууль',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Хоккайдо муж (Саппоро)',
        partnerSince: '2015 оны 9 сар',
        detail:
          'СЭДС-ийн бакалавр, магистрын хөтөлбөрийн оюутан Инженер, Эдийн засаг, Бизнесийн удирдлага, Хүмүүнлэгийн чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'ABK Гаккан Нихонго Гакко',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Токио (Бүнкёо)',
        partnerSince: '2016 оны 4 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан 10–20% хөнгөлөлттэй япон хэлний сургуульд суралцах боломжтой.',
      },
      {
        name: 'Нихон эм зүйн их сургууль',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Сайтама муж + Токио',
        partnerSince: '2017 оны 12 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан эм зүйн чиглэлээр 10–20% хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Хокүто Бүнка Гакүэн',
        headline: 'Хүртэл 50% хөнгөлөлт',
        location: 'Япон, Хоккайдо муж (Саппоро)',
        partnerSince: '2021 оны 5 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Нийгмийн халамжийн мэргэжлийн коллежид 10–20%, япон хэлний сургуульд 10–50% хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Токива их сургууль',
        headline: '100% тэтгэлэг — 6 сар–1 жил',
        location: 'Япон, Ибараки муж (Мито)',
        partnerSince: '2023 оны 2 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан 100% хөнгөлөлттэй 6 сараас 1 жилийн хугацаанд япон хэл болон Хүмүүнлэг, Бизнесийн удирдлага, Сувилахуйн чиглэлээр суралцах боломжтой.',
      },
      {
        name: 'Нихон Вэлнэс Спорт их сургууль',
        headline: '10–20% хөнгөлөлт',
        location: 'Япон, Токио',
        partnerSince: '2023 оны 4 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан Биеийн тамир, Эдийн засгийн чиглэлээр 10–20%-ийн хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Комазава охидын их сургууль',
        headline: '10–20% хөнгөлөлт (зөвхөн эмэгтэй)',
        location: 'Япон, Токио',
        partnerSince: '2024 оны 5 сар',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн эмэгтэй оюутан Хүмүүнлэг, Сэтгэл судлал, Аялал жуулчлал, Нийтийн эрүүл мэнд, Сувилахуй зэрэг мэргэжлээр 10–20% хөнгөлөлттэй суралцах боломжтой.',
      },
      {
        name: 'Иватани Хигаши Хоккайдо коллеж',
        headline: 'Хүртэл 50% хөнгөлөлт',
        location: 'Япон, Канагава муж (Ёкохама)',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан IT мэргэжлийн, Гоо зүйн мэргэжлийн коллеж, Япон хэлний сургуульд 10–50% хөнгөлөлттэй суралцах боломжтой. Зөвхөн Хоккайдо салбарын Япон хэлний сургуульд N3-аас дээш япон хэлний түвшинтэй сурвал 50% хөнгөлнө.',
      },
      {
        name: 'Нийгата эм зүйн их сургууль',
        headline: '50% хөнгөлөлт (их сургууль)',
        location: 'Япон, Нийгата муж (Нийгата)',
        detail:
          'СЭДС-ийн бакалаврын хөтөлбөрийн оюутан эм зүйн чиглэлээр их сургуульд 50%, япон хэлний сургуульд 10–20% хөнгөлөлттэй суралцах боломжтой.',
      },
    ],
    highSchools: [
      {
        name: 'Комазава ахлах сургууль',
        headline: '50% хөнгөлөлт (эмэгтэй сурагч)',
        location: 'Япон, Токио (Инаги дүүрэг)',
        partnerSince: '2025 оны 5 сар',
        detail:
          'Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн эмэгтэй сурагчдыг 50%-ийн хөнгөлөлттэй элсүүлэн суралцуулах боломжтой.',
      },
      {
        name: 'Нихон Вэлнэс ахлах сургууль',
        headline: '50% хөнгөлөлт',
        location: 'Япон, Мияги муж (Сэндай) + Нагано муж (Хигашичикума)',
        partnerSince: '2024 оны 5 сар',
        detail:
          'Спортын чиглэлтэй ахлах сургууль. Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн сурагчдыг 50%-ийн хөнгөлөлттэй элсүүлэн суралцуулах боломжтой.',
      },
    ],
    domestic: [
      {
        name: 'Монгол Улс дахь Япон Улсын Элчин сайдын яам',
        detail:
          'Соёл Эрдэм Дээд Сургууль нь Японы Элчин сайдын яамтай хамтран Японы хэл, соёл, боловсролыг таниулсан олон арга хэмжээнд оюутнууд, багш нараа идэвхтэй оролцуулсаар ирсэн.',
        activities: [
          '"Япон киноны өдөрлөг"',
          '"Японд суралцах талаар танилцуулах сургалт"',
        ],
      },
      {
        name: 'Монгол-Японы Хүний Нөөцийн Хөгжлийн Төв',
        detail:
          'Сургууль анх байгуулагдсан цагаасаа эхлэн "Монгол-Япон төв"-тэй нягт хамтран ажиллаж ирсэн. Тус төвөөс зохион байгуулдаг Японы соёл, боловсролын олон арга хэмжээ, сургалтад багш, оюутнууд тогтмол идэвхтэй оролцдог.',
        activities: [
          '"Япон хэлний түвшин тогтоох жишиг шалгалт"',
          '"Японы их дээд сургуулиудыг танилцуулах мэдээллийн ярмаг"',
          '"Япон хэлний багш нарын заах аргын сургалт"',
          '"Японы соёлыг танилцуулах баяр"',
          '"Нээлттэй семинар"',
        ],
      },
      {
        name: 'Монголын Япон Хэлний Багш нарын Холбоо',
        detail:
          'Тус холбооноос зохион байгуулдаг багшийн хөгжлийг дэмжсэн арга хэмжээнд багш нараа тогтмол хамруулан хамтран ажиллаж байна.',
        activities: [
          'Жилд 2 удаа зохион байгуулагддаг "Япон хэлний түвшин тогтоох шалгалт — JLPT"-ийн зохион байгуулалт',
          '"Япон хэлний боловсролын симпозиум"',
        ],
      },
    ],
    otherPartners: [
      { name: 'Кайнан их сургууль', location: 'Япон', type: 'Их сургууль' },
      { name: 'Хакүхо Жёши Танки их сургууль', location: 'Япон', type: 'Их сургууль' },
      { name: 'Токёо Бүнгакүин', location: 'Япон, Токио', type: 'Сургууль' },
      { name: 'Тоүкай Гакүин Бүнка Кёоёо мэргэжлийн сургууль', location: 'Япон', type: 'Мэргэжлийн сургууль' },
      { name: 'Нихонго Кокүсай Гакүин', location: 'Япон', type: 'Япон хэлний сургууль' },
      { name: 'Хассан II Касабланкагийн их сургууль', location: 'Морокко, Касабланка', type: 'Их сургууль' },
      { name: 'Чанаккале Онсекиз Мартын их сургууль', location: 'Турк, Чанаккале', type: 'Их сургууль' },
      { name: 'Нихон Вэлнэс Хоикү мэргэжлийн сургууль', location: 'Япон', type: 'Мэргэжлийн сургууль' },
      { name: 'Кёорицү олон улсын солилцооны байгууллага', location: 'Япон', type: 'Байгууллага' },
      { name: 'Олон улсын оюутныг дэмжих байгууллага', location: 'Япон', type: 'Байгууллага' },
      { name: 'Нихон спортын шинжлэх ухааны их сургууль', location: 'Япон', type: 'Их сургууль' },
      { name: 'Кёорицү Япон хэлний академи', location: 'Япон', type: 'Япон хэлний сургууль' },
      { name: 'Японы хувийн их дээд сургуулиудын холбоо', location: 'Япон', type: 'Холбоо' },
      { name: 'Фүкүока Мал Эмнэлэгийн мэргэжлийн сургууль', location: 'Япон, Фүкүока', type: 'Мэргэжлийн сургууль' },
      { name: 'Риккё их сургууль', location: 'Япон, Токио', type: 'Их сургууль' },
      { name: 'Ниппон академи', location: 'Япон', type: 'Академи' },
    ],
  },
  EN: {
    heroTitle: 'INTERNATIONAL & DOMESTIC PARTNERSHIPS',
    heroSubtitle:
      'A network of 30+ Japanese universities, vocational colleges and international organisations.',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'Partnerships',
    intro:
      'Since its founding, Soyol Erdem University has prioritised international engagement. We develop academic and research cooperation with Japanese universities, private companies and international organisations, and we run regular student and faculty exchange programmes.',
    blocks: [
      {
        heading: 'Student exchange programme',
        body: 'Under our partnership network, our student exchange programme lets students study at Japanese universities on 50–100% scholarship. To date more than 100 students have taken part. From the 2024–2025 academic year, our Software Engineering programme will run a 2+2 pathway with Nihon Wellness Sports University in Japan, opening a new study route for our students.',
      },
      {
        heading: 'Internship — paid placement (since 2014)',
        body: 'Soyol Erdem was the first university in Mongolia to launch a paid Internship programme, starting in 2014. Students live and work in Japan for between 3 months and 1 year — typically at hot-spring resorts or hotels — and gain hands-on exposure to Japanese history, culture and daily life. Participants earn 160,000 yen per month (around 2.5M MNT).',
      },
      {
        heading: 'Joint environmental fieldwork',
        body: 'Since 2006 we have organised an annual joint environmental fieldwork programme with J.F. Oberlin University in Japan. Students from both countries exchange knowledge and research culture, international relations, history and the environment together. The programme expanded to include Rikkyo University from 2016 and Chuo Gakuin University from 2017. Students monitor the environment, clean up the banks of the Tuul River and join other eco-volunteering activities side by side — which gives the fieldwork its real meaning.',
      },
    ],
    japanPartnersTitle: 'JAPANESE PARTNER UNIVERSITIES',
    japanPartnersSubtitle:
      '{count} universities and colleges. Tap a card for the full profile, available majors and scholarship terms.',
    highSchoolsTitle: 'JAPANESE PARTNER HIGH SCHOOLS',
    highSchoolsSubtitle:
      'Schools open to students of our affiliated Soyol Erdem Secondary School.',
    domesticTitle: 'DOMESTIC PARTNER ORGANISATIONS',
    domesticSubtitle: 'Partner organisations operating inside Mongolia.',
    otherPartnersTitle: 'OTHER PARTNER INSTITUTIONS',
    otherPartnersSubtitle:
      'Universities, vocational schools and associations with active cooperation agreements.',
    expand: 'Read more',
    collapse: 'Close',
    jointActivities: 'Joint activities',
    japanPartners: [
      {
        name: 'Seijoh University',
        headline: '50% discount (university)',
        location: 'Japan, Aichi',
        partnerSince: 'Sep 2005',
        detail:
          'Located in Aichi Prefecture. Its Faculty of Economics admits international students. Soyol Erdem bachelor\'s students can study at the university with a 50% discount and at the affiliated Japanese-language school with a 10–20% discount.',
      },
      {
        name: 'Takushoku University',
        headline: '10–20% discount',
        location: 'Japan, Tokyo (Bunkyo, Hachioji)',
        partnerSince: 'Jan 2006',
        detail:
          'Soyol Erdem bachelor\'s students can enrol with a 10–20% discount in majors such as International Relations, Commerce, Politics and Economics.',
      },
      {
        name: 'J.F. Oberlin University',
        headline: '100% scholarship — 1 year',
        location: 'Japan, Tokyo',
        partnerSince: '2009',
        detail:
          'Our most established student exchange programme. Each year 2–4 Soyol Erdem bachelor\'s students are selected to study for up to one year on a 100% tuition scholarship.',
      },
      {
        name: 'Ohara Gakuen Group',
        headline: '10–20% discount',
        location: 'Japan (branches in every prefecture)',
        partnerSince: '2010',
        detail:
          '"Ohara" Japanese-language schools, with branches in every prefecture of Japan. Soyol Erdem bachelor\'s students can study with a 10–20% discount.',
      },
      {
        name: 'Yokohama Design Gakuin',
        headline: '10–20% discount',
        location: 'Japan, Kanagawa (Yokohama)',
        partnerSince: 'Nov 2012',
        detail:
          'Soyol Erdem bachelor\'s students can study Visual Design, Fashion Design, Manga / Illustration Book Design and Japanese with a 10–20% discount.',
      },
      {
        name: 'Aichi University of Technology Group (Denpa Gakuen)',
        headline: '10–20% discount',
        location: 'Japan, Aichi (Nagoya)',
        partnerSince: 'May 2013',
        detail:
          'Soyol Erdem bachelor\'s students can study at eight schools with a 10–20% discount: Aichi University of Technology (mechanical, electrical, transport), Nagoya College of Information Technology (computer, IT, CAD, games), Tokai Manufacturing & Crafts (architecture, interior), Aichi Business College, Aichi Fashion Design, Aichi Welfare & Medical, Nagoya Foreign-Language & Hotel, and Aichi Information Systems.',
      },
      {
        name: 'Niigata Sangyo University',
        headline: '10–20% discount',
        location: 'Japan, Niigata (Kashiwazaki)',
        partnerSince: 'Apr 2014',
        detail:
          'Soyol Erdem bachelor\'s students can enrol with a 10–20% discount in Economics, Business Management and Finance.',
      },
      {
        name: 'North Asia University',
        headline: '10–20% discount',
        location: 'Japan, Akita (Akita)',
        partnerSince: 'Jun 2015',
        detail:
          'Soyol Erdem bachelor\'s students can study Economics and International Relations with a 10–20% discount.',
      },
      {
        name: 'Chuo Gakuin University',
        headline: '10–20% discount',
        location: 'Japan, Chiba (Abiko)',
        partnerSince: 'Sep 2015',
        detail:
          'Soyol Erdem bachelor\'s students can study Humanities and Business Administration with a 10–20% discount.',
      },
      {
        name: 'Hokkai-Gakuen University',
        headline: '10–20% discount',
        location: 'Japan, Hokkaido (Sapporo)',
        partnerSince: 'Sep 2015',
        detail:
          'Soyol Erdem bachelor\'s and master\'s students can study Engineering, Economics, Business Administration and Humanities with a 10–20% discount.',
      },
      {
        name: 'ABK College — Gakkan Japanese Language School',
        headline: '10–20% discount',
        location: 'Japan, Tokyo (Bunkyo)',
        partnerSince: 'Apr 2016',
        detail:
          'Soyol Erdem bachelor\'s students can study at the Japanese-language school with a 10–20% discount.',
      },
      {
        name: 'Nihon Pharmaceutical University',
        headline: '10–20% discount',
        location: 'Japan, Saitama + Tokyo',
        partnerSince: 'Dec 2017',
        detail:
          'Soyol Erdem bachelor\'s students can study Pharmaceutical Sciences with a 10–20% discount.',
      },
      {
        name: 'Hokuto Bunka Gakuen',
        headline: 'Up to 50% discount',
        location: 'Japan, Hokkaido (Sapporo)',
        partnerSince: 'May 2021',
        detail:
          'Soyol Erdem bachelor\'s students can study at the Social Welfare vocational college with a 10–20% discount and at the affiliated Japanese-language school with a 10–50% discount.',
      },
      {
        name: 'Tokiwa University',
        headline: '100% scholarship — 6mo–1yr',
        location: 'Japan, Ibaraki (Mito)',
        partnerSince: 'Feb 2023',
        detail:
          'Soyol Erdem bachelor\'s students can study Japanese, Humanities, Business Administration or Nursing for 6 months to 1 year on a 100% scholarship.',
      },
      {
        name: 'Nihon Wellness Sports University',
        headline: '10–20% discount',
        location: 'Japan, Tokyo',
        partnerSince: 'Apr 2023',
        detail:
          'Soyol Erdem bachelor\'s students can study Physical Education and Economics with a 10–20% discount.',
      },
      {
        name: "Komazawa Women's University",
        headline: '10–20% discount (women only)',
        location: 'Japan, Tokyo',
        partnerSince: 'May 2024',
        detail:
          'Female Soyol Erdem bachelor\'s students can study Humanities, Psychology, Tourism, Public Health and Nursing with a 10–20% discount.',
      },
      {
        name: 'Iwatani Higashi Hokkaido College',
        headline: 'Up to 50% discount',
        location: 'Japan, Kanagawa (Yokohama)',
        detail:
          'Soyol Erdem bachelor\'s students can study at the IT vocational college, the Beauty vocational college and the Japanese-language school with a 10–50% discount. Students who enrol at the Hokkaido-branch Japanese-language school with N3 or above receive a 50% discount.',
      },
      {
        name: 'Niigata University of Pharmacy and Medical Life Sciences',
        headline: '50% discount (university)',
        location: 'Japan, Niigata (Niigata)',
        detail:
          'Soyol Erdem bachelor\'s students can study Pharmaceutical Sciences at the university with a 50% discount and at the affiliated Japanese-language school with a 10–20% discount.',
      },
    ],
    highSchools: [
      {
        name: "Komazawa Gakuen Girls' Senior High School",
        headline: '50% discount (female students)',
        location: 'Japan, Tokyo (Inagi)',
        partnerSince: 'May 2025',
        detail:
          'Female students of our affiliated Soyol Erdem Secondary School can enrol on a 50% tuition discount.',
      },
      {
        name: 'Nihon Wellness High School',
        headline: '50% discount',
        location: 'Japan, Miyagi (Sendai) + Nagano (Higashichikuma)',
        partnerSince: 'May 2024',
        detail:
          'Sports-focused high school. Students of our affiliated Soyol Erdem Secondary School can enrol on a 50% tuition discount.',
      },
    ],
    domestic: [
      {
        name: 'Embassy of Japan in Mongolia',
        detail:
          'Soyol Erdem regularly involves its students and faculty in events organised by the Embassy of Japan to promote Japanese language, culture and education.',
        activities: [
          '"Japanese Film Days"',
          '"Information sessions on studying in Japan"',
        ],
      },
      {
        name: 'Mongolia–Japan Center for Human Resources Development',
        detail:
          'Since the school\'s founding we have worked closely with the "Mongol–Japan Center". Our faculty and students take part regularly in the many cultural and educational events the centre organises.',
        activities: [
          '"JLPT mock examinations"',
          '"Japanese university information fair"',
          '"Teaching methodology training for Japanese-language teachers"',
          '"Japanese culture festival"',
          '"Open seminars"',
        ],
      },
      {
        name: 'Mongolian Association of Teachers of Japanese',
        detail:
          'We collaborate with the Association by enrolling our teachers in the professional-development events it organises.',
        activities: [
          'Twice-yearly delivery of the official "JLPT" Japanese-language proficiency test',
          '"Japanese-language education symposium"',
        ],
      },
    ],
    otherPartners: [
      { name: 'Kainan University', location: 'Japan', type: 'University' },
      { name: 'Hakuho Joshi Junior College', location: 'Japan', type: 'University' },
      { name: 'Tokyo Bungakuin', location: 'Japan, Tokyo', type: 'School' },
      { name: 'Tokai Gakuin Bunka Kyoyo College', location: 'Japan', type: 'Vocational college' },
      { name: 'Nihongo Kokusai Gakuin', location: 'Japan', type: 'Japanese language school' },
      { name: 'Hassan II University of Casablanca', location: 'Morocco, Casablanca', type: 'University' },
      { name: 'Çanakkale Onsekiz Mart University', location: 'Türkiye, Çanakkale', type: 'University' },
      { name: 'Nihon Wellness Hoiku College', location: 'Japan', type: 'Vocational college' },
      { name: 'Kyoritsu International Exchange Foundation', location: 'Japan', type: 'Organisation' },
      { name: 'International Student Support Organisation', location: 'Japan', type: 'Organisation' },
      { name: 'Nippon Sport Science University', location: 'Japan', type: 'University' },
      { name: 'Kyoritsu Japanese Language Academy', location: 'Japan', type: 'Japanese language school' },
      { name: 'Japan Association of Private Universities & Colleges', location: 'Japan', type: 'Association' },
      { name: 'Fukuoka Veterinary College', location: 'Japan, Fukuoka', type: 'Vocational college' },
      { name: 'Rikkyo University', location: 'Japan, Tokyo', type: 'University' },
      { name: 'Nippon Academy', location: 'Japan', type: 'Academy' },
    ],
  },
  JP: {
    heroTitle: '国際・国内連携',
    heroSubtitle:
      '日本の30以上の大学・専門学校・国際機関とのネットワーク。',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: '連携',
    intro:
      'ソヨル・エルデム大学は創立以来、対外関係を重視してきました。日本の多くの大学・民間企業・国際機関と教育・研究面で協力し、学生・教員の交換プログラムも継続的に実施しています。',
    blocks: [
      {
        heading: '学生交換プログラム',
        body: '本学の国際連携の一環として実施している学生交換プログラムでは、学生が日本の大学に50〜100%の奨学金で留学することができます。これまでに100名以上が参加しました。2024〜2025年度からは、ソフトウェア工学専攻において日本ウェルネススポーツ大学との「2+2」プログラム協定を締結し、新たな進路が開かれています。',
      },
      {
        heading: 'インターンシップ ― 有給実習（2014年〜）',
        body: 'ソヨル・エルデムはモンゴルで初めて、有給インターンシッププログラムを2014年に開始しました。学生は3か月〜1年間、温泉施設やホテルなどで働きながら日本の歴史・文化・生活を体験できます。参加者は月160,000円（モンゴル通貨で約2,500,000トゥグルグ）の給与を得ています。',
      },
      {
        heading: '環境エコロジー共同実習',
        body: '2006年から毎年、日本の桜美林大学と共同で両国学生による環境エコロジー実習を実施してきました。両国の学生は文化・国際関係・歴史・環境について互いに学び合い、研究を行います。本プログラムは2016年から立教大学、2017年から中央学院大学も加わり、規模を拡大しています。学生はトゥール川沿岸でのモニタリングやゴミ拾いなど、環境ボランティア活動を共に行うことで、実習に一層の意義を持たせています。',
      },
    ],
    japanPartnersTitle: '日本の提携大学',
    japanPartnersSubtitle:
      '{count}校の大学・短大。カードをクリックすると詳細なプロフィール、専攻、奨学金条件をご覧いただけます。',
    highSchoolsTitle: '日本の提携高等学校',
    highSchoolsSubtitle:
      '本学附属ソヨル・エルデム高等学校の生徒が進学できる提携校。',
    domesticTitle: '国内の提携機関',
    domesticSubtitle: 'モンゴル国内で活動する提携機関。',
    otherPartnersTitle: 'その他の提携機関',
    otherPartnersSubtitle: '協定を結んでいる大学・専門学校・各種団体。',
    expand: '詳細',
    collapse: '閉じる',
    jointActivities: '共同事業',
    japanPartners: [
      {
        name: '星城大学',
        headline: '50%割引（大学）',
        location: '日本、愛知県',
        partnerSince: '2005年9月',
        detail:
          '愛知県に位置し、経済学部に外国人留学生を受け入れています。本学学部生は、大学で50%、附属日本語学校で10〜20%の学費割引を受けて留学することができます。',
      },
      {
        name: '拓殖大学',
        headline: '10〜20%割引',
        location: '日本、東京（文京・八王子）',
        partnerSince: '2006年1月',
        detail:
          '本学学部生は、国際関係、商学、政治学、経済学などの専攻に10〜20%の割引で進学できます。',
      },
      {
        name: '桜美林大学',
        headline: '100%奨学金 ― 1年',
        location: '日本、東京',
        partnerSince: '2009年',
        detail:
          '最も成熟した学生交換プログラム。毎年本学学部生から2〜4名を選抜し、最長1年間、学費100%の奨学金で留学させています。',
      },
      {
        name: '学校法人大原学園',
        headline: '10〜20%割引',
        location: '日本（全都道府県に校舎）',
        partnerSince: '2010年',
        detail:
          '日本各地に校舎を持つ「大原」日本語学校。本学学部生は10〜20%の割引で留学できます。',
      },
      {
        name: '横浜デザイン学院',
        headline: '10〜20%割引',
        location: '日本、神奈川県（横浜）',
        partnerSince: '2012年11月',
        detail:
          '本学学部生はビジュアルデザイン、ファッションデザイン、マンガ・絵本デザイン、日本語コースを10〜20%の割引で受講できます。',
      },
      {
        name: '学校法人電波学園 愛知工科大学グループ',
        headline: '10〜20%割引',
        location: '日本、愛知県（名古屋）',
        partnerSince: '2013年5月',
        detail:
          '本学学部生は、愛知工科大学（機械・電気・交通）、名古屋情報工科専門学校（コンピュータ・IT・CAD・ゲーム）、東海工芸専門学校（建築・インテリア）、愛知ビジネス専門学校、愛知ファッションデザイン専門学校、愛知福祉医療専門学校、名古屋外語・ホテル専門学校、愛知情報システム専門学校の計8校に10〜20%の割引で進学できます。',
      },
      {
        name: '新潟産業大学',
        headline: '10〜20%割引',
        location: '日本、新潟県（柏崎）',
        partnerSince: '2014年4月',
        detail:
          '本学学部生は、経済学、経営学、ファイナンス分野に10〜20%の割引で進学できます。',
      },
      {
        name: '学校法人ノースアジア大学',
        headline: '10〜20%割引',
        location: '日本、秋田県（秋田）',
        partnerSince: '2015年6月',
        detail:
          '本学学部生は、経済学、国際関係分野に10〜20%の割引で進学できます。',
      },
      {
        name: '中央学院大学',
        headline: '10〜20%割引',
        location: '日本、千葉県（我孫子）',
        partnerSince: '2015年9月',
        detail:
          '本学学部生は、人文科学、経営学分野に10〜20%の割引で進学できます。',
      },
      {
        name: '学校法人北海学園大学',
        headline: '10〜20%割引',
        location: '日本、北海道（札幌）',
        partnerSince: '2015年9月',
        detail:
          '本学学部・修士課程の学生は、工学、経済学、経営学、人文科学分野に10〜20%の割引で進学できます。',
      },
      {
        name: '学校法人ABK学館',
        headline: '10〜20%割引',
        location: '日本、東京（文京）',
        partnerSince: '2016年4月',
        detail: '本学学部生は、日本語学校に10〜20%の割引で留学できます。',
      },
      {
        name: '日本薬科大学',
        headline: '10〜20%割引',
        location: '日本、埼玉県＋東京',
        partnerSince: '2017年12月',
        detail:
          '本学学部生は、薬学分野に10〜20%の割引で進学できます。',
      },
      {
        name: '学校法人北斗文化学園',
        headline: '最大50%割引',
        location: '日本、北海道（札幌）',
        partnerSince: '2021年5月',
        detail:
          '本学学部生は、社会福祉専門学校に10〜20%、附属日本語学校に10〜50%の割引で留学できます。',
      },
      {
        name: '常盤大学',
        headline: '100%奨学金 ― 6か月〜1年',
        location: '日本、茨城県（水戸）',
        partnerSince: '2023年2月',
        detail:
          '本学学部生は、日本語・人文科学・経営学・看護学の分野に100%奨学金で6か月〜1年間留学できます。',
      },
      {
        name: '日本ウェルネススポーツ大学',
        headline: '10〜20%割引',
        location: '日本、東京',
        partnerSince: '2023年4月',
        detail:
          '本学学部生は、体育学、経済学分野に10〜20%の割引で進学できます。',
      },
      {
        name: '駒沢女子大学',
        headline: '10〜20%割引（女子学生のみ）',
        location: '日本、東京',
        partnerSince: '2024年5月',
        detail:
          '本学の女子学部生は、人文科学、心理学、観光、公衆衛生、看護学分野に10〜20%の割引で進学できます。',
      },
      {
        name: '岩谷学園 東日本国際アカデミー',
        headline: '最大50%割引',
        location: '日本、神奈川県（横浜）',
        detail:
          '本学学部生は、IT専門学校、美容専門学校、日本語学校に10〜50%の割引で留学できます。北海道校の日本語学校でN3以上の方は50%割引が適用されます。',
      },
      {
        name: '新潟薬科大学',
        headline: '50%割引（大学）',
        location: '日本、新潟県（新潟）',
        detail:
          '本学学部生は、薬学分野で大学に50%、附属日本語学校に10〜20%の割引で進学できます。',
      },
    ],
    highSchools: [
      {
        name: '駒沢学園女子高等学校',
        headline: '50%割引（女子生徒）',
        location: '日本、東京（稲城）',
        partnerSince: '2025年5月',
        detail:
          '本学附属ソヨル・エルデム高等学校の女子生徒は、50%の学費割引で進学できます。',
      },
      {
        name: '日本ウエルネス高等学校',
        headline: '50%割引',
        location: '日本、宮城県（仙台）＋長野県（東筑摩）',
        partnerSince: '2024年5月',
        detail:
          'スポーツ系の高等学校。本学附属ソヨル・エルデム高等学校の生徒は、50%の学費割引で進学できます。',
      },
    ],
    domestic: [
      {
        name: '在モンゴル日本国大使館',
        detail:
          'ソヨル・エルデム大学は日本国大使館と協力し、日本語・文化・教育を紹介する数多くの行事に学生・教員を積極的に参加させてきました。',
        activities: [
          '「日本映画祭」',
          '「日本留学説明会」',
        ],
      },
      {
        name: 'モンゴル日本人材開発センター',
        detail:
          '創立当初から「モンゴル・日本センター」と緊密に連携しています。同センターが主催する日本文化・教育関連の多彩なイベントや研修に、本学教員・学生は常時参加しています。',
        activities: [
          '「日本語能力試験 模擬試験」',
          '「日本の大学情報フェア」',
          '「日本語教師の指導法研修」',
          '「日本文化紹介祭」',
          '「公開セミナー」',
        ],
      },
      {
        name: 'モンゴル日本語教師会',
        detail:
          '本学は同会の教師向け研修事業に教員を継続的に派遣し、連携を進めています。',
        activities: [
          '年2回開催の「JLPT 日本語能力試験」運営',
          '「日本語教育シンポジウム」',
        ],
      },
    ],
    otherPartners: [
      { name: '開南大学', location: '日本', type: '大学' },
      { name: '白鳳女子短期大学', location: '日本', type: '大学' },
      { name: '東京文学院', location: '日本、東京', type: '学校' },
      { name: '東海学院文化教養専門学校', location: '日本', type: '専門学校' },
      { name: '日本語国際学院', location: '日本', type: '日本語学校' },
      { name: 'ハッサン2世カサブランカ大学', location: 'モロッコ、カサブランカ', type: '大学' },
      { name: 'チャナッカレ・オンセキズ・マルト大学', location: 'トルコ、チャナッカレ', type: '大学' },
      { name: '日本ウェルネス保育専門学校', location: '日本', type: '専門学校' },
      { name: '共立国際交流奨学財団', location: '日本', type: '団体' },
      { name: '国際学生支援機構', location: '日本', type: '団体' },
      { name: '日本体育大学', location: '日本', type: '大学' },
      { name: '共立日本語学院', location: '日本', type: '日本語学校' },
      { name: '日本私立大学協会', location: '日本', type: '協会' },
      { name: '福岡ECO動物海洋専門学校', location: '日本、福岡', type: '専門学校' },
      { name: '立教大学', location: '日本、東京', type: '大学' },
      { name: 'ニッポンアカデミー', location: '日本', type: 'アカデミー' },
    ],
  },
};

/* ───────────────────── Student life page ─────────────────────────── */

/** Per-chapter localised text. The `id` mirrors STUDENT_LIFE_CHAPTERS
 *  in lib/content.ts so we can look up by id (not index) — this keeps
 *  the join robust to chapter re-ordering. */
interface LocalisedChapter {
  id: string;
  heading: string;
  lead: string;
  bullets?: string[];
  body?: string;
}

interface LocalisedTestimonial {
  quote: string;
  name: string;
  age: number;
  program: string;
}

interface StudentLifeBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbThis: string;
  intro: string;
  /** Sub-nav chip labels — same order as SUB_NAV in the page. */
  subNav: {
    bunkyosai: string;
    sport: string;
    'shiliin-bulag': string;
    dormitory: string;
    volunteer: string;
    research: string;
    scholarship: string;
    'student-council': string;
    graduates: string;
  };
  /** 12 chapters keyed by id. */
  chapters: LocalisedChapter[];
  /** Bunkyosai grade × act strip — 4 items. */
  bunkyosaiActs: { grade: string; act: string }[];
  annualHeading: string;
  testimonialHeading: string;
  testimonials: LocalisedTestimonial[];
}

export const STUDENT_LIFE_CONTENT: Record<Language, StudentLifeBundle> = {
  MN: {
    heroTitle: 'ОЮУТНЫ АМЬДРАЛ',
    heroSubtitle:
      'Бид бол гэр бүл — Соёл Эрдэмд хичээл бол зөвхөн зургаан жилийн нэг хэсэг.',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Оюутны амьдрал',
    intro:
      'Соёл Эрдэмд оюутан байх нь зөвхөн хичээл биш — энэ бол гэр бүл, найзууд, шинэ туршлага, амьдралын чухал үе юм. Бид клуб, спорт, соёлын арга хэмжээ, дадлага, дотуур байр, тэтгэлэг гээд бүх талаар дэмжлэг үзүүлдэг.',
    subNav: {
      bunkyosai: 'Бүнкёосай',
      sport: 'Спорт, аялал',
      'shiliin-bulag': 'Дадлага',
      dormitory: 'Дотуур байр',
      volunteer: 'Сайн үйлс',
      research: 'Эрдэм шинжилгээ',
      scholarship: 'Тэтгэлэг',
      'student-council': 'Оюутны зөвлөл',
      graduates: 'Төгсөгчид',
    },
    chapters: [
      {
        id: 'bunkyosai',
        heading: 'Япон хэл, соёлын баяр — Бүнкёосай',
        lead: 'Соёл Эрдэм Дээд Сургуулийн жил бүрийн уламжлалт Япон хэл, соёлын баяр "Бүнкёосай" урлагын наадам нь анх 1998 оноос эхэлж, өнөөг хүртэл 27 дахь удаагаа амжилттай зохион байгуулагдлаа. Япон хэл, соёлыг сурталчлахаас гадна оюутнууд япон хэлийг хэрхэн сурч мэдсэнээ тайлагнадаг урлагийн арга хэмжээ юм.',
        body:
          'Урлагын наадам нь оюутны япон хэлний чадварыг дээшлүүлэх, япон соёлыг таниулах, багаар ажиллах, харилцааны соёл, удирдан манлайлах зэрэг олон чадвар, дадлыг суулгадаг. Шүүхээр Япон улсаас хүндэт зочид, Монгол дахь Япон улсын Бүрэн эрхт элчин сайд, элчин сайдын яамны мэргэжилтэн, ЖАЙКА олон улсын байгууллага, Монгол-Япон төв зэрэг байгууллагын төлөөлөл хүрэлцэн ирдэг.',
      },
      {
        id: 'sport',
        heading: 'Спортын арга хэмжээ, явган аялал',
        lead: 'Жил бүр уламжлал болсон спортын арга хэмжээний хүрээнд Соёл Эрдэм Дээд Сургуулийн САГСАН БӨМБӨГИЙН АВАРГА ШАЛГАРУУЛАХ, ГАР БӨМБӨГИЙН тэмцээн, шатар-даамны тэмцээнийг тогтмол зохион байгуулдаг.',
        body:
          'Өдрийн хүнсээ базаасан оюутнууд үүргэвчээ үүрсээр сургуулийн өмнө цугларч, сургуулийнхаа уриа, тугаа мандуулсаар нэгдсэн командаар Улаанбаатар хотын дундуур Баянзүрх товчоо хүртэл 12 км явган аялдаг. Зам зуур мод тарих, орчноо цэвэрлэх буянт үйлсэд оюутан бүр хувь нэмрээ оруулдаг.',
      },
      {
        id: 'shiliin-bulag',
        heading: 'Дадлага — "Шилийн булаг" жуулчны бааз',
        lead: 'Соёл Эрдэм Дээд Сургууль нь дэргэдээ "Шилийн булаг" жуулчны баазтай. Бааз нь Улаанбаатар хотоос зүүн зүгт 62 км, Төв аймгийн Эрдэнэ сум дахь Баяндаваагийн аманд байрладаг. Нэг ээлжиндээ 80 хүн хүлээн авах гэр буудал, 150 хүний хүчин чадалтай ресторантай.',
        bullets: [
          'Жил бүрийн зун танилцах болон үйлдвэрлэлийн дадлагаа хийдэг',
          'Япон жуулчид амардаг тул хэлний практик дадлагын талбар',
          'Морь, тэмээ барих/унах, монгол гэр барих/буулгах, тараг, сүү боловсруулах ахуй соёл',
          'Өөрсдийн тарьсан хүнсний ногоогоор хоол бэлдэх, ногоо тариалах сонирхол',
        ],
        body:
          'СЭДС нь Япон улсын Оберлин их сургуультай хамтран оюутны хамтарсан дадлагыг жил бүр уламжлал болгон зохион байгуулсаар ирсэн. Хоёр орны оюутнууд харилцан мэдээллээ солилцон, соёл, гадаад харилцаа, түүх, хүрээлэн байгаа орчны судалгаа хийж, санал солилцдогоороо ач холбогдолтой.',
      },
      {
        id: 'hippo-family',
        heading: 'Хиппо Фамали Групп',
        lead: 'Японы Хиппо Фамили клубийн 300 гаруй хүн гэр бүлийн хамт сургуулийн "Шилийн булаг" бааз дээр ирж Монгол ахуй соёлтой танилцлаа. Мөн монгол айлд хонож, монголчуудын амьдралын хэв маяг, аж байдалтай танилцан мартагдашгүй мөчийг өнгөрүүлсэн.',
      },
      {
        id: 'dormitory',
        heading: 'Дотуур байр',
        lead: 'Хичээлийн I байрны 5 давхарт нийт 30 хүртэл хүн байрлах хүчин чадалтай, 8 өрөөтэй оюутны дотуур байр + 1 өрөөтэй зочны дотуур байртай. 2024–2025 оны хичээлийн жилээс гадаад, дотоодын суралцагч 10 оюутан, япон тэнхимийн гадаад багш байрлаж эхэлсэн.',
        bullets: [
          'Манай сургуульд элссэн оюутан бүрд дотуур байранд байрлах боломж олгодог',
          'Хүсэлт гаргасан оюутныг байрлуулах хүрэлцээтэй',
          'Хичээлийн бус цагт номын сан, компьютерын анги, интернэт нээлттэй',
          'Өрөө бүр дотроо жорлон, ус-уян шүршүүр, гал тогооны иж бүрэн тавилгатай',
          'Хөргөгч, ус буцалгагч, цахилгаан зуух, хоолны сав суулга',
          'Өрөө бүр угаалгын машинаар бүрэн хангагдсан',
        ],
      },
      {
        id: 'volunteer',
        heading: 'Сайн үйлсийн аян',
        lead: 'Соёл Эрдэм Дээд Сургуулийн эрдэмтэн багш, оюутан сурагчид нь нийгэмд эерэг нөлөөлөл түгээх, бусдад туслах сайн үйлсийн аяныг тогтмол зохион байгуулж байна.',
        bullets: [
          '2024 он — "Жавар сэнгэсэн хүйтнийг жаргалтай сэтгэлээр давцгаая" — нийслэлийн хууль сахиулах, хот тохижуулах, нийтийн тээврийн ажилтнуудад зориулсан өвлийн аян.',
          '2025 он — "Энх улирал ханхалсан ээлтэй хавраа угтацгаая" — мал төллөж буй цаг үед малчдад нялх төлийн элгэвч, нэмнээ, төлийн уут өргөх хаврын аян (3-р сарын 4).',
        ],
      },
      {
        id: 'research',
        heading: 'Оюутны эрдэм шинжилгээ',
        lead: 'Эрдэм шинжилгээ, судалгааны төв нь оюутны эрдэм шинжилгээний хурлыг жил бүр зохион байгуулдаг бөгөөд сэтгүүлийг хэвлэн эрдэм шинжилгээний ажлын үнэлэмжийг дээшлүүлэх, бусад сургуулийн оюутнуудтай хамтын ажиллагааг өргөжүүлэх, хамтарсан судалгааны ажил бичих, оюутанд үзүүлэх үйлчилгээний чанарыг сайжруулах чиглэлээр үйл ажиллагаа явуулна.',
      },
      {
        id: 'scholarship',
        heading: 'Тэтгэлэг, урамшуулал',
        lead: 'СЭДС нь суралцагчдын амжилтыг урамшуулах тогтолцоотой. Захирлын 2020.04.22-ны 01/10 тоот тушаалын хавсралтаар оюутны сурах, хөгжих үйл ажиллагааг урамшуулах журам мөрдөгдөж байна.',
        bullets: [
          '3.6 болон түүнээс дээш голч дүнтэй I, II улирал бүрд захирлын нэрэмжит тэтгэлэг — голч дүнгээс хамаарч ₮100,000–₮150,000 хөнгөлөлт',
          'Тив, дэлхий, олон улсын тэмцээнд алт, мөнгө, хүрэл медалийн эзэд болсон оюутнуудыг урамшуулна',
          'Сургуулийн шилдэг оюутан, Монголын оюутны холбооны манлайлагч, хүүхэд залуучуудын тэргүүний залуу алтан медаль',
          'Япон улсын элчин сайдын яамны 1 жилийн 100% тэтгэлэгт хөтөлбөр (улсын хэмжээнд 10 оюутнаас 1–2 СЭДС-аас тогтмол шалгардаг)',
          'Үүсгэн байгуулагчийн тэтгэлэг — сурлага, идэвх санаачилгын үнэлгээгээр',
        ],
        body:
          '2020 оны Ази тивийн аварга шалгаруулах тэмцээнд Монгол улсаа төлөөлөн насанд хүрэгчдийн ангилалд өрсөлдөн мөнгөн медаль хүртсэн төгсөгч одоо Япон улсад суралцаж байна.',
      },
      {
        id: 'student-council',
        heading: 'Оюутны зөвлөл',
        lead: 'Соёл Эрдэм Дээд Сургуулийн оюутны байгууллага анх 2000 онд байгуулагдсан. Оюутны зөвлөл нь нийт оюутнуудыг төлөөлөн эрх ашгийг хамгаалж, сурлага, сахилга хариуцлага, ёс зүйг дээшлүүлэх арга хэмжээг багш, оюутнуудтай хамтран зохион байгуулдаг.',
        bullets: [
          'Танилцах үдэшлэг — шинээр элссэн оюутнуудтайгаа жил бүрийн 9–10 сард "Шилийн булаг" буюу Богд уулын баруун ширээт рүү явган аялал',
          'Эрдэм шинжилгээний хурал — намар эсвэл хавар',
          'Бүнкёосай Япон соёлын наадам — жил бүр 12 сард',
          'Шилдэг оюутан шалгаруулах + шинэ жилийн баяр (12-р сарын 10–25)',
          'Намрын аварга шалгаруулах сагсан бөмбөг, шатар-даамны тэмцээн',
          'Орчуулгын болон IT өөрөө удирдах клубууд',
        ],
      },
      {
        id: 'graduates',
        heading: 'Төгсөгчид',
        lead: 'Манай сургуулийн төгсөгчид зөв монгол хүн, япон хүн мэт ёс суртахуун, соёлын өндөр мэдрэмжтэй нийгмийн гишүүнээр төлөвшиж, олон тэргүүлэгч байгууллагад манлайлан ажиллаж байна.',
        bullets: [
          'Монгол улс дахь Япон улсын элчин сайдын яам',
          'Япон улсын Нарита нисэх онгоцны буудал',
          'Монгол-Японы хүний нөөцийн хөгжлийн төв',
          'Японы хөрөнгө оруулалттай компаниуд',
          'ЖАЙКА олон улсын байгууллага',
          'Урлаг, спортын салбарт эх орондоо болон Япон улсад манлайлж байгаа төгсөгчид',
        ],
        body:
          'Гадаад харилцаа тогтвортой өргөжсөнтэй холбоотойгоор нийт төгсөгчдийн 40 орчим хувь нь Япон улсад дадлага хийж, суралцаж, ажиллаж ирсэн. Сургууль байгуулагдсан цагаас хойш давхардсан тоогоор 1500 гаруй оюутныг Япон улсад суралцуулж, дадлагажуулж ажиллуулахаар илгээсэн.',
      },
      {
        id: 'japan-dance',
        heading: 'Япон бүжгийн парад',
        lead: 'Соёл Эрдэм Дээд Сургууль нь Күмамото мужийн Япон-Монголын найрамдлын нийгэмлэгтэй хамтран Япон бүжгийн парадыг Сүхбаатарын талбайд зохион байгууллаа. Японы үндэсний бүжгийн соёлыг Монголчуудад танилцуулах зорилгоор "Үтэмун Соүдори" бүжгийг СЭДС-ийн оюутнууд оролцон үзүүллээ.',
      },
      {
        id: 'rural-program',
        heading: 'Албан бус сургалт — 30 жилийн ой',
        lead: '1993 оноос 2004 он хүртэл Төв аймгийн бүх суманд 11 жил, Говь-Алтай аймгийн Тонхил, Дарви, Шарга 3 суманд 3 жил, Дорнод аймгийн Цагаан-Овоо, Баян-Уул, Хөлөнбүйр 3 суманд 3 жил орон нутгийн сургуулиас зайдуу малчин айлын хүүхдүүдэд "Амьдрах ухаан"-ы эчнээ хэлбэрээр Албан бус сургалтыг буцалтгүй тусламжаар хэрэгжүүлсэн нь СЭДС-ийн нийгэмд оруулсан хувь нэмрийн томоохон төсөл болсон 30 жилийн ойтой.',
      },
    ],
    bunkyosaiActs: [
      { grade: '1-р анги', act: 'Япон хэл дээр найрал дуу болон хамтлаг дуу дуулна.' },
      { grade: '2-р анги', act: 'Япон хэл дээр жүжигчилсэн тоглолт хийнэ.' },
      { grade: '3-р анги', act: 'Япон хэл дээр өөрийн сонгосон сэдвээр илтгэл тавина.' },
      { grade: '4-р анги', act: 'Япон хэл дээр шүлэг уншина.' },
    ],
    annualHeading: 'ЖИЛ БҮРИЙН ОНЦЛОХ АРГА ХЭМЖЭЭ',
    testimonialHeading: 'ОЮУТНУУДЫН ҮГ',
    testimonials: [
      {
        quote:
          'Энэ жил Соёл Эрдэмд элсэн орсон. Ирэх жил Япон явахаар явах болсондоо маш баяртай байна. Багш нарын заах арга, харилцааны соёл үнэхээр сайхан.',
        name: 'Далантай',
        age: 21,
        program: 'Япон хэлний орчуулагч анги',
      },
      {
        quote:
          'Интерншип хөтөлбөрөөр Япон явж дадлага хийсэн нь миний амьдралын хамгийн чухал туршлага байсан. Цалинтай дадлага хийж, япон соёл, ёс заншилтай танилцах боломж гайхалтай.',
        name: 'Гэрэлт-Од',
        age: 23,
        program: 'Аялал жуулчлалын менежмент',
      },
      {
        quote:
          'Соёл Эрдэмд суралцсан 4 жил миний амьдралд эргэлт хийсэн. Одоо Япон корпорацид программистаар ажиллаж байна. Бид төгсөгчид болон одоогийн оюутнууд бол нэг гэр бүл.',
        name: 'Наймангал',
        age: 26,
        program: 'Программ хангамж — төгсөгч',
      },
    ],
  },
  EN: {
    heroTitle: 'STUDENT LIFE',
    heroSubtitle:
      'We are family — at Soyol Erdem, class is only one piece of your six-year journey.',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'Student life',
    intro:
      'Being a student at Soyol Erdem is more than coursework — it is family, friends, new experiences and a defining chapter of your life. We support our students through clubs, sports, cultural events, internships, dormitory life and scholarships.',
    subNav: {
      bunkyosai: 'Bunkyosai',
      sport: 'Sports & trips',
      'shiliin-bulag': 'Internship',
      dormitory: 'Dormitory',
      volunteer: 'Volunteering',
      research: 'Research',
      scholarship: 'Scholarships',
      'student-council': 'Student council',
      graduates: 'Graduates',
    },
    chapters: [
      {
        id: 'bunkyosai',
        heading: 'Japanese language & culture festival — Bunkyosai',
        lead: 'Soyol Erdem University\'s annual Japanese language and culture festival "Bunkyosai" was first held in 1998 and has now been staged 27 times. Beyond promoting Japanese language and culture, the festival is the stage on which students report what they have learned.',
        body:
          'The festival lifts students\' Japanese-language ability and showcases Japanese culture while building team-work, communication and leadership skills. Distinguished guests typically include the Ambassador Extraordinary and Plenipotentiary of Japan to Mongolia, embassy specialists, representatives from JICA and from the Mongolia–Japan Center.',
      },
      {
        id: 'sport',
        heading: 'Sports events & hikes',
        lead: 'Each year we hold our long-running sports events: the Soyol Erdem basketball championship, the volleyball tournament and the chess / draughts competitions.',
        body:
          'Carrying their packed lunches in backpacks, students gather in front of the school, raise the school motto and flag, and hike together for 12 km across Ulaanbaatar to Bayanzurkh Tolgoi. Along the route they plant trees and help clean up the area as a small act of community service.',
      },
      {
        id: 'shiliin-bulag',
        heading: 'Internship — "Shiliin Bulag" tourist camp',
        lead: 'Soyol Erdem University runs its own "Shiliin Bulag" tourist camp. The site is 62 km east of Ulaanbaatar in Bayandavaa, Erdene sum of Tov Province. It can host 80 guests per shift in ger-style accommodation, with a restaurant for 150 diners.',
        bullets: [
          'Annual orientation and practical internships every summer',
          'A live language lab — Japanese tourists holiday here, so students practise daily',
          'Hands-on with horses and camels, putting up and taking down a ger, churning yogurt and milk',
          'Cooking from the camp\'s own vegetable garden — and learning to grow them',
        ],
        body:
          'Soyol Erdem holds an annual joint internship with J.F. Oberlin University. Students from both countries exchange views and study culture, international relations, history and the environment together — the value of the programme lies precisely in this back-and-forth.',
      },
      {
        id: 'hippo-family',
        heading: 'Hippo Family Club',
        lead: 'More than 300 members of the Japanese "Hippo Family Club" visited our "Shiliin Bulag" camp with their families to experience Mongolian life. They also stayed overnight with local Mongolian families and learned first-hand about how Mongolians live — an unforgettable experience.',
      },
      {
        id: 'dormitory',
        heading: 'Dormitory',
        lead: 'The 5th floor of our main building (Block I) houses an 8-room student dormitory for up to 30 residents, plus a 1-room guest dormitory. From the 2024–2025 academic year, 10 international and domestic students and a visiting Japanese-language faculty member have moved in.',
        bullets: [
          'Every admitted student is offered the option of dormitory housing',
          'Capacity is sufficient for all incoming requests',
          'Library, computer lab and Wi-Fi open outside class hours',
          'Each room has its own toilet, hot/cold shower and full kitchen',
          'Refrigerator, kettle, electric stove and cookware',
          'A washing machine in every room',
        ],
      },
      {
        id: 'volunteer',
        heading: 'Volunteer campaigns',
        lead: 'The faculty and students of Soyol Erdem regularly organise volunteer campaigns aimed at giving back to the community and helping those in need.',
        bullets: [
          '2024 — "Warming the bitter winter with a joyful heart" — a winter campaign supporting the capital\'s police, sanitation workers and public-transport staff.',
          '2025 — "Welcoming spring in a season of new life" — a spring campaign (4 March) delivering newborn-livestock blankets, pelts and birthing supplies to herders during the lambing season.',
        ],
      },
      {
        id: 'research',
        heading: 'Student research',
        lead: 'Our Research and Studies Centre organises the annual student research conference, publishes the proceedings, raises the standard of student research, extends cooperation with peers from other universities, supports joint research, and works continuously to improve the quality of services we offer to students.',
      },
      {
        id: 'scholarship',
        heading: 'Scholarships & awards',
        lead: 'Soyol Erdem maintains a structured system of merit rewards. Under Appendix 01/10 to the Rector\'s order of 22 April 2020, a formal regulation governs awards for student learning and development.',
        bullets: [
          'Rector\'s scholarship each I and II term for students with a GPA of 3.6 or higher — ₮100,000–₮150,000 depending on GPA',
          'Cash awards for students who win gold, silver or bronze at continental, world or international competitions',
          'School Best Student, leader of the Mongolian Student Union, "Outstanding Youth" gold medal',
          'Embassy of Japan 1-year 100% scholarship (1–2 of the 10 national recipients consistently come from Soyol Erdem)',
          'Founder\'s scholarship — based on academic performance and initiative',
        ],
        body:
          'A graduate who represented Mongolia in the adult category at the 2020 Asian Championships, taking silver, is now studying in Japan.',
      },
      {
        id: 'student-council',
        heading: 'Student council',
        lead: 'Soyol Erdem\'s student body was first organised in 2000. The Student Council represents all students, defends their interests, and works with faculty to deliver events that lift academic performance, discipline and ethics.',
        bullets: [
          'Orientation event — every September–October, an opening hike with new students to "Shiliin Bulag" or Bogd Khan Mountain\'s western Shireet',
          'Student research conference — in autumn or spring',
          'Bunkyosai Japanese-culture festival — every December',
          'Best-student awards + New Year celebration (10–25 December)',
          'Autumn basketball championship and chess / draughts tournament',
          'Self-run translation and IT student clubs',
        ],
      },
      {
        id: 'graduates',
        heading: 'Graduates',
        lead: 'Our graduates carry themselves with the ethics and cultural sensitivity of both a true Mongolian and a true Japanese citizen, and go on to lead in many of the country\'s top organisations.',
        bullets: [
          'Embassy of Japan in Mongolia',
          'Narita International Airport, Japan',
          'Mongolia–Japan Center for Human Resources Development',
          'Japanese-invested companies',
          'JICA',
          'Graduates leading in the arts and sports both at home and in Japan',
        ],
        body:
          'Thanks to our deep international ties, around 40% of all graduates have interned, studied or worked in Japan. Since the school\'s founding, more than 1,500 students (counting repeats) have been placed in Japan to study, intern or work.',
      },
      {
        id: 'japan-dance',
        heading: 'Japanese dance parade',
        lead: 'Together with the Kumamoto Japan-Mongolia Friendship Association, Soyol Erdem University staged a Japanese-dance parade at Sukhbaatar Square. Soyol Erdem students performed the "Otemo-yan Sodori" dance to introduce Japan\'s traditional dance culture to a Mongolian audience.',
      },
      {
        id: 'rural-program',
        heading: 'Non-formal education — 30th anniversary',
        lead: 'From 1993 to 2004, Soyol Erdem ran a grant-funded "Life Skills" non-formal correspondence programme: 11 years across every sum of Tov Province, 3 years in Tonkhil, Darvi and Sharga (Govi-Altai), and 3 years in Tsagaan-Ovoo, Bayan-Uul and Khulunbuir (Dornod) — reaching children from herder families living far from local schools. The 30th anniversary of this flagship community-impact project is now upon us.',
      },
    ],
    bunkyosaiActs: [
      { grade: 'Year 1', act: 'Chorus and group song in Japanese.' },
      { grade: 'Year 2', act: 'Dramatic stage performance in Japanese.' },
      { grade: 'Year 3', act: 'Public speech in Japanese on a topic of the student\'s choice.' },
      { grade: 'Year 4', act: 'Poetry recitation in Japanese.' },
    ],
    annualHeading: 'ANNUAL HIGHLIGHTS',
    testimonialHeading: 'STUDENT VOICES',
    testimonials: [
      {
        quote:
          'I enrolled at Soyol Erdem this year. I\'m thrilled that next year I\'ll be heading to Japan. The teaching style and the way our faculty communicate are wonderful.',
        name: 'Dalantai',
        age: 21,
        program: 'Japanese Translation programme',
      },
      {
        quote:
          'Going to Japan on the Internship programme was the most important experience of my life. A paid placement that lets you experience Japanese culture and customs is incredible.',
        name: 'Gerelt-Od',
        age: 23,
        program: 'Tourism Management',
      },
      {
        quote:
          'My four years at Soyol Erdem changed the course of my life. I now work as a software engineer at a Japanese corporation. Graduates and current students alike — we are one family.',
        name: 'Naimangal',
        age: 26,
        program: 'Software Engineering — alumnus',
      },
    ],
  },
  JP: {
    heroTitle: '学生生活',
    heroSubtitle:
      '私たちは家族 ― ソヨル・エルデムでは、授業は6年間の旅の一部に過ぎません。',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: '学生生活',
    intro:
      'ソヨル・エルデムでの学生生活は、授業だけにとどまりません。家族、友人、新しい体験、そして人生の重要な節目そのものです。クラブ、スポーツ、文化行事、インターンシップ、寮、奨学金まで、あらゆる面で学生を支援しています。',
    subNav: {
      bunkyosai: '文教祭',
      sport: 'スポーツ・遠足',
      'shiliin-bulag': 'インターン',
      dormitory: '学生寮',
      volunteer: 'ボランティア',
      research: '研究',
      scholarship: '奨学金',
      'student-council': '学生会',
      graduates: '卒業生',
    },
    chapters: [
      {
        id: 'bunkyosai',
        heading: '日本語・日本文化祭 ― 文教祭',
        lead: 'ソヨル・エルデム大学が毎年伝統的に開催する日本語・日本文化祭「文教祭」は1998年に始まり、これまで27回を数えます。日本語と日本文化を広めるだけでなく、学生が日本語学習の成果を発表する文化イベントでもあります。',
        body:
          '本祭は学生の日本語力の向上、日本文化の紹介、チームワーク、コミュニケーション、リーダーシップなど、多様な能力と態度を育てます。来賓として在モンゴル日本国特命全権大使、大使館専門家、JICA、モンゴル日本人材開発センターなどの代表が招かれます。',
      },
      {
        id: 'sport',
        heading: 'スポーツ行事・遠足',
        lead: '毎年恒例のスポーツ行事として、ソヨル・エルデム大学のバスケットボール選手権、バレーボール大会、チェス・チェッカー大会を定期的に開催しています。',
        body:
          '昼食を背負って学生たちは学校前に集まり、校訓と校旗を掲げて整然と隊列を組み、ウランバートル市街を抜けバヤンズルフ峠まで12kmを徒歩で歩きます。道中、植樹や周辺清掃などの社会貢献活動にも全員が参加します。',
      },
      {
        id: 'shiliin-bulag',
        heading: 'インターンシップ ― 「シリーン・ブラグ」観光キャンプ',
        lead: 'ソヨル・エルデム大学は付属の「シリーン・ブラグ」観光キャンプを運営しています。ウランバートルから東62kmのトゥブ県エルデネ・ソムにあるバヤンダワー渓谷に位置し、ゲル式の宿泊施設で1回あたり80名、150名収容のレストランも備えます。',
        bullets: [
          '毎年夏に新入生オリエンテーション・生産実習を実施',
          '日本人観光客が滞在するため、生きた日本語実習の場',
          '馬・ラクダの取り扱い、ゲルの組立・解体、ヨーグルト・牛乳の加工など遊牧文化体験',
          '自分たちで育てた野菜での調理、菜園作りの楽しみ',
        ],
        body:
          'ソヨル・エルデムは桜美林大学と毎年共同で学生実習を実施してきました。両国の学生が互いに情報を共有し、文化・国際関係・歴史・環境について研究・意見交換を行うことに意義があります。',
      },
      {
        id: 'hippo-family',
        heading: 'ヒッポ・ファミリークラブ',
        lead: '日本のヒッポ・ファミリークラブの300名以上のメンバーが家族とともに本学「シリーン・ブラグ」キャンプを訪問し、モンゴルの暮らし・文化に触れました。さらにモンゴルの一般家庭にホームステイし、モンゴル人の生活様式に親しむ忘れられない時間を過ごしました。',
      },
      {
        id: 'dormitory',
        heading: '学生寮',
        lead: '校舎I号館5階に、定員30名・8室の学生寮と1室のゲストルームを備えています。2024〜2025年度から、国内外の学生10名と日本語学科の外国人教員が入居を始めました。',
        bullets: [
          '本学に入学した学生全員に寮入居の機会を提供',
          '希望者全員を収容できる十分な定員',
          '授業外の時間は図書館、PC教室、Wi-Fiを開放',
          '各部屋にトイレ・温水冷水シャワー・キッチンの完備',
          '冷蔵庫、電気ケトル、電気コンロ、調理器具一式',
          '全室に洗濯機を設置',
        ],
      },
      {
        id: 'volunteer',
        heading: 'ボランティア活動',
        lead: 'ソヨル・エルデム大学の教員・学生は、社会に良い影響を与え、人を支えるボランティア活動を継続的に行っています。',
        bullets: [
          '2024年 ― 「凍てつく寒さも温かい心で乗り越えよう」 ― ウランバートル市の警察・清掃・公共交通職員を支援する冬のキャンペーン',
          '2025年 ― 「新しい命の春を歓迎しよう」 ― 出産期の遊牧民に新生児用毛布・産用布・産袋を届ける春のキャンペーン（3月4日）',
        ],
      },
      {
        id: 'research',
        heading: '学生研究',
        lead: '研究・調査センターは毎年学生研究大会を主催し、論文集を発行することで研究の質を高めるとともに、他大学の学生との連携拡大、共同研究の支援、学生サービスの質向上に取り組んでいます。',
      },
      {
        id: 'scholarship',
        heading: '奨学金・表彰',
        lead: 'ソヨル・エルデムには学生の成果を称える体系的な仕組みがあります。2020年4月22日付学長令01/10の附則により、学習・成長活動を奨励する規程が定められています。',
        bullets: [
          'GPA3.6以上の学生に対する学期ごとの学長奨学金 ― GPAに応じて10万〜15万トゥグルグの免除',
          '大陸・世界・国際大会で金・銀・銅メダルを獲得した学生への表彰',
          '学内最優秀学生、モンゴル学生連盟リーダー、青少年功労金メダル',
          '在モンゴル日本国大使館の1年100%奨学金（全国10名のうち1〜2名は本学から選出）',
          '創立者奨学金 ― 学業成績と自発性に応じて',
        ],
        body:
          '2020年のアジア選手権でモンゴルを代表し、成人部門で銀メダルを獲得した卒業生は、現在日本に留学しています。',
      },
      {
        id: 'student-council',
        heading: '学生会',
        lead: 'ソヨル・エルデムの学生組織は2000年に発足しました。学生会は全学生を代表してその利益を守り、学業・規律・倫理を高める行事を教員と協力して企画・運営しています。',
        bullets: [
          '新入生歓迎会 ― 毎年9〜10月に新入生と「シリーン・ブラグ」またはボグド・ハーン山西の「シレート」へ遠足',
          '学生研究大会 ― 秋または春に開催',
          '文教祭（日本文化祭） ― 毎年12月開催',
          '最優秀学生表彰＋年末祝賀会（12月10〜25日）',
          '秋季バスケットボール選手権、チェス・チェッカー大会',
          '翻訳・IT自主クラブ',
        ],
      },
      {
        id: 'graduates',
        heading: '卒業生',
        lead: '本学卒業生は、立派なモンゴル人としても日本人としても通用する高い倫理観と文化感覚を備えた社会人として成長し、多くの主要組織で指導的役割を果たしています。',
        bullets: [
          '在モンゴル日本国大使館',
          '日本の成田国際空港',
          'モンゴル日本人材開発センター',
          '日本資本系企業',
          'JICA国際協力機構',
          '芸術・スポーツ分野で母国・日本において活躍する卒業生',
        ],
        body:
          '対外関係の拡大に伴い、卒業生の約40%が日本で実習・留学・就業を経験しています。創立以来、延べ1,500名以上の学生を留学・実習・就業のため日本へ送り出してきました。',
      },
      {
        id: 'japan-dance',
        heading: '日本舞踊パレード',
        lead: 'ソヨル・エルデム大学は熊本県の日本モンゴル友好協会と共同で、スフバートル広場にて日本舞踊パレードを開催しました。日本の伝統舞踊文化をモンゴル人に紹介するため、「おてもやんそーだいり（オテモヤン・ソードリ）」をソヨル・エルデムの学生が披露しました。',
      },
      {
        id: 'rural-program',
        heading: '非公式教育 ― 30周年',
        lead: '1993年から2004年にかけて、トゥブ県全ソムで11年、ゴビ・アルタイ県のトンヒル・ダルヴィ・シャルガ3ソムで3年、ドルノド県のツァガーン＝オヴォー、バヤン＝オール、フルンブイル3ソムで3年にわたり、地方の学校から離れた遊牧民家庭の子供たちに対して、無償助成で「生活力」非公式通信教育プログラムを実施しました。本学による社会貢献の代表的事業として、30周年を迎えます。',
      },
    ],
    bunkyosaiActs: [
      { grade: '1年生', act: '日本語による合唱・グループ歌唱。' },
      { grade: '2年生', act: '日本語による演劇上演。' },
      { grade: '3年生', act: '日本語による自由テーマのスピーチ。' },
      { grade: '4年生', act: '日本語による詩の朗読。' },
    ],
    annualHeading: '年間ハイライト',
    testimonialHeading: '学生の声',
    testimonials: [
      {
        quote:
          '今年ソヨル・エルデムに入学しました。来年日本に行くことが決まり、とても嬉しいです。先生方の教え方やコミュニケーションの仕方が本当に素晴らしいです。',
        name: 'ダラントゥイ',
        age: 21,
        program: '日本語通訳コース',
      },
      {
        quote:
          'インターンシッププログラムで日本に行き実習したことは、私の人生で最も大切な経験でした。有給で実習しながら日本の文化や習慣に触れられる機会は素晴らしいです。',
        name: 'ゲレルト＝オド',
        age: 23,
        program: '観光経営',
      },
      {
        quote:
          'ソヨル・エルデムで学んだ4年間は私の人生の転機でした。今は日本企業でプログラマとして働いています。卒業生も在校生も、私たちは一つの家族です。',
        name: 'ナイマンガル',
        age: 26,
        program: 'ソフトウェア工学 ― 卒業生',
      },
    ],
  },
};

/* ───────────────────── Library page ──────────────────────────────── */

interface LibraryBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbThis: string;
  intro: string;
  categoriesTitle: string;
  servicesTitle: string;
  categories: string[];
  services: string[];
  holdings: { label: string; value: string }[];
}

export const LIBRARY_CONTENT: Record<Language, LibraryBundle> = {
  MN: {
    heroTitle: 'НОМЫН САН',
    heroSubtitle:
      'Япон, Монгол, Англи хэл дээрх 5,000+ нэр төрлийн ном, эрдэм шинжилгээний нийтлэлтэй.',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Номын сан',
    intro:
      'Соёл Эрдэм дээд сургуулийн номын сан нь япон, монгол, англи хэлээр 5000+ нэр төрлийн ном, сурах бичиг, эрдэм шинжилгээний нийтлэлтэй. Япон улсын элчин сайдын яамны хандивласан ном, сэтгүүлийн тусгай танхимтай.',
    categoriesTitle: 'НОМЫН АНГИЛАЛ',
    servicesTitle: 'ҮЙЛЧИЛГЭЭ',
    categories: [
      'Япон хэл, соёл, түүх',
      'Орчуулга судлал',
      'Олон улсын харилцаа',
      'Эдийн засаг, бизнес',
      'Аялал жуулчлал',
      'Сурах бичиг (JLPT N5-N1)',
      'Эрдэм шинжилгээний сэтгүүл',
      'Уран зохиол (япон, монгол)',
    ],
    services: [
      'Ном зээлэх (1 хүн 3 ном, 14 хоног)',
      'Уншлагын танхим (8:00-21:00)',
      'Цахим сан (онлайн ном, нийтлэл)',
      'Хэвлэх, хувилах үйлчилгээ',
      'Япон хэлний өөрөө суралцах булан',
    ],
    holdings: [
      { label: 'Цагийн хуваарь', value: '08:00 — 21:00' },
      { label: 'Уншлагын танхим', value: '120 суудалтай' },
      { label: 'Холдинг', value: '5,000+ ном' },
    ],
  },
  EN: {
    heroTitle: 'LIBRARY',
    heroSubtitle:
      'A collection of 5,000+ Japanese, Mongolian and English titles and academic publications.',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'Library',
    intro:
      'The Soyol Erdem University library holds 5,000+ Japanese, Mongolian and English titles — books, textbooks and academic publications — plus a dedicated room of books and journals donated by the Embassy of Japan.',
    categoriesTitle: 'COLLECTIONS',
    servicesTitle: 'SERVICES',
    categories: [
      'Japanese language, culture, history',
      'Translation studies',
      'International relations',
      'Economics & business',
      'Tourism',
      'Textbooks (JLPT N5–N1)',
      'Academic journals',
      'Literature (Japanese & Mongolian)',
    ],
    services: [
      'Book loans (3 books per person, 14 days)',
      'Reading room (08:00–21:00)',
      'Digital library (online books & articles)',
      'Printing & photocopying',
      'Self-study corner for Japanese',
    ],
    holdings: [
      { label: 'Opening hours', value: '08:00 — 21:00' },
      { label: 'Reading room', value: '120 seats' },
      { label: 'Holdings', value: '5,000+ books' },
    ],
  },
  JP: {
    heroTitle: '図書館',
    heroSubtitle:
      '日本語・モンゴル語・英語の5,000冊以上の蔵書と学術論文を所蔵。',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: '図書館',
    intro:
      'ソヨル・エルデム大学の図書館は、日本語・モンゴル語・英語の5,000冊以上の書籍・教科書・学術雑誌を所蔵し、在モンゴル日本国大使館から寄贈された書籍・雑誌の専用閲覧室も併設しています。',
    categoriesTitle: '蔵書カテゴリー',
    servicesTitle: 'サービス',
    categories: [
      '日本語・日本文化・日本史',
      '翻訳論',
      '国際関係',
      '経済・ビジネス',
      '観光',
      '教科書（JLPT N5–N1）',
      '学術雑誌',
      '文学（日本語・モンゴル語）',
    ],
    services: [
      '書籍貸出（1名3冊、14日間）',
      '閲覧室（8:00〜21:00）',
      'デジタルライブラリ（オンライン書籍・記事）',
      '印刷・コピーサービス',
      '日本語の自学自習コーナー',
    ],
    holdings: [
      { label: '開館時間', value: '08:00 — 21:00' },
      { label: '閲覧室', value: '120席' },
      { label: '蔵書', value: '5,000冊以上' },
    ],
  },
};

/* ───────────────────── Careers page ──────────────────────────────── */

interface CareersBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbThis: string;
  intro: string;
  openingsTitle: string;
  openingsSubtitle: string;
  openingsEmpty: string;
  applyCta: string;
  requirementsTitle: string;
  offersTitle: string;
  requirements: string[];
  offers: string[];
  ctaApply: string;
  ctaViewOpenings: string;
  ctaJoinUs: string;
  /** Localised override of the default opening titles — index-matched
   *  with CAREERS_DEFAULT_OPENINGS in lib/content.ts. */
  defaultOpenings: string[];
}

export const CAREERS_CONTENT: Record<Language, CareersBundle> = {
  MN: {
    heroTitle: 'НЭЭЛТТЭЙ АЖЛЫН БАЙР',
    heroSubtitle: 'Манай багт нэгдэх багш, мэргэжилтнүүдийг урьж байна.',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Нээлттэй ажлын байр',
    intro:
      'Соёл Эрдэм Дээд Сургууль нь сургалт, судалгаа, инновацад суурилсан чанартай боловсрол олгох зорилгоор мэргэжлийн багш, чадварлаг хүний нөөцийг бүрдүүлэн ажиллаж байна. Бид дараах чиглэлээр багш ажилд урьж байна.',
    openingsTitle: 'НЭЭЛТТЭЙ АЖЛЫН БАЙР',
    openingsSubtitle: 'Доорх албан тушаалуудаар анкет хүлээн авч байна.',
    openingsEmpty: 'Одоогоор нээлттэй ажлын байр байхгүй байна.',
    applyCta: 'Анкет бөглөх',
    requirementsTitle: 'Тавигдах нийтлэг шаардлага',
    offersTitle: 'Бид танд санал болгож байна',
    requirements: [
      'Тухайн мэргэжлээр бакалавр болон түүнээс дээш зэрэгтэй',
      'Багшлах, судалгаа хийх сонирхолтой',
      'Харилцааны соёлтой, багаар ажиллах чадвартай',
      'Их, дээд сургуульд багшилж байсан туршлагатай бол давуу тал болно',
      'Сургалтын шинэ арга зүй, дижитал хэрэглэгдэхүүн ашиглах чадвартай',
    ],
    offers: [
      'Тогтвортой ажлын байр',
      'Мэргэжлийн өсөлт, хөгжлийн боломж',
      'Найрсаг хамт олон',
      'Судалгаа, сургалтын орчин',
      'Уян хатан, бүтээлч ажиллах боломж',
    ],
    ctaApply: 'Анкет бөглөх',
    ctaViewOpenings: 'Нээлттэй ажлын байр харах',
    ctaJoinUs: 'Бидэнтэй нэгдэх',
    defaultOpenings: [
      'Япон хэлний багш',
      'Программ хангамжийн багш',
      'Аялал жуулчлалын багш',
      'Орон судлалын багш',
    ],
  },
  EN: {
    heroTitle: 'CAREERS',
    heroSubtitle: 'We are looking for talented faculty and staff to join our team.',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'Careers',
    intro:
      'Soyol Erdem University is building a faculty and a workforce dedicated to high-quality, research-driven and innovation-led education. We are hiring teaching staff for the positions below.',
    openingsTitle: 'OPEN POSITIONS',
    openingsSubtitle: 'We are accepting applications for the roles listed below.',
    openingsEmpty: 'No open positions at the moment.',
    applyCta: 'Apply',
    requirementsTitle: 'General requirements',
    offersTitle: 'What we offer',
    requirements: [
      'Bachelor\'s degree or higher in the relevant field',
      'Interest in teaching and research',
      'Strong communication skills and a collaborative mindset',
      'University-level teaching experience is a plus',
      'Comfort with modern teaching methods and digital tools',
    ],
    offers: [
      'A stable position',
      'Career growth and development opportunities',
      'A supportive community of colleagues',
      'A research-rich teaching environment',
      'Flexibility and room for creative work',
    ],
    ctaApply: 'Apply',
    ctaViewOpenings: 'View open positions',
    ctaJoinUs: 'Get in touch',
    defaultOpenings: [
      'Japanese-language instructor',
      'Software engineering instructor',
      'Tourism instructor',
      'Area studies instructor',
    ],
  },
  JP: {
    heroTitle: '採用情報',
    heroSubtitle: '私たちのチームに加わる教員・職員を募集しています。',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: '採用情報',
    intro:
      'ソヨル・エルデム大学は、教育・研究・イノベーションに基づく高品質な教育を提供するため、優れた教員と人材を集めています。下記の職種で教員を募集中です。',
    openingsTitle: '募集中のポジション',
    openingsSubtitle: '下記の職種で応募を受け付けています。',
    openingsEmpty: '現在募集中の職種はありません。',
    applyCta: '応募する',
    requirementsTitle: '応募条件',
    offersTitle: '当大学が提供するもの',
    requirements: [
      '当該分野の学士以上の学位',
      '教育・研究への関心',
      'コミュニケーション力とチームで働く力',
      '大学での教育経験があれば尚可',
      '新しい教育手法・デジタル教材を扱える力',
    ],
    offers: [
      '安定した職場',
      '専門職としての成長機会',
      '良好な同僚関係',
      '研究・教育に適した環境',
      '柔軟で創造的な働き方',
    ],
    ctaApply: '応募する',
    ctaViewOpenings: '募集職種を見る',
    ctaJoinUs: 'お問い合わせ',
    defaultOpenings: [
      '日本語教員',
      'ソフトウェア工学教員',
      '観光学教員',
      '地域研究教員',
    ],
  },
};

/* ───────────────────── Contact page ──────────────────────────────── */

interface ContactBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbThis: string;
  /** Left-column sub-heading. */
  reachUs: string;
  /** Inline labels for the contact details list. */
  addressLabel: string;
  phoneLabelMain: string;
  phoneLabelAdmission: string;
  emailLabel: string;
  hoursLabel: string;
  /** Localised values for the address + hours. Phone numbers / email
   *  stay literal so we keep CONTACT_INFO as the source of truth. */
  addressFull: string;
  weekdays: string;
  weekend: string;
  /** Right-column form card. */
  formTitle: string;
  formSubtitle: string;
  /** Form field labels + placeholders + buttons (used by ContactForm). */
  formNameLabel: string;
  formNamePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formSubjectLabel: string;
  formSubjectPlaceholder: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formSubmit: string;
  formError: string;
  formNetworkError: string;
  formSuccessTitle: string;
  formSuccessBody: string;
  formSuccessAgain: string;
  /** Subject options shown in the dropdown — must keep the same order
   *  as CONTACT_SUBJECTS in lib/content.ts (the value stored stays MN
   *  for back-end compatibility). */
  subjects: string[];
  /** Map iframe `title`. */
  mapTitle: string;
}

export const CONTACT_CONTENT: Record<Language, ContactBundle> = {
  MN: {
    heroTitle: 'ХОЛБОО БАРИХ',
    heroSubtitle: 'Бидэнтэй ямар ч асуудлаар чөлөөтэй холбогдоорой.',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Холбоо барих',
    reachUs: 'Бидэнтэй холбогдоорой',
    addressLabel: 'Хаяг',
    phoneLabelMain: 'Үндсэн',
    phoneLabelAdmission: 'Элсэлтийн алба',
    emailLabel: 'И-мэйл',
    hoursLabel: 'Цагийн хуваарь',
    addressFull:
      'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Олимпийн гудамж (Өмнөд Солонгосын ЭСЯ-ны хойно)',
    weekdays: 'Даваа-Баасан: 08:00-17:00',
    weekend: 'Бямба-Ням: Амарна',
    formTitle: 'Зурвас илгээх',
    formSubtitle: 'Бид ажлын 1-2 өдрийн дотор хариу барина.',
    formNameLabel: 'Бүтэн нэр *',
    formNamePlaceholder: 'Б.Бат-Эрдэнэ',
    formEmailLabel: 'И-мэйл *',
    formEmailPlaceholder: 'email@example.com',
    formPhoneLabel: 'Утас',
    formPhonePlaceholder: '9999-9999',
    formSubjectLabel: 'Сэдэв *',
    formSubjectPlaceholder: 'Сэдвээ сонгоно уу',
    formMessageLabel: 'Зурвас *',
    formMessagePlaceholder: 'Таны асуулт, санаа...',
    formSubmit: 'Илгээх',
    formError: 'Илгээхэд алдаа гарлаа. Дахин оролдоно уу.',
    formNetworkError: 'Сүлжээний алдаа.',
    formSuccessTitle: 'Таны зурвас амжилттай илгээгдлээ.',
    formSuccessBody: 'Бид ажлын 1-2 өдрийн дотор хариу барина.',
    formSuccessAgain: 'Дахин илгээх',
    subjects: [
      'Элсэлтийн талаар',
      'Сургалтын төлбөр',
      'Тэтгэлэг',
      'Хамтын ажиллагаа',
      'Бусад',
    ],
    mapTitle: 'Соёл Эрдэм газрын зураг',
  },
  EN: {
    heroTitle: 'CONTACT US',
    heroSubtitle: 'Reach out — we\'re happy to hear from you.',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'Contact',
    reachUs: 'Get in touch',
    addressLabel: 'Address',
    phoneLabelMain: 'Main',
    phoneLabelAdmission: 'Admissions office',
    emailLabel: 'Email',
    hoursLabel: 'Opening hours',
    addressFull:
      'Olympic Street, 1st Khoroo, Sukhbaatar District, Ulaanbaatar (behind the South Korean Embassy)',
    weekdays: 'Mon–Fri: 08:00–17:00',
    weekend: 'Sat–Sun: Closed',
    formTitle: 'Send a message',
    formSubtitle: 'We typically reply within 1–2 working days.',
    formNameLabel: 'Full name *',
    formNamePlaceholder: 'John Doe',
    formEmailLabel: 'Email *',
    formEmailPlaceholder: 'email@example.com',
    formPhoneLabel: 'Phone',
    formPhonePlaceholder: '+976 9999 9999',
    formSubjectLabel: 'Subject *',
    formSubjectPlaceholder: 'Choose a subject',
    formMessageLabel: 'Message *',
    formMessagePlaceholder: 'Your question or comment…',
    formSubmit: 'Send',
    formError: 'Something went wrong. Please try again.',
    formNetworkError: 'Network error.',
    formSuccessTitle: 'Your message has been sent.',
    formSuccessBody: 'We typically reply within 1–2 working days.',
    formSuccessAgain: 'Send another',
    subjects: [
      'Admissions',
      'Tuition',
      'Scholarships',
      'Partnerships',
      'Other',
    ],
    mapTitle: 'Soyol Erdem map',
  },
  JP: {
    heroTitle: 'お問い合わせ',
    heroSubtitle: 'どんなご質問でもお気軽にご連絡ください。',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: 'お問い合わせ',
    reachUs: 'お問い合わせ',
    addressLabel: '住所',
    phoneLabelMain: '代表',
    phoneLabelAdmission: '入試課',
    emailLabel: 'メール',
    hoursLabel: '受付時間',
    addressFull:
      'モンゴル国ウランバートル市スフバートル区第1ホロー、オリンピック通り（韓国大使館の裏手）',
    weekdays: '月〜金：08:00〜17:00',
    weekend: '土日：休業',
    formTitle: 'メッセージを送る',
    formSubtitle: '通常、1〜2営業日以内にご返信いたします。',
    formNameLabel: 'お名前 *',
    formNamePlaceholder: '山田 太郎',
    formEmailLabel: 'メール *',
    formEmailPlaceholder: 'email@example.com',
    formPhoneLabel: '電話番号',
    formPhonePlaceholder: '+976 9999 9999',
    formSubjectLabel: '件名 *',
    formSubjectPlaceholder: '件名を選択してください',
    formMessageLabel: 'メッセージ *',
    formMessagePlaceholder: 'ご質問やご意見をお書きください…',
    formSubmit: '送信',
    formError: '送信に失敗しました。もう一度お試しください。',
    formNetworkError: 'ネットワークエラー。',
    formSuccessTitle: 'メッセージを送信しました。',
    formSuccessBody: '通常、1〜2営業日以内にご返信いたします。',
    formSuccessAgain: '別のメッセージを送る',
    subjects: ['入学について', '学費', '奨学金', '連携・提携', 'その他'],
    mapTitle: 'ソヨル・エルデム 地図',
  },
};

/* ───────────────────── Regulations page ──────────────────────────── */

interface RegulationsBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbThis: string;
  empty: string;
  badge: string;
  startReading: string;
}

export const REGULATIONS_CONTENT: Record<Language, RegulationsBundle> = {
  MN: {
    heroTitle: 'ДҮРЭМ ЖУРАМ',
    heroSubtitle:
      'Соёл Эрдэм Дээд Сургуулийн бүх мөрдөгдөж буй журмыг нэг газар. Дугаар бүрийг номын хуудас эргүүлэн уншиж танилцана уу.',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Дүрэм журам',
    empty: 'Одоохондоо журам нийтлэгдээгүй байна.',
    badge: 'Журам',
    startReading: 'Уншиж эхлэх',
  },
  EN: {
    heroTitle: 'REGULATIONS',
    heroSubtitle:
      'All Soyol Erdem University regulations in one place. Each document opens as a flip-through book.',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'Regulations',
    empty: 'No regulations have been published yet.',
    badge: 'Regulation',
    startReading: 'Start reading',
  },
  JP: {
    heroTitle: '規則・規程',
    heroSubtitle:
      'ソヨル・エルデム大学の各種規則・規程をまとめています。各文書はページをめくる形式でご覧いただけます。',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: '規則・規程',
    empty: '現在公開中の規則はありません。',
    badge: '規程',
    startReading: '読み始める',
  },
};

/* ───────────────────── Newspapers (sonin hewlel) ──────────────────── */

interface SoninBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbThis: string;
}

export const SONIN_CONTENT: Record<Language, SoninBundle> = {
  MN: {
    heroTitle: 'СОНИН ХЭВЛЭЛ',
    heroSubtitle:
      'Сургуулийн тогтмол хэвлэлийн архив. Дугаар бүрийг номын хуудас эргүүлэн уншиж танилцана уу.',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Сонин хэвлэл',
  },
  EN: {
    heroTitle: 'SCHOOL NEWSPAPER',
    heroSubtitle:
      'The archive of our regular school newspaper. Each issue opens as a flip-through book.',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'Newspaper',
  },
  JP: {
    heroTitle: '広報誌',
    heroSubtitle:
      '本学発行の定期広報誌のアーカイブ。各号はページをめくる形式でご覧いただけます。',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: '広報誌',
  },
};

/* ───────────────────── High-school home page ─────────────────────── */

interface HsHomeBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbUniversity: string;
  breadcrumbThis: string;
  introBadge: string;
  introTitle: string;
  introBody: string;
  introBody2: string;
  overlayEyebrow: string;
  overlayTitle: string;
  overlaySubtitle: string;
  philosophyTitle: string;
  philosophy: { label: string; title: string; body: string }[];
  stats: { value: string; label: string }[];
  programsTitle: string;
  programsSubtitle: string;
  programs: { title: string; description: string }[];
  highlightsTitle: string;
  highlights: { title: string; body: string }[];
  newsTitle: string;
  newsViewAll: string;
  contactEyebrow: string;
  contactTitle: string;
  phoneLabel: string;
  emailLabel: string;
  admissionOpenLabel: string;
  admissionOpenValue: string;
  admissionInfoCta: string;
  otherQuestionsCta: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerCta: string;
  bannerSecondaryCta: string;
}

export const HS_HOME_CONTENT: Record<Language, HsHomeBundle> = {
  MN: {
    heroTitle: 'СОЁЛ ЭРДЭМ СУРГУУЛЬ',
    heroSubtitle:
      'Чанартай боловсрол, Япон хэл, соёл, IT-ийн чиглэлээр ирээдүйгээ эндээс эхлүүл.',
    breadcrumbUniversity: 'Дээд сургууль',
    breadcrumbThis: 'Ахлах сургууль',
    introBadge: 'Японы хөрөнгө оруулалттай · 2023 онд байгуулагдсан',
    introTitle: 'Хичээнгүй суралцагч,\nЧадварлаг багш, Япон хэл, соёл',
    introBody:
      'Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургууль нь 2023 оны 8-р сарын 30-нд Японы хөрөнгө оруулалттайгаар үүсгэн байгуулагдаж, 2023–2024 оны хичээлийн жилд 10–11 ангитай, нийт мэргэжлийн 11 багш, 2 япон хэлний багштайгаар үйл ажиллагаагаа эхэлсэн.',
    introBody2:
      'Манай сургууль нь эх сургууль болох Соёл Эрдэм Дээд Сургуулийн 30+ жилийн япон судлалын баялаг туршлагад тулгуурлан япон хэл, соёл болон мэдээллийн технологид төрөлжсөн ерөнхий боловсролын сургалт явуулдаг.',
    overlayEyebrow: 'Senior High School',
    overlayTitle: 'Соёл Эрдэм',
    overlaySubtitle: 'Япон-Монголын боловсролын гүүр',
    philosophyTitle: 'БИДНИЙ ЗАМ ЗОРИЛГО',
    philosophy: [
      {
        label: 'Алсын хараа',
        title: 'Тэргүүлэгч төрөлжсөн ЕБС',
        body: 'Япон хэл, соёл болон Мэдээллийн технологийн төрөлжсөн ахлах сургуулийн хувьд тэргүүлэгч ЕБС болох.',
      },
      {
        label: 'Эрхэм зорилго',
        title: 'Чадварлаг багш — Чанартай боловсрол',
        body: 'Хичээнгүй суралцагч, чадварлаг багш, Япон хэл соёлд тулгуурласан чанартай боловсрол.',
      },
      {
        label: 'Үнэт зүйл',
        title: 'С · Э · А · С',
        body: 'С – Соёл уламжлалаа дээдэлсэн · Э – Эрдэм мэдлэгийг эрхэмлэсэн · А – Амьдрах арга ухаанд суралцсан · С – Сурлагын хоцрогдолгүй суралцагч бэлтгэх.',
      },
    ],
    stats: [
      { value: '2023', label: 'Үүсгэн байгуулагдсан он' },
      { value: '100%', label: 'Мэргэжлийн багшийн бүрэлдэхүүн' },
      { value: '2+2', label: 'Япон-Монгол солилцоо' },
      { value: 'N5–N2', label: 'Япон хэлний түвшин' },
    ],
    programsTitle: 'ХӨТӨЛБӨРҮҮД',
    programsSubtitle:
      'Япон хэл, төрөлжсөн IT, бүрэн дунд боловсролын зэрэгцээ Япон руу солилцооны 2+2 хөтөлбөрөөр сурагчдыг бэлдэнэ.',
    programs: [
      {
        title: 'Япон хэл, соёл',
        description:
          'Эх хэлтэй багш нар JLPT-д тулгуурлан N5–N2 хүртэл түвшинд хүргэж, япон уламжлал, ёс заншил, соёлтой бүрэн танилцуулна.',
      },
      {
        title: 'Төрөлжсөн IT',
        description:
          'Алгоритм, хэл, веб болон AI-ийн үндсэн ойлголтыг сурагч төвтэй, оролцооны аргаар заана. AI-Digital-IT мэргэжлийн сургуультай 2+2 солилцоо.',
      },
      {
        title: 'Бүрэн дунд боловсрол',
        description:
          '10–11 ангийн ердийн хичээлийн хөтөлбөрийг шинжлэх ухаан, эрэгцүүлэхүйд тулгуурласан аргачлалаар сурагч төвтэй заана.',
      },
      {
        title: '2+2 Солилцооны хөтөлбөр',
        description:
          'AI-Digital-IT мэргэжлийн сургуультай хамтарсан 2+2 хөтөлбөрөөр оюутнууд бэлэн мэргэжилтэй болно.',
      },
    ],
    highlightsTitle: 'ОНЦЛОХ АРГА ХЭМЖЭЭ, АМЖИЛТ',
    highlights: [
      {
        title: 'Бүнкёосай — Соёлын наадам',
        body: 'Япон уламжлалт "Бүнкёосай" наадмыг 26 удаа дараалан амжилттай зохион байгуулсан.',
      },
      {
        title: '"Алтан бүргэд" медаль',
        body: 'Математикийн багш С. Боозоо "Алтан бүргэд" медалаар шагнагдсан.',
      },
      {
        title: 'Спортын аварга',
        body: 'Сагсан бөмбөг, гар бөмбөгийн аварга шалгаруулах тэмцээнд эзэн болж байсан.',
      },
      {
        title: 'Эмнэлэгийн дадлага',
        body: 'Бүс нутгийн эмнэлэгүүдтэй хамтран эрүүл мэндийн чиглэлээр дадлага хийдэг.',
      },
    ],
    newsTitle: 'СҮҮЛИЙН МЭДЭЭ',
    newsViewAll: 'Бүх мэдээг үзэх',
    contactEyebrow: 'Холбоо барих',
    contactTitle: 'Бидэнтэй холбоо барих',
    phoneLabel: 'Утас',
    emailLabel: 'И-мэйл',
    admissionOpenLabel: 'Элсэлт нээлттэй',
    admissionOpenValue: '10-р анги · 2025–2026 оны хичээлийн жил',
    admissionInfoCta: 'Элсэлтийн мэдээлэл',
    otherQuestionsCta: 'Бусад асуулт',
    bannerTitle: 'Соёл Эрдэм Ахлах Сургууль',
    bannerSubtitle:
      'Чанартай боловсрол, Япон хэл, соёл, IT-ийн чиглэлээр ирээдүйгээ эндээс эхлүүл.',
    bannerCta: 'Элсэлтийн мэдээлэл',
    bannerSecondaryCta: 'Холбоо барих',
  },
  EN: {
    heroTitle: 'HIGH SCHOOL',
    heroSubtitle:
      'Quality education in Japanese language, culture and IT — start your future here.',
    breadcrumbUniversity: 'University',
    breadcrumbThis: 'High school',
    introBadge: 'Japanese-funded · established 2023',
    introTitle: 'Diligent learners,\nskilled teachers, Japanese language & culture',
    introBody:
      'Soyol Erdem Senior High School was founded on 30 August 2023 with Japanese investment and opened its 2023–2024 academic year with grade 10 and 11 classes, 11 subject teachers and 2 Japanese-language teachers.',
    introBody2:
      'Building on the 30+ years of Japanese-studies expertise of our parent institution, Soyol Erdem University, our high-school programme specialises in Japanese language, culture and information technology while delivering the full national curriculum.',
    overlayEyebrow: 'Senior High School',
    overlayTitle: 'Soyol Erdem',
    overlaySubtitle: 'A Japan–Mongolia education bridge',
    philosophyTitle: 'OUR DIRECTION',
    philosophy: [
      {
        label: 'Vision',
        title: 'A leading specialised high school',
        body: 'To be the leading senior high school specialised in Japanese language, culture and IT.',
      },
      {
        label: 'Mission',
        title: 'Skilled teachers — quality education',
        body: 'Diligent learners and skilled teachers delivering quality education rooted in Japanese language and culture.',
      },
      {
        label: 'Values',
        title: 'S · E · A · S',
        body: 'S — Honouring our cultural heritage · E — Esteeming knowledge and learning · A — Apprenticing life skills · S — Studying without falling behind.',
      },
    ],
    stats: [
      { value: '2023', label: 'Year founded' },
      { value: '100%', label: 'Qualified faculty' },
      { value: '2+2', label: 'Japan–Mongolia exchange' },
      { value: 'N5–N2', label: 'Japanese proficiency' },
    ],
    programsTitle: 'PROGRAMMES',
    programsSubtitle:
      'Japanese language, specialised IT and the full national curriculum, plus a 2+2 exchange pathway to Japan.',
    programs: [
      {
        title: 'Japanese language & culture',
        description:
          'Native-speaker teachers guide students from JLPT N5 to N2 and fully introduce Japanese traditions, customs and culture.',
      },
      {
        title: 'Specialised IT',
        description:
          'Algorithms, programming languages, the web and the fundamentals of AI — taught with a student-centred, participatory approach. A 2+2 exchange with the AI-Digital-IT vocational school.',
      },
      {
        title: 'Full national curriculum',
        description:
          'Grades 10 and 11 cover the national curriculum, taught student-centred and grounded in scientific reasoning.',
      },
      {
        title: '2+2 exchange programme',
        description:
          'Through a 2+2 partnership with the AI-Digital-IT vocational school, students graduate with a ready-to-use professional skill set.',
      },
    ],
    highlightsTitle: 'EVENTS & ACHIEVEMENTS',
    highlights: [
      {
        title: 'Bunkyosai — culture festival',
        body: 'The traditional Japanese "Bunkyosai" festival has been staged successfully 26 years in a row.',
      },
      {
        title: '"Golden Eagle" medal',
        body: 'Mathematics teacher S. Boozoo was awarded the "Golden Eagle" medal.',
      },
      {
        title: 'Sports champions',
        body: 'Past winners of the basketball and volleyball championships.',
      },
      {
        title: 'Medical placements',
        body: 'Health-track placements organised in partnership with regional hospitals.',
      },
    ],
    newsTitle: 'LATEST NEWS',
    newsViewAll: 'View all news',
    contactEyebrow: 'Contact',
    contactTitle: 'Get in touch with us',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    admissionOpenLabel: 'Admissions open',
    admissionOpenValue: 'Grade 10 · 2025–2026 academic year',
    admissionInfoCta: 'Admission details',
    otherQuestionsCta: 'Other questions',
    bannerTitle: 'Soyol Erdem Senior High School',
    bannerSubtitle:
      'Quality education in Japanese language, culture and IT — start your future here.',
    bannerCta: 'Admission details',
    bannerSecondaryCta: 'Contact',
  },
  JP: {
    heroTitle: '高等学校',
    heroSubtitle:
      '日本語・日本文化・ITを軸とした質の高い教育で、未来をここから始めよう。',
    breadcrumbUniversity: '大学',
    breadcrumbThis: '高等学校',
    introBadge: '日本資本 ・ 2023年設立',
    introTitle: '勤勉な学習者と\n熟練の教員、日本語・日本文化',
    introBody:
      'ソヨル・エルデム高等学校は2023年8月30日、日本資本のもとに設立され、2023〜2024年度に10年・11年生クラスを開設、教科専任教員11名、日本語教員2名で活動を開始しました。',
    introBody2:
      '母体であるソヨル・エルデム大学が30年以上にわたり培ってきた日本研究の知見を基盤に、日本語・日本文化・情報技術に特化しつつ、国の正規カリキュラムを提供しています。',
    overlayEyebrow: 'Senior High School',
    overlayTitle: 'ソヨル・エルデム',
    overlaySubtitle: '日本とモンゴルを結ぶ教育の架け橋',
    philosophyTitle: '私たちの方向性',
    philosophy: [
      {
        label: 'ビジョン',
        title: '専門特化型のリーディング校',
        body: '日本語・日本文化・ITに特化した高等学校として、リーディング校となることを目指します。',
      },
      {
        label: 'ミッション',
        title: '熟練の教員 ― 質の高い教育',
        body: '勤勉な学習者と熟練の教員により、日本語・日本文化に根ざした質の高い教育を提供します。',
      },
      {
        label: '価値観',
        title: 'С・Э・А・С',
        body: 'С ― 文化的伝統を重んじる ・ Э ― 学問・知識を尊ぶ ・ А ― 生きる力を身につける ・ С ― 学業に遅れない学習者を育てる。',
      },
    ],
    stats: [
      { value: '2023', label: '設立年' },
      { value: '100%', label: '専門教員' },
      { value: '2+2', label: '日蒙交換' },
      { value: 'N5–N2', label: '日本語レベル' },
    ],
    programsTitle: 'プログラム',
    programsSubtitle:
      '日本語、専門IT、国の正規カリキュラムに加え、日本との2+2交換プログラムで生徒を育てます。',
    programs: [
      {
        title: '日本語・日本文化',
        description:
          'ネイティブ教員がJLPTに準拠してN5〜N2レベルまで指導し、日本の伝統・習慣・文化を包括的に紹介します。',
      },
      {
        title: '専門IT',
        description:
          'アルゴリズム、プログラミング言語、Web、AIの基礎を、生徒中心の参加型授業で教えます。AI-Digital-IT専門学校との2+2交換も実施。',
      },
      {
        title: '正規カリキュラム',
        description:
          '10〜11年生の通常カリキュラムを、科学的思考に基づき生徒中心の手法で教えます。',
      },
      {
        title: '2+2 交換プログラム',
        description:
          'AI-Digital-IT専門学校との2+2提携により、生徒は即戦力となる専門技能を身につけて卒業します。',
      },
    ],
    highlightsTitle: '特色ある行事・実績',
    highlights: [
      {
        title: '文教祭 ― 文化祭',
        body: '日本伝統の「文教祭」を26年連続で成功裏に開催してきました。',
      },
      {
        title: '「金の鷲」勲章',
        body: '数学教員 С.ボーゾー氏が「金の鷲」勲章を受章。',
      },
      {
        title: 'スポーツ優勝',
        body: 'バスケットボール・バレーボール選手権大会の優勝経験。',
      },
      {
        title: '医療実習',
        body: '地域の医療機関と連携し、保健分野の実習を実施。',
      },
    ],
    newsTitle: '最新ニュース',
    newsViewAll: 'すべてのニュース',
    contactEyebrow: 'お問い合わせ',
    contactTitle: 'お問い合わせはこちら',
    phoneLabel: '電話',
    emailLabel: 'メール',
    admissionOpenLabel: '入学受付中',
    admissionOpenValue: '10年生 ・ 2025〜2026年度',
    admissionInfoCta: '入学案内',
    otherQuestionsCta: 'その他のお問い合わせ',
    bannerTitle: 'ソヨル・エルデム高等学校',
    bannerSubtitle:
      '日本語・日本文化・ITを軸とした質の高い教育で、未来をここから始めよう。',
    bannerCta: '入学案内',
    bannerSecondaryCta: 'お問い合わせ',
  },
};

/* ───────────────────── High-school / about ───────────────────────── */

interface HsAboutBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbUniversity: string;
  breadcrumbHs: string;
  breadcrumbThis: string;
  introBadge: string;
  introTitle1: string;
  introTitle2: string;
  introBody1: string;
  introBody1Date: string;
  introBody2: string;
  posterLine1: string;
  posterLine2: string;
  posterLine3: string;
  philosophyTitle: string;
  philosophy: { label: string; title: string; body: string }[];
  directorTitle: string;
  directorName: string;
  directorRole: string;
  directorBody: { strongLead?: string; body: string }[];
  stats: { value: string; label: string }[];
  orgTitle: string;
  orgSubtitle: string;
  org: { heading: string; nodes: { title: string; subtitle?: string; people?: string[] }[] }[];
  highlightsTitle: string;
  highlights: { title: string; body: string }[];
  partnershipsTitle: string;
  partnershipsSubtitle: string;
  partnerships: string[];
  bannerTitle: string;
  bannerSubtitle: string;
  bannerCta: string;
  bannerSecondary: string;
}

export const HS_ABOUT_CONTENT: Record<Language, HsAboutBundle> = {
  MN: {
    heroTitle: 'ТАНИЛЦУУЛГА',
    heroSubtitle:
      'Нийслэлийн Ерөнхий боловсролын Соёл Эрдэм сургууль — япон хэл, соёл, мэдээллийн технологийн чиглэлээр төрөлжсөн ахлах сургууль.',
    breadcrumbUniversity: 'Дээд сургууль',
    breadcrumbHs: 'Ахлах сургууль',
    breadcrumbThis: 'Танилцуулга',
    introBadge: 'Японы хөрөнгө оруулалттай · 2023 онд байгуулагдсан',
    introTitle1: 'Хичээнгүй суралцагч,',
    introTitle2: 'Чадварлаг багш, Япон хэл, соёл',
    introBody1:
      'Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургууль нь {date}-нд япон улсын хөрөнгө оруулалттайгаар үүсгэн байгуулагдаж, 2023–2024 оны хичээлийн жилд 10–11 ангитайгаар, нийт мэргэжлийн 11 багш, 2 япон хэлний багштайгаар үйл ажиллагаагаа эхэлсэн.',
    introBody1Date: '2023 оны 8-р сарын 30',
    introBody2:
      'Манай сургууль нь эх сургууль болох Соёл Эрдэм Дээд Сургуулийн 30+ жилийн япон судлалын баялаг туршлагад тулгуурлан япон хэл, соёл болон мэдээллийн технологид төрөлжсөн ерөнхий боловсролын сургалт явуулдаг.',
    posterLine1: 'Senior High School',
    posterLine2: 'Соёл Эрдэм',
    posterLine3: 'Япон-Монголын боловсролын гүүр',
    philosophyTitle: 'ЭРХЭМ ЗОРИЛГО',
    philosophy: [
      {
        label: 'Алсын хараа',
        title: 'Тэргүүлэгч төрөлжсөн ЕБС',
        body: 'Япон хэл, соёл болон мэдээллийн технологийн чиглэлээр төрөлжсөн ерөнхий боловсролын тэргүүлэгч сургууль болох.',
      },
      {
        label: 'Уриа',
        title: 'Чадварлаг багш — Чанартай боловсрол',
        body: 'Хичээнгүй суралцагч, чадварлаг багш, япон хэл, соёлын дээдээс тогтсон чанартай боловсрол.',
      },
      {
        label: 'Үнэт зүйл',
        title: 'С · Э · А · С',
        body: 'С – Соёл уламжлалаа дээдэлсэн · Э – Эрдэм мэдлэгийг эрхэмлэсэн · А – Амьдрах арга ухаанд суралцсан · С – Сурлагын хоцрогдолгүй суралцагч бэлтгэх.',
      },
    ],
    directorTitle: 'ЗАХИРЛЫН МЭНДЧИЛГЭЭ',
    directorName: 'Д. Эрдэнэцэцэг',
    directorRole: 'Захирал · Соёл Эрдэм Ахлах сургууль',
    directorBody: [
      {
        body: 'Манай сургуулийг үүсгэн байгуулагч Макихара Соичи гуайны итгэл найдвар, япон улсын 100% хөрөнгө оруулалтаар 1996 онд эх сургууль Соёл Эрдэм Дээд Сургууль үүсэн байгуулагдсанаас хойш ~1500 төгсөгчийг бэлтгэж, тэдгээрийн 40 орчим хувь нь Япон улсад суралцаж, ажиллаж байна.',
      },
      {
        body: 'Энэхүү 30 гаруй жилийн япон судлалын баялаг туршлагаа үндэс болгож, бид 2023 онд ахлах сургуулиа байгуулсан. Багш, ажилтан, сурагч, эцэг эх, хамтрагч байгууллагууд та бүхэндээ халуун мэндчилгээ дэвшүүлж байна.',
      },
      {
        body: 'Бид олон улсын стандартын дагуу боловсрол олгож, монгол сэтгэлгээ, япон ёс, чанартай ажлын зан үйлийг хослуулсан мэргэжилтнүүдийг бэлтгэхийг эрхэмлэн ажилладаг. Соёл Эрдэм сурагч байх нь зөвхөн хичээл биш — нэг гэр бүлийн гишүүн болохыг хэлнэ.',
      },
    ],
    stats: [
      { value: '2023', label: 'Үүсгэн байгуулагдсан' },
      { value: '100%', label: 'Мэргэжлийн багш' },
      { value: '11+', label: 'Мэргэжлийн багш нар' },
      { value: '2', label: 'Япон хэлний багш' },
    ],
    orgTitle: 'БҮТЭЦ ЗОХИОН БАЙГУУЛАЛТ',
    orgSubtitle: 'Сургуулийн удирдлагын болон сургалтын нэгжүүд.',
    org: [
      {
        heading: 'Удирдлага',
        nodes: [
          { title: 'Удирдах зөвлөлийн дарга', subtitle: 'Үүсгэн байгуулагч', people: ['Макихара Соичи'] },
          { title: 'Захирал', people: ['Д. Эрдэнэцэцэг'] },
        ],
      },
      {
        heading: 'Үндсэн нэгжүүд',
        nodes: [
          { title: 'Гадаад харилцаа' },
          { title: 'Сургалтын алба' },
          { title: 'Аж ахуй' },
        ],
      },
      {
        heading: 'Сургалтын бүтэц',
        nodes: [
          { title: 'X анги', subtitle: '10-р анги' },
          { title: 'XI анги', subtitle: '11-р анги' },
          { title: 'XII анги', subtitle: '12-р анги' },
        ],
      },
      {
        heading: 'Дэмжих нэгжүүд',
        nodes: [
          { title: 'Хими, физик, мэдээллийн технологийн кабинет' },
          { title: 'Номын сан' },
          { title: 'Нягтлан бодогч' },
          { title: 'Нярав' },
        ],
      },
    ],
    highlightsTitle: 'ОНЦЛОХ АРГА ХЭМЖЭЭ, АМЖИЛТ',
    highlights: [
      {
        title: 'Бүнкёосай — Соёлын наадам',
        body: 'Япон уламжлалт "Бүнкёосай" наадмыг 26 удаа дараалан амжилттай зохион байгуулж, нийт сурагч багштай хамтран япон соёлыг танилцуулдаг уламжлалтай.',
      },
      {
        title: '"Алтан гадас" одон',
        body: 'Математикийн багш С. Боожоо "Алтан гадас" одонгоор шагнагдсан.',
      },
      {
        title: 'Япон хамтын ажиллагаа',
        body: 'Япон улсын 30+ их, дээд сургууль, мэргэжлийн сургуультай хамтран ажилладаг өргөн сүлжээтэй.',
      },
      {
        title: 'Шилийн булаг туристын бааз',
        body: 'Зуны цуглаан, сурагч-багш хамтын дадлага, гадны зочин аяллагчтай уулзалт зэргийг зохион байгуулдаг.',
      },
    ],
    partnershipsTitle: 'ЯПОН УЛСТАЙ ХАМТЫН АЖИЛЛАГАА',
    partnershipsSubtitle:
      'Эх сургууль Соёл Эрдэм ДС-ийн япон сүлжээтэй хамтран сурагчдад дараах боломжуудыг олгодог.',
    partnerships: [
      '50–100% хүртэлх тэтгэлэгт хөтөлбөрүүд',
      'Япон руу хэлний практик дадлага (сард ~2.5 сая төгрөгийн цалинтай)',
      '2+2 болон 1+3 солилцооны хөтөлбөр',
      'Япон засгийн газрын Монбукагакүшо тэтгэлэг',
      'Оберлин их сургуультай байгаль-экологийн жил тутмын дадлага',
      'Риккёо, Чюоүгакүин их сургуулиудтай судалгааны хамтын ажиллагаа',
    ],
    bannerTitle: 'Манай ахлах сургуульд элсэх үү?',
    bannerSubtitle: 'Япон хэл, соёл, мэдээллийн технологийг хосолсон чанартай боловсрол.',
    bannerCta: 'Элсэлтийн мэдээлэл',
    bannerSecondary: 'Холбоо барих',
  },
  EN: {
    heroTitle: 'ABOUT',
    heroSubtitle:
      'Soyol Erdem Senior High School — a specialised high school in Japanese language, culture and information technology.',
    breadcrumbUniversity: 'University',
    breadcrumbHs: 'High school',
    breadcrumbThis: 'About',
    introBadge: 'Japanese-funded · established 2023',
    introTitle1: 'Diligent learners,',
    introTitle2: 'skilled teachers, Japanese language & culture',
    introBody1:
      'Soyol Erdem Senior High School was founded on {date} with Japanese investment and opened its 2023–2024 academic year with grade 10 and 11 classes, 11 subject teachers and 2 Japanese-language teachers.',
    introBody1Date: '30 August 2023',
    introBody2:
      'Building on the 30+ years of Japanese-studies expertise of our parent institution, Soyol Erdem University, our high-school programme specialises in Japanese language, culture and information technology while delivering the full national curriculum.',
    posterLine1: 'Senior High School',
    posterLine2: 'Soyol Erdem',
    posterLine3: 'A Japan–Mongolia education bridge',
    philosophyTitle: 'MISSION & VISION',
    philosophy: [
      {
        label: 'Vision',
        title: 'A leading specialised high school',
        body: 'To be the leading senior high school specialised in Japanese language, culture and IT.',
      },
      {
        label: 'Motto',
        title: 'Skilled teachers — quality education',
        body: 'Diligent learners, skilled teachers, and quality education rooted in Japanese language and culture.',
      },
      {
        label: 'Values',
        title: 'S · E · A · S',
        body: 'S — Honouring our cultural heritage · E — Esteeming knowledge and learning · A — Apprenticing life skills · S — Studying without falling behind.',
      },
    ],
    directorTitle: "DIRECTOR'S MESSAGE",
    directorName: 'D. Erdenetsetseg',
    directorRole: 'Director · Soyol Erdem Senior High School',
    directorBody: [
      {
        body: 'Carrying forward the trust placed in our founder, Mr Soichi Makihara, our parent institution Soyol Erdem University was founded in 1996 with 100% Japanese investment. Since then we have prepared roughly 1,500 graduates, around 40% of whom go on to study or work in Japan.',
      },
      {
        body: 'Building on this 30-year tradition of Japanese-studies excellence, we founded our high school in 2023. To our teachers, staff, students, parents and partner institutions — a warm welcome.',
      },
      {
        body: 'We deliver education to international standards and aim to develop young professionals who combine a Mongolian outlook with Japanese discipline and a quality work ethic. To be a Soyol Erdem student is not just to attend class — it is to be part of one family.',
      },
    ],
    stats: [
      { value: '2023', label: 'Year founded' },
      { value: '100%', label: 'Qualified faculty' },
      { value: '11+', label: 'Subject teachers' },
      { value: '2', label: 'Japanese-language teachers' },
    ],
    orgTitle: 'ORGANISATIONAL STRUCTURE',
    orgSubtitle: 'Our leadership and academic units.',
    org: [
      {
        heading: 'Leadership',
        nodes: [
          { title: 'Chair of the Board', subtitle: 'Founder', people: ['Soichi Makihara'] },
          { title: 'Director', people: ['D. Erdenetsetseg'] },
        ],
      },
      {
        heading: 'Core units',
        nodes: [
          { title: 'International affairs' },
          { title: 'Academic office' },
          { title: 'Operations' },
        ],
      },
      {
        heading: 'Academic structure',
        nodes: [
          { title: 'Class X', subtitle: 'Grade 10' },
          { title: 'Class XI', subtitle: 'Grade 11' },
          { title: 'Class XII', subtitle: 'Grade 12' },
        ],
      },
      {
        heading: 'Support units',
        nodes: [
          { title: 'Chemistry, physics & IT labs' },
          { title: 'Library' },
          { title: 'Accountant' },
          { title: 'Stock manager' },
        ],
      },
    ],
    highlightsTitle: 'EVENTS & ACHIEVEMENTS',
    highlights: [
      {
        title: 'Bunkyosai — culture festival',
        body: 'The traditional Japanese "Bunkyosai" festival has been staged successfully 26 years in a row, with all students and teachers introducing Japanese culture together.',
      },
      {
        title: '"Polaris" national medal',
        body: 'Mathematics teacher S. Boozoo was awarded the "Polaris" national medal.',
      },
      {
        title: 'Cooperation with Japan',
        body: 'A broad network of cooperation with 30+ Japanese universities, colleges and vocational schools.',
      },
      {
        title: 'Shiliin Bulag tourist camp',
        body: 'The site hosts summer gatherings, joint student–faculty placements and meetings with international guests.',
      },
    ],
    partnershipsTitle: 'COOPERATION WITH JAPAN',
    partnershipsSubtitle:
      "In partnership with the Japanese network of our parent institution, Soyol Erdem University, we offer students the following opportunities.",
    partnerships: [
      'Scholarships covering 50–100% of tuition',
      'Paid language placements in Japan (~MNT 2.5M / month)',
      '2+2 and 1+3 exchange pathways',
      'MEXT (Monbukagakusho) scholarships from the Japanese government',
      'Annual environmental fieldwork with J.F. Oberlin University',
      'Research cooperation with Rikkyo and Chuo Gakuin universities',
    ],
    bannerTitle: 'Considering enrolling at our high school?',
    bannerSubtitle: 'Quality education combining Japanese language, culture and IT.',
    bannerCta: 'Admission details',
    bannerSecondary: 'Contact',
  },
  JP: {
    heroTitle: '学校紹介',
    heroSubtitle:
      'ソヨル・エルデム高等学校 ― 日本語・日本文化・情報技術に特化した高等学校。',
    breadcrumbUniversity: '大学',
    breadcrumbHs: '高等学校',
    breadcrumbThis: '学校紹介',
    introBadge: '日本資本 ・ 2023年設立',
    introTitle1: '勤勉な学習者と',
    introTitle2: '熟練の教員、日本語・日本文化',
    introBody1:
      'ソヨル・エルデム高等学校は{date}、日本資本のもとに設立され、2023〜2024年度に10年・11年生クラスを開設、教科専任教員11名、日本語教員2名で活動を開始しました。',
    introBody1Date: '2023年8月30日',
    introBody2:
      '母体であるソヨル・エルデム大学が30年以上にわたり培ってきた日本研究の知見を基盤に、日本語・日本文化・情報技術に特化しつつ、国の正規カリキュラムを提供しています。',
    posterLine1: 'Senior High School',
    posterLine2: 'ソヨル・エルデム',
    posterLine3: '日本とモンゴルを結ぶ教育の架け橋',
    philosophyTitle: 'ミッションとビジョン',
    philosophy: [
      {
        label: 'ビジョン',
        title: '専門特化型のリーディング校',
        body: '日本語・日本文化・ITに特化した高等学校として、リーディング校となることを目指します。',
      },
      {
        label: 'スローガン',
        title: '熟練の教員 ― 質の高い教育',
        body: '勤勉な学習者と熟練の教員により、日本語・日本文化に根ざした質の高い教育を提供します。',
      },
      {
        label: '価値観',
        title: 'С・Э・А・С',
        body: 'С ― 文化的伝統を重んじる ・ Э ― 学問・知識を尊ぶ ・ А ― 生きる力を身につける ・ С ― 学業に遅れない学習者を育てる。',
      },
    ],
    directorTitle: '校長挨拶',
    directorName: 'Д.エルデネツェツェグ',
    directorRole: '校長 ・ ソヨル・エルデム高等学校',
    directorBody: [
      {
        body: '本校の設立は、創立者である牧原荘一氏のご信頼と、日本からの100%出資のもと、1996年に母体ソヨル・エルデム大学が誕生したことに端を発します。それ以来、約1,500名の卒業生を輩出し、その約40%が日本で学び、働いています。',
      },
      {
        body: 'この30余年にわたる日本研究の蓄積を礎に、2023年に高等学校を設立しました。教職員、生徒、保護者、提携機関の皆様に心より歓迎のご挨拶を申し上げます。',
      },
      {
        body: '私たちは国際基準に準拠した教育を提供し、モンゴル人らしい思考と日本人らしい礼節、質の高い職業観を兼ね備えた人材の育成を目指しています。ソヨル・エルデムの生徒であるということは、授業を受けることだけではなく、一つの家族の一員となることを意味します。',
      },
    ],
    stats: [
      { value: '2023', label: '設立年' },
      { value: '100%', label: '専門教員' },
      { value: '11+', label: '教科専任教員' },
      { value: '2', label: '日本語教員' },
    ],
    orgTitle: '組織構成',
    orgSubtitle: '本校の運営および教育担当部署。',
    org: [
      {
        heading: '運営',
        nodes: [
          { title: '理事長', subtitle: '創立者', people: ['牧原 荘一'] },
          { title: '校長', people: ['Д.エルデネツェツェグ'] },
        ],
      },
      {
        heading: '主要部署',
        nodes: [
          { title: '国際交流' },
          { title: '教務課' },
          { title: '総務' },
        ],
      },
      {
        heading: '学年構成',
        nodes: [
          { title: 'X組', subtitle: '10年生' },
          { title: 'XI組', subtitle: '11年生' },
          { title: 'XII組', subtitle: '12年生' },
        ],
      },
      {
        heading: 'サポート部署',
        nodes: [
          { title: '理科・情報技術実験室' },
          { title: '図書館' },
          { title: '経理' },
          { title: '管理' },
        ],
      },
    ],
    highlightsTitle: '特色ある行事・実績',
    highlights: [
      {
        title: '文教祭 ― 文化祭',
        body: '日本伝統の「文教祭」を26年連続で成功裏に開催し、全生徒・全教員で日本文化を紹介する伝統となっています。',
      },
      {
        title: '「北極星」勲章',
        body: '数学教員 С.ボーゾー氏が「北極星」勲章を受章。',
      },
      {
        title: '日本との連携',
        body: '日本の30以上の大学・短大・専門学校との幅広い協力ネットワークを有しています。',
      },
      {
        title: 'シリーン・ブラグ観光キャンプ',
        body: '夏期合宿、生徒・教員合同実習、海外からのゲストとの交流などを企画しています。',
      },
    ],
    partnershipsTitle: '日本との連携',
    partnershipsSubtitle:
      '母体ソヨル・エルデム大学の日本ネットワークと連携し、生徒に下記の機会を提供しています。',
    partnerships: [
      '学費の50〜100%をカバーする奨学金プログラム',
      '日本での有給語学実習（月収約2,500,000トゥグルグ）',
      '2+2および1+3交換プログラム',
      '日本政府文部科学省（MEXT）奨学金',
      '桜美林大学との毎年の環境エコロジー実習',
      '立教大学・中央学院大学との研究連携',
    ],
    bannerTitle: '本校への入学をご検討中ですか？',
    bannerSubtitle: '日本語・日本文化・ITを融合した質の高い教育。',
    bannerCta: '入学案内',
    bannerSecondary: 'お問い合わせ',
  },
};

/* ───────────────────── High-school / programs ────────────────────── */

interface HsProgramsBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbUniversity: string;
  breadcrumbHs: string;
  breadcrumbThis: string;
  structureTitle: string;
  structureSubtitle: string;
  structure: { title: string; description: string }[];
  jpBadge: string;
  jpTitle: string;
  jpBody: string;
  jpLevels: { tag: string; title: string; bullets: string[] }[];
  itBadge: string;
  itTitle: string;
  itBody: string;
  itTopics: { title: string; body: string }[];
  /** "Ногоон Жэйд" partner programme — international study pathway. */
  jadeBadge: string;
  jadeTitle: string;
  jadeBody: string;
  jadeStats: { value: string; label: string }[];
  jadeServicesTitle: string;
  jadeServices: { title: string; body: string }[];
  jadeCountriesTitle: string;
  jadeCountries: string;
  teachersBadge: string;
  teachersTitle: string;
  teachersBody: string;
  teachers: { name: string; role: string; note: string }[];
  teacherStats: { value: string; label: string }[];
  resourcesTitle: string;
  resources: { title: string; body: string }[];
  bannerTitle: string;
  bannerSubtitle: string;
  bannerCta: string;
  bannerSecondary: string;
}

export const HS_PROGRAMS_CONTENT: Record<Language, HsProgramsBundle> = {
  MN: {
    heroTitle: 'СУРГАЛТ',
    heroSubtitle: 'Ерөнхий боловсролын суурь + Япон хэл, соёл + Төрөлжсөн мэдээллийн технологи.',
    breadcrumbUniversity: 'Дээд сургууль',
    breadcrumbHs: 'Ахлах сургууль',
    breadcrumbThis: 'Сургалт',
    structureTitle: 'СУРГАЛТЫН БҮТЭЦ',
    structureSubtitle:
      'Ерөнхий боловсролын тогтсон стандартыг япон хэл, соёл болон IT-ийн төрөлжсөн хөтөлбөртэй хослуулсан.',
    structure: [
      {
        title: 'Ерөнхий боловсролын суурь',
        description:
          'Боловсролын тухай хуулийн дагуу 10–12 анги бүрэн дунд боловсролын стандарт хөтөлбөр — Монгол хэл-уран зохиол, Математик, Хими, Физик, Биологи, Газарзүй, Түүх, Иргэний боловсрол, Биеийн тамир.',
      },
      {
        title: 'Япон хэл, соёл',
        description:
          '10–12 ангид JLPT N5 → N3 түвшинд хүрэхүйц хичээл. Япон ёс заншил, нийгмийн харилцаа, соёлын онцлогийг танилцуулсан хичээлүүд.',
      },
      {
        title: 'Төрөлжсөн IT',
        description:
          'Алгоритм, өгөгдлийн бүтэц, програмчлал, веб болон AI-ийн үндэс — сурагч төвтэй практикаар суралцана.',
      },
    ],
    jpBadge: 'Япон хэл, соёл',
    jpTitle: 'Япон хэлний түвшинт хөтөлбөр',
    jpBody:
      'Сургуулийн төгсөгчид Япон руу үргэлжлүүлэн суралцах, япон байгууллагад ажиллах түвшинд хүрэхэд тулгуурлан 3 жилд JLPT N5-аас N3-N2 хүртэлх түвшинд хүргэх системтэй хөтөлбөртэй. Долоо хоногт 4 цагийн япон хэлний хичээл явагдана.',
    jpLevels: [
      {
        tag: '10-р анги',
        title: 'JLPT N5 (Эхлэн суралцагч)',
        bullets: [
          'Хирагана, катакана үсэг бичих, унших',
          'Үндсэн 100+ кандзи',
          'Энгийн өдөр тутмын хэллэг (өөрийгөө танилцуулах, цаг, хоол)',
          'Япон ёс заншлын танилцуулга, бүх хичээлд 4 цаг/долоо хоног',
        ],
      },
      {
        tag: '11-р анги',
        title: 'JLPT N4 (Дунд эхлэл)',
        bullets: [
          'Кандзи 300+',
          'Илүү нарийвчилсан грамматик, өнгөрсөн-ирээдүй цаг хэлбэр',
          'Япон уран зохиолоос ишлэл, дуу, кино',
          'Хичээлээс гадуур "Bunkyousai" наадамд оролцох',
        ],
      },
      {
        tag: '12-р анги',
        title: 'JLPT N3 → N2 түвшин',
        bullets: [
          'Кандзи 650+',
          'Япон руу солилцоонд явах түвшинд бичгийн болон ярианы орчуулга',
          'Япон их сургуулийн элсэлтийн шалгалтын дасгал',
          'Олон улсын эрх бүхий шалгалтаар чадвараа баталгаажуулна',
        ],
      },
    ],
    itBadge: 'Төрөлжсөн IT',
    itTitle: 'Мэдээллийн технологийн төрөлжсөн анги',
    itBody:
      '10–11 ангид сурагч төвтэй, оролцоонд тулгуурласан аргачлалаар программчлал, веб технологи, AI, өгөгдлийн шинжилгээний ойлголтуудыг тус сургуулийн дэргэдэх IT-Digital-AI мэргэжлийн сургуультай хамтран заана. Эх сургууль СЭДС-ын Программ хангамжийн мэргэжилтэй 2+2 хөтөлбөрөөр шууд үргэлжлүүлэн суралцаж болно.',
    itTopics: [
      { title: 'Алгоритм ба програмчлал', body: 'Логик сэтгэлгээний үндэс, Python/JavaScript хэлээр практик дасгал.' },
      { title: 'Өгөгдлийн бүтэц', body: 'Жагсаалт, харгалзаа, мод болон график бүтцийн ойлголт.' },
      { title: 'Веб технологи', body: 'HTML, CSS, JavaScript ашиглан төсөл хийж, хэрэглэгчийн интерфейс зохиох.' },
      { title: 'AI болон өгөгдөл', body: 'Хиймэл оюун ухааны үндсэн ойлголт, өгөгдлийн шинжилгээний эхлэн суралцах хичээл.' },
    ],
    jadeBadge: 'Ногоон Жэйд боловсролын төв',
    jadeTitle: 'Олон улсад суралцах хувилбар (Ногоон Жэйд)',
    jadeBody:
      '"Ногоон Жэйд" боловсролын төв нь 2013 оноос Соёл Эрдэм Ахлах Сургуультай хамтран Англи, АНУ, Австрали, Канад зэрэг 10+ улсын 500+ их, дээд сургуультай зуучлал явуулж байна. Жил бүр 6,000+ оюутан зөвлөгөө авч, бэлдсэн сурагчдын 98% нь хүссэн сургуульдаа элсэн ордог. Манай сурагч ахлах ангиа төгсмөгцөө гадаадад үргэлжлүүлэн суралцах бэлэн замыг санал болгож байна.',
    jadeStats: [
      { value: '10+', label: 'жилийн туршлага' },
      { value: '500+', label: 'хамтрагч сургууль' },
      { value: '98%', label: 'хүссэн сургуульдаа ордог' },
      { value: '99%', label: 'визний амжилт' },
    ],
    jadeServicesTitle: 'Санал болгож буй үйлчилгээ',
    jadeServices: [
      {
        title: "Kid's English",
        body: 'Бага насны (5+) хүүхдийн англи хэлний 5 түвшний сургалт — олон улсад хүлээн зөвшөөрөгдсөн хөтөлбөрөөр.',
      },
      {
        title: 'Junior English',
        body: '11–14 насны өсвөрийн англи хэлний сонирхолтой сургалт — дүрэм, унших, бичих, ярих, сонсох 4 чадварыг зэрэг хөгжүүлнэ.',
      },
      {
        title: 'General English',
        body: 'Ахлах ангид болон насанд хүрэгчдэд зориулсан 5-шатлалт ерөнхий англи хэлний сургалт — Англи, Монгол багштай.',
      },
      {
        title: 'IELTS бэлтгэл',
        body: 'IELTS-д өндөр оноо авах системтэй бэлтгэл — цаг хуваарилах, оновчтой хариулах дадал суулгана.',
      },
      {
        title: 'NIFY — Олон улсын суурь хөтөлбөр',
        body: 'Австралийн Eynesbury College-ийн Navitas International Foundation Year, Австралид үргэлжлүүлэн суралцахад зориулсан албан ёсны хөтөлбөр.',
      },
      {
        title: 'OXFY — Олон улсын суурь хөтөлбөр',
        body: 'Oxford International Foundation Year — Англид суралцах хүсэлтэй сурагчдад мэргэжлийн багш нар дор их сургуулийн түвшний хичээлийг үзүүлнэ.',
      },
      {
        title: 'Боловсрол зуучлал',
        body: '500+ их, дээд сургууль, 150–500 мэргэжлээс сонгон тэтгэлэгтэй элсэх зуучлалын үйлчилгээ — материал бүрдүүлэх, өргөдөл явуулах, виз авах хүртэл бүх алхамд дэмжинэ.',
      },
    ],
    jadeCountriesTitle: 'Хамтрагч улсууд',
    jadeCountries:
      'Англи · Америк · Австрали · Канад · Швейцар · Хятад · Голланд · Унгар · Сингапур · Япон',
    teachersBadge: 'Багш нар',
    teachersTitle: 'Мэргэжлийн багш нар',
    teachersBody:
      'Бид мэргэжлийн ур чадвар, тогтсон арга зүй, япон хэл соёлын мэдлэг хосолсон чанартай багшийн бүрэлдэхүүнтэй. 100% багш нар нь мэргэжлийн үнэмлэхтэй, олон жилийн туршлагатай.',
    teachers: [
      { name: 'С. Боожоо', role: 'Математикийн багш', note: '"Алтан гадас" одонгоор шагнагдсан' },
      { name: 'Япон хэлний 2 багш', role: 'Эх хэлтэн / JLPT N1', note: 'Япон-Монголын соёл, орчуулга судлал' },
      { name: '11+ мэргэжлийн багш', role: 'Ерөнхий боловсрол', note: 'Боловсролын магистр зэрэгтэй' },
    ],
    teacherStats: [
      { value: '11+', label: 'Мэргэжлийн багш' },
      { value: '2', label: 'Япон хэлний багш' },
      { value: '100%', label: 'Мэргэжлийн үнэмлэхтэй' },
      { value: '50+', label: 'Япон зочин багш (СЭДС)' },
    ],
    resourcesTitle: 'СУРГАЛТЫН ОРЧИН',
    resources: [
      { title: 'IT кабинет', body: 'Орчин үеийн компьютер, дэлгэц, сүлжээний техник хангамжтай суралцагч төвтэй кабинет.' },
      { title: 'Номын сан', body: 'Япон, монгол хэл дээрх 5000+ номтой; сурагчид JLPT номон материалаар бэлтгэнэ.' },
      { title: 'Хими, физикийн лаборатори', body: 'Бодит туршилт хийх боломжтой шинжлэх ухааны лабораторийн өрөөнүүдтэй.' },
    ],
    bannerTitle: 'Япон хэл, IT, чанартай боловсрол',
    bannerSubtitle: '2026-2027 оны хичээлийн жилийн элсэлт нээлттэй.',
    bannerCta: 'Элсэлтийн мэдээлэл',
    bannerSecondary: 'Холбоо барих',
  },
  EN: {
    heroTitle: 'PROGRAMMES',
    heroSubtitle: 'The full national curriculum + Japanese language and culture + specialised IT.',
    breadcrumbUniversity: 'University',
    breadcrumbHs: 'High school',
    breadcrumbThis: 'Programmes',
    structureTitle: 'PROGRAMME STRUCTURE',
    structureSubtitle:
      'The national curriculum combined with our specialised Japanese-language, cultural and IT tracks.',
    structure: [
      {
        title: 'National curriculum',
        description:
          "The full grade 10–12 secondary curriculum required by Mongolia's Education Law — Mongolian language and literature, mathematics, chemistry, physics, biology, geography, history, civics and physical education.",
      },
      {
        title: 'Japanese language & culture',
        description:
          'Classes designed to reach JLPT N5 → N3 across grades 10–12. Lessons that introduce Japanese customs, social etiquette and cultural specifics.',
      },
      {
        title: 'Specialised IT',
        description:
          'Algorithms, data structures, programming, the web and the fundamentals of AI — taught through hands-on, student-centred practice.',
      },
    ],
    jpBadge: 'Japanese language & culture',
    jpTitle: 'Tiered Japanese-language programme',
    jpBody:
      'Built around the level our graduates need to continue their studies in Japan or work for Japanese organisations, the programme systematically moves students from JLPT N5 to N3–N2 over three years. Japanese-language classes run 4 hours per week.',
    jpLevels: [
      {
        tag: 'Grade 10',
        title: 'JLPT N5 (beginner)',
        bullets: [
          'Reading and writing hiragana and katakana',
          'Core 100+ kanji',
          'Everyday phrases (introducing yourself, telling the time, food)',
          'An introduction to Japanese customs, 4 hours / week in every class',
        ],
      },
      {
        tag: 'Grade 11',
        title: 'JLPT N4 (lower-intermediate)',
        bullets: [
          '300+ kanji',
          'More detailed grammar, past- and future-tense forms',
          'Excerpts of Japanese literature, songs and films',
          'Participation in the extracurricular "Bunkyosai" festival',
        ],
      },
      {
        tag: 'Grade 12',
        title: 'JLPT N3 → N2',
        bullets: [
          '650+ kanji',
          'Written and spoken translation at exchange-ready level',
          'Practice for Japanese university entrance exams',
          'Certification through internationally recognised exams',
        ],
      },
    ],
    itBadge: 'Specialised IT',
    itTitle: 'Specialised information-technology track',
    itBody:
      'In grades 10–11, we teach programming, web technologies, AI and data-analytics fundamentals through a student-centred, participatory approach — co-delivered with our affiliated IT-Digital-AI vocational school. Students can then continue directly into our parent institution\'s Software Engineering programme via a 2+2 pathway.',
    itTopics: [
      { title: 'Algorithms & programming', body: 'Foundations of logical reasoning with hands-on Python / JavaScript practice.' },
      { title: 'Data structures', body: 'Lists, maps, trees and graph structures.' },
      { title: 'Web technologies', body: 'Building projects in HTML, CSS and JavaScript and designing user interfaces.' },
      { title: 'AI & data', body: 'An introduction to artificial intelligence and to data-analytics fundamentals.' },
    ],
    jadeBadge: 'Green Jade Education Centre',
    jadeTitle: 'International study pathway (Green Jade)',
    jadeBody:
      'In partnership with Soyol Erdem Senior High School since 2013, the "Green Jade" education centre places students in 500+ universities across 10+ countries — the UK, USA, Australia, Canada and more. Each year, 6,000+ students consult with Green Jade, and 98% of those who go on to apply are admitted to their first-choice school. The partnership gives our high-school students a ready-made pathway to continue their studies abroad straight after graduation.',
    jadeStats: [
      { value: '10+', label: 'years of experience' },
      { value: '500+', label: 'partner universities' },
      { value: '98%', label: 'placed at top choice' },
      { value: '99%', label: 'visa success rate' },
    ],
    jadeServicesTitle: 'Services on offer',
    jadeServices: [
      {
        title: "Kid's English",
        body: 'Five-level English programme for young learners (ages 5+), built on internationally accredited curricula.',
      },
      {
        title: 'Junior English',
        body: 'Engaging English programme for ages 11–14, developing reading, writing, listening and speaking together with grammar.',
      },
      {
        title: 'General English',
        body: 'Five-tier general English programme for senior-high students and adults, co-taught by Mongolian and native-speaker faculty.',
      },
      {
        title: 'IELTS preparation',
        body: 'A systematic IELTS prep course — pacing, exam strategy and the techniques required to score at the top of the band.',
      },
      {
        title: 'NIFY — International foundation programme',
        body: "Australia's Eynesbury College Navitas International Foundation Year, the official onramp for students continuing to Australian universities.",
      },
      {
        title: 'OXFY — International foundation programme',
        body: 'Oxford International Foundation Year — a UK-bound preparation programme that takes students through university-level coursework under expert supervision.',
      },
      {
        title: 'University placement',
        body: 'Placement services covering 500+ universities and 150–500 majors with scholarship opportunities. Support runs end-to-end: document collection, application, visa.',
      },
    ],
    jadeCountriesTitle: 'Partner countries',
    jadeCountries:
      'UK · USA · Australia · Canada · Switzerland · China · Netherlands · Hungary · Singapore · Japan',
    teachersBadge: 'Faculty',
    teachersTitle: 'Our subject teachers',
    teachersBody:
      'We combine professional expertise, established teaching method and Japanese language and cultural depth. 100% of our teaching staff are certified professionals with years of classroom experience.',
    teachers: [
      { name: 'S. Boozoo', role: 'Mathematics teacher', note: 'Awarded the "Polaris" national medal' },
      { name: '2 Japanese-language teachers', role: 'Native speakers / JLPT N1', note: 'Japan–Mongolia cultural & translation studies' },
      { name: '11+ subject teachers', role: 'National curriculum', note: "Master's degrees in education" },
    ],
    teacherStats: [
      { value: '11+', label: 'Subject teachers' },
      { value: '2', label: 'Japanese-language teachers' },
      { value: '100%', label: 'Certified faculty' },
      { value: '50+', label: 'Visiting Japan faculty (parent uni.)' },
    ],
    resourcesTitle: 'OUR FACILITIES',
    resources: [
      { title: 'IT lab', body: 'A student-centred IT classroom with modern computers, displays and networking equipment.' },
      { title: 'Library', body: '5,000+ books in Japanese and Mongolian; students prepare for the JLPT with dedicated study materials.' },
      { title: 'Chemistry & physics labs', body: 'Science labs equipped for hands-on experiments.' },
    ],
    bannerTitle: 'Japanese language, IT, quality education',
    bannerSubtitle: 'Admissions are open for the 2026–2027 academic year.',
    bannerCta: 'Admission details',
    bannerSecondary: 'Contact',
  },
  JP: {
    heroTitle: 'プログラム',
    heroSubtitle: '国の正規カリキュラム ＋ 日本語・日本文化 ＋ 専門情報技術。',
    breadcrumbUniversity: '大学',
    breadcrumbHs: '高等学校',
    breadcrumbThis: 'プログラム',
    structureTitle: 'プログラム構成',
    structureSubtitle:
      '国の正規カリキュラムに、日本語・日本文化およびIT専門コースを組み合わせています。',
    structure: [
      {
        title: '正規カリキュラム',
        description:
          'モンゴル教育法に基づく10〜12年生の正規カリキュラム ― モンゴル語・文学、数学、化学、物理、生物、地理、歴史、市民教育、体育。',
      },
      {
        title: '日本語・日本文化',
        description:
          '10〜12年生でJLPT N5→N3レベルを目指す授業を実施。日本の習慣、社会作法、文化的特色を紹介する授業も併設。',
      },
      {
        title: '専門IT',
        description:
          'アルゴリズム、データ構造、プログラミング、Web、AIの基礎を、生徒中心の実践型授業で学習します。',
      },
    ],
    jpBadge: '日本語・日本文化',
    jpTitle: '日本語レベル別プログラム',
    jpBody:
      '卒業生が日本へ進学し、または日本企業で勤務できるレベルに到達することを基準に、3年間でJLPT N5からN3〜N2まで到達する体系的なプログラムを提供します。週4時間の日本語授業を実施します。',
    jpLevels: [
      {
        tag: '10年生',
        title: 'JLPT N5（初級）',
        bullets: [
          'ひらがな・カタカナの読み書き',
          '基本100以上の漢字',
          '日常会話（自己紹介、時間、食事）',
          '日本の習慣を紹介、全授業で週4時間',
        ],
      },
      {
        tag: '11年生',
        title: 'JLPT N4（初中級）',
        bullets: [
          '漢字300以上',
          'より詳細な文法、過去・未来形',
          '日本文学の抜粋、歌、映画',
          '課外行事「文教祭」への参加',
        ],
      },
      {
        tag: '12年生',
        title: 'JLPT N3 → N2',
        bullets: [
          '漢字650以上',
          '交換留学レベルの文書・会話翻訳',
          '日本の大学入試対策',
          '国際認証試験で能力を証明',
        ],
      },
    ],
    itBadge: '専門IT',
    itTitle: '情報技術専門コース',
    itBody:
      '10〜11年生で、生徒中心・参加型の手法により、プログラミング、Web技術、AI、データ分析の概念を、附属のIT-Digital-AI専門学校と連携して教えます。卒業後は母体ソヨル・エルデム大学のソフトウェア工学専攻に2+2プログラムで進学することも可能です。',
    itTopics: [
      { title: 'アルゴリズムとプログラミング', body: '論理的思考の基礎を、Python・JavaScriptを用いた実践で学習。' },
      { title: 'データ構造', body: 'リスト、辞書、ツリー、グラフ構造の概念。' },
      { title: 'Web技術', body: 'HTML・CSS・JavaScriptでプロジェクトを制作し、ユーザインタフェースを設計。' },
      { title: 'AIとデータ', body: '人工知能の基礎概念、データ分析の入門授業。' },
    ],
    jadeBadge: 'グリーン・ジェイド教育センター',
    jadeTitle: '海外進学パスウェイ（グリーン・ジェイド）',
    jadeBody:
      '「グリーン・ジェイド」教育センターは、2013年からソヨル・エルデム高等学校と連携し、英国、米国、オーストラリア、カナダなど10カ国以上の500以上の大学・短大への留学斡旋を行っています。毎年6,000名以上の学生がカウンセリングを受け、出願した生徒の98%が第一志望校に合格しています。本校の生徒には、卒業後そのまま海外進学できる確かなルートを提供します。',
    jadeStats: [
      { value: '10+', label: '年の実績' },
      { value: '500+', label: '提携校' },
      { value: '98%', label: '第一志望合格率' },
      { value: '99%', label: 'ビザ取得率' },
    ],
    jadeServicesTitle: '提供サービス',
    jadeServices: [
      {
        title: "Kid's English",
        body: '5歳以上の幼児向け5段階英語プログラム。国際的に認定されたカリキュラムに基づきます。',
      },
      {
        title: 'Junior English',
        body: '11〜14歳の中学生向け英語プログラム。文法に加え、読む・書く・聞く・話すの4技能を同時に伸ばします。',
      },
      {
        title: 'General English',
        body: '高校生・大人向けの5段階一般英語プログラム。モンゴル人教員とネイティブ教員が指導します。',
      },
      {
        title: 'IELTS対策',
        body: 'IELTSで高得点を取るための体系的な対策コース。時間配分、戦略、解答テクニックを習得します。',
      },
      {
        title: 'NIFY ― 国際ファウンデーションコース',
        body: 'オーストラリアEynesbury Collegeが正式に提供するNavitas International Foundation Year。オーストラリアの大学進学への公式ルートです。',
      },
      {
        title: 'OXFY ― 国際ファウンデーションコース',
        body: 'Oxford International Foundation Year。英国進学を目指す生徒が、専門教員の指導のもと大学レベルの科目を学習します。',
      },
      {
        title: '進学斡旋',
        body: '500以上の大学・短大、150〜500の専攻から奨学金付き留学を選択可能。書類準備、出願、ビザ取得まで全工程をサポートします。',
      },
    ],
    jadeCountriesTitle: '提携国',
    jadeCountries:
      '英国 · 米国 · オーストラリア · カナダ · スイス · 中国 · オランダ · ハンガリー · シンガポール · 日本',
    teachersBadge: '教員',
    teachersTitle: '専門教員',
    teachersBody:
      '専門技能、確立された指導法、日本語・日本文化の知識を兼ね備えた教員陣を擁しています。教員の100%が専門資格を有し、長年の教育経験を持ちます。',
    teachers: [
      { name: 'С.ボーゾー', role: '数学教員', note: '「北極星」勲章受章' },
      { name: '日本語教員 2名', role: 'ネイティブ ・ JLPT N1', note: '日蒙文化・翻訳研究' },
      { name: '11+ 教科専任教員', role: '正規カリキュラム', note: '教育修士号取得' },
    ],
    teacherStats: [
      { value: '11+', label: '教科専任教員' },
      { value: '2', label: '日本語教員' },
      { value: '100%', label: '有資格教員' },
      { value: '50+', label: '日本人客員教員（母体大学）' },
    ],
    resourcesTitle: '学習環境',
    resources: [
      { title: 'IT教室', body: '最新のPC・ディスプレイ・ネットワーク機材を備えた、生徒中心のIT教室。' },
      { title: '図書館', body: '日本語・モンゴル語の蔵書5,000冊以上。生徒はJLPT教材で学習。' },
      { title: '化学・物理実験室', body: '実験を実施できる理科実験室を完備。' },
    ],
    bannerTitle: '日本語・IT・質の高い教育',
    bannerSubtitle: '2026〜2027年度入学受付中。',
    bannerCta: '入学案内',
    bannerSecondary: 'お問い合わせ',
  },
};

/* ───────────────────── High-school / admission ───────────────────── */

interface HsAdmissionBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbUniversity: string;
  breadcrumbHs: string;
  breadcrumbThis: string;
  introBadge: string;
  introTitle: string;
  introBody: string;
  infoBox: {
    enrolLabel: string;
    enrolValue: string;
    yearLabel: string;
    yearValue: string;
    formatLabel: string;
    formatValue: string;
    trackLabel: string;
    trackValue: string;
  };
  applyCardTitle: string;
  applyCardBody: string;
  applyCardCta: string;
  directContactEyebrow: string;
  phoneLabel: string;
  mobileLabel: string;
  emailLabel: string;
  requirementsTitle: string;
  requirements: { title: string; body: string }[];
  stepsTitle: string;
  stepsSubtitle: string;
  steps: { title: string; body: string }[];
  docsTitle: string;
  docs: string[];
  timelineTitle: string;
  timeline: { date: string; event: string }[];
  tuitionTitle: string;
  tuitionBody: string;
  tuitionPhoneCta: string;
  tuitionContactCta: string;
  formSectionTitle: string;
  formSectionSubtitle: string;
  bannerTitle: string;
  bannerCta: string;
  bannerSecondary: string;
  /** Form labels passed to the HighSchoolAdmissionForm client component. */
  form: {
    studentSection: string;
    studentNameLabel: string;
    studentNamePh: string;
    studentBirthLabel: string;
    studentBirthPh: string;
    currentSchoolLabel: string;
    currentSchoolPh: string;
    currentGpaLabel: string;
    currentGpaPh: string;
    trackLabel: string;
    trackUndecided: string;
    trackJapan: string;
    trackIt: string;
    trackOther: string;
    guardianSection: string;
    guardianNameLabel: string;
    guardianNamePh: string;
    guardianRelLabel: string;
    guardianRelPh: string;
    phoneLabel: string;
    phonePh: string;
    emailLabel: string;
    emailPh: string;
    messageLabel: string;
    messagePh: string;
    submitCta: string;
    errorSubmit: string;
    errorNetwork: string;
    successTitle: string;
    successBody: string;
    successAgain: string;
    requiredNote: string;
  };
}

export const HS_ADMISSION_CONTENT: Record<Language, HsAdmissionBundle> = {
  MN: {
    heroTitle: 'ЭЛСЭЛТ',
    heroSubtitle: 'Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн 10-р ангид элсэх журам, шаардлага.',
    breadcrumbUniversity: 'Дээд сургууль',
    breadcrumbHs: 'Ахлах сургууль',
    breadcrumbThis: 'Элсэлт',
    introBadge: '2026-2027 оны хичээлийн жил',
    introTitle: 'Ирээдүйгээ Соёл Эрдэмээс эхэл',
    introBody:
      'Соёл Эрдэм Ахлах Сургууль нь 10–11–12 ангид Япон хэл, соёл болон мэдээллийн технологид төрөлжсөн чанартай ерөнхий боловсрол олгодог. Эх сургууль СЭДС-ийн 30 жилийн япон судлалын баялаг туршлагаар суурилсан, япон 30+ их сургуультай хамтын ажиллагаатай сүлжээтэй.',
    infoBox: {
      enrolLabel: 'Элсэлт хүлээж авах',
      enrolValue: '10-р анги',
      yearLabel: 'Хичээлийн жил',
      yearValue: '2026-2027',
      formatLabel: 'Сургалтын хэлбэр',
      formatValue: 'Өдрийн, орон тооны',
      trackLabel: 'Төрөлжсөн чиглэл',
      trackValue: 'Япон хэл / IT',
    },
    applyCardTitle: 'Цахимаар бүртгүүлэх',
    applyCardBody:
      '10-р ангид элсэх хүсэлтээ онлайн формоор илгээнэ үү. Хариуцсан ажилтан тантай 1-2 өдрийн дотор холбогдоно.',
    applyCardCta: 'Цахим маягтыг бөглөх',
    directContactEyebrow: 'Лавлах / шууд холбоо барих',
    phoneLabel: 'Утас',
    mobileLabel: 'Гар утас',
    emailLabel: 'И-мэйл',
    requirementsTitle: 'ЭЛСЭЛТИЙН ШААРДЛАГА',
    requirements: [
      {
        title: '9 жилийн боловсролын гэрчилгээтэй',
        body: 'Тухайн оны хичээлийн жилийн 9-р ангиа төгссөн, ерөнхий боловсролын дунд боловсролын гэрчилгээтэй сурагч элсэх боломжтой.',
      },
      {
        title: 'Дундаж голч 70-аас дээш',
        body: '9-р ангийн жилийн эцсийн дүнгийн дундаж голч оноо 70%-аас дээш байх шаардлагатай.',
      },
      {
        title: 'Япон хэл, IT-д сонирхолтой',
        body: 'Япон хэл, соёлд эсвэл мэдээллийн технологийн чиглэлд сонирхолтой, цаашид Япон руу үргэлжлүүлэн суралцах эсвэл IT мэргэжлийн чиглэлээр явахыг хүсэж буй сурагч.',
      },
      {
        title: 'Эцэг эх, асран хамгаалагчтай зөвлөлдсөн',
        body: 'Сурагч ба эцэг эхийн хамтарсан шийдвэрээр элсэлтийн материал бүрдүүлсэн байна.',
      },
    ],
    stepsTitle: 'ЭЛСЭХ ҮЕ ШАТУУД',
    stepsSubtitle: '4 алхамаар манай сургуульд элсэх ажиллагаа дуусна.',
    steps: [
      { title: '1. Бүртгүүлэх', body: 'Дараах формоор урьдчилсан бүртгэлд хамрагдана. Утсаар (7011-8589) холбоо барьж мэдээлэл авч болно.' },
      { title: '2. Материал бүрдүүлэх', body: 'Иргэний үнэмлэхний хуулбар, дүнгийн тодорхойлолт, эрүүл мэндийн хуудас, өргөдөл зэргийг бүрдүүлэн авчирна.' },
      { title: '3. Ярилцлага / шалгалт', body: 'Япон хэлний онцлох ангид элсэх бол ерөнхий мэдлэгийн тест + ярилцлага хийгдэнэ.' },
      { title: '4. Шийдвэр + гэрээ', body: 'Шалгалтын дүн гарсны дараа сургалтын гэрээ байгуулна. Анхны ангид хичээл эхлэх өдөр бүртгэлээ баталгаажуулна.' },
    ],
    docsTitle: 'БҮРДҮҮЛЭХ МАТЕРИАЛ',
    docs: [
      '9-р ангийн жилийн эцсийн дүнгийн тодорхойлолт (эх)',
      '9 жилийн боловсролын гэрчилгээ (хуулбар)',
      'Иргэний үнэмлэхний хуулбар (сурагч + эцэг эх)',
      'Эрүүл мэндийн хуудас (М-Д хэвлэмэл маягт)',
      '3×4 хэмжээний 2 хувь зураг',
      'Элсэлтийн өргөдөл (сургуулиас өгнө)',
    ],
    timelineTitle: 'ХУГАЦАА',
    timeline: [
      { date: '5–6 сар', event: 'Урьдчилсан бүртгэл нээлттэй' },
      { date: '6–7 сар', event: 'Материал хүлээн авах хугацаа' },
      { date: '7 сар', event: 'Ярилцлага, шалгалт' },
      { date: '8 сар', event: 'Дүн зарлах, гэрээ байгуулах' },
      { date: '9 сар', event: 'Хичээл эхлэх' },
    ],
    tuitionTitle: 'Сургалтын төлбөр, тэтгэлгийн боломж',
    tuitionBody:
      'Сургалтын төлбөр болон тэтгэлгийн боломжуудын тухай мэдээлэл элсэлтийн хугацаанд өргөдөл өгсөн сурагч, эцэг эхэд тус тус танилцуулга хийгдэнэ. Эх сургуулийн япон тэтгэлэгт хамрагдах, солилцооны хөтөлбөрт орох боломжийг хэлэлцэх боломжтой.',
    tuitionPhoneCta: 'Утасаар лавлах',
    tuitionContactCta: 'Холбоо барих',
    formSectionTitle: 'ЦАХИМААР БҮРТГҮҮЛЭХ',
    formSectionSubtitle:
      '10-р ангид элсэх сурагчдад зориулсан урьдчилсан бүртгэлийн форм. Хариуцсан ажилтан тантай 1-2 өдрийн дотор холбогдоно.',
    bannerTitle: 'Соёл Эрдэм Ахлах Сургуульд тавтай морил',
    bannerCta: 'Танилцуулга үзэх',
    bannerSecondary: 'Сургалт',
    form: {
      studentSection: 'Сурагчийн мэдээлэл',
      studentNameLabel: 'Сурагчийн овог нэр *',
      studentNamePh: 'С. Сурагчийн нэр',
      studentBirthLabel: 'Төрсөн он, сар, өдөр',
      studentBirthPh: '2010-05-15',
      currentSchoolLabel: 'Одоо суралцаж буй сургууль (9-р анги)',
      currentSchoolPh: 'Жишээ: 5-р сургууль',
      currentGpaLabel: '9-р ангийн дундаж голч',
      currentGpaPh: '80%',
      trackLabel: 'Сонирхож буй чиглэл',
      trackUndecided: 'Сонгоогүй / Шийдээгүй',
      trackJapan: 'Япон хэл, соёл',
      trackIt: 'Мэдээллийн технологи (IT)',
      trackOther: 'Бусад / Хосолсон',
      guardianSection: 'Эцэг эх / Асран хамгаалагчийн мэдээлэл',
      guardianNameLabel: 'Овог нэр *',
      guardianNamePh: 'Б. Эцэг эх',
      guardianRelLabel: 'Сурагчтай ямар хамааралтай вэ?',
      guardianRelPh: 'Эх / Эцэг / Асран хамгаалагч',
      phoneLabel: 'Утас *',
      phonePh: '9999-9999',
      emailLabel: 'И-мэйл',
      emailPh: 'email@example.com',
      messageLabel: 'Нэмэлт асуулт / тайлбар',
      messagePh: 'Тэтгэлэг, дотуур байр, элсэлтийн талаар асуултаа бичнэ үү...',
      submitCta: 'Хүсэлт илгээх',
      errorSubmit: 'Илгээхэд алдаа гарлаа. Дахин оролдоно уу.',
      errorNetwork: 'Сүлжээний алдаа. Холболтоо шалгана уу.',
      successTitle: 'Таны бүртгэлийн хүсэлт амжилттай илгээгдлээ.',
      successBody: 'Хариуцсан ажилтан ажлын 1-2 өдрийн дотор танд утсаар эсвэл и-мэйлээр хариу өгнө.',
      successAgain: 'Дахин бүртгэх',
      requiredNote: '* тэмдэгтэй талбарууд заавал бөглөгдөнө. Таны мэдээлэл зөвхөн элсэлтийн зориулалтаар ашиглагдана.',
    },
  },
  EN: {
    heroTitle: 'ADMISSIONS',
    heroSubtitle: 'How to apply for grade 10 at Soyol Erdem Senior High School — requirements and process.',
    breadcrumbUniversity: 'University',
    breadcrumbHs: 'High school',
    breadcrumbThis: 'Admissions',
    introBadge: '2026–2027 academic year',
    introTitle: 'Start your future at Soyol Erdem',
    introBody:
      'Soyol Erdem Senior High School delivers quality secondary education specialised in Japanese language, culture and information technology across grades 10, 11 and 12. We are built on our parent institution\'s 30-year Japanese-studies tradition and on its network of cooperation with 30+ Japanese universities.',
    infoBox: {
      enrolLabel: 'Intake',
      enrolValue: 'Grade 10',
      yearLabel: 'Academic year',
      yearValue: '2026–2027',
      formatLabel: 'Format',
      formatValue: 'Day, full-time',
      trackLabel: 'Specialisation',
      trackValue: 'Japanese / IT',
    },
    applyCardTitle: 'Apply online',
    applyCardBody:
      'Submit your grade 10 application through the online form. Our admissions officer will be in touch within 1–2 working days.',
    applyCardCta: 'Fill in the online form',
    directContactEyebrow: 'Direct contact / enquiries',
    phoneLabel: 'Phone',
    mobileLabel: 'Mobile',
    emailLabel: 'Email',
    requirementsTitle: 'ADMISSION REQUIREMENTS',
    requirements: [
      {
        title: '9-year basic-education certificate',
        body: 'Open to students who have completed grade 9 in the current academic year and hold a 9-year basic-education certificate.',
      },
      {
        title: 'GPA above 70',
        body: 'A grade 9 final-year average GPA above 70% is required.',
      },
      {
        title: 'Interest in Japanese or IT',
        body: 'For students interested in Japanese language and culture or IT, who would like to continue their studies in Japan or pursue an IT career.',
      },
      {
        title: 'Decided together with parents / guardians',
        body: 'The application materials should reflect a joint decision between the student and the parents.',
      },
    ],
    stepsTitle: 'APPLICATION STEPS',
    stepsSubtitle: 'Four steps to enrol at our high school.',
    steps: [
      { title: '1. Pre-register', body: 'Fill in the form below to pre-register. You can also call (7011-8589) for information.' },
      { title: '2. Prepare documents', body: 'Bring an ID card copy, school-grade certificate, health record and your written application.' },
      { title: '3. Interview / test', body: 'For the specialised Japanese-language track, a general-knowledge test and interview are conducted.' },
      { title: '4. Decision + enrolment', body: "After the results we sign the enrolment agreement; you then confirm your enrolment on the first day of class." },
    ],
    docsTitle: 'REQUIRED DOCUMENTS',
    docs: [
      'Original grade 9 final-year transcript',
      'Copy of the 9-year basic-education certificate',
      "Copies of the student's and the parents' ID cards",
      'Health record (M-D printed form)',
      '2 × 3 × 4 photos',
      'Application letter (provided by the school)',
    ],
    timelineTitle: 'TIMELINE',
    timeline: [
      { date: 'May–Jun', event: 'Pre-registration opens' },
      { date: 'Jun–Jul', event: 'Document submission window' },
      { date: 'Jul', event: 'Interview & test' },
      { date: 'Aug', event: 'Results & enrolment agreement' },
      { date: 'Sep', event: 'Classes begin' },
    ],
    tuitionTitle: 'Tuition & scholarship options',
    tuitionBody:
      'Tuition details and scholarship options are introduced individually to applicants and their families during the admissions process. We can also discuss eligibility for our parent institution\'s Japan-side scholarships and exchange programmes.',
    tuitionPhoneCta: 'Call to enquire',
    tuitionContactCta: 'Contact us',
    formSectionTitle: 'APPLY ONLINE',
    formSectionSubtitle:
      'Pre-registration form for prospective grade 10 students. Our admissions officer will be in touch within 1–2 working days.',
    bannerTitle: 'Welcome to Soyol Erdem Senior High School',
    bannerCta: 'About us',
    bannerSecondary: 'Programmes',
    form: {
      studentSection: 'Student information',
      studentNameLabel: "Student's full name *",
      studentNamePh: "Student's name",
      studentBirthLabel: 'Date of birth',
      studentBirthPh: '2010-05-15',
      currentSchoolLabel: 'Current school (grade 9)',
      currentSchoolPh: 'e.g. School No. 5',
      currentGpaLabel: 'Grade 9 GPA',
      currentGpaPh: '80%',
      trackLabel: 'Track of interest',
      trackUndecided: 'Not yet decided',
      trackJapan: 'Japanese language & culture',
      trackIt: 'Information technology (IT)',
      trackOther: 'Other / Combined',
      guardianSection: 'Parent / guardian information',
      guardianNameLabel: 'Full name *',
      guardianNamePh: "Parent's name",
      guardianRelLabel: 'Relationship to the student',
      guardianRelPh: 'Mother / Father / Guardian',
      phoneLabel: 'Phone *',
      phonePh: '+976 9999 9999',
      emailLabel: 'Email',
      emailPh: 'email@example.com',
      messageLabel: 'Additional questions / notes',
      messagePh: 'Questions about scholarships, dormitory, admissions…',
      submitCta: 'Submit application',
      errorSubmit: 'Something went wrong. Please try again.',
      errorNetwork: 'Network error. Please check your connection.',
      successTitle: 'Your application has been submitted.',
      successBody: 'Our admissions officer will reach out by phone or email within 1–2 working days.',
      successAgain: 'Submit another',
      requiredNote: '* required fields. Your information is used only for admissions purposes.',
    },
  },
  JP: {
    heroTitle: '入学案内',
    heroSubtitle: 'ソヨル・エルデム高等学校10年生（高校1年生相当）への出願手順と条件。',
    breadcrumbUniversity: '大学',
    breadcrumbHs: '高等学校',
    breadcrumbThis: '入学案内',
    introBadge: '2026〜2027年度',
    introTitle: 'ソヨル・エルデムから未来を始めよう',
    introBody:
      'ソヨル・エルデム高等学校は、10〜11〜12年生において日本語・日本文化・情報技術に特化した質の高い中等教育を提供しています。母体ソヨル・エルデム大学の30年にわたる日本研究の蓄積と、日本の30以上の大学との連携ネットワークに支えられています。',
    infoBox: {
      enrolLabel: '募集学年',
      enrolValue: '10年生',
      yearLabel: '学年度',
      yearValue: '2026〜2027',
      formatLabel: '形態',
      formatValue: '昼間・全日制',
      trackLabel: '専門コース',
      trackValue: '日本語 / IT',
    },
    applyCardTitle: 'オンライン出願',
    applyCardBody:
      '10年生への出願はオンラインフォームからお願いします。担当者より1〜2営業日以内にご連絡いたします。',
    applyCardCta: 'オンラインフォームを開く',
    directContactEyebrow: 'お問い合わせ / 直接連絡',
    phoneLabel: '電話',
    mobileLabel: '携帯',
    emailLabel: 'メール',
    requirementsTitle: '出願条件',
    requirements: [
      {
        title: '9年制基礎教育修了証保持',
        body: '当該年度に9年生を修了し、基礎教育修了証を有する生徒が対象です。',
      },
      {
        title: '評定平均70以上',
        body: '9年生の年度末成績の平均評定が70%以上であること。',
      },
      {
        title: '日本語・ITに関心',
        body: '日本語・日本文化または情報技術に関心があり、将来日本への進学またはIT分野への進路を希望する生徒。',
      },
      {
        title: '保護者と相談済み',
        body: '生徒と保護者が共同で意思決定し、出願書類を整えていること。',
      },
    ],
    stepsTitle: '出願手順',
    stepsSubtitle: '4ステップで入学手続きが完了します。',
    steps: [
      { title: '1. 仮登録', body: '下記フォームで仮登録を行います。お電話（7011-8589）でもご案内いたします。' },
      { title: '2. 書類準備', body: '身分証コピー、成績証明、健康診断書、願書をご準備ください。' },
      { title: '3. 面接 / 試験', body: '日本語特別クラス志望の場合は、一般知識テスト＋面接を実施します。' },
      { title: '4. 合否 + 契約', body: '結果発表後に入学契約を締結し、初日に登録を確定します。' },
    ],
    docsTitle: '必要書類',
    docs: [
      '9年生年度末成績証明書（原本）',
      '9年制基礎教育修了証（コピー）',
      '生徒・保護者の身分証コピー',
      '健康診断書（指定様式）',
      '3×4写真 2枚',
      '入学願書（学校で配布）',
    ],
    timelineTitle: 'スケジュール',
    timeline: [
      { date: '5〜6月', event: '仮登録受付' },
      { date: '6〜7月', event: '書類受付期間' },
      { date: '7月', event: '面接・試験' },
      { date: '8月', event: '合否発表・入学契約' },
      { date: '9月', event: '授業開始' },
    ],
    tuitionTitle: '学費・奨学金について',
    tuitionBody:
      '学費および奨学金の詳細は、出願後、生徒・保護者へ個別にご案内いたします。母体大学の日本側奨学金や交換留学プログラムへの参加可否についてもご相談いただけます。',
    tuitionPhoneCta: '電話で問い合わせ',
    tuitionContactCta: 'お問い合わせ',
    formSectionTitle: 'オンライン出願',
    formSectionSubtitle:
      '10年生志望者のための仮登録フォーム。担当者より1〜2営業日以内にご連絡いたします。',
    bannerTitle: 'ソヨル・エルデム高等学校へようこそ',
    bannerCta: '学校紹介',
    bannerSecondary: 'プログラム',
    form: {
      studentSection: '生徒情報',
      studentNameLabel: '生徒氏名 *',
      studentNamePh: '山田 太郎',
      studentBirthLabel: '生年月日',
      studentBirthPh: '2010-05-15',
      currentSchoolLabel: '現在在籍校（9年生）',
      currentSchoolPh: '例：第5学校',
      currentGpaLabel: '9年生の評定平均',
      currentGpaPh: '80%',
      trackLabel: '希望コース',
      trackUndecided: '未定',
      trackJapan: '日本語・日本文化',
      trackIt: '情報技術（IT）',
      trackOther: 'その他 / 複合',
      guardianSection: '保護者情報',
      guardianNameLabel: '氏名 *',
      guardianNamePh: '保護者氏名',
      guardianRelLabel: '生徒との続柄',
      guardianRelPh: '母 / 父 / 保護者',
      phoneLabel: '電話 *',
      phonePh: '+976 9999 9999',
      emailLabel: 'メール',
      emailPh: 'email@example.com',
      messageLabel: 'ご質問・備考',
      messagePh: '奨学金、寮、出願に関するご質問をお書きください…',
      submitCta: '出願を送信',
      errorSubmit: '送信に失敗しました。もう一度お試しください。',
      errorNetwork: 'ネットワークエラー。接続をご確認ください。',
      successTitle: '出願を受け付けました。',
      successBody: '担当者より1〜2営業日以内にお電話またはメールでご連絡いたします。',
      successAgain: 'もう一件送信',
      requiredNote: '* は必須項目です。お預かりした情報は入学手続きのみに使用します。',
    },
  },
};

/* ───────────────────── Careers / apply form ──────────────────────── */

interface CareersApplyBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbCareers: string;
  breadcrumbThis: string;
  /** Bottom-of-form submit button. */
  submitCta: string;
  /** Sentinel position appended to the choices list so applicants
   *  without a matching listing aren't dead-ended. */
  otherPosition: string;
  /** Toast strings — kept short so they fit the toast width. */
  errorRequired: { name: string; email: string; phone: string; position: string };
  errorSubmit: string;
  errorNetwork: string;
  successToast: string;
  successTitle: string;
  successBody: string;
  successBackCta: string;
  successHomeCta: string;
  /** Section headings (numbered 1–7). */
  sections: {
    general: string;
    position: string;
    education: string;
    experience: string;
    teaching: string;
    skills: string;
    extra: string;
  };
  /** Field labels + placeholders + hints. Grouped by section so the
   *  client component can shallow-destructure. */
  fields: {
    fullName: string;
    fullNamePh: string;
    birth: string;
    phone: string;
    phonePh: string;
    email: string;
    emailPh: string;
    address: string;
    addressPh: string;
    eduSchool: string;
    eduMajor: string;
    eduDegree: string;
    eduDegreePh: string;
    eduYear: string;
    eduYearPh: string;
    expOrg: string;
    expRole: string;
    expDuration: string;
    expDurationPh: string;
    expDuties: string;
    tchUniversity: string;
    tchUniversityPh: string;
    tchSubjects: string;
    tchResearch: string;
    tchPublications: string;
    tchPublicationsPh: string;
    skDigital: string;
    skLanguages: string;
    skLanguagesPh: string;
    skTools: string;
    skToolsPh: string;
    motReason: string;
    motStrengths: string;
    motAvailable: string;
    motAvailablePh: string;
    cvUrl: string;
    cvUrlHint: string;
    diplomaUrl: string;
    diplomaUrlHint: string;
  };
  required: string;
}

export const CAREERS_APPLY_CONTENT: Record<Language, CareersApplyBundle> = {
  MN: {
    heroTitle: 'АЖЛЫН АНКЕТ',
    heroSubtitle:
      '7 хэсэгтэй анкетыг бөглөн илгээснээр манай хүний нөөцийн алба тантай холбогдоно.',
    breadcrumbHome: 'Нүүр',
    breadcrumbCareers: 'Нээлттэй ажлын байр',
    breadcrumbThis: 'Анкет',
    submitCta: 'Анкет илгээх',
    otherPosition: 'Бусад',
    errorRequired: {
      name: 'Овог, нэр оруулна уу.',
      email: 'И-мэйл хаяг хүчин төгөлдөр биш.',
      phone: 'Утасны дугаар хүчин төгөлдөр биш.',
      position: 'Ажлын байраа сонгоно уу.',
    },
    errorSubmit: 'Илгээхэд алдаа гарлаа.',
    errorNetwork: 'Сүлжээний алдаа. Дахин оролдоно уу.',
    successToast: 'Анкет амжилттай илгээгдлээ!',
    successTitle: 'Анкет амжилттай илгээгдлээ',
    successBody:
      'Манай хүний нөөцийн алба тантай удахгүй холбогдоно. И-мэйл хаягтайгаа танилцаж, спам хавтсыг шалгахаа бүү мартаарай.',
    successBackCta: 'Нээлттэй ажлын байр руу буцах',
    successHomeCta: 'Нүүр хуудас',
    sections: {
      general: 'Ерөнхий мэдээлэл',
      position: 'Аль ажлын байранд хүсэлт гаргаж байна вэ?',
      education: 'Боловсролын мэдээлэл',
      experience: 'Ажлын туршлага',
      teaching: 'Багшлах туршлага',
      skills: 'Ур чадвар',
      extra: 'Нэмэлт мэдээлэл',
    },
    fields: {
      fullName: 'Овог, нэр',
      fullNamePh: 'Жишээ: Доржийн Тэмүүлэн',
      birth: 'Төрсөн он, сар, өдөр',
      phone: 'Холбоо барих утас',
      phonePh: '9911-2233',
      email: 'И-мэйл хаяг',
      emailPh: 'example@gmail.com',
      address: 'Оршин суугаа хаяг',
      addressPh: 'Жишээ: Сүхбаатар дүүрэг, 1-р хороо…',
      eduSchool: 'Төгссөн сургууль',
      eduMajor: 'Мэргэжил',
      eduDegree: 'Боловсролын зэрэг',
      eduDegreePh: 'Бакалавр / Магистр / Доктор',
      eduYear: 'Төгссөн он',
      eduYearPh: '2020',
      expOrg: 'Өмнө ажиллаж байсан байгууллага',
      expRole: 'Албан тушаал',
      expDuration: 'Ажилласан хугацаа',
      expDurationPh: '2018–2024',
      expDuties: 'Гол үүрэг, хариуцлага',
      tchUniversity: 'Их, дээд сургуульд багшилж байсан эсэх',
      tchUniversityPh: 'Тийм / Үгүй (хаана?)',
      tchSubjects: 'Зааж байсан хичээлүүд',
      tchResearch: 'Судалгааны чиглэл',
      tchPublications: 'Хэвлүүлсэн бүтээл, илтгэл',
      tchPublicationsPh: 'Гарсан бүтээл, эрдэм шинжилгээний илтгэл г.м.',
      skDigital: 'Компьютер, дижитал сургалтын хэрэгсэл',
      skLanguages: 'Гадаад хэлний мэдлэг',
      skLanguagesPh: 'Япон N2, Англи C1…',
      skTools: 'Ашигладаг хэрэгслүүд',
      skToolsPh: 'Moodle, Google Classroom, PowerPoint, Canva…',
      motReason: 'Манай сургуульд ажиллах хүсэлтэй шалтгаан',
      motStrengths: 'Өөрийн давуу тал',
      motAvailable: 'Ажилд орох боломжтой хугацаа',
      motAvailablePh: 'Шууд / 2 долоо хоногийн дараа…',
      cvUrl: 'CV-ийн URL (Google Drive, Dropbox…)',
      cvUrlHint: 'CV-г онлайн хаягт байршуулаад линкийг энд оруулна уу.',
      diplomaUrl: 'Дипломын хуулбарын URL',
      diplomaUrlHint: 'Скан хуулбарыг онлайн хаягт байршуулаад линкийг оруулна.',
    },
    required: '*',
  },
  EN: {
    heroTitle: 'JOB APPLICATION',
    heroSubtitle:
      'Submit our 7-section application form and our HR team will be in touch.',
    breadcrumbHome: 'Home',
    breadcrumbCareers: 'Careers',
    breadcrumbThis: 'Application',
    submitCta: 'Submit application',
    otherPosition: 'Other',
    errorRequired: {
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      position: 'Please choose a position.',
    },
    errorSubmit: 'Something went wrong.',
    errorNetwork: 'Network error. Please try again.',
    successToast: 'Application submitted!',
    successTitle: 'Application submitted',
    successBody:
      "Our HR team will be in touch shortly. Please keep an eye on your inbox, and don't forget to check your spam folder.",
    successBackCta: 'Back to careers',
    successHomeCta: 'Home',
    sections: {
      general: 'General information',
      position: 'Which position are you applying for?',
      education: 'Education',
      experience: 'Work experience',
      teaching: 'Teaching experience',
      skills: 'Skills',
      extra: 'Additional information',
    },
    fields: {
      fullName: 'Full name',
      fullNamePh: 'e.g. John Doe',
      birth: 'Date of birth',
      phone: 'Phone',
      phonePh: '+976 9911 2233',
      email: 'Email',
      emailPh: 'example@gmail.com',
      address: 'Address',
      addressPh: 'e.g. Sukhbaatar District, 1st Khoroo…',
      eduSchool: 'University attended',
      eduMajor: 'Major',
      eduDegree: 'Degree',
      eduDegreePh: 'Bachelor / Master / Doctor',
      eduYear: 'Year graduated',
      eduYearPh: '2020',
      expOrg: 'Previous employer',
      expRole: 'Position',
      expDuration: 'Duration',
      expDurationPh: '2018–2024',
      expDuties: 'Key responsibilities',
      tchUniversity: 'Previously taught at a university?',
      tchUniversityPh: 'Yes / No (where?)',
      tchSubjects: 'Subjects taught',
      tchResearch: 'Research area',
      tchPublications: 'Publications & talks',
      tchPublicationsPh: 'Papers, conference talks, etc.',
      skDigital: 'Computer & digital teaching tools',
      skLanguages: 'Foreign-language proficiency',
      skLanguagesPh: 'Japanese N2, English C1…',
      skTools: 'Tools you use',
      skToolsPh: 'Moodle, Google Classroom, PowerPoint, Canva…',
      motReason: 'Why do you want to work here?',
      motStrengths: 'Your strengths',
      motAvailable: 'When can you start?',
      motAvailablePh: 'Immediately / In 2 weeks…',
      cvUrl: 'CV URL (Google Drive, Dropbox…)',
      cvUrlHint: 'Upload your CV online and paste the link here.',
      diplomaUrl: 'Diploma URL',
      diplomaUrlHint: 'Upload a scan online and paste the link.',
    },
    required: '*',
  },
  JP: {
    heroTitle: '求人応募',
    heroSubtitle:
      '7セクションの応募フォームを送信いただくと、人事部より追ってご連絡いたします。',
    breadcrumbHome: 'ホーム',
    breadcrumbCareers: '採用情報',
    breadcrumbThis: '応募',
    submitCta: '応募を送信',
    otherPosition: 'その他',
    errorRequired: {
      name: 'お名前をご入力ください。',
      email: 'メールアドレスが正しくありません。',
      phone: '電話番号が正しくありません。',
      position: '応募する職種を選択してください。',
    },
    errorSubmit: '送信に失敗しました。',
    errorNetwork: 'ネットワークエラー。もう一度お試しください。',
    successToast: '応募を送信しました！',
    successTitle: '応募を受け付けました',
    successBody:
      '人事部より追ってご連絡いたします。受信トレイをご確認いただき、迷惑メールフォルダもお忘れなくご確認ください。',
    successBackCta: '採用情報へ戻る',
    successHomeCta: 'ホーム',
    sections: {
      general: '基本情報',
      position: 'ご応募の職種を選択してください',
      education: '学歴',
      experience: '職歴',
      teaching: '教歴',
      skills: 'スキル',
      extra: '追加情報',
    },
    fields: {
      fullName: '氏名',
      fullNamePh: '例：山田 太郎',
      birth: '生年月日',
      phone: '電話番号',
      phonePh: '+976 9911 2233',
      email: 'メールアドレス',
      emailPh: 'example@gmail.com',
      address: '住所',
      addressPh: '例：スフバートル区、第1ホロー…',
      eduSchool: '出身校',
      eduMajor: '専攻',
      eduDegree: '学位',
      eduDegreePh: '学士 / 修士 / 博士',
      eduYear: '卒業年',
      eduYearPh: '2020',
      expOrg: '前職の勤務先',
      expRole: '役職',
      expDuration: '勤務期間',
      expDurationPh: '2018〜2024',
      expDuties: '主な業務内容',
      tchUniversity: '大学での教歴の有無',
      tchUniversityPh: '有 / 無（勤務先）',
      tchSubjects: '担当科目',
      tchResearch: '研究分野',
      tchPublications: '発表論文・著作',
      tchPublicationsPh: '論文、学会発表など',
      skDigital: 'PC・デジタル教育ツール',
      skLanguages: '外国語能力',
      skLanguagesPh: '日本語N2、英語C1…',
      skTools: '使用ツール',
      skToolsPh: 'Moodle、Google Classroom、PowerPoint、Canva…',
      motReason: '当校で働きたい理由',
      motStrengths: 'あなたの強み',
      motAvailable: '勤務開始可能時期',
      motAvailablePh: '即日 / 2週間後…',
      cvUrl: '履歴書URL（Google Drive、Dropboxなど）',
      cvUrlHint: '履歴書をオンラインにアップロードし、リンクを貼り付けてください。',
      diplomaUrl: '卒業証明書URL',
      diplomaUrlHint: 'スキャンをオンラインにアップロードし、リンクを貼り付けてください。',
    },
    required: '*',
  },
};

/* ───────────────────── High-school / contact ─────────────────────── */

interface HsContactBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbUniversity: string;
  breadcrumbHs: string;
  breadcrumbThis: string;
  contactsTitle: string;
  phonePrimaryLabel: string;
  phoneSecondaryLabel: string;
  emailLabel: string;
  addressLabel: string;
  addressLine: string;
  hoursLabel: string;
  hoursValue: string;
  hoursWeekend: string;
  messageTitle: string;
  messageCardTitle: string;
  messageCardBody: string;
  messageFormCta: string;
  messageEmailCta: string;
  admissionPreviewTitle: string;
  admissionPreviewBody: string;
  admissionPreviewCta: string;
}

export const HS_CONTACT_CONTENT: Record<Language, HsContactBundle> = {
  MN: {
    heroTitle: 'ХОЛБОО БАРИХ',
    heroSubtitle:
      'Лавлах, элсэлт, хамтын ажиллагааны санал — бидэнтэй чөлөөтэй холбоо барина уу.',
    breadcrumbUniversity: 'Дээд сургууль',
    breadcrumbHs: 'Ахлах сургууль',
    breadcrumbThis: 'Холбоо барих',
    contactsTitle: 'ТАНТАЙ ХОЛБОГДОХ',
    phonePrimaryLabel: 'Утас (Сургуулийн дугаар)',
    phoneSecondaryLabel: 'Утас (Гар утас)',
    emailLabel: 'И-мэйл',
    addressLabel: 'Хаяг',
    addressLine: 'Улаанбаатар хот, Сүхбаатар дүүрэг,\n1-р хороо, Олимпийн гудамж',
    hoursLabel: 'Ажиллах цаг',
    hoursValue: 'Даваа–Баасан, 08:00–17:00',
    hoursWeekend: 'Бямба, Ням — амрах өдөр',
    messageTitle: 'МЭДЭЭЛЭЛ ИЛГЭЭХ',
    messageCardTitle: 'Хамтын ажиллагаа, элсэлт, лавлах',
    messageCardBody:
      'Их сургуультай хамтран ажилладаг ерөнхий лавлах формыг ашиглан санал хүсэлтээ илгээж болно. Тус формыг хариуцсан ажилтан тантай 24 цагийн дотор холбоо барина.',
    messageFormCta: 'Лавлах форм',
    messageEmailCta: 'Шууд и-мэйл',
    admissionPreviewTitle: 'Элсэлтийн бэлтгэлийн тойм',
    admissionPreviewBody:
      '2026-2027 оны хичээлийн жилийн элсэлт нээлттэй. Шаардлага, бүрдүүлэх материал, хугацааны мэдээллийг элсэлтийн хуудаснаас үзнэ үү.',
    admissionPreviewCta: 'Элсэлтийн мэдээлэл',
  },
  EN: {
    heroTitle: 'CONTACT',
    heroSubtitle:
      'Enquiries, admissions, partnership proposals — feel free to reach out.',
    breadcrumbUniversity: 'University',
    breadcrumbHs: 'High school',
    breadcrumbThis: 'Contact',
    contactsTitle: 'GET IN TOUCH',
    phonePrimaryLabel: 'Phone (school)',
    phoneSecondaryLabel: 'Phone (mobile)',
    emailLabel: 'Email',
    addressLabel: 'Address',
    addressLine: 'Olympic Street, 1st Khoroo,\nSukhbaatar District, Ulaanbaatar',
    hoursLabel: 'Opening hours',
    hoursValue: 'Mon–Fri, 08:00–17:00',
    hoursWeekend: 'Sat–Sun — closed',
    messageTitle: 'SEND US A MESSAGE',
    messageCardTitle: 'Partnerships, admissions, enquiries',
    messageCardBody:
      "You can submit your enquiry through the university's shared contact form. Our team typically responds within 24 hours.",
    messageFormCta: 'Contact form',
    messageEmailCta: 'Email directly',
    admissionPreviewTitle: 'Admissions overview',
    admissionPreviewBody:
      'Admissions for the 2026–2027 academic year are open. See requirements, documents and timeline on the admissions page.',
    admissionPreviewCta: 'Admission details',
  },
  JP: {
    heroTitle: 'お問い合わせ',
    heroSubtitle:
      'お問い合わせ・入学相談・連携のご提案 ― お気軽にご連絡ください。',
    breadcrumbUniversity: '大学',
    breadcrumbHs: '高等学校',
    breadcrumbThis: 'お問い合わせ',
    contactsTitle: 'お問い合わせ先',
    phonePrimaryLabel: '電話（代表）',
    phoneSecondaryLabel: '電話（携帯）',
    emailLabel: 'メール',
    addressLabel: '住所',
    addressLine: 'モンゴル国ウランバートル市スフバートル区\n第1ホロー、オリンピック通り',
    hoursLabel: '受付時間',
    hoursValue: '月〜金、08:00〜17:00',
    hoursWeekend: '土日 ― 休業',
    messageTitle: 'メッセージを送る',
    messageCardTitle: '連携・入学・お問い合わせ',
    messageCardBody:
      '大学共通のお問い合わせフォームよりご質問・ご要望をお送りいただけます。担当者より24時間以内にご連絡いたします。',
    messageFormCta: 'お問い合わせフォーム',
    messageEmailCta: 'メールで直接',
    admissionPreviewTitle: '入学案内 概要',
    admissionPreviewBody:
      '2026〜2027年度の入学受付中。条件・必要書類・スケジュールは入学案内ページをご覧ください。',
    admissionPreviewCta: '入学案内',
  },
};

/* ───────────────────── Admission register (online) ───────────────── */

interface RegisterBundle {
  heroTitle: string;
  heroSubtitle: string;
  breadcrumbHome: string;
  breadcrumbAdmission: string;
  breadcrumbThis: string;
  steps: string[]; // 8 step labels, indexed 0-7
  /** Template with {current} and {total} placeholders — kept as a
   *  plain string (not a function) so the server can serialise it
   *  across the client-component boundary. */
  stepLabel: string;
  selectPlaceholder: string;
  educationOptions: string[]; // 5 entries
  citizenshipMongolian: string;
  citizenshipForeign: string;
  bachelor: string;
  master: string;
  programLabel: string;
  programEmpty: string;
  programEmptyLinkLabel: string;
  lastNameLabel: string;
  lastNamePh: string;
  firstNameLabel: string;
  firstNamePh: string;
  educationLevelLabel: string;
  examScoresIntro: string;
  examSubjectPh: string;
  examScorePh: string;
  addSubject: string;
  phonesIntro: string;
  phonePh: string;
  addPhone: string;
  emailLabel: string;
  emailPh: string;
  removeAria: string;
  prevBtn: string;
  nextBtn: string;
  submitBtn: string;
  validation: {
    citizenship: string;
    degree: string;
    program: string;
    lastName: string;
    firstName: string;
    education: string;
    examNone: string;
    /** Template with {subject} placeholder. */
    examNumber: string;
    phone: string;
    email: string;
  };
  errorSubmit: string;
  errorNetwork: string;
  successToast: string;
  successTitle: string;
  successBody: string;
  successAdmissionCta: string;
  successHomeCta: string;
}

export const REGISTER_CONTENT: Record<Language, RegisterBundle> = {
  MN: {
    heroTitle: 'ЭЛСЭЛТИЙН ЦАХИМ БҮРТГЭЛ',
    heroSubtitle:
      'Доорх 8 алхамтай анкетыг бөглөнө үү. Бүх асуултанд хариулсны дараа таны бүртгэл бидэнд илгээгдэнэ.',
    breadcrumbHome: 'Нүүр',
    breadcrumbAdmission: 'Элсэлт',
    breadcrumbThis: 'Цахим бүртгэл',
    steps: [
      'Иргэншил',
      'Зэрэг',
      'Хөтөлбөр',
      'Овог, нэр',
      'Боловсрол',
      'ЭЕШ-ын оноо',
      'Утас',
      'И-мэйл',
    ],
    stepLabel: 'Алхам {current} / {total}',
    selectPlaceholder: '— сонгох —',
    educationOptions: [
      'Бүрэн дунд боловсрол',
      'Тусгай мэргэжлийн дунд (МСҮТ / коллеж)',
      'Бакалавр',
      'Магистр',
      'Доктор',
    ],
    citizenshipMongolian: 'Монгол улсын иргэн',
    citizenshipForeign: 'Гадаадын иргэн',
    bachelor: 'Бакалавр',
    master: 'Магистр',
    programLabel: 'Хөтөлбөр',
    programEmpty:
      'Энэ зэрэгт хамаарах хөтөлбөр одоохондоо нийтлэгдээгүй байна. Та {link} уу.',
    programEmptyLinkLabel: 'бидэнтэй холбогдоно',
    lastNameLabel: 'Овог',
    lastNamePh: 'Жишээ: Доржийн',
    firstNameLabel: 'Нэр',
    firstNamePh: 'Жишээ: Тэмүүлэн',
    educationLevelLabel: 'Боловсролын түвшин',
    examScoresIntro: 'Дээд тал нь 3 хичээлийн оноог оруулна уу.',
    examSubjectPh: 'Хичээл (Монгол хэл, Математик, …)',
    examScorePh: 'Оноо',
    addSubject: 'Хичээл нэмэх',
    phonesIntro: 'Дээд тал нь 3 утасны дугаар оруулна уу.',
    phonePh: '9911-2233',
    addPhone: 'Утас нэмэх',
    emailLabel: 'И-мэйл хаяг',
    emailPh: 'example@gmail.com',
    removeAria: 'Устгах',
    prevBtn: 'Өмнөх',
    nextBtn: 'Дараагийн',
    submitBtn: 'Анкет илгээх',
    validation: {
      citizenship: 'Иргэншлээ сонгоно уу.',
      degree: 'Боловсролын зэргээ сонгоно уу.',
      program: 'Хөтөлбөр сонгоно уу.',
      lastName: 'Овог оруулна уу.',
      firstName: 'Нэр оруулна уу.',
      education: 'Боловсролын түвшин сонгоно уу.',
      examNone: 'Дор хаяж нэг хичээлийн оноо оруулна уу.',
      examNumber: '"{subject}" — оноо тоогоор бичигдсэн байх ёстой.',
      phone: 'Дор хаяж нэг утасны дугаар оруулна уу.',
      email: 'И-мэйл хаяг хүчин төгөлдөр биш байна.',
    },
    errorSubmit: 'Илгээхэд алдаа гарлаа.',
    errorNetwork: 'Сүлжээний алдаа. Дахин оролдоно уу.',
    successToast: 'Анкет амжилттай илгээгдлээ!',
    successTitle: 'Анкет амжилттай илгээгдлээ',
    successBody:
      'Манай элсэлтийн алба тантай удахгүй холбогдоно. И-мэйл хаягтайгаа танилцаж, спам хавтсыг шалгахаа бүү мартаарай.',
    successAdmissionCta: 'Элсэлтийн хуудас руу буцах',
    successHomeCta: 'Нүүр хуудас',
  },
  EN: {
    heroTitle: 'ONLINE ADMISSION FORM',
    heroSubtitle:
      'Please complete the 8-step form below. Once you have answered every question, your application will be sent to us.',
    breadcrumbHome: 'Home',
    breadcrumbAdmission: 'Admission',
    breadcrumbThis: 'Online application',
    steps: [
      'Citizenship',
      'Degree',
      'Programme',
      'Full name',
      'Education',
      'Exam scores',
      'Phone',
      'Email',
    ],
    stepLabel: 'Step {current} / {total}',
    selectPlaceholder: '— select —',
    educationOptions: [
      'Secondary (high school) graduate',
      'Vocational secondary (vocational college)',
      "Bachelor's",
      "Master's",
      'Doctorate',
    ],
    citizenshipMongolian: 'Mongolian citizen',
    citizenshipForeign: 'International applicant',
    bachelor: "Bachelor's",
    master: "Master's",
    programLabel: 'Programme',
    programEmpty:
      "No programmes are currently published at this level. Please {link}.",
    programEmptyLinkLabel: 'contact us',
    lastNameLabel: 'Last name',
    lastNamePh: 'e.g. Dorjiin',
    firstNameLabel: 'First name',
    firstNamePh: 'e.g. Temuulen',
    educationLevelLabel: 'Education level',
    examScoresIntro: 'Enter up to 3 subjects with their scores.',
    examSubjectPh: 'Subject (Mongolian, Mathematics, …)',
    examScorePh: 'Score',
    addSubject: 'Add subject',
    phonesIntro: 'Enter up to 3 phone numbers.',
    phonePh: '+976 9911 2233',
    addPhone: 'Add phone',
    emailLabel: 'Email address',
    emailPh: 'example@gmail.com',
    removeAria: 'Remove',
    prevBtn: 'Previous',
    nextBtn: 'Next',
    submitBtn: 'Submit application',
    validation: {
      citizenship: 'Please select your citizenship.',
      degree: 'Please select a degree level.',
      program: 'Please choose a programme.',
      lastName: 'Please enter your last name.',
      firstName: 'Please enter your first name.',
      education: 'Please select your education level.',
      examNone: 'Please enter at least one subject and score.',
      examNumber: '"{subject}" — the score must be a number.',
      phone: 'Please enter at least one phone number.',
      email: 'The email address is not valid.',
    },
    errorSubmit: 'Submission failed.',
    errorNetwork: 'Network error. Please try again.',
    successToast: 'Application submitted successfully!',
    successTitle: 'Application submitted',
    successBody:
      "Our admissions office will be in touch shortly. Please keep an eye on your inbox and don't forget to check your spam folder.",
    successAdmissionCta: 'Back to admissions',
    successHomeCta: 'Home',
  },
  JP: {
    heroTitle: 'オンライン入学願書',
    heroSubtitle:
      '下記8ステップのフォームをご記入ください。すべての項目に回答後、出願内容が本学に送信されます。',
    breadcrumbHome: 'ホーム',
    breadcrumbAdmission: '入学案内',
    breadcrumbThis: 'オンライン出願',
    steps: [
      '国籍',
      '学位',
      'プログラム',
      '氏名',
      '学歴',
      '試験成績',
      '電話',
      'メール',
    ],
    stepLabel: 'ステップ {current} / {total}',
    selectPlaceholder: '— 選択 —',
    educationOptions: [
      '中等教育修了（高校卒業）',
      '専門中等教育（職業専門学校）',
      '学士',
      '修士',
      '博士',
    ],
    citizenshipMongolian: 'モンゴル国民',
    citizenshipForeign: '外国人志願者',
    bachelor: '学士',
    master: '修士',
    programLabel: 'プログラム',
    programEmpty:
      'この学位レベルのプログラムは現在公開されておりません。{link}下さい。',
    programEmptyLinkLabel: 'お問い合わせ',
    lastNameLabel: '姓',
    lastNamePh: '例：ドルジ',
    firstNameLabel: '名',
    firstNamePh: '例：テムレン',
    educationLevelLabel: '学歴レベル',
    examScoresIntro: '最大3科目まで成績をご入力ください。',
    examSubjectPh: '科目（モンゴル語、数学、…）',
    examScorePh: '点数',
    addSubject: '科目を追加',
    phonesIntro: '最大3件まで電話番号をご入力ください。',
    phonePh: '+976 9911 2233',
    addPhone: '電話を追加',
    emailLabel: 'メールアドレス',
    emailPh: 'example@gmail.com',
    removeAria: '削除',
    prevBtn: '前へ',
    nextBtn: '次へ',
    submitBtn: '出願を送信',
    validation: {
      citizenship: '国籍を選択してください。',
      degree: '学位レベルを選択してください。',
      program: 'プログラムを選択してください。',
      lastName: '姓をご入力ください。',
      firstName: '名をご入力ください。',
      education: '学歴レベルを選択してください。',
      examNone: '少なくとも1科目とその点数を入力してください。',
      examNumber: '「{subject}」 ― 点数は数値でご入力ください。',
      phone: '少なくとも1件の電話番号をご入力ください。',
      email: 'メールアドレスの形式が正しくありません。',
    },
    errorSubmit: '送信に失敗しました。',
    errorNetwork: 'ネットワークエラー。もう一度お試しください。',
    successToast: '出願を送信しました！',
    successTitle: '出願を受け付けました',
    successBody:
      '入学事務局より追ってご連絡いたします。受信トレイをご確認いただき、迷惑メールフォルダもお忘れなくご確認ください。',
    successAdmissionCta: '入学案内に戻る',
    successHomeCta: 'ホーム',
  },
};

