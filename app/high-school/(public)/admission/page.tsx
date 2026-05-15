import {
  CalendarCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  Sparkles,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { HighSchoolAdmissionForm } from '@/components/ui/HighSchoolAdmissionForm';
import { HIGH_SCHOOL } from '@/lib/constants';

export const metadata = {
  title: 'Ахлах сургуулийн элсэлт',
  description:
    'Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн 10-р ангид элсэх журам, шаардлага, хугацаа, холбоо барих.',
};

const REQUIREMENTS: { title: string; body: string }[] = [
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
];

const STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ClipboardList,
    title: '1. Бүртгүүлэх',
    body: 'Дараах формоор урьдчилсан бүртгэлд хамрагдана. Утсаар (7011-8589) холбоо барьж мэдээлэл авч болно.',
  },
  {
    icon: FileText,
    title: '2. Материал бүрдүүлэх',
    body: 'Иргэний үнэмлэхний хуулбар, дүнгийн тодорхойлолт, эрүүл мэндийн хуудас, өргөдөл зэргийг бүрдүүлэн авчирна.',
  },
  {
    icon: GraduationCap,
    title: '3. Ярилцлага / шалгалт',
    body: 'Япон хэлний онцлох ангид элсэх бол ерөнхий мэдлэгийн тест + ярилцлага хийгдэнэ.',
  },
  {
    icon: CalendarCheck,
    title: '4. Шийдвэр + гэрээ',
    body: 'Шалгалтын дүн гарсны дараа сургалтын гэрээ байгуулна. Анхны ангид хичээл эхлэх өдөр бүртгэлээ баталгаажуулна.',
  },
];

const DOCS = [
  '9-р ангийн жилийн эцсийн дүнгийн тодорхойлолт (эх)',
  '9 жилийн боловсролын гэрчилгээ (хуулбар)',
  'Иргэний үнэмлэхний хуулбар (сурагч + эцэг эх)',
  'Эрүүл мэндийн хуудас (М-Д хэвлэмэл маягт)',
  '3×4 хэмжээний 2 хувь зураг',
  'Элсэлтийн өргөдөл (сургуулиас өгнө)',
];

const TIMELINE: { date: string; event: string }[] = [
  { date: '5–6 сар', event: 'Урьдчилсан бүртгэл нээлттэй' },
  { date: '6–7 сар', event: 'Материал хүлээн авах хугацаа' },
  { date: '7 сар', event: 'Ярилцлага, шалгалт' },
  { date: '8 сар', event: 'Дүн зарлах, гэрээ байгуулах' },
  { date: '9 сар', event: 'Хичээл эхлэх' },
];

