import { cn } from '@/lib/utils';

interface TimelineStepProps {
  number: number | string;
  title: string;
  description: string;
  isActive?: boolean;
  /** When true, hides the connecting line (use for the last step). */
  isLast?: boolean;
  className?: string;
}

/**
 * Single step inside a horizontal timeline.
 */
export function TimelineStep({
  number,
  title,
  description,
  isActive = false,
  isLast = false,
  className,
}: TimelineStepProps) {
  return (
    <div className={cn('relative flex flex-1 flex-col items-center text-center', className)}>
      <div className="relative flex w-full items-center justify-center">
        <span
          className={cn(
            'z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 text-base font-bold transition-colors',
            isActive
              ? 'border-gold-500 bg-gold-500 text-navy-900'
              : 'border-border-medium bg-white text-text-muted',
          )}
        >
          {number}
        </span>
        {!isLast && (
          <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 bg-border-light" />
        )}
      </div>
      <h4 className="mt-4 text-sm font-semibold text-text-heading">{title}</h4>
      <p className="mt-1 max-w-[160px] text-xs text-text-muted">{description}</p>
    </div>
  );
}
