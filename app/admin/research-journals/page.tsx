import Link from 'next/link';
import { BookOpen, Plus } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { Badge } from '@/components/ui/Badge';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Эрдэм шинжилгээний сэтгүүл' };

export default async function ResearchJournalsPage() {
  await requireRole(['ADMIN']);
  const items = await prisma.researchJournal.findMany({ orderBy: { order: 'asc' } });

  return (
    <>
      <PageHeader
        title="Эрдэм шинжилгээний сэтгүүл"
        subtitle={`Нийт ${items.length} боть`}
        breadcrumb={[{ label: 'Хянах самбар', href: '/admin/dashboard' }, { label: 'Сэтгүүл' }]}
        action={
          <Link href="/admin/research-journals/new" className="inline-flex items-center gap-2 rounded-button bg-navy-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-gold-500 hover:text-navy-900 transition-colors">
            <Plus className="h-4 w-4" /> Шинэ боть нэмэх
          </Link>
        }
      />

      <div className="overflow-hidden rounded-card border border-border-light bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b bg-cream-soft text-xs font-bold uppercase tracking-wider text-text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Нүүр зураг</th>
              <th className="px-4 py-3 text-left">Боть</th>
              <th className="px-4 py-3 text-left">PDF</th>
              <th className="px-4 py-3 text-left">Статус</th>
              <th className="px-4 py-3 text-right">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {items.map((j) => (
              <tr key={j.id} className="hover:bg-cream-soft/40">
                <td className="px-4 py-3">
                  {j.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={j.cover} alt="" className="h-12 w-9 rounded-sm border object-cover" />
                  ) : (
                    <span className="flex h-12 w-9 items-center justify-center rounded-sm bg-navy-900 text-gold-400">
                      <BookOpen className="h-4 w-4" />
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="font-bold text-navy-900">{j.title}</p>
                  <p className="text-xs text-text-muted">{j.subtitle}</p>
                </td>
                <td className="px-4 py-3">
                  <a href={j.fileUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-navy-900 hover:text-gold-500 underline">
                    PDF харах
                  </a>
                </td>
                <td className="px-4 py-3">
                  {j.active ? <Badge variant="navy">Идэвхтэй</Badge> : <Badge variant="outline">Нуусан</Badge>}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/research-journals/${j.id}/edit`} className="rounded-button border px-3 py-1.5 text-xs font-semibold text-navy-900 hover:bg-cream-soft">Засах</Link>
                    <DeleteButton endpoint={`/api/research-journals/${j.id}`} label="" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
