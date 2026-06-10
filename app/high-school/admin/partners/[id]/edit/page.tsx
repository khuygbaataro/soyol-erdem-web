import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { PartnerForm } from '@/components/admin/PartnerForm';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function EditHsPartnerPage({ params }: { params: { id: string } }) {
  const p = await prisma.partner.findUnique({ where: { id: params.id } });
  if (!p) notFound();

  return (
    <>
      <PageHeader
        title="Хамтрагч засах"
        subtitle={p.name}
        breadcrumb={[
          { label: 'Самбар', href: '/high-school/admin/dashboard' },
          { label: 'Хамтрагч', href: '/high-school/admin/partners' },
          { label: 'Засах' },
        ]}
      />
      <PartnerForm mode="edit" initial={p} site="HIGH_SCHOOL" listPath="/high-school/admin/partners" />
    </>
  );
}
