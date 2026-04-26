import Link from 'next/link';
import { Bell, ExternalLink, Search } from 'lucide-react';
import type { Session } from 'next-auth';

interface TopbarProps {
  user: Session['user'];
}

export function Topbar({ user }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border-light bg-white px-6">
      <div className="hidden flex-1 items-center gap-2 rounded-button border border-border-light bg-cream-soft px-3 py-2 md:flex md:max-w-md">
        <Search className="h-4 w-4 text-text-muted" />
        <input
          type="search"
          placeholder="Хайх... (Cmd+K)"
          className="w-full bg-transparent text-sm text-text-heading placeholder-text-muted focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden items-center gap-1 text-xs font-semibold text-text-muted transition-colors hover:text-navy-900 md:inline-flex"
        >
          Public сайт
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        <button
          type="button"
          aria-label="Мэдэгдэл"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-cream-soft hover:text-navy-900"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 inline-block h-2 w-2 rounded-full bg-gold-500" />
        </button>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-xs font-bold text-gold-500">
            {user.name?.charAt(0).toUpperCase() ?? 'U'}
          </span>
          <div className="hidden text-right md:block">
            <p className="text-xs font-semibold text-navy-900">{user.name}</p>
            <p className="text-[10px] uppercase tracking-wider text-text-muted">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
