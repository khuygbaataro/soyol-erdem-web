import { HighSchoolHeader } from '@/components/layout/HighSchoolHeader';
import { Footer } from '@/components/layout/Footer';
import { getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export default async function HighSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pull admin-editable footer overrides from the ahlah-home group. Each
  // key is optional; the Footer falls back to HIGH_SCHOOL constants when
  // the admin hasn't filled a field in.
  const site = await getSiteContentMap('ahlah-home');
  const overrides = {
    tagline: site.get('ahlah-footer.tagline') || undefined,
    phonePrimary: site.get('ahlah-footer.phone.primary') || undefined,
    phoneSecondary: site.get('ahlah-footer.phone.secondary') || undefined,
    email: site.get('ahlah-footer.email') || undefined,
    address: site.get('ahlah-footer.address') || undefined,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <HighSchoolHeader />
      <main className="flex-1">{children}</main>
      <Footer variant="high-school" overrides={overrides} />
    </div>
  );
}
