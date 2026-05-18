'use client';

import Script from 'next/script';
import { useEffect } from 'react';

/**
 * Google Translate widget integration.
 *
 * We mount the Google Translate element script in the document and let
 * it read the `googtrans` cookie to apply the chosen translation on
 * page load. The visible `<div id="google_translate_element">` host is
 * stashed off-screen (we drive the dropdown programmatically from the
 * LanguageSwitch in the header).
 *
 * Companion helper: `lib/google-translate.ts#setGoogleTranslateLang`
 * sets the cookie + reloads, which is the most reliable way to switch
 * Google's translation across full-page navigations.
 */
export function GoogleTranslate() {
  useEffect(() => {
    // Define the global init function Google's script calls back into.
    // We intentionally keep the source pinned to Mongolian since that's
    // the canonical site language; Google then translates into the
    // language picked by the user (cookie-driven).
    type GTOpts = {
      pageLanguage: string;
      includedLanguages?: string;
      autoDisplay?: boolean;
      layout?: number;
    };
    type GTConstructor = new (
      opts: GTOpts,
      el: string,
    ) => Record<string, unknown>;
    type GTGlobal = {
      google?: {
        translate?: {
          TranslateElement: GTConstructor & {
            InlineLayout?: { SIMPLE: number };
          };
        };
      };
      googleTranslateElementInit?: () => void;
    };
    const w = window as unknown as GTGlobal;
    w.googleTranslateElementInit = () => {
      if (!w.google?.translate) return;
      new w.google.translate.TranslateElement(
        {
          pageLanguage: 'mn',
          includedLanguages: 'mn,en,ja',
          autoDisplay: false,
        },
        'google_translate_element',
      );
    };
  }, []);

  return (
    <>
      {/* Off-screen host for Google's translate element. The widget
          renders a select with class `goog-te-combo` inside this div;
          we hide the whole thing visually but keep it in the DOM so
          page-load translation works. */}
      <div
        id="google_translate_element"
        aria-hidden
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden"
      />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
