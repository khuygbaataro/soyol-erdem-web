import { redirect } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { SettingsForm } from '@/components/admin/SettingsForm';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') redirect('/admin/dashboard');

  const settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });

  return (
    <>
      <PageHeader
        title="Сайтын тохиргоо"
        subtitle="Сургуулийн ерөнхий мэдээллийг засах."
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Тохиргоо' },
        ]}
      />
      <SettingsForm initial={settings ?? undefined} />
    </>
  );
}
