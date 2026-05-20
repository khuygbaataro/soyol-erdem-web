import {
  Activity,
  Award,
  BookMarked,
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  Database,
  Globe2,
  GraduationCap,
  Languages,
  Lightbulb,
  Network,
  Plane,
  Presentation,
  Sparkles,
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
import { getSiteContentMap } from '@/lib/site-content';
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
// Green Jade — partner programme (7 services). The icon list maps 1:1
// against the localised `jadeServices` array in HS_PROGRAMS_CONTENT.
const JADE_ICONS: LucideIcon[] = [
  Sparkles,      // Kid's English
  BookOpen,      // Junior English
  Languages,     // General English
  Award,         // IELTS
  GraduationCap, // NIFY (Australia)
  GraduationCap, // OXFY (UK)
  Briefcase,     // Placement
];

/**
 * "Бага / Дунд / Ахлах сургуулийн онцлог" admin-managed section.
 * SiteContent rows live under group `ahlah-programs` with keys
 * `ahlah-programs.levels.<level>.<field>`. Per level we read 4 strings
 * (name + 3 categories). Falls back to empty + the section renders
 * only when the level's `.name` is non-empty.
 */
type LevelKey = 'elementary' | 'middle' | 'high';
type LevelView = {
  key: LevelKey;
  name: string;
  education: string;
  curriculum: string;
  extracurricular: string;
};

// Localised category headings (per UI locale) so the labels render
// in EN / JP without the admin needing to maintain that.
const CATEGORY_HEADINGS: Record<
  'MN' | 'EN' | 'JP',
  { education: string; curriculum: string; extracurricular: string }
> = {
  MN: {
    education: 'Боловсролын онцлог',
    curriculum: 'Сургалтын хөтөлбөрүүд',
    extracurricular: 'Хичээлээс гадуурх үйл ажиллагаа',
  },
  EN: {
    education: 'Educational focus',
    curriculum: 'Curriculum',
    extracurricular: 'Extracurriculars',
  },
  JP: {
    education: '教育の特色',
    curriculum: 'カリキュラム',
    extracurricular: '課外活動',
  },
};

export default async function HighSchoolProgramsPage() {
  const [locale, site] = await Promise.all([
    getServerLocale(),
    getSiteContentMap('ahlah-programs'),
  ]);
  const c = HS_PROGRAMS_CONTENT[locale];
  const heroImage = site.get('ahlah-programs.hero.image') || undefined;

  // Build the level cards from SiteContent. Each level slot only
  // renders when its `.name` row is present, so partial data never
  // produces an empty card.
  const levelOrder: LevelKey[] = ['elementary', 'middle', 'high'];
  const levels: LevelView[] = levelOrder
    .map((lv) => ({
      key: lv,
      name: site.get(`ahlah-programs.levels.${lv}.name`) || '',
      education: site.get(`ahlah-programs.levels.${lv}.education`) || '',
      curriculum: site.get(`ahlah-programs.levels.${lv}.curriculum`) || '',
      extracurricular:
        site.get(`ahlah-programs.levels.${lv}.extracurricular`) || '',
    }))
    .filter((l) => l.name.length > 0);
  const levelsTitle = site.get('ahlah-programs.levels.title') || '';
  const levelsSubtitle = site.get('ahlah-programs.levels.subtitle') || '';
  const catH = CATEGORY_HEADINGS[locale];
  // Icon per level — kept code-side because lucide JSX can't cross
  // the RSC boundary as data.
  const LEVEL_ICONS: Record<LevelKey, LucideIcon> = {
    elementary: BookMarked,
    middle: Lightbulb,
    high: GraduationCap,
  };
  const CATEGORY_ICONS = {
    education: Sparkles,
    curriculum: BookOpen,
    extracurricular: Activity,
  } as const;

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

      {/* "Бага / Дунд / Ахлах сургуулийн онцлог" — Admin-editable
          comparison block. Renders one card per level (only those
          with content) and 3 sub-blocks per level: Боловсролын
          онцлог / Сургалтын хөтөлбөрүүд / Хичээлээс гадуурх үйл
          ажиллагаа. The whole block is suppressed if no level has
          a `.name` value yet, so the page never shows an empty
          shell when SiteContent is unseeded. */}
      {levels.length > 0 && (
        <Section background="cream-soft" spacing="md" id="angiud">
          <SectionTitle title={levelsTitle} subtitle={levelsSubtitle} />
          <div className="grid gap-6 lg:grid-cols-3">
            {levels.map((l) => {
              const LevelIcon = LEVEL_ICONS[l.key];
              const blocks: Array<{
                heading: string;
                body: string;
                Icon: LucideIcon;
              }> = [
                {
                  heading: catH.education,
                  body: l.education,
                  Icon: CATEGORY_ICONS.education,
                },
                {
                  heading: catH.curriculum,
                  body: l.curriculum,
                  Icon: CATEGORY_ICONS.curriculum,
                },
                {
                  heading: catH.extracurricular,
                  body: l.extracurricular,
                  Icon: CATEGORY_ICONS.extracurricular,
                },
              ];
              return (
                <article
                  key={l.key}
                  className="flex h-full flex-col overflow-hidden rounded-card border border-border-light bg-white shadow-card transition-shadow hover:shadow-card-hover"
                >
                  {/* Header band — navy with gold icon */}
                  <header className="flex items-center gap-3 bg-navy-900 px-6 py-5 text-white">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/30">
                      <LevelIcon className="h-5 w-5" />
                    </span>
                    <h3 className="font-serif text-xl font-bold leading-tight">
                      {l.name}
                    </h3>
                  </header>

                  {/* 3 categorised blocks; skip block when its body
                      is empty so partial admin data renders cleanly. */}
                  <div className="flex flex-1 flex-col gap-5 p-6">
                    {blocks.map((b) =>
                      b.body.length > 0 ? (
                        <div key={b.heading}>
                          <div className="mb-2 flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                              <b.Icon className="h-3.5 w-3.5" />
                            </span>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                              {b.heading}
                            </p>
                          </div>
                          <p className="whitespace-pre-line text-sm leading-relaxed text-text-body">
                            {b.body}
                          </p>
                        </div>
                      ) : null,
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>
      )}

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

      {/* Green Jade — international study pathway (partner programme) */}
      <Section background="white" spacing="md" id="green-jade">
        <div className="mb-10">
          <Badge variant="gold" className="mb-3">
            {c.jadeBadge}
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">
            {c.jadeTitle}
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-body">
            {c.jadeBody}
          </p>
        </div>

        {/* Stats strip — same navy panel pattern as the teachers block */}
        <div className="mb-10 grid grid-cols-2 gap-6 rounded-card bg-navy-900 px-6 py-8 text-white md:grid-cols-4">
          {c.jadeStats.map((x) => (
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

        <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-gold-500">
          {c.jadeServicesTitle}
        </h3>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.jadeServices.map((s, idx) => {
            const Icon = JADE_ICONS[idx] ?? Globe2;
            return (
              <Card key={s.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {s.body}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Partner countries strip */}
        <div className="mt-8 flex flex-col gap-3 rounded-card border border-emerald-500/30 bg-emerald-500/5 p-6 sm:flex-row sm:items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-700">
            <Plane className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
              {c.jadeCountriesTitle}
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-navy-900">
              {c.jadeCountries}
            </p>
          </div>
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
