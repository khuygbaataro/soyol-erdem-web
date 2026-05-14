import type { Metadata } from 'next';
import {
  Inter,
  Noto_Sans,
  Noto_Sans_Mongolian,
  Playfair_Display,
} from 'next/font/google';
import { SITE } from '@/lib/constants';
import './globals.css';

/**
 * Body / UI sans. Inter handles Latin + Cyrillic well; we explicitly
 * pin the weights we use so the browser only ships the styles we need
 * (faster first paint, smaller font payload).
 */
const inter = Inter({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700', '800'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="mn"
      className={`${inter.variable} ${notoSans.variable} ${playfair.variable} ${notoMn.variable}`}
    >
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}
