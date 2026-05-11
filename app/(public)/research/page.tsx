import { Check, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ResearchJournalsList } from '@/components/sections/ResearchJournalsList';
import {
  RESEARCH_AREAS,
  RESEARCH_DEPARTMENTS,
  RESEARCH_HIGHLIGHTS,
  RESEARCH_INTRO,
} from '@/lib/content';
import { RESEARCH_JOURNALS } from '@/lib/research-journals';

export const metadata = {
  title: 'Эрдэм шинжилгээ',
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        title="ЭРДЭМ ШИНЖИЛГЭЭ, СУДАЛГААНЫ АЖИЛ"
        subtitle="Тэнхимүүдийн судалгааны тэргүүлэх чиглэл, ахисан түвшний судалгаа, олон улсын хамтын ажиллагаа."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Эрдэм шинжилгээ' }]}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">
            {RESEARCH_INTRO}
          </p>
        </div>
      </Section>

      {/* Top-level priorities — 3 headline cards */}
      <Section background="cream-soft">
        <SectionTitle
          title="СЭДС-ИЙН СУДАЛГААНЫ ТЭРГҮҮЛЭХ ЧИГЛЭЛҮҮД"
          subtitle="Мэргэжлийн тэнхимүүдийн судалгааны үндсэн 3 чиглэл."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {RESEARCH_AREAS.map((a) => {
            const Icon = a.icon;
            return (
              <Card key={a.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold leading-snug text-navy-900">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {a.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Per-department research focus — 3 columns of bulleted lists */}
      <Section background="white">
        <SectionTitle
          title="ТЭНХИМ ТУС БҮРИЙН СУДАЛГААНЫ ЧИГЛЭЛ"
          subtitle="Тэнхим, ахисан түвшнээр ангилсан судалгааны нарийвчилсан чиглэлүүд."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_DEPARTMENTS.map((d) => (
            <article
              key={d.title}
              className="flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card"
            >
              <h3 className="mb-4 border-b border-gold-500/40 pb-3 text-sm font-bold uppercase tracking-wider text-navy-900">
                {d.title}
              </h3>
              <ul className="space-y-2.5">
                {d.topics.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-text-body">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Highlights — research-professor teams + CISCO + Moodle */}
      <Section background="cream-soft">
        <SectionTitle
          title="ОНЦЛОХ ҮЙЛ АЖИЛЛАГАА"
          subtitle="Судалгааны профессорын баг, олон улсын гэрчилгээт сургалт, цахим хэрэглэгдэхүүн."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {RESEARCH_HIGHLIGHTS.map((h) => (
            <Card key={h.slice(0, 30)} className="flex h-full flex-col">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="text-sm leading-relaxed text-text-body">{h}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Journals */}
      <Section background="white">
        <SectionTitle
          title="ЭРДЭМ ШИНЖИЛГЭЭНИЙ СЭТГҮҮЛ"
          subtitle="Соёл Эрдэм Дээд Сургуулиас гаргадаг бот тус бүрийг номын хуудас эргүүлэн уншиж танилцана уу."
        />
        <ResearchJournalsList journals={RESEARCH_JOURNALS} />
      </Section>

      <CtaBanner
        title="Хамтран судалгаа хийх санал"
        ctaLabel="Бидэнтэй холбогдох"
        ctaHref="/contact"
      />
    </>
  );
}
