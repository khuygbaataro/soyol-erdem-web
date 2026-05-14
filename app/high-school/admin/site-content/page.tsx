import { AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import {
  SiteContentForm,
  type SiteContentItem,
} from '@/components/admin/SiteContentForm';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Хуудасны агуулга' };

// Only high-school sub-site groups appear here; the main university
// content lives in /admin/site-content.
const GROUP_LABELS: Record<string, string> = {
  'ahlah-home': 'Нүүр хуудас',
  'ahlah-about': 'Танилцуулга',
  'ahlah-admission': 'Элсэлт',
  'ahlah-programs': 'Хөтөлбөр',
  'ahlah-contact': 'Холбоо барих',
};
const ALLOWED_GROUPS = Object.keys(GROUP_LABELS);

interface LoadResult {
  ok: boolean;
  items: SiteContentItem[];
  groups: { group: string; _count: number }[];
}

async function safeLoad(group: string): Promise<LoadResult> {
  try {
    const [items, groups] = await Promise.all([
      prisma.siteContent.findMany({
        where: { group },
        orderBy: { order: 'asc' },
      }),
      prisma.siteContent.groupBy({
        by: ['group'],
        where: { group: { in: ALLOWED_GROUPS } },
        _count: true,
      }),
    ]);
    return {
      ok: true,
      items: items as SiteContentItem[],
      groups: groups.map((g) => ({
        group: g.group,
        _count: g._count as unknown as number,
      })),
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
            Хүснэгтэд ахлах сургуулийн агуулга олдсонгүй
          </h3>
          <p className="text-amber-900/90">
            Production DB-руу seed хийгээгүй байж магадгүй. Локалаас:
          </p>
          <pre className="overflow-x-auto rounded-button bg-navy-900 px-4 py-3 text-xs leading-relaxed text-cream">
            {`npm run db:seed`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default async function HighSchoolSiteContentPage({
  searchParams,
}: {
  searchParams: { group?: string };
}) {
  const requested = searchParams.group;
  const group =
    requested && ALLOWED_GROUPS.includes(requested) ? requested : 'ahlah-home';
  const { ok, items, groups } = await safeLoad(group);

  return (
    <>
      <PageHeader
        title="Хуудасны агуулга"
        subtitle="Ахлах сургуулийн нийтийн талын текст, зургийг засна"
        breadcrumb={[
          { label: 'Самбар', href: '/high-school/admin/dashboard' },
          { label: 'Хуудасны агуулга' },
        ]}
      />

      {!ok || items.length === 0 ? (
        <MigrationNotice />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
            {ALLOWED_GROUPS.map((g) => {
              const found = groups.find((x) => x.group === g);
              if (!found) return null;
              const isActive = g === group;
              return (
                <a
                  key={g}
                  href={`/high-school/admin/site-content?group=${g}`}
                  className={
                    'inline-flex items-center gap-2 rounded-button border px-4 py-2 text-sm font-semibold transition-colors ' +
                    (isActive
                      ? 'border-navy-900 bg-navy-900 text-white'
                      : 'border-border-light bg-white text-navy-900 hover:bg-cream-soft')
                  }
                >
                  {GROUP_LABELS[g] ?? g}
                  <span
                    className={
                      'rounded-full px-2 py-0.5 text-[10px] font-bold ' +
                      (isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-cream text-text-muted')
                    }
                  >
                    {found._count}
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
