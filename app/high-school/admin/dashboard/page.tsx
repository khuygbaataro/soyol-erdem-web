import Link from 'next/link';
import { ArrowRight, Calendar, FileText, School } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { prisma } from '@/lib/prisma';
import { NEWS_CATEGORY_LABEL } from '@/lib/admin-helpers';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Самбар' };

/**
 * High-school admin dashboard. Same data and layout as the equivalent
 * page under the main admin (/admin/high-school), but lives in the
 * standalone shell so editors who signed in at /high-school/login
 * never see the main university admin chrome.
 */
export default async function HighSchoolAdminDashboardPage() {
  const [total, published, draft, latest] = await Promise.all([
    prisma.news.count({ where: { site: 'HIGH_SCHOOL' } }).catch(() => 0),
    prisma.news
      .count({ where: { site: 'HIGH_SCHOOL', status: 'PUBLISHED' } })
      .catch(() => 0),
    prisma.news
      .count({ where: { site: 'HIGH_SCHOOL', status: 'DRAFT' } })
      .catch(() => 0),
    prisma.news
      .findMany({
        where: { site: 'HIGH_SCHOOL' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { author: { select: { name: true } } },
      })
      .catch(() => [] as never[]),
  ]);

  return (
    <>
      <PageHeader
        title="Ахлах сургууль"
        subtitle="Соёл Эрдэм Ерөнхий боловсролын ахлах сургуулийн контент"
        breadcrumb={[{ label: 'Самбар' }]}
        action={
          <Button
            href="/high-school/admin/news/new"
            variant="primary"
            size="md"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Шинэ мэдээ
          </Button>
        }
      />

      <div className="grid gap-5 md:grid-cols-3">
        <Card hover={false}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
            <School className="h-5 w-5" />
          </span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
            Нийт мэдээ
          </p>
          <p className="mt-1 text-3xl font-bold text-navy-900">{total}</p>
        </Card>
        <Card hover={false}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
            <FileText className="h-5 w-5" />
          </span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
            Нийтлэгдсэн
          </p>
          <p className="mt-1 text-3xl font-bold text-navy-900">{published}</p>
        </Card>
        <Card hover={false}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
            <Calendar className="h-5 w-5" />
          </span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
            Ноорог
          </p>
          <p className="mt-1 text-3xl font-bold text-navy-900">{draft}</p>
        </Card>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">Сүүлд нэмсэн мэдээ</h2>
          <Link
            href="/high-school/admin/news"
            className="text-sm font-semibold text-navy-900 hover:text-gold-500"
          >
            Бүгдийг үзэх →
          </Link>
        </div>

        {latest.length === 0 ? (
          <Card hover={false} className="text-center text-sm text-text-muted">
            Одоохондоо ахлах сургуулийн мэдээ байхгүй байна.
            <br />
            <Link
              href="/high-school/admin/news/new"
              className="mt-2 inline-block font-semibold text-navy-900 hover:text-gold-500"
            >
              Эхний мэдээгээ нэмэх →
            </Link>
          </Card>
        ) : (
          <ul className="space-y-2">
            {latest.map((n) => (
              <li
                key={n.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-border-light bg-white px-5 py-3 shadow-card"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/high-school/admin/news/${n.id}/edit`}
                    className="block max-w-md truncate font-semibold text-navy-900 hover:text-gold-500"
                  >
                    {n.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-text-muted">
                    /{n.slug} · {n.author.name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="cream">
                    {NEWS_CATEGORY_LABEL[n.category] ?? n.category}
                  </Badge>
                  <StatusBadge status={n.status} />
                  <span className="text-xs text-text-muted">
                    {new Date(n.createdAt).toLocaleDateString('mn-MN')}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
