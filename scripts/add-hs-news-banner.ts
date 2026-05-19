/**
 * One-shot: register the `ahlah-news.hero.image` SiteContent IMAGE
 * row so the "Мэдээ" group surfaces in /high-school/admin/site-content
 * and the editor can upload the banner for /high-school/news.
 * Idempotent.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.siteContent.upsert({
    where: { key: 'ahlah-news.hero.image' },
    update: {},
    create: {
      key: 'ahlah-news.hero.image',
      type: 'IMAGE',
      value: '',
      group: 'ahlah-news',
      label: 'Hero — баннер зураг',
      hint: 'Мэдээний хуудасны дээд хэсэгт харагдах баннер зураг.',
      multiline: false,
      order: 1,
    },
  });
  console.log(
    result.value
      ? `✔ already set — value=${result.value.slice(0, 60)}…`
      : `✔ row registered — admin can now upload (key=${result.key})`,
  );
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
