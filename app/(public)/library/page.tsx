import { BookMarked, Clock, MapPin } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale } from '@/lib/i18n/server';
import { LIBRARY_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Номын сан',
};

const HOLDING_ICONS = [Clock, MapPin, BookMarked] as const;

export default async function LibraryPage() {
  const [banners, locale] = await Promise.all([
    getSiteContentMap('banners'),
    getServerLocale(),
  ]);
  const c = LIBRARY_CONTENT[locale];

  return (
    <>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={banners.get('page.library.banner') || undefined}
      />

      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">{c.intro}</p>
        </div>
      </Section>

      <Section background="cream-soft">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle title={c.categoriesTitle} align="left" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {c.categories.map((cat) => (
                <li
                  key={cat}
                  className="flex items-center gap-3 rounded-button border border-border-light bg-white px-4 py-3 text-sm text-navy-900"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gold-500/15 text-gold-500">
                    <BookMarked className="h-4 w-4" />
                  </span>
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle title={c.servicesTitle} align="left" />
            <div className="space-y-3">
              {c.services.map((s, idx) => (
                <Card key={s} className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-gold-500">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="pt-1 text-sm text-text-body">{s}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section background="navy" spacing="md">
        <div className="grid gap-6 sm:grid-cols-3">
          {c.holdings.map((h, idx) => {
            const Icon = HOLDING_ICONS[idx] ?? Clock;
            return (
              <div
                key={h.label}
                className="flex items-center gap-4 rounded-card border border-white/10 bg-white/5 p-5 text-white"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-cream/70">
                    {h.label}
                  </p>
                  <p className="text-lg font-bold">{h.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
