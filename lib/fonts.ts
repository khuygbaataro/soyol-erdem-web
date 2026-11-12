import {
  Montserrat,
  Noto_Sans,
  Noto_Sans_Mongolian,
  Open_Sans,
} from 'next/font/google';

/*
 * next/font instances, shared by the root layout and any component that
 * needs to pin a face directly. Each call here is hosted once — import
 * these instead of calling the font functions again elsewhere.
 */

/**
 * Body / UI sans. Open Sans is the requested body face: it has full
 * Latin + Cyrillic coverage (including the Mongolian letters Ү / Ө),
 * renders consistently across desktop & mobile, and pairs well with
 * Montserrat for headings. We pin the weights actually used so the
 * browser only ships those styles (smaller font payload, faster first
 * paint).
 */
export const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

/**
 * Display "serif"-slot face used for hero titles, section headings and
 * brand wordmarks. Even though the slot is named `--font-serif` for
 * historical reasons, the requested face is Montserrat — a geometric
 * sans that pairs cleanly with Open Sans and carries Cyrillic
 * (including СУРГАЛТ, ЭРДЭМ ШИНЖИЛГЭЭ …) at consistent weight without
 * the uneven Ү / Ө rendering Inter used to show.
 */
export const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['500', '600', '700', '800', '900'],
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
export const notoSans = Noto_Sans({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['700', '800', '900'],
  display: 'swap',
  variable: '--font-display',
});

export const notoMn = Noto_Sans_Mongolian({
  subsets: ['mongolian'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-mn',
});
