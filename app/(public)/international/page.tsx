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
import { CtaBanner } from '@/components/sections/CtaBanner';
import { getSiteContentMap } from '@/lib/site-content';
import {
  DOMESTIC_PARTNERS,
  INTERNATIONAL_BLOCKS,
  INTERNATIONAL_INTRO,
  JAPAN_HIGH_SCHOOLS,
  JAPAN_PARTNERS_DETAILED,
  PARTNER_UNIVERSITIES,
  type PartnerDetailed,
} from '@/lib/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Хамтын ажиллагаа',
};

const BLOCK_ICONS = [Users, Briefcase, Globe2, Leaf] as const;

/**
 * Disclosure card for a partner profile. Collapsed shows just the
 * headline + scholarship pill; clicking reveals the full narrative
 * inline (no page navigation). Built on the native <details> element
 * so it works without any client-side JS.
 */
function PartnerProfileCard({
  p,
  icon: Icon = Building2,
}: {
  p: PartnerDetailed;
  icon?: typeof Building2;
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
                alt={`${p.name} лого`}
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
          <span className="group-open:hidden">Дэлгэрэнгүй</span>
          <span className="hidden group-open:inline">Хаах</span>
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
  const banners = await getSiteContentMap('banners');
  return (
    <>
      <PageHero
        title="СУРГУУЛИЙН ГАДААД, ДОТООД ХАМТЫН АЖИЛЛАГАА"
        subtitle="Япон улсын 30+ их сургууль, мэргэжлийн сургууль, олон улсын байгууллагатай хамтрах сүлжээ."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Хамтын ажиллагаа' }]}
        backgroundImage={banners.get('page.international.banner') || undefined}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">
            {INTERNATIONAL_INTRO}
          </p>
        </div>
      </Section>

      {/* Four themed callout blocks */}
      <Section background="cream-soft">
        <div className="space-y-6">
          {INTERNATIONAL_BLOCKS.map((b, i) => {
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
          title="ХАМТРАГЧ ЯПОН СУРГУУЛИУДЫН ТАНИЛЦУУЛГА"
          subtitle={`${JAPAN_PARTNERS_DETAILED.length} их, дээд сургууль. Карт дээр дарж дэлгэрэнгүй танилцуулга, мэргэжил, тэтгэлгийн нөхцөлийг харна уу.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {JAPAN_PARTNERS_DETAILED.map((p) => (
            <PartnerProfileCard key={p.name} p={p} icon={Building2} />
          ))}
        </div>
      </Section>

      {/* High-school partners */}
      <Section background="cream-soft">
        <SectionTitle
          title="ХАМТРАГЧ ЯПОН АХЛАХ СУРГУУЛИУД"
          subtitle="НЕБ-ын Соёл Эрдэм сургуулийн сурагчдад нээлттэй хамтрагч сургуулиуд."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {JAPAN_HIGH_SCHOOLS.map((p) => (
            <PartnerProfileCard key={p.name} p={p} icon={School} />
          ))}
        </div>
      </Section>

      {/* Domestic Mongolia partners */}
      <Section background="white">
        <SectionTitle
          title="ДОТООД ХАМТЫН АЖИЛЛАГААТАЙ БАЙГУУЛЛАГУУД"
          subtitle="Монгол улсад үйл ажиллагаа явуулдаг хамтрагч байгууллагууд."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {DOMESTIC_PARTNERS.map((d) => (
            <article
              key={d.name}
              className="flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card"
            >
              {d.logo ? (
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-button border border-border-light bg-white p-1.5 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.logo}
                    alt={`${d.name} лого`}
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
                  Хамтарсан арга хэмжээ
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
      {PARTNER_UNIVERSITIES.length > 0 && (
        <Section background="cream-soft">
          <SectionTitle
            title="БУСАД ХАМТРАГЧ БАЙГУУЛЛАГУУД"
            subtitle="Гэрээт хамтрагч их, дээд сургууль, мэргэжлийн сургууль, холбоод."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PARTNER_UNIVERSITIES.map((u) => (
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

      <CtaBanner
        title="Япон улсад очиж суралцахыг хүсэж байна уу?"
        ctaLabel="Элсэлт"
        ctaHref="/admission"
        secondary={{ label: 'Бидэнтэй холбогдох', href: '/contact' }}
      />
    </>
  );
}
