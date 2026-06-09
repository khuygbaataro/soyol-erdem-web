import { Section } from '@/components/layout/Section';
import { AccreditationGallery } from '@/components/sections/AccreditationGallery';
import { TIMELINE } from '@/lib/content';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Сургуулийн түүх' };

export default async function HistoryPage() {
  const [dbTimeline, dbCerts] = await Promise.all([
    prisma.timelineItem.findMany({ where: { active: true }, orderBy: { order: 'asc' } }).catch(() => []),
    prisma.accreditation.findMany({ where: { active: true }, orderBy: { order: 'asc' } }).catch(() => []),
  ]);

  const timeline = dbTimeline.length > 0 ? dbTimeline : TIMELINE;
  const certs = dbCerts.length > 0
    ? dbCerts.map(c => ({ year: c.year, src: c.image, caption: c.title }))
    : null;

  return (
    <>
      <Section background="white">
        <div className="relative mx-auto max-w-3xl">
          <span className="absolute left-4 top-0 h-full w-0.5 bg-border-light" />
          {timeline.map((t) => (
            <div key={`${t.year}-${t.title}`} className="relative mb-10 pl-14">
              <span className="absolute left-4 top-1.5 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-gold-500 ring-1 ring-gold-500" />
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-500">{t.year}</p>
              <h3 className="mt-1 text-xl font-bold text-navy-900">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">{'description' in t ? t.description : ''}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="cream-soft">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold leading-tight text-navy-900 md:text-5xl">
            МАГАДЛАН ИТГЭМЖЛЭЛИЙН ГЭРЧИЛГЭЭ
          </h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-500" />
        </div>
        <AccreditationGallery certs={certs} />
      </Section>
    </>
  );
}
