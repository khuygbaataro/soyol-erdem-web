/**
 * Anthropic Claude helper for drafting / refining admission emails.
 *
 * Calls the Messages API directly via fetch so we don't pull in the SDK.
 * Default model is Haiku 4.5 (cheap + fast, plenty for short emails); set
 * AI_MODEL to `claude-sonnet-5` for higher quality.
 *
 * Env:
 *   ANTHROPIC_API_KEY — Anthropic API key
 *   AI_MODEL          — optional model override
 */

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-haiku-4-5-20251001';

export interface AiResult {
  ok: boolean;
  text?: string;
  error?: string;
}

export async function generateText(opts: {
  system: string;
  prompt: string;
  maxTokens?: number;
}): Promise<AiResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error:
        'AI үйлчилгээ тохируулаагүй байна. Vercel дээр ANTHROPIC_API_KEY нэмнэ үү.',
    };
  }
  const model = process.env.AI_MODEL || DEFAULT_MODEL;

  try {
    const res = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: opts.maxTokens ?? 1024,
        system: opts.system,
        messages: [{ role: 'user', content: opts.prompt }],
      }),
    });
    const data = (await res.json().catch(() => null)) as {
      content?: { type: string; text?: string }[];
      error?: { message?: string };
    } | null;
    if (!res.ok) {
      const msg = data?.error?.message || `Anthropic error ${res.status}`;
      return { ok: false, error: String(msg) };
    }
    const text = Array.isArray(data?.content)
      ? data!.content
          .filter((b) => b.type === 'text' && b.text)
          .map((b) => b.text as string)
          .join('\n')
          .trim()
      : '';
    return { ok: true, text };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'AI дуудлага амжилтгүй боллоо',
    };
  }
}
