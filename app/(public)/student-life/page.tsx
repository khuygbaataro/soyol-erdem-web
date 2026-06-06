import {
  Award,
  BookOpen,
  Briefcase,
  Check,
  Download,
  FileText,
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
import { AnnualEventSlideshow } from '@/components/sections/AnnualEventSlideshow';
import { getSiteContentMap } from '@/lib/site-content';
import { STUDENT_LIFE_CHAPTERS, type StudentChapter } from '@/lib/content';
import { cn } from '@/lib/utils';
import { getServerLocale } from '@/lib/i18n/server';
import { STUDENT_LIFE_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Оюутны амьдрал',
};

const SUB_NAV_ICONS = {
  bunkyosai: Music,
  sport: Footprints,
  'shiliin-bulag': Briefcase,
  dormitory: Home,
  volunteer: HandHeart,
  research: Microscope,
  scholarship: Award,
  'student-council': Users,
  graduates: GraduationCap,
} as const;

// Sub-nav ordering — must match STUDENT_LIFE_CONTENT[locale].subNav.
const SUB_NAV_IDS: (keyof typeof SUB_NAV_ICONS)[] = [
  'bunkyosai',
  'sport',
  'shiliin-bulag',
  'dormitory',
  'volunteer',
  'research',
  'scholarship',
  'student-council',
  'graduates',
];

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

function ChapterSection({
  chapter,
  images,
  caption,
}: {
  chapter: StudentChapter;
  images: string[];
  caption: string;
}) {
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

        {images.length > 0 && (
          <div className="mb-6">
            <AnnualEventSlideshow
              images={images}
              label={chapter.heading}
              aspectClassName="aspect-[16/9]"
              caption={caption}
            />
          </div>
        )}

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
  const [banners, sl, locale] = await Promise.all([
    getSiteContentMap('banners'),
    getSiteContentMap('student-life'),
    getServerLocale(),
  ]);
  const c = STUDENT_LIFE_CONTENT[locale];
  // SiteContent now resolves to valueEn / valueJa automatically for
  // EN / JP visitors (or returns '' when the admin hasn't filled the
  // translation, in which case the page falls back to the bundle).
  // So admin EN / JP edits now flow through for testimonials, hero
  // copy, etc. — and missing translations still surface the polished
  // hand-written bundle text.

  // Build the translated chapter list by joining STUDENT_LIFE_CHAPTERS
  // (canonical order + the static fallback) with the localised bundle
  // keyed by id.
  const chapters: StudentChapter[] = STUDENT_LIFE_CHAPTERS.map((chap) => {
    const tr = c.chapters.find((x) => x.id === chap.id);
    if (!tr) return chap;
    return {
      ...chap,
      heading: tr.heading,
      lead: tr.lead,
      bullets: tr.bullets ?? chap.bullets,
      body: tr.body ?? chap.body,
    };
  });

  const annual = [1, 2, 3, 4]
    .map((i) => {
      const title = sl.get(`student-life.annual.${i}.title`) || '';
      const images = [1, 2, 3, 4]
        .map((j) => sl.get(`student-life.annual.${i}.image.${j}`) || '')
        .filter((url) => url.trim().length > 0);
      const caption = sl.get(`student-life.annual.${i}.caption`) || '';
      return { title, images, caption };
    })
    .filter((a) => a.title.trim().length > 0);

  // Per-chapter images + caption — admin-managed via the
  // `student-life.chapter.{id}.image.{1..4}` and `.caption` site-content keys.
  // Media is language-agnostic so we read it for every locale.
  const chapterMedia = new Map<string, { images: string[]; caption: string }>(
    STUDENT_LIFE_CHAPTERS.map((chap) => {
      const images = [1, 2, 3, 4]
        .map((j) => sl.get(`student-life.chapter.${chap.id}.image.${j}`) || '')
        .filter((url) => url.trim().length > 0);
      const caption = sl.get(`student-life.chapter.${chap.id}.caption`) || '';
      return [chap.id, { images, caption }];
    }),
  );

  type Testimonial = {
    quote: string;
    name: string;
    age: number | undefined;
    program: string | undefined;
    photo: string | undefined;
  };

  // Admin-uploaded testimonials. For non-MN visitors the quote / byline
  // come from `valueEn` / `valueJa` (or empty if untranslated); empty
  // quotes are filtered out below so the page falls back to the
  // localised testimonial bundle.
  const adminTestimonials: Testimonial[] = [1, 2, 3]
    .map((i): Testimonial | null => {
      const quote = sl.get(`student-life.testimonial.${i}.quote`) || '';
      const byline = sl.get(`student-life.testimonial.${i}.byline`) || '';
      const photo = sl.get(`student-life.testimonial.${i}.photo`) || '';
      return quote && byline
        ? {
            quote,
            ...parseTestimonialByline(byline),
            photo: photo.trim().length > 0 ? photo : undefined,
          }
        : null;
    })
    .filter((t): t is Testimonial => t !== null);

  const localisedTestimonials: Testimonial[] = c.testimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    age: t.age,
    program: t.program,
    photo: undefined,
  }));

  const testimonials =
    adminTestimonials.length > 0 ? adminTestimonials : localisedTestimonials;

  // Hero + intro. The map now returns the locale-appropriate value
  // (or empty when untranslated), so a single fallback chain works
  // for every locale.
  const heroTitle = sl.get('student-life.hero.title') || c.heroTitle;
  const heroSubtitle = sl.get('student-life.hero.subtitle') || c.heroSubtitle;
  const introBody = sl.get('student-life.intro.body') || c.intro;
  const annualHeading = sl.get('student-life.annual.heading') || c.annualHeading;
  const testimonialHeading =
    sl.get('student-life.testimonial.heading') || c.testimonialHeading;

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={banners.get('page.student-life.banner') || undefined}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="whitespace-pre-line text-base leading-relaxed text-text-body">
            {introBody}
          </p>
        </div>
      </Section>

      {/* Оюутны гарын авлага — PDF flipbook reader */}
      {(() => {
        const pdfUrl = sl.get('student-life.handbook.fileUrl') || '';
        return (
          <Section background="cream-soft" spacing="sm">
            <div className="mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-card border border-border-light bg-gradient-to-br from-white to-cream-soft shadow-card">
                <div className="grid gap-6 p-7 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 md:p-8">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-900 text-gold-400 ring-2 ring-gold-500/30">
                    <FileText className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-xl font-bold text-navy-900 md:text-2xl">
                      {c.handbookTitle}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-text-body md:text-[15px]">
                      {c.handbookSubtitle}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    {pdfUrl && (
                      <a
                        href="/student-handbook"
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex h-12 items-center justify-center gap-2 rounded-button bg-navy-900 px-6 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-gold-500 hover:text-navy-900 md:h-14 md:px-8"
                      >
                        <BookOpen className="h-4 w-4 transition-transform group-hover:scale-110" />
                        Нээж унших
                      </a>
                    )}
                    <a
                      href={pdfUrl || '/handbooks/student-handbook.docx'}
                      download={pdfUrl ? 'Оюутны гарын авлага.pdf' : 'Оюутны гарын авлага.docx'}
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-button border border-navy-900/30 bg-white px-6 text-sm font-bold uppercase tracking-[0.06em] text-navy-900 shadow-card transition-all hover:-translate-y-0.5 hover:bg-cream-soft md:h-14 md:px-8"
                    >
                      <Download className="h-4 w-4 transition-transform group-hover:scale-110" />
                      {c.handbookCta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        );
      })()}

      {/* Sub-nav — sticky chip strip with quick anchors */}
      <div className="sticky top-20 z-30 border-y border-border-light bg-white/95 backdrop-blur">
        <div className="container-custom flex flex-nowrap items-center gap-2 overflow-x-auto py-3">
          {SUB_NAV_IDS.map((id) => {
            const Icon = SUB_NAV_ICONS[id];
            return (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-light bg-white px-3 py-1.5 text-xs font-semibold text-text-body',
                  'transition-colors hover:border-navy-900 hover:text-navy-900',
                )}
              >
                <Icon className="h-3 w-3" />
                {c.subNav[id]}
              </a>
            );
          })}
        </div>
      </div>

      {/* All chapters in editor order */}
      {chapters.map((chap) => {
        const m = chapterMedia.get(chap.id) ?? { images: [], caption: '' };
        return (
          <div key={chap.id}>
            <ChapterSection chapter={chap} images={m.images} caption={m.caption} />
            {/* Bunkyosai gets a special grade-by-grade activity strip. */}
            {chap.id === 'bunkyosai' && (
              <Section background={CREAM_IDS.has(chap.id) ? 'cream-soft' : 'white'} spacing="sm">
                <div className="mx-auto max-w-4xl">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {c.bunkyosaiActs.map((g, idx) => (
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
                </div>
              </Section>
            )}
          </div>
        );
      })}

      {/* Annual highlights row */}
      {annual.length > 0 && (
        <Section background="white">
          <SectionTitle title={annualHeading} align="left" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {annual.map((a, idx) => (
              <Card
                key={`${a.title}-${idx}`}
                className="flex h-full flex-col gap-3"
              >
                <span className="text-3xl font-bold text-gold-500">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-sm font-semibold text-navy-900">{a.title}</p>
                {a.images.length > 0 && (
                  <AnnualEventSlideshow
                    images={a.images}
                    label={a.title}
                    caption={a.caption}
                  />
                )}
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Testimonials */}
      <Section background="cream">
        <SectionTitle title={testimonialHeading} />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <QuoteCard
              key={`${t.name}-${idx}`}
              quote={t.quote}
              name={t.name}
              age={t.age}
              program={t.program}
              photo={t.photo}
            />
          ))}
        </div>
      </Section>

    </>
  );
}
