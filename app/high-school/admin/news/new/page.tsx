import { PageHeader } from '@/components/admin/PageHeader';
import { NewsForm } from '@/components/admin/NewsForm';

export const metadata = { title: 'Шинэ мэдээ' };

export default function NewHighSchoolAdminNewsPage() {
  return (
    <>
      <PageHeader
        title="Шинэ мэдээ"
        subtitle="Ахлах сургуулийн мэдээ"
        breadcrumb={[
          { label: 'Самбар', href: '/high-school/admin/dashboard' },
          { label: 'Мэдээ', href: '/high-school/admin/news' },
          { label: 'Шинэ' },
        ]}
      />
      <NewsForm
        mode="create"
        site="HIGH_SCHOOL"
        listPath="/high-school/admin/news"
      />
    </>
  );
}
