import { PageHeader } from '@/components/admin/PageHeader';
import { NewsForm } from '@/components/admin/NewsForm';

export const metadata = { title: 'Шинэ мэдээ' };

export default function NewNewsPage() {
  return (
    <>
      <PageHeader
        title="Шинэ мэдээ"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Мэдээ', href: '/admin/news' },
          { label: 'Шинэ' },
        ]}
      />
      <NewsForm mode="create" site="UNIVERSITY" />
    </>
  );
}
