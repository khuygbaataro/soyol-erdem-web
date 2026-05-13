import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
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
        action={
          <a
            href={`/programs/${p.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
          >
            <ExternalLink className="h-4 w-4" />
            Үзэх
          </a>
        }
      />
      <ProgramForm mode="edit" initial={p} />
    </>
  );
}
