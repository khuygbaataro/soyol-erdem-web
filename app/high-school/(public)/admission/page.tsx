import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  Sparkles,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { HighSchoolAdmissionForm } from '@/components/ui/HighSchoolAdmissionForm';
import { HIGH_SCHOOL } from '@/lib/constants';
import { getServerLocale } from '@/lib/i18n/server';
import { getSiteContentMap } from '@/lib/site-content';
import { HS_ADMISSION_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Ахлах сургуулийн элсэлт',
  description:
    'Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн 10-р ангид элсэх журам, шаардлага, хугацаа, холбоо барих.',
};

const STEP_ICONS: LucideIcon[] = [
  ClipboardList,
  FileText,
  GraduationCap,
  CalendarCheck,
];

export default async function HighSchoolAdmissionPage() {
  const [locale, site] = await Promise.all([
    getServerLocale(),
    getSiteContentMap('ahlah-admission'),
  ]);
  const c = HS_ADMISSION_CONTENT[locale];
  const heroImage = site.get('ahlah-admission.hero.image') || undefined;

  // Admin-editable (MN; EN/JP fall back to bundle).
  const g = (key: string, fb: string) =>
    locale === 'MN' ? (site.get(key) || fb) : fb;
  const posterImage = site.get('ahlah-admission.poster.image') || '/ahlah/admission-poster.jpg';
  // Requirements
  const requirementsTitle = g('ahlah-admission.requirements.title', c.requirementsTitle);
  const requirements = c.requirements.map((r, i) => ({
    title: g(`ahlah-admission.req.${i + 1}.title`, r.title),
    body: g(`ahlah-admission.req.${i + 1}.body`, r.body),
  }));
  // Steps
  const stepsTitle = g('ahlah-admission.steps.title', c.stepsTitle);
  const stepsSubtitle = g('ahlah-admission.steps.subtitle', c.stepsSubtitle);
  const steps = c.steps.map((s, i) => ({
    title: g(`ahlah-admission.step.${i + 1}.title`, s.title),
    body: g(`ahlah-admission.step.${i + 1}.body`, s.body),
  }));
  // Tuition
  const tuitionTitle = g('ahlah-admission.tuition.title', c.tuitionTitle);
  const tuitionBody = g('ahlah-admission.tuition.body', c.tuitionBody);
  // Docs (one per line)
  const docsRaw = site.get('ahlah-admission.docs.items');
  const docsTitle = g('ahlah-admission.docs.title', c.docsTitle);
  const docs = locale === 'MN' && docsRaw
    ? docsRaw.split('\n').map((s) => s.trim()).filter(Boolean)
    : c.docs;
  // Timeline (one "огноо | үйл явдал" per line)
  const timelineRaw = site.get('ahlah-admission.timeline.items');
  const timelineTitle = g('ahlah-admission.timeline.title', c.timelineTitle);
  const timeline = locale === 'MN' && timelineRaw
    ? timelineRaw.split('\n').map((line) => {
        const [date, ...rest] = line.split('|');
        return { date: (date ?? '').trim(), event: rest.join('|').trim() };
      }).filter((t) => t.date || t.event)
    : c.timeline;

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
        backgroundImage={heroImage}
      />

      {/*
        Элсэлтийн нэг хуудсан зар (Munkhchimeg-ийн зураг). Постер
        өөрөө бүрэн дизайнтай тул хүрээний хувьд зөвхөн алтан
        хүрээ + decorative dot-grid + soft cream фон-руу шингээж
        framing хийсэн. Гар утсан дээр sticky-fit, lg+ дээр
        max-w-5xl-аас илүү томрохгүй.
      */}
      <Section background="cream-soft" spacing="md">
        <div className="relative mx-auto max-w-5xl">
          {/* Decorative gold corner accents */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 rounded-tl-card border-l-4 border-t-4 border-gold-500 md:-left-4 md:-top-4 md:h-20 md:w-20"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 rounded-br-card border-b-4 border-r-4 border-gold-500 md:-bottom-4 md:-right-4 md:h-20 md:w-20"
          />

          {/* Subtle gold→navy gradient backdrop */}
          <div className="relative overflow-hidden rounded-card bg-white p-2 shadow-card-hover ring-1 ring-border-light md:p-3">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-gold-500/5 via-transparent to-navy-900/5"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterImage}
              alt="Соёл Эрдэм сургуулийн элсэлт I–XII анги"
              loading="lazy"
              className="block h-auto w-full rounded-[8px]"
            />
          </div>

          {/* Caption under poster */}
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-text-muted md:text-sm">
            ЭЛСЭЛТ I–XII АНГИ · 2026–2027 ОНЫ ХИЧЭЭЛИЙН ЖИЛ
          </p>
        </div>
      </Section>

      {/* Intro / quick info */}
      <Section background="white" spacing="md">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <Badge variant="gold" className="mb-5">
              {c.introBadge}
            </Badge>
            <h2 className="font-serif text-3xl font-bold leading-tight text-navy-900 md:text-4xl">
              {c.introTitle}
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-gold-500" />
            <p className="mt-6 text-base leading-relaxed text-text-body">{c.introBody}</p>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-card bg-cream-soft p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                  {c.infoBox.enrolLabel}
                </p>
                <p className="mt-1 font-serif text-2xl font-bold text-navy-900">
                  {c.infoBox.enrolValue}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                  {c.infoBox.yearLabel}
                </p>
                <p className="mt-1 font-serif text-2xl font-bold text-navy-900">
                  {c.infoBox.yearValue}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                  {c.infoBox.formatLabel}
                </p>
                <p className="mt-1 text-sm font-semibold text-navy-900">
                  {c.infoBox.formatValue}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                  {c.infoBox.trackLabel}
                </p>
                <p className="mt-1 text-sm font-semibold text-navy-900">
                  {c.infoBox.trackValue}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <Link
              href="#apply"
              className="group block rounded-card border-2 border-gold-500/40 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-card-hover"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-500 ring-1 ring-gold-500/30 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-white">
                <Sparkles className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-serif text-2xl font-bold leading-tight text-navy-900">
                {c.applyCardTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-body">
                {c.applyCardBody}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy-900 transition-colors duration-300 group-hover:text-gold-500">
                {c.applyCardCta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            <div className="rounded-card border border-border-light bg-cream-soft p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                {c.directContactEyebrow}
              </p>
              <div className="mt-4 space-y-3">
                <a
                  href={`tel:${HIGH_SCHOOL.contact.phonePrimary.replace('-', '')}`}
                  className="flex items-center gap-3 rounded-button bg-white px-4 py-3 transition-colors hover:bg-gold-500/5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                      {c.phoneLabel}
                    </p>
                    <p className="font-bold text-navy-900">
                      {HIGH_SCHOOL.contact.phonePrimary}
                    </p>
                  </div>
                </a>
                <a
                  href={`tel:${HIGH_SCHOOL.contact.phoneSecondary.replace('-', '')}`}
                  className="flex items-center gap-3 rounded-button bg-white px-4 py-3 transition-colors hover:bg-gold-500/5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                      {c.mobileLabel}
                    </p>
                    <p className="font-bold text-navy-900">
                      {HIGH_SCHOOL.contact.phoneSecondary}
                    </p>
                  </div>
                </a>
                <a
                  href={`mailto:${HIGH_SCHOOL.contact.email}`}
                  className="flex items-center gap-3 rounded-button bg-white px-4 py-3 transition-colors hover:bg-gold-500/5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                      {c.emailLabel}
                    </p>
                    <p className="break-all font-bold text-navy-900">
                      {HIGH_SCHOOL.contact.email}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Requirements */}
      <Section background="cream-soft" spacing="md">
        <SectionTitle title={requirementsTitle} />
        <div className="grid gap-5 md:grid-cols-2">
          {requirements.map((r) => (
            <Card key={r.title} className="flex h-full flex-col">
              <h3 className="text-base font-bold text-navy-900">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">{r.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section background="white" spacing="md">
        <SectionTitle title={stepsTitle} subtitle={stepsSubtitle} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => {
            const Icon = STEP_ICONS[idx] ?? ClipboardList;
            return (
              <Card key={s.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{s.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Required documents + Timeline */}
      <Section background="cream-soft" spacing="md">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle title={docsTitle} align="left" />
            <ul className="space-y-3">
              {docs.map((d, i) => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-card border border-border-light bg-white px-5 py-3 text-text-body shadow-card"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-gold-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle title={timelineTitle} align="left" />
            <ol className="space-y-3">
              {timeline.map((t) => (
                <li
                  key={t.event}
                  className="flex items-center gap-4 rounded-card border border-border-light bg-white px-5 py-4 text-text-body shadow-card"
                >
                  <span className="flex w-20 shrink-0 flex-col rounded-full bg-gold-500/15 px-3 py-1.5 text-center font-bold text-gold-600">
                    {t.date}
                  </span>
                  <p className="text-sm font-semibold text-navy-900">{t.event}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Tuition */}
      <Section background="white" spacing="md">
        <div className="mx-auto max-w-3xl rounded-card border border-border-light bg-cream-soft p-8 text-center shadow-card">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
            <Wallet className="h-6 w-6" />
          </span>
          <h3 className="mt-5 font-serif text-xl font-bold text-navy-900">
            {tuitionTitle}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-body">{tuitionBody}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`tel:${HIGH_SCHOOL.contact.phonePrimary.replace('-', '')}`}
              variant="primary"
              size="md"
            >
              {c.tuitionPhoneCta}
            </Button>
            <Button href="/high-school/contact" variant="outline" size="md">
              {c.tuitionContactCta}
            </Button>
          </div>
        </div>
      </Section>

      {/* Online application form */}
      <Section background="cream-soft" spacing="md" id="apply">
        <SectionTitle
          title={c.formSectionTitle}
          subtitle={c.formSectionSubtitle}
        />
        <div className="mx-auto max-w-3xl">
          <div className="rounded-card border border-border-light bg-white p-6 shadow-card md:p-8">
            <HighSchoolAdmissionForm labels={c.form} />
          </div>
        </div>
      </Section>

      <CtaBanner
        title={c.bannerTitle}
        ctaLabel={c.bannerCta}
        ctaHref="/high-school/about"
        secondary={{ label: c.bannerSecondary, href: '/high-school/programs' }}
      />
    </>
  );
}
