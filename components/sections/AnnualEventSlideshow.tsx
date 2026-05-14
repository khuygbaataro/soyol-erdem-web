'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  images: string[];
  /** Used for alt text — e.g. the event/chapter title. */
  label: string;
  /** Tailwind aspect class — default 1:1 for cards, override for wide hero. */
  aspectClassName?: string;
  /** Optional caption rendered below the slideshow. */
  caption?: string;
}

/**
 * Horizontally-scrolling slideshow used in both the annual-event cards
 * (square 1:1) and the chapter sections (wide 16:9). Returns null when
 * `images` is empty so the surrounding layout collapses cleanly.
 */
export function AnnualEventSlideshow({
  images,
  label,
  aspectClassName = 'aspect-square',
  caption,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Keep `active` in sync with the slide most-centered in the viewport.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slideWidth = el.clientWidth;
        if (slideWidth === 0) return;
        const idx = Math.round(el.scrollLeft / slideWidth);
        setActive(Math.max(0, Math.min(images.length - 1, idx)));
      });
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', handler);
    };
  }, [images.length]);

  if (images.length === 0) return null;

  function scrollTo(idx: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(images.length - 1, idx));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
  }

  return (
    <figure className="m-0">
      <div className="relative">
        <div
          ref={scrollerRef}
          className={`flex w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-button bg-cream-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${aspectClassName}`}
        >
        {images.map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="relative h-full w-full shrink-0 snap-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${label} — ${idx + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollTo(active - 1)}
              disabled={active === 0}
              aria-label="Өмнөх зураг"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-card backdrop-blur transition-opacity hover:bg-white disabled:opacity-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo(active + 1)}
              disabled={active === images.length - 1}
              aria-label="Дараагийн зураг"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-card backdrop-blur transition-opacity hover:bg-white disabled:opacity-0"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-navy-900/45 px-2 py-1 backdrop-blur">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollTo(idx)}
                  aria-label={`Зураг ${idx + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    idx === active ? 'w-4 bg-white' : 'w-1.5 bg-white/60',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {caption && caption.trim().length > 0 && (
        <figcaption className="mt-2.5 text-center text-xs italic leading-snug text-text-muted md:text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
