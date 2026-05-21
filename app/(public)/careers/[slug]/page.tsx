import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  Check,
  ClipboardList,
  Download,
  Mail,
  Phone,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/prisma';
import { getServerLocale } from '@/lib/i18n/server';
import { getSiteContentMap } from '@/lib/site-content';
import { localisedField } from '@/lib/i18n/db';
import { CAREERS_CONTENT } from '@/lib/i18n/content';

interface PageProps {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps) {
  const item = await prisma.jobOpening
    .findUnique({ where: { slug: params.slug } })
    .catch(() => null);
  return item
    ? { title: `${item.title} · Нээлттэй ажлын байр` }
    : { title: 'Нээлттэй ажлын байр' };
}

/**
 * /careers/[slug] — single-job detail page.
 *
 * Tuhain ajiliin bairnii buten medeelel:
 *   • Position title + description (teaching topics) from JobOpening
 *   • Shared requirements / materials / deadline / contacts from
 *     SiteContent group `careers` (admin-editable at /admin/site-content
 *     → "Нээлттэй ажлын байр" tab)
 *   • Two prominent CTAs: Анкет татах (download) + Анкет бөглөх
 *     (links to /careers/apply?position=<title>)
 *   • "Бусад нээлттэй ажлын байр" — other active openings as cards at
 *     the bottom so the visitor can browse alternatives without going
 *     back to the listing.
 */
