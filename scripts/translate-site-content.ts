/**
 * One-shot translation script: hand-written EN / JP for every TEXT
 * row in SiteContent. Rows with literal values (URLs, phone numbers,
 * emails) are intentionally left as null so the public page falls
 * back to the canonical Mongolian value (or the page's translation
 * bundle). Empty-value rows (admin hasn't filled the captions yet)
 * are also skipped.
 *
 * Re-runnable: writes valueEn / valueJa on each matched key.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface T {
  en: string;
  ja: string;
}

const translations: Record<string, T> = {
  /* ─────────────── about ─────────────── */
  'about.hero.title.line1': { en: 'SOYOL ERDEM', ja: 'ソヨル・エルデム' },
  'about.hero.title.line2': { en: 'UNIVERSITY', ja: '大学' },
  'about.hero.body': {
    en: "Founded in 1993 with 100% Japanese investment, Soyol Erdem University is Mongolia's leading institution for Japanese-language education. We cooperate with 30+ Japanese universities and run an active student exchange programme. To date we have prepared more than 1,500 graduates, around 40% of whom go on to study or work in Japan.",
    ja: '日本の100%出資により1993年に設立されたソヨル・エルデム大学は、日本語教育においてモンゴルを代表する大学です。日本の30以上の大学と連携し、学生交換プログラムを継続的に実施しています。これまでに1,500名を超える卒業生を輩出し、その約40%が日本で学び、または働いています。',
  },
  'about.hero.cta_label': { en: 'About us', ja: '大学について' },
  'about.founder.name': { en: 'Soichi Makihara', ja: '牧原 荘一' },
  'about.founder.title': {
    en: 'Founder, Chair of the Board',
    ja: '創立者・理事長',
  },
  'about.founder.message': {
    en: "Soyol Erdem University is the only institution in Mongolia centred on Japanese-language education. We were born from the friendship and cooperation between the Mongolian and Japanese peoples, and from the trust and respect that binds Mongolians across the world. The Mongolian nation has its centre in Mongolia and extends across the vast territories of China and Russia. The twentieth century was, for our nation, a hard era spent under the fist of great powers. The winds of democracy that began in 1989 with the Soviet Union and Eastern Europe brought new thinking and a new atmosphere to Mongolia.\n\nWith that, the seventy-year Soviet dictatorship came to an end, Mongolia's independence was restored, and Mongolians won a golden chance to be masters in their own land. In our globalising age, the world needs people with broad knowledge, far-reaching thought, calm and gentle hearts, sincerity in everything they do, and professional skill. Soyol Erdem University's purpose is to teach and shape just such people — people who will contribute to peace and prosperity in human society, who love their natural world, who do not discriminate by ancestry, race, or religion, and who hold a faith of their own.\n\nIt is to prepare human beings who will be companions to one another, cells of the great body of humanity, branches of a compassionate society.\n\nThrough education we must learn the generous spirit of Genghis Khan, the traditional thinking of the Mongol world, the highest forms of friendship and courage. We must learn never to forget a kindness, to honour trust, to live with ethics — the wisdom of these things, and the wonder of growth. We watch joyfully as Mongolians around the world flourish further, carried by the dreams and hopes of the citizens of a reborn Mongolia. Soyol Erdem University will continue to strive to be an educational and cultural institution that prepares people of conviction — people who give all they have for a humane democratic society and for the flowering of their nation.",
    ja: 'ソヨル・エルデム大学は、日本語教育を主軸とするモンゴル唯一の大学です。本学はモンゴルと日本の両国民の友情・協力、そして世界中のモンゴル人を結ぶ信頼と敬愛のもとに設立されました。モンゴル民族はモンゴル国を中心に、中国・ロシアの広大な土地に広がって暮らしてきました。20世紀は、わがモンゴル民族にとって大国の支配下で艱難辛苦を経験した時代でした。1989年、ソ連と東欧諸国に端を発した民主化の風はモンゴルに新しい思考と新しい空気をもたらしました。\n\nこうして70年にわたるソ連の独裁は終わり、モンゴルの独立が回復され、モンゴル人は故郷の主人となる黄金の機会を得たのです。グローバル化のこの時代、社会は幅広い知識を持ち、広い視野で考えることができ、穏やかで優しい心を持ち、誠実に物事に取り組める、専門性を備えた人材を必要としています。本学の目的は、人類社会の平和と繁栄に貢献し、自然を愛し、出自・人種・宗教で差別することのない、自らの信念を持った人間を育てることです。\n\n人と人とが互いに友であり、人類社会という一つの細胞として、慈悲ある社会の一枝となる人間を育てることです。\n\n私たちは教育を通じて、チンギス・ハーンの寛大な精神、モンゴル全体に流れる伝統的思考、友情と勇気の極みを学ばなければなりません。人の恩を忘れない、信頼を重んじる、倫理を尊ぶという知恵、そして成長することの素晴らしさを。再生したモンゴル国の市民の夢と未来への信頼に支えられ、世界のモンゴル人がさらに花開いていくことを喜びとともに待っています。ソヨル・エルデム大学は、人道的で民主的な社会と、わが民族の繁栄のために全てを捧げる信念ある人間を育てる、教育文化機関であり続けるために、これからも全力で取り組んでまいります。',
  },
  'about.director.name': { en: 'D. Erdenechimeg', ja: 'Д.エルデネチメグ' },
  'about.director.title': {
    en: 'Executive Director, Soyol Erdem University',
    ja: 'ソヨル・エルデム大学 学長',
  },
  'about.director.message': {
    en: "Esteemed professors, faculty and staff, students and successive generations of graduates, and representatives of our partner institutions — to all of you who form the bridge of cooperation between Mongolia and Japan that is Soyol Erdem University, I extend my warmest greetings for the day.\n\nSoyol Erdem University was founded in 1996 with 100% Japanese investment. We have been accredited three times, and approximately 1,500 students have so far graduated from our halls and gone on to contribute to the development of our country. Around 40% of our graduates work and live successfully in Japan — a figure that speaks to the achievements of our alumni.\n\nSoyol Erdem offers students many opportunities: 50% and 100% scholarships for study in Japan, paid language and culture placements earning around 2.5 million Mongolian Tögrögs per month, summer language-preparation courses on full scholarship for both teachers and students, and post-graduation employment opportunities in Japan in their field or under a contract. We are also developing 2+2 and 1+3 software-engineering pathways.\n\nIn addition to associate's and bachelor's programmes in foreign-language translation, software engineering, tourism, international area studies and economics, and a master's programme in foreign-language linguistics, we also run a specialised Japanese-language and IT senior high school.\n\nWe will continue to work diligently to achieve our goal of preparing professionals who honour our cultural tradition, value learning, respect global development, strive for research excellence, and are accepted in both the Mongolian and Japanese markets.\n\nOur doors are always open to those who wish to enroll in any of our programmes and become the highly educated, capable professionals who will carry our country's future development forward through quality education rooted in Japanese culture.",
    ja: 'モンゴルと日本を結ぶ架け橋となっているソヨル・エルデム大学の尊敬すべき教授・教職員、学生諸君、歴代の卒業生、そして提携機関の代表者の皆様に、本日の挨拶を心より申し上げます！\n\n日本100%出資のソヨル・エルデム大学は1996年に設立され、3度の認証評価を受けた機関であり、これまでに約1,500名の学生が卒業し、社会へと巣立ち、祖国の発展に貢献し続けています。卒業生の約40%が日本で活躍していることは、本学卒業生の成果を示す指標です。\n\n本学は学生に対し、日本での50%・100%奨学金留学、月収約250万トゥグルグの有給言語・文化実習、夏季の100%奨学金による言語準備講座、卒業後の日本での専門職就労や契約勤務など、多くの機会を提供しています。また、2+2および1+3のソフトウェア工学プログラムも準備中です。\n\n外国語通訳、ソフトウェア工学、観光、国際地域研究、経済の準学士・学士プログラム、外国語言語学の修士プログラムに加え、日本語・情報技術専門の高等学校も運営しています。\n\n私たちは文化的伝統を重んじ、学問を尊び、グローバル化に対応し、研究の卓越性を追求し、モンゴル・日本の両市場で通用する専門家を育てるという目標の実現に向けて、これからも全力で取り組んでまいります。\n\n質の高い教育、日本文化を尊ぶ精神を通じて、我が国の未来を担う高い教養と能力を備えた専門家になるための各課程に入学・進学される皆様に、本学の扉はいつでも開かれています。',
  },

  /* ─────────────── admission ─────────────── */
  'admission.foreign.intro': {
    en: 'International applicants — please refer to the regulations below for the required documents, visa-support letter, residence permit and admission procedure. For details, contact our International Affairs office.\n',
    ja: '外国人留学生としての出願をお考えの方は、下記の規程で必要書類、ビザサポートレター、在留許可、入学手順をご確認ください。詳細は国際交流課までお問い合わせください。\n',
  },
  'admission.foreign.cta.label': {
    en: 'International admission regulations',
    ja: '留学生入学規程',
  },
  'admission.permit.1.title': { en: 'Visa permit', ja: 'ビザ' },
  'admission.permit.1.body': {
    en: 'International applicants enter Mongolia on a student visa (Category D). The university provides the visa-support letter, the enrolment certificate, the admission guarantee and any other required materials. The visa application itself is submitted to a Mongolian Embassy or consulate in your country.\nInternational applicants enter Mongolia on a student visa (Category D). The university provides the visa-support letter, the enrolment certificate, the admission guarantee and any other required materials. The visa application itself is submitted to a Mongolian Embassy or consulate in your country.\nInternational applicants enter Mongolia on a student visa (Category D). The university provides the visa-support letter, the enrolment certificate, the admission guarantee and any other required materials. The visa application itself is submitted to a Mongolian Embassy or consulate in your country.',
    ja: '外国人留学生はモンゴル国に学生ビザ（Dカテゴリ）で入国します。大学側はビザサポートレター、在籍証明書、入学保証書などの必要書類を準備します。ビザの申請はご自身の国にあるモンゴル大使館または領事館に提出します。\n外国人留学生はモンゴル国に学生ビザ（Dカテゴリ）で入国します。大学側はビザサポートレター、在籍証明書、入学保証書などの必要書類を準備します。ビザの申請はご自身の国にあるモンゴル大使館または領事館に提出します。\n外国人留学生はモンゴル国に学生ビザ（Dカテゴリ）で入国します。大学側はビザサポートレター、在籍証明書、入学保証書などの必要書類を準備します。ビザの申請はご自身の国にあるモンゴル大使館または領事館に提出します。',
  },
  'admission.permit.1.contact': {
    en: 'Contact: International Affairs office\n+976 7011-8584 · soyolerdem.daigaku@gmail.com',
    ja: 'お問い合わせ：国際交流課\n+976 7011-8584 · soyolerdem.daigaku@gmail.com',
  },
  'admission.permit.2.title': { en: 'Residence permit', ja: '在留許可' },
  'admission.permit.2.body': {
    en: 'International nationals staying in Mongolia for more than 90 days must obtain a residence permit from the IAA (Immigration and Naturalisation Agency). The university provides the enrolment notification and certificate from its side.',
    ja: 'モンゴル国に90日を超えて滞在する外国人は、外国人・市民登録庁（IAA）から在留許可を取得する必要があります。大学側は在籍通知書・在籍証明書を発行します。',
  },
  'admission.permit.2.contact': {
    en: 'Apply at: IAA · 1900-1882 · mia.gov.mn\nUniversity side: International Affairs office',
    ja: '申請先：外国人・市民登録庁（IAA） · 1900-1882 · mia.gov.mn\n大学窓口：国際交流課',
  },
  'admission.permit.3.title': { en: 'Registration permit', ja: '登録許可' },
  'admission.permit.3.body': {
    en: 'Foreign-student admission documents are certified by the Education Accreditation Centre under the Ministry of Education, Culture, Science and Sport. The official process runs through to the conferral of the bachelor\'s degree.',
    ja: '教育・文化・科学・スポーツ省傘下の教育認証評価センターにて、外国人留学生の入学書類を認定いただきます。学士号授与までの公式手続きとなります。',
  },
  'admission.permit.3.contact': {
    en: 'Contact: Registrar\'s office · +976 7011-8589',
    ja: 'お問い合わせ：教務課 · +976 7011-8589',
  },

  /* ─────────────── ahlah-about ─────────────── */
  'ahlah-about.hero.subtitle': {
    en: 'About Soyol Erdem Senior High School.',
    ja: 'ソヨル・エルデム高等学校の学校紹介。',
  },
  'ahlah-about.body': {
    en: 'Soyol Erdem Senior High School was founded in 2023 as a specialised high school under Soyol Erdem University.',
    ja: 'ソヨル・エルデム高等学校は、ソヨル・エルデム大学附属の専門特化型高等学校として2023年に設立されました。',
  },

  /* ─────────────── ahlah-admission ─────────────── */
  'ahlah-admission.hero.subtitle': {
    en: 'Admission requirements and procedures for Soyol Erdem Senior High School.',
    ja: 'ソヨル・エルデム高等学校の入学条件と手続き。',
  },
  'ahlah-admission.body': {
    en: 'Open to students entering grades 10 and 11. Two specialised tracks: Japanese language and IT.',
    ja: '10年生・11年生の入学を受け付けています。日本語、IT専攻の2クラスで学びます。',
  },

  /* ─────────────── ahlah-contact ─────────────── */
  'ahlah-contact.hero.subtitle': {
    en: 'Get in touch with Soyol Erdem Senior High School.',
    ja: 'ソヨル・エルデム高等学校へのお問い合わせ。',
  },

  /* ─────────────── ahlah-home ─────────────── */
  'ahlah-home.hero.subtitle': {
    en: 'Diligent learners · Skilled teachers · Japanese language and culture',
    ja: '勤勉な学習者 ・ 熟練の教員 ・ 日本語と日本文化',
  },
  'ahlah-home.intro.badge': {
    en: 'Japanese-funded · established 2023',
    ja: '日本資本 ・ 2023年設立',
  },
  'ahlah-home.intro.title': {
    en: 'SOYOL ERDEM SENIOR HIGH SCHOOL',
    ja: 'ソヨル・エルデム高等学校',
  },
  'ahlah-home.intro.body': {
    en: "Established in 2023, Soyol Erdem Senior High School is a specialised secondary school under Soyol Erdem University. We deliver high-quality secondary education with a focus on Japanese language, culture and information technology.",
    ja: '2023年に設立された、ソヨル・エルデム大学附属の専門特化型高等学校です。日本語、日本文化、情報技術の分野で質の高い中等教育を提供しています。',
  },
  'ahlah-home.intro.body2': {
    en: "Building on the 30+ years of Japanese-studies expertise of our parent institution, Soyol Erdem University, our high-school programme specialises in Japanese language, culture and information technology while delivering the full national secondary curriculum.",
    ja: '母体であるソヨル・エルデム大学が30年以上にわたって培ってきた日本研究の知見を基盤に、日本語・日本文化・情報技術に特化しつつ、国の正規中等教育カリキュラムを提供しています。',
  },
  'ahlah-home.intro.overlay.eyebrow': {
    en: 'Senior High School',
    ja: 'Senior High School',
  },
  'ahlah-home.intro.overlay.title': {
    en: 'Soyol Erdem',
    ja: 'ソヨル・エルデム',
  },
  'ahlah-home.intro.overlay.subtitle': {
    en: 'A Japan–Mongolia education bridge',
    ja: '日本とモンゴルを結ぶ教育の架け橋',
  },
  'ahlah-home.philosophy.title': {
    en: 'OUR PHILOSOPHY',
    ja: '学校理念',
  },
  'ahlah-home.programs.title': {
    en: 'PROGRAMMES',
    ja: '教育プログラム',
  },
  'ahlah-home.programs.subtitle': {
    en: 'Japanese language, IT and the full secondary curriculum — plus a 2+2 exchange pathway.',
    ja: '日本語、IT、正規中等教育に加え、2+2交換プログラム。',
  },
  'ahlah-home.news.title': { en: 'LATEST NEWS', ja: '最新ニュース' },
  'ahlah-footer.tagline': {
    en: 'Specialised secondary school under Soyol Erdem University. Quality education in Japanese language, culture and IT.',
    ja: 'ソヨル・エルデム大学附属の専門特化型高等学校。日本語・日本文化・ITの分野で質の高い教育を提供。',
  },
  'ahlah-footer.address': {
    en: 'Olympic Street, 1st Khoroo, Sukhbaatar District, Ulaanbaatar',
    ja: 'モンゴル国ウランバートル市スフバートル区第1ホロー、オリンピック通り',
  },

  /* ─────────────── ahlah-programs ─────────────── */
  'ahlah-programs.hero.subtitle': {
    en: 'Senior High School academic programmes.',
    ja: '高等学校の教育プログラム。',
  },

  /* ─────────────── elearning ─────────────── */
  'elearning.hero.subtitle': {
    en: 'Learn anywhere, anytime — a flexible learning system built on the Moodle platform.',
    ja: 'どこでも、いつでも学べる ― Moodleプラットフォームに基づく柔軟な学習システム。',
  },
  'elearning.intro.badge': {
    en: 'Moodle platform · Soyol Erdem',
    ja: 'Moodleプラットフォーム ・ ソヨル・エルデム',
  },
  'elearning.intro.title': {
    en: 'Learn anywhere, anytime',
    ja: 'どこでも、いつでも学べる',
  },
  'elearning.intro.body': {
    en: 'Through our Moodle-based digital learning system, Soyol Erdem University gives students, working adults, residents of rural Mongolia and Mongolians living abroad the chance to study in a flexible format.',
    ja: 'ソヨル・エルデム大学はMoodleプラットフォームに基づく電子学習システムを通じて、学生、社会人、地方在住の方や海外在住のモンゴル人にも、柔軟な形で学ぶ機会を提供しています。',
  },
  'elearning.programs.title': {
    en: 'PROGRAMMES AVAILABLE ONLINE',
    ja: 'オンラインで学べる専攻',
  },
  'elearning.programs.subtitle': {
    en: 'You can study the following majors fully online — or take selected courses individually.',
    ja: '下記の専攻は全課程をオンラインで、または科目単位でオンラインで履修いただけます。',
  },
  'elearning.advantages.title': {
    en: 'ADVANTAGES OF E-LEARNING',
    ja: 'オンライン学習の利点',
  },
  'elearning.advantages.subtitle': {
    en: 'What makes it different from traditional classroom learning?',
    ja: '従来の対面授業との違いは？',
  },
  'elearning.audiences.title': { en: 'WHO IS IT FOR?', ja: '対象者' },
  'elearning.cisco.title': {
    en: 'CISCO Networking Academy',
    ja: 'CISCOネットワーキングアカデミー',
  },
  'elearning.cisco.body': {
    en: 'Soyol Erdem is an official member of the US-based CISCO Networking Academy. From 2023, our Software Engineering graduates receive official CISCO certification, opening the door to careers at international IT companies.',
    ja: 'ソヨル・エルデムは米国のCISCOネットワーキングアカデミーの公式加盟校です。2023年からソフトウェア工学専攻の卒業生は公式認定証を取得して卒業し、国際的なIT企業で活躍する道が開かれました。',
  },
  'elearning.cisco.students': {
    en: 'Undergraduate and master\'s students together with grade 10–12 high-school pupils take part in a dedicated programme outside class hours under faculty supervision. Successful completion earns the CISCO certification recognised internationally. Software Engineering year-4 students L. Buddorj, B. Bayaraa and E. Temuulen received the first certificates on 25 December 2023.',
    ja: '学部生・大学院生および10〜12年生の生徒が、課外の専用プログラムを教員指導のもとで履修します。修了するとCISCOの国際認定証が付与されます。ソフトウェア工学4年生のL.ブダルジ、B.バヤラー、E.テムレン各氏が2023年12月25日に最初の認定証を授与されました。',
  },
  'elearning.why.title': {
    en: 'A new educational solution that frees you from time, place and lifestyle',
    ja: '時間・場所・ライフスタイルにとらわれない、新しい教育の形',
  },
  'elearning.why.body': {
    en: "Soyol Erdem University's e-learning isn't just about awarding a diploma — it's a new educational solution that builds real working skills, opens international opportunities and frees you from constraints of time and place.",
    ja: 'ソヨル・エルデム大学のオンライン教育は学位授与にとどまらず、実務スキル、国際的な機会、時間・場所にとらわれない新しい教育の形を提供します。',
  },

  /* ─────────────── home ─────────────── */
  'home.hero.title.line1': { en: 'BEGIN YOUR', ja: '未来を' },
  'home.hero.title.line2': { en: 'FUTURE HERE', ja: 'ここから始めよう' },
  'home.hero.italic': {
    en: 'A leader in Japanese-language education',
    ja: '日本語教育のリーディング校',
  },
  'home.hero.body': {
    en: "Founded in 1993 with 100% Japanese investment, Soyol Erdem University is Mongolia's leading institution for Japanese-language education. We cooperate with 30+ Japanese universities and run an active student exchange programme. To date we have prepared more than 1,500 graduates, around 40% of whom go on to study or work in Japan.",
    ja: '日本の100%出資により1993年に設立されたソヨル・エルデム大学は、日本語教育においてモンゴルを代表する大学です。日本の30以上の大学と連携し、学生交換プログラムを継続的に実施しています。これまでに1,500名を超える卒業生を輩出し、その約40%が日本で学び、または働いています。',
  },
  'home.hero.cta_primary': { en: ' Choose your major', ja: ' 専攻を選ぶ' },
  'home.hero.cta_secondary': {
    en: 'Admission details',
    ja: '入学案内',
  },

  /* ─────────────── research ─────────────── */
  'research.dept.1.title': {
    en: 'Department of Japanese Studies',
    ja: '日本研究学科',
  },
  'research.dept.1.topics': {
    en: 'Japanese linguistics and literature\nJapanese–Mongolian and Mongolian–Japanese translation studies\nJapanese-language teaching methodology\nJapanese language & cultural studies\nMongolia–Japan and Japan–Mongolia relations\nJapan area studies',
    ja: '日本語学・日本文学\n日蒙・蒙日翻訳論\n日本語教授法\n日本語・日本文化研究\n日蒙関係・蒙日関係研究\n日本地域研究',
  },
  'research.dept.2.title': {
    en: 'Department of Information Technology',
    ja: '情報技術学科',
  },
  'research.dept.2.topics': {
    en: 'Network security\nApplied software engineering\nAutomation',
    ja: 'ネットワークセキュリティ\nソフトウェア応用\nオートメーション',
  },
  'research.dept.3.title': {
    en: 'Graduate-level research',
    ja: '大学院レベルの研究',
  },
  'research.dept.3.topics': {
    en: 'Japanese linguistics and literature\nJapanese–Mongolian and Mongolian–Japanese translation studies\nJapanese-language teaching methodology\nJapanese language & cultural studies\nMongolian studies and Mongolian literature',
    ja: '日本語学・日本文学\n日蒙・蒙日翻訳論\n日本語教授法\n日本語・日本文化研究\nモンゴル学・モンゴル文学',
  },
  'research.highlight.1': {
    en: 'Our academic staff form dedicated research-professor teams that pursue work along each priority research area.',
    ja: '本学の教員は、各重点分野ごとに研究教授チームを編成し、共同で研究活動を進めています。',
  },
  'research.highlight.2': {
    en: 'Since 2023, students graduating from our software-engineering programme earn an official CISCO Academy certificate, opening the door to IT careers worldwide. We also offer free training to all undergraduates in information-security specialisation, computer networking, Internet of Things, software, OS & IT, and Cisco Packet Tracer.',
    ja: '2023年度からソフトウェア工学専攻の卒業生はCISCOアカデミーの公式認定証を取得して卒業し、国際的なIT企業で活躍する道が開かれました。さらに学部生全員に対して、情報セキュリティ専門研修、コンピュータネットワーク、IoT、ソフトウェア、OS & IT、Cisco Packet Tracerなどの講習を無償で提供しています。',
  },
  'research.highlight.3': {
    en: "Starting this academic year, Soyol Erdem has adopted the MOODLE distance-learning platform for both online and blended courses. This lets international master's students and visiting interns continue their studies without losing momentum.",
    ja: '本年度よりソヨル・エルデムは、オンライン授業およびハイブリッド授業にMOODLE遠隔学習プラットフォームを導入しました。これにより海外から学ぶ大学院生や、交換留学・インターンシップ参加の学部生が、ブランクを生じることなく学業を継続できる環境が整いました。',
  },
  'research.journals.subtitle': {
    en: 'Browse every volume of the Soyol Erdem University academic journal.',
    ja: 'ソヨル・エルデム大学の学術ジャーナル各号をご覧いただけます。',
  },
  'research.journals.title': {
    en: 'ACADEMIC JOURNAL',
    ja: '学術ジャーナル',
  },

  /* ─────────────── student-life ─────────────── */
  'student-life.hero.title': { en: 'STUDENT LIFE', ja: '学生生活' },
  'student-life.hero.subtitle': {
    en: "We are family — at Soyol Erdem, class is only one piece of your six-year journey.",
    ja: '私たちは家族 ― ソヨル・エルデムでは、授業は6年間の旅の一部に過ぎません。',
  },
  'student-life.intro.body': {
    en: 'Being a student at Soyol Erdem is more than coursework — it is family, friends, new experiences and a defining chapter of your life. We support our students through clubs, sports, cultural events, internships, dormitory life and scholarships.',
    ja: 'ソヨル・エルデムでの学生生活は、授業だけにとどまりません。家族、友人、新しい体験、そして人生の重要な節目そのものです。クラブ、スポーツ、文化行事、インターンシップ、寮、奨学金まで、あらゆる面で学生を支援しています。',
  },
  'student-life.annual.heading': {
    en: 'ANNUAL HIGHLIGHTS',
    ja: '年間ハイライト',
  },
  'student-life.annual.1.title': {
    en: 'Bunkyosai — Japanese culture festival (December)',
    ja: '文教祭 ― 日本文化祭（12月）',
  },
  'student-life.annual.2.title': {
    en: 'Orientation hike (September–October)',
    ja: '新入生歓迎ハイキング（9〜10月）',
  },
  'student-life.annual.3.title': {
    en: 'Sports championships (autumn)',
    ja: 'スポーツ選手権大会（秋）',
  },
  'student-life.annual.4.title': {
    en: 'Volunteer campaigns (winter / spring)',
    ja: 'ボランティア活動（冬・春）',
  },
  'student-life.testimonial.heading': {
    en: 'STUDENT VOICES',
    ja: '学生の声',
  },
  'student-life.testimonial.1.quote': {
    en: "I enrolled at Soyol Erdem this year. I'm thrilled that next year I'll be heading to Japan. The teaching style and the way our faculty communicate are wonderful.",
    ja: '今年ソヨル・エルデムに入学しました。来年日本に行くことが決まり、とても嬉しいです。先生方の教え方やコミュニケーションの仕方が本当に素晴らしいです。',
  },
  'student-life.testimonial.1.byline': {
    en: 'Dalantai · 21 · Japanese Translation programme',
    ja: 'ダラントゥイ · 21 · 日本語通訳コース',
  },
  'student-life.testimonial.2.quote': {
    en: "Going to Japan on the Internship programme was the most important experience of my life. A paid placement that lets you experience Japanese culture and customs is incredible.",
    ja: 'インターンシッププログラムで日本に行き実習したことは、私の人生で最も大切な経験でした。有給で実習しながら日本の文化や習慣に触れられる機会は素晴らしいです。',
  },
  'student-life.testimonial.2.byline': {
    en: 'Gerelt-Od · 23 · Tourism Management',
    ja: 'ゲレルト＝オド · 23 · 観光経営',
  },
  'student-life.testimonial.3.quote': {
    en: "My four years at Soyol Erdem changed the course of my life. I now work as a software engineer at a Japanese corporation. Graduates and current students alike — we are one family.",
    ja: 'ソヨル・エルデムで学んだ4年間は私の人生の転機でした。今は日本企業でプログラマとして働いています。卒業生も在校生も、私たちは一つの家族です。',
  },
  'student-life.testimonial.3.byline': {
    en: 'Naimangal · 26 · Software Engineering — alumnus',
    ja: 'ナイマンガル · 26 · ソフトウェア工学 ― 卒業生',
  },
};

