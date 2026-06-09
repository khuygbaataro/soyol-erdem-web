import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const c = await prisma.partner.count();
  console.log("Partner count:", c);
}
main().finally(() => prisma.$disconnect());
