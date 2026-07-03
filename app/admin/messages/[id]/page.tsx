import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Mail, MailOpen, Phone, User } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { ComposeEmail, type SentEmail } from '@/components/admin/ComposeEmail';
import { MarkReadToggle } from './MarkReadToggle';
import { prisma } from '@/lib/prisma';
import { categoryForProgram, matchProgram } from '@/lib/program-email';
import { formatMNDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Зурвас' };

export default async function MessageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await prisma.contactSubmission.findUnique({
    where: { id: params.id },
  });
  if (!item) notFound();

  // Auto-mark as read on first view (fire-and-forget).
  if (!item.read) {
    prisma.contactSubmission
      .update({ where: { id: item.id }, data: { read: true } })
      .catch(() => {});
  }

  const date = new Date(item.createdAt);

  // Admission ankets embed "Хөтөлбөр: <name>" in the body. Parse it to
  // pre-fill {{programName}} and auto-suggest the matching email template
  // (via the program's department). General contact messages skip this.
  const programName = item.message.match(/Хөтөлбөр:\s*(.+)/)?.[1]?.trim() ?? '';
  let suggestedCategory: string | null = null;
  if (programName) {
    const programs = await prisma.program
      .findMany({ select: { name: true, department: true, slug: true } })
      .catch(() => []);
    const prog = matchProgram(programName, programs);
    suggestedCategory = prog ? categoryForProgram(prog) : null;
  }

  const sentRows = await prisma.emailMessage
    .findMany({
      where: { contactSubmissionId: item.id },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    .catch(() => []);
  const sent: SentEmail[] = sentRows.map((m) => ({
    id: m.id,
    toEmail: m.toEmail,
    subject: m.subject,
    status: m.status,
    errorText: m.errorText,
    aiAssisted: m.aiAssisted,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <>
      <PageHeader
        title={item.subject}
        subtitle={`${item.name} · ${formatMNDate(date, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Зурвас', href: '/admin/messages' },
          { label: item.subject.slice(0, 40) + (item.subject.length > 40 ? '…' : '') },
        ]}
        action={
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
          >
            <ArrowLeft className="h-4 w-4" />
            Бүх зурвас
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Body */}
        <Card hover={false}>
          <div className="mb-5 flex items-center gap-3">
            {item.read ? (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-soft text-text-muted">
                <MailOpen className="h-5 w-5" />
              </span>
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Mail className="h-5 w-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Сэдэв
              </p>
              <h2 className="mt-0.5 text-lg font-bold leading-tight text-navy-900">
                {item.subject}
              </h2>
            </div>
            {item.read ? (
              <Badge variant="outline">Уншсан</Badge>
            ) : (
              <Badge variant="gold">Шинэ</Badge>
            )}
          </div>

          <div className="rounded-card border border-border-light bg-cream-soft p-5">
            <p className="whitespace-pre-line text-sm leading-relaxed text-text-body">
              {item.message}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <MarkReadToggle id={item.id} initialRead={true /* now read after view */} />
            <DeleteButton
              endpoint={`/api/contact/${item.id}`}
              label="Зурвас устгах"
              redirectTo="/admin/messages"
            />
          </div>
        </Card>

        {/* Sender info */}
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">
            Илгээгч
          </h3>
          <dl className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <User className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs uppercase tracking-widest text-text-muted">
                  Нэр
                </dt>
                <dd className="mt-0.5 font-semibold text-navy-900">{item.name}</dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Mail className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs uppercase tracking-widest text-text-muted">
                  И-мэйл
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${item.email}`}
                    className="break-all font-semibold text-navy-900 hover:text-gold-500"
                  >
                    {item.email}
                  </a>
                </dd>
              </div>
            </div>

            {item.phone && (
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs uppercase tracking-widest text-text-muted">
                    Утас
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href={`tel:${item.phone.replace(/\D/g, '')}`}
                      className="font-semibold text-navy-900 hover:text-gold-500"
                    >
                      {item.phone}
                    </a>
                  </dd>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Calendar className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs uppercase tracking-widest text-text-muted">
                  Хүлээж авсан
                </dt>
                <dd className="mt-0.5 text-text-body">
                  {formatMNDate(date, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </dd>
              </div>
            </div>
          </dl>
        </Card>
      </div>

      <div className="mt-6">
        <ComposeEmail
          submissionId={item.id}
          toEmail={item.email}
          toName={item.name}
          defaultSubject={`Re: ${item.subject}`}
          submissionText={item.message}
          programName={programName}
          suggestedCategory={suggestedCategory}
          initialSent={sent}
        />
      </div>
    </>
  );
}
