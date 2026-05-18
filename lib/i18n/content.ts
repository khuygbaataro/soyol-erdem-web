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
  /** "{n} partner universities..." — `count` is substituted at render. */
  japanPartnersSubtitle: (count: number) => string;
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
    japanPartnersSubtitle: (n) =>
      `${n} их, дээд сургууль. Карт дээр дарж дэлгэрэнгүй танилцуулга, мэргэжил, тэтгэлгийн нөхцөлийг харна уу.`,
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
    japanPartnersSubtitle: (n) =>
      `${n} universities and colleges. Tap a card for the full profile, available majors and scholarship terms.`,
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
    japanPartnersSubtitle: (n) =>
      `${n}校の大学・短大。カードをクリックすると詳細なプロフィール、専攻、奨学金条件をご覧いただけます。`,
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
