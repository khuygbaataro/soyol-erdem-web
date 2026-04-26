import Link from 'next/link';
import { Edit3, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';
import { BOOK_LANGUAGE_LABEL } from '@/lib/admin-helpers';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type Row = Awaited<ReturnType<typeof loadBooks>>[number];

async function loadBooks() {
  return prisma.libraryBook.findMany({ orderBy: { createdAt: 'desc' } });
}

export default async function AdminLibraryPage() {
  const books = await loadBooks();

  const columns: Column<Row>[] = [
    {
      header: 'Гарчиг',
      cell: (b) => (
        <div className="min-w-0">
          <Link
            href={`/admin/library/${b.id}/edit`}
            className="block max-w-xs truncate font-semibold text-navy-900 hover:text-gold-500"
          >
            {b.title}
          </Link>
          {b.isbn && <p className="text-xs text-text-muted">ISBN: {b.isbn}</p>}
        </div>
      ),
    },
    { header: 'Зохиогч', cell: (b) => <span className="text-sm">{b.author}</span> },
    {
      header: 'Хэл',
      cell: (b) => <Badge variant="cream">{BOOK_LANGUAGE_LABEL[b.language]}</Badge>,
    },
    {
      header: 'Ангилал',
      cell: (b) => <span className="text-xs text-text-muted">{b.category}</span>,
    },
    {
      header: 'Үлдэгдэл',
      cell: (b) => (
        <span
          className={cn(
            'text-sm font-semibold',
            b.availableCopies > 0 ? 'text-navy-900' : 'text-red-600',
          )}
        >
          {b.availableCopies}/{b.totalCopies}
        </span>
      ),
    },
    {
      header: '',
      className: 'text-right',
      cell: (b) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/library/${b.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/library/${b.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Номын сан"
        subtitle={`Нийт ${books.length} ном`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Номын сан' },
        ]}
        action={
          <Button
            href="/admin/library/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Ном нэмэх
          </Button>
        }
      />

      <DataTable data={books} columns={columns} empty="Ном байхгүй байна." />
    </>
  );
}
