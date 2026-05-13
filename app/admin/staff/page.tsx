import Image from 'next/image';
import Link from 'next/link';
import { Edit3, Plus, User } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { Badge } from '@/components/ui/Badge';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ажилтнууд' };

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.staff.findMany({
    orderBy: [{ order: 'asc' }, { position: 'asc' }],
  });
}

export default async function AdminStaffListPage() {
  const items = await load().catch(() => [] as never[]);

  const columns: Column<Row>[] = [
    {
      header: '',
      cell: (s) => (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream-soft text-navy-900">
          {s.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.photo} alt={s.name} className="h-full w-full object-cover" />
          ) : (
            <User className="h-5 w-5" />
          )}
        </div>
      ),
    },
    {
      header: 'Нэр',
      cell: (s) => (
        <Link
          href={`/admin/staff/${s.id}/edit`}
          className="font-semibold text-navy-900 hover:text-gold-500"
        >
          {s.name}
        </Link>
      ),
    },
    {
      header: 'Албан тушаал',
      cell: (s) => (
        <div className="min-w-0">
          <p className="text-sm text-text-body">{s.position}</p>
          <p className="text-xs text-text-muted">{s.positionKey}</p>
        </div>
      ),
    },
    {
      header: 'Зэрэг',
      cell: (s) => (
        <span className="text-xs text-text-body">{s.degree ?? '—'}</span>
      ),
    },
    {
      header: 'Статус',
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
            href={`/admin/staff/${s.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/staff/${s.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Ажилтнууд"
        subtitle={`Нийт ${items.length} ажилтан · Бүтэц, зохион байгуулалт хуудсанд харагдана`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Ажилтнууд' },
        ]}
        action={
          <Button
            href="/admin/staff/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Шинэ ажилтан
          </Button>
        }
      />

      <DataTable
        data={items}
        columns={columns}
        empty="Ажилтны мэдээлэл хараахан оруулагдаагүй байна."
      />
    </>
  );
}
