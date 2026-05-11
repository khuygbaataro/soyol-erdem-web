import {
  Briefcase,
  Building2,
  Globe2,
  Leaf,
  MapPin,
  Users,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CtaBanner } from '@/components/sections/CtaBanner';
import {
  INTERNATIONAL_BLOCKS,
  INTERNATIONAL_INTRO,
  PARTNER_UNIVERSITIES,
} from '@/lib/content';

export const metadata = {
  title: 'Хамтын ажиллагаа',
};

// Visual accent per themed block — keyed by index so the icons match
// the editor-supplied ordering (exchange → internship → conference → ecology).
const BLOCK_ICONS = [Users, Briefcase, Globe2, Leaf] as const;

export default function InternationalPage() {
  return (
    <>
      <PageHero
        title="СУРГУУЛИЙН ГАДААД, ДОТООД ХАМТЫН АЖИЛЛАГАА"
        subtitle="Япон улсын 30+ их сургууль, мэргэжлийн сургууль, олон улсын байгууллагатай хамтрах сүлжээ."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Хамтын ажиллагаа' }]}
      />

      {/* Intro paragraph */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">
            {INTERNATIONAL_INTRO}
          </p>
        </div>
      </Section>

      {/* Four themed callout blocks — Exchange / Internship / Conference / Ecology */}
      <Section background="cream-soft">
        <div className="space-y-6">
          {INTERNATIONAL_BLOCKS.map((b, i) => {
            const Icon = BLOCK_ICONS[i] ?? Globe2;
            return (
              <article
                key={b.heading}
                className="grid gap-6 rounded-card border border-border-light bg-white p-6 shadow-card md:grid-cols-[auto_1fr] md:p-8"
              >
                <div className="flex md:block">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-500 ring-1 ring-gold-500/30">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-xl font-bold leading-snug text-navy-900 md:text-2xl">
                    {b.heading}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-body md:text-base">
                    {b.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Partner directory — 33+ universities / institutions */}
      <Section background="white">
        <SectionTitle
          title="ХАМТЫН АЖИЛЛАГААТАЙ ЯПОНЫ КОМПАНИ, БАЙГУУЛЛАГА, СУРГУУЛИУД"
          subtitle={`Манай гэрээт хамтрагч ${PARTNER_UNIVERSITIES.length} байгууллага.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PARTNER_UNIVERSITIES.map((u) => (
            <Card key={u.name} className="flex h-full flex-col gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                <Building2 className="h-4 w-4" />
              </span>
              <h3 className="mt-1 text-sm font-bold leading-snug text-navy-900">
                {u.name}
              </h3>
              <p className="inline-flex items-center gap-1 text-xs text-text-muted">
                <MapPin className="h-3 w-3" />
                {u.location}
              </p>
              <Badge variant="cream" className="mt-auto self-start text-[10px]">
                {u.type}
              </Badge>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Япон улсад очиж суралцахыг хүсэж байна уу?"
        ctaLabel="Элсэлт"
        ctaHref="/admission"
        secondary={{ label: 'Бидэнтэй холбогдох', href: '/contact' }}
      />
    </>
  );
}
