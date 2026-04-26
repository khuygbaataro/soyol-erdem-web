import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_BYTES = 15 * 1024 * 1024; // 15 MB

const ALLOWED_IMAGE = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const ALLOWED_FILE = [...ALLOWED_IMAGE, 'application/pdf'];

/**
 * Vercel Blob client-direct upload endpoint.
 *
 * The browser hits this endpoint to negotiate a one-shot upload token, then
 * uploads the file directly to Vercel Blob storage. This bypasses the 4.5 MB
 * Vercel function body limit and reduces server CPU.
 *
 * `pathname` is namespaced (e.g. `news/cover-xxx.jpg`) so we only authorise
 * uploads from logged-in admin users to known prefixes.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Authenticate first.
        const session = await auth();
        if (!session?.user) {
          throw new Error('Unauthorized');
        }
        if (!['ADMIN', 'EDITOR', 'LIBRARIAN', 'RESEARCHER'].includes(session.user.role)) {
          throw new Error('Forbidden');
        }

        // Restrict allowed file types based on path prefix.
        const isFile = pathname.startsWith('research/');
        const allowed = isFile ? ALLOWED_FILE : ALLOWED_IMAGE;
        const maxSize = isFile ? MAX_PDF_BYTES : MAX_IMAGE_BYTES;

        return {
          allowedContentTypes: allowed,
          maximumSizeInBytes: maxSize,
          tokenPayload: JSON.stringify({ userId: session.user.id }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Could persist the upload to DB here for auditing.
        // eslint-disable-next-line no-console
        console.log('[upload] completed', blob.url);
      },
    });

    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed' },
      { status: 400 },
    );
  }
}
