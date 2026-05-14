import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Code2,
  ExternalLink,
  Globe2,
  GraduationCap,
  Languages,
  Laptop,
  MapPin,
  Monitor,
  Phone,
  Plane,
  TrendingUp,
  Users,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/constants';
import { content, getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Цахим сургалт',
  description:
    'Соёл Эрдэм Дээд Сургуулийн Moodle платформд суурилсан цахим сургалт — оюутан, ажил эрхэлж буй иргэд, орон нутаг болон гадаадад амьдарч буй иргэдэд уян хатан хэлбэрээр суралцах боломж.',
};

const PROGRAMS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Code2,
    title: 'Программ хангамж',
    body: 'Програмчлал, вэб хөгжүүлэлт, мэдээллийн технологийн суурь болон мэргэжлийн мэдлэг эзэмшинэ.',
  },
  {
    icon: TrendingUp,
    title: 'Эдийн засаг',
    body: 'Бизнес төлөвлөлт, эдийн засгийн шинжилгээ, байгууллагын үйл ажиллагааг төлөвлөх чадвар эзэмшинэ.',
  },
  {
    icon: Plane,
    title: 'Аялал жуулчлал',
    body: 'Аяллын менежмент, зочлох үйлчилгээ, аяллын төлөвлөлтийн чиглэлээр суралцана.',
  },
  {
    icon: Languages,
    title: 'Гадаад хэл / Япон хэл',
    body: 'Япон хэлний шаталсан сургалт, орчуулга, япон судлалын чиглэлээр мэдлэг эзэмшинэ.',
  },
];

const ADVANTAGES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MapPin,
    title: 'Хаанаас ч суралцана',
    body: 'Интернет холболттой бол монгол, гадаадын аль ч цэгээс хичээлд суух боломжтой.',
  },
  {
    icon: Wifi,
    title: 'Moodle систем дээр',
    body: 'Видео лекц, интерактив хичээл, онлайн даалгавар, тестийг нэг платформ дээр үзэж гүйцэтгэнэ.',
  },
  {
    icon: Users,
    title: 'Багштай шууд харилцана',
    body: 'Чат, видео уулзалт, хэлэлцүүлгийн платформоор багштай шууд асуулт асууж хариулт авна.',
  },
  {
    icon: Clock,
    title: 'Уян хатан цаг',
    body: 'Ажил, амьдралын хажуугаар өөрийн цагт нь тохируулж суралцах боломжтой.',
  },
];

const AUDIENCES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Globe2,
    title: 'Гадаадад амьдарч буй иргэд',
    body: 'Япон болон бусад улсад ажиллаж, амьдарч буй монгол иргэд цахим сургалтаар дээд боловсрол эзэмших боломжтой.',
  },
  {
    icon: MapPin,
    title: 'Орон нутгийн элсэгчид',
    body: 'Хөдөө орон нутгаас Улаанбаатар руу зөөж эс ирээд хаанаасаа л суралцах боломжтой.',
  },
  {
    icon: Briefcase,
    title: 'Ажилтай хүмүүс',
    body: 'Карьераа орхилгүйгээр ажил, сургалтаа зэрэг авч явахыг хүсэж байгаа хүмүүст тохиромжтой.',
  },
  {
    icon: GraduationCap,
    title: '30+ насны иргэд',
    body: '30-аас дээш насны, дээд боловсрол эзэмших хүсэлтэй иргэдэд тусгайлсан элсэлтийн нөхцлөөр элсэх боломжтой.',
  },
];

const EXTERNAL_RESOURCES: {
  title: string;
  domain: string;
  href: string;
  body: string;
}[] = [
  {
    title: 'Cisco Academy',
    domain: 'netacad.com',
    href: 'https://www.netacad.com',
    body: 'Сүлжээ, кибер аюулгүй байдал, Python, IoT-ийн чиглэлийн олон улсын гэрчилгээт сургалт.',
  },
  {
    title: 'IT Passport',
    domain: 'itpec.org',
    href: 'https://www.itpec.org',
    body: 'IT мэргэжилтнүүдийн суурь мэдлэгийг үнэлэх олон улсын Япон стандартын шалгалт.',
  },
];

