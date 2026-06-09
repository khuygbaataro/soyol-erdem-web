import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Munkhchimeg-ийн хүсэлтээр зурагны 5 MB-ийн хязгаарыг хассан —
// одоо Vercel Blob-ийн платформын дотоод хязгаар (нэг файл 500 MB
// хүртэл) л үлдсэн. Хэрэглэгчийн талаас үндсэндээ "хязгааргүй"
// үйлчилнэ. PDF-д урьдын адил 50 MB хэвээр (newspapers/journals).
const MAX_IMAGE_BYTES = 500 * 1024 * 1024; // 500 MB (Vercel Blob max)
const MAX_PDF_BYTES = 50 * 1024 * 1024; // 50 MB — newspapers can be large

const ALLOWED_IMAGE = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const ALLOWED_FILE = [...ALLOWED_IMAGE, 'application/pdf'];
/** Folder prefixes that may upload PDFs (everything else is image-only). */
const PDF_FOLDERS = ['research/', 'newspapers/', 'journals/', 'regulations/', 'handbooks/', 'partners/'];
// journals/ folder is already included above for PDF uploads

/**
 * Vercel Blob client-direct upload endpoint.
 *
 * The browser hits this endpoint to negotiate a one-shot upload token, then
 * uploads the file directly to Vercel Blob storage.
 */
export async function POST(request: Request) {
  // Fail fast with a clear message when the Blob token is missing.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('[upload] BLOB_READ_WRITE_TOKEN is missing from env');
    return NextResponse.json(
      {
        error:
          'Vercel Blob storage тохируулагдаагүй байна. Vercel → Storage → Blob үүсгээд project-тэй холбоно уу.',
      },
      { status: 500 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch (err) {
    console.error('[upload] failed to parse body', err);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const session = await auth();
        if (!session?.user) {
          console.warn('[upload] unauthenticated request');
          throw new Error('Та эхлээд нэвтэрсэн байх ёстой');
        }
        if (!['ADMIN', 'EDITOR', 'LIBRARIAN', 'RESEARCHER'].includes(session.user.role)) {
          console.warn('[upload] forbidden role', session.user.role);
          throw new Error('Танд upload хийх эрх байхгүй');
        }

        const isFile = PDF_FOLDERS.some((p) => pathname.startsWith(p));
        const allowed = isFile ? ALLOWED_FILE : ALLOWED_IMAGE;
        const maxSize = isFile ? MAX_PDF_BYTES : MAX_IMAGE_BYTES;

        return {
          allowedContentTypes: allowed,
          maximumSizeInBytes: maxSize,
          tokenPayload: JSON.stringify({ userId: session.user.id }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('[upload] completed', blob.url);
      },
    });

    return NextResponse.json(json);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    console.error('[upload] handleUpload error:', message, err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
