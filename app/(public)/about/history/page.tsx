import { Section } from '@/components/layout/Section';
import { AccreditationGallery } from '@/components/sections/AccreditationGallery';
import { TIMELINE } from '@/lib/content';

export const metadata = {
  title: 'Сургуулийн түүх',
};

export default function HistoryPage() {
  return (
    <>
      <Section background="white">
        <div className="relative mx-auto max-w-3xl">
          <span className="absolute left-4 top-0 h-full w-0.5 bg-border-light" />
          {TIMELINE.map((t) => (
            <div key={t.year} className="relative mb-10 pl-14">
              <span className="absolute left-4 top-1.5 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-gold-500 ring-1 ring-gold-500" />
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-500">
                {t.year}
              </p>
              <h3 className="mt-1 text-xl font-bold text-navy-900">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                {t.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Accreditation certificates — frame the 2003 / 2010 / 2020 scans
          right below the timeline so visitors can see the actual awards
          mentioned in the milestones above. */}
      <Section background="cream-soft">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold leading-tight text-navy-900 md:text-5xl">
            МАГАДЛАН ИТГЭМЖЛЭЛИЙН ГЭРЧИЛГЭЭ
          </h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-500" />
        </div>
        <AccreditationGallery />
      </Section>
    </>
  );
}
