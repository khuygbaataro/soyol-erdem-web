import { PageHeader } from '@/components/admin/PageHeader';
import { PartnerForm } from '@/components/admin/PartnerForm';

export const metadata = { title: 'Шинэ хамтрагч' };

export default function NewPartnerPage() {
  return (
    <>
      <PageHeader
        title="Шинэ хамтрагч нэмэх"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Хамтрагч', href: '/admin/partners' },
          { label: 'Шинэ' },
        ]}
      />
      <PartnerForm mode="create" />
    </>
  );
}
