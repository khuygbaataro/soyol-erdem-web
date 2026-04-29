import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  ABOUT_4_SECTIONS,
  HERO,
  MISSION_VISION_VALUES,
  SCHOOL_INFO,
  STATS,
} from '@/lib/content';

export const metadata = {
  title: 'Сургуулийн тухай',
  description: SCHOOL_INFO.nameFull,
};

export default function AboutPage() {
  const mvv = [
    MISSION_VISION_VALUES.mission,
    MISSION_VISION_VALUES.vision,
    MISSION_VISION_VALUES.values,
  ];

  const dotPatternStyle = {
    backgroundImage:
      'radial-gradient(circle, rgba(212,162,76,0.45) 1.2px, transparent 1.2px)',
    backgroundSize: '14px 14px',
  } as const;

  return (
    <>
      {/* 1. Hero — split layout */}
      <section className="relative overflow-hidden bg-cream-soft">
        <span
          aria-hidden
          className="pointer-events-none absolute right-6 top-6 hidden h-32 w-32 opacity-70 md:block"
          style={dotPatternStyle}
        />
        <div className="container-custom relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[2fr_3fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-text-muted"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1 transition-colors hover:text-navy-900"
              >
                <span aria-hidden>🏠</span>
                <span>Нүүр</span>
              </Link>
              <ChevronRight className="h-4 w-4" aria-hidden />
              <span className="font-medium text-navy-900">Сургуулийн тухай</span>
            </nav>

            <h1 className="mt-5 text-[2.75rem] font-bold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-[4.25rem]">
              СОЁЛ-ЭРДЭМ
              <br />
              ИХ СУРГУУЛЬ
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-body">
              {HERO.body}
            </p>

            <Link
              href="#about-sections"
              className="mt-8 inline-flex items-center gap-2 rounded-button bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:bg-gold-500 hover:text-navy-900"
            >
              Бидний тухай дэлгэрэнгүй
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="relative order-1 lg:order-2">
            <div
              className="absolute inset-y-0 left-0 z-10 hidden w-1/3 lg:block"
              style={{
                background:
                  'linear-gradient(to right, #FAF7F1 0%, rgba(250,247,241,0.6) 55%, rgba(250,247,241,0) 100%)',
              }}
              aria-hidden
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-image bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 shadow-card-hover">
              <span
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(245,220,160,0.5) 1.4px, transparent 1.4px)',
                  backgroundSize: '22px 22px',
                }}
              />
              <span
                aria-hidden
                className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl"
              />
              <span
                aria-hidden
                className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-navy-700/40 blur-3xl"
              />
              <div className="relative flex h-full flex-col items-center justify-center px-8 text-center text-white">
                <Image
                  src="/logo.png"
                  alt="Соёл-Эрдэм Их Сургуулийн лого"
                  width={140}
                  height={140}
                  className="h-28 w-28 rounded-full bg-white/95 p-3 shadow-card-hover sm:h-32 sm:w-32"
                  loading="lazy"
                />
                <p className="mt-6 font-serif text-xl italic text-gold-300">
                  {HERO.italicAccent}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/70">
                  est. {SCHOOL_INFO.founded}
                </p>
              </div>
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
              МАНАЙ СУРГУУЛИЙН ТҮҮХТЭЙ ДЭЛГЭРЭНГҮЙ ТАНИЛЦАХ 4 ХЭСЭГ
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

                  <span className="mt-6 inline-flex h-8 w-8 items-center justify-center rounded-full text-navy-900 transition-all duration-300 group-hover:bg-gold-500/15 group-hover:text-gold-400">
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Stats band */}
      <section className="bg-navy-900 py-12 md:py-14">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-4 md:justify-center"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-gold-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-3xl font-bold text-gold-400 md:text-4xl">
                      {s.number}
                    </div>
                    <div className="mt-1 text-sm text-white/85">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Mission / Vision / Values */}
      <section className="bg-cream-soft py-16 md:py-20">
        <div className="container-custom">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold-500" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
                Бидний үнэ цэнэ
              </span>
              <span className="h-px w-10 bg-gold-500" aria-hidden />
            </div>
            <h2 className="mt-4 text-h2 font-bold text-text-heading">
              ЭРХЭМ ЗОРИЛГО, АЛСЫН ХАРАА, ҮНЭТ ЗҮЙЛС
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {mvv.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center px-2 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold tracking-wide text-navy-900">
                    {item.title}
                  </h3>
                  <span
                    className="mt-3 h-px w-10 bg-gold-500"
                    aria-hidden
                  />
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-body">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
