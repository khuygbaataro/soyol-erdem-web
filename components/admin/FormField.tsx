import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  hint,
  required,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
        {label}
        {required && <span className="ml-1 text-gold-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-text-muted">{hint}</p>}
      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

export const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-2.5 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10 disabled:opacity-50';

export const textareaClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-3 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10 disabled:opacity-50 resize-y';
