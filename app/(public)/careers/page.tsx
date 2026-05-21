import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  Check,
  ClipboardList,
  Download,
  FileText,
  Mail,
  Phone,
  Sparkles,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale } from '@/lib/i18n/server';
import { localisedField } from '@/lib/i18n/db';
import { CAREERS_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Нээлттэй ажлын байр',
  description:
    'Соёл Эрдэм Дээд Сургуулийн нээлттэй багшийн ажлын байрны жагсаалт + анкет.',
};

export default async function CareersPage() {
  const [dbOpenings, banners, careersInfo, locale] = await Promise.all([
    prisma.jobOpening
      .findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { title: 'asc' }],
        // Pull translation columns too so we can localise per visitor.
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
      .catch(() => null),
    getSiteContentMap('banners'),
    // SiteContent group `careers` carries the shared application info
    // (required documents, deadline, contact email + phone) — admin
    // editable at /admin/site-content → "Нээлттэй ажлын байр" tab.
    // Seeded by scripts/add-careers-info.ts.
    getSiteContentMap('careers'),
    getServerLocale(),
  ]);

  const c = CAREERS_CONTENT[locale];

  // Single source of truth: /admin/careers → JobOpening table. Each
  // row's title / description is locale-resolved via `localisedField`
  // so EN / JP visitors see the admin-supplied translation (falling
  // back to the MN canonical value when a translation column is
  // empty).
  const openings = (dbOpenings ?? []).map((o) => ({
    slug: o.slug,
    title: localisedField(o, 'title', locale),
    description: o.description
      ? localisedField(o, 'description', locale)
      : null,
  }));

  // Build the application-info card payload from SiteContent. Empty
  // strings → field is hidden so admin can blank out a row to
  // suppress it. `materials` is one-per-line; split + trim here so
  // the renderer just iterates a string[].
  const infoTitle = careersInfo.get('careers.info.title') || '';
  const infoSubtitle = careersInfo.get('careers.info.subtitle') || '';
  const infoMaterials = (careersInfo.get('careers.info.materials') || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const infoDeadlineLabel = careersInfo.get('careers.info.deadlineLabel') || '';
  const infoDeadlineValue = careersInfo.get('careers.info.deadlineValue') || '';
  const infoEmailLabel = careersInfo.get('careers.info.emailLabel') || '';
  const infoEmails = (careersInfo.get('careers.info.emails') || '')
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const infoPhoneLabel = careersInfo.get('careers.info.phoneLabel') || '';
  const infoPhone = careersInfo.get('careers.info.phone') || '';
  const showInfoCard =
    infoTitle.length > 0 &&
    (infoMaterials.length > 0 ||
      infoDeadlineValue.length > 0 ||
      infoEmails.length > 0 ||
      infoPhone.length > 0);

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
                {/*
                  Two-action footer — appears on every opening card
                  by virtue of being inside the `.map(o => …)` loop,
                  so any new opening posted from /admin/careers
                  inherits the same Download + Apply layout
                  automatically.
                    • Анкет татах — native <a download> on the MN
                      anket template (.doc), kicks off a real file
                      download.
                    • Анкет бөглөх — links to /careers/apply with
                      the position pre-selected. Submissions land in
                      /admin/careers/applications (already wired).
                  Layout: `mt-auto` pins the action row to the
                  bottom of the card so cards with longer
                  descriptions still align their CTAs in a row.
                */}
                <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-5">
                  <a
                    href="/careers/anket-mn.doc"
                    download="Багш ажилтны анкет.doc"
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-button border border-navy-900 bg-white px-4 text-sm font-semibold text-navy-900 transition-all hover:border-gold-500 hover:bg-gold-500 hover:text-navy-900"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {c.downloadAnketCta}
                  </a>
                  <Button
                    href={`/careers/apply?position=${encodeURIComponent(o.title)}`}
                    variant="primary"
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

      {/* "Бүртгэлийн мэдээлэл" хэсэг — SiteContent-аас уншсан
          материалууд, хугацаа, имэйл, утас. Бүх opening карт-д ижил
          хэрэгтэй ерөнхий мэдээлэл нэг газар хадгалагдаж, админ
          /admin/site-content → "Нээлттэй ажлын байр" tab-аас засна.
          Хэсэг бүхэлдээ далдална үнэлгээ хийгдээгүй тохиолдолд
          (`showInfoCard` false). */}
      {showInfoCard && (
        <Section background="white" id="info">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-card border border-border-light bg-gradient-to-br from-cream-soft to-white shadow-card">
              <div className="border-b border-border-light bg-navy-900 px-7 py-5 text-white">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-400">
                  <ClipboardList className="h-3.5 w-3.5" />
                  {infoTitle}
                </span>
                {infoSubtitle && (
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-white/85">
                    {infoSubtitle}
                  </p>
                )}
              </div>

              <div className="grid gap-6 p-7 md:grid-cols-[1.4fr_1fr] md:gap-10 md:p-10">
                {/* Шаардлагатай материалууд — гол блок */}
                {infoMaterials.length > 0 && (
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-500">
                      Шаардлагатай материал
                    </p>
                    <ol className="mt-4 space-y-3">
                      {infoMaterials.map((m, i) => (
                        <li
                          key={`${i}-${m.slice(0, 24)}`}
                          className="flex items-start gap-3 text-sm leading-relaxed text-text-body"
                        >
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[11px] font-extrabold text-gold-400">
                            {i + 1}
                          </span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Хугацаа + холбоо барих */}
                <div className="space-y-4">
                  {infoDeadlineValue && (
                    <div className="rounded-card border border-border-light bg-white p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                          <CalendarClock className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            {infoDeadlineLabel}
                          </p>
                          <p className="mt-1 font-serif text-base font-bold text-navy-900">
                            {infoDeadlineValue}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {infoEmails.length > 0 && (
                    <div className="rounded-card border border-border-light bg-white p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                          <Mail className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            {infoEmailLabel}
                          </p>
                          <ul className="mt-1 space-y-1">
                            {infoEmails.map((e) => (
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

                  {infoPhone && (
                    <div className="rounded-card border border-border-light bg-white p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                          <Phone className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            {infoPhoneLabel}
                          </p>
                          <a
                            href={`tel:${infoPhone.replace(/\s+/g, '')}`}
                            className="mt-1 block font-serif text-base font-bold text-navy-900 hover:text-gold-500"
                          >
                            {infoPhone}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

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

      {/*
        Анкетийн загвар татаж авах хэсэг — Munkhchimeg нэмэхийг
        хүссэн. 2 хувилбартай: монгол хэлээр .doc + япон хэлээр .docx.
        Файлууд /public/careers/anket-{mn,jp}.{doc,docx} замд хадгалагдсан.
        Зөвхөн татах товч — формыг шууд нь нь сайт дотор бөглөх систем
        нь /careers/apply хуудсаар хийгдэнэ.
      */}
      <Section background="white" id="template">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-card border border-border-light bg-gradient-to-br from-cream-soft to-white shadow-card">
            <div className="grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-10">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-500 ring-1 ring-gold-500/30">
                  <FileText className="h-3.5 w-3.5" />
                  Анкет / 履歴書
                </span>
                <h2 className="mt-4 font-serif text-2xl font-bold leading-tight text-navy-900 md:text-3xl">
                  {c.templateTitle}
                </h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-gold-500" />
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-text-body md:text-base">
                  {c.templateSubtitle}
                </p>
              </div>

              {/* Two language picks — labelled MN / JP and each with
                  its file format so the user knows what they're
                  downloading before they click. Native <a download>
                  triggers a browser download instead of in-tab open. */}
              <div className="flex flex-col gap-3 md:min-w-[240px]">
                <a
                  href="/careers/anket-mn.doc"
                  download="Багш ажилтны анкет (MN).doc"
                  className="group inline-flex items-center justify-between gap-3 rounded-button bg-navy-900 px-5 py-3.5 text-sm font-bold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-gold-500 hover:text-navy-900"
                >
                  <span className="flex flex-col items-start leading-tight">
                    <span>{c.templateMnLabel}</span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-white/70 group-hover:text-navy-900/60">
                      .doc · {c.templateDownloadCta}
                    </span>
                  </span>
                  <Download className="h-4 w-4 shrink-0" />
                </a>
                <a
                  href="/careers/anket-jp.docx"
                  download="履歴書 文化教育大学 (JP).docx"
                  className="group inline-flex items-center justify-between gap-3 rounded-button border border-navy-900 bg-white px-5 py-3.5 text-sm font-bold text-navy-900 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500"
                >
                  <span className="flex flex-col items-start leading-tight">
                    <span>{c.templateJpLabel}</span>
                    <span className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-text-muted">
                      .docx · {c.templateDownloadCta}
                    </span>
                  </span>
                  <Download className="h-4 w-4 shrink-0" />
                </a>
              </div>
            </div>
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
