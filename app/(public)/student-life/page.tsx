import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { QuoteCard } from '@/components/ui/QuoteCard';
import { CtaBanner } from '@/components/sections/CtaBanner';
import {
  STUDENT_EVENTS,
  STUDENT_LIFE_CARDS,
  TESTIMONIALS,
} from '@/lib/content';

export const metadata = {
  title: 'Оюутны амьдрал',
};

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        title="ОЮУТНЫ АМЬДРАЛ"
        subtitle="Бид бол гэр бүл — Соёл Эрдэмд хичээл бол зөвхөн зургаан жилийн нэг хэсэг."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Оюутны амьдрал' }]}
      />

      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">
            Соёл Эрдэмд оюутан байх нь зөвхөн хичээл биш — энэ бол гэр бүл,
            найзууд, шинэ туршлага, амьдралын чухал үе юм. Бид клуб, спорт,
            соёлын арга хэмжээ, дотуур байр, ажил мэргэжлийн зөвлөгөө гээд бүх
            талаар дэмжлэг үзүүлдэг.
          </p>
        </div>
      </Section>

      <Section background="cream-soft">
        <SectionTitle title="ОЮУТНЫ АМЬДРАЛЫН ОНЦЛОГ" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STUDENT_LIFE_CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-border-light bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-soft">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-bold text-navy-900">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-text-body">
                    {c.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-gold-500"
                  >
                    Дэлгэрэнгүй
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section background="white">
        <SectionTitle title="ЖИЛ БҮРИЙН АРГА ХЭМЖЭЭ" align="left" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STUDENT_EVENTS.map((e, idx) => (
            <Card key={e} className="flex h-full flex-col gap-3">
              <span className="text-3xl font-bold text-gold-500">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="text-sm font-semibold text-navy-900">{e}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="cream">
        <SectionTitle title="ОЮУТНУУДЫН ҮГ" />
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <QuoteCard
              key={t.name}
              quote={t.quote}
              name={t.name}
              age={t.age}
              program={t.program}
            />
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Манай гэр бүлд нэгдээрэй"
        ctaLabel="Элсэх"
        ctaHref="/admission"
      />
    </>
  );
}
