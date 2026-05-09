import Link from 'next/link';
import { Edit3, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Нээлттэй ажлын байр' };

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.jobOpening.findMany({
    orderBy: [{ order: 'asc' }, { title: 'asc' }],
  });
}

export default async function AdminCareersPage() {
  const items = await load().catch(() => [] as never[]);

  const columns: Column<Row>[] = [
    {
      header: 'Албан тушаал',
      cell: (n) => (
        <div className="min-w-0">
          <Link
            href={`/admin/careers/${n.id}/edit`}
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
      cell: (n) =>
        n.active ? (
          <Badge variant="navy">Идэвхтэй</Badge>
        ) : (
          <Badge variant="cream">Нуугдсан</Badge>
        ),
    },
    {
      header: '',
      className: 'text-right',
      cell: (n) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/careers/${n.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/job-openings/${n.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Нээлттэй ажлын байр"
        subtitle={`Нийт ${items.length} албан тушаал`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Нээлттэй ажлын байр' },
        ]}
        action={
          <Button
            href="/admin/careers/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Шинэ ажлын байр
          </Button>
        }
      />

      <DataTable
        data={items}
        columns={columns}
        empty="Одоогоор ажлын байр нэмэгдээгүй байна. Шинэ ажлын байр нэмнэ үү."
      />
    </>
  );
}
