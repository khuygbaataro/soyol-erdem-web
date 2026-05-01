import { PageHeader } from '@/components/admin/PageHeader';
import { NewsForm } from '@/components/admin/NewsForm';

export const metadata = { title: 'Ахлах сургууль · Шинэ мэдээ' };

export default function NewHighSchoolNewsPage() {
  return (
    <>
      <PageHeader
        title="Шинэ мэдээ"
        subtitle="Ахлах сургуулийн мэдээ"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Ахлах сургууль', href: '/admin/high-school' },
          { label: 'Мэдээ', href: '/admin/high-school/news' },
          { label: 'Шинэ' },
        ]}
      />
      <NewsForm mode="create" site="HIGH_SCHOOL" />
    </>
  );
}
