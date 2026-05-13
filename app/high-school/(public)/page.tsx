import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  Code2,
  GraduationCap,
  Languages,
  Mail,
  Medal,
  Phone,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { NewsCard } from '@/components/ui/NewsCard';
import { prisma } from '@/lib/prisma';
import { NEWS_CATEGORY_LABEL } from '@/lib/admin-helpers';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Ахлах сургууль',
  description:
    'Соёл Эрдэм Дээд Сургуулийн харьяа Соёл Эрдэм Ерөнхий боловсролын ахлах сургууль — Япон хэл, соёл, IT-ийн чиглэлээр төрөлжсөн.',
};

const PHILOSOPHY: { icon: LucideIcon; label: string; title: string; body: string }[] = [
  {
    icon: Sparkles,
    label: 'Алсын хараа',
    title: 'Тэргүүлэгч төрөлжсөн ЕБС',
    body: 'Япон хэл, соёл болон Мэдээллийн технологийн төрөлжсөн ахлах сургуулийн хувьд тэргүүлэгч ЕБС болох.',
  },
  {
    icon: GraduationCap,
    label: 'Эрхэм зорилго',
    title: 'Чадварлаг багш — Чанартай боловсрол',
    body: 'Хичээнгүй суралцагч, чадварлаг багш, Япон хэл соёлд тулгуурласан чанартай боловсрол.',
  },
  {
    icon: Award,
    label: 'Үнэт зүйл',
    title: 'С · Э · А · С',
    body: 'С – Соёл уламжлалаа дээдэлсэн · Э – Эрдэм мэдлэгийг эрхэмлэсэн · А – Амьдрах арга ухаанд суралцсан · С – Сурлагын хоцрогдолгүй суралцагч бэлтгэх.',
  },
];

const PROGRAMS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Languages,
    title: 'Япон хэл, соёл',
    description:
      'Эх хэлтэй багш нар JLPT-д тулгуурлан N5–N2 хүртэл түвшинд хүргэж, япон уламжлал, ёс заншил, соёлтой бүрэн танилцуулна.',
  },
  {
    icon: Code2,
    title: 'Төрөлжсөн IT',
    description:
      'Алгоритм, хэл, веб болон AI-ийн үндсэн ойлголтыг сурагч төвтэй, оролцооны аргаар заана. AI-Digital-IT мэргэжлийн сургуультай 2+2 солилцоо.',
  },
  {
    icon: GraduationCap,
    title: 'Бүрэн дунд боловсрол',
    description:
      '10–11 ангийн ердийн хичээлийн хөтөлбөрийг шинжлэх ухаан, эрэгцүүлэхүйд тулгуурласан аргачлалаар сурагч төвтэй заана.',
  },
  {
    icon: Users,
    title: '2+2 Солилцооны хөтөлбөр',
    description:
      'AI-Digital-IT мэргэжлийн сургуультай хамтарсан 2+2 хөтөлбөрөөр оюутнууд бэлэн мэргэжилтэй болно.',
  },
];

const STATS: { value: string; label: string }[] = [
  { value: '2023', label: 'Үүсгэн байгуулагдсан он' },
  { value: '100%', label: 'Мэргэжлийн багшийн бүрэлдэхүүн' },
  { value: '2+2', label: 'Япон-Монгол солилцоо' },
  { value: 'N5–N2', label: 'Япон хэлний түвшин' },
];

const HIGHLIGHTS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Trophy,
    title: 'Бүнкёосай — Соёлын наадам',
    body: 'Япон уламжлалт "Бүнкёосай" наадмыг 26 удаа дараалан амжилттай зохион байгуулсан.',
  },
  {
    icon: Medal,
    title: '"Алтан бүргэд" медаль',
    body: 'Математикийн багш С. Боозоо "Алтан бүргэд" медалаар шагнагдсан.',
  },
  {
    icon: Trophy,
    title: 'Спортын аварга',
    body: 'Сагсан бөмбөг, гар бөмбөгийн аварга шалгаруулах тэмцээнд эзэн болж байсан.',
  },
  {
    icon: Building2,
    title: 'Эмнэлэгийн дадлага',
    body: 'Бүс нутгийн эмнэлэгүүдтэй хамтран эрүүл мэндийн чиглэлээр дадлага хийдэг.',
  },
];

