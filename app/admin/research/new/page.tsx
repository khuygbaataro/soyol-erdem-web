import { PageHeader } from '@/components/admin/PageHeader';
import { ResearchForm } from '@/components/admin/ResearchForm';

export default function NewResearchPage() {
  return (
    <>
      <PageHeader
        title="Шинэ нийтлэл"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Эрдэм шинжилгээ', href: '/admin/research' },
          { label: 'Шинэ' },
        ]}
      />
      <ResearchForm mode="create" />
    </>
  );
}
