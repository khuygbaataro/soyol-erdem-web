import Link from 'next/link';
import {
  AlertTriangle,
  Award,
  Eye,
  GraduationCap,
  Inbox,
  Paperclip,
  Phone,
} from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { AdmissionSendButton } from '@/components/admin/AdmissionSendButton';
import { AdmissionContractButton } from '@/components/admin/AdmissionContractButton';
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

/**
 * Хэдэн хоногийн дараа "анхаарах" болгох вэ. Анкет ирснээс хойш энэ
 * хугацаа өнгөрсөн ч ямар нэг үр дүн (элсэх магадлал эсвэл тэмдэглэл)
 * бичигдээгүй бол элсэлт хариуцсан ажилтанд сануулж тодотгоно.
 */
const ATTENTION_DAYS = 3;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Элсэлтийн босго: ЭЕШ-ийн оноо `PASS_SCORE`-оос дээш хичээл
 * `PASS_SUBJECTS`-аас олон байвал босго давсанд тооцно. Босгыг хангаагүй
 * ч дараа нь ЭЕШ дахин өгч болох тул сөрөг тэмдэглэгээ хийхгүй — зөвхөн
 * давсныг нь ялган тодотгоно.
 */
const PASS_SCORE = 490;
const PASS_SUBJECTS = 2;

function parseField(message: string, label: string): string {
  return message.match(new RegExp(`${label}:\\s*(.+)`))?.[1]?.trim() ?? '';
}

/**
 * Анкетын биетээс ЭЕШ-ийн оноог задална. Мөрүүд нь
 * `  • Математик: 427` хэлбэртэй (app/api/admission-applications/route.ts).
 */
function parseExamScores(message: string): { subject: string; score: number }[] {
  const out: { subject: string; score: number }[] = [];
  for (const m of message.matchAll(/^\s*•\s*(.+?):\s*([\d]+(?:[.,]\d+)?)\s*$/gm)) {
    const score = Number(m[2].replace(',', '.'));
    if (!Number.isNaN(score)) out.push({ subject: m[1].trim(), score });
  }
  return out;
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
  /** Элсэгчийн нас (анкетаас задалсан). Хуучин анкетад байхгүй. */
  age: string;
  sent: boolean;
  called: boolean;
  likelihood: Likelihood;
  noAnswerCount: number;
  note: string;
  /** Анкет ирснээс хойш өнгөрсөн бүтэн хоног. */
  daysOld: number;
  /** ATTENTION_DAYS хоног өнгөрсөн ч үр дүн бичигдээгүй. */
  needsAttention: boolean;
  /** PASS_SCORE-оос дээш оноотой хичээлийн тоо. */
  highScoreCount: number;
  /** Босго давсан эсэх (PASS_SUBJECTS-аас олон хичээл). */
  passedThreshold: boolean;
  /** Hover-т харуулах бүх оноо — "Математик: 427 · Физик: 485". */
  examSummary: string;
  /** Элсэгч "ЭЕШ өгөөгүй" гэж сонгосон. */
  noExam: boolean;
  /** Хавсаргасан ЭЕШ-ийн үнэлгээний хуудасны холбоос. */
  examFileUrl: string | null;
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

  const now = Date.now();
  const ankets: Anket[] = rows.map((r) => {
    const likelihood = (r.enrollLikelihood ?? '') as Likelihood;
    const note = r.callNote ?? '';
    const daysOld = Math.floor((now - r.createdAt.getTime()) / DAY_MS);
    // Үр дүн гэж үзэх нөхцөл: элсэх магадлал тогтоосон ЭСВЭЛ тэмдэглэл
    // бичсэн. Зөвхөн "Ярьсан" дарсан ч юу ярьсан нь тодорхойгүй бол
    // тохиролцоонд хүрээгүйд тооцно.
    const hasOutcome = likelihood !== '' || note.trim() !== '';
    const scores = parseExamScores(r.message);
    const highScoreCount = scores.filter((s) => s.score >= PASS_SCORE).length;
    return {
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      read: r.read,
      createdAt: r.createdAt,
      program: parseField(r.message, 'Хөтөлбөр') || NO_PROGRAM,
      degree: parseField(r.message, 'Зэрэг'),
      age: parseField(r.message, 'Нас'),
      sent: sentSet.has(r.id),
      called: r.called,
      likelihood,
      noAnswerCount: r.noAnswerCount,
      note,
      daysOld,
      needsAttention: daysOld >= ATTENTION_DAYS && !hasOutcome,
      highScoreCount,
      passedThreshold: highScoreCount >= PASS_SUBJECTS,
      examSummary: scores.map((s) => `${s.subject}: ${s.score}`).join(' · '),
      noExam: /ЭЕШ өгөөгүй/.test(r.message),
      examFileUrl:
        r.message.match(/Үнэлгээний хуудас:\s*(\S+)/)?.[1]?.trim() ?? null,
    };
  });

  // Зөвхөн огноогоор эрэмбэлнэ — хамгийн сүүлийн (шинэ) огноо хамгийн
  // дээрээ. Илгээсэн/уншсан төлөвийг эрэмбэд тооцохгүй.
  ankets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return ankets;
}

