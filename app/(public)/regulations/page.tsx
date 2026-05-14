import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, FileText } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Дүрэм журам',
  description:
    'Соёл Эрдэм Дээд Сургуулийн дүрэм журмууд — суралцах, шилжих, чөлөө авах болон бусад.',
};

export default async function RegulationsPage() {
  const [items, banners] = await Promise.all([
    prisma.regulation
      .findMany({
        where: { status: 'PUBLISHED' },
        orderBy: [{ order: 'asc' }, { title: 'asc' }],
      })
      .catch(() => []),
    getSiteContentMap('banners'),
  ]);

  return (
    <>
      <PageHero
        title="ДҮРЭМ ЖУРАМ"
        subtitle="Соёл Эрдэм Дээд Сургуулийн бүх мөрдөгдөж буй журмыг нэг газар. Дугаар бүрийг номын хуудас эргүүлэн уншиж танилцана уу."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Дүрэм журам' }]}
        backgroundImage={banners.get('page.regulations.banner') || undefined}
      />

      <Section background="cream-soft" spacing="md">
        {items.length === 0 ? (
          <Card
            hover={false}
            className="mx-auto max-w-2xl text-center text-sm text-text-muted"
          >
            Одоохондоо журам нийтлэгдээгүй байна.
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((r) => (
              <Link
                key={r.id}
                href={`/regulations/${r.id}`}
                target="_blank"
                rel="noopener"
                className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-card bg-white text-left shadow-card ring-1 ring-border-light transition-all hover:-translate-y-1 hover:shadow-card-hover hover:ring-gold-500/60"
              >
                {/* Cover area */}
                <div className="relative flex-1 overflow-hidden bg-cream-soft">
                  {r.coverImage ? (
                    <Image
                      src={r.coverImage}
                      alt={r.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-navy-900 text-white">
                      <FileText className="h-14 w-14 text-gold-400/70" />
                    </div>
                  )}
                  {/* Subtle bottom gradient */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy-900 shadow-sm">
                    Журам
                  </span>
                </div>

                {/* Title block */}
                <div className="flex flex-col justify-between gap-3 px-5 py-4">
                  <h3 className="line-clamp-2 font-serif text-base font-bold leading-snug text-navy-900 transition-colors group-hover:text-gold-500">
                    {r.title}
                  </h3>
                  {r.description && (
                    <p className="line-clamp-2 text-xs text-text-body">
                      {r.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900">
                    <BookOpen className="h-3.5 w-3.5 text-gold-500" />
                    Уншиж эхлэх
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
