import Link from 'next/link';
import { AlertTriangle, Edit3, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

type Row = {
  id: string;
  key: string;
  icon: string;
  number: string;
  label: string;
  order: number;
  active: boolean;
};

async function safeLoad(): Promise<{ ok: boolean; items: Row[] }> {
  try {
    const items = await prisma.stat.findMany({ orderBy: { order: 'asc' } });
    return { ok: true, items: items as Row[] };
  } catch {
    return { ok: false, items: [] };
  }
}

function MigrationNotice() {
  return (
    <div className="rounded-card border border-amber-200 bg-amber-50 p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div className="space-y-3 text-sm">
          <h3 className="font-bold text-amber-900">
            Өгөгдлийн санд хүснэгт үүсгэгдээгүй байна
          </h3>
          <p className="text-amber-900/90">
            Доорх 4 командыг нэг удаа локалаас ажиллуулна:
          </p>
          <pre className="overflow-x-auto rounded-button bg-navy-900 px-4 py-3 text-xs leading-relaxed text-cream">
{`cd D:\\soyol-erdem-web
npx vercel env pull .env.local
npx prisma db push
npm run db:seed`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default async function AdminStatsListPage() {
  await requireRole(['ADMIN']);
  const { ok, items } = await safeLoad();

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
      {ok ? (
        <DataTable data={items} columns={columns} empty="Статистик алга." />
      ) : (
        <MigrationNotice />
      )}
    </>
  );
}
