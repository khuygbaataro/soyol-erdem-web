/**
 * Telegram Bot notification helper.
 * Fire-and-forget — errors are logged but never bubble up to the caller.
 *
 * Two independent bots:
 *   • university (default) → TELEGRAM_BOT_TOKEN     + TELEGRAM_CHAT_ID
 *   • high-school          → TELEGRAM_HS_BOT_TOKEN  + TELEGRAM_HS_CHAT_ID
 *
 * High-school notifications fall back to the university bot when the HS env
 * vars aren't set yet, so nothing breaks before they're configured in Vercel.
 */

const TG_API = 'https://api.telegram.org';

export type TelegramTarget = 'university' | 'high-school';

export async function sendTelegram(
  text: string,
  target: TelegramTarget = 'university',
): Promise<void> {
  const isHs = target === 'high-school';
  const token = isHs
    ? process.env.TELEGRAM_HS_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN
    : process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = isHs
    ? process.env.TELEGRAM_HS_CHAT_ID || process.env.TELEGRAM_CHAT_ID
    : process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatIds) {
    console.error(`[telegram] env vars missing (target=${target})`);
    return;
  }

  // Support comma-separated chat IDs so we can fan-out to multiple chats
  // e.g. "5815823272,-4851811304"
  const ids = chatIds.split(',').map((s) => s.trim()).filter(Boolean);

  await Promise.all(
    ids.map(async (chatId) => {
      try {
        const res = await fetch(`${TG_API}/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        if (!res.ok) {
          const body = await res.text();
          console.error(`[telegram] API error (chat ${chatId}):`, body);
        }
      } catch (err) {
        console.error(`[telegram] fetch error (chat ${chatId}):`, err);
      }
    }),
  );
}
