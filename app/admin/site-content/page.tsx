import { AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { SiteContentForm, type SiteContentItem } from '@/components/admin/SiteContentForm';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

const GROUP_LABELS: Record<string, string> = {
  home: 'Нүүр хуудас',
  about: 'Сургуулийн тухай',
  banners: 'Banner зургууд',
  research: 'Эрдэм шинжилгээ',
  'student-life': 'Оюутны амьдрал',
};

interface LoadResult {
  ok: boolean;
  items: SiteContentItem[];
  groups: { group: string; _count: number }[];
}

async function safeLoad(group: string): Promise<LoadResult> {
  try {
    const [items, groups] = await Promise.all([
      prisma.siteContent.findMany({ where: { group }, orderBy: { order: 'asc' } }),
      prisma.siteContent.groupBy({ by: ['group'], _count: true }),
    ]);
    return {
      ok: true,
      items: items as SiteContentItem[],
      groups: groups.map((g) => ({ group: g.group, _count: g._count as unknown as number })),
    };
  } catch {
    return { ok: false, items: [], groups: [] };
  }
}

function MigrationNotice() {
  return (
    <div className="rounded-card border border-amber-200 bg-amber-50 p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div className="space-y-3 text-sm">
          <h3 className="font-bold text-amber-900">
            Өгөгдлийн санд хүснэгт үүсгэгдээгүй байна
          </h3>
          <p className="text-amber-900/90">
            Шинэ функц нэмэгдсэн тул Neon DB-руу <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">SiteContent</code>{' '}
            болон <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">Stat</code>{' '}
            хүснэгт нэмэгдэх хэрэгтэй. Локалаас доорх 4 командыг нэг удаа ажиллуулна:
          </p>
          <pre className="overflow-x-auto rounded-button bg-navy-900 px-4 py-3 text-xs leading-relaxed text-cream">
{`cd D:\\soyol-erdem-web
npx vercel env pull .env.local
npx prisma db push
npm run db:seed`}
          </pre>
          <p className="text-xs text-amber-900/70">
            Үр дүнд "Site content (11)" болон "Stats (4)" гэсэн мөр гарч ирвэл амжилттай. Дараа нь энэ хуудсыг сэргээнэ үү.
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function AdminSiteContentPage({
  searchParams,
}: {
  searchParams: { group?: string };
}) {
  await requireRole(['ADMIN']);
  const group = searchParams.group ?? 'home';
  const { ok, items, groups } = await safeLoad(group);

  return (
    <>
      <PageHeader
        title="Хуудасны агуулга"
        subtitle="Hero текст, тайлбар, зургийг хуудас бүрд тус бүрд нь засна"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Хуудасны агуулга' },
        ]}
      />

      {!ok ? (
        <MigrationNotice />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            {groups.map((g) => {
              const isActive = g.group === group;
              return (
                <a
                  key={g.group}
                  href={`/admin/site-content?group=${g.group}`}
                  className={
                    'inline-flex items-center gap-2 rounded-button border px-4 py-2 text-sm font-semibold transition-colors ' +
                    (isActive
                      ? 'border-navy-900 bg-navy-900 text-white'
                      : 'border-border-light bg-white text-navy-900 hover:bg-cream-soft')
                  }
                >
                  {GROUP_LABELS[g.group] ?? g.group}
                  <span
                    className={
                      'rounded-full px-2 py-0.5 text-[10px] font-bold ' +
                      (isActive ? 'bg-white/20 text-white' : 'bg-cream text-text-muted')
                    }
                  >
                    {g._count}
                  </span>
                </a>
              );
            })}
          </div>

          <SiteContentForm
            items={items}
            groupLabel={GROUP_LABELS[group] ?? group}
          />
        </>
      )}
    </>
  );
}
