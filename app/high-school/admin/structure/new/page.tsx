import { PageHeader } from '@/components/admin/PageHeader';
import { StaffForm } from '@/components/admin/StaffForm';
import { HS_STAFF_POSITION_KEYS } from '@/lib/constants';

export const metadata = { title: 'Шинэ ажилтан · Бүтэц' };

export default function HsAdminStructureNewPage() {
  return (
    <>
      <PageHeader
        title="Шинэ ажилтан"
        subtitle="Бүтэц зураг дээр харагдах ажилтны мэдээлэл нэмэх. Нэг box-д олон ажилтан нэмж болно."
        breadcrumb={[
          { label: 'Хянах самбар', href: '/high-school/admin/dashboard' },
          { label: 'Бүтэц зохион байгуулалт', href: '/high-school/admin/structure' },
          { label: 'Шинэ' },
        ]}
      />
      <StaffForm
        mode="create"
        positionKeys={HS_STAFF_POSITION_KEYS}
        listPath="/high-school/admin/structure"
      />
    </>
  );
}
