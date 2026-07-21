'use client';

import { Download } from 'lucide-react';

/**
 * Гэрээг хэвлэх / PDF болгон татах. Хөтчийн хэвлэх харилцах цонхыг нээж,
 * "Save as PDF" сонголтоор оюутан гэрээгээ PDF файлаар татаж авна.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-button bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-navy-800"
    >
      <Download className="h-4 w-4" />
      PDF болгон татах / Хэвлэх
    </button>
  );
}
