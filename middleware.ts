import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MAIN_ADMIN_PREFIX = '/admin';
const HS_ADMIN_PREFIX = '/high-school/admin';

/**
 * Auth gate for admin shells. Two parallel admin trees share the same
 * session cookie but bounce unauthenticated requests to their own login:
 *   /admin/*               → /login
 *   /high-school/admin/*   → /high-school/login
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isHighSchoolAdmin = pathname.startsWith(HS_ADMIN_PREFIX);
  const isMainAdmin =
    pathname.startsWith(MAIN_ADMIN_PREFIX) && !isHighSchoolAdmin;

  if (!isHighSchoolAdmin && !isMainAdmin) return NextResponse.next();

  const sessionCookie =
    req.cookies.get('authjs.session-token')?.value ??
    req.cookies.get('__Secure-authjs.session-token')?.value;

  if (!sessionCookie) {
    const loginPath = isHighSchoolAdmin ? '/high-school/login' : '/login';
    const url = new URL(loginPath, req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/high-school/admin/:path*'],
};
