import {
  Award,
  BookOpen,
  Briefcase,
  Check,
  Footprints,
  GraduationCap,
  HandHeart,
  Heart,
  Home,
  Microscope,
  Music,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { QuoteCard } from '@/components/ui/QuoteCard';
import { getSiteContentMap } from '@/lib/site-content';
import {
  BUNKYOSAI_GRADE_ACTS,
  STUDENT_LIFE_CHAPTERS,
  TESTIMONIALS,
  type StudentChapter,
} from '@/lib/content';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Оюутны амьдрал',
};

const SUB_NAV = [
  { id: 'bunkyosai', label: 'Бүнкёосай', icon: Music },
  { id: 'sport', label: 'Спорт, аялал', icon: Footprints },
  { id: 'shiliin-bulag', label: 'Дадлага', icon: Briefcase },
  { id: 'dormitory', label: 'Дотуур байр', icon: Home },
  { id: 'volunteer', label: 'Сайн үйлс', icon: HandHeart },
  { id: 'research', label: 'Эрдэм шинжилгээ', icon: Microscope },
  { id: 'scholarship', label: 'Тэтгэлэг', icon: Award },
  { id: 'student-council', label: 'Оюутны зөвлөл', icon: Users },
  { id: 'graduates', label: 'Төгсөгчид', icon: GraduationCap },
] as const;

// Per-chapter accent icon shown beside the heading.
const CHAPTER_ICON: Record<string, typeof BookOpen> = {
  bunkyosai: Music,
  sport: Footprints,
  'shiliin-bulag': Briefcase,
  'hippo-family': Heart,
  dormitory: Home,
  volunteer: HandHeart,
  research: Microscope,
  scholarship: Award,
  'student-council': Users,
  graduates: GraduationCap,
  'japan-dance': Sparkles,
  'rural-program': UserCheck,
};

// Sections that get the cream-soft band, alternating with white.
const CREAM_IDS = new Set([
  'sport',
  'hippo-family',
  'volunteer',
  'scholarship',
  'graduates',
  'japan-dance',
]);

