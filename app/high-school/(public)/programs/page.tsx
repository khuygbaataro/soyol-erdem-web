import {
  Award,
  BookMarked,
  BookOpen,
  Briefcase,
  Clock,
  Code2,
  Cpu,
  Database,
  Globe2,
  GraduationCap,
  Handshake,
  Heart,
  HeartPulse,
  Languages,
  Lightbulb,
  Network,
  Plane,
  Presentation,
  Recycle,
  Shirt,
  Smartphone,
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

// Каталоговгийн нэр доогуурх жижиг caption ("1-5 анги" г.м.) —
// сурагчдын дамжаа нь Монголын ердийн 12 жилийн систем дээр
// тогтсон тул админд бичүүлэхгүй inline байрлуулсан.
const GRADE_RANGE: Record<'MN' | 'EN' | 'JP', Record<LevelKey, string>> = {
  MN: { elementary: '1–5 анги', middle: '6–9 анги', high: '10–12 анги' },
  EN: { elementary: 'Grades 1–5', middle: 'Grades 6–9', high: 'Grades 10–12' },
  JP: { elementary: '1〜5年生', middle: '6〜9年生', high: '10〜12年生' },
};

const STEP_LABEL: Record<'MN' | 'EN' | 'JP', string> = {
  MN: 'Шат',
  EN: 'Stage',
  JP: 'ステージ',
};

export default async function HighSchoolProgramsPage() {
  const [locale, site] = await Promise.all([
    getServerLocale(),
    getSiteContentMap('ahlah-programs'),
  ]);
  const c = HS_PROGRAMS_CONTENT[locale];
  const heroImage = site.get('ahlah-programs.hero.image') || undefined;

  // Admin-editable sections (ahlah-programs group), bundle fallback.
  const g = (key: string, fb: string) => site.get(key) || fb;
  const heroTitle = g('ahlah-programs.hero.title', c.heroTitle);
  const heroSubtitle = g('ahlah-programs.hero.subtitle', c.heroSubtitle);
  // СУРГАЛТЫН БҮТЭЦ
  const structureTitle = g('ahlah-programs.structure.title', c.structureTitle);
  const structureSubtitle = g('ahlah-programs.structure.subtitle', c.structureSubtitle);
  const structure = c.structure.map((x, i) => ({
    title: g(`ahlah-programs.structure.${i + 1}.title`, x.title),
    description: g(`ahlah-programs.structure.${i + 1}.description`, x.description),
  }));
  // Япон хэлний түвшинт хөтөлбөр
  const jpBadge = g('ahlah-programs.jp.badge', c.jpBadge);
  const jpTitle = g('ahlah-programs.jp.title', c.jpTitle);
  const jpBody = g('ahlah-programs.jp.body', c.jpBody);
  const jpLevels = c.jpLevels.map((l, i) => ({
    tag: g(`ahlah-programs.jp.${i + 1}.tag`, l.tag),
    title: g(`ahlah-programs.jp.${i + 1}.title`, l.title),
    bullets: (site.get(`ahlah-programs.jp.${i + 1}.bullets`) || l.bullets.join('\n'))
      .split('\n').map((b) => b.trim()).filter(Boolean),
  }));
  // Мэдээллийн технологийн төрөлжсөн анги
  const itBadge = g('ahlah-programs.it.badge', c.itBadge);
  const itTitle = g('ahlah-programs.it.title', c.itTitle);
  const itBody = g('ahlah-programs.it.body', c.itBody);
  const itTopics = c.itTopics.map((t, i) => ({
    title: g(`ahlah-programs.it.${i + 1}.title`, t.title),
    body: g(`ahlah-programs.it.${i + 1}.body`, t.body),
  }));
  // СУРГАЛТЫН ОРЧИН
  const resourcesTitle = g('ahlah-programs.resources.title', c.resourcesTitle);
  const resources = c.resources.map((r, i) => ({
    title: g(`ahlah-programs.resources.${i + 1}.title`, r.title),
    body: g(`ahlah-programs.resources.${i + 1}.body`, r.body),
  }));

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

  // "Бидний 10 соёл" хэсэг — SiteContent-ээс админд засагдсан гарчиг
  // + жагсаалт. Icon-ыг код талаас тогтмол дарааллаар (доорх
  // CULTURE_ICONS-ийн дарааллаар) холбож өгдөг тул админ жагсаалтыг
  // өөрчилбөл icon ч мөн адил байр шилжиж очно.
  const cultureTitle = site.get('ahlah-programs.culture.title') || '';
  const cultureSubtitle = site.get('ahlah-programs.culture.subtitle') || '';
  const cultureItems = (site.get('ahlah-programs.culture.items') || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  // Lucide icons лавлагаа зурагтай ойролцоо: greeting (Handshake),
  // uniform (Shirt), nutrition/health (HeartPulse), idea/cleanliness
  // (Lightbulb), time (Clock), honesty (Heart), tidy (Sparkles),
  // public manners (Users), phone (Smartphone), no littering (Recycle).
  const CULTURE_ICONS: LucideIcon[] = [
    Handshake,
    Shirt,
    HeartPulse,
    Lightbulb,
    Clock,
    Heart,
    Sparkles,
    Users,
    Smartphone,
    Recycle,
  ];
  const catH = CATEGORY_HEADINGS[locale];
  // Icon per level — kept code-side because lucide JSX can't cross
  // the RSC boundary as data.
  const LEVEL_ICONS: Record<LevelKey, LucideIcon> = {
    elementary: BookMarked,
    middle: Lightbulb,
    high: GraduationCap,
  };

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbUniversity, href: '/' },
          { label: c.breadcrumbHs, href: '/high-school' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={heroImage}
      />

      {/* Structure */}
      <Section background="white" spacing="md">
        <SectionTitle title={structureTitle} subtitle={structureSubtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {structure.map((s, idx) => {
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

      {/* "Бага / Дунд / Ахлах сургуулийн онцлог" — admin-editable
          comparison block. Editorial card design per Munkhchimeg's
          design-eye request:
            • Header: navy gradient with a faded watermark number
              (01/02/03), gold-ringed icon, eyebrow "Шат N", level
              name in serif, gold accent bar, grade-range caption.
            • Body: warm cream surface with hairline dividers between
              the three categories, gold-dot indicators preceding each
              uppercase category label.
            • Subtle lift on hover for tactility.
          Only renders levels whose `.name` row is non-empty and skips
          per-category blocks whose body is empty, so partial admin
          data still presents cleanly. */}
      {levels.length > 0 && (
        <Section background="cream-soft" spacing="md" id="angiud">
          <SectionTitle title={levelsTitle} subtitle={levelsSubtitle} />
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-7">
            {levels.map((l, idx) => {
              const LevelIcon = LEVEL_ICONS[l.key];
              const stepNumber = String(idx + 1).padStart(2, '0');
              const blocks: Array<{ heading: string; body: string }> = [
                { heading: catH.education, body: l.education },
                { heading: catH.curriculum, body: l.curriculum },
                { heading: catH.extracurricular, body: l.extracurricular },
              ];
              return (
                <article
                  key={l.key}
                  className="group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  {/* Editorial header — navy gradient + watermark */}
                  <header className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-[#172a4a] to-[#0f1f3a] px-7 pb-7 pt-7 text-white">
                    {/* Big faded number watermark in the corner */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-2 -top-4 select-none font-serif text-[112px] font-black leading-none text-white/[0.06]"
                    >
                      {stepNumber}
                    </span>

                    {/* Eyebrow row: icon + stage label */}
                    <div className="relative flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400 ring-2 ring-gold-500/30 transition-transform duration-300 group-hover:scale-105">
                        <LevelIcon className="h-5 w-5" />
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-400">
                        {STEP_LABEL[locale]} {idx + 1}
                      </span>
                    </div>

                    {/*
                      Level name. `text-white` is set explicitly because
                      globals.css applies `color: var(--text-heading)` to
                      every `h1`–`h6`, which overrides the parent
                      `<header className="text-white">` and would
                      otherwise render this dark-on-navy.
                    */}
                    <h3 className="relative mt-6 font-serif text-2xl font-extrabold leading-tight text-white md:text-[1.6rem]">
                      {l.name}
                    </h3>

                    {/* Gold accent bar */}
                    <div className="relative mt-4 h-[3px] w-12 rounded-full bg-gold-500" />

                    {/* Grade-range caption */}
                    <p className="relative mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                      {GRADE_RANGE[locale][l.key]}
                    </p>
                  </header>

                  {/* Body — warm surface, hairline-separated categories */}
                  <div className="flex flex-1 flex-col bg-cream-soft/30 px-7 py-6">
                    {blocks
                      .filter((b) => b.body.length > 0)
                      .map((b, i) => (
                        <div
                          key={b.heading}
                          className={
                            i > 0
                              ? 'mt-5 border-t border-border-light/70 pt-5'
                              : ''
                          }
                        >
                          <div className="mb-2.5 flex items-center gap-2.5">
                            <span
                              aria-hidden
                              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                            />
                            <p className="text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-navy-900/85">
                              {b.heading}
                            </p>
                          </div>
                          <p className="whitespace-pre-line text-[14.5px] leading-[1.65] text-text-body">
                            {b.body}
                          </p>
                        </div>
                      ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>
      )}

      {/*
        "Бидний 10 соёл" хэсэг — Munkhchimeg-ийн хүсэлтээр Бага/Дунд/
        Ахлах сургуулийн онцлог-ийн доор шинээр нэмсэн. Картууд 5-аар
        2 эгнээ (lg-ээс дээш) болж байрлана; мобайлд 2 баганаар автомат
        wrap. Icon-ууд тогтмол дарааллаар (Handshake, Shirt, HeartPulse,
        ...) кодтой, label-уудыг админ SiteContent-аас засна.
      */}
      {cultureItems.length > 0 && (
        <Section background="white" spacing="md" id="culture">
          <div className="mx-auto max-w-6xl">
            {cultureTitle && (
              <div className="mb-10 text-center">
                <h2 className="font-serif text-3xl font-bold leading-tight text-navy-900 md:text-4xl">
                  {cultureTitle}
                </h2>
                <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-gold-500" />
                {cultureSubtitle && (
                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-text-body md:text-base">
                    {cultureSubtitle}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-5">
              {cultureItems.map((label, idx) => {
                const Icon = CULTURE_ICONS[idx] ?? Sparkles;
                return (
                  <div
                    key={`${idx}-${label.slice(0, 24)}`}
                    className="group flex flex-col items-center gap-3 rounded-card border border-border-light bg-white p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-card-hover"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900/5 text-[#2563eb] transition-colors group-hover:bg-gold-500/15 group-hover:text-gold-500">
                      <Icon className="h-7 w-7" strokeWidth={2} />
                    </span>
                    <p className="text-[13px] font-semibold leading-snug text-text-body">
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      )}

      {/* Japanese language detail */}
      <Section background="cream-soft" spacing="md" id="yapon-hel">
        <div className="mb-10">
          <Badge variant="gold" className="mb-3">
            {jpBadge}
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">
            {jpTitle}
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-body">
            {jpBody}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {jpLevels.map((l) => (
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
            {itBadge}
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">
            {itTitle}
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-body">
            {itBody}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {itTopics.map((t, idx) => {
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
        <SectionTitle title={resourcesTitle} align="left" />
        <div className="grid gap-5 md:grid-cols-3">
          {resources.map((x, idx) => {
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
