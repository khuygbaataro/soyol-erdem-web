import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient();
const token = process.env.BLOB_TOKEN!;
const base = "D:/Soyol-erdem-website/soyol-erdem-web/public";

const JOURNALS = [
  { slug:"sp-2023-n1", title:"1-р боть", subtitle:"2023 он · №1", volume:1, year:2023, issue:"№1", file:"journals/sp-2023-n1.pdf", cover:"/Erdemshinjilgee/1.jpg", order:1 },
  { slug:"sp-2024-n1", title:"2-р боть", subtitle:"2024 он · №1", volume:2, year:2024, issue:"№1", file:"journals/sp-2024-n1.pdf", cover:"/Erdemshinjilgee/2.jpg", order:2 },
  { slug:"sp-2025-n1", title:"3-р боть", subtitle:"2025 он · №1", volume:3, year:2025, issue:"№1", file:"journals/sp-2025-n1.pdf", cover:"/Erdemshinjilgee/3.jpg", order:3 },
  { slug:"sp-2025-n2", title:"4-р боть", subtitle:"2025 он · №2", volume:4, year:2025, issue:"№2", file:"journals/sp-2025-n2.pdf", cover:"/Erdemshinjilgee/4.jpg", order:4 },
  { slug:"sp-2026-n1", title:"5-р боть", subtitle:"2026 он · №1", volume:5, year:2026, issue:"№1", file:"journals/sp-2026-n1.pdf", cover:"/Erdemshinjilgee/4.jpg", order:5 },
];

async function main() {
  const existing = await prisma.researchJournal.count();
  if (existing > 0) { console.log("Already seeded:", existing); return; }
  for (const j of JOURNALS) {
    console.log("Uploading", j.file, "...");
    const buf = readFileSync(`${base}/${j.file}`);
    const blob = await put(`journals/${j.slug}.pdf`, buf, { access:"public", token, contentType:"application/pdf", allowOverwrite:true });
    await prisma.researchJournal.create({ data: { slug:j.slug, title:j.title, subtitle:j.subtitle, volume:j.volume, year:j.year, issue:j.issue, fileUrl:blob.url, cover:j.cover, active:true, order:j.order } });
    console.log("  →", blob.url);
  }
  console.log("Done! Seeded", JOURNALS.length, "journals.");
}
main().finally(() => prisma.$disconnect());
