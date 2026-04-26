import type { ReactNode } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { BreadcrumbItem } from '@/types';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  action?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-border-light pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="mb-2">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
        <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
