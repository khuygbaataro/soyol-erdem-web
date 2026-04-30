'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  ChevronsLeft,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Microscope,
  Settings as SettingsIcon,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Role } from '@prisma/client';

interface SidebarProps {
  role: Role;
  userName: string;
}

const NAV = [
  { label: 'Хянах самбар', href: '/admin/dashboard', icon: LayoutDashboard, roles: null },
  { label: 'Мэдээ', href: '/admin/news', icon: FileText, roles: ['ADMIN', 'EDITOR'] },
  { label: 'Номын сан', href: '/admin/library', icon: BookOpen, roles: ['ADMIN', 'LIBRARIAN'] },
  { label: 'Эрдэм шинжилгээ', href: '/admin/research', icon: Microscope, roles: ['ADMIN', 'RESEARCHER'] },
  { label: 'Мэргэжил', href: '/admin/programs', icon: GraduationCap, roles: ['ADMIN'] },
  { label: 'Хуудасны агуулга', href: '/admin/site-content', icon: LayoutTemplate, roles: ['ADMIN'] },
  { label: 'Статистикууд', href: '/admin/stats', icon: BarChart3, roles: ['ADMIN'] },
  { label: 'Хэрэглэгч', href: '/admin/users', icon: Users, roles: ['ADMIN'] },
  { label: 'Тохиргоо', href: '/admin/settings', icon: SettingsIcon, roles: ['ADMIN'] },
] as const;

export function Sidebar({ role, userName }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 flex-col bg-navy-900 text-white transition-all duration-300 lg:flex',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-sm font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/40">
              СЭ
            </span>
            <span>Соёл-Эрдэм</span>
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
        <ul className="space-y-1">
          {NAV.filter((item) => !item.roles || (item.roles as readonly string[]).includes(role)).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
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
              <input type="hidden" name="callbackUrl" value="/login" />
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
            <input type="hidden" name="callbackUrl" value="/login" />
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
