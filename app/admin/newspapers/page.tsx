import Link from 'next/link';
import { Edit3, Eye, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Сонин хэвлэл' };

type Row = Awaited<ReturnType<typeof loadList>>[number];

async function loadList() {
  return prisma.newspaper.findMany({ orderBy: { issueNumber: 'desc' } });
}

export default async function AdminNewspapersListPage() {
  const items = await loadList().catch(() => [] as never[]);

  const columns: Column<Row>[] = [
    {
      header: 'Дугаар',
      cell: (n) => (
        <Link
          href={`/admin/newspapers/${n.id}/edit`}
          className="font-bold text-navy-900 hover:text-gold-500"
        >
          №{n.issueNumber}
        </Link>
      ),
    },
    {
      header: 'Гарчиг',
      cell: (n) => (
        <span className="text-sm text-text-body">{n.title || '—'}</span>
      ),
    },
    {
      header: 'Статус',
      cell: (n) => <StatusBadge status={n.status} />,
    },
    {
      header: 'Гарсан',
      cell: (n) => (
        <span className="text-xs text-text-muted">
          {n.publishedAt
            ? new Date(n.publishedAt).toLocaleDateString('mn-MN')
            : '—'}
        </span>
      ),
    },
    {
      header: 'Үзэлт',
      cell: (n) => (
        <span className="text-xs text-text-muted">
          {n.views.toLocaleString()}
        </span>
      ),
    },
    {
      header: '',
      className: 'text-right',
      cell: (n) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/sonin-hewlel/${n.id}`}
            target="_blank"
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
            aria-label="Уншигчид харагдах байдлаар нээх"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={`/admin/newspapers/${n.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/newspapers/${n.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Сонин хэвлэл"
        subtitle={`Нийт ${items.length} дугаар`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Сонин хэвлэл' },
        ]}
        action={
          <Button
            href="/admin/newspapers/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Шинэ дугаар
          </Button>
        }
      />

      <DataTable
        data={items}
        columns={columns}
        empty="Сонин хэвлэлийн дугаар байхгүй байна. Шинэ дугаар нэмнэ үү."
      />
    </>
  );
}
