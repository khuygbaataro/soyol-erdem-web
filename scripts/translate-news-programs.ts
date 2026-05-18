/**
 * One-shot translation script: hand-written EN / JP for every News
 * article + Program currently in the production DB. Re-runnable —
 * writes the *En / *Ja columns by slug.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface NewsT {
  title: { en: string; ja: string };
  excerpt: { en: string; ja: string };
  body: { en: string; ja: string };
}

const news: Record<string, NewsT> = {
  'speech-contest-31': {
    title: {
      en: 'Our students take first place at the 31st Japanese-language speech contest',
      ja: '第31回日本語スピーチコンテストで本学学生が優勝',
    },
    excerpt: {
      en: "Our university's students took first place at the 31st inter-university Japanese-language speech contest.",
      ja: '第31回学校対抗日本語スピーチコンテストにおいて、本学学生が最優秀賞を獲得しました。',
    },
    body: {
      en: 'The 31st speech contest was held from 15–17 November 2025. Our student B. Munkhzul took first place.',
      ja: '第31回スピーチコンテストは2025年11月15日〜17日に開催されました。本学のB.ムンフズル学生が優勝しました。',
    },
  },
  elchin: {
    title: {
      en: 'Ambassador M. Igawahara visited our university',
      ja: '猪川原 大使が本学をご訪問されました',
    },
    excerpt: {
      en: "H.E. M. Igawahara, Ambassador Extraordinary and Plenipotentiary of Japan to Mongolia, visited our university together with his spouse. They toured our new building, met with faculty members and held a friendly meeting.",
      ja: '在モンゴル日本国特命全権大使である猪川原大使がご令室同伴のもと本学を訪問され、新校舎の視察、教員との懇談および友好的な会合が行われました。',
    },
    body: {
      en: "H.E. M. Igawahara, Ambassador Extraordinary and Plenipotentiary of Japan to Mongolia, visited our university together with his spouse. They toured our new building, met with faculty members and held a friendly meeting.",
      ja: '在モンゴル日本国特命全権大使である猪川原大使がご令室同伴のもと本学を訪問され、新校舎の視察、教員との懇談および友好的な会合が行われました。',
    },
  },
  'fourth-accreditation': {
    title: {
      en: 'Entering our fourth round of accreditation',
      ja: '第4回認証評価を開始',
    },
    excerpt: {
      en: 'In 2025 our university begins its fourth round of accreditation by the Mongolian National Council for Education Accreditation. We were previously accredited in 2003, 2010 and 2020.',
      ja: '本学は2025年、モンゴル国教育認証評価協議会（БМИҮЗ）の第4回認証評価を開始しました。本学はこれまで2003年、2010年、2020年にいずれも認証を受けています。',
    },
    body: {
      en: 'Starting on 10 April 2025, the accreditation council\'s expert panel began assessing our self-evaluation report, the quality of our teaching, and the competence of our faculty.\n\nThe accreditation result is expected in Q4 of 2025.',
      ja: '2025年4月10日より、認証評価協議会の専門家チームが、本学の自己評価、教育の質、教授陣の能力などの評価を開始しました。\n\n認証評価の結果は2025年第4四半期に発表される予定です。',
    },
  },
  'internship-2024': {
    title: {
      en: '25 students depart for Japan on the Internship programme',
      ja: 'インターンシッププログラムで25名が日本へ',
    },
    excerpt: {
      en: 'A total of 25 students successfully passed the selection for the autumn 2024 Internship programme and have departed for Japan, where they will work on paid placements earning 150,000 yen per month.',
      ja: '2024年秋学期のインターンシッププログラムにおいて、選考を通過した計25名の学生が日本へ渡り、月給15万円の有給実習を開始しました。',
    },
    body: {
      en: "This term's interns will be placed at hotels, restaurants and IT companies in Tokyo, Osaka, Hokkaido and other regions.",
      ja: '本学期のインターン生は、東京、大阪、北海道など各地のホテル、レストラン、IT企業で実習を行います。',
    },
  },
  internship: {
    title: {
      en: 'Cooperation agreement with the Komazawa Women\'s University junior and senior high schools',
      ja: '駒沢女子大学中学校・高等学校との連携協定を締結',
    },
    excerpt: {
      en: "As part of expanding our international cooperation, our affiliated junior and senior high school under Soyol Erdem has entered into a cooperation agreement with the Komazawa Women's University junior and senior high schools in Japan. Under this agreement, students from the two schools will exchange experience, become acquainted with each other's language, culture, customs and lifestyle, and take part in short- and long-term student-exchange programmes. We will continue to expand the network of partner schools and develop the friendly, sustainable educational ties between Japan and Mongolia.",
      ja: '海外連携を拡大する取り組みの一環として、ソヨル・エルデム大学附属の中等・高等学校と、日本の駒沢女子大学中学校・高等学校との間で連携協定を締結しました。本協定の下、両校の生徒は相互の経験交流、言語・文化・習慣・生活体験、そして長期・短期の交換留学プログラムに参加することとなります。今後も連携校を増やしながら、日本とモンゴルの教育・文化交流を持続的に発展させてまいります。',
    },
    body: {
      en: "A signing ceremony for the comprehensive high-school cultural exchange agreement between Soyol Erdem University Senior High School and the Komazawa Women's University Junior & Senior High School was held at Komazawa Women's University.\nUnder this agreement, school trips to Mongolia by Komazawa Women's University Junior & Senior High School and short- and long-term study abroad at the same school by students of Soyol Erdem University Senior High School will now be possible.\nWe sincerely hope that the exchange between the two schools will develop further and that a fruitful cultural exchange will continue for many years to come.",
      // Original `body` is already in Japanese — preserve it verbatim.
      ja: 'モンゴル文化教育大学附属高等学校と駒沢女子大学中学校・高等学校との間で、高校生包括文化交流協定書の調印式が駒沢女子大学にて執り行われました。\n本協定により、今後は駒沢女子大学中学校・高等学校によるモンゴルでの修学旅行の実施や、モンゴル文化教育大学附属高等学校の生徒による同校への短期・長期留学が可能となります。\n両校の交流が今後一層発展し、実り多い文化交流が末永く続くことを心より祈念いたします。',
    },
  },
  'embassy-exhibition': {
    title: {
      en: 'Exhibition marking 50 years of Japan–Mongolia diplomatic relations',
      ja: '日蒙国交樹立50周年記念展示',
    },
    excerpt: {
      en: 'Together with the Embassy of Japan, we held the "History of Youth Exchange" photo exhibition at our library from 9–22 March.',
      ja: '在モンゴル日本国大使館との共催により、「青少年交流の歩み」と題する写真展を本学図書館にて3月9日〜22日に開催しました。',
    },
    body: {
      en: 'The exhibition was dedicated to the 50th anniversary of diplomatic relations between Japan and Mongolia. International guests and students took part.',
      ja: '本展示は日蒙国交樹立50周年を記念して開催されました。海外からの来賓および学生が参加しました。',
    },
  },
  '30-year-anniversary': {
    title: {
      en: "30th anniversary celebration held successfully",
      ja: '創立30周年記念式典を成功裏に開催',
    },
    excerpt: {
      en: "The 30th anniversary celebration of Soyol Erdem University's founding was held on 3 August 2023 — the same day on which Soyol Erdem Senior High School was newly founded.",
      ja: '2023年8月3日、ソヨル・エルデム大学創立30周年記念式典が開催され、同日にソヨル・エルデム高等学校の創立も発表されました。',
    },
    body: {
      en: "Our 30th-anniversary celebration was held in the main hall on 3 August 2023. The event was attended by senior teachers, alumni, current students and representatives of the Embassy of Japan in Mongolia.\n\nDirector T. Dorjdagva said, \"As one family, we will continue to lead Japanese-language education for the next 30 years.\"\n\nThe same day, the founding of Soyol Erdem Senior High School marked the beginning of a new chapter for our institution.",
      ja: '2023年8月3日、本学の中央ホールにて創立30周年記念式典を執り行いました。式典には、ベテラン教員、卒業生、在校生、在モンゴル日本国大使館の代表者の方々が出席されました。\n\nT.ドルジダグワ理事長は「私たちは一つの家族として、これからの30年も日本語教育のリーディング校であり続けます」と述べました。\n\n同日には附属ソヨル・エルデム高等学校の創立も発表され、新たな時代の幕開けとなりました。',
    },
  },
  // ─── High-school news ───
  komozawa: {
    title: {
      en: "Cooperation agreement with the Komazawa Women's University junior and senior high schools",
      ja: '駒沢女子大学中学校・高等学校との連携協定を締結',
    },
    excerpt: {
      en: "Cooperation agreement signed with the Komazawa Women's University junior and senior high schools.\n",
      ja: '駒沢女子大学中学校・高等学校との連携協定を締結しました。\n',
    },
    body: {
      en: "As part of expanding our international cooperation, our affiliated junior and senior high school under Soyol Erdem has entered into a cooperation agreement with the Komazawa Women's University junior and senior high schools in Japan. Under this agreement, students from the two schools will exchange experience, become acquainted with each other's language, culture, customs and lifestyle, and take part in short- and long-term student-exchange programmes. The school leadership emphasised that we will continue to expand the number of partner schools and develop the friendly, sustainable educational and cultural ties between Japan and Mongolia. 🇯🇵🇲🇳\n",
      ja: '海外連携を拡大する取り組みの一環として、ソヨル・エルデム大学附属の中等・高等学校と、日本の駒沢女子大学中学校・高等学校との間で連携協定を締結いたしました。本協定の下、両校の生徒は相互の経験交流、言語・文化・習慣・生活体験、そして長期・短期の交換留学プログラムに参加することとなります。式典では、両校の運営陣より、今後も連携校を増やし、日本とモンゴル両国の教育・文化交流を持続的かつ発展的に続けていく旨が強調されました。🇯🇵🇲🇳\n',
    },
  },
  turshilt: {
    // Test / placeholder row. We pass through the original literal so
    // the admin can replace it later.
    title: {
      en: 'Test',
      ja: 'テスト',
    },
    excerpt: {
      en: 'Homepage banner',
      ja: 'ホームページバナー',
    },
    body: {
      en: 'Homepage bannerHomepage bannerHomepage bannerHomepage banner',
      ja: 'ホームページバナーホームページバナーホームページバナーホームページバナー',
    },
  },
  japango: {
    title: {
      en: 'OUR STUDENTS DEPART TO STUDY IN JAPAN',
      ja: '日本留学へ出発しました',
    },
    excerpt: {
      en: 'OUR STUDENTS DEPART TO STUDY IN JAPAN',
      ja: '日本留学へ出発しました',
    },
    body: {
      en: "Our 10A student O. Bayasgalan and 12A student E. Mongontovruu — who joined us from Inner Mongolia — have been selected to study at Nihon Wellness Senior High School in Miyagi Prefecture, Japan. Their classmates, friends, faculty and parents are all delighted. This achievement is the result not only of their tireless effort and dedication, but also of the support of their teachers, mentors and families, and of strong cooperation across the school. We wish these two students, representing Mongolia abroad, the very best in their studies and in everything that lies ahead.",
      ja: '本校10A組のO.バヤスガラン君と、内モンゴル自治区から来て12A組で学ぶE.ムンゴンドブル君が、日本の宮城県にある日本ウエルネス高等学校に留学することになり、級友・教職員・保護者一同、たいへん喜んでおります。本成果は本人たちのたゆまぬ努力に加え、ご指導いただいた先生方、保護者、ご支援くださった皆様のご協力の賜物です。モンゴル国を代表して留学する二人の今後のさらなる活躍とご健勝をお祈りいたします。',
    },
  },
  '26rd': {
    title: {
      en: 'The 26th "Bunkyosai" was held',
      ja: '第26回「文教祭」を開催',
    },
    excerpt: {
      en: 'The 26th "Bunkyosai" was held\n',
      ja: '第26回「文教祭」を開催しました\n',
    },
    body: {
      en: "The traditional festival organised by Soyol Erdem University — \"Bunkyosai, the Japanese language and culture festival\" — has now been held successfully for the 26th consecutive year.\nBeyond promoting Japanese language and culture, the festival is the key event at which students report what they have learned. Students participate by class — performing Japanese-language choruses, plays, speeches and recitations — and improve their talents, skills and language ability by friendly competition with one another.",
      ja: 'ソヨル・エルデム大学が毎年伝統的に開催する「文教祭 ― 日本語・日本文化祭」が、26回目の今年も成功裏に開催されました。\n本祭は日本語・日本文化の普及だけでなく、学生・生徒が日本語学習の成果を発表する重要な行事でもあります。学生・生徒はクラス単位で日本語による合唱、演劇、スピーチ、朗読などの種目で参加し、互いに切磋琢磨しながら才能・技能・語学力を磨いていきます。',
    },
  },
};

interface ProgramT {
  name: { en: string; ja: string };
  shortDescription: { en: string; ja: string };
  fullDescription: { en: string; ja: string };
  skills: { en: string; ja: string };
  careerOutlook?: { en: string; ja: string };
}

const programs: Record<string, ProgramT> = {
  mongolianlang: {
    // Placeholder / test row — translation simply mirrors the
    // gibberish so the admin can clean it up.
    name: {
      en: 'Mongolian-language programme for international students',
      ja: '留学生向けモンゴル語コース',
    },
    shortDescription: {
      en: 'Mongolian-language programme for international students',
      ja: '留学生向けモンゴル語コース',
    },
    fullDescription: {
      en: 'эгжыхшэгжыхшэгжыхшэгжыхшэгжыхшэгжыхш',
      ja: 'эгжыхшэгжыхшэгжыхшэгжыхшэгжыхшэгжыхш',
    },
    skills: { en: 'эгжыхш', ja: 'эгжыхш' },
    careerOutlook: { en: 'эгжыхш', ja: 'эгжыхш' },
  },
  master: {
    name: { en: "Master's", ja: '修士課程' },
    shortDescription: {
      en: 'JAPANESE LINGUISTICS — MASTER\'S\n',
      ja: '日本語学 ― 修士課程\n',
    },
    fullDescription: {
      en: "Graduate-level research and translation\nTeach at university level\nWork as a researcher or consultant\n",
      ja: '研究・翻訳の上級レベル\n大学での教員職\n研究者・コンサルタントとしての就労\n',
    },
    skills: {
      en: "Graduate-level research and translation\nTeach at university level\nWork as a researcher or consultant\n",
      ja: '研究・翻訳の上級レベル\n大学での教員職\n研究者・コンサルタントとしての就労\n',
    },
  },
  'japanese-translation': {
    name: {
      en: 'Japanese Translation',
      ja: '日本語通訳・翻訳',
    },
    shortDescription: {
      en: 'Japanese spoken and written translation, plus linguistic research.',
      ja: '日本語の通訳・翻訳および言語学研究。',
    },
    fullDescription: {
      en: "The Japanese-Translation bachelor's programme trains professionals capable of performing spoken and written Japanese-language translation, independently leading and organising work in this field, and conducting research in oriental studies and linguistics — all through an academic curriculum.",
      ja: '「日本語通訳」学士課程では、日本語の通訳・翻訳業務、当該分野での自立した業務運営・組織、東洋学および言語学の研究を行える専門家を、学術カリキュラムを通じて養成します。',
    },
    skills: {
      en: 'Japanese-language proficiency at JLPT N1 / N2 level\nSpoken and written translation skills\nLinguistics and translation theory\nUnderstanding of Japanese culture and ethics',
      ja: 'JLPT N1・N2レベルの日本語能力\n通訳・翻訳の実務スキル\n言語学および翻訳論の理論\n日本の文化・倫理観の理解',
    },
    careerOutlook: {
      en: "Graduates work as professional translators / interpreters at international organisations and embassies of Japan and Mongolia, at translation bureaus and at schools teaching Japanese. They also move into account-manager, translator and diplomatic-document editor roles at Japanese branches in Mongolia, export-import firms and tourism companies. Continuation is possible via a master's degree and research career, or by transferring to Japan through 1+3 / 2+2 pathways.",
      ja: '日本・モンゴルの国際機関や大使館、翻訳事務所、日本語教育機関で専門通訳・翻訳者として活躍します。また、在モンゴル日系企業の支社、貿易商社、観光業界では渉外・通訳担当、外交文書編集者などの職務に就くこともあります。修士課程に進学して研究職に就く道や、1+3・2+2プログラムで日本へ留学する道も開かれています。',
    },
  },
  'foreign-languagetranslation': {
    name: { en: 'Foreign-Language Translation', ja: '外国語通訳・翻訳' },
    shortDescription: {
      en: 'Japanese spoken and written translation, plus linguistic research.',
      ja: '日本語の通訳・翻訳および言語学研究。',
    },
    fullDescription: {
      en: "The Japanese-Translation bachelor's programme trains professionals capable of performing spoken and written Japanese-language translation, independently leading and organising work in this field, and conducting research in oriental studies and linguistics — all through an academic curriculum.",
      ja: '「日本語通訳」学士課程では、日本語の通訳・翻訳業務、当該分野での自立した業務運営・組織、東洋学および言語学の研究を行える専門家を、学術カリキュラムを通じて養成します。',
    },
    skills: {
      en: 'Japanese-language proficiency at JLPT N1 / N2 level\nSpoken and written translation skills\nLinguistics and translation theory\nUnderstanding of Japanese culture and ethics',
      ja: 'JLPT N1・N2レベルの日本語能力\n通訳・翻訳の実務スキル\n言語学および翻訳論の理論\n日本の文化・倫理観の理解',
    },
  },
  'tourism-management': {
    name: { en: 'Tourism Management', ja: '観光経営' },
    shortDescription: {
      en: 'Professionals for the tourism industry.',
      ja: '観光業界の専門人材。',
    },
    fullDescription: {
      en: "A bachelor's-degree programme dedicated to preparing professional staff for government, business, civic, international and service organisations in the tourism industry.",
      ja: '観光業界における政府機関、企業、公的団体、国際機関、サービス事業者向けに、専門人材を養成する学士課程プログラムです。',
    },
    skills: {
      en: 'Hotel, restaurant and tour management\nJapanese service-industry vocabulary\nInternational tourism standards\nHospitality and consumer psychology',
      ja: 'ホテル・レストラン・旅行業の経営\n接客業向け日本語表現\n国際観光基準\nホスピタリティおよび消費者心理',
    },
    careerOutlook: {
      en: "Graduates work as managers, marketing specialists or international-relations staff at international hotels, restaurants, travel agencies and airport / air-transport companies. Paid placements at Japanese hotels are also possible. The programme also prepares students to start their own travel firm or organise Japan–Mongolia tour itineraries.",
      ja: '国際的なホテル、レストラン、旅行代理店、空港・航空輸送業界において、マネージャー、マーケティング担当、渉外担当として活躍します。日本のホテルでの有給実習プログラムへの参加も可能です。また将来的に自社の旅行会社を立ち上げ、日蒙間の旅行を企画できる経験豊富な人材として卒業できるよう育成します。',
    },
  },
  'international-relations': {
    name: { en: 'International & Area Studies', ja: '国際・地域研究' },
    shortDescription: {
      en: 'Japanese and international politics, economics and cultural studies.',
      ja: '日本および国際的な政治・経済・文化研究。',
    },
    fullDescription: {
      en: 'The International & Area Studies programme equips students to research Japan and international politics, economics, culture and social relations on a scientific basis, preparing professionals who combine the knowledge, skills and ethics required to work in international affairs.',
      ja: '国際・地域研究プログラムでは、日本および国際的な政治、経済、文化、社会関係を学術的に研究し、国際関係の現場で活躍するために必要な知識・技能・倫理を兼ね備えた専門家を養成します。',
    },
    skills: {
      en: 'Japan and East-Asia area studies\nDiplomatic relations and foreign policy\nOrganisational structure of international institutions\nSelected research methodology',
      ja: '日本および東アジア地域研究\n外交関係と対外政策\n国際機関の組織運営\n精選された研究方法論',
    },
    careerOutlook: {
      en: "Graduates work as specialists at the Ministry of Foreign Affairs, embassies, international organisations (JICA, UN, ILO field offices), research centres and the diplomatic academy. They also move into international-relations, marketing and public-relations roles at the Mongolian branches of Japanese corporations. A master's degree allows continuation in diplomatic / academic careers.",
      ja: '外務省、大使館、国際機関（JICA、国連、ILO代表事務所）、研究所、外交アカデミーなどで専門家として活躍します。在モンゴル日系企業では、国際関係、マーケティング、広報担当としても就職します。修士課程に進学して、外交・学術キャリアを継続することも可能です。',
    },
  },
  economics: {
    name: { en: 'Economics', ja: '経済学' },
    shortDescription: {
      en: 'International and national-level economic research.',
      ja: '国際・国内レベルの経済研究者。',
    },
    fullDescription: {
      en: 'A research-oriented programme based on economic theory and methodology, training specialists who can analyse and make decisions on international and national-level economic questions.',
      ja: '経済学の理論と方法論を基盤とし、国際および国内レベルの経済課題を分析・意思決定できる研究指向の専門家を養成するプログラムです。',
    },
    skills: {
      en: 'Micro- and macroeconomic analysis\nJapanese business and corporate management\nEconometrics and statistical methods\nInternational trade and finance',
      ja: 'ミクロ・マクロ経済分析\n日本のビジネス・企業経営\n計量経済学および統計手法\n国際貿易・金融',
    },
    careerOutlook: {
      en: 'Graduates work as economists, analysts and risk managers at banks, financial supervisors, audit firms, tax authorities, the central bank, economic research institutes and international organisations. They also begin their careers in finance and economics roles at the domestic and overseas branches of Japanese corporations, with the potential to rise to CFO / CEO level.',
      ja: '銀行、金融監督機関、監査法人、税務機関、中央銀行、経済研究所、国際機関などにおいて、エコノミスト、アナリスト、リスクマネージャーとして活躍します。日系企業の国内・海外拠点では財務・経済関連の職種でキャリアを始め、将来はCFO・CEOレベルにまで昇格する可能性があります。',
    },
  },
  software2: {
    name: { en: 'Software Engineering 2+2', ja: 'ソフトウェア工学 2+2' },
    shortDescription: {
      en: '2 years in Mongolia\n2 years in Japan\nInternational degree\n',
      ja: 'モンゴルで2年\n日本で2年\n国際的な学位\n',
    },
    fullDescription: {
      en: 'A pathway to working in Japan in a high-paying IT career.\n',
      ja: '日本での就労、高収入のITキャリアへの道。\n',
    },
    skills: {
      en: '',
      ja: '',
    },
  },
  'japanese-language-teacher': {
    name: { en: 'Japanese-Language Teacher', ja: '日本語教員' },
    shortDescription: {
      en: 'Training as a Japanese-language teacher for secondary schools.',
      ja: '中等教育向け日本語教員養成。',
    },
    fullDescription: {
      en: 'The Japanese-Language Teacher programme provides in-depth education in the theoretical foundations of Japanese language and culture, teaching methodology and educational psychology, preparing skilled, professional teachers for secondary schools and other educational institutions.',
      ja: '日本語教員養成プログラムでは、日本語学・日本文化の理論基盤、教授法、教育心理学などの分野で深く学び、中等教育機関およびその他の教育機関に対し、有能で専門性の高い教員を養成します。',
    },
    skills: {
      en: 'Japanese-language didactics and teaching methodology\nPedagogy\nPsychology and child development\nLearning-material design',
      ja: '日本語教授法と指導法\n教育学\n心理学および児童発達\n教材作成',
    },
    careerOutlook: {
      en: "Graduates work as Japanese-language teachers at secondary schools, at private Japanese-language training centres, and at international schools as teachers of Japanese language and culture. They can also teach JLPT and EJU exam preparation, write learning materials and develop online courses. A master's degree allows them to teach pedagogy or translation studies at university.",
      ja: '中等学校の日本語教員、日本語専門スクール教員、インターナショナルスクールの日本語・文化担当教員として活躍します。JLPT、EJUなどの試験対策授業や教材執筆、e-learning教材開発も可能です。修士課程に進学して教育学・翻訳論コースで指導することもできます。',
    },
  },
  software: {
    name: { en: 'Software Engineering', ja: 'ソフトウェア工学' },
    shortDescription: {
      en: 'Combined programme of Japanese language and programming.',
      ja: '日本語とプログラミングを組み合わせたコース。',
    },
    fullDescription: {
      en: 'Through a combined curriculum of Japanese language and software engineering, we prepare modern software engineers — specialists trained to work for Japanese IT companies.',
      ja: '日本語とソフトウェア工学を組み合わせたカリキュラムにより、現代的なソフトウェアエンジニアを養成します。日本のIT企業で活躍できる専門人材の育成を目的としています。',
    },
    skills: {
      en: 'Web and mobile programming (React, Node.js)\nAlgorithms and data structures\nJapanese IT terminology and documentation\nAgile and Scrum team practices',
      ja: 'WebおよびモバイルプログラミングReact、Node.js）\nアルゴリズムとデータ構造\n日本のIT用語およびドキュメント作成\nアジャイル・スクラムのチーム運営',
    },
    careerOutlook: {
      en: "Graduates work as web and mobile developers, full-stack engineers, frontend / backend developers, and information-system architects at IT companies in Japan and Mongolia. The 2+2 programme opens the door to living and working in Japan. Continuation is possible through founding startups or further study in fintech, AI and cybersecurity.",
      ja: '日本およびモンゴルのIT企業において、WebおよびモバイルエンジニアやFull-Stackエンジニア、フロントエンド／バックエンド開発者、情報システムアーキテクトとして活躍します。2+2プログラムを通じて日本での就労・生活が可能です。スタートアップ起業、フィンテック、AI、サイバーセキュリティ分野での進学・継続学習の道も開かれています。',
    },
  },
};

async function main() {
  let updatedNews = 0;
  let skippedNews: string[] = [];
  for (const [slug, t] of Object.entries(news)) {
    const found = await prisma.news.findUnique({ where: { slug } });
    if (!found) {
      skippedNews.push(slug);
      continue;
    }
    await prisma.news.update({
      where: { slug },
      data: {
        titleEn: t.title.en,
        titleJa: t.title.ja,
        excerptEn: t.excerpt.en,
        excerptJa: t.excerpt.ja,
        bodyEn: t.body.en,
        bodyJa: t.body.ja,
      },
    });
    updatedNews++;
  }

  let updatedPrograms = 0;
  let skippedPrograms: string[] = [];
  for (const [slug, t] of Object.entries(programs)) {
    const found = await prisma.program.findUnique({ where: { slug } });
    if (!found) {
      skippedPrograms.push(slug);
      continue;
    }
    await prisma.program.update({
      where: { slug },
      data: {
        nameEn: t.name.en,
        nameJa: t.name.ja,
        shortDescriptionEn: t.shortDescription.en,
        shortDescriptionJa: t.shortDescription.ja,
        fullDescriptionEn: t.fullDescription.en,
        fullDescriptionJa: t.fullDescription.ja,
        skillsEn: t.skills.en,
        skillsJa: t.skills.ja,
        ...(t.careerOutlook
          ? {
              careerOutlookEn: t.careerOutlook.en,
              careerOutlookJa: t.careerOutlook.ja,
            }
          : {}),
      },
    });
    updatedPrograms++;
  }

  console.log(`✔ News updated:     ${updatedNews}`);
  if (skippedNews.length > 0)
    console.log(`  Skipped news:    ${skippedNews.join(', ')}`);
  console.log(`✔ Programs updated: ${updatedPrograms}`);
  if (skippedPrograms.length > 0)
    console.log(`  Skipped programs: ${skippedPrograms.join(', ')}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
