/**
 * SMTP тохиргоог шалгах туршилтын скрипт.
 *
 * Ажиллуулах:
 *   npx tsx scripts/test-email.ts хэнд@илгээх.com
 *
 * .env.local (эсвэл .env) дотор дараах утгууд байх ёстой:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, EMAIL_FROM
 *
 * Юу шалгадаг вэ:
 *   1) SMTP серверт нэвтрэлт зөв эсэх (transport.verify)
 *   2) Бодит тест имэйл илгээгдэж хүрч байгаа эсэх
 */
import { readFileSync } from 'node:fs';
import nodemailer from 'nodemailer';

// Standalone скрипт тул .env файлыг гараар ачаална (Next автоматаар ачаалдаг
// ч tsx ачаалдаггүй). Аль хэдийн байгаа process.env-г дарж бичихгүй.
function loadEnv(file: string) {
  try {
    for (const raw of readFileSync(file, 'utf8').split('\n')) {
      const m = raw.match(/^\s*([A-Za-z_][A-Za-z0-9_.]*)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      let val = m[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(m[1] in process.env)) process.env[m[1]] = val;
    }
  } catch {
    // файл байхгүй бол алгасна
  }
}
loadEnv('.env.local');
loadEnv('.env');

async function main() {
  const to = process.argv[2];
  if (!to) {
    console.error(
      'Хэнд илгээхээ заана уу:  npx tsx scripts/test-email.ts test@example.com',
    );
    process.exit(1);
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error(
      'SMTP_HOST / SMTP_USER / SMTP_PASS тохируулаагүй байна (.env.local-оо шалгана уу).',
    );
    process.exit(1);
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;
  const from = process.env.EMAIL_FROM || SMTP_USER;

  console.log(`→ Холбогдож байна: ${SMTP_HOST}:${port} (secure=${secure}) — ${SMTP_USER}`);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.verify();
    console.log('✔ SMTP холболт ба нэвтрэлт зөв.');
  } catch (err) {
    console.error(
      '✗ SMTP холболт/нэвтрэлт амжилтгүй:',
      err instanceof Error ? err.message : err,
    );
    process.exit(1);
  }

  try {
    const info = await transport.sendMail({
      from,
      to,
      subject: 'Соёл Эрдэм — тест имэйл',
      text:
        'Энэ бол элсэлтийн имэйл системийн туршилтын мессеж.\n' +
        'Хүлээж авсан бол SMTP тохиргоо зөв ажиллаж байна.',
    });
    console.log(`✔ Илгээгдлээ. messageId=${info.messageId}`);
    console.log(`  → ${to} хаягны inbox (эсвэл Spam хавтас) шалгана уу.`);
  } catch (err) {
    console.error('✗ Илгээхэд алдаа:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
