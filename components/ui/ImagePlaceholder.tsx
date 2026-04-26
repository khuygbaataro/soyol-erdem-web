import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  className?: string;
  label?: string;
  /** Tailwind aspect-* class. Default: aspect-[4/3]. */
  aspect?: string;
}

/**
 * Branded placeholder block for missing images. Replace with next/image when
 * the asset is available.
 */
export function ImagePlaceholder({
  className,
  label = 'Зураг удахгүй',
  aspect = 'aspect-[4/3]',
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        aspect,
        'flex w-full items-center justify-center rounded-image bg-gradient-to-br from-navy-700 to-navy-900 text-white/40',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <ImageIcon className="h-10 w-10" />
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}
