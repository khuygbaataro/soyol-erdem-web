import { Check, Mail, Phone } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { TimelineStep } from '@/components/ui/TimelineStep';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import {
  ADMISSION_FAQ,
  ADMISSION_REGULATION,
  ADMISSION_REQUIREMENTS,
  ADMISSION_STEPS,
  CONTACT_INFO,
  SCHOLARSHIPS,
} from '@/lib/content';

export const metadata = {
  title: 'Элсэлт',
  description: '2025-2026 оны хичээлийн жилийн элсэлтийн мэдээлэл.',
};

export default function AdmissionPage() {
  const infoCards = [
    {
      title: 'ЭЛСЭЛТИЙН МЭДЭЭЛЭЛ',
      description: '2025-2026 оны хичээлийн жилийн элсэлтийн мэдээлэл.',
      ctaLabel: 'Дэлгэрэнгүй',
      ctaHref: '#requirements',
      featured: true,
    },
    {
      title: 'ТЭТГЭЛЭГ',
      description: 'Шилдэг оюутнуудад тэтгэлэг олгоно.',
      ctaLabel: 'Дэлгэрэнгүй',
      ctaHref: '#scholarship',
      featured: false,
    },
    {
      title: 'ТӨЛБӨР, ХӨНГӨЛӨЛТ',
      description: 'Сургалтын төлбөр болон төлбөрийн нөхцөл.',
      ctaLabel: 'Дэлгэрэнгүй',
      ctaHref: '#faq',
      featured: false,
    },
  ];

  return (
    <>
      <PageHero
        title="ЭЛСЭЛТ"
        subtitle="Ирээдүйгээ эндээс эхэл."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Элсэлт' }]}
      />

      {/* Steps */}
      <Section background="white">
        <SectionTitle
          title="ЭЛСЭЛТИЙН АЛХАМ"
          subtitle="5 алхамт энгийн процесс."
        />
        <div className="hidden items-start justify-between gap-2 lg:flex">
          {ADMISSION_STEPS.map((s, idx) => (
            <TimelineStep
              key={s.number}
              number={s.number}
              title={s.title}
              description={s.description}
              isActive={idx === 0}
              isLast={idx === ADMISSION_STEPS.length - 1}
            />
          ))}
        </div>
        <div className="space-y-4 lg:hidden">
          {ADMISSION_STEPS.map((s) => (
            <Card key={s.number} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 text-base font-bold text-navy-900">
                {s.number}
              </span>
              <div>
                <h4 className="font-semibold text-navy-900">{s.title}</h4>
                <p className="mt-1 text-sm text-text-body">{s.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Info cards */}
      <Section background="cream-soft">
        <div className="grid gap-6 md:grid-cols-3">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className={`flex h-full flex-col rounded-card border p-7 shadow-card ${
                card.featured
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-border-light bg-white'
              }`}
            >
              <h3
                className={`text-base font-bold uppercase tracking-wider ${
                  card.featured ? 'text-gold-400' : 'text-navy-900'
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`mt-3 text-sm ${
                  card.featured ? 'text-white/80' : 'text-text-body'
                }`}
              >
                {card.description}
              </p>
              <div className="mt-auto pt-6">
                <Button
                  href={card.ctaHref}
                  variant={card.featured ? 'accent' : 'outline'}
                  size="sm"
                >
                  {card.ctaLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Requirements */}
      <Section background="white" id="requirements">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="text-h2 font-bold text-navy-900">
              Элсэгчдэд тавигдах нийтлэг шаардлага
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
            <ul className="mt-6 space-y-3">
              {ADMISSION_REQUIREMENTS.map((req) => (
                <li key={req} className="flex items-start gap-3 text-text-body">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <Card hover={false}>
            <Badge variant="navy" className="mb-3">
              Журам
            </Badge>
            <p className="text-sm leading-relaxed text-text-body">
              {ADMISSION_REGULATION}
            </p>
            <div className="mt-5">
              <Button href="/contact" variant="outline" size="sm">
                Дэлгэрэнгүй лавлах
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* Scholarships */}
      <Section background="cream-soft" id="scholarship">
        <SectionTitle
          title="ТЭТГЭЛЭГИЙН БОЛОМЖУУД"
          subtitle="Шилдэг сурлагатай элсэгчид болон тусгай ангиллын элсэгчдэд зориулсан."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SCHOLARSHIPS.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-text-body">
                  {s.description}
                </p>
                <a
                  href="#faq"
                  className="mt-4 text-sm font-semibold text-navy-900 hover:text-gold-500"
                >
                  Дэлгэрэнгүй →
                </a>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white" id="faq">
        <SectionTitle title="Тогтмол асуултууд" />
        <div className="mx-auto max-w-2xl">
          <Accordion items={ADMISSION_FAQ} />
        </div>
      </Section>

      {/* CTA */}
      <Section background="navy" spacing="md">
        <div className="text-center">
          <h2 className="text-h2 font-bold text-white">Бэлэн үү?</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Манай элсэлтийн алба руу хандана уу.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={`tel:${CONTACT_INFO.phones[0].number.replace('-', '')}`}
              variant="accent"
              size="lg"
              icon={<Phone className="h-5 w-5" />}
              iconPosition="left"
            >
              {CONTACT_INFO.phones[0].number}
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              icon={<Mail className="h-5 w-5" />}
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-navy-900"
            >
              Холбоо барих
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