export default async function AdminAdmissionsPage({
  searchParams,
}: {
  searchParams: { program?: string; attention?: string };
}) {
  const all = await load();

  // Count per program for the filter chips (only programs that actually
  // have ankets show up — no empty tabs). Хөтөлбөр тус бүрийн анхаарал
  // шаардсан тоог зэрэг гаргаж чипэн дээр улаанаар сануулна.
  const counts = new Map<string, number>();
  const warnCounts = new Map<string, number>();
  for (const a of all) {
    counts.set(a.program, (counts.get(a.program) ?? 0) + 1);
    if (a.needsAttention) {
      warnCounts.set(a.program, (warnCounts.get(a.program) ?? 0) + 1);
    }
  }
  const programs = Array.from(counts.entries()).sort((a, b) =>
    a[0] === NO_PROGRAM ? 1 : b[0] === NO_PROGRAM ? -1 : b[1] - a[1],
  );

  const active = searchParams.program;
  const onlyAttention = searchParams.attention === '1';

  let items = active ? all.filter((a) => a.program === active) : all;
  if (onlyAttention) items = items.filter((a) => a.needsAttention);

  const unread = items.filter((a) => !a.read).length;
  const totalWarn = all.filter((a) => a.needsAttention).length;

  /** Идэвхтэй шүүлтүүрийг хадгалан URL үүсгэнэ. */
  const buildHref = (program?: string, attention?: boolean) => {
    const p = new URLSearchParams();
    if (program) p.set('program', program);
    if (attention) p.set('attention', '1');
    const qs = p.toString();
    return qs ? `/admin/admissions?${qs}` : '/admin/admissions';
  };

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
          <div className="mt-1 flex flex-wrap items-center gap-1">
            {a.noExam ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2 py-0.5 text-[10px] font-bold text-text-muted ring-1 ring-border-light">
                <Award className="h-3 w-3" />
                ЭЕШ өгөөгүй
              </span>
            ) : (
              a.examSummary && (
                <span
                  title={`ЭЕШ — ${a.examSummary}`}
                  className={
                    'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ' +
                    (a.passedThreshold
                      ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300'
                      : 'bg-cream text-text-muted ring-1 ring-border-light')
                  }
                >
                  <Award className="h-3 w-3" />
                  {a.passedThreshold
                    ? `Босго давсан (${a.highScoreCount})`
                    : 'Босго хүрээгүй'}
                </span>
              )
            )}
            {a.examFileUrl && (
              <a
                href={a.examFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="ЭЕШ-ийн үнэлгээний хуудсыг нээх"
                className="inline-flex items-center gap-1 rounded-full bg-navy-900/5 px-2 py-0.5 text-[10px] font-bold text-navy-900 ring-1 ring-navy-900/20 hover:bg-navy-900/10"
              >
                <Paperclip className="h-3 w-3" />
                Үнэлгээ
              </a>
            )}
          </div>
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
      header: 'Зэрэг / Нас',
      cell: (a) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-text-body">{a.degree || '—'}</span>
          {a.age && (
            <span className="whitespace-nowrap text-[11px] font-semibold text-navy-900">
              {a.age} нас
            </span>
          )}
        </div>
      ),
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
      header: 'Утсаар / Элсэх магадлал / Тэмдэглэл',
      cell: (a) => (
        <AdmissionNoteControls
          submissionId={a.id}
          initialCalled={a.called}
          initialLikelihood={a.likelihood}
          initialNoAnswerCount={a.noAnswerCount}
          initialNote={a.note}
        />
      ),
    },
    {
      header: 'Статус',
      cell: (a) => (
        <div className="flex flex-col items-start gap-1.5">
          {a.needsAttention && (
            <span
              className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-700 ring-1 ring-red-300"
              title={`${a.daysOld} хоног болсон ч тэмдэглэл, элсэх магадлал бичигдээгүй байна`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Анхааруулга
            </span>
          )}
          {a.read ? (
            <Badge variant="outline">Уншсан</Badge>
          ) : (
            <Badge variant="gold">Шинэ</Badge>
          )}
        </div>
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
        <div className="flex flex-col gap-0.5">
          <span className="whitespace-nowrap text-xs text-text-muted">
            {formatMNDate(a.createdAt, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <span
            className={
              'whitespace-nowrap text-[11px] font-semibold ' +
              (a.needsAttention ? 'text-red-600' : 'text-text-muted')
            }
          >
            {a.daysOld === 0 ? 'Өнөөдөр' : `${a.daysOld} хоног болсон`}
          </span>
        </div>
      ),
    },
    {
      header: 'Гэрээ',
      cell: (a) => <AdmissionContractButton submissionId={a.id} />,
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

      {/* Анхаарал шаардсан анкетуудын сануулга */}
      {totalWarn > 0 && (
        <div className="mb-5 flex flex-col gap-3 rounded-card border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="text-sm font-bold text-red-800">
                {totalWarn} анкет хариу аваагүй хэвээр байна
              </p>
              <p className="text-xs text-red-700">
                Бүртгүүлээд {ATTENTION_DAYS}+ хоног болсон ч утсаар ярьсан
                тэмдэглэл, элсэх магадлал аль нь ч бичигдээгүй байна.
              </p>
            </div>
          </div>
          <a
            href={buildHref(active, !onlyAttention)}
            className={
              'inline-flex shrink-0 items-center justify-center gap-2 rounded-button px-4 py-2 text-sm font-bold transition-colors ' +
              (onlyAttention
                ? 'bg-white text-red-700 ring-1 ring-red-300 hover:bg-red-100'
                : 'bg-red-600 text-white hover:bg-red-700')
            }
          >
            {onlyAttention ? 'Бүгдийг харах' : 'Зөвхөн эдгээрийг харах'}
          </a>
        </div>
      )}

      {/* Program filter chips */}
      {programs.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <a
            href={buildHref(undefined, onlyAttention)}
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
            {totalWarn > 0 && (
              <span
                className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 ring-1 ring-red-300"
                title={`${totalWarn} анкет анхаарал шаардаж байна`}
              >
                <AlertTriangle className="h-3 w-3" />
                {totalWarn}
              </span>
            )}
          </a>
          {programs.map(([program, count]) => {
            const isActive = active === program;
            const warn = warnCounts.get(program) ?? 0;
            return (
              <a
                key={program}
                href={buildHref(program, onlyAttention)}
                className={
                  'inline-flex items-center gap-2 rounded-button border px-4 py-2 text-sm font-semibold transition-colors ' +
                  (isActive
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : warn > 0
                      ? 'border-red-300 bg-white text-navy-900 hover:bg-red-50'
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
                {warn > 0 && (
                  <span
                    className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 ring-1 ring-red-300"
                    title={`${warn} анкет ${ATTENTION_DAYS}+ хоног хариугүй`}
                  >
                    <AlertTriangle className="h-3 w-3" />
                    {warn}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}

      <DataTable
        data={items}
        columns={columns}
        rowClassName={(a) =>
          a.needsAttention
            ? 'bg-red-50/70 hover:bg-red-50 border-l-4 border-l-red-500'
            : undefined
        }
        empty={
          onlyAttention
            ? 'Анхаарал шаардсан анкет алга — бүгд хариу авсан байна. 👍'
            : 'Одоогоор элсэлтийн анкет ирээгүй байна.'
        }
      />
    </>
  );
}
