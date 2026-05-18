'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, X, ZoomIn } from 'lucide-react';
import { useTranslation } from '@/components/system/LocaleProvider';
import type { TranslationKey } from '@/lib/i18n/messages';

interface Certificate {
  year: number;
  src: string;
  /** Translation key resolved per-locale. */
  captionKey: TranslationKey;
  altKey: TranslationKey;
}

const CERTIFICATES: Certificate[] = [
  {
    year: 2003,
    src: '/accreditation/cert-2003.jpg',
    captionKey: 'accreditation.cap1',
    altKey: 'accreditation.alt1',
  },
  {
    year: 2010,
    src: '/accreditation/cert-2010.jpg',
    captionKey: 'accreditation.cap2',
    altKey: 'accreditation.alt2',
  },
  {
    year: 2020,
    src: '/accreditation/cert-2020.jpg',
    captionKey: 'accreditation.cap3',
    altKey: 'accreditation.alt3',
  },
];

/**
 * Accreditation certificates strip — three cards stacked below the timeline
 * on /about/history. Each card frames the certificate image like a printed
 * award and opens a lightbox modal on click for the full-size scan.
 */
export function AccreditationGallery() {
  const t = useTranslation();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const active = activeIdx !== null ? CERTIFICATES[activeIdx] : null;
  // EN locale leaves the year suffix empty so the badge reads "2003"
  // rather than "2003 он"; MN keeps "он" and JP renders "年".
  const yearSuffix = t('accreditation.year');
  const formatYear = (y: number) =>
    yearSuffix ? `${y} ${yearSuffix}` : String(y);

  // ESC + body-scroll lock while modal open
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIdx(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <>
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATES.map((c, idx) => (
          <button
            key={c.year}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className="group relative flex flex-col overflow-hidden rounded-card border border-border-light bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-card-hover"
          >
            {/* Image frame — cream padding so each cert reads as a framed award */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-soft p-4">
              <div className="relative h-full w-full overflow-hidden rounded-sm bg-white ring-1 ring-border-light shadow-[inset_0_0_0_1px_rgba(212,162,76,0.18)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={t(c.altKey)}
                  className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              {/* Zoom hint pill on hover */}
              <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-navy-900/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                <ZoomIn className="h-3 w-3" />
                {t('accreditation.zoom')}
              </span>
            </div>

            {/* Caption strip */}
            <div className="border-t border-border-light bg-white px-5 py-4 text-left">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-500">
                <Award className="h-3 w-3" />
                {formatYear(c.year)}
              </p>
              <p className="mt-1 text-sm font-bold leading-snug text-navy-900">
                {t(c.captionKey)}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={t(active.captionKey)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/85 px-4 py-8 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveIdx(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-card bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            >
              <button
                type="button"
                onClick={() => setActiveIdx(null)}
                aria-label={t('common.close')}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-card backdrop-blur transition-colors hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative flex-1 overflow-auto bg-cream-soft p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.src}
                  alt={t(active.altKey)}
                  className="mx-auto h-auto max-h-[75vh] w-auto rounded-sm bg-white object-contain shadow-card"
                />
              </div>

              <div className="border-t border-border-light bg-white px-6 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-500">
                  {formatYear(active.year)}
                </p>
                <p className="mt-1 font-serif text-lg font-bold text-navy-900">
                  {t(active.captionKey)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
