import { redirect } from 'next/navigation';

/**
 * Bare /high-school/admin URL → bounce to the dashboard so visitors
 * don't 404 if they trim the path or click a bookmark.
 */
export default function HighSchoolAdminRootPage() {
  redirect('/high-school/admin/dashboard');
}
