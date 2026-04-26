import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { LibraryForm } from '@/components/admin/LibraryForm';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const book = await prisma.libraryBook.findUnique({ where: { id: params.id } });
  if (!book) notFound();
  return (
    <>
      <PageHeader
        title="Ном засах"
        subtitle={book.title}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Номын сан', href: '/admin/library' },
          { label: 'Засах' },
        ]}
      />
      <LibraryForm mode="edit" initial={book} />
    </>
  );
}
