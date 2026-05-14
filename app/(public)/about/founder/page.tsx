import Image from 'next/image';
import { Quote } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { FOUNDER_MESSAGE, SCHOOL_INFO } from '@/lib/content';
import { content, getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Үүсгэн байгуулагч',
};

export default async function FounderPage() {
  const site = await getSiteContentMap('about');

  const name = content(site, 'about.founder.name', SCHOOL_INFO.founder);
  const title = content(site, 'about.founder.title', SCHOOL_INFO.founderTitle);
  const portrait = site.get('about.founder.image') || '';
  // Admin enters paragraphs separated by blank lines (\n\n). When the key
  // is empty we fall back to the FOUNDER_MESSAGE array compiled at build.
  const messageRaw = content(
    site,
    'about.founder.message',
    FOUNDER_MESSAGE.join('\n\n'),
  );
  const paragraphs = messageRaw
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <PageHero
        title="Үүсгэн байгуулагч"
        subtitle={`${name} — ${title}.`}
        breadcrumb={[
          { label: 'Нүүр', href: '/' },
          { label: 'Сургуулийн тухай', href: '/about' },
          { label: 'Үүсгэн байгуулагч' },
        ]}
      />

      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <Card className="h-fit text-center" hover={false}>
            {portrait ? (
              <div className="relative mb-5 aspect-square w-full overflow-hidden rounded-card bg-cream-soft">
                <Image
                  src={portrait}
                  alt={name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <ImagePlaceholder
                aspect="aspect-square"
                label={`${name}-ын зураг`}
                className="mb-5"
              />
            )}
            <p className="text-lg font-semibold text-navy-900">{name}</p>
            <p className="mt-1 text-sm text-text-muted">{title}</p>
          </Card>

          <article className="relative">
            <Quote className="absolute -top-2 left-0 h-12 w-12 text-gold-500/30" />
            <div className="space-y-5 pt-10 text-base leading-relaxed text-text-body">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <p className="pt-3 text-sm font-semibold text-navy-900">
                — {name}, {title}
              </p>
            </div>
          </article>
        </div>
      </Section>

    </>
  );
}
