import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileCheck,
  FileText,
  Globe,
  Home,
  MonitorSmartphone,
  Phone,
  Plane,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { TimelineStep } from '@/components/ui/TimelineStep';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { getSiteContentMap } from '@/lib/site-content';
import { ADMISSION_PROGRAMS, SCHOLARSHIPS } from '@/lib/content';
import { getServerLocale } from '@/lib/i18n/server';
import { ADMISSION_CONTENT } from '@/lib/i18n/content';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Элсэлт',
  description:
    '2026-2027 оны хичээлийн жилийн элсэлтийн мэдээлэл — бакалавр, магистр, 30+, мэргэжил хөрвөх, гадаадаас шилжин суралцах, онлайн сургалт, бэлтгэл анги.',
};

const SUB_NAV_ICONS = {
  info: FileText,
  foreign: Globe,
  payment: Wallet,
} as const;

// Icons for the three permit steps (Visa → Residence → Registration).
// Order matches DB rows admission.permit.1..3.
const PERMIT_ICONS: LucideIcon[] = [Plane, Home, ClipboardCheck];

// Localised eyebrow text shown on the international-applicants intro
// band. Three short strings — adding to the full content bundle would
// be overkill so we keep them inline.
const FOREIGN_EYEBROW: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Гадаад иргэн',
  EN: 'International applicants',
  JP: '外国人志願者',
};

/**
 * Strip back-to-back duplicate paragraphs from admin-entered text.
 * The admission.permit.1.body row in the DB happens to repeat the same
 * paragraph three times — likely a copy-paste mishap from the editor.
 * Dropping the duplicates at render time keeps the card readable
 * without forcing a content edit; if the editor intentionally repeats
 * paragraphs in the future, they only need to vary the text slightly.
 */
function dedupeParagraphs(text: string): string {
  const seen = new Set<string>();
  return text
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter((p) => {
      if (p.length === 0) return false;
      if (seen.has(p)) return false;
      seen.add(p);
      return true;
    })
    .join('\n\n');
}

// Localised label for the "Read more →" link on each scholarship card.
const SCHOLARSHIP_READ_MORE: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Дэлгэрэнгүй →',
  EN: 'Read more →',
  JP: '詳しく見る →',
};

// Online-availability pill text.
const ONLINE_LABEL: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Онлайн',
  EN: 'Online',
  JP: 'オンライン',
};

// Home breadcrumb crumb.
const HOME_CRUMB: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Нүүр',
  EN: 'Home',
  JP: 'ホーム',
};

