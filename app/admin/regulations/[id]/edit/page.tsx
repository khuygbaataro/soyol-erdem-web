import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { RegulationForm } from '@/components/admin/RegulationForm';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Журам засах' };

export default async function EditRegulationPage({ params }: PageProps) {
  const item = await prisma.regulation
    .findUnique({ where: { id: params.id } })
    .catch(() => null);
  if (!item) notFound();

  return (
    <>
      <PageHeader
        title="Журам засах"
        subtitle={item.title}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Дүрэм журам', href: '/admin/regulations' },
          { label: 'Засах' },
        ]}
      />
      <RegulationForm
        mode="edit"
        initial={{
          id: item.id,
          slug: item.slug,
          title: item.title,
          description: item.description,
          fileUrl: item.fileUrl,
          coverImage: item.coverImage,
          status: item.status,
          order: item.order,
        }}
      />
    </>
  );
}
