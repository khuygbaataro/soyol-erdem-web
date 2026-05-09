import { ArrowRight, Check, FileText, Globe, Mail, Phone, Wallet } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { TimelineStep } from '@/components/ui/TimelineStep';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import {
  ADMISSION_FAQ,
  ADMISSION_PROGRAMS,
  ADMISSION_REQUIREMENTS,
  ADMISSION_STEPS,
  CONTACT_INFO,
  SCHOLARSHIPS,
} from '@/lib/content';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Элсэлт',
  description:
    '2026-2027 оны хичээлийн жилийн элсэлтийн мэдээлэл — бакалавр, магистр, 30+, мэргэжил хөрвөх, гадаадаас шилжин суралцах, онлайн сургалт, бэлтгэл анги.',
};

const SUB_NAV = [
  { id: 'info', label: 'Мэргэжлээ сонгох', icon: FileText },
  { id: 'foreign', label: 'Гадаад оюутан элсэх', icon: Globe },
  { id: 'payment', label: 'Төлбөр, хөнгөлөлт', icon: Wallet },
] as const;

export default function AdmissionPage() {
  return (
    <>
      <PageHero
        title="ЭЛСЭЛТ"
        subtitle="2026-2027 оны хичээлийн жилийн элсэлтийн мэдээлэл."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Элсэлт' }]}
      />

      {/* Sub-nav — three anchors per editor's spec */}
      <div className="sticky top-20 z-30 border-b border-border-light bg-white/95 backdrop-blur">
        <div className="container-custom flex flex-wrap items-center gap-2 py-3">
          {SUB_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-light bg-white px-4 py-1.5 text-sm font-semibold text-text-body transition-colors hover:border-navy-900 hover:text-navy-900"
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Section 1 — Мэргэжлээ сонгох (8 program boxes) */}
      <Section background="cream-soft" id="info">
        <SectionTitle
          title="МЭРГЭЖЛЭЭ СОНГОХ"
          subtitle="2026-2027 оны хичээлийн жилийн элсэлтийн журам, тэтгэлэг ба элсэлтийн төрлүүд."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ADMISSION_PROGRAMS.map((p) => (
            <article
              key={p.id}
              className={cn(
                'flex h-full flex-col rounded-card border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover',
                p.featured
                  ? 'border-gold-500 ring-1 ring-gold-500/30'
                  : 'border-border-light',
              )}
            >
              <h3
                className={cn(
                  'text-sm font-bold uppercase leading-snug tracking-wide',
                  p.featured ? 'text-gold-500' : 'text-navy-900',
                )}
              >
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-body">
                {p.intro}
              </p>

              {p.bulletsLabel && (
                <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-navy-900">
                  {p.bulletsLabel}
                </p>
              )}
              <ul className={cn('space-y-1.5', p.bulletsLabel ? 'mt-2' : 'mt-4')}>
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-text-body"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {p.bullets2 && p.bullets2.length > 0 && (
                <>
                  {p.bullets2Label && (
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-navy-900">
                      {p.bullets2Label}
                    </p>
                  )}
                  <ul className={cn('space-y-1.5', p.bullets2Label ? 'mt-2' : 'mt-4')}>
                    {p.bullets2.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-text-body"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-auto pt-6">
                <Button
                  href={p.ctaHref}
                  variant={p.featured ? 'accent' : 'primary'}
                  size="sm"
                  icon={<ArrowRight className="h-3.5 w-3.5" />}
                  className="w-full"
                >
                  {p.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

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

      {/* Requirements — full-width now (Журам sidebar removed per editor) */}
      <Section background="cream-soft">
        <div className="mx-auto max-w-3xl">
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
      </Section>

      {/* Section 2 — Гадаад оюутан элсэх */}
      <Section background="white" id="foreign">
        <SectionTitle
          title="ГАДААД ОЮУТАН ЭЛСЭХ"
          subtitle="Гадаад оюутан элсүүлэх журам."
        />
        <Card hover={false} className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-text-body">
            Гадаадын иргэн манай сургуульд элсэх журам, бүрдүүлэх материал,
            виза дэмжих захидал, дотуур байр болон хичээлийн жилийн график
            зэрэг мэдээллийг бэлтгэж байна. Дэлгэрэнгүйг элсэлтийн албатай
            холбогдож аваарай.
          </p>
          <div className="mt-6">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Элсэлтийн алба руу хандах
            </Button>
          </div>
        </Card>
      </Section>

      {/* Section 3 — Төлбөр, хөнгөлөлт */}
      <Section background="cream-soft" id="payment">
        <SectionTitle
          title="ТӨЛБӨР, ХӨНГӨЛӨЛТ"
          subtitle="Элсэгчидэд зориулсан төлбөрийн хөнгөлөлтийн нөхцөл."
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
