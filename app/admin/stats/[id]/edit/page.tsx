import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { StatForm } from '@/components/admin/StatForm';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Статистик засах' };

export default async function EditStatPage({ params }: { params: { id: string } }) {
  await requireRole(['ADMIN']);
  const item = await prisma.stat.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <>
      <PageHeader
        title="Статистик засах"
        subtitle={item.label}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Статистикууд', href: '/admin/stats' },
          { label: 'Засах' },
        ]}
      />
      <StatForm
        id={item.id}
        initial={{
          key: item.key,
          icon: item.icon,
          number: item.number,
          label: item.label,
          order: item.order,
          active: item.active,
        }}
      />
    </>
  );
}
