import { PageHeader } from '@/components/admin/PageHeader';
import { LibraryForm } from '@/components/admin/LibraryForm';

export const metadata = { title: 'Шинэ ном' };

export default function NewBookPage() {
  return (
    <>
      <PageHeader
        title="Ном нэмэх"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Номын сан', href: '/admin/library' },
          { label: 'Шинэ' },
        ]}
      />
      <LibraryForm mode="create" />
    </>
  );
}
