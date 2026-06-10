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

  // Top utility-bar (navbar) phone + short address — admin-editable.
  const navbarPhone = site.get('footer.phone.primary') || undefined;
  const navbarAddress = site.get('header.address') || undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <Header phoneOverride={navbarPhone} addressOverride={navbarAddress} />
      <main className="flex-1">{children}</main>
      <Footer overrides={overrides} />
    </div>
  );
}
