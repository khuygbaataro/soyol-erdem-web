import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

/**
 * Compact feature tile used in the home page "Quick Features" strip.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group flex items-start gap-4 rounded-card bg-white p-5 transition-all duration-300 hover:bg-cream-soft',
        className,
      )}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-500/10 text-gold-500 transition-colors group-hover:bg-gold-500 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h4 className="text-base font-semibold text-text-heading">{title}</h4>
        <p className="mt-1 text-sm text-text-body">{description}</p>
      </div>
    </div>
  );
}
