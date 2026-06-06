/**
 * Telegram Bot notification helper.
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env vars.
 * Fire-and-forget — errors are logged but never bubble up to the caller.
 */

const TG_API = 'https://api.telegram.org';

export async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatIds) {
    console.error('[telegram] env vars missing');
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