export default function HighSchoolAdmissionPage() {
  return (
    <>
      <PageHero
        title="ЭЛСЭЛТ"
        subtitle="Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн 10-р ангид элсэх журам, шаардлага."
        breadcrumb={[
          { label: 'Их сургууль', href: '/' },
          { label: 'Ахлах сургууль', href: '/high-school' },
          { label: 'Элсэлт' },
        ]}
      />

      {/* Intro / quick info */}
      <Section background="white" spacing="md">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <Badge variant="gold" className="mb-5">
              2026-2027 оны хичээлийн жил
            </Badge>
            <h2 className="font-serif text-3xl font-bold leading-tight text-navy-900 md:text-4xl">
              Ирээдүйгээ Соёл Эрдэмээс эхэл
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-gold-500" />
            <p className="mt-6 text-base leading-relaxed text-text-body">
              Соёл Эрдэм Ахлах Сургууль нь 10–11–12 ангид Япон хэл, соёл болон
              мэдээллийн технологид төрөлжсөн чанартай ерөнхий боловсрол
              олгодог. Эх сургууль СЭДС-ийн 30 жилийн япон судлалын баялаг
              туршлагаар суурилсан, япон 30+ их сургуультай хамтын ажиллагаатай
              сүлжээтэй.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-card bg-cream-soft p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                  Элсэлт хүлээж авах
                </p>
                <p className="mt-1 font-serif text-2xl font-bold text-navy-900">
                  10-р анги
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                  Хичээлийн жил
                </p>
                <p className="mt-1 font-serif text-2xl font-bold text-navy-900">
                  2026-2027
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                  Сургалтын хэлбэр
                </p>
                <p className="mt-1 text-sm font-semibold text-navy-900">
                  Өдрийн, орон тооны
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                  Төрөлжсөн чиглэл
                </p>
                <p className="mt-1 text-sm font-semibold text-navy-900">
                  Япон хэл / IT
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card bg-gradient-to-br from-navy-900 via-[#243454] to-[#1c2745] p-8 text-white">
            <Sparkles className="h-8 w-8 text-gold-400" />
            <h3 className="mt-4 font-serif text-xl font-bold">
              Шууд бүртгүүлэх / лавлах
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Элсэлтийн талаар лавлах, материалын талаар асуулт тавих бол
              дараах хаягаар холбогдоно уу.
            </p>

            <div className="mt-6 space-y-4">
              <a
                href={`tel:${HIGH_SCHOOL.contact.phonePrimary.replace('-', '')}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-400"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold-400">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/55">
                    Утас
                  </p>
                  <p className="font-bold">{HIGH_SCHOOL.contact.phonePrimary}</p>
                </div>
              </a>
              <a
                href={`tel:${HIGH_SCHOOL.contact.phoneSecondary.replace('-', '')}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-400"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold-400">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/55">
                    Гар утас
                  </p>
                  <p className="font-bold">{HIGH_SCHOOL.contact.phoneSecondary}</p>
                </div>
              </a>
              <a
                href={`mailto:${HIGH_SCHOOL.contact.email}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-400"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold-400">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/55">
                    И-мэйл
                  </p>
                  <p className="break-all font-bold">{HIGH_SCHOOL.contact.email}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Requirements */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle title="ЭЛСЭЛТИЙН ШААРДЛАГА" />
        <div className="grid gap-5 md:grid-cols-2">
          {REQUIREMENTS.map((r) => (
            <Card key={r.title} className="flex h-full flex-col">
              <h3 className="text-base font-bold text-navy-900">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                {r.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section background="white" spacing="md">
        <SectionTitle
          title="ЭЛСЭХ ҮЕ ШАТУУД"
          subtitle="4 алхамаар манай сургуульд элсэх ажиллагаа дуусна."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {s.body}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Required documents + Timeline */}
      <Section background="cream-soft" spacing="md">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle title="БҮРДҮҮЛЭХ МАТЕРИАЛ" align="left" />
            <ul className="space-y-3">
              {DOCS.map((d, i) => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-card border border-border-light bg-white px-5 py-3 text-text-body shadow-card"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-gold-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle title="ХУГАЦАА" align="left" />
            <ol className="space-y-3">
              {TIMELINE.map((t) => (
                <li
                  key={t.event}
                  className="flex items-center gap-4 rounded-card border border-border-light bg-white px-5 py-4 text-text-body shadow-card"
                >
                  <span className="flex w-20 shrink-0 flex-col rounded-full bg-gold-500/15 px-3 py-1.5 text-center font-bold text-gold-600">
                    {t.date}
                  </span>
                  <p className="text-sm font-semibold text-navy-900">{t.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Tuition */}
      <Section background="white" spacing="md">
        <div className="mx-auto max-w-3xl rounded-card border border-border-light bg-cream-soft p-8 text-center shadow-card">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
            <Wallet className="h-6 w-6" />
          </span>
          <h3 className="mt-5 font-serif text-xl font-bold text-navy-900">
            Сургалтын төлбөр, тэтгэлгийн боломж
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-body">
            Сургалтын төлбөр болон тэтгэлгийн боломжуудын тухай мэдээлэл
            элсэлтийн хугацаанд өргөдөл өгсөн сурагч, эцэг эхэд тус тус
            танилцуулга хийгдэнэ. Эх сургуулийн япон тэтгэлэгт хамрагдах,
            солилцооны хөтөлбөрт орох боломжийг хэлэлцэх боломжтой.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`tel:${HIGH_SCHOOL.contact.phonePrimary.replace('-', '')}`}
              variant="primary"
              size="md"
            >
              Утасаар лавлах
            </Button>
            <Button
              href="/high-school/contact"
              variant="outline"
              size="md"
            >
              Холбоо барих
            </Button>
          </div>
        </div>
      </Section>

      {/* Online application form */}
      <Section background="cream-soft" spacing="md" id="apply">
        <SectionTitle
          title="ЦАХИМААР БҮРТГҮҮЛЭХ"
          subtitle="10-р ангид элсэх сурагчдад зориулсан урьдчилсан бүртгэлийн форм. Хариуцсан ажилтан тантай 1-2 өдрийн дотор холбогдоно."
        />
        <div className="mx-auto max-w-3xl">
          <div className="rounded-card border border-border-light bg-white p-6 shadow-card md:p-8">
            <HighSchoolAdmissionForm />
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Соёл Эрдэм Ахлах Сургуульд тавтай морил"
        ctaLabel="Танилцуулга үзэх"
        ctaHref="/high-school/about"
        secondary={{ label: 'Сургалт', href: '/high-school/programs' }}
      />
    </>
  );
}
