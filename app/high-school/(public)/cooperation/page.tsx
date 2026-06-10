import {
  Building2,
  ExternalLink,
  GraduationCap,
  Plane,
  School,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { PartnerProfileCard } from '@/components/sections/PartnerProfileCard';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getSiteContentMap } from '@/lib/site-content';
import { prisma } from '@/lib/prisma';
import {
  DOMESTIC_PARTNERS,
  JAPAN_HIGH_SCHOOLS,
  JAPAN_PARTNERS_DETAILED,
  type PartnerDetailed,
} from '@/lib/content';
import { getServerLocale } from '@/lib/i18n/server';
import { INTERNATIONAL_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Хамтын ажиллагаа',
  description:
    'Соёл Эрдэм сургуулийн хамтран ажилладаг япон болон дотоодын байгууллагууд, сурагч солилцооны хөтөлбөр.',
};

/**
 * /high-school/cooperation — Хамтын ажиллагаа.
 *
 * Mirrors /international (main university site) since the institutional
 * partner network is shared. We reuse `JAPAN_PARTNERS_DETAILED`,
 * `JAPAN_HIGH_SCHOOLS`, `DOMESTIC_PARTNERS` and their per-locale
 * translations in `INTERNATIONAL_CONTENT[locale]` so the localised
 * names / scholarship pills / detail paragraphs all stay in sync —
 * any future edits land on both pages without duplication.
 *
 * What's HS-specific is the student-exchange pitch at the top: a hero
 * banner image + an "Сурагч солилцооны хөтөлбөр" highlight card whose
 * title/body live in SiteContent (`ahlah-cooperation.*`) so the admin
 * can edit it from /high-school/admin/site-content. Subtitle / hero
 * image are also admin-managed.
 */
