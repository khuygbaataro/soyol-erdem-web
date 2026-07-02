import Link from 'next/link';
import { Edit3, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { GenerateProgramTemplatesButton } from '@/components/admin/GenerateProgramTemplatesButton';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Имэйл загвар' };

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.emailTemplate.findMany({
    orderBy: [{ category: 'asc' }, { order: 'asc' }, { name: 'asc' }],
  });
}

export default async function AdminEmailTemplatesPage() {
  const items = await load().catch(() => [] as never[]);

  const columns: Column<Row>[] = [
    {
      header: 'Нэр',
      cell: (t) => (
        <div className="min-w-0">
          <Link
            href={`/admin/email-templates/${t.id}/edit`}
            className="block max-w-md truncate font-semibold text-navy-900 hover:text-gold-500"
          >
            {t.name}
          </Link>
          <p className="line-clamp-1 text-xs text-text-muted">{t.subject}</p>
        </div>
      ),
    },
    {
      header: 'Ангилал',
      cell: (t) => (
        <span className="rounded-button bg-cream-soft px-2 py-1 font-mono text-[11px] text-navy-900">
          {t.category}
        </span>
      ),
    },
    {
      header: 'Хэл',
      cell: (t) => <span className="text-xs text-text-muted">{t.locale}</span>,
    },
    {
      header: 'Эрэмбэ',
      cell: (t) => <span className="text-xs text-text-muted">{t.order}</span>,
    },
    {
      header: 'Статус',
      cell: (t) =>
        t.active ? (
          <Badge variant="navy">Идэвхтэй</Badge>
        ) : (
          <Badge variant="cream">Нуугдсан</Badge>
        ),
    },
    {
      header: '',
      className: 'text-right',
      cell: (t) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/email-templates/${t.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/email-templates/${t.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Имэйл загвар"
        subtitle={`Нийт ${items.length} загвар · элсэлтийн хариу имэйлд ашиглагдана`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Имэйл загвар' },
        ]}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <GenerateProgramTemplatesButton />
            <Button
              href="/admin/email-templates/new"
              variant="primary"
              size="md"
              icon={<Plus className="h-4 w-4" />}
              iconPosition="left"
            >
              Шинэ загвар
            </Button>
          </div>
        }
      />

      <DataTable
        data={items}
        columns={columns}
        empty="Одоогоор имэйл загвар нэмэгдээгүй байна. Шинэ загвар нэмнэ үү."
      />
    </>
  );
}
