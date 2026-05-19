import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const all = await prisma.contactSubmission.findMany({
    where: { subject: { startsWith: 'Элсэлтийн анкет' } },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      id: true,
      name: true,
      subject: true,
      email: true,
      phone: true,
      createdAt: true,
      read: true,
    },
  });
  console.log(`Found ${all.length} admission applications (latest 10):\n`);
  for (const a of all) {
    console.log(
      `[${a.read ? 'read' : 'NEW '}] ${a.createdAt.toISOString()}  ${a.name}  (${a.email})`,
    );
  }
  if (all.length === 0) {
    console.log('  (none yet)');
  }
  // Also count general contact messages so we can compare
  const general = await prisma.contactSubmission.count({
    where: { subject: { not: { startsWith: 'Элсэлтийн анкет' } } },
  });
  console.log(`\nGeneral (non-admission) contact messages: ${general}`);
  await prisma.$disconnect();
}
main();