export default async function HighSchoolHomePage() {
  // Latest 3 published high-school news
  const latestNews = await prisma.news
    .findMany({
      where: { status: 'PUBLISHED', site: 'HIGH_SCHOOL' },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    })
    .catch(() => []);

  return (
    <>
      <PageHero
        title="АХЛАХ СУРГУУЛЬ"
        subtitle="Япон хэл, соёл, IT-ийн чиглэлээр төрөлжсөн Соёл Эрдэм Ерөнхий боловсролын ахлах сургууль."
        breadcrumb={[{ label: 'Их сургууль', href: '/' }, { label: 'Ахлах сургууль' }]}
      />

      {/* About / Intro */}
      <Section background="white" spacing="md" id="about">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
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
              <strong className="text-navy-900">2023 оны 8-р сарын 30</strong>-нд
              Японы хөрөнгө оруулалттайгаар үүсгэн байгуулагдаж, 2023–2024 оны
              хичээлийн жилд 10–11 ангитай, мэргэжлийн 11 багш, 2 япон хэлний
              багштайгаар үйл ажиллагаагаа эхэлсэн.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-body">
              Манай сургууль нь Япон хэл, соёл болон Мэдээллийн технологид
              төрөлжсөн ерөнхий боловсролын тэргүүлэгч сургууль болохыг
              эрхэмлэн ажилладаг.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-image bg-cream-soft shadow-card-hover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/highschool-photo.jpg"
              alt="Соёл Эрдэм Ахлах Сургуулийн барилга"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/85 via-navy-900/50 to-transparent p-7 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400">
                Senior High School
              </p>
              <p className="mt-1 font-serif text-2xl font-bold">Соёл Эрдэм</p>
              <p className="mt-1 text-sm text-white/85">
                Япон-Монголын боловсролын гүүр
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision / Mission / Values */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle title="БИДНИЙ ЗАМ ЗОРИЛГО" />
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
                <h3 className="mt-2 text-lg font-bold text-navy-900">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-body">{p.body}</p>
              </Card>
            );
          })}
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

      {/* Programs */}
      <Section background="white" spacing="md" id="programs">
        <SectionTitle
          title="ХӨТӨЛБӨРҮҮД"
          subtitle="Япон хэл, төрөлжсөн IT, бүрэн дунд боловсролын зэрэгцээ Япон руу солилцооны 2+2 хөтөлбөрөөр сурагчдыг бэлдэнэ."
        />
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
                    {p.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Highlights / Activities */}
      <Section background="cream-soft" spacing="md">
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
                  <h3 className="text-base font-bold text-navy-900">{h.title}</h3>
                  <p className="mt-1.5 text-sm text-text-body">{h.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Latest news preview */}
      {latestNews.length > 0 && (
        <Section background="white" spacing="md">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-h2 font-bold text-text-heading">СҮҮЛИЙН МЭДЭЭ</h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
            </div>
            <Link
              href="/high-school/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-gold-500"
            >
              Бүх мэдээг үзэх
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {latestNews.map((n) => (
              <NewsCard
                key={n.id}
                image={
                  n.coverImage ??
                  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=60'
                }
                date={(n.publishedAt ?? n.createdAt).toISOString().slice(0, 10)}
                category={NEWS_CATEGORY_LABEL[n.category] ?? n.category}
                title={n.title}
                excerpt={n.excerpt}
                body={n.body}
                href={`/high-school/news/${n.slug}`}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Contact */}
      <Section background="cream-soft" spacing="md" id="contact">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-500">
              Холбоо барих
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-navy-900 md:text-3xl">
              Бидэнтэй холбоо барих
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gold-500" />
          </div>
          <div className="grid gap-4 md:col-span-2 sm:grid-cols-2">
            <div className="rounded-card border border-border-light bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Phone className="h-5 w-5" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                Утас
              </p>
              <a
                href="tel:+97670118589"
                className="mt-1 block text-base font-bold text-navy-900 hover:text-gold-500"
              >
                7011-8589
              </a>
              <a
                href="tel:+97699533738"
                className="mt-1 block text-sm text-text-body hover:text-gold-500"
              >
                9953-3738
              </a>
            </div>
            <div className="rounded-card border border-border-light bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Mail className="h-5 w-5" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                И-мэйл
              </p>
              <a
                href="mailto:info@soyolerdem.edu.mn"
                className="mt-1 block break-all text-base font-bold text-navy-900 hover:text-gold-500"
              >
                info@soyolerdem.edu.mn
              </a>
            </div>
            <div className="rounded-card border border-border-light bg-white p-5 sm:col-span-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Calendar className="h-5 w-5" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                Элсэлт нээлттэй
              </p>
              <p className="mt-1 text-base font-bold text-navy-900">
                10-р анги · 2025–2026 оны хичээлийн жил
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  href="/high-school/admission"
                  variant="primary"
                  size="md"
                >
                  Элсэлтийн мэдээлэл
                </Button>
                <Button href="/high-school/contact" variant="outline" size="md">
                  Бусад асуулт
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Соёл Эрдэм Ахлах Сургууль"
        subtitle="Чанартай боловсрол, Япон хэл, соёл, IT-ийн чиглэлээр ирээдүйгээ эндээс эхлүүл."
        ctaLabel="Элсэлтийн мэдээлэл"
        ctaHref="/high-school/admission"
        secondary={{ label: 'Холбоо барих', href: '/high-school/contact' }}
      />
    </>
  );
}
