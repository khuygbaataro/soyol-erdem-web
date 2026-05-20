import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  GraduationCap,
  Mail,
  MailOpen,
  MessageSquareText,
  Phone,
  Reply,
  School,
  User,
  Users,
} from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Элсэлтийн хүсэлт' };

const TRACK_LABEL: Record<string, string> = {
  japan: 'Япон хэл, соёл',
  it: 'Мэдээллийн технологи',
  other: 'Бусад / Хосолсон',
};

export default async function HighSchoolApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await prisma.highSchoolApplication.findUnique({
    where: { id: params.id },
  });
  if (!item) notFound();

  // Auto-mark as read on first view (fire-and-forget).
  if (!item.read) {
    prisma.highSchoolApplication
      .update({ where: { id: item.id }, data: { read: true } })
      .catch(() => {});
  }

  const date = new Date(item.createdAt);

  return (
    <>
      <PageHeader
        title={item.studentName}
        subtitle={`Хүсэлт хүлээж авсан · ${date.toLocaleString('mn-MN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/high-school/admin/dashboard' },
          { label: 'Элсэлтийн хүсэлт', href: '/high-school/admin/applications' },
          { label: item.studentName.slice(0, 40) + (item.studentName.length > 40 ? '…' : '') },
        ]}
        action={
          <Link
            href="/high-school/admin/applications"
            className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
          >
            <ArrowLeft className="h-4 w-4" />
            Бүх хүсэлт
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Main body — student + family + notes */}
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
                10-р ангид элсэх хүсэлт
              </p>
              <h2 className="mt-0.5 text-lg font-bold leading-tight text-navy-900">
                {item.studentName}
              </h2>
            </div>
            {item.read ? (
              <Badge variant="outline">Уншсан</Badge>
            ) : (
              <Badge variant="gold">Шинэ</Badge>
            )}
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailField
              icon={Calendar}
              label="Төрсөн он, сар, өдөр"
              value={item.studentBirth}
            />
            <DetailField
              icon={School}
              label="Одоо суралцаж буй сургууль"
              value={item.currentSchool}
            />
            <DetailField
              icon={BookOpen}
              label="9-р ангийн дундаж голч"
              value={item.currentGpa}
            />
            <DetailField
              icon={GraduationCap}
              label="Сонирхож буй чиглэл"
              value={item.track ? TRACK_LABEL[item.track] ?? item.track : null}
            />
          </dl>

          {item.message && (
            <div className="mt-6 rounded-card border border-border-light bg-cream-soft p-5">
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-500">
                <MessageSquareText className="h-3.5 w-3.5" />
                Нэмэлт асуулт / тайлбар
              </p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-text-body">
                {item.message}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              href={`tel:${item.phone.replace(/\D/g, '')}`}
              variant="primary"
              size="md"
              icon={<Phone className="h-4 w-4" />}
              iconPosition="left"
            >
              Утсаар залгах
            </Button>
            {item.email && (
              <Button
                href={`mailto:${item.email}?subject=${encodeURIComponent(
                  'Соёл Эрдэм сургуулийн элсэлт — ' + item.studentName,
                )}`}
                variant="outline"
                size="md"
                icon={<Reply className="h-4 w-4" />}
                iconPosition="left"
              >
                И-мэйл илгээх
              </Button>
            )}
            <DeleteButton
              endpoint={`/api/high-school/applications/${item.id}`}
              label="Хүсэлт устгах"
              redirectTo="/high-school/admin/applications"
            />
          </div>
        </Card>

        {/* Family / guardian info */}
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">
            Эцэг эх / Асран хамгаалагч
          </h3>
          <dl className="space-y-4 text-sm">
            <SidebarField
              icon={Users}
              label="Овог нэр"
              value={item.guardianName}
              bold
            />
            {item.guardianRel && (
              <SidebarField
                icon={User}
                label="Сурагчтай хамаарал"
                value={item.guardianRel}
              />
            )}
            <SidebarField
              icon={Phone}
              label="Утас"
              value={item.phone}
              link={`tel:${item.phone.replace(/\D/g, '')}`}
            />
            {item.email && (
              <SidebarField
                icon={Mail}
                label="И-мэйл"
                value={item.email}
                link={`mailto:${item.email}`}
              />
            )}
            <SidebarField
              icon={Calendar}
              label="Хүлээж авсан"
              value={date.toLocaleString('mn-MN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
          </dl>
        </Card>
      </div>
    </>
  );
}

function DetailField({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string | null | undefined;
}) {
  if (!value) {
    return (
      <div className="flex items-start gap-3 rounded-button border border-dashed border-border-light bg-white px-4 py-3 opacity-60">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-soft text-text-muted">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            {label}
          </p>
          <p className="mt-0.5 text-sm text-text-muted">—</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-3 rounded-button border border-border-light bg-white px-4 py-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-semibold text-navy-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function SidebarField({
  icon: Icon,
  label,
  value,
  link,
  bold,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  link?: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-widest text-text-muted">
          {label}
        </dt>
        <dd
          className={
            'mt-0.5 break-words ' +
            (bold ? 'font-semibold text-navy-900' : 'text-text-body')
          }
        >
          {link ? (
            <a href={link} className="font-semibold text-navy-900 hover:text-gold-500">
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </div>
    </div>
  );
}
