import Link from 'next/link';
import { Eye, FileSignature, GraduationCap } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { ContractLinkButton } from '@/components/admin/ContractLinkButton';
import { prisma } from '@/lib/prisma';
import { formatMNDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Оюутны гэрээ' };

type Row = {
  id: string;
  token: string;
  name: string;
  program: string;
  classYear: string;
  status: 'PENDING' | 'SIGNED';
  officerSigned: boolean;
  createdAt: Date;
  signedAt: Date | null;
};

async function load(): Promise<Row[]> {
  const rows = await prisma.studentContract
    .findMany({ orderBy: [{ createdAt: 'desc' }] })
    .catch(() => [] as never[]);

  return rows.map((r) => ({
    id: r.id,
    token: r.token,
    name: `${r.lastName} ${r.firstName}`.trim() || '—',
    program: r.programName || '—',
    classYear: r.classYear,
    status: r.status,
    officerSigned: Boolean(r.schoolSignatureUrl),
    createdAt: r.createdAt,
    signedAt: r.signedAt,
  }));
}

export default async function AdminContractsPage() {
  const items = await load();
  const pending = items.filter((r) => r.status === 'PENDING').length;
  const signed = items.length - pending;

  const columns: Column<Row>[] = [
    {
      header: 'Оюутан',
      cell: (r) => (
        <Link
          href={`/admin/contracts/${r.token}`}
          className="block max-w-xs truncate font-semibold text-navy-900 hover:text-gold-500"
        >
          {r.name}
        </Link>
      ),
    },
    {
      header: 'Хөтөлбөр',
      cell: (r) => (
        <span className="inline-flex items-center gap-1.5 rounded-button bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-navy-900">
          <GraduationCap className="h-3.5 w-3.5 text-gold-500" />
          {r.program}
        </span>
      ),
    },
    {
      header: 'Анги',
      cell: (r) => <span className="text-xs text-text-body">{r.classYear}</span>,
    },
    {
      header: 'Төлөв',
      cell: (r) =>
        r.status === 'SIGNED' ? (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            Баталгаажсан
          </span>
        ) : r.officerSigned ? (
          <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
            Элсэгч хүлээгдэж буй
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
            Ажилтан хүлээгдэж буй
          </span>
        ),
    },
    {
      header: 'Огноо',
      cell: (r) => (
        <span className="text-xs text-text-muted">
          {formatMNDate(r.signedAt ?? r.createdAt, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      header: 'Холбоос',
      cell: (r) => <ContractLinkButton token={r.token} />,
    },
    {
      header: '',
      className: 'text-right',
      cell: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/geree/${r.token}`}
            target="_blank"
            className="inline-flex items-center gap-1 rounded-button px-2 py-1.5 text-xs text-text-muted hover:bg-cream-soft hover:text-navy-900"
            title="Гэрээ нээх"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
          <DeleteButton endpoint={`/api/geree/${r.token}`} label="" />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Оюутны гэрээ"
        subtitle={`Нийт ${items.length} · ${signed} баталгаажсан · ${pending} хүлээгдэж буй`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Оюутны гэрээ' },
        ]}
        action={
          <Link
            href="/admin/admissions"
            className="inline-flex items-center gap-2 rounded-button border border-border-light bg-cream-soft px-4 py-2 text-sm font-semibold text-text-body transition-colors hover:bg-cream"
          >
            <FileSignature className="h-4 w-4 text-gold-500" />
            Анкетаас гэрээ үүсгэх
          </Link>
        }
      />

      <DataTable
        data={items}
        columns={columns}
        empty="Одоогоор гэрээ үүсгээгүй байна. Элсэлтийн анкетаас гэрээ үүсгэнэ үү."
      />
    </>
  );
}
