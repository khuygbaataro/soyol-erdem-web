import {
  Briefcase,
  Building2,
  ExternalLink,
  Globe2,
  GraduationCap,
  Leaf,
  MapPin,
  School,
  Users,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { PartnerProfileCard } from '@/components/sections/PartnerProfileCard';
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
import { prisma } from '@/lib/prisma';
import { getServerLocale } from '@/lib/i18n/server';
import { INTERNATIONAL_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Гадаад харилцаа',
};

const BLOCK_ICONS = [Users, Briefcase, Globe2, Leaf] as const;

// Disclosure card extracted to components/sections/PartnerProfileCard
// so /high-school/cooperation can reuse the same visual treatment for
// the shared partner list.

export default async function InternationalPage() {
  const [banners, intlContent, locale, dbPartners] = await Promise.all([
    getSiteContentMap('banners'),
    getSiteContentMap('international'),
    getServerLocale(),
    prisma.partner.findMany({ where: { active: true }, orderBy: [{ type: 'asc' }, { order: 'asc' }] }).catch(() => []),
  ]);
  const c = INTERNATIONAL_CONTENT[locale];

  const get = (key: string, fallback: string) =>
    intlContent.get(key) || fallback;

  // Hero + intro
  const heroTitle    = get('international.hero.title',    c.heroTitle);
  const heroSubtitle = get('international.hero.subtitle', c.heroSubtitle);
  const intro        = get('international.intro',         c.intro);

  // Callout blocks (up to 4)
  const blocks = c.blocks.map((b, i) => ({
    heading: get(`international.block.${i + 1}.heading`, b.heading),
    body:    get(`international.block.${i + 1}.body`,    b.body),
  }));

  // Section titles
  const japanPartnersTitle    = get('international.japanPartners.title',    c.japanPartnersTitle);
  const japanPartnersSubtitle = get('international.japanPartners.subtitle', c.japanPartnersSubtitle);
  const highSchoolsTitle      = get('international.highSchools.title',      c.highSchoolsTitle);
  const highSchoolsSubtitle   = get('international.highSchools.subtitle',   c.highSchoolsSubtitle);
  const domesticTitle         = get('international.domestic.title',         c.domesticTitle);
  const domesticSubtitle      = get('international.domestic.subtitle',      c.domesticSubtitle);

  // Japan partners — DB takes priority over static fallback.
  const dbJapanUniv = dbPartners.filter((p) => p.type === 'japan-university');
  const japanPartners: PartnerDetailed[] = (dbJapanUniv.length > 0 ? dbJapanUniv : JAPAN_PARTNERS_DETAILED).map((p) => ({
    name:         p.name,
    nameJp:       locale === 'JP' ? undefined : (p.nameJp ?? undefined),
    location:     p.location ?? '',
    partnerSince: p.partnerSince ?? undefined,
    headline:     p.headline ?? undefined,
    detail:       p.detail ?? '',
    logo:         p.logo ?? undefined,
  }));

  // High-school partners
  const dbHS = dbPartners.filter((p) => p.type === 'japan-highschool');
  const highSchools: PartnerDetailed[] = (dbHS.length > 0 ? dbHS : JAPAN_HIGH_SCHOOLS).map((p) => ({
    name:         p.name,
    nameJp:       locale === 'JP' ? undefined : (p.nameJp ?? undefined),
    location:     p.location ?? '',
    partnerSince: p.partnerSince ?? undefined,
    headline:     p.headline ?? undefined,
    detail:       p.detail ?? '',
    logo:         p.logo ?? undefined,
  }));

  // Domestic partners — keep using SiteContent overrides + static fallback
  const domestic = DOMESTIC_PARTNERS.map((d, idx) => {
    const i = idx + 1;
    const tr = c.domestic[idx];
    const activitiesRaw = intlContent.get(`international.dom.${i}.activities`) || '';
    const activities = activitiesRaw
      ? activitiesRaw.split('\n').map((a) => a.trim()).filter(Boolean)
      : tr?.activities ?? d.activities;
    return {
      ...d,
      name:       get(`international.dom.${i}.name`,   tr?.name   ?? d.name),
      detail:     get(`international.dom.${i}.detail`, tr?.detail ?? d.detail ?? ''),
      activities,
    };
  });

  const otherPartners = PARTNER_UNIVERSITIES.map((u, idx) => {
    const tr = c.otherPartners[idx];
    return tr ? tr : u;
  });

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={banners.get('page.international.banner') || undefined}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">{intro}</p>
        </div>
      </Section>

      {/* Four themed callout blocks */}
      <Section background="cream-soft">
        <div className="space-y-6">
          {blocks.map((b, i) => {
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
          title={japanPartnersTitle}
          subtitle={japanPartnersSubtitle.replace(
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
          title={highSchoolsTitle}
          subtitle={highSchoolsSubtitle}
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
        <SectionTitle title={domesticTitle} subtitle={domesticSubtitle} />
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

      {/* "БУСАД ХАМТРАГЧ БАЙГУУЛЛАГУУД" хэсэг — Munkhchimeg-ийн
          хүсэлтээр түр далдалж байна. Логог нь нэмж бэлэн болгосны
          дараа эргэн идэвхжүүлнэ. Доорх блок-ийг устгаагүй, зөвхөн
          `false &&` чагнаар render-аас гадуурлуулсан. */}
      {false && otherPartners.length > 0 && (
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
