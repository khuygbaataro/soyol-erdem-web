import { PageHeader } from '@/components/admin/PageHeader';
import { SiteContentForm, type SiteContentItem } from '@/components/admin/SiteContentForm';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

const GROUP_LABELS: Record<string, string> = {
  home: 'Нүүр хуудас',
  about: 'Сургуулийн тухай',
};

export default async function AdminSiteContentPage({
  searchParams,
}: {
  searchParams: { group?: string };
}) {
  await requireRole(['ADMIN']);
  const group = searchParams.group ?? 'home';

  const items = await prisma.siteContent.findMany({
    where: { group },
    orderBy: { order: 'asc' },
  });

  const groups = await prisma.siteContent.groupBy({
    by: ['group'],
    _count: true,
  });

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
        items={items as SiteContentItem[]}
        groupLabel={GROUP_LABELS[group] ?? group}
      />
    </>
  );
}
