import { HighSchoolHeader } from '@/components/layout/HighSchoolHeader';
import { Footer } from '@/components/layout/Footer';

export default function HighSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <HighSchoolHeader />
      <main className="flex-1">{children}</main>
      <Footer variant="high-school" />
    </div>
  );
}
