import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { LocaleProvider } from '@/components/system/LocaleProvider';
import { normaliseLocale, LOCALE_COOKIE } from '@/lib/i18n/locale';
import { SITE } from '@/lib/constants';
import { montserrat, notoMn, notoSans, openSans } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${SITE.fullName} — ${SITE.jpName}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'mn_MN',
    url: SITE.url,
    siteName: SITE.fullName,
    title: SITE.fullName,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.fullName,
    description: SITE.description,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pre-resolve the locale on the server so the first render already
  // renders in the user's chosen language — no Mongolian flash, no
  // Google Translate iframe. Cookie persists across sessions.
  const cookieStore = await cookies();
  const locale = normaliseLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <html
      lang={locale.toLowerCase()}
      className={`${openSans.variable} ${notoSans.variable} ${montserrat.variable} ${notoMn.variable}`}
    >
      <body className="bg-white antialiased">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
