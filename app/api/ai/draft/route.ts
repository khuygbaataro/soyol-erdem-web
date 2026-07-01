import { NextResponse } from 'next/server';
import { aiDraftSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';
import { generateText } from '@/lib/ai';

export const dynamic = 'force-dynamic';

const LOCALE_LABEL: Record<string, string> = {
  MN: 'монгол',
  EN: 'англи',
  JP: 'япон',
};

const BASE_SYSTEM =
  'Чи Соёл Эрдэм Дээд Сургуулийн элсэлтийн албаны ажилтан. ' +
  'Ирсэн хүсэлт/анкетад хариу имэйл бичнэ. Дүрэм: тодорхой, эелдэг, ' +
  'албан ёсны боловч дулаан өнгө аястай; зөвхөн элсэлт, хөтөлбөр, ' +
  'бүрдүүлэх материал, төлбөр, хугацаатай холбоотой мэдээлэл өг; ' +
  'мэдэхгүй зүйлээ зохиож бүү бич; гарын үсэг / холбоо барих хэсгийг ' +
  'богино байлга. Гаралт нь зөвхөн имэйлийн бие текст байх ёстой — ' +
  'тайлбар, markdown хашилт, "Subject:" мөр бүү нэм.';

export async function POST(req: Request) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = aiDraftSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const d = parsed.data;
  const lang = LOCALE_LABEL[d.locale ?? 'MN'] ?? 'монгол';
  const system = `${BASE_SYSTEM} Имэйлийг ${lang} хэлээр бич.`;

  let prompt: string;
  if (d.mode === 'refine') {
    prompt = [
      'Доорх имэйлийн ноорогийг илүү тодорхой, эелдэг, алдаагүй болгож сайжруул.',
      d.instruction ? `Нэмэлт заавар: ${d.instruction}` : '',
      '',
      '=== Одоогийн ноорог ===',
      d.currentText || '(хоосон)',
      d.submissionText ? `\n=== Хандсан хүний мэдээлэл ===\n${d.submissionText}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  } else if (d.mode === 'translate') {
    prompt = [
      `Доорх имэйлийг ${lang} хэл рүү утга санааг хадгалан хөрвүүл.`,
      '',
      d.currentText || d.templateBody || '(хоосон)',
    ].join('\n');
  } else {
    // draft
    prompt = [
      'Дараах хүнд илгээх элсэлтийн хариу имэйлийг бичиж өг.',
      d.instruction ? `Нэмэлт заавар: ${d.instruction}` : '',
      d.templateBody
        ? `\n=== Ашиглах загвар (баримжаа болго) ===\n${d.templateBody}`
        : '',
      d.submissionText
        ? `\n=== Хандсан хүний мэдээлэл / анкет ===\n${d.submissionText}`
        : '',
    ]
      .filter(Boolean)
      .join('\n');
  }

  const ai = await generateText({ system, prompt, maxTokens: 1200 });
  if (!ai.ok) {
    return NextResponse.json({ error: ai.error }, { status: 502 });
  }
  return NextResponse.json({ text: ai.text ?? '' });
}
