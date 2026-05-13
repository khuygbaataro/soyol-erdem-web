import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  /* Users */
  const adminPassword = await bcrypt.hash('admin123', 10);
  const editorPassword = await bcrypt.hash('editor123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@soyolerdem.edu.mn' },
    update: {},
    create: {
      email: 'admin@soyolerdem.edu.mn',
      password: adminPassword,
      name: 'Захиргааны admin',
      role: 'ADMIN',
    },
  });
  await prisma.user.upsert({
    where: { email: 'editor@soyolerdem.edu.mn' },
    update: {},
    create: {
      email: 'editor@soyolerdem.edu.mn',
      password: editorPassword,
      name: 'Контент editor',
      role: 'EDITOR',
    },
  });
  console.log('✓ Users');

  /* Site settings */
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      schoolName: 'Соёл Эрдэм Дээд Сургууль',
      email: 'soyolerdem.daigaku@gmail.com',
      phonePrimary: '7011-8584',
      phoneSecondary: '7011-8589',
      address: 'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Олимпийн гудамж',
      facebookUrl: 'https://www.facebook.com/soyolerdem.edu.mn',
      workingHours: 'Даваа-Баасан: 08:00-17:00',
    },
  });
  console.log('✓ Site settings');

  /* Programs (6) */
  const programs = [
    {
      slug: 'japanese-translation',
      name: 'Япон хэлний орчуулга',
      code: '023101',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Languages',
      shortDescription: 'Япон хэлний аман ба бичгийн орчуулга, хэл шинжлэлийн судалгаа.',
      fullDescription:
        '"Япон хэлний орчуулагч" бакалаврын хөтөлбөрөөр япон хэлний аман ба бичгийн орчуулга хийх, бие даан энэ чиглэлийн үйл ажиллагааг эрхлэх, зохион байгуулах, дорно дахины болон хэл шинжлэлийн судалгааны ажил хийх чадвартай мэргэжилтнийг академик сургалтаар бэлтгэнэ.',
      skills:
        'JLPT N1, N2 түвшний япон хэлний мэдлэг\nАман ба бичгийн орчуулгын ур чадвар\nХэл шинжлэл, орчуулга судлалын онол\nЯпон үндэстний соёл, ёс зүйн ойлголт',
      careerOutlook:
        'Япон, Монгол хоёр улсын олон улсын байгууллага, элчин сайдын яам, орчуулгын товчоо, япон хэлний хичээл заадаг сургуулиудад мэргэжлийн орчуулагчаар ажиллана. Япон компаниудын Монгол дахь салбар, экспорт-импортын фирм, аялал жуулчлалын газруудад харилцагч-орчуулагч, дипломат бичиг хэргийн редактор зэрэг албан тушаалд хүртэл шилждэг. Магистрын зэрэгт суралцаж судалгааны ажил эрхэлдэг, эсвэл Япон руу 1+3 / 2+2 хөтөлбөрөөр шилжих боломжтой.',
      language: 'Япон, Монгол',
      admissionScore: 600,
      order: 1,
    },
    {
      slug: 'tourism-management',
      name: 'Аялал жуулчлалын менежмент',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Map',
      shortDescription: 'Аялал жуулчлалын салбарын мэргэжлийн боловсон хүчин.',
      fullDescription:
        'Аялал жуулчлалын менежмент мэргэжил нь аялал жуулчлалын салбарын төрийн, бизнесийн, олон нийтийн, олон улсын болон үйлчилгээний байгууллагуудад мэргэжлийн боловсон хүчин бэлтгэн хангах зориулалттай бакалаврын зэрэг олгох хөтөлбөр юм.',
      skills:
        'Зочид буудал, ресторан, аялалын менежмент\nЯпон хэлний үйлчилгээний хэллэг\nОлон улсын аялал жуулчлалын стандарт\nHospitality болон хэрэглэгчийн сэтгэл судлал',
      careerOutlook:
        'Олон улсын зочид буудал, ресторан, аяллын агентлаг, аэропорт-агаарын тээврийн салбарт менежер, маркетингийн мэргэжилтэн, гадаад харилцааны ажилтан болж ажиллана. Япон руу зочид буудлын дадлага, цалинтай дадлагын хөтөлбөрөөр явах боломжтой. Цаашид өөрийн аяллын фирм байгуулах, Монгол-Япон чиглэлийн аялал зохион байгуулах туршлагатай хүн болгож төгсгөнө.',
      language: 'Япон, Монгол',
      admissionScore: 550,
      order: 2,
    },
    {
      slug: 'international-relations',
      name: 'Олон улс, орон судлал',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Globe',
      shortDescription: 'Япон болон олон улсын улс төр, эдийн засаг, соёл судлал.',
      fullDescription:
        'Олон улс, орон судлал хөтөлбөр нь Япон орон болон олон улсын улс төр, эдийн засаг, соёл, нийгмийн харилцааг шинжлэх ухааны үндэслэлтэйгээр судалж, олон улсын харилцаанд ажиллах чадвартай, мэдлэг, ур чадвар, ёс зүй хосолсон мэргэжилтэн бэлтгэнэ.',
      skills:
        'Япон болон Зүүн Азийн орон судлал\nДипломат харилцаа, гадаад бодлого\nОлон улсын байгууллагын зохион байгуулалт\nСонгомол судалгааны арга зүй',
      careerOutlook:
        'Гадаад харилцааны яам, элчин сайдын яам, олон улсын байгууллага (JICA, UN, ОУХБ-ын төлөөлөгчийн газар), судалгааны төв, дипломатын академид мэргэжилтнээр ажиллана. Япон корпорацийн Монгол дахь салбарт олон улсын харилцаа, маркетинг, олон нийтийн харилцааны ажилтан болж шилждэг. Магистрт суралцаж дипломат-академик карьераа үргэлжлүүлэх боломжтой.',
      language: 'Япон, Англи, Монгол',
      admissionScore: 600,
      order: 3,
    },
    {
      slug: 'economics',
      name: 'Эдийн засаг',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'TrendingUp',
      shortDescription: 'Олон улсын болон үндэсний эдийн засгийн судлаач.',
      fullDescription:
        'Эдийн засгийн ухааны онол, арга зүйд суурилсан, олон улсын болон үндэсний түвшний эдийн засгийн асуудлыг судлах, дүн шинжилгээ хийх, шийдвэр гаргах чадвартай судлаач мэргэжилтэн бэлтгэнэ.',
      skills:
        'Микро болон макро эдийн засгийн шинжилгээ\nЯпон бизнес, корпорацийн менежмент\nЭконометрик, статистикийн арга\nОлон улсын худалдаа, санхүү',
      careerOutlook:
        'Банк, санхүүгийн хяналт, аудит, татварын алба, төв банк, эдийн засгийн судалгааны хүрээлэн, олон улсын байгууллагад дүн шинжилгээ хийх эдийн засагч, шинжээч, эрсдэлийн менежерээр ажиллана. Япон корпорацийн дотоодын болон гадаадын салбарт санхүү-эдийн засгийн чиглэлээр карьераа эхэлж, цаашид CFO/CEO түвшинд хүртэл ахих боломжтой.',
      language: 'Япон, Монгол',
      admissionScore: 600,
      order: 4,
    },
    {
      slug: 'japanese-language-teacher',
      name: 'Япон хэлний багш',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Presentation',
      shortDescription: 'ЕБС-д Япон хэл заах багшийн мэргэжил.',
      fullDescription:
        'Япон хэлний багшийн мэргэжлээр япон хэл, соёлын онолын суурь, заах арга зүй, сэтгэл судлал зэрэг чиглэлээр гүнзгийрсэн боловсролоор хичээллүүлж, ЕБС болон бусад сургалтын байгууллагад чадварлаг, мэргэжлийн багш бэлтгэнэ.',
      skills:
        'Япон хэлний дидактик ба заах арга зүй\nСурган хүмүүжүүлэх ухаан\nСэтгэл судлал ба хүүхдийн хөгжил\nСургалтын материал боловсруулах',
      careerOutlook:
        'Ерөнхий боловсролын сургуулийн япон хэлний багш, япон хэлний хувийн сургалтын төвийн багш, олон улсын сургуулийн япон хэл, соёл судлалын багшаар ажиллана. JLPT, EJU зэрэг шалгалтын бэлтгэлийн хичээл заах, сургалтын материал бичих, цахим хичээл хөгжүүлэх боломжтой. Магистрт суралцаж сурган хүмүүжүүлэх, орчуулга судлалын ангид багшилж болно.',
      language: 'Япон, Монгол',
      admissionScore: 580,
      order: 5,
    },
    {
      slug: 'software',
      name: 'Программ хангамж',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Code2',
      shortDescription: 'Япон хэл + программчлалын хосолсон сургалт.',
      fullDescription:
        'Япон хэл, программ хангамжийн хосолсон сургалтаар орчин үеийн программ хангамжийн инженер бэлтгэнэ. Япон улсын IT компанид ажиллах боломжтой мэргэжилтэн бэлтгэх зорилготой.',
      skills:
        'Web ба mobile програмчлал (React, Node.js)\nАлгоритм, өгөгдлийн бүтэц\nЯпон IT терминологи, документаци\nAgile, Scrum багийн ажиллагаа',
      careerOutlook:
        'Япон болон Монгол улсын IT компаниудад веб болон мобайл хөгжүүлэгч, full-stack engineer, frontend / backend разработчик, мэдээллийн системийн архитектор болж ажиллана. Япон руу 2+2 хөтөлбөрөөр явж тэнд ажиллаж амьдрах боломж нээлттэй. Стартап үүсгэх, fintech, AI, кибер аюулгүй байдлын чиглэлд үргэлжлүүлэн боловсрол эзэмших боломжтой.',
      language: 'Япон, Англи, Монгол',
      admissionScore: 620,
      order: 6,
    },
  ];
  for (const p of programs) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✓ Programs (${programs.length})`);

  /* News (5) */
  const news = [
    {
      slug: '30-year-anniversary',
      title: '30 жилийн ойн ёслол амжилттай зохион байгуулагдав',
      excerpt:
        'Соёл Эрдэм дээд сургуулийн үүсэн байгуулагдсаны 30 жилийн ойн ёслолыг 2023 оны 8 сарын 3-нд зохион байгуулж, мөн өдөр Соёл Эрдэм Ахлах Сургуулийг шинээр үүсгэн байгуулсан.',
      body: 'Сургуулийн үүсэн байгуулагдсаны 30 жилийн ойн ёслолыг 2023 оны 8 сарын 3-нд төв танхимдаа зохион байгууллаа. Тус арга хэмжээнд ахмад багш нар, төгсөгчид, одоогийн оюутнууд, Япон Улсын Элчин сайдын яамны төлөөлөгчид оролцов.\n\nЗахирал Т.Дорждагва "Бид нэг гэр бүлийн ёсоор дараагийн 30 жилд ч япон хэлний боловсролын манлайлагч хэвээр байх болно" хэмээн ярилаа.\n\nМөн өдөр Соёл Эрдэм Ахлах Сургуулийг дэргэдээ үүсгэн байгуулсан нь шинэ үе шатны эхлэл боллоо.',
      coverImage:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=60',
      category: 'EVENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2023-08-03'),
    },
    {
      slug: 'fourth-accreditation',
      title: '4 дэх удаагийн магадлан итгэмжлэлд оров',
      excerpt:
        'Манай сургууль 2025 онд 4 дэх удаагаа БМИҮЗ-ийн магадлан итгэмжлэлд орох ажиллагаа эхэллээ. 2003, 2010, 2020 онуудад тус тус амжилттай магадлан итгэмжлэгдсэн.',
      body: 'БМИҮЗ-ийн шинжээчдийн баг 2025 оны 4 сарын 10-наас эхлэн манай сургуулийн өөрийн үнэлгээ, сургалтын чанар, профессор-багш нарын чадавхи зэргийг үнэлж эхэллээ.\n\nМагадлан итгэмжлэлийн үр дүн 2025 оны 4-р улиралд гарах төлөвтэй байна.',
      coverImage:
        'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=60',
      category: 'ANNOUNCEMENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2025-04-10'),
    },
    {
      slug: 'embassy-exhibition',
      title: 'Япон-Монголын дипломат харилцааны 50 жилийн ойн үзэсгэлэн',
      excerpt:
        'Япон Улсын Элчин сайдын яамтай хамтран "Хүүхэд, залуучуудын харилцааны түүх" гэрэл зургийн үзэсгэлэнг сургуулийн номын санд 3-р сарын 9-22-ний хооронд зохион байгуулав.',
      body: 'Үзэсгэлэн нь Япон-Монгол улсын дипломат харилцаа тогтоосны 50 жилийн ойд зориулагдсан. Олон улсын зочид болон оюутнууд оролцлоо.',
      coverImage:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=60',
      category: 'EVENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-03-09'),
    },
    {
      slug: 'internship-2024',
      title: 'Интерншип хөтөлбөрт 25 оюутан хамрагдсанаар Японд явлаа',
      excerpt:
        '2024 оны намрын улирлын интерншип хөтөлбөрт нийт 25 оюутан амжилттай тэнцэж Япон улсад очиж сарын 150,000 иений цалинтай дадлага хийж эхэллээ.',
      body: 'Энэ улирлын интерншип хөтөлбөрт орсон оюутнууд Токио, Осака, Хоккайдо зэрэг бүс нутгийн зочид буудал, ресторан, IT компаниудад дадлага хийнэ.',
      coverImage:
        'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&w=1600&q=60',
      category: 'PROGRAM' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-09-15'),
    },
    {
      slug: 'speech-contest-31',
      title: 'Япон хэлний уран илтгэлийн 31 дэх тэмцээнд оюутнууд тэргүүлэв',
      excerpt:
        'Сургууль хоорондын япон хэлний уран илтгэлийн 31 дэх удаагийн тэмцээнд манай сургуулийн оюутнууд тэргүүн байр эзэлсэн.',
      body: '31 дэх удаагийн уран илтгэлийн тэмцээн 2025 оны 11 сарын 15-17-ны хооронд боллоо. Манай сургуулийн оюутан Б.Мөнхзул тэргүүн байр эзэлсэн.',
      coverImage:
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=60',
      category: 'ACHIEVEMENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2025-11-18'),
    },
  ];
  for (const n of news) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: n,
      create: { ...n, authorId: admin.id },
    });
  }
  console.log(`✓ News (${news.length})`);

  /* Library books (sample) */
  const books = [
    { title: 'Минна-но Нихонго I', author: '3A Network', language: 'JP' as const, category: 'Сурах бичиг (JLPT N5)', publishYear: 2022, totalCopies: 15, availableCopies: 12, shelfLocation: 'A-1-1' },
    { title: 'Япон-Монгол толь бичиг', author: 'Б.Сүмберэл', language: 'MN' as const, category: 'Япон хэл, соёл, түүх', publishYear: 2019, totalCopies: 8, availableCopies: 5, shelfLocation: 'B-2-3' },
    { title: 'Japanese for Busy People', author: 'AJALT', language: 'EN' as const, category: 'Сурах бичиг (JLPT N4)', publishYear: 2021, totalCopies: 10, availableCopies: 8, shelfLocation: 'A-1-2' },
    { title: 'Зүүн Азийн эдийн засгийн түүх', author: 'Г.Балжинням', language: 'MN' as const, category: 'Эдийн засаг, бизнес', publishYear: 2020, totalCopies: 5, availableCopies: 4, shelfLocation: 'C-3-1' },
    { title: 'Япон уран зохиолын антологи', author: 'Олон зохиолч', language: 'JP' as const, category: 'Уран зохиол (япон, монгол)', publishYear: 2018, totalCopies: 6, availableCopies: 6, shelfLocation: 'D-4-2' },
    { title: 'Орчуулгын онол ба практик', author: 'Р.Бямбаа', language: 'MN' as const, category: 'Орчуулга судлал', publishYear: 2023, totalCopies: 7, availableCopies: 7, shelfLocation: 'B-2-4' },
  ];
  for (const b of books) {
    const exists = await prisma.libraryBook.findFirst({ where: { title: b.title, author: b.author } });
    if (!exists) await prisma.libraryBook.create({ data: b });
  }
  console.log(`✓ Library books (${books.length})`);

  /* Research (sample) */
  const research = [
    {
      slug: 'japan-mongolia-translation-corpus',
      title: 'Япон-Монгол хэлний орчуулгын корпус судалгаа',
      authors: 'Т.Дорждагва, Б.Мөнхзул',
      type: 'ARTICLE' as const,
      area: 'Орчуулга судлал',
      abstract:
        'Япон-Монгол хос хэлний орчуулгын корпусын статистик шинжилгээ. Энэхүү судалгаагаар 10,000 өгүүлбэрийн корпус ашиглан орчуулгын чанар, хэв маяг, нийтлэг алдааг тодорхойлсон.',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-06-15'),
    },
    {
      slug: 'tokyo-ub-business-relations',
      title: 'Токио-Улаанбаатар хотуудын бизнесийн харилцаа',
      authors: 'С.Цэцэг',
      type: 'CONFERENCE' as const,
      area: 'Олон улсын харилцаа',
      abstract:
        'Сүүлийн 10 жилийн япон-монгол бизнесийн харилцааны хөгжлийн чиг хандлагыг шинжилсэн илтгэл.',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-11-02'),
    },
  ];
  for (const r of research) {
    await prisma.research.upsert({
      where: { slug: r.slug },
      update: r,
      create: { ...r, uploadedById: admin.id },
    });
  }
  console.log(`✓ Research (${research.length})`);

  /* Site content (Phase 1 — Hero + body texts) */
  const siteContent = [
    // Home
    { key: 'home.hero.title.line1', group: 'home', type: 'TEXT' as const, label: 'Hero — гарчиг 1-р мөр', value: 'ИРЭЭДҮЙГЭЭ', order: 1 },
    { key: 'home.hero.title.line2', group: 'home', type: 'TEXT' as const, label: 'Hero — гарчиг 2-р мөр', value: 'ЭНДЭЭС ЭХЭЛ', order: 2 },
    { key: 'home.hero.italic', group: 'home', type: 'TEXT' as const, label: 'Hero — italic accent', value: 'Япон хэлний боловсролын манлайлагч', order: 3 },
    { key: 'home.hero.body', group: 'home', type: 'TEXT' as const, label: 'Hero — танилцуулга текст', hint: '3-4 өгүүлбэр', value: 'Япон улсын 100% хөрөнгө оруулалттай Соёл Эрдэм Дээд Сургууль 1993 онд байгуулагдсан. Манай сургууль нь япон хэлний боловсролын чиглэлээр Монгол улсдаа тэргүүлэгч сургууль бөгөөд япон улсын 30 гаруй их, дээд сургуультай хамтран ажиллаж, оюутан солилцооны хөтөлбөр амжилттай хэрэгжүүлсээр байна. Бид одоогийн байдлаар 1500 гаруй оюутныг төгсгөж, нийт төгсөгчдийн 40 орчим хувь нь Япон улсад суралцаж, ажиллаж байна.', multiline: true, order: 4 },
    { key: 'home.hero.cta_primary', group: 'home', type: 'TEXT' as const, label: 'Hero — үндсэн товчны нэр', value: 'Мэргэжлээ сонгох', order: 5 },
    { key: 'home.hero.cta_secondary', group: 'home', type: 'TEXT' as const, label: 'Hero — нэмэлт товчны нэр', value: 'Элсэлтийн мэдээлэл', order: 6 },
    { key: 'home.hero.image', group: 'home', type: 'IMAGE' as const, label: 'Hero — баруун талын зураг', hint: 'Барилгын зураг (4:5 эсвэл 5:4 хэмжээтэй сайн)', value: '', order: 7 },

    // About
    { key: 'about.hero.title.line1', group: 'about', type: 'TEXT' as const, label: 'Hero — гарчиг 1-р мөр', value: 'Соёл Эрдэм', order: 1 },
    { key: 'about.hero.title.line2', group: 'about', type: 'TEXT' as const, label: 'Hero — гарчиг 2-р мөр', value: 'ИХ СУРГУУЛЬ', order: 2 },
    { key: 'about.hero.body', group: 'about', type: 'TEXT' as const, label: 'Hero — танилцуулга текст', hint: '3-4 өгүүлбэр', value: 'Япон улсын 100% хөрөнгө оруулалттай Соёл Эрдэм Дээд Сургууль 1993 онд байгуулагдсан. Манай сургууль нь япон хэлний боловсролын чиглэлээр Монгол улсдаа тэргүүлэгч сургууль бөгөөд япон улсын 30 гаруй их, дээд сургуультай хамтран ажиллаж, оюутан солилцооны хөтөлбөр амжилттай хэрэгжүүлсээр байна. Бид одоогийн байдлаар 1500 гаруй оюутныг төгсгөж, нийт төгсөгчдийн 40 орчим хувь нь Япон улсад суралцаж, ажиллаж байна.', multiline: true, order: 3 },
    { key: 'about.hero.cta_label', group: 'about', type: 'TEXT' as const, label: 'Hero — товчны нэр', value: 'Бидний тухай дэлгэрэнгүй', order: 4 },
    { key: 'about.hero.image', group: 'about', type: 'IMAGE' as const, label: 'Hero — баруун талын зураг', hint: 'Барилгын зураг (4:3 эсвэл 5:4 хэмжээтэй сайн)', value: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1600&q=80', order: 5 },

    // Research page editable blocks
    { key: 'research.dept.1.title', group: 'research', type: 'TEXT' as const, label: '1-р тэнхим — Гарчиг', value: 'Япон судлалын тэнхим', order: 1 },
    { key: 'research.dept.1.topics', group: 'research', type: 'TEXT' as const, label: '1-р тэнхим — Сэдвүүд', hint: 'Мөр бүрт нэг сэдэв бичнэ үү.', value: 'Япон хэл утга зохиол судлал\nЯпон-монгол, Монгол-япон хэлний орчуулга зүй\nЯпон хэл заах арга\nЯпон хэл соёл судлал\nМонгол-Япон, Япон-Монгол харилцаа судлал\nЯпон орон судлал', multiline: true, order: 2 },
    { key: 'research.dept.2.title', group: 'research', type: 'TEXT' as const, label: '2-р тэнхим — Гарчиг', value: 'Мэдээллийн технологийн тэнхим', order: 3 },
    { key: 'research.dept.2.topics', group: 'research', type: 'TEXT' as const, label: '2-р тэнхим — Сэдвүүд', hint: 'Мөр бүрт нэг сэдэв бичнэ үү.', value: 'Сүлжээний аюулгүй байдал\nПрограмм хангамжийн хэрэглээ\nАвтоматжуулалт', multiline: true, order: 4 },
    { key: 'research.dept.3.title', group: 'research', type: 'TEXT' as const, label: '3-р тэнхим — Гарчиг', value: 'Ахисан түвшний судалгаа', order: 5 },
    { key: 'research.dept.3.topics', group: 'research', type: 'TEXT' as const, label: '3-р тэнхим — Сэдвүүд', hint: 'Мөр бүрт нэг сэдэв бичнэ үү.', value: 'Япон хэл утга зохиол судлал\nЯпон-монгол, Монгол-япон хэлний орчуулга зүй\nЯпон хэл заах арга\nЯпон хэл соёл судлал\nМонгол судлал, Монгол утга зохиол судлал', multiline: true, order: 6 },
    { key: 'research.highlight.1', group: 'research', type: 'TEXT' as const, label: 'Онцлох үйл ажиллагаа — 1', hint: 'Эхний кардан дээр харагдах текст.', value: 'Тус сургуулийн эрдэмтэн багш нар судалгааны чиглэлээр судалгааны профессорын баг байгуулан үйл ажиллагаагаа явуулдаг.', multiline: true, order: 7 },
    { key: 'research.highlight.2', group: 'research', type: 'TEXT' as const, label: 'Онцлох үйл ажиллагаа — 2', value: 'Программ хангамжийн мэргэжлийн оюутнуудыг 2023 оноос эхлэн CISCO академийн албан ёсны гэрчилгээтэй төгсдөг болсноор олон улсад IT компаниудад ажиллах боломжийг олгодог. Мөн мэдээллийн аюулгүй байдлын мэргэшүүлэх сургалт, компьютерын сүлжээ, Internet of Things, Программ хангамж, OS & IT, Packet Tracer сургалтуудыг Дээд сургуулийн оюутанд үнэ төлбөргүй зааж сургалт явуулж байна.', multiline: true, order: 8 },
    { key: 'research.highlight.3', group: 'research', type: 'TEXT' as const, label: 'Онцлох үйл ажиллагаа — 3', value: 'Тус хичээлийн жилээс эхлэн СЭДС нь онлайн болон цахим сургалтандаа MOODLE зайн сургалтын платформыг хэрэглэж эхэллээ. Ингэснээр гадаадаас элсэн суралцаж буй магиструуд болон интерншип хөтөлбөрт хамрагдсан бакалаврын хөтөлбөрийн оюутнууд хугацаа алдалгүй сургалтаа үргэлжлүүлэн суралцах боломж нээгдэж байна.', multiline: true, order: 9 },

    // Research journals section heading + intro
    { key: 'research.journals.title', group: 'research', type: 'TEXT' as const, label: 'Сэтгүүлийн хэсгийн гарчиг', value: 'ЭРДЭМ ШИНЖИЛГЭЭНИЙ СЭТГҮҮЛ', order: 10 },
    { key: 'research.journals.subtitle', group: 'research', type: 'TEXT' as const, label: 'Сэтгүүлийн хэсгийн товч тайлбар', hint: 'Сэтгүүлийн карт жагсаалтын дээр харагдах нэг өгүүлбэр.', value: 'Соёл Эрдэм Дээд Сургуулиас гаргадаг боть тус бүрийг номын хуудас эргүүлэн уншиж танилцана уу.', multiline: true, order: 10 },

    // Research journal cover photos — by journal id. Empty value renders
    // the default navy/gold spine card.
    { key: 'research.journal.sp-2023-n1.cover', group: 'research', type: 'IMAGE' as const, label: '1-р боть (2023 №1) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 11 },
    { key: 'research.journal.sp-2024-n1.cover', group: 'research', type: 'IMAGE' as const, label: '2-р боть (2024 №1) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 12 },
    { key: 'research.journal.sp-2025-n1.cover', group: 'research', type: 'IMAGE' as const, label: '3-р боть (2025 №1) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 13 },
    { key: 'research.journal.sp-2025-n2.cover', group: 'research', type: 'IMAGE' as const, label: '4-р боть (2025 №2) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 14 },
    { key: 'research.journal.sp-2026-n1.cover', group: 'research', type: 'IMAGE' as const, label: '5-р боть (2026 №1) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 15 },

    // Inner-page banner photos — each one drives the <PageHero> photo on
    // its page. Empty value falls back to /nice_banner.png (the default).
    { key: 'page.programs.banner', group: 'banners', type: 'IMAGE' as const, label: 'Сургалт хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 1 },
    { key: 'page.research.banner', group: 'banners', type: 'IMAGE' as const, label: 'Эрдэм шинжилгээ хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 2 },
    { key: 'page.student-life.banner', group: 'banners', type: 'IMAGE' as const, label: 'Оюутан хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 3 },
    { key: 'page.international.banner', group: 'banners', type: 'IMAGE' as const, label: 'Хамтын ажиллагаа хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 4 },
    { key: 'page.news.banner', group: 'banners', type: 'IMAGE' as const, label: 'Мэдээ хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 5 },
  ];
  for (const c of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: c.key },
      update: {
        type: c.type,
        label: c.label,
        hint: c.hint ?? null,
        group: c.group,
        multiline: c.multiline ?? false,
        order: c.order,
        // Don't overwrite the editable `value` on re-seed
      },
      create: {
        key: c.key,
        type: c.type,
        value: c.value,
        label: c.label,
        hint: c.hint ?? null,
        group: c.group,
        multiline: c.multiline ?? false,
        order: c.order,
      },
    });
  }
  console.log(`✓ Site content (${siteContent.length})`);

  /* Stats — shared between Home & About */
  const stats = [
    { key: 'history', icon: 'GraduationCap', number: '32+', label: 'Жилийн түүхтэй', order: 1 },
    { key: 'graduates', icon: 'Users', number: '1500+', label: 'Төгсөгчид', order: 2 },
    { key: 'partners', icon: 'BookOpen', number: '30+', label: 'Япон хамтрагч их сургууль', order: 3 },
    { key: 'in-japan', icon: 'Globe', number: '40%', label: 'Япон улсад ажиллаж байна', order: 4 },
  ];
  for (const s of stats) {
    await prisma.stat.upsert({
      where: { key: s.key },
      update: { icon: s.icon, label: s.label, order: s.order },
      // Don't overwrite `number` on re-seed (admin-edited)
      create: s,
    });
  }
  console.log(`✓ Stats (${stats.length})`);

  /* Regulations — sample documents so the public /regulations page +
   * Дүрэм журам utility link have something to point at out of the box.
   * Admin can replace / extend these via /admin/regulations. */
  const regulations = [
    {
      slug: 'surah-juram',
      title: 'Суралцах журам',
      description:
        'Бакалавр, магистрын оюутны суралцах, шалгалт өгөх, дүн гаргах ерөнхий журам.',
      fileUrl: 'https://soyolerdem.edu.mn/journals/sp-2023-n1.pdf',
      coverImage: null as string | null,
      order: 1,
    },
    {
      slug: 'shiljih-juram',
      title: 'Шилжих журам',
      description:
        'Дотоодын болон гадаадын их дээд сургуулиас Соёл Эрдэм Дээд Сургуульд шилжин суралцах журам.',
      fileUrl: 'https://soyolerdem.edu.mn/journals/sp-2024-n1.pdf',
      coverImage: null as string | null,
      order: 2,
    },
    {
      slug: 'chuluu-avah-juram',
      title: 'Чөлөө авах журам',
      description:
        'Эрүүл мэндийн, хувийн болон гадаадад суралцах учраас чөлөө авах оюутны журам.',
      fileUrl: 'https://soyolerdem.edu.mn/journals/sp-2025-n1.pdf',
      coverImage: null as string | null,
      order: 3,
    },
  ];
  for (const r of regulations) {
    await prisma.regulation.upsert({
      where: { slug: r.slug },
      update: {
        title: r.title,
        description: r.description,
        order: r.order,
      },
      // Don't overwrite uploaded file/cover on re-seed.
      create: {
        slug: r.slug,
        title: r.title,
        description: r.description,
        fileUrl: r.fileUrl,
        coverImage: r.coverImage,
        order: r.order,
        status: 'PUBLISHED',
      },
    });
  }
  console.log(`✓ Regulations (${regulations.length})`);

  console.log('\n✅ Seed дуусав!\n');
  console.log('Login мэдээлэл:');
  console.log('  Admin: admin@soyolerdem.edu.mn / admin123');
  console.log('  Editor: editor@soyolerdem.edu.mn / editor123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
