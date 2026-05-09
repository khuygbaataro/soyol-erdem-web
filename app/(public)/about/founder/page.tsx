import { Quote } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { FOUNDER_MESSAGE, SCHOOL_INFO } from '@/lib/content';

export const metadata = {
  title: 'Үүсгэн байгуулагч',
};

export default function FounderPage() {
  return (
    <>
      <PageHero
        title="Үүсгэн байгуулагч"
        subtitle={`${SCHOOL_INFO.founder} — ${SCHOOL_INFO.founderTitle}.`}
        breadcrumb={[
          { label: 'Нүүр', href: '/' },
          { label: 'Сургуулийн тухай', href: '/about' },
          { label: 'Үүсгэн байгуулагч' },
        ]}
      />

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <Card className="h-fit text-center" hover={false}>
            <ImagePlaceholder
              aspect="aspect-square"
              label="Макихара Соичийн зураг"
              className="mb-5"
            />
            <p className="text-lg font-semibold text-navy-900">
              {SCHOOL_INFO.founder}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              {SCHOOL_INFO.founderTitle}
            </p>
          </Card>

          <article className="relative">
            <Quote className="absolute -top-2 left-0 h-12 w-12 text-gold-500/30" />
            <div className="space-y-5 pt-10 text-base leading-relaxed text-text-body">
              {FOUNDER_MESSAGE.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <p className="pt-3 text-sm font-semibold text-navy-900">
                — {SCHOOL_INFO.founder}, {SCHOOL_INFO.founderTitle}
              </p>
            </div>
          </article>
        </div>
      </Section>

      <CtaBanner
        title="Сургуулийн түүхтэй танилц"
        ctaLabel="Бүтэц зохион байгуулалт"
        ctaHref="/about/structure"
        secondary={{ label: 'Захирлын мэндчилгээ', href: '/about/director-message' }}
      />
    </>
  );
}
