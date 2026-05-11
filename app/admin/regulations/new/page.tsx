import { PageHeader } from '@/components/admin/PageHeader';
import { RegulationForm } from '@/components/admin/RegulationForm';

export const metadata = { title: 'Шинэ журам' };

export default function NewRegulationPage() {
  return (
    <>
      <PageHeader
        title="Шинэ журам"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Дүрэм журам', href: '/admin/regulations' },
          { label: 'Шинэ' },
        ]}
      />
      <RegulationForm mode="create" />
    </>
  );
}
