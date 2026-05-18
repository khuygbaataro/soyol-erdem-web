import { ArrowRight, Briefcase, Check, Mail, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CAREERS_DEFAULT_OPENINGS } from '@/lib/content';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale } from '@/lib/i18n/server';
import { CAREERS_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Нээлттэй ажлын байр',
  description:
    'Соёл Эрдэм Дээд Сургуулийн нээлттэй багшийн ажлын байрны жагсаалт + анкет.',
};

export default async function CareersPage() {
  const [dbOpenings, banners, locale] = await Promise.all([
    prisma.jobOpening
      .findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { title: 'asc' }],
        select: { slug: true, title: true, description: true },
      })
      .catch(() => null),
    getSiteContentMap('banners'),
    getServerLocale(),
  ]);

  const c = CAREERS_CONTENT[locale];

  // DB rows (admin-managed) win when populated; otherwise fall back to
  // the localised default titles. DB openings stay literal because the
  // admin author controls their language; the seeded defaults map to
  // the locale-specific list.
  const openings =
    dbOpenings && dbOpenings.length > 0
      ? dbOpenings
      : CAREERS_DEFAULT_OPENINGS.map((o, idx) => ({
          slug: o.slug,
          title: c.defaultOpenings[idx] ?? o.title,
          description: null as string | null,
        }));

  return (
    <>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={banners.get('page.careers.banner') || undefined}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">{c.intro}</p>
        </div>
      </Section>

      {/* Open positions */}
      <Section background="cream-soft" id="openings">
        <SectionTitle title={c.openingsTitle} subtitle={c.openingsSubtitle} />
        {openings.length === 0 ? (
          <Card hover={false} className="text-center text-sm text-text-muted">
            {c.openingsEmpty}
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {openings.map((o) => (
              <article
                key={o.slug}
                className="group flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-900 hover:shadow-card-hover"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-navy-900">
                      {o.title}
                    </h3>
                    {o.description && (
                      <p className="mt-2 text-sm leading-relaxed text-text-body">
                        {o.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5 pt-2">
                  <Button
                    href={`/careers/apply?position=${encodeURIComponent(o.title)}`}
                    variant="outline"
                    size="sm"
                    icon={<ArrowRight className="h-3.5 w-3.5" />}
                  >
                    {c.applyCta}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      {/* Requirements + offers */}
      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-h3 font-bold text-navy-900">{c.requirementsTitle}</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
            <ul className="mt-6 space-y-3">
              {c.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-text-body">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h3 font-bold text-navy-900">{c.offersTitle}</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
            <ul className="mt-6 space-y-3">
              {c.offers.map((o) => (
                <li key={o} className="flex items-start gap-3 text-text-body">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Triple CTA strip */}
      <Section background="cream-soft" spacing="sm">
        <div className="grid gap-3 md:grid-cols-3">
          <Button
            href="/careers/apply"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="h-5 w-5" />}
            className="w-full"
          >
            {c.ctaApply}
          </Button>
          <Button href="#openings" variant="outline" size="lg" className="w-full">
            {c.ctaViewOpenings}
          </Button>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            icon={<Mail className="h-5 w-5" />}
            iconPosition="left"
            className="w-full"
          >
            {c.ctaJoinUs}
          </Button>
        </div>
      </Section>
    </>
  );
}
