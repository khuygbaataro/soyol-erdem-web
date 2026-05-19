/**
 * One-shot: register a new SiteContent IMAGE row so admins can upload
 * the right-hand photo on /high-school/about from the admin panel.
 * Idempotent — re-runnable. The page falls back to the kanji decorative
 * poster when this slot is empty.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.siteContent.upsert({
    where: { key: 'ahlah-about.intro.image' },
    update: {},
    create: {
      key: 'ahlah-about.intro.image',
      type: 'IMAGE',
      value: '',
      group: 'ahlah-about',
      label: 'Танилцуулга — баруун талын зураг',
      hint: 'Танилцуулга хэсгийн баруун талд харагдах зураг. Хоосон бол шилэн kanji дизайн фолбэк харагдана.',
      multiline: false,
      order: 30,
    },
  });
  console.log(
    result.value
      ? `✔ row exists already, value=${result.value.slice(0, 60)}…`
      : `✔ row registered, awaiting admin upload (key=${result.key})`,
  );
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
