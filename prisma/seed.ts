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
    update: { name: 'Admin' },
    create: {
      email: 'admin@soyolerdem.edu.mn',
      password: adminPassword,
      name: 'Admin',
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
    { key: 'home.internship.image', group: 'home', type: 'IMAGE' as const, label: 'Япон интерншипийн зураг', hint: 'Интерншипийн хэсэгт харагдах зураг (4:3 харьцаатай сайн)', value: '', order: 8 },

    // Цахим сургалт (/elearning) — admin-editable banner + per-section copy
    { key: 'elearning.hero.image', group: 'elearning', type: 'IMAGE' as const, label: 'Hero — баннер зураг', hint: 'Дээд талын баннер. Хоосон бол default баннер.', value: '', order: 1 },
    { key: 'elearning.hero.subtitle', group: 'elearning', type: 'TEXT' as const, label: 'Hero — доод текст', value: 'Хаанаас ч, хэзээ ч суралцах боломж — Moodle платформд суурилсан уян хатан сургалтын систем.', multiline: true, order: 2 },
    { key: 'elearning.moodle.url', group: 'elearning', type: 'TEXT' as const, label: 'Moodle URL', hint: 'Жишээ: http://elearn.soyolerdem.edu.mn/', value: 'http://elearn.soyolerdem.edu.mn/', order: 3 },
    { key: 'elearning.intro.badge', group: 'elearning', type: 'TEXT' as const, label: 'Танилцуулга — pill', value: 'Moodle платформ · Соёл Эрдэм', order: 4 },
    { key: 'elearning.intro.title', group: 'elearning', type: 'TEXT' as const, label: 'Танилцуулга — гарчиг', value: 'Хаанаас ч, хэзээ ч суралцах боломж', order: 5 },
    { key: 'elearning.intro.body', group: 'elearning', type: 'TEXT' as const, label: 'Танилцуулга — параграф', value: 'Соёл Эрдэм Дээд Сургууль нь Moodle платформд суурилсан цахим сургалтын системээр дамжуулан оюутан, ажил эрхэлж буй иргэд, орон нутгийн болон гадаадад амьдарч буй монгол иргэдэд уян хатан хэлбэрээр суралцах боломжийг олгож байна.', multiline: true, order: 6 },
    { key: 'elearning.programs.title', group: 'elearning', type: 'TEXT' as const, label: 'Чиглэлүүд — гарчиг', value: 'ЦАХИМААР СУРАЛЦАХ БОЛОМЖТОЙ ЧИГЛЭЛҮҮД', order: 7 },
    { key: 'elearning.programs.subtitle', group: 'elearning', type: 'TEXT' as const, label: 'Чиглэлүүд — доод текст', value: 'Дараах мэргэжлийг бүхэлд нь эсвэл сонгосон хичээлээр нь цахимаар суралцаж болно.', multiline: true, order: 8 },
    { key: 'elearning.advantages.title', group: 'elearning', type: 'TEXT' as const, label: 'Давуу тал — гарчиг', value: 'ЦАХИМ СУРГАЛТЫН ДАВУУ ТАЛ', order: 9 },
    { key: 'elearning.advantages.subtitle', group: 'elearning', type: 'TEXT' as const, label: 'Давуу тал — доод текст', value: 'Уламжлалт танхимын сургалтаас юугаараа ялгаатай вэ?', order: 10 },
    { key: 'elearning.audiences.title', group: 'elearning', type: 'TEXT' as const, label: 'Хэнд зориулагдсан — гарчиг', value: 'ХЭНД ЗОРИУЛАГДСАН БЭ?', order: 11 },
    { key: 'elearning.cisco.title', group: 'elearning', type: 'TEXT' as const, label: 'CISCO — гарчиг', value: 'CISCO Networking Academy', order: 12 },
    { key: 'elearning.cisco.body', group: 'elearning', type: 'TEXT' as const, label: 'CISCO — танилцуулга', value: 'СЭДС нь АНУ-ын CISCO Networking Academy-ийн албан ёсны гишүүнчлэлтэй. Программ хангамжийн мэргэжлийн оюутнууд 2023 оноос албан ёсны гэрчилгээтэй төгсдөг болсноор олон улсын IT компаниудад ажиллах боломжтой.', multiline: true, order: 13 },
    { key: 'elearning.cisco.students', group: 'elearning', type: 'TEXT' as const, label: 'CISCO — оюутны хэсэг', value: 'Бакалавр, магистрын оюутнууд болон 10–12 ангийн сурагчид хичээлийн бус цагаар тусгайлсан хөтөлбөрөөр багшийн удирдлага дор суралцана. Сургалт амжилттай төгсөхөд CISCO-ийн олон улсад хүлээн зөвшөөрөгдсөн сертификат олгогдоно. Программ хангамжийн 4-р ангийн оюутан Л.Бүддорж, Б.Баяраа, Э.Тэмүүлэн нар 2023 оны 12-р сарын 25-нд анхны сертификатаа гардан авлаа.', multiline: true, order: 14 },
    { key: 'elearning.why.title', group: 'elearning', type: 'TEXT' as const, label: 'Why-section — гарчиг', value: 'Цаг хугацаа, байршил, амьдралын хэв маягаас үл хамаарах боловсролын шинэ шийдэл', multiline: true, order: 15 },
    { key: 'elearning.why.body', group: 'elearning', type: 'TEXT' as const, label: 'Why-section — параграф', value: 'Соёл Эрдэм Дээд Сургуулийн цахим сургалт нь зөвхөн диплом олгох бус, ажиллах ур чадвар, олон улсын боломж, цаг хугацаа болон байршлаас үл хамаарах боловсролын шинэ шийдэл юм.', multiline: true, order: 16 },

    // Ахлах сургууль (NEB) — admin-editable banner + per-page copy.
    // Groups prefixed with `hs-` so /high-school/admin/site-content filters
    // them out of the main university content list.
    { key: 'ahlah-home.hero.image', group: 'ahlah-home', type: 'IMAGE' as const, label: 'Hero — баннер зураг', hint: 'Дээд талын баннер. Хоосон бол default баннер.', value: '', order: 1 },
    { key: 'ahlah-home.hero.subtitle', group: 'ahlah-home', type: 'TEXT' as const, label: 'Hero — доод текст', value: 'Чанартай боловсрол, Япон хэл, соёл, IT-ийн чиглэлээр ирээдүйгээ эндээс эхлүүл.', multiline: true, order: 2 },
    { key: 'ahlah-home.intro.badge', group: 'ahlah-home', type: 'TEXT' as const, label: 'Танилцуулга — pill', hint: 'Гарчгийн дээр харагдах жижиг алтан pill.', value: 'Японы хөрөнгө оруулалттай · 2023 онд байгуулагдсан', order: 3 },
    { key: 'ahlah-home.intro.title', group: 'ahlah-home', type: 'TEXT' as const, label: 'Танилцуулга — гарчиг', hint: 'Тойм бичих хоёр мөр.', value: 'Хичээнгүй суралцагч,\nЧадварлаг багш, Япон хэл, соёл', multiline: true, order: 4 },
    { key: 'ahlah-home.intro.body', group: 'ahlah-home', type: 'TEXT' as const, label: 'Танилцуулга — 1-р параграф', value: 'Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургууль нь 2023 оны 8-р сарын 30-нд Японы хөрөнгө оруулалттайгаар үүсгэн байгуулагдаж, 2023–2024 оны хичээлийн жилд 10–11 ангитай, нийт мэргэжлийн 11 багш, 2 япон хэлний багштайгаар үйл ажиллагаагаа эхэлсэн.', multiline: true, order: 5 },
    { key: 'ahlah-home.intro.body2', group: 'ahlah-home', type: 'TEXT' as const, label: 'Танилцуулга — 2-р параграф', value: 'Манай сургууль нь эх сургууль болох Соёл Эрдэм Дээд Сургуулийн 30+ жилийн япон судлалын баялаг туршлагад тулгуурлан япон хэл, соёл болон мэдээллийн технологид төрөлжсөн ерөнхий боловсролын сургалт явуулдаг.', multiline: true, order: 6 },
    { key: 'ahlah-home.intro.image', group: 'ahlah-home', type: 'IMAGE' as const, label: 'Танилцуулга — баруун талын зураг', hint: 'Босоо (4:5 эсвэл 3:4) зураг сайн харагдана.', value: '/НЕБ_Сургууль.png', order: 7 },
    { key: 'ahlah-home.intro.overlay.eyebrow', group: 'ahlah-home', type: 'TEXT' as const, label: 'Зургийн доорх — pill (Senior High School)', value: 'Senior High School', order: 8 },
    { key: 'ahlah-home.intro.overlay.title', group: 'ahlah-home', type: 'TEXT' as const, label: 'Зургийн доорх — гарчиг', value: 'Соёл Эрдэм', order: 9 },
    { key: 'ahlah-home.intro.overlay.subtitle', group: 'ahlah-home', type: 'TEXT' as const, label: 'Зургийн доорх — товч тайлбар', value: 'Япон-Монголын боловсролын гүүр', multiline: true, order: 10 },
    { key: 'ahlah-home.philosophy.title', group: 'ahlah-home', type: 'TEXT' as const, label: 'Философи — гарчиг', value: 'СУРГУУЛИЙН ҮЗЭЛ БОДОЛ', order: 11 },
    { key: 'ahlah-home.programs.title', group: 'ahlah-home', type: 'TEXT' as const, label: 'Хөтөлбөр — гарчиг', value: 'СУРГАЛТЫН ХӨТӨЛБӨР', order: 12 },
    { key: 'ahlah-home.programs.subtitle', group: 'ahlah-home', type: 'TEXT' as const, label: 'Хөтөлбөр — доод текст', value: 'Япон хэл, IT, бүрэн дунд боловсрол + 2+2 солилцооны хөтөлбөр.', multiline: true, order: 13 },
    { key: 'ahlah-home.news.title', group: 'ahlah-home', type: 'TEXT' as const, label: 'Мэдээ — гарчиг', value: 'СҮҮЛИЙН МЭДЭЭ', order: 14 },

    // Footer block — admin-editable for the ahlah sub-site footer.
    { key: 'ahlah-footer.tagline', group: 'ahlah-home', type: 'TEXT' as const, label: 'Footer — логоны доорх товч тайлбар', hint: '1-2 өгүүлбэрийн тайлбар.', value: 'Соёл Эрдэм Дээд Сургуулийн харьяа төрөлжсөн ерөнхий боловсролын ахлах сургууль. Япон хэл, соёл, IT-ийн чиглэлээр чанартай боловсрол олгоно.', multiline: true, order: 20 },
    { key: 'ahlah-footer.phone.primary', group: 'ahlah-home', type: 'TEXT' as const, label: 'Footer — Утас (үндсэн)', value: '7011-8589', order: 21 },
    { key: 'ahlah-footer.phone.secondary', group: 'ahlah-home', type: 'TEXT' as const, label: 'Footer — Утас (гар утас)', value: '9953-3738', order: 22 },
    { key: 'ahlah-footer.email', group: 'ahlah-home', type: 'TEXT' as const, label: 'Footer — И-мэйл', value: 'info@soyolerdem.edu.mn', order: 23 },
    { key: 'ahlah-footer.address', group: 'ahlah-home', type: 'TEXT' as const, label: 'Footer — Хаяг', hint: 'Бүтэн хаяг бичнэ үү. Мөр шилжүүлэх боломжтой.', value: 'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Олимпийн гудамж', multiline: true, order: 24 },

    // ahlah-about
    { key: 'ahlah-about.hero.image', group: 'ahlah-about', type: 'IMAGE' as const, label: 'Hero — баннер зураг', value: '', order: 1 },
    { key: 'ahlah-about.hero.subtitle', group: 'ahlah-about', type: 'TEXT' as const, label: 'Hero — доод текст', value: 'Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн танилцуулга.', multiline: true, order: 2 },
    { key: 'ahlah-about.body', group: 'ahlah-about', type: 'TEXT' as const, label: 'Үндсэн агуулга', value: 'Соёл Эрдэм Ахлах Сургууль нь 2023 онд Соёл Эрдэм Дээд Сургуулийн харьяа төрөлжсөн ахлах сургуулиар байгуулагдсан.', multiline: true, order: 3 },

    // ahlah-admission
    { key: 'ahlah-admission.hero.image', group: 'ahlah-admission', type: 'IMAGE' as const, label: 'Hero — баннер зураг', value: '', order: 1 },
    { key: 'ahlah-admission.hero.subtitle', group: 'ahlah-admission', type: 'TEXT' as const, label: 'Hero — доод текст', value: 'Соёл Эрдэм Ахлах сургуулийн элсэлтийн нөхцөл, шаардлага.', multiline: true, order: 2 },
    { key: 'ahlah-admission.body', group: 'ahlah-admission', type: 'TEXT' as const, label: 'Үндсэн агуулга', value: '10-р анги болон 11-р ангид элсэх сурагчдыг хүлээн авна. Япон хэл, IT-ийн чиглэлээр 2 ангитайгаар суралцана.', multiline: true, order: 3 },

    // ahlah-programs
    { key: 'ahlah-programs.hero.image', group: 'ahlah-programs', type: 'IMAGE' as const, label: 'Hero — баннер зураг', value: '', order: 1 },
    { key: 'ahlah-programs.hero.subtitle', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Hero — доод текст', value: 'Ахлах сургуулийн сургалтын хөтөлбөрүүд.', multiline: true, order: 2 },
    // "Бага / Дунд / Ахлах сургуулийн онцлог" харьцуулалт хэсэг
    // (admin-editable). Анги бүрд 4 мөр: name + 3 категори
    // (Боловсролын онцлог / Сургалтын хөтөлбөрүүд / Хичээлээс гадуурх
    // үйл ажиллагаа). scripts/add-hs-program-levels.ts ч эдгээр
    // мөрүүдийг идэмпотентаар production DB-д бичих боломжтой.
    { key: 'ahlah-programs.levels.title', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Ангиудын онцлог — гарчиг', value: 'Бага, Дунд, Ахлах сургуулийн онцлог', order: 50 },
    { key: 'ahlah-programs.levels.subtitle', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Ангиудын онцлог — дэд гарчиг', value: 'Ангийн түвшин бүрд хэрхэн чанартай боловсрол олгож, хүүхдийн чадварыг нээж байгаа товч танилцуулга.', multiline: true, order: 51 },
    { key: 'ahlah-programs.levels.elementary.name', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Бага сургууль — нэр', value: 'Бага сургууль', order: 60 },
    { key: 'ahlah-programs.levels.elementary.education', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Бага сургууль — Боловсролын онцлог', hint: 'Энэ түвшний боловсролын гол онцлог, чиглэл.', value: 'Уншиж, бичих, тоо бодох суурь чадварыг япон-монгол хосолсон хэлний орчинд бат суулгана. Анги бүрд багш + туслах багштай.', multiline: true, order: 61 },
    { key: 'ahlah-programs.levels.elementary.curriculum', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Бага сургууль — Сургалтын хөтөлбөрүүд', hint: 'Боломжтой сургалтын хөтөлбөрийн тойм.', value: 'Монгол хэл, математик, япон хэл (анхан шат), байгалийн судлал, нийгмийн ухаан, урлаг, хөгжим, биеийн тамир.', multiline: true, order: 62 },
    { key: 'ahlah-programs.levels.elementary.extracurricular', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Бага сургууль — Хичээлээс гадуурх үйл ажиллагаа', hint: 'Дугуйлан, клуб, аялал зэрэг.', value: 'Япон хэлний клуб, уран зураг, шатар, бүжиг, оригами, спорт-тоглоомын дугуйлан. Жилд 2-3 удаа танилцах аялал.', multiline: true, order: 63 },
    { key: 'ahlah-programs.levels.middle.name', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Дунд сургууль — нэр', value: 'Дунд сургууль', order: 70 },
    { key: 'ahlah-programs.levels.middle.education', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Дунд сургууль — Боловсролын онцлог', value: 'Япон хэлний түвшинг N5–N4-д хүргэх, эерэг сэтгэлгээ, шинжлэх ухааны үндэс суурийг тогтоох. STEM-н чиглэлд анхаарна.', multiline: true, order: 71 },
    { key: 'ahlah-programs.levels.middle.curriculum', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Дунд сургууль — Сургалтын хөтөлбөрүүд', value: 'Монгол хэл, математик, япон хэл, англи хэл, физик, хими, биологи, газарзүй, түүх, мэдээллийн технологийн үндэс.', multiline: true, order: 72 },
    { key: 'ahlah-programs.levels.middle.extracurricular', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Дунд сургууль — Хичээлээс гадуурх үйл ажиллагаа', value: 'JLPT бэлтгэл клуб, робототехникийн дугуйлан, бичил-судалгааны төсөл, спорт (карате, волейбол), уран илтгэлийн клуб.', multiline: true, order: 73 },
    { key: 'ahlah-programs.levels.high.name', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Ахлах сургууль — нэр', value: 'Ахлах сургууль', order: 80 },
    { key: 'ahlah-programs.levels.high.education', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Ахлах сургууль — Боловсролын онцлог', value: 'Япон хэл (N3–N2), мэдээллийн технологид төрөлжсөн ерөнхий боловсрол. 2+2 солилцооны хөтөлбөр, японд үргэлжлүүлэн суралцах боломж.', multiline: true, order: 81 },
    { key: 'ahlah-programs.levels.high.curriculum', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Ахлах сургууль — Сургалтын хөтөлбөрүүд', value: 'Гүнзгийрүүлсэн япон хэл, IT (програмчлал, веб, мэдээллийн сан), математик, физик, хими, англи хэл, нийгмийн ухаан.', multiline: true, order: 82 },
    { key: 'ahlah-programs.levels.high.extracurricular', group: 'ahlah-programs', type: 'TEXT' as const, label: 'Ахлах сургууль — Хичээлээс гадуурх үйл ажиллагаа', value: 'Япон судлалын клуб, IT хакатон, JLPT бэлтгэл, оюутны зөвлөл, спорт (баскетбол, ширээний теннис), Япон-руу солилцоо.', multiline: true, order: 83 },

    // ahlah-contact
    { key: 'ahlah-contact.hero.image', group: 'ahlah-contact', type: 'IMAGE' as const, label: 'Hero — баннер зураг', value: '', order: 1 },
    { key: 'ahlah-contact.hero.subtitle', group: 'ahlah-contact', type: 'TEXT' as const, label: 'Hero — доод текст', value: 'Соёл Эрдэм Ахлах сургуультай холбогдох.', multiline: true, order: 2 },

    // Founder (/about/founder) — admin-editable portrait + message.
    { key: 'about.founder.name', group: 'about', type: 'TEXT' as const, label: 'Үүсгэн байгуулагч — нэр', value: 'Макихара Соичи', order: 10 },
    { key: 'about.founder.title', group: 'about', type: 'TEXT' as const, label: 'Үүсгэн байгуулагч — албан тушаал', value: 'Үүсгэн байгуулагч, Удирдах зөвлөлийн дарга', order: 11 },
    { key: 'about.founder.image', group: 'about', type: 'IMAGE' as const, label: 'Үүсгэн байгуулагчийн зураг', hint: 'Хөргийн зураг (квадрат хэлбэртэй сайн)', value: '', order: 12 },
    { key: 'about.founder.message', group: 'about', type: 'TEXT' as const, label: 'Үүсгэн байгуулагчийн мэндчилгээ', hint: 'Догол мөрийг хоосон мөр (Enter Enter) -ээр заана.', value: 'Соёл Эрдэм Дээд Сургууль нь япон хэлний боловсролыг голлодог Монголын цорын ганц сургууль юм. Соёл Эрдэм Дээд Сургууль нь Монгол Японы ард түмний найрамдал, хамтын ажиллагаа болон дэлхийн Монголчуудын холбоо харилцаа, хайр хүндлэлийн дүнд байгуулагдсан болно. Монгол үндэстэн нь Монгол улсын нутгийг төвөө болгон Хятад, ОХУ-ын өргөн уудам нутагт тархан суурьшиж иржээ. Хорь дугаар зуун Монгол үндэстний хувьд их гүрнүүдийн нударга дор хэцүү бэрхийг туулсан үе байлаа. 1989 онд Зөвлөлт улс болон Зүүн Европын орнуудаас эхтэй ардчиллын салхи Монгол оронд шинэ сэтгэлгээ, шинэлэг уур амьсгал авчирсан юм.\n\nИнгэж Зөвлөлт гүрний далан жилийн диктатур эцэс болж Монгол улсын туурга тусгаар байдал сэргэж, Монголчууд эх нутагтаа эзэн байх алтан боломж олдож билээ. Улс орнууд даяарчлагдан буй энэ цагт олон талын мэдлэгтэй, цар хүрээтэй сэтгэж чадах, тавиун зөөлөн сэтгэлтэй, сэтгэлээсээ аливаад ханддаг хүн, мэргэшсэн хүний нөөц шаардагдаж байна. Соёл Эрдэм Дээд Сургуулийн зорилго нь хүний нийгмийн энх амгалан, хөгжил цэцэглэлтэд хувь нэмэр оруулах, байгаль дэлхийгээ хайрлах сэтгэл зүрхтэй, үндэс угсаа, арьс өнгө, шашин шүтлэгээр алагчлах, ялгаварлах үзэл бодолгүй, өөрийн итгэл үнэмшилтэй хүмүүнийг сургах, боловсруулах явдал мөн.\n\nХүн хүндээ нөхөр байх, хүн төрөлхтөний хамтын нийгэмлэгийн нэг эд эс, энэрэнгүй нийгмийн салаа мөчир байх хүмүүнийг бэлдэж гаргах явдал мөн.\n\nБид боловсролоор дамжуулан их Чингис хааны аливаад өгөөмөр хандах үзэл санаа, Даяар Монголын уламжлалт сэтгэлгээ, нөхөрлөл, эр зоригийн дээдийг сурч мэдэх хэрэгтэй байна. Хүний тусыг мартдаггүй байх, итгэлцлийг эрхэмлэх, ёс зүйтэй байх тэр ухааныг, өсөн дэвжихийн гайхамшгийг. Дэлхийн Монголчууд сэргэн мандсан Монгол улсын иргэдийн мөрөөдөл, ирээдүйдээ итгэх итгэлээр жигүүрлэн улам цэцэглэн хөгжихийг баясан хүлээж байна. Соёл Эрдэм Дээд Сургууль нь хүмүүнлэг ардчилсан нийгмийн тулд, үндэстнийхээ бадрал хөгжлийн төлөө бүхнээ зориулах итгэл сэтгэл зүтгэлтэй хүмүүн бэлдэх боловсрол соёлын байгууллага байхын төлөө цаашид ч хичээн ажиллах болно.', multiline: true, order: 13 },

    // Director message (/about/director-message)
    { key: 'about.director.name', group: 'about', type: 'TEXT' as const, label: 'Захирал — нэр', value: 'Д.Эрдэнэчимэг', order: 20 },
    { key: 'about.director.title', group: 'about', type: 'TEXT' as const, label: 'Захирал — албан тушаал', value: 'Соёл Эрдэм Дээд Сургуулийн Гүйцэтгэх захирал', order: 21 },
    { key: 'about.director.image', group: 'about', type: 'IMAGE' as const, label: 'Захирлын зураг', hint: 'Хөргийн зураг (квадрат хэлбэртэй сайн)', value: '', order: 22 },
    { key: 'about.director.message', group: 'about', type: 'TEXT' as const, label: 'Захирлын мэндчилгээ', hint: 'Догол мөрийг хоосон мөр (Enter Enter) -ээр заана.', value: 'Монгол Япон улс хоорондын харилцааны гүүр болсон Соёл Эрдэм Дээд Сургуулийн эрхэм хүндэт профессор багш, ажилтан, оюутан залуус, үе үеийн төгсөгчид, хамтран ажилладаг байгууллагын төлөөлөл Та бүхэнд энэ өдрийн мэндийг өргөн дэвшүүлье!\n\nЯпон улсын 100 хувийн хөрөнгө оруулалттай Соёл Эрдэм Дээд Сургууль нь 1996 онд байгуулагдан 3 удаа магадлан итгэмжлэгдсэн байгууллага бөгөөд одоогоор 1500 орчим оюутан төгсөж ажил амьдралын замаа эхлүүлэн эх ороныхоо хөгжилд хувь нэмрээ оруулсаар байна. Манай төгсөгчдийн 40 орчим хувь нь Япон улсад амжилттай ажиллаж амьдардаг нь тус сургуулийн төгсөгчдийн амжилтыг илэрхийлж байгаа үзүүлэлт юм.\n\nСЭДС нь Япон улсад 50 болон 100 хувийн тэтгэлэгтэй суралцах, сард 2 сая 500 мянга орчим төгрөгийн цалинтай хэл, соёлын практик дадлага хийх, зуны амралтаараа багш, оюутнууд 100 хувийн тэтгэлэгтэй хэлний бэлтгэлд суралцах, төгсөөд Япон улсад мэргэжлээрээ болон гэрээгээр ажиллах зэрэг олон боломжийг оюутан суралцагчиддаа олгодог. Мөн 2+2 болон 1+3 гэсэн программ хангамжийн хөтөлбөрийг хэрэгжүүлэхээр ажиллаж байна.\n\nГадаад хэлний орчуулагч, программ хангамж, аялал жуулчлал, олон улс орон судлал, эдийн засгийн мэргэжлийн дэд бакалавр болон бакалаврын хөтөлбөр, гадаад хэл шинжлэлийн магистрийн хөтөлбөрөөр сургалт явуулахаас гадна япон хэл, мэдээллийн технологийн төрөлжсөн ахлах сургуультайгаар үйл ажиллагаагаа явуулж байна.\n\nБид соёл уламжлалаа дээдэлж, эрдэм мэдлэгийг эрхэмлэн, даяаршсан хөгжлийг хүндэтгэж, судалгааны төгөлдөршилд тэмүүлсэн, Монгол болон Япон улсын зах зээлд хүлээн зөвшөөрөгдөхүйц мэргэжилтэн бэлтгэх зорилгоо биелүүлэхийн төлөө цаашид хичээнгүйлэн ажиллах болно.\n\nТа бүхнийг чанартай сургалт, япон соёлыг эрхэмлэсэн улс орныхоо ирээдүйн хөгжлийг авч явах өндөр боловсролтой, чадварлаг мэргэжилтэн болгох бүх шатны сургалтандаа элсэн орж суралцахад манай сургуулийн үүд үргэлж нээлттэй байх болно.', multiline: true, order: 23 },

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
    { key: 'research.journals.subtitle', group: 'research', type: 'TEXT' as const, label: 'Сэтгүүлийн хэсгийн товч тайлбар', hint: 'Сэтгүүлийн карт жагсаалтын дээр харагдах нэг өгүүлбэр.', value: 'Соёл Эрдэм Дээд Сургуулийн эрдэм шинжилгээний сэтгүүлийн боть тус бүртэй танилцана уу.', multiline: true, order: 10 },

    // Research journal cover photos — by journal id. Empty value renders
    // the default navy/gold spine card.
    { key: 'research.journal.sp-2023-n1.cover', group: 'research', type: 'IMAGE' as const, label: '1-р боть (2023 №1) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 11 },
    { key: 'research.journal.sp-2024-n1.cover', group: 'research', type: 'IMAGE' as const, label: '2-р боть (2024 №1) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 12 },
    { key: 'research.journal.sp-2025-n1.cover', group: 'research', type: 'IMAGE' as const, label: '3-р боть (2025 №1) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 13 },
    { key: 'research.journal.sp-2025-n2.cover', group: 'research', type: 'IMAGE' as const, label: '4-р боть (2025 №2) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 14 },
    { key: 'research.journal.sp-2026-n1.cover', group: 'research', type: 'IMAGE' as const, label: '5-р боть (2026 №1) — Нүүр зураг', hint: 'Сэтгүүлийн нүүрний зураг (3:4 хэмжээтэй тохиромжтой).', value: '', order: 15 },

    // Student-life page editable blocks
    { key: 'student-life.hero.title', group: 'student-life', type: 'TEXT' as const, label: 'Hero — Гарчиг', value: 'ОЮУТНЫ АМЬДРАЛ', order: 1 },
    { key: 'student-life.hero.subtitle', group: 'student-life', type: 'TEXT' as const, label: 'Hero — Товч тайлбар', hint: 'Banner-ийн доор харагдах нэг өгүүлбэр.', value: 'Бид бол гэр бүл — Соёл Эрдэмд хичээл бол зөвхөн зургаан жилийн нэг хэсэг.', multiline: true, order: 2 },
    { key: 'student-life.intro.body', group: 'student-life', type: 'TEXT' as const, label: 'Удиртгал', hint: 'Хуудасны эхэн дэх танилцуулга текст.', value: 'Соёл Эрдэмд оюутан байх нь зөвхөн хичээл биш — энэ бол гэр бүл, найзууд, шинэ туршлага, амьдралын чухал үе юм. Бид клуб, спорт, соёлын арга хэмжээ, дадлага, дотуур байр, тэтгэлэг гээд бүх талаар дэмжлэг үзүүлдэг.', multiline: true, order: 3 },

    { key: 'student-life.annual.heading', group: 'student-life', type: 'TEXT' as const, label: 'Жил бүрийн арга хэмжээ — Гарчиг', value: 'ЖИЛ БҮРИЙН ОНЦЛОХ АРГА ХЭМЖЭЭ', order: 4 },
    { key: 'student-life.annual.1.title', group: 'student-life', type: 'TEXT' as const, label: 'Жил бүрийн арга хэмжээ — 1', value: 'Бүнкёосай — япон соёлын баяр (12-р сар)', order: 5 },
    { key: 'student-life.annual.1.image.1', group: 'student-life', type: 'IMAGE' as const, label: '1-р арга хэмжээ — Зураг 1', hint: 'Квадрат зураг (1:1). Хоосон бол slideshow харагдахгүй.', value: '', order: 6 },
    { key: 'student-life.annual.1.image.2', group: 'student-life', type: 'IMAGE' as const, label: '1-р арга хэмжээ — Зураг 2', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 7 },
    { key: 'student-life.annual.1.image.3', group: 'student-life', type: 'IMAGE' as const, label: '1-р арга хэмжээ — Зураг 3', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 8 },
    { key: 'student-life.annual.1.image.4', group: 'student-life', type: 'IMAGE' as const, label: '1-р арга хэмжээ — Зураг 4', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 9 },
    { key: 'student-life.annual.2.title', group: 'student-life', type: 'TEXT' as const, label: 'Жил бүрийн арга хэмжээ — 2', value: 'Танилцах үдэшлэг — явган аялал (9–10-р сар)', order: 10 },
    { key: 'student-life.annual.2.image.1', group: 'student-life', type: 'IMAGE' as const, label: '2-р арга хэмжээ — Зураг 1', hint: 'Квадрат зураг (1:1). Хоосон бол slideshow харагдахгүй.', value: '', order: 11 },
    { key: 'student-life.annual.2.image.2', group: 'student-life', type: 'IMAGE' as const, label: '2-р арга хэмжээ — Зураг 2', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 12 },
    { key: 'student-life.annual.2.image.3', group: 'student-life', type: 'IMAGE' as const, label: '2-р арга хэмжээ — Зураг 3', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 13 },
    { key: 'student-life.annual.2.image.4', group: 'student-life', type: 'IMAGE' as const, label: '2-р арга хэмжээ — Зураг 4', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 14 },
    { key: 'student-life.annual.3.title', group: 'student-life', type: 'TEXT' as const, label: 'Жил бүрийн арга хэмжээ — 3', value: 'Спортын аварга шалгаруулах (намар)', order: 15 },
    { key: 'student-life.annual.3.image.1', group: 'student-life', type: 'IMAGE' as const, label: '3-р арга хэмжээ — Зураг 1', hint: 'Квадрат зураг (1:1). Хоосон бол slideshow харагдахгүй.', value: '', order: 16 },
    { key: 'student-life.annual.3.image.2', group: 'student-life', type: 'IMAGE' as const, label: '3-р арга хэмжээ — Зураг 2', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 17 },
    { key: 'student-life.annual.3.image.3', group: 'student-life', type: 'IMAGE' as const, label: '3-р арга хэмжээ — Зураг 3', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 18 },
    { key: 'student-life.annual.3.image.4', group: 'student-life', type: 'IMAGE' as const, label: '3-р арга хэмжээ — Зураг 4', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 19 },
    { key: 'student-life.annual.4.title', group: 'student-life', type: 'TEXT' as const, label: 'Жил бүрийн арга хэмжээ — 4', value: 'Сайн үйлсийн аян (өвөл / хавар)', order: 20 },
    { key: 'student-life.annual.4.image.1', group: 'student-life', type: 'IMAGE' as const, label: '4-р арга хэмжээ — Зураг 1', hint: 'Квадрат зураг (1:1). Хоосон бол slideshow харагдахгүй.', value: '', order: 21 },
    { key: 'student-life.annual.4.image.2', group: 'student-life', type: 'IMAGE' as const, label: '4-р арга хэмжээ — Зураг 2', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 22 },
    { key: 'student-life.annual.4.image.3', group: 'student-life', type: 'IMAGE' as const, label: '4-р арга хэмжээ — Зураг 3', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 23 },
    { key: 'student-life.annual.4.image.4', group: 'student-life', type: 'IMAGE' as const, label: '4-р арга хэмжээ — Зураг 4', hint: 'Квадрат зураг (1:1). Заавал биш.', value: '', order: 24 },

    { key: 'student-life.testimonial.heading', group: 'student-life', type: 'TEXT' as const, label: 'Оюутны үг — Гарчиг', value: 'ОЮУТНУУДЫН ҮГ', order: 30 },
    { key: 'student-life.testimonial.1.quote', group: 'student-life', type: 'TEXT' as const, label: 'Оюутны үг — 1 (ишлэл)', value: 'Энэ жил Соёл Эрдэмд элсэн орсон. Ирэх жил Япон явахаар явах болсондоо маш баяртай байна. Багш нарын заах арга, харилцааны соёл үнэхээр сайхан.', multiline: true, order: 31 },
    { key: 'student-life.testimonial.1.byline', group: 'student-life', type: 'TEXT' as const, label: 'Оюутны үг — 1 (нэр)', hint: 'Жишээ: Далантай · 21 · Япон хэлний орчуулагч анги', value: 'Далантай · 21 · Япон хэлний орчуулагч анги', order: 32 },
    { key: 'student-life.testimonial.2.quote', group: 'student-life', type: 'TEXT' as const, label: 'Оюутны үг — 2 (ишлэл)', value: 'Интерншип хөтөлбөрөөр Япон явж дадлага хийсэн нь миний амьдралын хамгийн чухал туршлага байсан. Цалинтай дадлага хийж, япон соёл, ёс заншилтай танилцах боломж гайхалтай.', multiline: true, order: 33 },
    { key: 'student-life.testimonial.2.byline', group: 'student-life', type: 'TEXT' as const, label: 'Оюутны үг — 2 (нэр)', value: 'Гэрэлт-Од · 23 · Аялал жуулчлалын менежмент', order: 34 },
    { key: 'student-life.testimonial.3.quote', group: 'student-life', type: 'TEXT' as const, label: 'Оюутны үг — 3 (ишлэл)', value: 'Соёл Эрдэмд суралцсан 4 жил миний амьдралд эргэлт хийсэн. Одоо Япон корпорацид программистаар ажиллаж байна. Бид төгсөгчид болон одоогийн оюутнууд бол нэг гэр бүл.', multiline: true, order: 35 },
    { key: 'student-life.testimonial.3.byline', group: 'student-life', type: 'TEXT' as const, label: 'Оюутны үг — 3 (нэр)', value: 'Наймангал · 26 · Программ хангамж — төгсөгч', order: 36 },

    // Per-chapter slideshow images + caption — admin uploads up to 4 photos
    // per chapter; the public page collapses the slideshow cleanly when the
    // chapter has no images. Order numbers 100+ keep these grouped together
    // at the end of the student-life admin form.
    ...([
      ['bunkyosai', 'Бүнкёосай'],
      ['sport', 'Спорт, аялал'],
      ['shiliin-bulag', '"Шилийн булаг" дадлага'],
      ['hippo-family', 'Хиппо Фамили групп'],
      ['dormitory', 'Дотуур байр'],
      ['volunteer', 'Сайн үйлсийн аян'],
      ['research', 'Эрдэм шинжилгээ'],
      ['scholarship', 'Тэтгэлэг, урамшуулал'],
      ['student-council', 'Оюутны зөвлөл'],
      ['graduates', 'Төгсөгчид'],
      ['japan-dance', 'Япон бүжгийн парад'],
      ['rural-program', 'Албан бус сургалт — 30 жилийн ой'],
    ] as const).flatMap(([id, label], chIdx) => {
      const base = 100 + chIdx * 5;
      return [
        { key: `student-life.chapter.${id}.image.1`, group: 'student-life', type: 'IMAGE' as const, label: `${label} — Зураг 1`, hint: 'Бүлэгт харагдах slideshow (16:9). Хоосон бол slideshow гарахгүй.', value: '', order: base },
        { key: `student-life.chapter.${id}.image.2`, group: 'student-life', type: 'IMAGE' as const, label: `${label} — Зураг 2`, hint: 'Заавал биш.', value: '', order: base + 1 },
        { key: `student-life.chapter.${id}.image.3`, group: 'student-life', type: 'IMAGE' as const, label: `${label} — Зураг 3`, hint: 'Заавал биш.', value: '', order: base + 2 },
        { key: `student-life.chapter.${id}.image.4`, group: 'student-life', type: 'IMAGE' as const, label: `${label} — Зураг 4`, hint: 'Заавал биш.', value: '', order: base + 3 },
        { key: `student-life.chapter.${id}.caption`, group: 'student-life', type: 'TEXT' as const, label: `${label} — Зургийн тайлбар`, hint: 'Slideshow-н доор харагдах нэг мөр тайлбар. Заавал биш.', value: '', order: base + 4 },
      ];
    }),

    // Annual-event captions — one line shown under the square slideshow on
    // each "Жил бүрийн арга хэмжээ" card.
    ...[1, 2, 3, 4].map((i) => ({
      key: `student-life.annual.${i}.caption`,
      group: 'student-life',
      type: 'TEXT' as const,
      label: `${i}-р арга хэмжээ — Зургийн тайлбар`,
      hint: 'Slideshow-н доор харагдах нэг мөр. Заавал биш.',
      value: '',
      order: 200 + i,
    })),

    // Per-testimonial portrait photo — round avatar shown next to the name.
    ...[1, 2, 3].map((i) => ({
      key: `student-life.testimonial.${i}.photo`,
      group: 'student-life',
      type: 'IMAGE' as const,
      label: `Оюутны үг — ${i} (зураг)`,
      hint: 'Дугуй хөргийн зураг (квадрат хэлбэртэй сайн). Заавал биш.',
      value: '',
      order: 210 + i,
    })),

    // Admission page (/admission) — foreign-student section content.
    // Main intro paragraph + CTA button (label and target URL), followed
    // by three editable permit cards (visa, residence, registration).
    { key: 'admission.foreign.intro', group: 'admission', type: 'TEXT' as const, label: 'Гадаад оюутан — Үндсэн тайлбар', hint: 'Гадаад оюутан элсэх ерөнхий мэдээлэл.', value: 'Гадаадын иргэн манай сургуульд элсэхэд бүрдүүлэх материал, виза дэмжих захидал, оршин суух зөвшөөрөл, элсэлтийн журам зэрэг мэдээллийг доорх журам бичигт танилцана уу. Дэлгэрэнгүйг гадаад харилцааны албатай холбогдоно уу.', multiline: true, order: 1 },
    { key: 'admission.foreign.cta.label', group: 'admission', type: 'TEXT' as const, label: 'Гадаад оюутан — Үндсэн товчны нэр', value: 'Гадаад оюутан элсүүлэх журам', order: 2 },
    { key: 'admission.foreign.cta.href', group: 'admission', type: 'TEXT' as const, label: 'Гадаад оюутан — Товчны URL', hint: 'PDF журамын URL эсвэл /contact гэх мэт холбоос.', value: '/contact', order: 3 },

    { key: 'admission.permit.1.title', group: 'admission', type: 'TEXT' as const, label: '1-р зөвшөөрөл — Гарчиг', value: 'Виза зөвшөөрөл', order: 11 },
    { key: 'admission.permit.1.body', group: 'admission', type: 'TEXT' as const, label: '1-р зөвшөөрөл — Тайлбар', hint: 'Зөвшөөрлийг хэрхэн авах талаар тайлбар.', value: 'Гадаадын иргэн Монгол улсад оюутны визээр (D ангилал) орж ирнэ. Сургууль виза дэмжих захидал, элсэн суралцагчийн гэрчилгээ, орох баталгаа зэрэг шаардлагатай материалуудыг бэлдэж өгнө. Виза хүсэлтийг өөрийн орны Монголын Элчин сайдын яам / консулд гаргана.', multiline: true, order: 12 },
    { key: 'admission.permit.1.contact', group: 'admission', type: 'TEXT' as const, label: '1-р зөвшөөрөл — Хаана хандах', hint: 'Холбогдох ажилтан / газрын мэдээлэл.', value: 'Холбоо барих: Гадаад харилцааны алба\n7011-8584 · soyolerdem.daigaku@gmail.com', multiline: true, order: 13 },

    { key: 'admission.permit.2.title', group: 'admission', type: 'TEXT' as const, label: '2-р зөвшөөрөл — Гарчиг', value: 'Оршин суух зөвшөөрөл', order: 21 },
    { key: 'admission.permit.2.body', group: 'admission', type: 'TEXT' as const, label: '2-р зөвшөөрөл — Тайлбар', value: 'Монгол улсад 90-өөс дээш хоног оршин суух гадаадын иргэн ИХУГ (Иргэн харьяат ба гадаадын иргэний газар)-аас оршин суух зөвшөөрөл авна. Сургууль талаас элсэн суралцагчийн мэдэгдэл, гэрчилгээг гарган өгнө.', multiline: true, order: 22 },
    { key: 'admission.permit.2.contact', group: 'admission', type: 'TEXT' as const, label: '2-р зөвшөөрөл — Хаана хандах', value: 'Хүсэлт гаргах: ИХУГ · 1900-1882 · mia.gov.mn\nСургуулийн талд: Гадаад харилцааны алба', multiline: true, order: 23 },

    { key: 'admission.permit.3.title', group: 'admission', type: 'TEXT' as const, label: '3-р зөвшөөрөл — Гарчиг', value: 'Бүртгэлийн зөвшөөрөл', order: 31 },
    { key: 'admission.permit.3.body', group: 'admission', type: 'TEXT' as const, label: '3-р зөвшөөрөл — Тайлбар', value: 'БСШУС-ын яамны харьяа Боловсролын магадлан итгэмжлэх төвөөр гадаад иргэний элсэлтийн бичиг баримтыг батлуулна. Бакалаврын зэрэг олгох хүртэлх албан ёсны үйл явц.', multiline: true, order: 32 },
    { key: 'admission.permit.3.contact', group: 'admission', type: 'TEXT' as const, label: '3-р зөвшөөрөл — Хаана хандах', value: 'Холбоо барих: Сургалтын алба · 7011-8589', multiline: true, order: 33 },

    // Inner-page banner photos — each one drives the <PageHero> photo on
    // its page. Empty value falls back to /nice_banner.png (the default).
    { key: 'page.programs.banner', group: 'banners', type: 'IMAGE' as const, label: 'Сургалт хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 1 },
    { key: 'page.research.banner', group: 'banners', type: 'IMAGE' as const, label: 'Эрдэм шинжилгээ хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 2 },
    { key: 'page.student-life.banner', group: 'banners', type: 'IMAGE' as const, label: 'Оюутан хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 3 },
    { key: 'page.international.banner', group: 'banners', type: 'IMAGE' as const, label: 'Хамтын ажиллагаа хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 4 },
    { key: 'page.news.banner', group: 'banners', type: 'IMAGE' as const, label: 'Мэдээ хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 5 },
    { key: 'page.admission.banner', group: 'banners', type: 'IMAGE' as const, label: 'Элсэлт хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 6 },
    { key: 'page.admission-register.banner', group: 'banners', type: 'IMAGE' as const, label: 'Цахим бүртгэл хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 7 },
    { key: 'page.careers.banner', group: 'banners', type: 'IMAGE' as const, label: 'Нээлттэй ажлын байр хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 8 },
    { key: 'page.careers-apply.banner', group: 'banners', type: 'IMAGE' as const, label: 'Ажлын анкет хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 9 },
    { key: 'page.contact.banner', group: 'banners', type: 'IMAGE' as const, label: 'Холбоо барих хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 10 },
    { key: 'page.library.banner', group: 'banners', type: 'IMAGE' as const, label: 'Номын сан хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 11 },
    { key: 'page.regulations.banner', group: 'banners', type: 'IMAGE' as const, label: 'Дүрэм журам хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 12 },
    { key: 'page.sonin-hewlel.banner', group: 'banners', type: 'IMAGE' as const, label: 'Сонин хэвлэл хуудасны banner', hint: 'Өргөн форматын зураг (12:3, ~1440×360px тохиромжтой).', value: '', order: 13 },
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

  /* Staff — org-chart placeholders (admin can edit each). */
  const staff = [
    { positionKey: 'rector', position: 'Захирал', name: 'Т. Дорждагва', degree: 'Доктор (PhD), Дэд профессор', bio: 'Соёл Эрдэм Дээд Сургуулийн захирлаар олон жил ажиллаж буй, япон судлалын чиглэлээр докторын зэрэг хамгаалсан судлаач.', order: 0 },
    { positionKey: 'academic-affairs', position: 'Сургалтын албаны эрхлэгч', name: 'Ц. Цэвэгсүрэн', degree: 'Магистр (MS)', bio: 'Сургалтын чанар, шинэчлэлийн чиглэлээр 10+ жил ажилласан мэргэжилтэн.', order: 1 },
    { positionKey: 'scientific-secretary', position: 'Эрдэмтэн нарийн бичгийн дарга', name: 'Б. Мөнхзул', degree: 'Доктор (PhD)', bio: 'Эрдэм шинжилгээний бодлого, ахисан түвшний хөтөлбөрийн координатор.', order: 2 },
    { positionKey: 'admin-finance', position: 'Захиргаа, санхүү, аж ахуйн эрхлэгч', name: 'Г. Балжинням', degree: 'Магистр (MBA)', bio: 'Санхүү, аж ахуйн менежментийн чиглэлээр магистрын зэрэгтэй.', order: 3 },
    { positionKey: 'faculty-development', position: 'Багшийн хөгжлийн төвийн эрхлэгч', name: 'Р. Бямбаа', degree: 'Доктор (PhD)', bio: 'Сурган хүмүүжүүлэх ухаан, багш хөгжлийн арга зүйн чиглэлээр судлаач.', order: 4 },
    { positionKey: 'japanese-dept', position: 'Япон судлалын тэнхимийн эрхлэгч', name: 'С. Уранцэцэг', degree: 'Магистр (MA)', order: 5 },
    { positionKey: 'it-dept', position: 'Мэдээллийн технологийн тэнхимийн эрхлэгч', name: 'О. Цолмон', degree: 'Магистр (MS)', order: 6 },
    { positionKey: 'library', position: '"Хажимэ" номын сангийн эрхлэгч', name: 'Д. Сарантуяа', degree: 'Бакалавр (BA)', order: 7 },
    { positionKey: 'practice', position: 'Дадлагын баазын ахлах мэргэжилтэн', name: 'Л. Эрдэнэбат', degree: 'Магистр (MS)', order: 8 },
    { positionKey: 'graduate-studies', position: 'Ахисан түвшний сургалтын алба', name: 'Ч. Энхболд', degree: 'Доктор (PhD)', order: 9 },
    { positionKey: 'research-center', position: 'Судалгааны төвийн эрхлэгч', name: 'Ж. Гомбо-Очир', degree: 'Доктор (PhD), Профессор', order: 10 },
    { positionKey: 'archive', position: 'Архивын ахлах ажилтан', name: 'Н. Болормаа', degree: 'Бакалавр (BA)', order: 11 },
    { positionKey: 'marketing', position: 'Маркетингийн алба', name: 'Б. Оюун', degree: 'Магистр (MBA)', order: 12 },
    { positionKey: 'foreign-relations', position: 'Гадаад харилцааны албаны эрхлэгч', name: 'У. Энхтуяа', degree: 'Магистр (MA)', order: 13 },
    { positionKey: 'student-council', position: 'Оюутны зөвлөл', name: 'Сонгогдсон тэргүүн', degree: 'Оюутан удирдагч', order: 14 },
  ];
  for (const s of staff) {
    await prisma.staff.upsert({
      where: { positionKey: s.positionKey },
      update: {
        // Re-seed only updates structural metadata — leave admin-edited
        // photo / bio / email / phone alone once they've been touched.
        position: s.position,
        order: s.order,
      },
      create: { ...s, active: true },
    });
  }
  console.log(`✓ Staff (${staff.length})`);

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
