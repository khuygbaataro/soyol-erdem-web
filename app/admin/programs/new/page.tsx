import { PageHeader } from '@/components/admin/PageHeader';
import { ProgramForm } from '@/components/admin/ProgramForm';

export default function NewProgramPage() {
  return (
    <>
      <PageHeader
        title="Шинэ мэргэжил"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Мэргэжил', href: '/admin/programs' },
          { label: 'Шинэ' },
        ]}
      />
      <ProgramForm mode="create" />
    </>
  );
}
