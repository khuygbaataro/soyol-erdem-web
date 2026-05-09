import { Building2, MapPin } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import {
  EMBASSY_PARTNERSHIP,
  INTERNATIONAL_INTRO,
  INTERNSHIP_TEXT,
  PARTNER_UNIVERSITIES,
} from '@/lib/content';

export const metadata = {
  title: 'Хамтын ажиллагаа',
};

export default function InternationalPage() {
  return (
    <>
      <PageHero
        title="ХАМТЫН АЖИЛЛАГАА"
        subtitle="Япон улсын 30+ их сургууль, бизнес байгууллагатай хамтын ажиллагааны сүлжээ."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Хамтын ажиллагаа' }]}
      />

      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">
            {INTERNATIONAL_INTRO}
          </p>
        </div>
      </Section>

      {/* Partner universities */}
      <Section background="cream-soft">
        <SectionTitle title="ХАМТРАГЧ ИХ СУРГУУЛИУД" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PARTNER_UNIVERSITIES.map((u) => (
            <Card key={u.name} className="flex h-full flex-col gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-gold-400">
                <Building2 className="h-5 w-5" />
              </span>
              <h3 className="mt-2 text-base font-bold text-navy-900">{u.name}</h3>
              <p className="inline-flex items-center gap-1 text-xs text-text-muted">
                <MapPin className="h-3 w-3" />
                {u.location}
              </p>
              <Badge variant="cream" className="mt-2 self-start">
                {u.type}
              </Badge>
            </Card>
          ))}
          <Card className="flex h-full items-center justify-center text-center">
            <p className="text-sm font-semibold text-text-muted">
              ...ба бусад <span className="text-gold-500">25+</span> их сургууль
            </p>
          </Card>
        </div>
      </Section>

      {/* Internship highlight */}
      <Section background="white">
        <Card className="overflow-hidden p-0" hover={false}>
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="bg-cream p-2">
              <ImagePlaceholder label="Япон — интерншип" aspect="aspect-[4/3] lg:aspect-auto lg:h-full" />
            </div>
            <div className="p-8 md:p-12">
              <Badge variant="gold" className="mb-3">
                Онцлох
              </Badge>
              <h2 className="text-h2 font-bold text-navy-900">Интерншип хөтөлбөр</h2>
              <p className="mt-4 text-text-body">{INTERNSHIP_TEXT}</p>
              <div className="mt-6">
                <Button href="/admission" variant="primary" size="md">
                  Хэрхэн оролцох
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Embassy partnership */}
      <Section background="white" spacing="md">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title="ЭЛЧИН САЙДЫН ЯАМТАЙ ХАМТЫН АЖИЛЛАГАА" align="left" />
          <p className="text-base leading-relaxed text-text-body">
            {EMBASSY_PARTNERSHIP}
          </p>
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
