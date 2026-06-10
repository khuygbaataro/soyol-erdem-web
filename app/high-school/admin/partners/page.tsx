import Link from 'next/link';
import { Building2, GraduationCap, Plus, School } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Хамтрагч байгуулл.' };

const TYPE_LABEL: Record<string, string> = {
  'japan-university': 'Япон их сургууль',
  'japan-highschool': 'Япон ахлах сургууль',
  domestic: 'Дотоод',
};
const TYPE_ICON: Record<string, typeof Building2> = {
  'japan-university': Building2,
  'japan-highschool': School,
  domestic: GraduationCap,
};

export default async function HsPartnersPage() {
  const items = await prisma.partner.findMany({ where: { site: 'HIGH_SCHOOL' }, orderBy: [{ type: 'asc' }, { order: 'asc' }] });

  const groups: Record<string, typeof items> = {};
  for (const p of items) {
    groups[p.type] = groups[p.type] ?? [];
    groups[p.type].push(p);
  }

  return (
    <>
      <PageHeader
        title="Хамтрагч байгуулл."
        subtitle={`Нийт ${items.length} байгуулл.`}
        breadcrumb={[{ label: 'Самбар', href: '/high-school/admin/dashboard' }, { label: 'Хамтрагч' }]}
        action={
          <Link href="/high-school/admin/partners/new" className="inline-flex items-center gap-2 rounded-button bg-navy-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-gold-500 hover:text-navy-900 transition-colors">
            <Plus className="h-4 w-4" />
            Шинэ нэмэх
          </Link>
        }
      />

      <div className="space-y-8">
        {Object.entries(groups).map(([type, list]) => {
          const Icon = TYPE_ICON[type] ?? Building2;
          return (
            <div key={type}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-900">
                <Icon className="h-4 w-4 text-gold-500" />
                {TYPE_LABEL[type] ?? type} ({list.length})
              </h2>
              <div className="overflow-hidden rounded-card border border-border-light bg-white shadow-card">
                <table className="w-full text-sm">
                  <thead className="border-b border-border-light bg-cream-soft text-left text-xs font-bold uppercase tracking-wider text-text-muted">
                    <tr>
                      <th className="px-4 py-3">Logo</th>
                      <th className="px-4 py-3">Нэр</th>
                      <th className="px-4 py-3">Хөнгөлөлт</th>
                      <th className="px-4 py-3">Байршил</th>
                      <th className="px-4 py-3">Статус</th>
                      <th className="px-4 py-3 text-right">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {list.map((p) => (
                      <tr key={p.id} className="hover:bg-cream-soft/40">
                        <td className="px-4 py-3">
                          {p.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.logo} alt={p.name} className="h-9 w-9 rounded-button border border-border-light bg-white object-contain p-0.5" />
                          ) : (
                            <span className="flex h-9 w-9 items-center justify-center rounded-button bg-cream-soft text-text-muted">
                              <Building2 className="h-4 w-4" />
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-navy-900">{p.name}</p>
                          {p.nameJp && <p className="text-xs text-text-muted">{p.nameJp}</p>}
                        </td>
                        <td className="px-4 py-3">
                          {p.headline && <Badge variant="gold" className="text-[10px]">{p.headline}</Badge>}
                        </td>
                        <td className="px-4 py-3 text-text-muted">{p.location}</td>
                        <td className="px-4 py-3">
                          {p.active ? <Badge variant="navy">Идэвхтэй</Badge> : <Badge variant="outline">Нуусан</Badge>}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/high-school/admin/partners/${p.id}/edit`} className="rounded-button border border-border-light bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 hover:bg-cream-soft">
                              Засах
                            </Link>
                            <DeleteButton endpoint={`/api/partners/${p.id}`} label="" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
