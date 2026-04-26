import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { NumberedCard } from '@/components/ui/NumberedCard';
import { StatBlock } from '@/components/ui/StatBlock';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import {
  ABOUT_4_SECTIONS,
  HERO,
  MISSION_VISION_VALUES,
  SCHOOL_INFO,
  STATS,
  TIMELINE,
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

  return (
    <>
      {/* 1. Hero — split */}
      <section className="bg-cream-soft py-16 md:py-24">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <Breadcrumb
              items={[{ label: 'Нүүр', href: '/' }, { label: 'Сургуулийн тухай' }]}
              className="mb-4"
            />
            <Badge variant="gold" className="mb-5">
              Үүсгэн байгуулагдсан {SCHOOL_INFO.founded}
            </Badge>
            <h1 className="text-h1 font-bold text-navy-900">
              СОЁЛ-ЭРДЭМ
              <br />
              ИХ СУРГУУЛЬ
            </h1>
            <p className="mt-6 text-base leading-relaxed text-text-body">
              {HERO.body}
            </p>
            <div className="mt-7">
              <Button href="/about/director-message" variant="primary" size="md">
                Захирлын мэндчилгээ
              </Button>
            </div>
          </div>
          <ImagePlaceholder label="Барилгын зураг" aspect="aspect-[4/5]" className="hidden lg:block" />
        </div>
      </section>

      {/* 2. 4 Numbered cards */}
      <Section background="white">
        <SectionTitle
          title="МАНАЙ СУРГУУЛИЙГ ДЭЛГЭРЭНГҮЙ ТАНИЛЦАХ 4 ХЭСЭГ"
          subtitle="Сургуулийн үүсэл, удирдлага, бүтэц, чанарын баталгааны талаар."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ABOUT_4_SECTIONS.map((s) => (
            <NumberedCard
              key={s.number}
              number={s.number}
              title={s.title}
              description={s.text}
              icon={s.icon}
              isActive={s.isActive}
              href={s.href}
            />
          ))}
        </div>
      </Section>

      {/* 3. Stats band */}
      <Section background="navy" spacing="md">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s) => (
            <StatBlock key={s.label} icon={s.icon} number={s.number} label={s.label} />
          ))}
        </div>
      </Section>

      {/* 4. Mission / Vision / Values */}
      <Section background="cream-soft">
        <SectionTitle
          title="ЭРХЭМ ЗОРИЛГО, АЛСЫН ХАРАА, ҮНЭТ ЗҮЙЛС"
          subtitle="Соёл-Эрдэмийн үнэт зүйлс — С-Э-А-С томъёолол."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {mvv.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="flex h-full flex-col">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-body">
                  {item.text}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 5. Timeline */}
      <Section background="white">
        <SectionTitle
          title="МАНАЙ СУРГУУЛИЙН ТҮҮХ"
          subtitle="1993 оноос өнөөг хүртэл — 32 жилийн аялал."
        />
        <div className="relative mx-auto max-w-3xl">
          <span className="absolute left-4 top-0 h-full w-0.5 bg-border-light md:left-1/2 md:-ml-px" />
          {TIMELINE.map((t, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={t.year}
                className={`relative mb-8 flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-8 ${
                  isLeft ? '' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex w-full items-center md:w-1/2 md:justify-end">
                  <div className={`ml-12 md:ml-0 ${isLeft ? 'md:text-right' : 'md:text-left'} md:px-6`}>
                    <span className="inline-block text-2xl font-bold text-gold-500">
                      {t.year}
                    </span>
                    <h4 className="mt-1 text-base font-semibold text-navy-900">
                      {t.title}
                    </h4>
                    <p className="mt-2 text-sm text-text-body">{t.description}</p>
                  </div>
                </div>
                <span className="absolute left-4 top-1.5 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-gold-500 md:left-1/2" />
                <div className="hidden w-1/2 md:block" />
              </div>
            );
          })}
        </div>
      </Section>

      {/* 6. CTA */}
      <CtaBanner
        title="Манайд элсээрэй"
        subtitle="32 жилийн туршлагатай сургуулийн нэг хэсэг бол."
        ctaLabel="Элсэлтийн мэдээлэл"
        ctaHref="/admission"
      />
    </>
  );
}
