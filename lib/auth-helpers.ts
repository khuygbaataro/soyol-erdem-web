import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import type { Role } from '@prisma/client';

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

export async function requireRole(roles: Role[]) {
  const user = await requireUser();
  if (!roles.includes(user.role)) redirect('/admin/dashboard');
  return user;
}

/** API helper — returns 401 / 403 responses instead of redirecting. */
export async function requireApiUser(roles?: Role[]) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      user: null as never,
      error: new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      }),
    };
  }
  if (roles && !roles.includes(user.role)) {
    return {
      user: null as never,
      error: new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      }),
    };
  }
  return { user, error: null };
}
