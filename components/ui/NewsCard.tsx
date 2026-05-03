import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  image: string;
  date: string;
  category: string;
  title: string;
  /** Author-curated lead. Used as-is when present. */
  excerpt?: string | null;
  /** Full article body. When excerpt is empty we slice the first paragraph
   *  out of this so the card always shows real article copy. */
  body?: string | null;
  href: string;
  className?: string;
}

const TEASER_MAX = 240;

/**
 * Build a card teaser from the article. Prefers an author-written excerpt;
 * otherwise takes the first paragraph of the body and trims it at a word
 * boundary so the card looks like a printed newspaper lede instead of a
 * blank panel.
 */
function buildTeaser(
  excerpt: string | null | undefined,
  body: string | null | undefined,
): string {
  const lead = excerpt?.trim();
  if (lead) return lead;
  const source = body?.trim();
  if (!source) return '';
  const firstPara = source.split(/\n\s*\n+/)[0].trim();
  if (firstPara.length <= TEASER_MAX) return firstPara;
  const sliced = firstPara.slice(0, TEASER_MAX);
  const lastSpace = sliced.lastIndexOf(' ');
  const cut =
    lastSpace > Math.floor(TEASER_MAX * 0.6) ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.trimEnd()}…`;
}

/**
 * News article card. Editorial layout: a generous 4:3 cover photo (so most
 * vertical and landscape press photos read well without aggressive cropping),
 * a floating category chip, and a four-line lede pulled from the article body
 * with a soft fade at the bottom hinting "more inside" — a printed-newspaper
 * teaser, not a database row.
 */
export function NewsCard({
  image,
  date,
  category,
  title,
  excerpt,
  body,
  href,
  className,
}: NewsCardProps) {
  const teaser = buildTeaser(excerpt, body);
  const hasTeaser = teaser.length > 0;

  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card border border-border-light bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-soft">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle bottom gradient so the chip and image edge stay readable
            against any photo. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent"
        />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-900 shadow-sm backdrop-blur">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          {date}
        </p>
        <h3 className="mt-2 line-clamp-2 font-serif text-[1.05rem] font-bold leading-snug text-navy-900 transition-colors group-hover:text-gold-500">
          {title}
        </h3>

        {hasTeaser ? (
          <div className="relative mt-3 flex-1">
            <p className="line-clamp-4 text-sm leading-relaxed text-text-body">
              {teaser}
            </p>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-white via-white/85 to-transparent"
            />
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-900">
          Үргэлжлэлийг унших
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
