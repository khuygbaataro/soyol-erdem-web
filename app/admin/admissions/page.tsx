import Link from 'next/link';
import { Eye, GraduationCap, Inbox, Phone } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { AdmissionSendButton } from '@/components/admin/AdmissionSendButton';
import { AdmissionNoteControls } from '@/components/admin/AdmissionNoteControls';
import { prisma } from '@/lib/prisma';
import { formatMNDate } from '@/lib/utils';

type Likelihood = '' | 'HIGH' | 'MID' | 'LOW';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Элсэлтийн анкет' };

/** Admission ankets are stored in ContactSubmission with the subject
 *  prefixed "Элсэлтийн анкет —" and the program / degree embedded in the
 *  Markdown body (see app/api/admission-applications/route.ts). We parse
 *  those two fields back out so the inbox can be grouped by program. */
const SUBJECT_PREFIX = 'Элсэлтийн анкет';
const NO_PROGRAM = 'Бусад';

function parseField(message: string, label: string): string {
  return message.match(new RegExp(`${label}:\\s*(.+)`))?.[1]?.trim() ?? '';
}

type Anket = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  read: boolean;
  createdAt: Date;
  program: string;
  degree: string;
  sent: boolean;
  called: boolean;
  likelihood: Likelihood;
};

async function load(): Promise<Anket[]> {
  const rows = await prisma.contactSubmission
    .findMany({
      where: { subject: { startsWith: SUBJECT_PREFIX } },
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => [] as never[]);

  // Which ankets already had an email sent (from the list quick-send OR the
  // compose page) — used for the status badge and unsent-first sorting.
  const sentMsgs = await prisma.emailMessage
    .findMany({
      where: { contactSubmissionId: { in: rows.map((r) => r.id) }, status: 'SENT' },
      select: { contactSubmissionId: true },
    })
    .catch(() => [] as { contactSubmissionId: string | null }[]);
  const sentSet = new Set(sentMsgs.map((m) => m.contactSubmissionId));

  const ankets: Anket[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    read: r.read,
    createdAt: r.createdAt,
    program: parseField(r.message, 'Хөтөлбөр') || NO_PROGRAM,
    degree: parseField(r.message, 'Зэрэг'),
    sent: sentSet.has(r.id),
    called: r.called,
    likelihood: (r.enrollLikelihood ?? '') as Likelihood,
  }));

  // Илгээгээгүй нь дээр, илгээгдсэн нь доор; дотор нь шинэ → огноогоор.
  ankets.sort(
    (a, b) =>
      Number(a.sent) - Number(b.sent) ||
      Number(a.read) - Number(b.read) ||
      b.createdAt.getTime() - a.createdAt.getTime(),
  );
  return ankets;
}

export default async function AdminAdmissionsPage({
  searchParams,
}: {
  searchParams: { program?: string };
}) {
  const all = await load();

  // Count per program for the filter chips (only programs that actually
  // have ankets show up — no empty tabs).
  const counts = new Map<string, number>();
  for (const a of all) counts.set(a.program, (counts.get(a.program) ?? 0) + 1);
  const programs = Array.from(counts.entries()).sort((a, b) =>
    a[0] === NO_PROGRAM ? 1 : b[0] === NO_PROGRAM ? -1 : b[1] - a[1],
  );

  const active = searchParams.program;
  const items = active ? all.filter((a) => a.program === active) : all;
  const unread = items.filter((a) => !a.read).length;

  const columns: Column<Anket>[] = [
    {
      header: 'Нэр',
      cell: (a) => (
        <div className="min-w-0">
          <Link
            href={`/admin/messages/${a.id}`}
            className={
              'block max-w-xs truncate ' +
              (a.read
                ? 'text-text-body hover:text-navy-900'
                : 'font-semibold text-navy-900 hover:text-gold-500')
            }
          >
            {a.name}
          </Link>
          <p className="text-xs text-text-muted">{a.email}</p>
        </div>
      ),
    },
    {
      header: 'Хөтөлбөр',
      cell: (a) => (
        <span className="inline-flex items-center gap-1.5 rounded-button bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-navy-900">
          <GraduationCap className="h-3.5 w-3.5 text-gold-500" />
          {a.program}
        </span>
      ),
    },
    {
      header: 'Зэрэг',
      cell: (a) => <span className="text-xs text-text-body">{a.degree || '—'}</span>,
    },
    {
      header: 'Утас',
      cell: (a) =>
        a.phone ? (
          <span className="inline-flex items-center gap-1 text-xs text-text-body">
            <Phone className="h-3 w-3" />
            {a.phone}
          </span>
        ) : (
          <span className="text-xs text-text-muted">—</span>
        ),
    },
    {
      header: 'Утсаар / Элсэх магадлал',
      cell: (a) => (
        <AdmissionNoteControls
          submissionId={a.id}
          initialCalled={a.called}
          initialLikelihood={a.likelihood}
        />
      ),
    },
    {
      header: 'Статус',
      cell: (a) =>
        a.read ? (
          <Badge variant="outline">Уншсан</Badge>
        ) : (
          <Badge variant="gold">Шинэ</Badge>
        ),
    },
    {
      header: 'Имэйл',
      cell: (a) => (
        <AdmissionSendButton submissionId={a.id} initialSent={a.sent} />
      ),
    },
    {
      header: 'Огноо',
      cell: (a) => (
        <span className="text-xs text-text-muted">
          {formatMNDate(a.createdAt, {
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
      cell: (a) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/admin/messages/${a.id}`}
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/contact/${a.id}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Элсэлтийн анкет"
        subtitle={
          unread > 0
            ? `${unread} шинэ · нийт ${items.length}`
            : `Нийт ${items.length} анкет`
        }
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Элсэлтийн анкет' },
        ]}
        action={
          <span className="inline-flex items-center gap-2 rounded-button border border-border-light bg-cream-soft px-4 py-2 text-sm font-semibold text-text-body">
            <Inbox className="h-4 w-4 text-gold-500" />
            {unread} шинэ
          </span>
        }
      />

      {/* Program filter chips */}
      {programs.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <a
            href="/admin/admissions"
            className={
              'inline-flex items-center gap-2 rounded-button border px-4 py-2 text-sm font-semibold transition-colors ' +
              (!active
                ? 'border-navy-900 bg-navy-900 text-white'
                : 'border-border-light bg-white text-navy-900 hover:bg-cream-soft')
            }
          >
            Бүгд
            <span
              className={
                'rounded-full px-2 py-0.5 text-[10px] font-bold ' +
                (!active ? 'bg-white/20 text-white' : 'bg-cream text-text-muted')
              }
            >
              {all.length}
            </span>
          </a>
          {programs.map(([program, count]) => {
            const isActive = active === program;
            return (
              <a
                key={program}
                href={`/admin/admissions?program=${encodeURIComponent(program)}`}
                className={
                  'inline-flex items-center gap-2 rounded-button border px-4 py-2 text-sm font-semibold transition-colors ' +
                  (isActive
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : 'border-border-light bg-white text-navy-900 hover:bg-cream-soft')
                }
              >
                {program}
                <span
                  className={
                    'rounded-full px-2 py-0.5 text-[10px] font-bold ' +
                    (isActive ? 'bg-white/20 text-white' : 'bg-cream text-text-muted')
                  }
                >
                  {count}
                </span>
              </a>
            );
          })}
        </div>
      )}

      <DataTable
        data={items}
        columns={columns}
        empty="Одоогоор элсэлтийн анкет ирээгүй байна."
      />
    </>
  );
}
