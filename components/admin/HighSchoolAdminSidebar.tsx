'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronsLeft,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  School,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HighSchoolAdminSidebarProps {
  userName: string;
  role: string;
}

const NAV: { label: string; href: string; icon: typeof LayoutDashboard }[] = [
  { label: 'Хянах самбар', href: '/high-school/admin/dashboard', icon: LayoutDashboard },
  { label: 'Элсэлтийн хүсэлт', href: '/high-school/admin/applications', icon: GraduationCap },
  { label: 'Мэдээ', href: '/high-school/admin/news', icon: FileText },
  { label: 'Хуудасны агуулга', href: '/high-school/admin/site-content', icon: LayoutTemplate },
];

/**
 * Sidebar for the standalone high-school admin shell. Same layout language
 * as the main admin sidebar, but visually marked as a separate product:
 * the masthead reads "Ахлах сургууль · Хянах самбар" and only the
 * high-school nav entries are exposed -- the editor never sees the main
 * university admin items.
 */
export function HighSchoolAdminSidebar({ userName, role }: HighSchoolAdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 flex-col bg-[#0f1f3a] text-white transition-all duration-300 lg:flex',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/high-school/admin/dashboard" className="flex items-center gap-2 text-sm font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/40">
              <School className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              Соёл Эрдэм
              <span className="block text-[10px] font-medium text-gold-400/80">
                Ахлах сургууль
              </span>
            </span>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="text-white/70 transition-colors hover:text-gold-400"
          aria-label={collapsed ? 'Дэлгэрэнгүй' : 'Хумих'}
        >
          <ChevronsLeft className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {!collapsed && (
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
            Удирдлага
          </p>
        )}
        <ul className="space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-button px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gold-500 text-navy-900'
                      : 'text-white/80 hover:bg-white/10 hover:text-white',
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-400">
              {userName.charAt(0).toUpperCase()}
            </span>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold">{userName}</p>
              <p className="truncate text-xs text-white/60">{role}</p>
            </div>
            <form action="/api/auth/signout" method="post">
              <input type="hidden" name="callbackUrl" value="/high-school/login" />
              <button
                type="submit"
                aria-label="Гарах"
                className="text-white/60 transition-colors hover:text-gold-400"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        ) : (
          <form action="/api/auth/signout" method="post">
            <input type="hidden" name="callbackUrl" value="/high-school/login" />
            <button
              type="submit"
              aria-label="Гарах"
              className="flex w-full items-center justify-center text-white/60 hover:text-gold-400"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
