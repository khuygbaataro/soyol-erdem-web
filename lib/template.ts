/**
 * Pure template rendering — safe to import from both client and server
 * (no env access, no side effects). Shared by lib/email.ts (server send)
 * and the ComposeEmail client component (live preview of a picked template).
 */

/**
 * Replace {{key}} placeholders in a template. Unknown keys are left
 * untouched so a typo stays visible rather than silently blanking out.
 */
export function renderTemplate(
  tpl: string,
  vars: Record<string, string>,
): string {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) =>
    key in vars ? vars[key] : match,
  );
}
