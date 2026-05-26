import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { StaffForm } from '@/components/admin/StaffForm';
import { prisma } from '@/lib/prisma';
import { HS_STAFF_POSITION_KEYS } from '@/lib/constants';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ажилтан засах · Бүтэц' };

export default async function HsAdminStructureEditPage({
  params,
}: {
  params: { id: string };
}) {
  const s = await prisma.staff.findUnique({ where: { id: params.id } });
  if (!s) notFound();

  return (
    <>
      <PageHeader
        title="Ажилтан засах"
        subtitle={`${s.name} · ${s.position}`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/high-school/admin/dashboard' },
          { label: 'Бүтэц зохион байгуулалт', href: '/high-school/admin/structure' },
          { label: 'Засах' },
        ]}
        action={
          <a
            href="/high-school/about#org"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
          >
            <ExternalLink className="h-4 w-4" />
            Бүтэц зураг
          </a>
        }
      />
      <StaffForm
        mode="edit"
        initial={s}
        positionKeys={HS_STAFF_POSITION_KEYS}
        listPath="/high-school/admin/structure"
      />
    </>
  );
}
