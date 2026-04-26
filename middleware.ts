import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_PREFIX = '/admin';

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith(ADMIN_PREFIX);
  if (!isAdminRoute) return NextResponse.next();

  // Auth.js v5 default cookie names
  const sessionCookie =
    req.cookies.get('authjs.session-token')?.value ??
    req.cookies.get('__Secure-authjs.session-token')?.value;

  if (!sessionCookie) {
    const url = new URL('/login', req.url);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
