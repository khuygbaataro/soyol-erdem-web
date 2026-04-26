import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** When true, the card lifts on hover. Default: true. */
  hover?: boolean;
}

/**
 * Generic content card with optional hover lift.
 */
export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-border-light bg-white p-6 shadow-card transition-all duration-300',
        hover && 'hover:-translate-y-0.5 hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </div>
  );
}
