import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import {
  Noto_Sans,
  Noto_Sans_Mongolian,
  Playfair_Display,
  Roboto,
} from 'next/font/google';
import { LocaleProvider } from '@/components/system/LocaleProvider';
import { normaliseLocale, LOCALE_COOKIE } from '@/lib/i18n/locale';
import { SITE } from '@/lib/constants';
import './globals.css';

/**
 * Body / UI sans. Roboto handles Latin + Cyrillic well with consistent
 * weight rendering across both scripts. Pin the weights we actually use
 * so the browser only ships those styles (faster first paint, smaller
 * font payload).
 */
const roboto = Roboto({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

/**
 * Display serif used for hero titles, section headings and brand
 * wordmarks. The previous setup only loaded the Latin subset, so any
 * Mongolian-Cyrillic headline (СУРГАЛТ, ЭРДЭМ ШИНЖИЛГЭЭ …) fell back to
 * the platform default serif and looked off-brand. Adding `cyrillic`
 * + `cyrillic-ext` makes Playfair render Cyrillic in the same family
 * as Latin, and the curated weight list keeps the bundle small.
 */
const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-serif',
  preload: true,
});

/**
 * Display sans for page-hero banner titles. Inter's extrabold weight has
 * uneven coverage of Mongolian Cyrillic letters (Ү, Ө, Ё): the glyphs are
 * pulled from a different subset and end up looking lighter than the rest
 * of the word. Noto Sans was designed for comprehensive Cyrillic/Mongolian
 * support, so every letter in "МЭРГЭЖЛҮҮД" renders at the same weight.
 */
const notoSans = Noto_Sans({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['700', '800', '900'],
  display: 'swap',
  variable: '--font-display',
});

const notoMn = Noto_Sans_Mongolian({
  subsets: ['mongolian'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-mn',
});

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
      className={`${roboto.variable} ${notoSans.variable} ${playfair.variable} ${notoMn.variable}`}
    >
      <body className="bg-white antialiased">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
