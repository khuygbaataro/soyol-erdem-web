import type { Metadata } from 'next';
import { Inter, Noto_Sans_Mongolian, Playfair_Display } from 'next/font/google';
import { SITE } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
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
      className={`${inter.variable} ${playfair.variable} ${notoMn.variable}`}
    >
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}
