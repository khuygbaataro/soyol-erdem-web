import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  header: string;
  /** Cell renderer. */
  cell: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  empty?: ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  empty = 'Бичлэг байхгүй байна.',
  className,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border-medium bg-white p-10 text-center text-sm text-text-muted">
        {empty}
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-card border border-border-light bg-white shadow-card', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-soft text-left text-xs uppercase tracking-wider text-text-muted">
            <tr>
              {columns.map((c, idx) => (
                <th key={idx} className={cn('px-4 py-3 font-semibold', c.className)}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {data.map((row) => (
              <tr key={row.id} className="bg-white transition-colors hover:bg-cream-soft/40">
                {columns.map((c, idx) => (
                  <td key={idx} className={cn('px-4 py-3 align-middle text-text-body', c.className)}>
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
