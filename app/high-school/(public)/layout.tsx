import { HighSchoolHeader } from '@/components/layout/HighSchoolHeader';
import { Footer } from '@/components/layout/Footer';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';

export default async function HighSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Footer + navbar + the shared bottom CTA banner all live in the single
  // "Footer ба Navbar" admin group (ahlah-footer).
  const site = await getSiteContentMap('ahlah-footer');
  const phonePrimary = site.get('ahlah-footer.phone.primary') || undefined;
  const email = site.get('ahlah-footer.email') || undefined;
  const overrides = {
    tagline: site.get('ahlah-footer.tagline') || undefined,
    phonePrimary,
    phoneSecondary: site.get('ahlah-footer.phone.secondary') || undefined,
    email,
    address: site.get('ahlah-footer.address') || undefined,
  };
  const bannerTitle =
    site.get('ahlah-footer.banner.title') || 'Соёл Эрдэм Ахлах Сургуульд тавтай морил';
  const bannerSubtitle =
    site.get('ahlah-footer.banner.subtitle') ||
    'Япон хэл, соёл, мэдээллийн технологийг хосолсон чанартай боловсрол.';

  return (
    <div className="flex min-h-screen flex-col">
      <HighSchoolHeader phone={phonePrimary} email={email} />
      <main className="flex-1">{children}</main>
      <CtaBanner
        title={bannerTitle}
        subtitle={bannerSubtitle}
        ctaLabel="Элсэлтийн мэдээлэл"
        ctaHref="/high-school/admission"
        secondary={{ label: 'Холбоо барих', href: '/high-school/contact' }}
      />
      <Footer variant="high-school" overrides={overrides} />
    </div>
  );
}
