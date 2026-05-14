import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Inbox,
  Microscope,
  Plus,
  Users as UsersIcon,
} from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const StatCard = ({
  icon: Icon,
  label,
  value,
  hint,
  href,
}: {
  icon: typeof FileText;
  label: string;
  value: number | string;
  hint?: string;
  href: string;
}) => (
  <Link
    href={href}
    className="group flex h-full flex-col rounded-card border border-border-light bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
  >
    <div className="flex items-center justify-between">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
        Үзэх →
      </span>
    </div>
    <p className="mt-4 text-3xl font-bold text-navy-900">{value}</p>
    <p className="mt-1 text-sm text-text-body">{label}</p>
    {hint && (
      <p className="mt-2 text-xs font-semibold text-gold-500">{hint}</p>
    )}
  </Link>
);

export default async function DashboardPage() {
  const session = await auth();
  const user = session!.user;

  // Main admin only counts university-side content. High-school metrics
  // live in the standalone /high-school/admin dashboard.
  const [newsCount, publishedNewsCount, libraryCount, researchCount, contactCount, recentNews, recentContacts] =
    await Promise.all([
      prisma.news.count({ where: { site: 'UNIVERSITY' } }),
      prisma.news.count({ where: { site: 'UNIVERSITY', status: 'PUBLISHED' } }),
      prisma.libraryBook.count(),
      prisma.research.count(),
      prisma.contactSubmission.count({ where: { read: false } }),
      prisma.news.findMany({
        where: { site: 'UNIVERSITY' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { author: { select: { name: true } } },
      }),
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

  const totalViews = (
    await prisma.news.aggregate({
      where: { site: 'UNIVERSITY' },
      _sum: { views: true },
    })
  )._sum.views ?? 0;

  return (
    <>
      <PageHeader
        title={`Сайн байна уу, ${user.name}`}
        subtitle="Сургуулийн сайтын админ хэсэг."
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FileText}
          label="Нийт мэдээ"
          value={newsCount}
          hint={`${publishedNewsCount} нийтлэгдсэн`}
          href="/admin/news"
        />
        <StatCard
          icon={BookOpen}
          label="Номын сан"
          value={libraryCount}
          href="/admin/library"
        />
        <StatCard
          icon={Microscope}
          label="Эрдэм шинжилгээ"
          value={researchCount}
          href="/admin/research"
        />
        <StatCard
          icon={Inbox}
          label="Шинэ зурвас"
          value={contactCount}
          hint={`Нийт уншсан ${totalViews.toLocaleString()}`}
          href="/admin/messages"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Recent news */}
        <Card hover={false}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy-900">Сүүлийн мэдээ</h2>
            <Link
              href="/admin/news"
              className="text-xs font-semibold text-navy-900 hover:text-gold-500"
            >
              Бүгдийг үзэх →
            </Link>
          </div>
          {recentNews.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">
              Одоохондоо мэдээ байхгүй байна.
            </p>
          ) : (
            <ul className="divide-y divide-border-light">
              {recentNews.map((n) => (
                <li key={n.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/news/${n.id}/edit`}
                      className="block truncate text-sm font-semibold text-navy-900 hover:text-gold-500"
                    >
                      {n.title}
                    </Link>
                    <p className="text-xs text-text-muted">
                      {n.author.name} · {new Date(n.createdAt).toLocaleDateString('mn-MN')}
                    </p>
                  </div>
                  <StatusBadge status={n.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Right rail */}
        <div className="space-y-6">
          <Card hover={false}>
            <h2 className="mb-4 text-lg font-bold text-navy-900">Хурдан үйлдэл</h2>
            <div className="grid gap-2">
              {[
                { label: 'Шинэ мэдээ', href: '/admin/news/new', icon: FileText },
                { label: 'Ном нэмэх', href: '/admin/library/new', icon: BookOpen },
                { label: 'Нийтлэл нэмэх', href: '/admin/research/new', icon: Microscope },
                ...(user.role === 'ADMIN'
                  ? [{ label: 'Хэрэглэгч нэмэх', href: '/admin/users/new', icon: UsersIcon }]
                  : []),
              ].map((q) => {
                const Icon = q.icon;
                return (
                  <Button
                    key={q.href}
                    href={q.href}
                    variant="outline"
                    size="sm"
                    icon={<Plus className="h-3.5 w-3.5" />}
                    iconPosition="left"
                    className="justify-start"
                  >
                    {q.label}
                  </Button>
                );
              })}
            </div>
          </Card>

          <Card hover={false}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy-900">Сүүлийн зурвас</h2>
              <Link
                href="/admin/messages"
                className="text-xs font-semibold text-navy-900 hover:text-gold-500"
              >
                Бүгдийг үзэх →
              </Link>
            </div>
            {recentContacts.length === 0 ? (
              <p className="py-6 text-center text-xs text-text-muted">
                Зурвас байхгүй.
              </p>
            ) : (
              <ul className="divide-y divide-border-light">
                {recentContacts.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/admin/messages/${c.id}`}
                      className="flex flex-col py-2.5 transition-colors hover:text-gold-500"
                    >
                      <p
                        className={
                          c.read
                            ? 'truncate text-sm text-text-body'
                            : 'truncate text-sm font-semibold text-navy-900'
                        }
                      >
                        {c.name}
                      </p>
                      <p className="truncate text-xs text-text-muted">
                        {c.subject} ·{' '}
                        {new Date(c.createdAt).toLocaleString('mn-MN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
