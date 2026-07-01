import { PageHeader } from '@/components/admin/PageHeader';
import { EmailTemplateForm } from '@/components/admin/EmailTemplateForm';

export const metadata = { title: 'Шинэ имэйл загвар' };

export default function NewEmailTemplatePage() {
  return (
    <>
      <PageHeader
        title="Шинэ имэйл загвар"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Имэйл загвар', href: '/admin/email-templates' },
          { label: 'Шинэ' },
        ]}
      />
      <EmailTemplateForm mode="create" />
    </>
  );
}
