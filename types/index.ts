import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type Variant = 'primary' | 'accent' | 'outline';
export type Size = 'sm' | 'md' | 'lg';

export interface NavItem {
  label: string;
  href: string;
}

export interface NewsItem {
  id: string | number;
  image: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
}

export interface ProgramItem {
  id: string | number;
  icon: LucideIcon;
  name: string;
  degree: string;
  description: string;
  href: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type IconType = LucideIcon;
export type WithChildren<T = unknown> = T & { children?: ReactNode };
