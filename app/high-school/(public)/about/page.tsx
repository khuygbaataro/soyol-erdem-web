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
import { getServerLocale } from '@/lib/i18n/server';
import { HS_ABOUT_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Ахлах сургуулийн танилцуулга',
  description:
    'Нийслэлийн ерөнхий боловсролын Соёл Эрдэм сургуулийн товч танилцуулга, эрхэм зорилго, бүтэц зохион байгуулалт, онцлох амжилт.',
};

// Icon orders kept code-side — joined by index with the localised arrays.
const PHILOSOPHY_ICONS: LucideIcon[] = [Sparkles, GraduationCap, Award];
const HIGHLIGHT_ICONS: LucideIcon[] = [Trophy, Award, Globe2, Users];

export default async function HighSchoolAboutPage() {
  const locale = await getServerLocale();
  const c = HS_ABOUT_CONTENT[locale];

  // The intro paragraph carries an inline date that should bold inside
  // the surrounding sentence. Split on the {date} placeholder so we can
  // keep the literal date `c.introBody1Date` wrapped in <strong>.
  const introBody1Parts = c.introBody1.split('{date}');

  return (
    <>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbUniversity, href: '/' },
          { label: c.breadcrumbHs, href: '/high-school' },
          { label: c.breadcrumbThis },
        ]}
      />

      {/* Intro */}
      <Section background="white" spacing="md">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <Badge variant="gold" className="mb-5">
              {c.introBadge}
            </Badge>
            <h2 className="font-serif text-3xl font-bold leading-tight text-navy-900 md:text-4xl">
              {c.introTitle1} <br className="hidden sm:block" />
              {c.introTitle2}
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-gold-500" />
            <p className="mt-6 text-base leading-relaxed text-text-body">
              {introBody1Parts[0]}
              <strong className="text-navy-900">{c.introBody1Date}</strong>
              {introBody1Parts[1] ?? ''}
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-body">
              {c.introBody2}
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
                {c.posterLine1}
              </p>
              <p className="mt-1 font-serif text-2xl font-bold text-navy-900">
                {c.posterLine2}
              </p>
              <p className="mt-1 text-sm text-text-body">{c.posterLine3}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision / Motto / Values */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle title={c.philosophyTitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {c.philosophy.map((p, idx) => {
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

      {/* Director's Message */}
      <Section background="white" spacing="md">
        <SectionTitle title={c.directorTitle} />
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div className="overflow-hidden rounded-card bg-navy-900 text-white shadow-card-hover">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/highschool-director.jpg"
                alt={`${c.directorName} — ${c.directorRole}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/95 via-navy-900/55 to-transparent px-6 pb-6 pt-12">
                <Quote className="h-6 w-6 text-gold-400" />
                <p className="mt-3 font-serif text-xl font-bold leading-tight text-white">
                  {c.directorName}
                </p>
                <p className="mt-1 text-sm text-white/85">{c.directorRole}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-text-body">
            {c.directorBody.map((p, idx) => (
              <p key={idx}>{p.body}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section background="navy" spacing="md">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {c.stats.map((s) => (
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
        <SectionTitle title={c.orgTitle} subtitle={c.orgSubtitle} />
        <div className="grid gap-5 md:grid-cols-2">
          {c.org.map((g) => (
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
                      <span className="text-xs text-text-muted">{n.subtitle}</span>
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
        <SectionTitle title={c.highlightsTitle} align="left" />
        <div className="grid gap-5 md:grid-cols-2">
          {c.highlights.map((h, idx) => {
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

      {/* Japan partnerships */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle
          title={c.partnershipsTitle}
          subtitle={c.partnershipsSubtitle}
        />
        <div className="grid gap-3 md:grid-cols-2">
          {c.partnerships.map((p) => (
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
        title={c.bannerTitle}
        subtitle={c.bannerSubtitle}
        ctaLabel={c.bannerCta}
        ctaHref="/high-school/admission"
        secondary={{ label: c.bannerSecondary, href: '/high-school/contact' }}
      />
    </>
  );
}
