import Link from 'next/link';
import { Edit3, Eye, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Дүрэм журам' };

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.regulation.findMany({
    orderBy: [{ order: 'asc' }, { title: 'asc' }],
  });
}

export default async function AdminRegulationsPage() {
  const items = await load().catch(() => [] as never[]);

  const columns: Column<Row>[] = [
    {
      header: 'Гарчиг',
      cell: (n) => (
        <div className="min-w-0">
          <Link
            href={`/admin/regulations/${n.id}/edit`}
            className="block max-w-md truncate font-semibold text-navy-900 hover:text-gold-500"
          >
            {n.title}
          </Link>
          <p className="text-xs text-text-muted">/{n.slug}</p>
        </div>
      ),
    },
    {
      header: 'Тайлбар',
      cell: (n) => (
        <span className="line-clamp-2 max-w-md text-xs text-text-body">
          {n.description ?? '—'}
        </span>
      ),
    },
    {
      header: 'Эрэмбэ',
      cell: (n) => <span className="text-xs text-text-muted">{n.order}</span>,
    },
    {
      header: 'Статус',
      cell: (n) => <StatusBadge status={n.status} />,
    },
    {
      header: 'Үзэлт',
      cell: (n) => <span className="text-xs text-text-muted">{n.views.toLocaleString()}</span>,
    },
    {
      header: '',
      className: 'text-right',
      cell: (n) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/regulations/${n.id}`}
            target="_blank"
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={`/admin/regulations/${n.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/regulations/${n.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Дүрэм журам"
        subtitle={`Нийт ${items.length} журам`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Дүрэм журам' },
        ]}
        action={
          <Button
            href="/admin/regulations/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Шинэ журам
          </Button>
        }
      />

      <DataTable
        data={items}
        columns={columns}
        empty="Одоогоор журам нэмэгдээгүй байна. Шинэ журам нэмнэ үү."
      />
    </>
  );
}
