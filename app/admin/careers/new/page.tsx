import { PageHeader } from '@/components/admin/PageHeader';
import { JobOpeningForm } from '@/components/admin/JobOpeningForm';

export const metadata = { title: 'Шинэ ажлын байр' };

export default function NewJobOpeningPage() {
  return (
    <>
      <PageHeader
        title="Шинэ ажлын байр"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Нээлттэй ажлын байр', href: '/admin/careers' },
          { label: 'Шинэ' },
        ]}
      />
      <JobOpeningForm mode="create" />
    </>
  );
}
