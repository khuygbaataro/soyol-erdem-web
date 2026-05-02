import { PageHeader } from '@/components/admin/PageHeader';
import { NewspaperForm } from '@/components/admin/NewspaperForm';

export const metadata = { title: 'Шинэ дугаар' };

export default function NewNewspaperPage() {
  return (
    <>
      <PageHeader
        title="Шинэ дугаар"
        subtitle="Сонин хэвлэлийн шинэ дугаар нэмэх"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Сонин хэвлэл', href: '/admin/newspapers' },
          { label: 'Шинэ' },
        ]}
      />
      <NewspaperForm mode="create" />
    </>
  );
}
