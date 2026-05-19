import {
  Briefcase,
  Building2,
  CalendarCheck,
  ChevronDown,
  ExternalLink,
  Globe2,
  GraduationCap,
  Leaf,
  MapPin,
  School,
  Users,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getSiteContentMap } from '@/lib/site-content';
import {
  DOMESTIC_PARTNERS,
  JAPAN_HIGH_SCHOOLS,
  JAPAN_PARTNERS_DETAILED,
  PARTNER_UNIVERSITIES,
  type PartnerDetailed,
} from '@/lib/content';
import { getServerLocale } from '@/lib/i18n/server';
import { INTERNATIONAL_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Хамтын ажиллагаа',
};

const BLOCK_ICONS = [Users, Briefcase, Globe2, Leaf] as const;

/**
 * Disclosure card for a partner profile. Collapsed shows just the
 * headline + scholarship pill; clicking reveals the full narrative
 * inline (no page navigation). Built on the native <details> element
 * so it works without any client-side JS. `expandLabel` / `collapseLabel`
 * arrive pre-localised from the calling page so the card stays
 * locale-agnostic.
 */
function PartnerProfileCard({
  p,
  icon: Icon = Building2,
  expandLabel,
  collapseLabel,
}: {
  p: PartnerDetailed;
  icon?: typeof Building2;
  expandLabel: string;
  collapseLabel: string;
}) {
  return (
    <details className="group h-full overflow-hidden rounded-card border border-border-light bg-white shadow-card transition-all duration-300 open:border-navy-900/40 hover:border-navy-900/40 hover:shadow-card-hover">
      <summary className="flex cursor-pointer list-none flex-col gap-3 p-5 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-3">
          {p.logo ? (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-button border border-border-light bg-white p-1.5 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo}
                alt={`${p.name} logo`}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </span>
          ) : (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-button bg-navy-900 text-gold-400 ring-1 ring-navy-900/20">
              <Icon className="h-5 w-5" />
            </span>
          )}
          {p.headline && (
            <span className="shrink-0 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold leading-tight text-navy-900 shadow-sm">
              {p.headline}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold leading-snug text-navy-900">
            {p.name}
          </h3>
          {p.nameJp && (
            <p className="mt-1 line-clamp-2 text-xs italic text-text-muted">
              {p.nameJp}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3 text-gold-500" />
            {p.location}
          </span>
          {p.partnerSince && (
            <span className="inline-flex items-center gap-1">
              <CalendarCheck className="h-3 w-3 text-gold-500" />
              {p.partnerSince}
            </span>
          )}
        </div>
        <span className="mt-1 inline-flex items-center gap-1 self-start text-[11px] font-bold uppercase tracking-wider text-navy-900 transition-colors group-open:text-gold-500">
          <span className="group-open:hidden">{expandLabel}</span>
          <span className="hidden group-open:inline">{collapseLabel}</span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180" />
        </span>
      </summary>
      <div className="border-t border-border-light bg-cream-soft/40 p-5 text-sm leading-relaxed text-text-body">
        {p.detail}
      </div>
    </details>
  );
}

export default async function InternationalPage() {
  const [banners, locale] = await Promise.all([
    getSiteContentMap('banners'),
    getServerLocale(),
  ]);
  const c = INTERNATIONAL_CONTENT[locale];

  // Join the canonical (Mongolian) lists in lib/content.ts — which carry
  // structural fields like logos and the original Japanese name — with
  // the locale-specific strings keyed by index. The Japanese display
  // name (`nameJp`) is intentionally suppressed in JP locale because
  // the main `name` is already the kanji rendering.
  const japanPartners: PartnerDetailed[] = JAPAN_PARTNERS_DETAILED.map(
    (p, idx) => {
      const tr = c.japanPartners[idx];
      if (!tr) return p;
      return {
        ...p,
        name: tr.name,
        nameJp: locale === 'JP' ? undefined : p.nameJp,
        location: tr.location,
        partnerSince: tr.partnerSince,
        detail: tr.detail,
        headline: tr.headline,
      };
    },
  );

  const highSchools: PartnerDetailed[] = JAPAN_HIGH_SCHOOLS.map((p, idx) => {
    const tr = c.highSchools[idx];
    if (!tr) return p;
    return {
      ...p,
      name: tr.name,
      nameJp: locale === 'JP' ? undefined : p.nameJp,
      location: tr.location,
      partnerSince: tr.partnerSince,
      detail: tr.detail,
      headline: tr.headline,
    };
  });

  const domestic = DOMESTIC_PARTNERS.map((d, idx) => {
    const tr = c.domestic[idx];
    return tr
      ? { ...d, name: tr.name, detail: tr.detail, activities: tr.activities }
      : d;
  });

  const otherPartners = PARTNER_UNIVERSITIES.map((u, idx) => {
    const tr = c.otherPartners[idx];
    return tr ? tr : u;
  });

  return (
    <>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={banners.get('page.international.banner') || undefined}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">{c.intro}</p>
        </div>
      </Section>

      {/* Four themed callout blocks */}
      <Section background="cream-soft">
        <div className="space-y-6">
          {c.blocks.map((b, i) => {
            const Icon = BLOCK_ICONS[i] ?? Globe2;
            return (
              <article
                key={b.heading}
                className="grid gap-6 rounded-card border border-border-light bg-white p-6 shadow-card md:grid-cols-[auto_1fr] md:p-8"
              >
                <div className="flex md:block">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-500 ring-1 ring-gold-500/30">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-xl font-bold leading-snug text-navy-900 md:text-2xl">
                    {b.heading}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-body md:text-base">
                    {b.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Detailed Japan partner profiles */}
      <Section background="white">
        <SectionTitle
          title={c.japanPartnersTitle}
          subtitle={c.japanPartnersSubtitle.replace(
            '{count}',
            String(japanPartners.length),
          )}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {japanPartners.map((p) => (
            <PartnerProfileCard
              key={p.name}
              p={p}
              icon={Building2}
              expandLabel={c.expand}
              collapseLabel={c.collapse}
            />
          ))}
        </div>
      </Section>

      {/* High-school partners */}
      <Section background="cream-soft">
        <SectionTitle
          title={c.highSchoolsTitle}
          subtitle={c.highSchoolsSubtitle}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {highSchools.map((p) => (
            <PartnerProfileCard
              key={p.name}
              p={p}
              icon={School}
              expandLabel={c.expand}
              collapseLabel={c.collapse}
            />
          ))}
        </div>
      </Section>

      {/* Domestic Mongolia partners */}
      <Section background="white">
        <SectionTitle title={c.domesticTitle} subtitle={c.domesticSubtitle} />
        <div className="grid gap-5 md:grid-cols-3">
          {domestic.map((d) => (
            <article
              key={d.name}
              className="flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card"
            >
              {d.logo ? (
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-button border border-border-light bg-white p-1.5 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.logo}
                    alt={`${d.name} logo`}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </span>
              ) : (
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                  <GraduationCap className="h-5 w-5" />
                </span>
              )}
              <h3 className="text-base font-bold leading-snug text-navy-900">
                {d.name}
              </h3>
              <a
                href={d.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex items-center gap-1 break-all text-xs font-semibold text-navy-900 hover:text-gold-500"
              >
                {d.url.replace(/^https?:\/\//, '')}
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
              <p className="mt-4 text-sm leading-relaxed text-text-body">
                {d.detail}
              </p>
              <div className="mt-4 border-t border-border-light pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                  {c.jointActivities}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {d.activities.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2 text-xs text-text-body"
                    >
                      <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Compact directory for the remaining partners */}
      {otherPartners.length > 0 && (
        <Section background="cream-soft">
          <SectionTitle
            title={c.otherPartnersTitle}
            subtitle={c.otherPartnersSubtitle}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {otherPartners.map((u) => (
              <Card key={u.name} className="flex h-full flex-col gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                  <Building2 className="h-4 w-4" />
                </span>
                <h3 className="mt-1 text-sm font-bold leading-snug text-navy-900">
                  {u.name}
                </h3>
                <p className="inline-flex items-center gap-1 text-xs text-text-muted">
                  <MapPin className="h-3 w-3" />
                  {u.location}
                </p>
                <Badge variant="cream" className="mt-auto self-start text-[10px]">
                  {u.type}
                </Badge>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
