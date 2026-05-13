import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { StaffForm } from '@/components/admin/StaffForm';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ажилтан засах' };

export default async function EditStaffPage({
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
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Ажилтнууд', href: '/admin/staff' },
          { label: 'Засах' },
        ]}
        action={
          <a
            href="/about/structure"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
          >
            <ExternalLink className="h-4 w-4" />
            Бүтэц зураг
          </a>
        }
      />
      <StaffForm mode="edit" initial={s} />
    </>
  );
}
