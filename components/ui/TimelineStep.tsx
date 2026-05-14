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
            'z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 text-lg font-bold transition-colors',
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
      <h4 className="mt-5 text-base font-bold uppercase tracking-wide text-navy-900">
        {title}
      </h4>
      <p className="mt-2 max-w-[230px] text-sm leading-relaxed text-text-body">
        {description}
      </p>
    </div>
  );
}
