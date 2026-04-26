import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  image: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  className?: string;
}

/**
 * News article card with 16:9 cover image, meta, title and excerpt.
 */
export function NewsCard({
  image,
  date,
  category,
  title,
  excerpt,
  href,
  className,
}: NewsCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-card border border-border-light bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-soft">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-3 text-xs">
          <span className="rounded-full bg-gold-500/10 px-3 py-1 font-semibold text-gold-500">
            {category}
          </span>
          <span className="text-text-muted">{date}</span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-text-heading transition-colors group-hover:text-navy-900">
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-text-body">{excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-navy-900">
          Дэлгэрэнгүй
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
