import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { JobOpeningForm } from '@/components/admin/JobOpeningForm';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ажлын байр засах' };

export default async function EditJobOpeningPage({ params }: PageProps) {
  const item = await prisma.jobOpening
    .findUnique({ where: { id: params.id } })
    .catch(() => null);
  if (!item) notFound();

  return (
    <>
      <PageHeader
        title="Ажлын байр засах"
        subtitle={item.title}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Нээлттэй ажлын байр', href: '/admin/careers' },
          { label: 'Засах' },
        ]}
      />
      <JobOpeningForm
        mode="edit"
        initial={{
          id: item.id,
          slug: item.slug,
          title: item.title,
          description: item.description,
          titleEn: item.titleEn,
          titleJa: item.titleJa,
          descriptionEn: item.descriptionEn,
          descriptionJa: item.descriptionJa,
          active: item.active,
          order: item.order,
        }}
      />
    </>
  );
}
