import { PageHeader } from '@/components/admin/PageHeader';
import { PartnerForm } from '@/components/admin/PartnerForm';

export const metadata = { title: 'Шинэ хамтрагч' };

export default function NewHsPartnerPage() {
  return (
    <>
      <PageHeader
        title="Шинэ хамтрагч нэмэх"
        breadcrumb={[
          { label: 'Самбар', href: '/high-school/admin/dashboard' },
          { label: 'Хамтрагч', href: '/high-school/admin/partners' },
          { label: 'Шинэ' },
        ]}
      />
      <PartnerForm mode="create" site="HIGH_SCHOOL" listPath="/high-school/admin/partners" />
    </>
  );
}
