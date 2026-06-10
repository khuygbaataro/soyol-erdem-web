/**
 * Renders an acronym values block (e.g. "С — Соёл уламжлалаа дээдэлсэн")
 * as a hanging-indent list: the single Cyrillic letter sits in its own
 * column, the dash next, and the explanation wraps aligned to the text.
 * Lines that don't match the "<letter> — <text>" shape fall back to a
 * plain list item. Mirrors the university about-page values card.
 */
export function ValuesList({ text }: { text: string }) {
  return (
    <ul className="mt-3 flex-1 space-y-2 text-sm leading-relaxed text-text-body">
      {text.split('\n').map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;
        const match = trimmed.match(/^([А-ЯӨҮ])\s*[—–-]\s*(.+)$/);
        if (!match) {
          return <li key={idx}>{trimmed}</li>;
        }
        const [, letter, rest] = match;
        return (
          <li key={idx} className="flex gap-2">
            <span className="w-4 shrink-0 font-bold text-navy-900">{letter}</span>
            <span className="shrink-0 text-text-muted">—</span>
            <span className="min-w-0 flex-1">{rest}</span>
          </li>
        );
      })}
    </ul>
  );
}
