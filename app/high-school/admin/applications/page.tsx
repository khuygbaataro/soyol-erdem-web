import Link from 'next/link';
import { Eye, GraduationCap, Inbox, Mail, MailOpen, Phone } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';
import { formatMNDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Элсэлтийн хүсэлт' };

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.highSchoolApplication.findMany({
    orderBy: [{ read: 'asc' }, { createdAt: 'desc' }],
  });
}

const TRACK_LABEL: Record<string, string> = {
  japan: 'Япон хэл, соёл',
  it: 'Мэдээллийн технологи',
  other: 'Бусад / Хосолсон',
};

export default async function HighSchoolAdminApplicationsPage() {
  const items = await load().catch(() => [] as never[]);
  const unreadCount = items.filter((m) => !m.read).length;

  const columns: Column<Row>[] = [
    {
      header: '',
      cell: (m) => (
        <span
          className={
            'flex h-9 w-9 items-center justify-center rounded-full ' +
            (m.read
              ? 'bg-cream-soft text-text-muted'
              : 'bg-gold-500/15 text-gold-500')
          }
          aria-label={m.read ? 'Уншсан' : 'Шинэ'}
        >
          {m.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
        </span>
      ),
    },
    {
      header: 'Сурагч',
      cell: (m) => (
        <div className="min-w-0">
          <Link
            href={`/high-school/admin/applications/${m.id}`}
            className={
              'block max-w-xs truncate ' +
              (m.read
                ? 'text-text-body hover:text-navy-900'
                : 'font-semibold text-navy-900 hover:text-gold-500')
            }
          >
            {m.studentName}
          </Link>
          {m.currentSchool && (
            <p className="line-clamp-1 text-xs text-text-muted">
              {m.currentSchool}
            </p>
          )}
        </div>
      ),
    },
    {
      header: 'Чиглэл',
      cell: (m) =>
        m.track ? (
          <span className="inline-flex items-center gap-1 text-xs text-text-body">
            <GraduationCap className="h-3 w-3 text-gold-500" />
            {TRACK_LABEL[m.track] ?? m.track}
          </span>
        ) : (
          <span className="text-xs text-text-muted">—</span>
        ),
    },
    {
      header: 'Эцэг эх / Утас',
      cell: (m) => (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-navy-900">
            {m.guardianName}
          </p>
          <p className="inline-flex items-center gap-1 text-xs text-text-body">
            <Phone className="h-3 w-3" />
            {m.phone}
          </p>
        </div>
      ),
    },
    {
      header: 'Статус',
      cell: (m) =>
        m.read ? (
          <Badge variant="outline">Уншсан</Badge>
        ) : (
          <Badge variant="gold">Шинэ</Badge>
        ),
    },
    {
      header: 'Огноо',
      cell: (m) => (
        <span className="text-xs text-text-muted">
          {formatMNDate(m.createdAt, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      header: '',
      className: 'text-right',
      cell: (m) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/high-school/admin/applications/${m.id}`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/high-school/applications/${m.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Элсэлтийн хүсэлт"
        subtitle={
          unreadCount > 0
            ? `${unreadCount} шинэ · нийт ${items.length}`
            : `Нийт ${items.length} хүсэлт`
        }
        breadcrumb={[
          { label: 'Хянах самбар', href: '/high-school/admin/dashboard' },
          { label: 'Элсэлтийн хүсэлт' },
        ]}
        action={
          <span className="inline-flex items-center gap-2 rounded-button border border-border-light bg-cream-soft px-4 py-2 text-sm font-semibold text-text-body">
            <Inbox className="h-4 w-4 text-gold-500" />
            {unreadCount} шинэ
          </span>
        }
      />

      <DataTable
        data={items}
        columns={columns}
        empty="Хараахан элсэлтийн хүсэлт ирээгүй байна."
      />
    </>
  );
}
