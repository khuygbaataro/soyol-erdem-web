import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgramCard } from '@/components/ui/ProgramCard';
import { NewsCard } from '@/components/ui/NewsCard';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { StatBlock } from '@/components/ui/StatBlock';
import { Badge } from '@/components/ui/Badge';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import {
  HERO,
  QUICK_FEATURES,
  STATS,
  WHY_US,
} from '@/lib/content';
import { prisma } from '@/lib/prisma';
import { resolveIcon } from '@/lib/icon-map';
import { NEWS_CATEGORY_LABEL } from '@/lib/admin-helpers';
import { content, getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

const PARTNER_PLACEHOLDERS = [
  'Оберлин',
  'Сэйжо',
  'Хоккай Гакүэн',
  'Риккё',
  'Хокүто Бүнка',
  '+30 гаруй',
];

export default async function HomePage() {
  const [programs, latestNews, siteContent, dbStats] = await Promise.all([
    prisma.program.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    }),
    prisma.news.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    getSiteContentMap('home'),
    prisma.stat.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
  ]);

  // Fall back to static content.ts when DB row missing/empty.
  const heroTitle1 = content(siteContent, 'home.hero.title.line1', HERO.titleLine1);
  const heroTitle2 = content(siteContent, 'home.hero.title.line2', HERO.titleLine2);
  const heroItalic = content(siteContent, 'home.hero.italic', HERO.italicAccent);
  const heroBody = content(siteContent, 'home.hero.body', HERO.body);
  const heroCtaPrimary = content(siteContent, 'home.hero.cta_primary', HERO.ctaPrimary);
  const heroCtaSecondary = content(siteContent, 'home.hero.cta_secondary', HERO.ctaSecondary);
  const heroImage = siteContent.get('home.hero.image') ?? '';

  // If admin hasn't uploaded a hero image yet, use the static STATS array.
  const stats =
    dbStats.length > 0
      ? dbStats.map((s) => ({ icon: resolveIcon(s.icon), number: s.number, label: s.label }))
      : STATS;

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-cream-soft py-16 md:py-24">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <Badge variant="gold" className="mb-5">
              2025-2026 элсэлт нээлттэй
            </Badge>
            <h1 className="text-h1 font-bold leading-[1.05] text-navy-900">
              {heroTitle1}
              <br />
              {heroTitle2}
            </h1>
            <p className="mt-5 font-serif text-2xl italic text-gold-500 md:text-3xl">
              {heroItalic}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-body">
              {heroBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="/admission"
                variant="primary"
                size="lg"
                icon={<ChevronRight className="h-5 w-5" />}
              >
                {heroCtaPrimary}
              </Button>
              <Button href="/about" variant="outline" size="lg">
                {heroCtaSecondary}
              </Button>
            </div>
          </div>
          {heroImage ? (
            <div className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-image shadow-card-hover lg:block">
              <Image
                src={heroImage}
                alt="Соёл-Эрдэм Их Сургуулийн зураг"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <ImagePlaceholder
              label="Барилгын зураг"
              aspect="aspect-[4/5]"
              className="hidden lg:block"
            />
          )}
        </div>
      </section>

      {/* 2. Quick features */}
      <Section background="white" spacing="md">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {QUICK_FEATURES.map((f) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </div>
      </Section>

      {/* 3. Featured programs */}
      <Section background="cream-soft">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-h2 font-bold text-text-heading">
              ОНЦЛОХ МЭРГЭЖЛҮҮД
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-gold-500"
          >
            Бүх мэргэжлийг үзэх
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <ProgramCard
              key={p.id}
              icon={resolveIcon(p.icon)}
              name={p.name}
              degree={p.degree}
              description={p.shortDescription}
              href={`/programs/${p.slug}`}
            />
          ))}
        </div>
      </Section>

      {/* 4. Why us — Navy band */}
      <Section background="navy" spacing="lg">
        <SectionTitle title="ЯАГААД СОЁЛ-ЭРДЭМ?" invert />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-card border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/75">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <StatBlock
              key={s.label}
              icon={s.icon}
              number={s.number}
              label={s.label}
            />
          ))}
        </div>
      </Section>

      {/* 5. Internship highlight */}
      <Section background="white">
        <Card className="overflow-hidden p-0" hover={false}>
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="bg-cream p-2">
              <ImagePlaceholder label="Япон улс — интерншип" aspect="aspect-[4/3] lg:aspect-auto lg:h-full" />
            </div>
            <div className="p-8 md:p-12">
              <Badge variant="gold" className="mb-4">
                Онцлох хөтөлбөр
              </Badge>
              <h2 className="text-h2 font-bold text-navy-900">
                Япон улсад цалинтай дадлага хий
              </h2>
              <p className="mt-4 text-text-body">
                Сард 150,000 иений (≈2.5 сая төгрөг) цалинтай практик дадлага.
                2014 оноос Монгол улсад анх удаа нэвтэрсэн интерншип хөтөлбөр.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-text-body">
                {[
                  'Япон улсын зочид буудал, ресторан, халуун рашаанд дадлага',
                  'Япон хэлний дадлага + цалин',
                  'Япон соёл, ёс заншилтай танилцах боломж',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Button
                  href="/international"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Дэлгэрэнгүй мэдэх
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* 6. Latest news */}
      <Section background="cream-soft">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-h2 font-bold text-text-heading">СҮҮЛИЙН МЭДЭЭ</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
          </div>
          <Link
            href="/news"
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
              href={`/news/${n.slug}`}
            />
          ))}
        </div>
      </Section>

      {/* 7. Partner logos */}
      <Section background="white" spacing="sm">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
          Манай хамтрагч их сургуулиуд
        </p>
        <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNER_PLACEHOLDERS.map((name) => (
            <div
              key={name}
              className="flex h-16 items-center justify-center rounded-lg border border-border-light bg-white px-3 text-sm font-semibold text-text-muted grayscale transition-all duration-300 hover:border-gold-500 hover:text-navy-900 hover:grayscale-0"
            >
              {name}
            </div>
          ))}
        </div>
      </Section>

      {/* 8. CTA */}
      <CtaBanner
        title="2025-2026 оны элсэлт эхэллээ"
        subtitle="Манай сургуульд элсэж ирээдүйгээ эндээс эхэл."
        ctaLabel="Элсэлт мэдээлэл авах"
        ctaHref="/admission"
        secondary={{ label: 'Холбоо барих', href: '/contact' }}
      />
    </>
  );
}