function ChapterSection({ chapter }: { chapter: StudentChapter }) {
  const Icon = CHAPTER_ICON[chapter.id] ?? BookOpen;
  const onCream = CREAM_IDS.has(chapter.id);
  return (
    <Section background={onCream ? 'cream-soft' : 'white'} id={chapter.id}>
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500 ring-1 ring-gold-500/30">
            <Icon className="h-5 w-5" />
          </span>
          <h2 className="font-serif text-2xl font-bold leading-tight text-navy-900 md:text-[1.75rem]">
            {chapter.heading}
          </h2>
        </header>

        <p className="text-base leading-relaxed text-text-body">
          {chapter.lead}
        </p>

        {chapter.bullets && chapter.bullets.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {chapter.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-text-body">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Check className="h-3 w-3" />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {chapter.body && (
          <p className="mt-5 text-base leading-relaxed text-text-body">
            {chapter.body}
          </p>
        )}

        {/* Bunkyosai gets a special grade-by-grade activity strip. */}
        {chapter.id === 'bunkyosai' && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BUNKYOSAI_GRADE_ACTS.map((g, idx) => (
              <div
                key={g.grade}
                className="flex h-full flex-col gap-2 rounded-card border border-border-light bg-white p-5 shadow-card"
              >
                <span className="text-2xl font-bold leading-none text-gold-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-navy-900">
                  {g.grade}
                </p>
                <p className="text-sm leading-relaxed text-text-body">{g.act}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}

/** Parses "Далантай · 21 · Япон хэлний орчуулагч анги" into QuoteCard props. */
function parseTestimonialByline(line: string) {
  const parts = line.split(/\s*·\s*/).filter(Boolean);
  const name = parts[0] ?? '';
  // Second segment is the age (number) if it parses; otherwise treat as program.
  const ageNum = parts[1] ? Number(parts[1].replace(/[^\d]/g, '')) : NaN;
  const age = Number.isFinite(ageNum) && ageNum > 0 ? ageNum : undefined;
  const program = age !== undefined ? parts.slice(2).join(' · ') : parts.slice(1).join(' · ');
  return { name, age, program: program || undefined };
}

export default async function StudentLifePage() {
  // Build a quick map for sub-nav-driven jumps; chapters are rendered in
  // their natural order from STUDENT_LIFE_CHAPTERS.
  const [banners, sl] = await Promise.all([
    getSiteContentMap('banners'),
    getSiteContentMap('student-life'),
  ]);

  const annual = [1, 2, 3, 4]
    .map((i) => sl.get(`student-life.annual.${i}.title`) || '')
    .filter((t) => t.trim().length > 0);

  const testimonials = [1, 2, 3]
    .map((i) => {
      const quote = sl.get(`student-life.testimonial.${i}.quote`) || '';
      const byline = sl.get(`student-life.testimonial.${i}.byline`) || '';
      return quote && byline
        ? { quote, ...parseTestimonialByline(byline) }
        : null;
    })
    .filter((t): t is { quote: string; name: string; age?: number; program?: string } => t !== null);

  // Fall back to static defaults from lib/content.ts only when admin has not
  // filled the SiteContent rows.
  const fallbackTestimonials = TESTIMONIALS.map((t) => ({
    quote: t.quote,
    name: t.name,
    age: t.age,
    program: t.program,
  }));

  return (
    <>
      <PageHero
        title={sl.get('student-life.hero.title') || 'ОЮУТНЫ АМЬДРАЛ'}
        subtitle={
          sl.get('student-life.hero.subtitle') ||
          'Бид бол гэр бүл — Соёл Эрдэмд хичээл бол зөвхөн зургаан жилийн нэг хэсэг.'
        }
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Оюутны амьдрал' }]}
        backgroundImage={banners.get('page.student-life.banner') || undefined}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="whitespace-pre-line text-base leading-relaxed text-text-body">
            {sl.get('student-life.intro.body') ||
              'Соёл Эрдэмд оюутан байх нь зөвхөн хичээл биш — энэ бол гэр бүл, найзууд, шинэ туршлага, амьдралын чухал үе юм. Бид клуб, спорт, соёлын арга хэмжээ, дадлага, дотуур байр, тэтгэлэг гээд бүх талаар дэмжлэг үзүүлдэг.'}
          </p>
        </div>
      </Section>

      {/* Sub-nav — sticky chip strip with quick anchors */}
      <div className="sticky top-20 z-30 border-y border-border-light bg-white/95 backdrop-blur">
        <div className="container-custom flex flex-nowrap items-center gap-2 overflow-x-auto py-3">
          {SUB_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-light bg-white px-3 py-1.5 text-xs font-semibold text-text-body',
                  'transition-colors hover:border-navy-900 hover:text-navy-900',
                )}
              >
                <Icon className="h-3 w-3" />
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* All chapters in editor order */}
      {STUDENT_LIFE_CHAPTERS.map((c) => (
        <ChapterSection key={c.id} chapter={c} />
      ))}

      {/* Annual highlights row */}
      {annual.length > 0 && (
        <Section background="white">
          <SectionTitle
            title={
              sl.get('student-life.annual.heading') ||
              'ЖИЛ БҮРИЙН ОНЦЛОХ АРГА ХЭМЖЭЭ'
            }
            align="left"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {annual.map((title, idx) => (
              <Card key={`${title}-${idx}`} className="flex h-full flex-col gap-3">
                <span className="text-3xl font-bold text-gold-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-sm font-semibold text-navy-900">{title}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Testimonials */}
      <Section background="cream">
        <SectionTitle
          title={sl.get('student-life.testimonial.heading') || 'ОЮУТНУУДЫН ҮГ'}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {(testimonials.length > 0 ? testimonials : fallbackTestimonials).map(
            (t, idx) => (
              <QuoteCard
                key={`${t.name}-${idx}`}
                quote={t.quote}
                name={t.name}
                age={t.age}
                program={t.program}
              />
            ),
          )}
        </div>
      </Section>

    </>
  );
}
