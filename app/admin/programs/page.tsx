import Link from 'next/link';
import { Edit3, Eye, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.program.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
}

export default async function AdminProgramsListPage() {
  const items = await load();

  const columns: Column<Row>[] = [
    {
      header: 'Нэр',
      cell: (p) => (
        <div className="min-w-0">
          <Link
            href={`/admin/programs/${p.id}/edit`}
            className="block max-w-xs truncate font-semibold text-navy-900 hover:text-gold-500"
          >
            {p.name}
          </Link>
          <p className="text-xs text-text-muted">/{p.slug}</p>
        </div>
      ),
    },
    { header: 'Зэрэг', cell: (p) => <Badge variant="cream">{p.degree}</Badge> },
    { header: 'Хугацаа', cell: (p) => <span className="text-sm">{p.duration}</span> },
    {
      header: 'Идэвхтэй',
      cell: (p) =>
        p.active ? (
          <Badge variant="navy">Идэвхтэй</Badge>
        ) : (
          <Badge variant="outline">Идэвхгүй</Badge>
        ),
    },
    {
      header: 'Дараалал',
      cell: (p) => <span className="text-xs text-text-muted">{p.order}</span>,
    },
    {
      header: '',
      className: 'text-right',
      cell: (p) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/programs/${p.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={`/admin/programs/${p.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/programs/${p.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Сургалтууд"
        subtitle={`Нийт ${items.length} сургалт`}
        breadcrumb={[{ label: 'Хянах самбар', href: '/admin/dashboard' }, { label: 'Сургалт' }]}
        action={
          <Button
            href="/admin/programs/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Шинэ сургалт
          </Button>
        }
      />
      <DataTable data={items} columns={columns} empty="Сургалт байхгүй байна." />
    </>
  );
}
