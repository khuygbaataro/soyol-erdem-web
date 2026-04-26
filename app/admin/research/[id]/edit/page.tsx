import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { ResearchForm } from '@/components/admin/ResearchForm';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function EditResearchPage({ params }: { params: { id: string } }) {
  const r = await prisma.research.findUnique({ where: { id: params.id } });
  if (!r) notFound();
  return (
    <>
      <PageHeader
        title="Нийтлэл засах"
        subtitle={r.title}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Эрдэм шинжилгээ', href: '/admin/research' },
          { label: 'Засах' },
        ]}
      />
      <ResearchForm
        mode="edit"
        initial={{
          ...r,
          publishedAt: r.publishedAt?.toISOString() ?? null,
        }}
      />
    </>
  );
}
