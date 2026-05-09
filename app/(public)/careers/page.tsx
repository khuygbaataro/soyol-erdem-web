import { ArrowRight, Briefcase, Check, Mail, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CtaBanner } from '@/components/sections/CtaBanner';
import {
  CAREERS_DEFAULT_OPENINGS,
  CAREERS_INTRO,
  CAREERS_OFFERS,
  CAREERS_REQUIREMENTS,
} from '@/lib/content';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Нээлттэй ажлын байр',
  description:
    'Соёл Эрдэм Дээд Сургуулийн нээлттэй багшийн ажлын байрны жагсаалт + анкет.',
};

export default async function CareersPage() {
  // DB list when populated, otherwise the seeded defaults — same shape
  // either way so the rest of the page doesn't care.
  const dbOpenings = await prisma.jobOpening
    .findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
      select: { slug: true, title: true, description: true },
    })
    .catch(() => null);

  const openings =
    dbOpenings && dbOpenings.length > 0
      ? dbOpenings
      : CAREERS_DEFAULT_OPENINGS.map((o) => ({ ...o, description: null }));

  return (
    <>
      <PageHero
        title="НЭЭЛТТЭЙ АЖЛЫН БАЙР"
        subtitle="Манай багт нэгдэх багш, мэргэжилтнүүдийг урьж байна."
        breadcrumb={[
          { label: 'Нүүр', href: '/' },
          { label: 'Нээлттэй ажлын байр' },
        ]}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">
            {CAREERS_INTRO}
          </p>
        </div>
      </Section>

      {/* Open positions */}
      <Section background="cream-soft" id="openings">
        <SectionTitle
          title="НЭЭЛТТЭЙ АЖЛЫН БАЙР"
          subtitle="Доорх албан тушаалуудаар анкет хүлээн авч байна."
        />
        {openings.length === 0 ? (
          <Card hover={false} className="text-center text-sm text-text-muted">
            Одоогоор нээлттэй ажлын байр байхгүй байна.
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {openings.map((o) => (
              <article
                key={o.slug}
                className="group flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-900 hover:shadow-card-hover"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-navy-900">
                      {o.title}
                    </h3>
                    {o.description && (
                      <p className="mt-2 text-sm leading-relaxed text-text-body">
                        {o.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5 pt-2">
                  <Button
                    href={`/careers/apply?position=${encodeURIComponent(o.title)}`}
                    variant="outline"
                    size="sm"
                    icon={<ArrowRight className="h-3.5 w-3.5" />}
                  >
                    Анкет бөглөх
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      {/* Requirements + offers */}
      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-h3 font-bold text-navy-900">
              Тавигдах нийтлэг шаардлага
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
            <ul className="mt-6 space-y-3">
              {CAREERS_REQUIREMENTS.map((r) => (
                <li key={r} className="flex items-start gap-3 text-text-body">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h3 font-bold text-navy-900">
              Бид танд санал болгож байна
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />
            <ul className="mt-6 space-y-3">
              {CAREERS_OFFERS.map((o) => (
                <li key={o} className="flex items-start gap-3 text-text-body">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Triple CTA strip — Анкет бөглөх / Нээлттэй ажлын байр харах /
          Бидэнтэй нэгдэх */}
      <Section background="cream-soft" spacing="sm">
        <div className="grid gap-3 md:grid-cols-3">
          <Button
            href="/careers/apply"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="h-5 w-5" />}
            className="w-full"
          >
            Анкет бөглөх
          </Button>
          <Button
            href="#openings"
            variant="outline"
            size="lg"
            className="w-full"
          >
            Нээлттэй ажлын байр харах
          </Button>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            icon={<Mail className="h-5 w-5" />}
            iconPosition="left"
            className="w-full"
          >
            Бидэнтэй нэгдэх
          </Button>
        </div>
      </Section>

      <CtaBanner
        title="Чанартай боловсрол, найрсаг хамт олон"
        ctaLabel="Анкет бөглөх"
        ctaHref="/careers/apply"
        secondary={{ label: 'Холбоо барих', href: '/contact' }}
      />
    </>
  );
}
