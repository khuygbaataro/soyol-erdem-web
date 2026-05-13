import {
  Award,
  Building2,
  Calendar,
  GraduationCap,
  Globe2,
  Sparkles,
  Trophy,
  Users,
  Quote,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata = {
  title: 'Ахлах сургуулийн танилцуулга',
  description:
    'Нийслэлийн ерөнхий боловсролын Соёл Эрдэм сургуулийн товч танилцуулга, эрхэм зорилго, бүтэц зохион байгуулалт, онцлох амжилт.',
};

const PHILOSOPHY: {
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
}[] = [
  {
    icon: Sparkles,
    label: 'Алсын хараа',
    title: 'Тэргүүлэгч төрөлжсөн ЕБС',
    body: 'Япон хэл, соёл болон мэдээллийн технологийн чиглэлээр төрөлжсөн ерөнхий боловсролын тэргүүлэгч сургууль болох.',
  },
  {
    icon: GraduationCap,
    label: 'Уриа',
    title: 'Чадварлаг багш — Чанартай боловсрол',
    body: 'Хичээнгүй суралцагч, чадварлаг багш, япон хэл, соёлын дээдээс тогтсон чанартай боловсрол.',
  },
  {
    icon: Award,
    label: 'Үнэт зүйл',
    title: 'С · Э · А · С',
    body: 'С – Соёл уламжлалаа дээдэлсэн · Э – Эрдэм мэдлэгийг эрхэмлэсэн · А – Амьдрах арга ухаанд суралцсан · С – Сурлагын хоцрогдолгүй суралцагч бэлтгэх.',
  },
];

const STATS: { value: string; label: string }[] = [
  { value: '2023', label: 'Үүсгэн байгуулагдсан' },
  { value: '100%', label: 'Мэргэжлийн багш' },
  { value: '11+', label: 'Мэргэжлийн багш нар' },
  { value: '2', label: 'Япон хэлний багш' },
];

type OrgNode = { title: string; subtitle?: string; people?: string[] };

const ORG_STRUCTURE: { heading: string; nodes: OrgNode[] }[] = [
  {
    heading: 'Удирдлага',
    nodes: [
      {
        title: 'Удирдах зөвлөлийн дарга',
        subtitle: 'Үүсгэн байгуулагч',
        people: ['Макихара Соичи'],
      },
      {
        title: 'Захирал',
        people: ['Д. Эрдэнэцэцэг'],
      },
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
];

const HIGHLIGHTS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Trophy,
    title: 'Бүнкёосай — Соёлын наадам',
    body: 'Япон уламжлалт "Бүнкёосай" наадмыг 26 удаа дараалан амжилттай зохион байгуулж, нийт сурагч багштай хамтран япон соёлыг танилцуулдаг уламжлалтай.',
  },
  {
    icon: Award,
    title: '"Алтан гадас" одон',
    body: 'Математикийн багш С. Боожоо "Алтан гадас" одонгоор шагнагдсан.',
  },
  {
    icon: Globe2,
    title: 'Япон хамтын ажиллагаа',
    body: 'Япон улсын 30+ их, дээд сургууль, мэргэжлийн сургуультай хамтран ажилладаг өргөн сүлжээтэй.',
  },
  {
    icon: Users,
    title: 'Шилийн булаг туристын бааз',
    body: 'Зуны цуглаан, сурагч-багш хамтын дадлага, гадны зочин аяллагчтай уулзалт зэргийг зохион байгуулдаг.',
  },
];

const PARTNERSHIPS = [
  '50–100% хүртэлх тэтгэлэгт хөтөлбөрүүд',
  'Япон руу хэлний практик дадлага (сард ~2.5 сая төгрөгийн цалинтай)',
  '2+2 болон 1+3 солилцооны хөтөлбөр',
  'Япон засгийн газрын Монбукагакүшо тэтгэлэг',
  'Оберлин их сургуультай байгаль-экологийн жил тутмын дадлага',
  'Риккёо, Чюоүгакүин их сургуулиудтай судалгааны хамтын ажиллагаа',
];

export default function HighSchoolAboutPage() {
  return (
    <>
      <PageHero
        title="ТАНИЛЦУУЛГА"
        subtitle="Нийслэлийн Ерөнхий боловсролын Соёл Эрдэм сургууль — япон хэл, соёл, мэдээллийн технологийн чиглэлээр төрөлжсөн ахлах сургууль."
        breadcrumb={[
          { label: 'Их сургууль', href: '/' },
          { label: 'Ахлах сургууль', href: '/high-school' },
          { label: 'Танилцуулга' },
        ]}
      />

      {/* Intro */}
      <Section background="white" spacing="md">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <Badge variant="gold" className="mb-5">
              Японы хөрөнгө оруулалттай · 2023 онд байгуулагдсан
            </Badge>
            <h2 className="font-serif text-3xl font-bold leading-tight text-navy-900 md:text-4xl">
              Хичээнгүй суралцагч, <br className="hidden sm:block" />
              Чадварлаг багш, Япон хэл, соёл
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-gold-500" />
            <p className="mt-6 text-base leading-relaxed text-text-body">
              Нийслэлийн Соёл Эрдэм Ерөнхий боловсролын ахлах сургууль нь{' '}
              <strong className="text-navy-900">2023 оны 8-р сарын 30</strong>
              -нд япон улсын хөрөнгө оруулалттайгаар үүсгэн байгуулагдаж,
              2023–2024 оны хичээлийн жилд 10–11 ангитайгаар, нийт мэргэжлийн
              11 багш, 2 япон хэлний багштайгаар үйл ажиллагаагаа эхэлсэн.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-body">
              Манай сургууль нь эх сургууль болох Соёл Эрдэм Дээд Сургуулийн
              30+ жилийн япон судлалын баялаг туршлагад тулгуурлан япон хэл,
              соёл болон мэдээллийн технологид төрөлжсөн ерөнхий боловсролын
              сургалт явуулдаг.
            </p>
          </div>

          {/* Decorative kanji poster */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-image bg-cream-soft shadow-card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/10 via-transparent to-gold-500/10" />
            <div className="relative flex h-full flex-col justify-end p-8">
              <span className="font-serif text-6xl font-semibold text-navy-900/15 md:text-8xl">
                高
              </span>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-text-muted">
                Senior High School
              </p>
              <p className="mt-1 font-serif text-2xl font-bold text-navy-900">
                Соёл Эрдэм
              </p>
              <p className="mt-1 text-sm text-text-body">
                Япон-Монголын боловсролын гүүр
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision / Motto / Values */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle title="ЭРХЭМ ЗОРИЛГО" />
        <div className="grid gap-6 md:grid-cols-3">
          {PHILOSOPHY.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.label} className="flex h-full flex-col">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-500">
                  {p.label}
                </p>
                <h3 className="mt-2 text-lg font-bold text-navy-900">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-body">
                  {p.body}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Director's Message */}
      <Section background="white" spacing="md">
        <SectionTitle title="ЗАХИРЛЫН МЭНДЧИЛГЭЭ" />
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div className="overflow-hidden rounded-card bg-navy-900 text-white shadow-card-hover">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/highschool-director.jpg"
                alt="Д. Эрдэнэцэцэг — Соёл Эрдэм Ахлах сургуулийн захирал"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/95 via-navy-900/55 to-transparent px-6 pb-6 pt-12">
                <Quote className="h-6 w-6 text-gold-400" />
                <p className="mt-3 font-serif text-xl font-bold leading-tight text-white">
                  Д. Эрдэнэцэцэг
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Захирал · Соёл Эрдэм Ахлах сургууль
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-text-body">
            <p>
              Манай сургуулийг үүсгэн байгуулагч <strong>Макихара Соичи</strong>{' '}
              гуайны итгэл найдвар, япон улсын 100% хөрөнгө оруулалтаар 1996 онд
              эх сургууль Соёл Эрдэм Дээд Сургууль үүсэн байгуулагдсанаас хойш
              ~1500 төгсөгчийг бэлтгэж, тэдгээрийн 40 орчим хувь нь Япон улсад
              суралцаж, ажиллаж байна.
            </p>
            <p>
              Энэхүү 30 гаруй жилийн япон судлалын баялаг туршлагаа үндэс
              болгож, бид 2023 онд ахлах сургуулиа байгуулсан. Багш, ажилтан,
              сурагч, эцэг эх, хамтрагч байгууллагууд та бүхэндээ халуун
              мэндчилгээ дэвшүүлж байна.
            </p>
            <p>
              Бид олон улсын стандартын дагуу боловсрол олгож, монгол сэтгэлгээ,
              япон ёс, чанартай ажлын зан үйлийг хослуулсан мэргэжилтнүүдийг
              бэлтгэхийг эрхэмлэн ажилладаг. Соёл Эрдэм сурагч байх нь зөвхөн
              хичээл биш — нэг гэр бүлийн гишүүн болохыг хэлнэ.
            </p>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section background="navy" spacing="md">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-4xl font-bold text-gold-400 md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/75 md:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Organizational structure */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle
          title="БҮТЭЦ ЗОХИОН БАЙГУУЛАЛТ"
          subtitle="Сургуулийн удирдлагын болон сургалтын нэгжүүд."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {ORG_STRUCTURE.map((g) => (
            <div
              key={g.heading}
              className="rounded-card border border-border-light bg-white p-6 shadow-card"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold-500">
                {g.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {g.nodes.map((n) => (
                  <li key={n.title} className="flex flex-col">
                    <span className="text-sm font-semibold text-navy-900">
                      {n.title}
                    </span>
                    {n.subtitle && (
                      <span className="text-xs text-text-muted">
                        {n.subtitle}
                      </span>
                    )}
                    {n.people && n.people.length > 0 && (
                      <span className="mt-0.5 text-xs text-text-body">
                        {n.people.join(', ')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Highlights */}
      <Section background="white" spacing="md">
        <SectionTitle title="ОНЦЛОХ АРГА ХЭМЖЭЭ, АМЖИЛТ" align="left" />
        <div className="grid gap-5 md:grid-cols-2">
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="flex items-start gap-4 rounded-card border border-border-light bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-navy-900">
                    {h.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-text-body">{h.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Japan partnerships */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle
          title="ЯПОН УЛСТАЙ ХАМТЫН АЖИЛЛАГАА"
          subtitle="Эх сургууль Соёл Эрдэм ДС-ийн япон сүлжээтэй хамтран сурагчдад дараах боломжуудыг олгодог."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {PARTNERSHIPS.map((p) => (
            <div
              key={p}
              className="flex items-start gap-3 rounded-card bg-white p-5 shadow-card"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Calendar className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm leading-relaxed text-text-body">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Манай ахлах сургуульд элсэх үү?"
        subtitle="Япон хэл, соёл, мэдээллийн технологийг хосолсон чанартай боловсрол."
        ctaLabel="Элсэлтийн мэдээлэл"
        ctaHref="/high-school/admission"
        secondary={{ label: 'Холбоо барих', href: '/high-school/contact' }}
      />
    </>
  );
}
