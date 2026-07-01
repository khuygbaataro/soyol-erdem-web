import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { EmailTemplateForm } from '@/components/admin/EmailTemplateForm';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Имэйл загвар засах' };

export default async function EditEmailTemplatePage({ params }: PageProps) {
  const item = await prisma.emailTemplate
    .findUnique({ where: { id: params.id } })
    .catch(() => null);
  if (!item) notFound();

  return (
    <>
      <PageHeader
        title="Имэйл загвар засах"
        subtitle={item.name}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Имэйл загвар', href: '/admin/email-templates' },
          { label: 'Засах' },
        ]}
      />
      <EmailTemplateForm
        mode="edit"
        initial={{
          id: item.id,
          name: item.name,
          category: item.category,
          subject: item.subject,
          body: item.body,
          locale: item.locale,
          active: item.active,
          order: item.order,
        }}
      />
    </>
  );
}
