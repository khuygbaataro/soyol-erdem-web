import Link from 'next/link';
import { Plus } from 'lucide-react';
import { redirect } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import { RoleBadge } from '@/components/admin/StatusBadge';
import { DeleteButton } from '@/components/admin/DeleteButton';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

type Row = Awaited<ReturnType<typeof load>>[number];

async function load() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
    },
  });
}

export default async function AdminUsersPage() {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') redirect('/admin/dashboard');

  const users = await load();

  const columns: Column<Row>[] = [
    {
      header: 'Нэр',
      cell: (u) => (
        <div>
          <p className="font-semibold text-navy-900">{u.name}</p>
          <p className="text-xs text-text-muted">{u.email}</p>
        </div>
      ),
    },
    { header: 'Эрх', cell: (u) => <RoleBadge role={u.role} /> },
    {
      header: 'Идэвхтэй',
      cell: (u) =>
        u.active ? <Badge variant="navy">Идэвхтэй</Badge> : <Badge variant="outline">Идэвхгүй</Badge>,
    },
    {
      header: 'Бүртгэсэн',
      cell: (u) => (
        <span className="text-xs text-text-muted">
          {new Date(u.createdAt).toLocaleDateString('mn-MN')}
        </span>
      ),
    },
    {
      header: '',
      className: 'text-right',
      cell: (u) =>
        u.id === session.user.id ? (
          <span className="text-xs italic text-text-muted">та өөрөө</span>
        ) : (
          <DeleteButton endpoint={`/api/users/${u.id}`} label="Устгах" />
        ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Хэрэглэгч"
        subtitle={`Нийт ${users.length} хэрэглэгч`}
        breadcrumb={[{ label: 'Хянах самбар', href: '/admin/dashboard' }, { label: 'Хэрэглэгч' }]}
        action={
          <Button
            href="/admin/users/new"
            variant="primary"
            size="md"
            icon={<Plus className="h-4 w-4" />}
            iconPosition="left"
          >
            Шинэ хэрэглэгч
          </Button>
        }
      />
      <DataTable data={users} columns={columns} empty="Хэрэглэгч байхгүй байна." />
    </>
  );
}