export default async function ElearningPage() {
  // Pull all elearning admin-editable strings in one query. Each block on
  // the page reads from this map with a static fallback so the page never
  // breaks if a key is missing or the table doesn't exist yet.
  const site = await getSiteContentMap('elearning');

  const moodleUrl = content(
    site,
    'elearning.moodle.url',
    'http://elearn.soyolerdem.edu.mn/',
  );
  const moodleDomain = moodleUrl.replace(/^https?:\/\//, '').replace(/\/+$/, '');

  const introBadge = content(
    site,
    'elearning.intro.badge',
    `Moodle платформ · ${SITE.name}`,
  );
  const introTitle = content(
    site,
    'elearning.intro.title',
    'Хаанаас ч, хэзээ ч суралцах боломж',
  );
  const introBody = content(
    site,
    'elearning.intro.body',
    'Соёл Эрдэм Дээд Сургууль нь Moodle платформд суурилсан цахим сургалтын системээр дамжуулан оюутан, ажил эрхэлж буй иргэд, орон нутгийн болон гадаадад амьдарч буй монгол иргэдэд уян хатан хэлбэрээр суралцах боломжийг олгож байна.',
  );

  const programsTitle = content(
    site,
    'elearning.programs.title',
    'ЦАХИМААР СУРАЛЦАХ БОЛОМЖТОЙ ЧИГЛЭЛҮҮД',
  );
  const programsSubtitle = content(
    site,
    'elearning.programs.subtitle',
    'Дараах мэргэжлийг бүхэлд нь эсвэл сонгосон хичээлээр нь цахимаар суралцаж болно.',
  );

  const advantagesTitle = content(
    site,
    'elearning.advantages.title',
    'ЦАХИМ СУРГАЛТЫН ДАВУУ ТАЛ',
  );
  const advantagesSubtitle = content(
    site,
    'elearning.advantages.subtitle',
    'Уламжлалт танхимын сургалтаас юугаараа ялгаатай вэ?',
  );

  const audiencesTitle = content(
    site,
    'elearning.audiences.title',
    'ХЭНД ЗОРИУЛАГДСАН БЭ?',
  );

  const ciscoTitle = content(
    site,
    'elearning.cisco.title',
    'CISCO Networking Academy',
  );
  const ciscoBody = content(
    site,
    'elearning.cisco.body',
    'СЭДС нь АНУ-ын CISCO Networking Academy-ийн албан ёсны гишүүнчлэлтэй. Программ хангамжийн мэргэжлийн оюутнууд 2023 оноос албан ёсны гэрчилгээтэй төгсдөг болсноор олон улсын IT компаниудад ажиллах боломжтой.',
  );
  const ciscoStudents = content(
    site,
    'elearning.cisco.students',
    'Бакалавр, магистрын оюутнууд болон 10–12 ангийн сурагчид хичээлийн бус цагаар тусгайлсан хөтөлбөрөөр багшийн удирдлага дор суралцана. Сургалт амжилттай төгсөхөд CISCO-ийн олон улсад хүлээн зөвшөөрөгдсөн сертификат олгогдоно. Программ хангамжийн 4-р ангийн оюутан Л.Бүддорж, Б.Баяраа, Э.Тэмүүлэн нар 2023 оны 12-р сарын 25-нд анхны сертификатаа гардан авлаа.',
  );

  const whyTitle = content(
    site,
    'elearning.why.title',
    'Цаг хугацаа, байршил, амьдралын хэв маягаас үл хамаарах боловсролын шинэ шийдэл',
  );
  const whyBody = content(
    site,
    'elearning.why.body',
    'Соёл Эрдэм Дээд Сургуулийн цахим сургалт нь зөвхөн диплом олгох бус, ажиллах ур чадвар, олон улсын боломж, цаг хугацаа болон байршлаас үл хамаарах боловсролын шинэ шийдэл юм.',
  );

  return (
    <>
      {/* Intro band */}
      <Section background="white" spacing="md">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Badge variant="gold" className="mb-5">
              {introBadge}
            </Badge>
            <h2 className="font-serif text-3xl font-bold leading-tight text-navy-900 md:text-4xl">
              {introTitle}
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-gold-500" />
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-text-body">
              {introBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={moodleUrl}
                variant="primary"
                size="lg"
                icon={<ExternalLink className="h-4 w-4" />}
              >
                Систем рүү нэвтрэх
              </Button>
              <Button href="/admission" variant="outline" size="lg">
                Элсэлтийн мэдээлэл
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-image bg-gradient-to-br from-navy-900 via-[#243454] to-[#1c2745] p-8 text-white shadow-card-hover">
            <Monitor className="h-10 w-10 text-gold-400" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
              Цахим сургалтын систем
            </p>
            <a
              href={moodleUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 break-all font-serif text-xl font-bold hover:text-gold-400"
            >
              {moodleDomain}
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
            <div className="mt-6 h-px w-full bg-gold-500/40" />
            <p className="mt-6 text-sm text-white/85">
              Бүртгэгдсэн оюутан, цахим суралцагч, багш нар Moodle хэрэглэгчийн
              нэр, нууц үгээрээ нэвтэрнэ үү.
            </p>
          </div>
        </div>
      </Section>

      {/* Programs */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle title={programsTitle} subtitle={programsSubtitle} />
        <div className="grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className="flex h-full items-start gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-500">
                  <Icon className="h-7 w-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-navy-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">
                    {p.body}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Advantages */}
      <Section background="white" spacing="md">
        <SectionTitle title={advantagesTitle} subtitle={advantagesSubtitle} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((a) => {
            const Icon = a.icon;
            return (
              <Card key={a.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-navy-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {a.body}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Audiences */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle title={audiencesTitle} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-navy-900">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {a.body}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 30+ Special path */}
      <Section background="white" spacing="md">
        <div className="grid gap-8 rounded-card border border-gold-500/30 bg-gold-500/5 p-8 lg:grid-cols-[auto_1fr] lg:items-center lg:p-12">
          <div className="flex shrink-0 items-center gap-4 lg:flex-col lg:items-start">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
              <Calendar className="h-7 w-7" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-600">
                Онцгой нөхцөл
              </p>
              <p className="mt-1 font-serif text-2xl font-bold text-navy-900">
                30+ элсэлт
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold-500">
                ЭЕШ шаардахгүй
              </p>
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-base leading-relaxed text-text-body">
              <strong className="text-navy-900">30-аас дээш насны</strong>,
              3-аас дээш жил ажилласан туршлагатай иргэд{' '}
              <strong className="text-navy-900">ЭЕШ-гүйгээр</strong> цахимаар
              суралцах боломжтой.
            </p>
            <p className="text-sm leading-relaxed text-text-body">
              Энэхүү уян хатан хэлбэр нь карьераа ахиулах, мэргэжлээ өөрчлөх,
              ажиллангаа суралцах хүсэлтэй хүмүүст тохиромжтой.
            </p>
            <div className="pt-3">
              <Button href="/admission" variant="primary" size="md">
                Элсэлтийн нарийвчилсан мэдээлэл
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* CISCO Networking Academy — dedicated section */}
      <Section background="navy" spacing="md" id="cisco">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
              <Award className="h-3 w-3" />
              Олон улсын гэрчилгээ
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
              {ciscoTitle}
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-gold-500" />
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-white/85">
              {ciscoBody}
            </p>
            <a
              href="https://www.netacad.com"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 rounded-button bg-gold-500 px-5 py-2.5 text-sm font-bold text-navy-900 transition-colors hover:bg-gold-400"
            >
              netacad.com
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Сургалтын чиглэлүүд
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'IT Essentials',
                'Networking Essentials',
                'CPA: Programming Essentials in C++',
                'Мэдээллийн аюулгүй байдлын мэргэшүүлэх сургалт',
                'Компьютерын сүлжээ, Internet of Things',
                'Программ хангамж, OS & IT, Packet Tracer',
              ].map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2.5 rounded-card border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-white/75">
              {ciscoStudents}
            </p>
          </div>
        </div>
      </Section>

      {/* Professional development */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle
          title="МЭРГЭЖИЛ ДЭЭШЛҮҮЛЭХ ЦАХИМ СУРГАЛТ"
          subtitle="Гэрчилгээт богино хугацаатай курсууд, мэргэжлийн ур чадварыг тогтсон стандартаар үнэлэх шалгалтын бэлтгэл."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="flex h-full flex-col">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400">
              <Award className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-bold text-navy-900">
              IT Passport · Япон стандартын шалгалт
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-body">
              Япон IT мэргэжилтнүүдийн суурь мэдлэгийг үнэлэх олон улсын IT
              Passport шалгалтанд бэлтгэх курс. Япон руу ажиллахаар явах
              хүсэлтэй IT мэргэжилтнүүдэд хамгийн тохиромжтой.
            </p>
            <ul className="mt-4 space-y-2">
              {EXTERNAL_RESOURCES.map((r) => (
                <li key={r.title} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                  <div className="text-sm">
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-navy-900 hover:text-gold-500"
                    >
                      {r.title}
                    </a>
                    <span className="ml-1.5 text-xs text-text-muted">
                      {r.domain}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="flex h-full flex-col">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400">
              <Laptop className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-bold text-navy-900">
              Цахим сургалт явуулагч мэргэжилтэн
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-body">
              Цахим хичээл боловсруулах, контент бэлтгэх, SCORM материал
              үүсгэх, тест боловсруулах, Moodle систем ашиглах, онлайн
              сургалт удирдах чадвар эзэмшинэ.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-body">
              Энэ сургалт нь <strong className="text-navy-900">багш</strong>,
              сургагч, контент бүтээгч болон онлайн сургалт явуулах хүсэлтэй
              мэргэжилтнүүдэд тохиромжтой.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold-500">
              Япон хэлний цахим сургалт · Цахим сургалтанд багшлах нь
            </p>
          </Card>
        </div>
      </Section>

      {/* Opportunities */}
      <Section background="white" spacing="md">
        <SectionTitle
          title="СОЁЛ ЭРДЭМД ЭЛССЭНЭЭР ТАНД НЭЭГДЭХ БОЛОМЖ"
          subtitle="Зөвхөн диплом олгох бус — ажиллах ур чадвар, олон улсын боломж, цаг хугацаа болон байршлаас үл хамаарах боловсролын шинэ шийдэл."
        />
        <ul className="mx-auto grid max-w-4xl gap-3 md:grid-cols-2">
          {[
            'Дээд боловсрол эзэмших',
            'Олон улсын сертификат авах',
            'Ажиллангаа суралцах',
            'Гадаадаас суралцах',
            'IT болон дижитал ур чадвар эзэмших',
            'Мэргэжлээ дээшлүүлэх',
            'Япон хэл, соёлын мэдлэг эзэмших',
            'Олон улсын хамтын ажиллагаанд хамрагдах',
          ].map((o) => (
            <li
              key={o}
              className="flex items-start gap-3 rounded-card border border-border-light bg-cream-soft px-5 py-3 text-text-body"
            >
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white">
                <Check className="h-3 w-3" />
              </span>
              <span className="text-sm font-semibold text-navy-900">{o}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Why */}
      <Section background="navy" spacing="md">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
            Яагаад цахим сургалт?
          </p>
          <h2 className="mt-4 font-serif text-2xl font-bold leading-tight text-white md:text-3xl">
            {whyTitle}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-base leading-relaxed text-white/80">
            {whyBody}
          </p>
        </div>
      </Section>

      {/* CTA / quick contact */}
      <Section background="cream-soft" spacing="md">
        <div className="grid gap-6 md:grid-cols-3">
          <a
            href={moodleUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-card border border-border-light bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-card-hover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
              <Monitor className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-bold text-navy-900 group-hover:text-gold-500">
              Систем рүү нэвтрэх
            </h3>
            <p className="mt-2 text-sm text-text-body">
              Moodle цахим сургалтын системд нэвтрэх.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-500">
              {moodleDomain}
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </a>

          <a
            href="/admission"
            className="group flex flex-col rounded-card border border-border-light bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-card-hover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
              <GraduationCap className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-bold text-navy-900 group-hover:text-gold-500">
              Элсэлтийн мэдээлэл
            </h3>
            <p className="mt-2 text-sm text-text-body">
              Элсэх журам, шаардлага, бүрдүүлэх материал, хугацаа.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-500">
              /admission
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </a>

          <a
            href="/contact"
            className="group flex flex-col rounded-card border border-border-light bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-card-hover"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
              <Phone className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-bold text-navy-900 group-hover:text-gold-500">
              Зөвлөхтэй холбогдох
            </h3>
            <p className="mt-2 text-sm text-text-body">
              Цахим сургалтын талаар асуулт асууж зөвлөгөө авна.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-500">
              {SITE.contact.phone}
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </Section>

      {/* Resources */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl rounded-card border border-border-light bg-cream-soft p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-500">
            Олон улсын нөөц
          </p>
          <h3 className="mt-2 font-serif text-lg font-bold text-navy-900">
            Сурах материал
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {EXTERNAL_RESOURCES.map((r) => (
              <li key={r.title}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-3 rounded-button bg-white p-3 text-sm shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-navy-900 group-hover:text-gold-500">
                      {r.title}
                    </p>
                    <p className="mt-0.5 text-xs text-text-muted">{r.domain}</p>
                    <p className="mt-1 text-xs leading-relaxed text-text-body">
                      {r.body}
                    </p>
                  </div>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-text-muted group-hover:text-gold-500" />
                </a>
              </li>
            ))}
            <li>
              <span className="flex items-center gap-2 rounded-button bg-white px-3 py-3 text-sm shadow-card">
                <BookOpen className="h-4 w-4 text-gold-500" />
                <span>
                  <span className="font-bold text-navy-900">Япон хэлний цахим сургалт</span>
                  <span className="block text-xs text-text-muted">Удахгүй...</span>
                </span>
              </span>
            </li>
            <li>
              <span className="flex items-center gap-2 rounded-button bg-white px-3 py-3 text-sm shadow-card">
                <BookOpen className="h-4 w-4 text-gold-500" />
                <span>
                  <span className="font-bold text-navy-900">
                    Цахим сургалтанд багшлах нь
                  </span>
                  <span className="block text-xs text-text-muted">Удахгүй...</span>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
