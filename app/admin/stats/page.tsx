import Link from 'next/link';
import { Edit3, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.stat.findMany({ orderBy: { order: 'asc' } });
}

export default async function AdminStatsListPage() {
  await requireRole(['ADMIN']);
  const items = await load();

  const columns: Column<Row>[] = [
    {
      header: 'Тайлбар',
      cell: (s) => (
        <div className="min-w-0">
          <Link
            href={`/admin/stats/${s.id}/edit`}
            className="block max-w-xs truncate font-semibold text-navy-900 hover:text-gold-500"
          >
            {s.label}
          </Link>
          <p className="text-xs text-text-muted">{s.key}</p>
        </div>
      ),
    },
    {
      header: 'Тоо',
      cell: (s) => <span className="text-base font-bold text-gold-500">{s.number}</span>,
    },
    { header: 'Icon', cell: (s) => <code className="text-xs">{s.icon}</code> },
    { header: 'Дараалал', cell: (s) => <span className="text-xs">{s.order}</span> },
    {
      header: 'Идэвхтэй',
      cell: (s) =>
        s.active ? (
          <Badge variant="navy">Идэвхтэй</Badge>
        ) : (
          <Badge variant="outline">Идэвхгүй</Badge>
        ),
    },
    {
      header: '',
      className: 'text-right',
      cell: (s) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/stats/${s.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/stats/${s.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Статистикууд"
        subtitle={`Нийт ${items.length} статистик`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Статистикууд' },
        ]}
        action={
          <Button
            href="/admin/stats/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Шинэ статистик
          </Button>
        }
      />
      <DataTable data={items} columns={columns} empty="Статистик алга." />
    </>
  );
}
