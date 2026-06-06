/**
 * Telegram Bot notification helper.
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env vars.
 * Fire-and-forget — errors are logged but never bubble up to the caller.
 */

const TG_API = 'https://api.telegram.org';

export async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('[telegram] env vars missing');
    return;
  }

  try {
    const res = await fetch(`${TG_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('[telegram] API error:', body);
    }
  } catch (err) {
    console.error('[telegram] fetch error:', err);
  }
}
