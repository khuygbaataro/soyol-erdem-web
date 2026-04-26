import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatBlockProps {
  icon: LucideIcon;
  number: string | number;
  label: string;
  className?: string;
}

/**
 * Stat tile for the navy band: gold icon, large white number, cream label.
 */
export function StatBlock({ icon: Icon, number, label, className }: StatBlockProps) {
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-gold-400">
        <Icon className="h-7 w-7" />
      </span>
      <span className="text-3xl font-bold text-white md:text-4xl">{number}</span>
      <span className="mt-1 text-sm text-cream">{label}</span>
    </div>
  );
}
