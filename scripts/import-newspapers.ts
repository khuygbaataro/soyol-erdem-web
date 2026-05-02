/**
 * One-time bulk-import script for legacy newspaper PDFs.
 *
 * Reads every PDF inside `public/Sonin hewlel/`, parses the issue number out
 * of the filename (numeric prefix or any embedded number such as
 * "hevluuleh-lasttt-71-deh-hewlel.pdf" → 71), uploads each one to Vercel
 * Blob under `newspapers/...`, and inserts a Newspaper row in the database.
 *
 * Idempotent — issues that already exist in the DB are skipped, so it's safe
 * to re-run.
 *
 * Usage (from the project root, with .env populated):
 *   npx tsx scripts/import-newspapers.ts
 *
 * After it succeeds the local `public/Sonin hewlel/` folder is no longer
 * needed; the PDFs live in Vercel Blob and are served via fileUrl.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SOURCE_DIR = path.join(process.cwd(), 'public', 'Sonin hewlel');

function parseIssueNumber(filename: string): number | null {
  // Look for the first 1-3 digit number in the basename — handles "62-hewlel",
  // "64hewlel", "hewlel-72", "hevluuleh-lasttt-71-deh-hewlel", "sonin-73", …
  const match = filename.replace(/\.[^.]+$/, '').match(/(\d{1,4})/);
  if (!match) return null;
  return Number.parseInt(match[1], 10);
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      'BLOB_READ_WRITE_TOKEN missing. Ensure .env is populated (npx vercel env pull .env --environment=production).',
    );
  }

  let entries: string[];
  try {
    entries = await readdir(SOURCE_DIR);
  } catch (e) {
    console.error(
      `❌ Cannot read ${SOURCE_DIR}. Make sure the legacy PDFs are present at public/Sonin hewlel/.`,
    );
    throw e;
  }

  const pdfs = entries.filter((f) => f.toLowerCase().endsWith('.pdf')).sort();
  if (pdfs.length === 0) {
    console.log('No PDFs found — nothing to do.');
    return;
  }

  console.log(`Found ${pdfs.length} PDFs to import.`);

  for (const filename of pdfs) {
    const issue = parseIssueNumber(filename);
    if (issue === null) {
      console.warn(`⚠️  Skipping ${filename} — could not parse issue number.`);
      continue;
    }

    const existing = await prisma.newspaper.findUnique({
      where: { issueNumber: issue },
    });
    if (existing) {
      console.log(`✓ №${issue} already in DB — skipping`);
      continue;
    }

    const fullPath = path.join(SOURCE_DIR, filename);
    const buffer = await readFile(fullPath);

    const blobPath = `newspapers/sonin-${issue}-${Date.now()}.pdf`;
    console.log(`↑ Uploading №${issue} (${(buffer.length / 1024 / 1024).toFixed(1)} MB) …`);
    const blob = await put(blobPath, buffer, {
      access: 'public',
      contentType: 'application/pdf',
    });

    await prisma.newspaper.create({
      data: {
        issueNumber: issue,
        fileUrl: blob.url,
        status: 'PUBLISHED',
      },
    });

    console.log(`  ✅ №${issue} → ${blob.url}`);
  }

  console.log('\n🎉 All done.');
}

main()
  .catch((err) => {
    console.error('\n❌ Import failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
