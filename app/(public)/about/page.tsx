import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  ABOUT_4_SECTIONS,
  HERO,
  MISSION_VISION_VALUES,
  SCHOOL_INFO,
} from '@/lib/content';
import { content, getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Сургуулийн тухай',
  description: SCHOOL_INFO.nameFull,
};

export default async function AboutPage() {
  const siteContent = await getSiteContentMap('about');

  const heroTitle1 = content(siteContent, 'about.hero.title.line1', 'СОЁЛ ЭРДЭМ');
  const heroTitle2 = content(siteContent, 'about.hero.title.line2', 'ДЭЭД СУРГУУЛЬ');
  const heroBody = content(siteContent, 'about.hero.body', HERO.body);
  const heroCtaLabel = content(siteContent, 'about.hero.cta_label', 'Бидний тухай дэлгэрэнгүй');
  const heroImage = content(
    siteContent,
    'about.hero.image',
    'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1600&q=80',
  );

  // Slogan (УРИА) is admin-editable via the site-content panel; the static
  // entry in `lib/content.ts` is the fallback.
  const sloganTitle = content(
    siteContent,
    'about.slogan.title',
    MISSION_VISION_VALUES.slogan.title,
  );
  const sloganText = content(
    siteContent,
    'about.slogan.text',
    MISSION_VISION_VALUES.slogan.text,
  );

  const mvv = [
    MISSION_VISION_VALUES.mission,
    MISSION_VISION_VALUES.vision,
    MISSION_VISION_VALUES.values,
    {
      ...MISSION_VISION_VALUES.slogan,
      title: sloganTitle,
      text: sloganText,
    },
  ];

  const dotPatternStyle = {
    backgroundImage:
      'radial-gradient(circle, rgba(30,58,95,0.18) 1.2px, transparent 1.2px)',
    backgroundSize: '16px 16px',
  } as const;

  return (
    <>
      {/* 1. Hero — split layout */}
      <section className="relative overflow-hidden bg-white">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-10 top-16 hidden h-40 w-40 opacity-60 md:block"
          style={dotPatternStyle}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-6 hidden h-28 w-28 opacity-50 md:block"
          style={dotPatternStyle}
        />
        <div className="container-custom relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[2fr_3fr] lg:gap-14">
          <div className="relative z-10 order-2 lg:order-1">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-text-muted"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1 transition-colors hover:text-navy-900"
              >
                <span>Нүүр</span>
              </Link>
              <ChevronRight className="h-4 w-4" aria-hidden />
              <span className="font-medium text-navy-900">Сургуулийн тухай</span>
            </nav>

            <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              {heroTitle1}
              <br />
              {heroTitle2}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-body">
              {heroBody}
            </p>

            <Link
              href="#about-sections"
              className="mt-8 inline-flex items-center gap-2 rounded-button bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:bg-gold-500 hover:text-navy-900"
            >
              {heroCtaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-image shadow-card-hover lg:aspect-[5/4]">
              <Image
                src={heroImage}
                alt="Соёл Эрдэм Их Сургуулийн барилга"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4 numbered cards */}
      <section id="about-sections" className="bg-white py-16 md:py-20">
        <div className="container-custom">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold-500" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
                Танилцуулга
              </span>
              <span className="h-px w-10 bg-gold-500" aria-hidden />
            </div>
            <h2 className="mt-4 text-h2 font-bold text-text-heading">
              СОЁЛ ЭРДЭМИЙН ЗАМНАЛ
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ABOUT_4_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.number}
                  href={section.href}
                  className="group relative flex h-full flex-col rounded-card border border-border-light bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy-900 hover:bg-navy-900 hover:shadow-card-hover"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="text-5xl font-bold leading-none text-gold-500">
                      {section.number}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-navy-900 transition-colors duration-300 group-hover:bg-gold-500/20 group-hover:text-gold-400">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="text-base font-bold leading-snug text-text-heading transition-colors duration-300 group-hover:text-white">
                    {section.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-body transition-colors duration-300 group-hover:text-white/80">
                    {section.text}
                  </p>

                  <span className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-navy-900 ring-1 ring-border-light transition-all duration-300 group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:ring-gold-500">
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Mission / Vision / Values / Slogan — four cards on a cream
          band so they read as a distinct chapter from the numbered cards
          above. Each card is a self-contained tile with the gold-accented
          icon as the anchor. */}
      <section className="relative overflow-hidden bg-cream-soft py-16 md:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 top-10 hidden h-48 w-48 opacity-50 lg:block"
          style={dotPatternStyle}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-10 hidden h-40 w-40 opacity-50 lg:block"
          style={dotPatternStyle}
        />
        <div className="container-custom relative">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold-500" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
                Бидний үнэт зүйлс
              </span>
              <span className="h-px w-10 bg-gold-500" aria-hidden />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {mvv.map((item) => {
              const Icon = item.icon;
              const isValues = item.title === 'ҮНЭТ ЗҮЙЛС';
              return (
                <article
                  key={item.title}
                  className="group flex h-full flex-col rounded-card border border-border-light bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-card-hover"
                >
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-500 ring-1 ring-gold-500/20 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-white">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-base font-bold uppercase tracking-wide text-navy-900">
                    {item.title}
                  </h3>
                  {isValues ? (
                    /* Hanging-indent acronym list — letter column on the
                       left, explanation on the right; wrapped text stays
                       aligned with the explanation, not under the letter. */
                    <ul className="mt-3 flex-1 space-y-2 text-sm leading-relaxed text-text-body">
                      {item.text.split('\n').map((line, idx) => {
                        const match = line.match(/^([А-ЯӨҮ])\s*[—–-]\s*(.+)$/);
                        if (!match) {
                          return (
                            <li key={`${item.title}-${idx}`}>{line}</li>
                          );
                        }
                        const [, letter, rest] = match;
                        return (
                          <li
                            key={`${item.title}-${idx}`}
                            className="flex gap-2"
                          >
                            <span className="w-4 shrink-0 font-bold text-navy-900">
                              {letter}
                            </span>
                            <span className="shrink-0 text-text-muted">—</span>
                            <span className="min-w-0 flex-1">{rest}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-text-body">
                      {item.text}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
