import { Quote } from 'lucide-react';
import { Card } from './Card';

interface QuoteCardProps {
  quote: string;
  name: string;
  age?: number;
  program?: string;
}

/**
 * Testimonial card with a gold quote glyph.
 */
export function QuoteCard({ quote, name, age, program }: QuoteCardProps) {
  return (
    <Card className="flex h-full flex-col gap-5">
      <Quote className="h-8 w-8 text-gold-500" />
      <p className="flex-1 text-sm leading-relaxed text-text-body">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
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
    </Card>
  );
}
