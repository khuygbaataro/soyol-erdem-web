import Link from 'next/link';
import { Edit3, Eye, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';
import { NEWS_CATEGORY_LABEL } from '@/lib/admin-helpers';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ахлах сургууль · Мэдээ' };

type Row = Awaited<ReturnType<typeof loadNews>>[number];

async function loadNews() {
  return prisma.news.findMany({
    where: { site: 'HIGH_SCHOOL' },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  });
}

export default async function AdminHighSchoolNewsListPage() {
  const news = await loadNews().catch(() => [] as never[]);

  const columns: Column<Row>[] = [
    {
      header: 'Гарчиг',
      cell: (n) => (
        <div className="min-w-0">
          <Link
            href={`/admin/high-school/news/${n.id}/edit`}
            className="block max-w-xs truncate font-semibold text-navy-900 hover:text-gold-500"
          >
            {n.title}
          </Link>
          <p className="text-xs text-text-muted">/{n.slug}</p>
        </div>
      ),
    },
    {
      header: 'Ангилал',
      cell: (n) => <Badge variant="cream">{NEWS_CATEGORY_LABEL[n.category] ?? n.category}</Badge>,
    },
    {
      header: 'Статус',
      cell: (n) => <StatusBadge status={n.status} />,
    },
    {
      header: 'Зохиогч',
      cell: (n) => <span className="text-xs text-text-body">{n.author.name}</span>,
    },
    {
      header: 'Үзэлт',
      cell: (n) => <span className="text-xs text-text-muted">{n.views.toLocaleString()}</span>,
    },
    {
      header: 'Огноо',
      cell: (n) => (
        <span className="text-xs text-text-muted">
          {new Date(n.createdAt).toLocaleDateString('mn-MN')}
        </span>
      ),
    },
    {
      header: '',
      className: 'text-right',
      cell: (n) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/high-school/news/${n.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={`/admin/high-school/news/${n.id}/edit`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/news/${n.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Ахлах сургуулийн мэдээ"
        subtitle={`Нийт ${news.length} мэдээ`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Ахлах сургууль', href: '/admin/high-school' },
          { label: 'Мэдээ' },
        ]}
        action={
          <Button
            href="/admin/high-school/news/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Шинэ мэдээ
          </Button>
        }
      />

      <DataTable
        data={news}
        columns={columns}
        empty="Ахлах сургуулийн мэдээ байхгүй байна. Шинэ мэдээ нэмнэ үү."
      />
    </>
  );
}
