import Link from 'next/link';
import { Edit3, FileText, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';
import { RESEARCH_TYPE_LABEL } from '@/lib/admin-helpers';

export const dynamic = 'force-dynamic';

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.research.findMany({
    orderBy: { createdAt: 'desc' },
    include: { uploadedBy: { select: { name: true } } },
  });
}

export default async function AdminResearchListPage() {
  const items = await load();

  const columns: Column<Row>[] = [
    {
      header: 'Гарчиг',
      cell: (r) => (
        <div className="min-w-0">
          <Link
            href={`/admin/research/${r.id}/edit`}
            className="block max-w-xs truncate font-semibold text-navy-900 hover:text-gold-500"
          >
            {r.title}
          </Link>
          <p className="text-xs text-text-muted">{r.authors}</p>
        </div>
      ),
    },
    { header: 'Төрөл', cell: (r) => <Badge variant="cream">{RESEARCH_TYPE_LABEL[r.type]}</Badge> },
    { header: 'Хэсэг', cell: (r) => <span className="text-xs text-text-body">{r.area}</span> },
    { header: 'Статус', cell: (r) => <StatusBadge status={r.status} /> },
    {
      header: 'Файл',
      cell: (r) =>
        r.fileUrl ? (
          <a
            href={r.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-gold-500"
          >
            <FileText className="h-3.5 w-3.5" /> PDF
          </a>
        ) : (
          <span className="text-xs text-text-muted">—</span>
        ),
    },
    {
      header: 'Огноо',
      cell: (r) => (
        <span className="text-xs text-text-muted">
          {new Date(r.createdAt).toLocaleDateString('mn-MN')}
        </span>
      ),
    },
    {
      header: '',
      className: 'text-right',
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/research/${r.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/research/${r.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Эрдэм шинжилгээ"
        subtitle={`Нийт ${items.length} нийтлэл`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Эрдэм шинжилгээ' },
        ]}
        action={
          <Button
            href="/admin/research/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Шинэ нийтлэл
          </Button>
        }
      />
      <DataTable data={items} columns={columns} empty="Нийтлэл байхгүй байна." />
    </>
  );
}
