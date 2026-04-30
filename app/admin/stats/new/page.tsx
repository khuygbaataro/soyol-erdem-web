import { PageHeader } from '@/components/admin/PageHeader';
import { StatForm } from '@/components/admin/StatForm';
import { requireRole } from '@/lib/auth-helpers';

export const metadata = { title: 'Шинэ статистик' };

export default async function NewStatPage() {
  await requireRole(['ADMIN']);
  return (
    <>
      <PageHeader
        title="Шинэ статистик"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Статистикууд', href: '/admin/stats' },
          { label: 'Шинэ' },
        ]}
      />
      <StatForm />
    </>
  );
}
