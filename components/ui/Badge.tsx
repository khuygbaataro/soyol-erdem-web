import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'gold' | 'navy' | 'cream' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: 'bg-gold-500/15 text-gold-500',
  navy: 'bg-navy-900 text-white',
  cream: 'bg-cream text-navy-900',
  outline: 'border border-navy-900 text-navy-900',
};

/**
 * Small pill-shaped status / category badge.
 */
export function Badge({ variant = 'gold', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
