import { Sparkles } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ResearchJournalsList } from '@/components/sections/ResearchJournalsList';
import {
  ANNUAL_EVENTS,
  RESEARCH_AREAS,
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
        title="ЭРДЭМ ШИНЖИЛГЭЭ"
        subtitle="Япон судлал, орчуулга, олон улсын харилцаа, эдийн засаг — манай судалгааны төв."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Эрдэм шинжилгээ' }]}
      />

      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">{RESEARCH_INTRO}</p>
        </div>
      </Section>

      <Section background="cream-soft">
        <SectionTitle title="СУДАЛГААНЫ ЧИГЛЭЛ" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {RESEARCH_AREAS.map((a) => {
            const Icon = a.icon;
            return (
              <Card key={a.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{a.title}</h3>
                <p className="mt-2 text-sm text-text-body">{a.description}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section background="white">
        <SectionTitle title="ЖИЛ БҮРИЙН ХУРАЛ, СЕМИНАР" align="left" />
        <ol className="space-y-3">
          {ANNUAL_EVENTS.map((e, idx) => (
            <li
              key={e}
              className="flex items-center gap-4 rounded-card border border-border-light bg-white px-5 py-4 text-text-body shadow-card"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-gold-400">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="text-sm font-semibold text-navy-900">{e}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section background="cream-soft">
        <SectionTitle
          title="ЭРДЭМ ШИНЖИЛГЭЭНИЙ СЭТГҮҮЛ"
          subtitle="Соёл-Эрдэм Дээд Сургуулиас гаргадаг бот тус бүрийг номын хуудас эргүүлэн уншиж танилцана уу."
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
