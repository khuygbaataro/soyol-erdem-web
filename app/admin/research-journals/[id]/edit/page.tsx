import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { ResearchJournalForm } from '@/components/admin/ResearchJournalForm';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export default async function EditJournalPage({ params }: { params: { id: string } }) {
  const j = await prisma.researchJournal.findUnique({ where: { id: params.id } });
  if (!j) notFound();
  return (
    <>
      <PageHeader title="Боть засах" subtitle={j.title} breadcrumb={[{ label: 'Хянах самбар', href: '/admin/dashboard' }, { label: 'Сэтгүүл', href: '/admin/research-journals' }, { label: 'Засах' }]} />
      <ResearchJournalForm mode="edit" initial={j} />
    </>
  );
}
