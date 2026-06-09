import { PageHeader } from '@/components/admin/PageHeader';
import { ResearchJournalForm } from '@/components/admin/ResearchJournalForm';
export const metadata = { title: 'Шинэ боть нэмэх' };
export default function NewJournalPage() {
  return (
    <>
      <PageHeader title="Шинэ боть нэмэх" breadcrumb={[{ label: 'Хянах самбар', href: '/admin/dashboard' }, { label: 'Сэтгүүл', href: '/admin/research-journals' }, { label: 'Шинэ' }]} />
      <ResearchJournalForm mode="create" />
    </>
  );
}
