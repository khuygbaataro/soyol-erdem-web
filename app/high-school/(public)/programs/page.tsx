import {
  BookOpen,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Languages,
  Network,
  Presentation,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { getServerLocale } from '@/lib/i18n/server';
import { HS_PROGRAMS_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Ахлах сургуулийн сургалт',
  description:
    'Соёл Эрдэм ахлах сургуулийн ерөнхий боловсролын зэрэгцээ Япон хэл, Төрөлжсөн IT мэргэжлийн хөтөлбөрүүд.',
};

// Icon orders kept code-side — joined by index with the localised arrays.
const STRUCTURE_ICONS: LucideIcon[] = [GraduationCap, Languages, Code2];
const IT_ICONS: LucideIcon[] = [Code2, Database, Network, Cpu];
const RESOURCE_ICONS: LucideIcon[] = [Cpu, BookOpen, Users];

export default async function HighSchoolProgramsPage() {
  const locale = await getServerLocale();
  const c = HS_PROGRAMS_CONTENT[locale];

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
      />

      {/* Structure */}
      <Section background="white" spacing="md">
        <SectionTitle title={c.structureTitle} subtitle={c.structureSubtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {c.structure.map((s, idx) => {
            const Icon = STRUCTURE_ICONS[idx] ?? GraduationCap;
            return (
              <Card key={s.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {s.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Japanese language detail */}
      <Section background="cream-soft" spacing="md" id="yapon-hel">
        <div className="mb-10">
          <Badge variant="gold" className="mb-3">
            {c.jpBadge}
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">
            {c.jpTitle}
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-body">
            {c.jpBody}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {c.jpLevels.map((l) => (
            <Card key={l.title} className="flex h-full flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                {l.tag}
              </span>
              <h3 className="mt-1 text-lg font-bold text-navy-900">{l.title}</h3>
              <ul className="mt-4 space-y-2">
                {l.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-text-body">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* IT detail */}
      <Section background="white" spacing="md" id="it">
        <div className="mb-10">
          <Badge variant="gold" className="mb-3">
            {c.itBadge}
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">
            {c.itTitle}
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-body">
            {c.itBody}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {c.itTopics.map((t, idx) => {
            const Icon = IT_ICONS[idx] ?? Code2;
            return (
              <Card key={t.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-navy-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{t.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Teachers */}
      <Section background="cream-soft" spacing="md" id="bagsh">
        <div className="mb-10">
          <Badge variant="gold" className="mb-3">
            {c.teachersBadge}
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">
            {c.teachersTitle}
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-body">
            {c.teachersBody}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {c.teachers.map((s) => (
            <div
              key={s.name}
              className="flex items-start gap-4 rounded-card border border-border-light bg-white p-6 shadow-card"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Presentation className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-navy-900">{s.name}</h3>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-gold-500">
                  {s.role}
                </p>
                <p className="mt-2 text-sm text-text-body">{s.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 rounded-card bg-navy-900 px-6 py-8 text-white md:grid-cols-4">
          {c.teacherStats.map((x) => (
            <div key={x.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-gold-400 md:text-4xl">
                {x.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/75">
                {x.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Resources / labs */}
      <Section background="white" spacing="md">
        <SectionTitle title={c.resourcesTitle} align="left" />
        <div className="grid gap-5 md:grid-cols-3">
          {c.resources.map((x, idx) => {
            const Icon = RESOURCE_ICONS[idx] ?? Cpu;
            return (
              <Card key={x.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{x.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{x.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <CtaBanner
        title={c.bannerTitle}
        subtitle={c.bannerSubtitle}
        ctaLabel={c.bannerCta}
        ctaHref="/high-school/admission"
        secondary={{ label: c.bannerSecondary, href: '/high-school/contact' }}
      />
    </>
  );
}
