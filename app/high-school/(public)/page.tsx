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
import { localiseNewsCategory } from '@/lib/admin-helpers';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale } from '@/lib/i18n/server';
import { localisedField } from '@/lib/i18n/db';
import { HS_HOME_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Ахлах сургууль',
  description:
    'Соёл Эрдэм Дээд Сургуулийн харьяа Соёл Эрдэм Ерөнхий боловсролын ахлах сургууль — Япон хэл, соёл, IT-ийн чиглэлээр төрөлжсөн.',
};

// Icon order for PHILOSOPHY (Vision / Mission / Values) — kept code-side
// since icons aren't translatable.
const PHILOSOPHY_ICONS: LucideIcon[] = [Sparkles, GraduationCap, Award];

// Icon order for PROGRAMS — Languages / Code2 / GraduationCap / Users.
const PROGRAM_ICONS: LucideIcon[] = [Languages, Code2, GraduationCap, Users];

// Icon order for HIGHLIGHTS — Trophy / Medal / Trophy / Building2.
const HIGHLIGHT_ICONS: LucideIcon[] = [Trophy, Medal, Trophy, Building2];

export default async function HighSchoolHomePage() {
  const [latestNews, site, locale] = await Promise.all([
    prisma.news
      .findMany({
        where: { status: 'PUBLISHED', site: 'HIGH_SCHOOL' },
        orderBy: { publishedAt: 'desc' },
        take: 3,
      })
      .catch(() => []),
    getSiteContentMap('ahlah-home'),
    getServerLocale(),
  ]);

  const c = HS_HOME_CONTENT[locale];
  const g = (key: string, fallback: string) => site.get(key) || fallback;

  // Hero
  const heroTitle    = g('ahlah-home.hero.title',    c.heroTitle);
  const heroSubtitle = g('ahlah-home.hero.subtitle', c.heroSubtitle);
  const heroImage    = site.get('ahlah-home.hero.image') || '';

  // Intro
  const introBadge      = g('ahlah-home.intro.badge',           c.introBadge);
  const introTitle      = g('ahlah-home.intro.title',           c.introTitle);
  const introBody       = g('ahlah-home.intro.body',            c.introBody);
  const introBody2      = g('ahlah-home.intro.body2',           c.introBody2);
  const introImage      = site.get('ahlah-home.intro.image') || '/НЕБ_Сургууль.png';
  const overlayEyebrow  = g('ahlah-home.intro.overlay.eyebrow', c.overlayEyebrow);
  const overlayTitle    = g('ahlah-home.intro.overlay.title',   c.overlayTitle);
  const overlaySubtitle = g('ahlah-home.intro.overlay.subtitle',c.overlaySubtitle);

  // Philosophy / зорилго
  const philosophyTitle = g('ahlah-home.philosophy.title', c.philosophyTitle);
  const philosophy = c.philosophy.map((p, i) => ({
    label: g(`ahlah-home.philosophy.${i+1}.label`, p.label),
    title: g(`ahlah-home.philosophy.${i+1}.title`, p.title),
    body:  g(`ahlah-home.philosophy.${i+1}.body`,  p.body),
  }));

  // Stats
  const stats = c.stats.map((s, i) => ({
    value: g(`ahlah-home.stat.${i+1}.value`, s.value),
    label: g(`ahlah-home.stat.${i+1}.label`, s.label),
  }));

  // Programs
  const programsTitle    = g('ahlah-home.programs.title',    c.programsTitle);
  const programsSubtitle = g('ahlah-home.programs.subtitle', c.programsSubtitle);
  const programs = c.programs.map((p, i) => ({
    title:       g(`ahlah-home.program.${i+1}.title`,       p.title),
    description: g(`ahlah-home.program.${i+1}.description`, p.description),
  }));

  // Highlights
  const highlightsTitle = g('ahlah-home.highlights.title', c.highlightsTitle);
  const highlights = c.highlights.map((h, i) => ({
    title: g(`ahlah-home.highlight.${i+1}.title`, h.title),
    body:  g(`ahlah-home.highlight.${i+1}.body`,  h.body),
  }));

  // News
  const newsTitle = g('ahlah-home.news.title', c.newsTitle);

  // Contact
  const contactEyebrow      = g('ahlah-home.contact.eyebrow',        c.contactEyebrow);
  const contactTitle        = g('ahlah-home.contact.title',          c.contactTitle);
  const phoneLabel          = g('ahlah-home.contact.phone.label',    c.phoneLabel);
  const phonePrimary        = g('ahlah-home.contact.phone.primary',  '7011-8589');
  const phoneSecondary      = g('ahlah-home.contact.phone.secondary','9953-3738');
  const emailLabel          = g('ahlah-home.contact.email.label',    c.emailLabel);
  const contactEmail        = g('ahlah-home.contact.email.value',    'info@soyolerdem.edu.mn');
  const admissionOpenLabel  = g('ahlah-home.contact.admission.label',c.admissionOpenLabel);
  const admissionOpenValue  = g('ahlah-home.contact.admission.value',c.admissionOpenValue);
  const admissionInfoCta    = g('ahlah-home.contact.admission.cta',  c.admissionInfoCta);
  const otherQuestionsCta   = g('ahlah-home.contact.other.cta',      c.otherQuestionsCta);

  // Banner
  const bannerTitle        = g('ahlah-home.banner.title',         c.bannerTitle);
  const bannerSubtitle     = g('ahlah-home.banner.subtitle',      c.bannerSubtitle);
  const bannerCta          = g('ahlah-home.banner.cta',           c.bannerCta);
  const bannerSecondaryCta = g('ahlah-home.banner.secondary.cta', c.bannerSecondaryCta);

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbUniversity, href: '/' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={heroImage || undefined}
      />

      {/* About / Intro */}
      <Section background="white" spacing="md" id="about">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            {introBadge && (
              <Badge variant="gold" className="mb-5">
                {introBadge}
              </Badge>
            )}
            <h2 className="whitespace-pre-line font-serif text-3xl font-bold leading-tight text-navy-900 md:text-4xl">
              {introTitle}
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-gold-500" />
            {introBody && (
              <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-text-body">
                {introBody}
              </p>
            )}
            {introBody2 && (
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-text-body">
                {introBody2}
              </p>
            )}
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-image bg-cream-soft shadow-card-hover">
            {introImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={introImage}
                  alt={`${overlayTitle || 'Soyol Erdem'} ${c.breadcrumbThis}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/85 via-navy-900/50 to-transparent p-7 text-white">
                  {overlayEyebrow && (
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400">
                      {overlayEyebrow}
                    </p>
                  )}
                  {overlayTitle && (
                    <p className="mt-1 font-serif text-2xl font-bold">
                      {overlayTitle}
                    </p>
                  )}
                  {overlaySubtitle && (
                    <p className="mt-1 whitespace-pre-line text-sm text-white/85">
                      {overlaySubtitle}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-center text-sm text-text-muted">
                Admin-аас зургаа оруулна уу.
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Vision / Mission / Values */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle title={philosophyTitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {philosophy.map((p, idx) => {
            const Icon = PHILOSOPHY_ICONS[idx] ?? Sparkles;
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
          {stats.map((s) => (
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
        <SectionTitle title={programsTitle} subtitle={programsSubtitle} />
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((p, idx) => {
            const Icon = PROGRAM_ICONS[idx] ?? GraduationCap;
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
        <SectionTitle title={highlightsTitle} align="left" />
        <div className="grid gap-5 md:grid-cols-2">
          {highlights.map((h, idx) => {
            const Icon = HIGHLIGHT_ICONS[idx] ?? Trophy;
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
              <h2 className="text-h2 font-bold text-text-heading">{newsTitle}</h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
            </div>
            <Link
              href="/high-school/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-gold-500"
            >
              {c.newsViewAll}
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
                category={localiseNewsCategory(n.category, locale)}
                title={localisedField(n, 'title', locale)}
                excerpt={localisedField(n, 'excerpt', locale)}
                body={localisedField(n, 'body', locale)}
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
              {contactEyebrow}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-navy-900 md:text-3xl">
              {contactTitle}
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gold-500" />
          </div>
          <div className="grid gap-4 md:col-span-2 sm:grid-cols-2">
            <div className="rounded-card border border-border-light bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Phone className="h-5 w-5" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                {phoneLabel}
              </p>
              <a href={`tel:${phonePrimary.replace(/\D/g,'')}`} className="mt-1 block text-base font-bold text-navy-900 hover:text-gold-500">
                {phonePrimary}
              </a>
              <a href={`tel:${phoneSecondary.replace(/\D/g,'')}`} className="mt-1 block text-sm text-text-body hover:text-gold-500">
                {phoneSecondary}
              </a>
            </div>
            <div className="rounded-card border border-border-light bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Mail className="h-5 w-5" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                {emailLabel}
              </p>
              <a href={`mailto:${contactEmail}`} className="mt-1 block break-all text-base font-bold text-navy-900 hover:text-gold-500">
                {contactEmail}
              </a>
            </div>
            <div className="rounded-card border border-border-light bg-white p-5 sm:col-span-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Calendar className="h-5 w-5" />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                {admissionOpenLabel}
              </p>
              <p className="mt-1 text-base font-bold text-navy-900">
                {admissionOpenValue}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/high-school/admission" variant="primary" size="md">
                  {admissionInfoCta}
                </Button>
                <Button href="/high-school/contact" variant="outline" size="md">
                  {otherQuestionsCta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner
        title={bannerTitle}
        subtitle={bannerSubtitle}
        ctaLabel={bannerCta}
        ctaHref="/high-school/admission"
        secondary={{ label: bannerSecondaryCta, href: '/high-school/contact' }}
      />
    </>
  );
}
