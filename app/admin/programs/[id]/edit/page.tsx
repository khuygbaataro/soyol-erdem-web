import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { ProgramForm } from '@/components/admin/ProgramForm';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function EditProgramPage({ params }: { params: { id: string } }) {
  const p = await prisma.program.findUnique({ where: { id: params.id } });
  if (!p) notFound();
  return (
    <>
      <PageHeader
        title="Мэргэжил засах"
        subtitle={p.name}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Мэргэжил', href: '/admin/programs' },
          { label: 'Засах' },
        ]}
      />
      <ProgramForm mode="edit" initial={p} />
    </>
  );
}
