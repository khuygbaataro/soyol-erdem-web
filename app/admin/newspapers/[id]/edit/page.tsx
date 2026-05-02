import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { NewspaperForm } from '@/components/admin/NewspaperForm';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Дугаар засах' };

export default async function EditNewspaperPage({ params }: PageProps) {
  const item = await prisma.newspaper.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <>
      <PageHeader
        title="Дугаар засах"
        subtitle={`№${item.issueNumber}${item.title ? ' · ' + item.title : ''}`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Сонин хэвлэл', href: '/admin/newspapers' },
          { label: 'Засах' },
        ]}
      />
      <NewspaperForm
        mode="edit"
        initial={{
          id: item.id,
          issueNumber: item.issueNumber,
          title: item.title,
          publishedAt: item.publishedAt?.toISOString() ?? null,
          fileUrl: item.fileUrl,
          coverImage: item.coverImage,
          status: item.status,
        }}
      />
    </>
  );
}