async function main() {
  const all = await prisma.siteContent.findMany({
    where: { type: 'TEXT' },
    select: { key: true, value: true },
  });

  let updated = 0;
  let skippedLiteral = 0;
  let skippedEmpty = 0;
  let skippedMissing: string[] = [];

  for (const row of all) {
    // Literal value rows we leave alone (URLs, phones, emails).
    if (
      row.key === 'admission.foreign.cta.href' ||
      row.key === 'elearning.moodle.url' ||
      row.key === 'ahlah-footer.phone.primary' ||
      row.key === 'ahlah-footer.phone.secondary' ||
      row.key === 'ahlah-footer.email'
    ) {
      skippedLiteral++;
      continue;
    }

    // Empty source values get an empty translation pair (no point in
    // translating nothing).
    if (!row.value || row.value.trim().length === 0) {
      skippedEmpty++;
      continue;
    }

    const t = translations[row.key];
    if (!t) {
      skippedMissing.push(row.key);
      continue;
    }

    await prisma.siteContent.update({
      where: { key: row.key },
      data: { valueEn: t.en, valueJa: t.ja },
    });
    updated++;
  }

  console.log(`✔ Updated:        ${updated}`);
  console.log(`  Skipped literal: ${skippedLiteral}`);
  console.log(`  Skipped empty:   ${skippedEmpty}`);
  if (skippedMissing.length > 0) {
    console.log(`  Missing keys:    ${skippedMissing.length}`);
    for (const k of skippedMissing) console.log(`    - ${k}`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
