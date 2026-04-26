import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Size, Variant } from '@/types';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  Omit<ComponentProps<'button'>, keyof CommonProps> & { href?: undefined };

type AnchorProps = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps | 'href'> & { href: string };

export type ButtonComponentProps = ButtonProps | AnchorProps;

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-900 focus-visible:ring-gold-500',
  accent:
    'bg-gold-500 text-navy-900 hover:bg-gold-400 focus-visible:ring-navy-900',
  outline:
    'bg-transparent text-navy-900 border border-navy-900 hover:bg-navy-900 hover:text-white focus-visible:ring-navy-900',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-button font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

/**
 * Primary action button. Renders as <Link> when `href` is provided, otherwise <button>.
 */
export function Button(props: ButtonComponentProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    loading = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {!loading && icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
    </>
  );

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { ...buttonRest } = rest as ButtonProps;
  return (
    <button className={classes} disabled={loading || (rest as ButtonProps).disabled} {...buttonRest}>
      {content}
    </button>
  );
}
