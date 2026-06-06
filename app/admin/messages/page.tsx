import Link from 'next/link';
import { Eye, Inbox, Mail, MailOpen, Phone } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';
import { formatMNDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Зурвас' };

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.contactSubmission.findMany({
    orderBy: [{ read: 'asc' }, { createdAt: 'desc' }],
  });
}

export default async function AdminMessagesPage() {
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
      header: 'Илгээгч',
      cell: (m) => (
        <div className="min-w-0">
          <Link
            href={`/admin/messages/${m.id}`}
            className={
              'block max-w-xs truncate ' +
              (m.read
                ? 'text-text-body hover:text-navy-900'
                : 'font-semibold text-navy-900 hover:text-gold-500')
            }
          >
            {m.name}
          </Link>
          <p className="text-xs text-text-muted">{m.email}</p>
        </div>
      ),
    },
    {
      header: 'Сэдэв',
      cell: (m) => (
        <div className="min-w-0">
          <Link
            href={`/admin/messages/${m.id}`}
            className={cn(
              'block max-w-md truncate',
              m.read ? 'text-text-body' : 'font-semibold text-navy-900',
            )}
          >
            {m.subject}
          </Link>
          <p className="line-clamp-1 text-xs text-text-muted">{m.message}</p>
        </div>
      ),
    },
    {
      header: 'Утас',
      cell: (m) =>
        m.phone ? (
          <span className="inline-flex items-center gap-1 text-xs text-text-body">
            <Phone className="h-3 w-3" />
            {m.phone}
          </span>
        ) : (
          <span className="text-xs text-text-muted">—</span>
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
            href={`/admin/messages/${m.id}`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/contact/${m.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Зурвас"
        subtitle={
          unreadCount > 0
            ? `${unreadCount} шинэ · нийт ${items.length}`
            : `Нийт ${items.length} зурвас`
        }
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Зурвас' },
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
        empty="Хараахан зурвас ирээгүй байна."
      />
    </>
  );
}

// Tiny inline helper used in the subject column class string — duplicated
// here to avoid pulling utils into a server file that only needs string concat.
function cn(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(' ');
}
