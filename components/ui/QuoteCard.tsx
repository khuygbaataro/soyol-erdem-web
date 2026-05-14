import { Quote } from 'lucide-react';
import { Card } from './Card';

interface QuoteCardProps {
  quote: string;
  name: string;
  age?: number;
  program?: string;
  /** Optional portrait — round avatar in the footer when present. */
  photo?: string;
}

/**
 * Testimonial card with a gold quote glyph and an optional portrait.
 */
export function QuoteCard({ quote, name, age, program, photo }: QuoteCardProps) {
  return (
    <Card className="flex h-full flex-col gap-5">
      <Quote className="h-8 w-8 text-gold-500" />
      <p className="flex-1 text-sm leading-relaxed text-text-body">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {photo && (
          <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-500/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </span>
        )}
        <div className="min-w-0">
          <p className="text-base font-semibold text-navy-900">
            {name}
            {age !== undefined && (
              <span className="ml-2 text-sm font-normal text-text-muted">
                ({age})
              </span>
            )}
          </p>
          {program && <p className="text-xs text-text-muted">{program}</p>}
        </div>
      </div>
    </Card>
  );
}
