import { redirect } from 'next/navigation';
import { Toaster } from 'sonner';
import { Sidebar } from '@/components/admin/Sidebar';
import { Topbar } from '@/components/admin/Topbar';
import { auth } from '@/lib/auth';

export const metadata = {
  title: {
    default: 'Хянах самбар | Соёл Эрдэм',
    template: '%s — Хянах самбар',
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  return (
    <div className="flex min-h-screen bg-cream-soft">
      <Sidebar role={session.user.role} userName={session.user.name ?? 'Хэрэглэгч'} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={session.user} />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
