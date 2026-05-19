import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale } from '@/lib/i18n/server';
import { REGISTER_CONTENT, ADMISSION_CONTENT } from '@/lib/i18n/content';
import { localisedField } from '@/lib/i18n/db';
import { RegisterFormClient } from './RegisterFormClient';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Элсэлтийн цахим бүртгэл',
  description:
    'Соёл Эрдэм Дээд Сургуулийн 2026-2027 оны хичээлийн жилийн элсэлтийн цахим бүртгэлийн анкет.',
};

// Per-locale labels for the new info panel placed above the form. Tiny
// inline maps — adding them to the full bundle would be over-engineering
// for ~6 short strings.
const INFO_TITLE: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Элсэлтийн товч мэдээлэл',
  EN: 'Admission at a glance',
  JP: '入学案内 概要',
};
const INFO_REQUIREMENTS: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Шаардлага',
  EN: 'Requirements',
  JP: '出願条件',
};
const INFO_TIMELINE: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Хугацаа',
  EN: 'Timeline',
  JP: 'スケジュール',
};
const INFO_CONTACT: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Холбоо барих',
  EN: 'Contact',
  JP: 'お問い合わせ',
};
const INFO_BACK: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Бүх элсэлтийн мэдээллийг үзэх',
  EN: 'See full admission info',
  JP: '入学案内に戻る',
};
const INFO_LEAD: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Доорх 8 алхамтай анкетыг бөглөхөөс өмнө шаардлага, хугацаа, холбоо барих утсыг харна уу. Анкет илгээгдмэгц элсэлтийн алба тантай 1-2 өдрийн дотор холбогдоно.',
  EN: 'Before completing the 8-step form below, please review the requirements, timeline and contact details. Our admissions office will reach out within 1–2 working days of your submission.',
  JP: '下記の8ステップフォームを記入する前に、出願条件・スケジュール・お問い合わせ先をご確認ください。送信後1〜2営業日以内に入学事務局よりご連絡いたします。',
};

export default async function AdmissionRegisterPage() {
  // Pull the program list so the form's programme step shows the real
  // catalog instead of a hard-coded placeholder. Each row is localised
  // up-front so the client component receives the correct language
  // names without having to call localisedField itself.
  const [programs, banners, locale] = await Promise.all([
    prisma.program
      .findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          name: true,
          nameEn: true,
          nameJa: true,
          degree: true,
        },
      })
      .catch(() => []),
    getSiteContentMap('banners'),
    getServerLocale(),
  ]);

  const c = REGISTER_CONTENT[locale];
  // Pull a tight slice of the admission bundle so we can echo the
  // canonical requirements + timeline + contact lines here without
  // duplicating any strings.
  const adm = ADMISSION_CONTENT[locale];
  const localisedPrograms = programs.map((p) => ({
    id: p.id,
    name: localisedField(p, 'name', locale),
    degree: p.degree,
  }));

  // The top 3 timeline entries — keeping the info compact. The full
  // 5-row timeline still lives on /admission.
  const topTimeline = adm.steps.slice(0, 4);

  return (
    <>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbAdmission, href: '/admission' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={banners.get('page.admission-register.banner') || undefined}
      />

      {/* Compact admission-at-a-glance panel — so applicants don't have
          to bounce back to /admission for the basics before they fill
          in the form. */}
      <Section background="white" spacing="md">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
                {INFO_TITLE[locale]}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-body">
                {INFO_LEAD[locale]}
              </p>
            </div>
            <Link
              href="/admission"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 transition-colors hover:text-gold-500"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {INFO_BACK[locale]}
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Requirements card */}
            <article className="flex h-full flex-col rounded-card border border-border-light bg-cream-soft/50 p-5">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-500">
                <FileText className="h-5 w-5" />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900">
                {INFO_REQUIREMENTS[locale]}
              </h3>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-body">
                {adm.requirements.slice(0, 4).map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-gold-500" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Timeline card */}
            <article className="flex h-full flex-col rounded-card border border-border-light bg-cream-soft/50 p-5">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-500">
                <Calendar className="h-5 w-5" />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900">
                {INFO_TIMELINE[locale]}
              </h3>
              <ol className="mt-3 space-y-2 text-xs leading-relaxed text-text-body">
                {topTimeline.map((t) => (
                  <li key={t.number} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-gold-400">
                      {t.number}
                    </span>
                    <span>
                      <span className="font-semibold text-navy-900">
                        {t.title}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </article>

            {/* Contact card */}
            <article className="flex h-full flex-col rounded-card border border-border-light bg-cream-soft/50 p-5">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-500">
                <Phone className="h-5 w-5" />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900">
                {INFO_CONTACT[locale]}
              </h3>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-text-body">
                <li>
                  <a
                    href="tel:+97670118584"
                    className="inline-flex items-center gap-2 font-semibold text-navy-900 transition-colors hover:text-gold-500"
                  >
                    <Phone className="h-3 w-3 text-gold-500" />
                    +976 7011-8584
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+97670118589"
                    className="inline-flex items-center gap-2 font-semibold text-navy-900 transition-colors hover:text-gold-500"
                  >
                    <Phone className="h-3 w-3 text-gold-500" />
                    +976 7011-8589
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:soyolerdem.daigaku@gmail.com"
                    className="inline-flex items-start gap-2 break-all font-semibold text-navy-900 transition-colors hover:text-gold-500"
                  >
                    <Mail className="mt-0.5 h-3 w-3 shrink-0 text-gold-500" />
                    soyolerdem.daigaku@gmail.com
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </Section>

      <Section background="cream-soft">
        <div className="mx-auto max-w-3xl">
          <RegisterFormClient programs={localisedPrograms} labels={c} />
        </div>
      </Section>
    </>
  );
}