export default async function JobOpeningDetailPage({ params }: PageProps) {
  const [item, others, careersInfo, locale] = await Promise.all([
    prisma.jobOpening
      .findUnique({ where: { slug: params.slug } })
      .catch(() => null),
    prisma.jobOpening
      .findMany({
        where: { active: true, NOT: { slug: params.slug } },
        orderBy: [{ order: 'asc' }, { title: 'asc' }],
        take: 6,
        select: {
          slug: true,
          title: true,
          description: true,
          titleEn: true,
          titleJa: true,
          descriptionEn: true,
          descriptionJa: true,
        },
      })
      .catch(() => []),
    getSiteContentMap('careers'),
    getServerLocale(),
  ]);

  if (!item || !item.active) notFound();

  const c = CAREERS_CONTENT[locale];
  const title = localisedField(item, 'title', locale);
  const description = item.description
    ? localisedField(item, 'description', locale)
    : '';

  // SiteContent payload (shared across openings)
  const reqTitle =
    careersInfo.get('careers.info.requirementsTitle') || 'Тавигдах шаардлага';
  const requirements = (careersInfo.get('careers.info.requirements') || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const infoTitle =
    careersInfo.get('careers.info.title') || 'Бүртгэлийн мэдээлэл';
  const infoSubtitle = careersInfo.get('careers.info.subtitle') || '';
  const materials = (careersInfo.get('careers.info.materials') || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const deadlineLabel =
    careersInfo.get('careers.info.deadlineLabel') || 'Хүлээн авах хугацаа';
  const deadlineValue = careersInfo.get('careers.info.deadlineValue') || '';
  const emailLabel = careersInfo.get('careers.info.emailLabel') || 'Имэйл';
  const emails = (careersInfo.get('careers.info.emails') || '')
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const phoneLabel = careersInfo.get('careers.info.phoneLabel') || 'Утас';
  const phone = careersInfo.get('careers.info.phone') || '';

  return (
    <>
      <PageHero
        title={title}
        subtitle={c.heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbThis, href: '/careers' },
          { label: title },
        ]}
      />

      {/* Position overview + primary CTAs */}
      <Section background="white" spacing="md">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-500 ring-1 ring-gold-500/30">
              <Briefcase className="h-3.5 w-3.5" />
              {c.breadcrumbThis}
            </span>
            <h1 className="font-serif text-3xl font-bold leading-tight text-navy-900 md:text-4xl">
              {title}
            </h1>
            <div className="h-1 w-14 rounded-full bg-gold-500" />
            {description && (
              <p className="max-w-prose whitespace-pre-line text-base leading-relaxed text-text-body">
                {description}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Button
                href={`/careers/apply?position=${encodeURIComponent(title)}`}
                variant="primary"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                {c.applyCta}
              </Button>
              <a
                href="/careers/anket-mn.doc"
                download="Багш ажилтны анкет.doc"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-button border border-navy-900 bg-white px-8 text-base font-semibold text-navy-900 transition-all hover:border-gold-500 hover:bg-gold-500 hover:text-navy-900"
              >
                <Download className="h-4 w-4" />
                {c.downloadAnketCta}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Шаардлага + Бүртгэлийн материал */}
      {(requirements.length > 0 || materials.length > 0) && (
        <Section background="cream-soft" spacing="md">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-2">
              {requirements.length > 0 && (
                <article className="rounded-card border border-border-light bg-white p-7 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                      <Check className="h-5 w-5" />
                    </span>
                    <h2 className="font-serif text-xl font-bold text-navy-900">
                      {reqTitle}
                    </h2>
                  </div>
                  <div className="mt-4 h-1 w-10 rounded-full bg-gold-500" />
                  <ul className="mt-5 space-y-3">
                    {requirements.map((r, i) => (
                      <li
                        key={`${i}-${r.slice(0, 20)}`}
                        className="flex items-start gap-3 text-sm leading-relaxed text-text-body"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[11px] font-extrabold text-gold-400">
                          {i + 1}
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )}

              {materials.length > 0 && (
                <article className="rounded-card border border-border-light bg-white p-7 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                      <ClipboardList className="h-5 w-5" />
                    </span>
                    <h2 className="font-serif text-xl font-bold text-navy-900">
                      Бүрдүүлэх материал
                    </h2>
                  </div>
                  <div className="mt-4 h-1 w-10 rounded-full bg-gold-500" />
                  {infoSubtitle && (
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">
                      {infoSubtitle}
                    </p>
                  )}
                  <ol className="mt-5 space-y-3">
                    {materials.map((m, i) => (
                      <li
                        key={`${i}-${m.slice(0, 20)}`}
                        className="flex items-start gap-3 text-sm leading-relaxed text-text-body"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[11px] font-extrabold text-gold-400">
                          {i + 1}
                        </span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Хугацаа + холбоо */}
      {(deadlineValue || emails.length > 0 || phone) && (
        <Section background="white" spacing="md">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-xl font-bold text-navy-900 md:text-2xl">
              {infoTitle}
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gold-500" />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {deadlineValue && (
                <div className="rounded-card border border-border-light bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                      <CalendarClock className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {deadlineLabel}
                      </p>
                      <p className="mt-1 font-serif text-base font-bold text-navy-900">
                        {deadlineValue}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {emails.length > 0 && (
                <div className="rounded-card border border-border-light bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {emailLabel}
                      </p>
                      <ul className="mt-1 space-y-1">
                        {emails.map((e) => (
                          <li key={e}>
                            <a
                              href={`mailto:${e}`}
                              className="break-all text-sm font-semibold text-navy-900 hover:text-gold-500"
                            >
                              {e}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {phone && (
                <div className="rounded-card border border-border-light bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                        {phoneLabel}
                      </p>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="mt-1 block font-serif text-base font-bold text-navy-900 hover:text-gold-500"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Secondary CTA — давтан action бар. */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href={`/careers/apply?position=${encodeURIComponent(title)}`}
                variant="primary"
                size="md"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {c.applyCta}
              </Button>
              <a
                href="/careers/anket-mn.doc"
                download="Багш ажилтны анкет.doc"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-button border border-navy-900 bg-white px-6 text-base font-semibold text-navy-900 transition-all hover:border-gold-500 hover:bg-gold-500"
              >
                <Download className="h-3.5 w-3.5" />
                {c.downloadAnketCta}
              </a>
            </div>
          </div>
        </Section>
      )}

      {/* Бусад нээлттэй ажлын байр */}
      {others.length > 0 && (
        <Section background="cream-soft" spacing="md">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-xl font-bold text-navy-900 md:text-2xl">
              Бусад нээлттэй ажлын байр
            </h2>
            <div className="mt-3 h-1 w-12 rounded-full bg-gold-500" />

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => {
                const oTitle = localisedField(o, 'title', locale);
                const oDesc = o.description
                  ? localisedField(o, 'description', locale)
                  : null;
                return (
                  <Link
                    key={o.slug}
                    href={`/careers/${o.slug}`}
                    className="group flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-900 hover:shadow-card-hover"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                        <Briefcase className="h-4 w-4" />
                      </span>
                      <h3 className="text-base font-bold text-navy-900 transition-colors group-hover:text-gold-500">
                        {oTitle}
                      </h3>
                    </div>
                    {oDesc && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-body">
                        {oDesc}
                      </p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold uppercase tracking-wider text-navy-900 transition-transform group-hover:translate-x-0.5">
                      Дэлгэрэнгүй
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Button href="/careers#openings" variant="outline" size="md">
                {c.ctaViewOpenings}
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
