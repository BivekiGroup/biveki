"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, FolderKanban, LogOut } from "lucide-react";

export default function AccountSidebar() {
  const pathname = usePathname();
  const NAV = [
    { href: "/dashboard", label: "Обзор", icon: LayoutDashboard },
    { href: "/projects", label: "Проекты", icon: FolderKanban },
    { href: "/profile", label: "Профиль", icon: User },
  ];

  async function onLogout() {
    try {
      await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "mutation{ logout }" }),
      });
    } finally {
      location.href = "/login";
    }
  }

  return (
    <aside className="w-full sm:w-64 shrink-0">
      <nav className="grid gap-2" aria-label="Навигация аккаунта">
        {NAV.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                active
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                  : "border-neutral-900/10 bg-white/70 text-neutral-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200"
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-3">
        <button
          onClick={onLogout}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-neutral-900/10 px-3 text-sm font-normal text-neutral-800 hover:bg-neutral-950/[0.04] dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/[0.06]"
        >
          <LogOut size={16} />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}