export default async function AdmissionPage() {
  const [adm, banners, locale] = await Promise.all([
    getSiteContentMap('admission'),
    getSiteContentMap('banners'),
    getServerLocale(),
  ]);

  const c = ADMISSION_CONTENT[locale];
  const isMn = locale === 'MN';
  // Helper: read from DB (MN only), fall back to bundle value.
  const g = (key: string, fallback: string) =>
    isMn ? (adm.get(key) || fallback) : fallback;

  // Hero
  const heroTitle    = g('admission.hero.title',    c.heroTitle);
  const heroSubtitle = g('admission.hero.subtitle', c.heroSubtitle);

  // Section titles
  const sectionInfoTitle    = g('admission.section.info.title',         c.sectionInfoTitle);
  const sectionInfoSubtitle = g('admission.section.info.subtitle',      c.sectionInfoSubtitle);
  const stepsTitle          = g('admission.section.steps.title',        c.stepsTitle);
  const stepsSubtitle       = g('admission.section.steps.subtitle',     c.stepsSubtitle);
  const requirementsHeading = g('admission.section.requirements.heading', c.requirementsHeading);
  const foreignTitle        = g('admission.section.foreign.title',      c.foreignTitle);
  const paymentTitle        = g('admission.section.payment.title',      c.paymentTitle);
  const paymentSubtitle     = g('admission.section.payment.subtitle',   c.paymentSubtitle);
  const faqTitle            = g('admission.section.faq.title',          c.faqTitle);

  // Programs — DB overrides per field; icons + online flag stay static.
  const programs = ADMISSION_PROGRAMS.map((p) => {
    const tr = c.programs.find((x) => x.id === p.id);
    const key = `admission.program.${p.id}`;
    const bulletsRaw = g(`${key}.bullets`, tr?.bullets?.join('\n') ?? p.bullets.join('\n'));
    const bullets2Raw = g(`${key}.bullets2`, tr?.bullets2?.join('\n') ?? p.bullets2?.join('\n') ?? '');
    return {
      ...p,
      title:        g(`${key}.title`,        tr?.title        ?? p.title),
      intro:        g(`${key}.intro`,        tr?.intro        ?? p.intro),
      bulletsLabel: g(`${key}.bulletsLabel`, tr?.bulletsLabel ?? p.bulletsLabel ?? ''),
      bullets:      bulletsRaw.split('\n').map(s => s.trim()).filter(Boolean),
      bullets2Label: g(`${key}.bullets2Label`, tr?.bullets2Label ?? p.bullets2Label ?? ''),
      bullets2:     bullets2Raw ? bullets2Raw.split('\n').map(s => s.trim()).filter(Boolean) : [],
      cta:          g(`${key}.cta`,          tr?.cta          ?? p.cta),
    };
  });

  // Steps
  const steps = c.steps.map((s, i) => ({
    ...s,
    title:       g(`admission.step.${i+1}.title`,       s.title),
    description: g(`admission.step.${i+1}.description`, s.description),
  }));

  // Requirements
  const reqRaw = g('admission.requirements', c.requirements.join('\n'));
  const requirements = reqRaw.split('\n').map(s => s.trim()).filter(Boolean);

  // Scholarships — icon stays static.
  const scholarships = SCHOLARSHIPS.map((s, idx) => ({
    icon: s.icon,
    title:       g(`admission.scholarship.${idx+1}.title`,       c.scholarships[idx]?.title       ?? s.title),
    description: g(`admission.scholarship.${idx+1}.description`, c.scholarships[idx]?.description ?? s.description),
  }));

  // FAQ
  const faqItems = c.faq.map((f, i) => ({
    question: g(`admission.faq.${i+1}.question`, f.question),
    answer:   g(`admission.faq.${i+1}.answer`,   f.answer),
  }));

  const permits = [1, 2, 3]
    .map((i) => ({
      title: adm.get(`admission.permit.${i}.title`) || '',
      body: adm.get(`admission.permit.${i}.body`) || '',
      contact: adm.get(`admission.permit.${i}.contact`) || '',
    }))
    .filter((p) => p.title.trim().length > 0);

  const foreignIntro =
    adm.get('admission.foreign.intro') ||
    'Гадаадын иргэн манай сургуульд элсэх журам, бүрдүүлэх материал, виза дэмжих захидал, дотуур байр болон хичээлийн жилийн графикын талаар мэдээллийг доороос үзнэ үү.';
  const foreignCtaLabel =
    adm.get('admission.foreign.cta.label') || 'Гадаад оюутан элсүүлэх журам';
  const foreignCtaHref = adm.get('admission.foreign.cta.href') || '/contact';

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumb={[{ label: HOME_CRUMB[locale], href: '/' }, { label: heroTitle }]}
        backgroundImage={banners.get('page.admission.banner') || undefined}
      />

      {/* Sub-nav — three anchors per editor's spec */}
      <div className="sticky top-20 z-30 border-b border-border-light bg-white/95 backdrop-blur">
        <div className="container-custom flex flex-wrap items-center gap-2 py-3">
          {(['info', 'foreign', 'payment'] as const).map((id) => {
            const Icon = SUB_NAV_ICONS[id];
            return (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-light bg-white px-4 py-1.5 text-sm font-semibold text-text-body transition-colors hover:border-navy-900 hover:text-navy-900"
              >
                <Icon className="h-3.5 w-3.5" />
                {c.subNav[id]}
              </a>
            );
          })}
        </div>
      </div>

      {/* Section 1 — Мэргэжлээ сонгох (8 program boxes) */}
      <Section background="cream-soft" id="info">
        <SectionTitle
          title={sectionInfoTitle}
          subtitle={sectionInfoSubtitle}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {programs.map((p) => (
            <article
              key={p.id}
              className={cn(
                'flex h-full flex-col rounded-card border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover',
                p.featured
                  ? 'border-gold-500 ring-1 ring-gold-500/30'
                  : 'border-border-light',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h3
                  className={cn(
                    'text-sm font-bold uppercase leading-snug tracking-wide',
                    p.featured ? 'text-gold-500' : 'text-navy-900',
                  )}
                >
                  {p.title}
                </h3>
                {p.online && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-navy-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-400">
                    <MonitorSmartphone className="h-3 w-3" />
                    {ONLINE_LABEL[locale]}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-body">
                {p.intro}
              </p>

              {p.bulletsLabel && (
                <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-navy-900">
                  {p.bulletsLabel}
                </p>
              )}
              <ul className={cn('space-y-1.5', p.bulletsLabel ? 'mt-2' : 'mt-4')}>
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-text-body"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {p.bullets2 && p.bullets2.length > 0 && (
                <>
                  {p.bullets2Label && (
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-navy-900">
                      {p.bullets2Label}
                    </p>
                  )}
                  <ul className={cn('space-y-1.5', p.bullets2Label ? 'mt-2' : 'mt-4')}>
                    {p.bullets2.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-text-body"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-auto pt-6">
                <Button
                  href={p.ctaHref}
                  variant={p.featured ? 'accent' : 'primary'}
                  size="sm"
                  icon={<ArrowRight className="h-3.5 w-3.5" />}
                  className="w-full"
                >
                  {p.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section background="white">
        <SectionTitle title={stepsTitle} subtitle={stepsSubtitle} />
        <div className="hidden items-start justify-between gap-2 lg:flex">
          {steps.map((s, idx) => (
            <TimelineStep
              key={s.number}
              number={s.number}
              title={s.title}
              description={s.description}
              isActive={idx === 0}
              isLast={idx === c.steps.length - 1}
            />
          ))}
        </div>
        <div className="space-y-4 lg:hidden">
          {steps.map((s) => (
            <Card key={s.number} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 text-base font-bold text-navy-900">
                {s.number}
              </span>
              <div>
                <h4 className="font-semibold text-navy-900">{s.title}</h4>
                <p className="mt-1 text-sm text-text-body">{s.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Requirements — full-width now (Журам sidebar removed per editor) */}
      <Section background="cream-soft">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-h2 font-bold text-navy-900">
            {requirementsHeading}
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
          <ul className="mt-6 space-y-3">
            {requirements.map((req) => (
              <li key={req} className="flex items-start gap-3 text-text-body">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Section 2 — Гадаад оюутан элсэх */}
      <Section background="white" id="foreign">
        <SectionTitle title={foreignTitle} />

        {/* Intro band — full-width navy gradient hero with a decorative
            "plane + globe" cluster on the right. Reads as a section
            opener rather than a thin card to the left of the permits. */}
        <div className="relative mb-10 overflow-hidden rounded-card bg-gradient-to-br from-navy-900 via-[#1a2a4a] to-navy-900 text-white shadow-card-hover">
          {/* Decorative gold circles top-right */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-gold-500/10 blur-2xl"
          />

          <div className="relative grid gap-8 p-8 md:grid-cols-[2fr_1fr] md:p-12 lg:gap-12">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold-300">
                <Plane className="h-3 w-3" />
                {FOREIGN_EYEBROW[locale]}
              </span>
              <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-white/90 md:text-lg">
                {foreignIntro}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  href={foreignCtaHref}
                  variant="accent"
                  size="md"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  {foreignCtaLabel}
                </Button>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/70">
                  <Phone className="h-3.5 w-3.5 text-gold-400" />
                  +976 7011-8584
                </span>
              </div>
            </div>

            {/* Decorative icon cluster — only on desktop so mobile stays
                content-focused */}
            <div className="hidden items-center justify-center md:flex">
              <div className="relative h-44 w-44">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-gold-500/40"
                />
                <span
                  aria-hidden
                  className="absolute inset-4 rounded-full border border-gold-500/30"
                />
                <span
                  aria-hidden
                  className="absolute inset-8 rounded-full bg-gold-500/10"
                />
                <Globe
                  className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-gold-400"
                  aria-hidden
                />
                <span className="absolute -right-1 -top-1 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-lg">
                  <Plane className="h-5 w-5" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-step permit guide — numbered, with distinct icons per step
            and a connecting timeline rail on desktop. Reads sequentially
            (Visa → Residence → Registration) like an applicant journey. */}
        {permits.length > 0 && (
          <div className="relative">
            {/* Horizontal rail on desktop, dotted line between step numbers */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px md:block"
              style={{
                background:
                  'repeating-linear-gradient(to right, rgba(212,162,76,0.4) 0 6px, transparent 6px 14px)',
              }}
            />
            <div className="relative grid gap-6 md:grid-cols-3">
              {permits.map((p, idx) => {
                const Icon = PERMIT_ICONS[idx] ?? FileCheck;
                return (
                  <article
                    key={`${p.title}-${idx}`}
                    className="group relative flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-card-hover"
                  >
                    {/* Numbered step badge sitting on the rail */}
                    <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-gold-400 ring-4 ring-white">
                      {idx + 1}
                    </span>

                    <span className="mb-4 mt-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-500 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>

                    <h3 className="font-serif text-lg font-bold leading-snug text-navy-900">
                      {p.title}
                    </h3>

                    {p.body && (
                      <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-text-body">
                        {dedupeParagraphs(p.body)}
                      </p>
                    )}

                    {p.contact && (
                      <div className="mt-5 rounded-button bg-cream-soft/80 p-3">
                        <p className="flex items-start gap-2 whitespace-pre-line text-[11px] leading-relaxed text-text-body">
                          <Phone
                            className="mt-0.5 h-3 w-3 shrink-0 text-gold-500"
                            aria-hidden
                          />
                          <span>{p.contact}</span>
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </Section>

      {/* Section 3 — Төлбөр, хөнгөлөлт */}
      <Section background="cream-soft" id="payment">
        <SectionTitle title={paymentTitle} subtitle={paymentSubtitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-text-body">
                  {s.description}
                </p>
                <a
                  href="#faq"
                  className="mt-4 text-sm font-semibold text-navy-900 hover:text-gold-500"
                >
                  {SCHOLARSHIP_READ_MORE[locale]}
                </a>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white" id="faq">
        <SectionTitle title={faqTitle} />
        <div className="mx-auto max-w-2xl">
          <Accordion items={faqItems} />
        </div>
      </Section>

    </>
  );
}
