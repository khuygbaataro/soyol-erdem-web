import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteContentMap('footer');
  const overrides = {
    tagline:         site.get('footer.tagline')           || undefined,
    phonePrimary:    site.get('footer.phone.primary')     || undefined,
    phoneSecondary:  site.get('footer.phone.secondary')   || undefined,
    email:           site.get('footer.email')             || undefined,
    address:         site.get('footer.address')           || undefined,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer overrides={overrides} />
    </div>
  );
}
