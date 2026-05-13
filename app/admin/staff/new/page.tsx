import { PageHeader } from '@/components/admin/PageHeader';
import { StaffForm } from '@/components/admin/StaffForm';

export const metadata = { title: 'Шинэ ажилтан' };

export default function NewStaffPage() {
  return (
    <>
      <PageHeader
        title="Шинэ ажилтан"
        subtitle="Бүтэц зураг дээр харагдах ажилтны мэдээлэл нэмэх"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Ажилтнууд', href: '/admin/staff' },
          { label: 'Шинэ' },
        ]}
      />
      <StaffForm mode="create" />
    </>
  );
}
