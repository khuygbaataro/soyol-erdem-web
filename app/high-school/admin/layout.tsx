import { redirect } from 'next/navigation';
import { Toaster } from 'sonner';
import { HighSchoolAdminSidebar } from '@/components/admin/HighSchoolAdminSidebar';
import { Topbar } from '@/components/admin/Topbar';
import { auth } from '@/lib/auth';

export const metadata = {
  title: {
    default: 'Хянах самбар | Соёл-Эрдэм Ахлах сургууль',
    template: '%s — Ахлах сургуулийн админ',
  },
};

/**
 * Standalone admin shell for the high-school sub-site. Same auth + DB as
 * the main admin, different chrome: dedicated sidebar with high-school nav
 * only, login lives at /high-school/login, and unauthenticated users get
 * bounced back to that login page (handled by middleware).
 */
export default async function HighSchoolAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/high-school/login');

  return (
    <div className="flex min-h-screen bg-cream-soft">
      <HighSchoolAdminSidebar
        userName={session.user.name ?? 'Хэрэглэгч'}
        role={session.user.role}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={session.user} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
