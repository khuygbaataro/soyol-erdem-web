import { Quote } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { DIRECTOR_MESSAGE, SCHOOL_INFO } from '@/lib/content';

export const metadata = {
  title: 'Захирлын мэндчилгээ',
};

export default function DirectorMessagePage() {
  return (
    <>
      <PageHero
        title="Захирлын мэндчилгээ"
        subtitle={`${SCHOOL_INFO.directorTitle}-аас та бүхэнд илгээх захидал.`}
        breadcrumb={[
          { label: 'Нүүр', href: '/' },
          { label: 'Сургуулийн тухай', href: '/about' },
          { label: 'Захирлын мэндчилгээ' },
        ]}
      />

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <Card className="h-fit text-center" hover={false}>
            <ImagePlaceholder
              aspect="aspect-square"
              label="Захирлын зураг"
              className="mb-5"
            />
            <p className="text-lg font-semibold text-navy-900">{SCHOOL_INFO.director}</p>
            <p className="mt-1 text-sm text-text-muted">
              {SCHOOL_INFO.directorTitle}
            </p>
            <div className="mt-5 space-y-2 text-left text-xs text-text-body">
              <p>
                <strong className="text-navy-900">Боловсрол:</strong>{' '}
                {SCHOOL_INFO.directorEducation}
              </p>
              <p>
                <strong className="text-navy-900">Зэрэг:</strong>{' '}
                {SCHOOL_INFO.directorDegree}
              </p>
            </div>
          </Card>

          <article className="relative">
            <Quote className="absolute -top-2 left-0 h-12 w-12 text-gold-500/30" />
            <div className="space-y-5 pt-10 text-base leading-relaxed text-text-body">
              {DIRECTOR_MESSAGE.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <p className="pt-3 text-sm font-semibold text-navy-900">
                — {SCHOOL_INFO.director}, Захирал
              </p>
            </div>
          </article>
        </div>
      </Section>

      <CtaBanner
        title="Бидэнд нэгдээрэй"
        ctaLabel="Элсэх"
        ctaHref="/admission"
        secondary={{ label: 'Бидэнтэй холбогдох', href: '/contact' }}
      />
    </>
  );
}