export default async function HighSchoolCooperationPage() {
  const [locale, site, dbPartners] = await Promise.all([
    getServerLocale(),
    getSiteContentMap('ahlah-cooperation'),
    prisma.partner.findMany({ where: { active: true, site: 'HIGH_SCHOOL' }, orderBy: [{ type: 'asc' }, { order: 'asc' }] }).catch(() => []),
  ]);
  const c = INTERNATIONAL_CONTENT[locale];
  const heroImage = site.get('ahlah-cooperation.hero.image') || undefined;
  const heroTitle = site.get('ahlah-cooperation.hero.title') || 'ХАМТЫН АЖИЛЛАГАА';
  const heroSubtitle =
    site.get('ahlah-cooperation.hero.subtitle') ||
    'Япон болон дотоодын түнш байгууллагууд, сурагч солилцооны хөтөлбөр.';
  const introBody =
    site.get('ahlah-cooperation.intro.body') ||
    'Манай ахлах сургууль эх сургууль болох Соёл Эрдэм Дээд Сургуулийн олон жилийн япон болон дотоодын түнш байгууллагуудтай хамтран ажилладаг. Энэхүү сүлжээ нь сурагчид болон багш нарт олон улсын боловсролын баялаг боломжийг нээж өгдөг.';
  const exchangeTitle =
    site.get('ahlah-cooperation.exchange.title') || 'Сурагч солилцооны хөтөлбөр';
  const exchangeBody =
    site.get('ahlah-cooperation.exchange.body') ||
    'Соёл Эрдэм сургууль нь хамтран ажилладаг япон ахлах сургуулиудтайгаа жил бүр сурагч солилцооны хөтөлбөр зохион байгуулдаг. Хөтөлбөрт хамрагдсан сурагчид Япон улсад 1 долоо хоног — 1 жилийн хугацаатай суралцаж, япон хэл соёлыг шууд танин мэдэх боломжтой.';
  const exchangeHighlights = (
    site.get('ahlah-cooperation.exchange.highlights') ||
    '1 долоо хоног – 1 жилийн солилцоо\nЯпон хэл, соёлын нэвтрэлт\nХүлээн авах гэр бүлийн зохион байгуулалт\nСургуулийн хяналт ба харилцаа'
  )
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  // Partner lists — DB first (site=HIGH_SCHOOL), fallback to the shared
  // static lists merged with INTERNATIONAL_CONTENT locale strings.
  const dbJpUniv = dbPartners.filter((p) => p.type === 'japan-university');
  const dbHs = dbPartners.filter((p) => p.type === 'japan-highschool');
  const dbDom = dbPartners.filter((p) => p.type === 'domestic');
  const mapDb = (p: (typeof dbPartners)[number]): PartnerDetailed => ({
    name: p.name,
    nameJp: locale === 'JP' ? undefined : (p.nameJp ?? undefined),
    location: p.location ?? '',
    partnerSince: p.partnerSince ?? undefined,
    detail: p.detail ?? '',
    headline: p.headline ?? undefined,
    logo: p.logo ?? undefined,
  });

  const japanPartners: PartnerDetailed[] = dbJpUniv.length > 0
    ? dbJpUniv.map(mapDb)
    : JAPAN_PARTNERS_DETAILED.map((p, idx) => {
        const tr = c.japanPartners[idx];
        return tr ? { ...p, name: tr.name, nameJp: locale === 'JP' ? undefined : p.nameJp, location: tr.location, partnerSince: tr.partnerSince, detail: tr.detail, headline: tr.headline } : p;
      });

  const highSchools: PartnerDetailed[] = dbHs.length > 0
    ? dbHs.map(mapDb)
    : JAPAN_HIGH_SCHOOLS.map((p, idx) => {
        const tr = c.highSchools[idx];
        return tr ? { ...p, name: tr.name, nameJp: locale === 'JP' ? undefined : p.nameJp, location: tr.location, partnerSince: tr.partnerSince, detail: tr.detail, headline: tr.headline } : p;
      });

  const domestic = dbDom.length > 0
    ? dbDom.map((d) => ({
        name: d.name,
        logo: d.logo ?? undefined,
        url: d.url ?? '#',
        detail: d.detail ?? '',
        activities: (d.activities ?? '').split('\n').map((a) => a.trim()).filter(Boolean),
      }))
    : DOMESTIC_PARTNERS.map((d, idx) => {
        const tr = c.domestic[idx];
        return tr ? { ...d, name: tr.name, detail: tr.detail, activities: tr.activities } : d;
      });

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: 'Соёл Эрдэм сургууль', href: '/high-school' },
          { label: 'Хамтын ажиллагаа' },
        ]}
        backgroundImage={heroImage}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">{introBody}</p>
        </div>
      </Section>

      {/* Student-exchange highlight — the HS-specific addition. Navy
          gradient panel with a feature card on the right that lists
          the programme's key bullet points. All copy admin-editable. */}
      <Section background="cream-soft" spacing="md">
        <div className="grid gap-6 overflow-hidden rounded-card bg-gradient-to-br from-navy-900 via-[#172a4a] to-[#0f1f3a] p-7 text-white shadow-card md:grid-cols-[1.1fr_1fr] md:p-10">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-400 ring-1 ring-gold-500/30">
              <Plane className="h-3.5 w-3.5" />
              Япон-руу суралцах
            </span>
            <h2 className="mt-4 font-serif text-2xl font-extrabold leading-tight text-white md:text-3xl">
              {exchangeTitle}
            </h2>
            <div className="mt-4 h-[3px] w-12 rounded-full bg-gold-500" />
            <p className="mt-5 max-w-prose whitespace-pre-line text-sm leading-relaxed text-white/85 md:text-base">
              {exchangeBody}
            </p>
          </div>

          {exchangeHighlights.length > 0 && (
            <div className="rounded-card bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-gold-400">
                Хөтөлбөрийн онцлог
              </p>
              <ul className="mt-4 space-y-3">
                {exchangeHighlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-white/90">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      {/* Detailed Japan partner profiles — shared with /international */}
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

      {/* High-school partners — shared with /international */}
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

      {/* Domestic Mongolia partners — shared with /international */}
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
    </>
  );
}

