"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, FolderKanban, LogOut, Home, ArrowRight, AlertTriangle } from "lucide-react";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";

const ME = gql`
  query {
    me {
      id
      clientProfile {
        id
        type
        lastName
        firstName
        bik
        accountNumber
        inn
        companyName
      }
    }
  }
`;

export default function AccountSidebar() {
  const pathname = usePathname();
  const { data } = useQuery(ME, {
    fetchPolicy: "cache-first", // Использовать кэш, если данные уже есть
  });

  const profile = data?.me?.clientProfile;
  const isLegalInfoFilled = profile && profile.bik && profile.accountNumber && (
    (profile.type === "INDIVIDUAL" && profile.lastName && profile.firstName) ||
    (profile.type === "LEGAL" && profile.inn && profile.companyName)
  );

  const NAV = [
    { href: "/dashboard", label: "Обзор", icon: LayoutDashboard, gradient: "from-blue-500 to-indigo-600" },
    { href: "/projects", label: "Проекты", icon: FolderKanban, gradient: "from-violet-500 to-purple-600" },
    { href: "/profile", label: "Профиль", icon: User, gradient: "from-pink-500 to-rose-600", badge: !isLegalInfoFilled },
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
    <aside className="w-full sm:w-64 shrink-0 space-y-4">
      {/* Brand Section */}
      <div className="rounded-2xl border border-neutral-900/10 bg-gradient-to-br from-slate-50 to-neutral-100 p-4 dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.03]">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
            <Home className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">Biveki</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Личный кабинет</p>
          </div>
          <ArrowRight className="h-4 w-4 text-neutral-400 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
        </Link>
      </div>

      {/* Legal Info Warning */}
      {!isLegalInfoFilled && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-50/50 p-3 dark:bg-amber-500/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-md bg-amber-500 opacity-75"></div>
              <div className="relative flex h-5 w-5 items-center justify-center rounded-md bg-amber-500">
                <AlertTriangle className="h-3 w-3 text-white" />
              </div>
            </div>
            <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">
              Заполните реквизиты
            </p>
          </div>
          <Link
            href="/profile/legal"
            className="group flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-amber-600 active:scale-95"
          >
            <span>Заполнить</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-1.5" aria-label="Навигация аккаунта">
        {NAV.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group relative overflow-hidden flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                active
                  ? "border-transparent shadow-lg shadow-black/5 dark:shadow-black/20"
                  : "border-neutral-900/10 bg-white/70 text-neutral-700 hover:border-neutral-900/20 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200 dark:hover:bg-white/[0.09]"
              }`}
            >
              {active && (
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient}`}></div>
              )}
              <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-lg ${
                active
                  ? "bg-white/20 text-white"
                  : "bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200 dark:bg-white/[0.08] dark:text-neutral-400 dark:group-hover:bg-white/[0.12]"
              }`}>
                <item.icon size={16} />
              </div>
              <span className={`relative z-10 flex-1 ${active ? "text-white" : ""}`}>{item.label}</span>
              {item.badge && !active && (
                <div className="relative z-10 ml-auto flex h-5 w-5 items-center justify-center">
                  <div className="absolute inset-0 animate-ping rounded-full bg-amber-500 opacity-75"></div>
                  <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 shadow-lg">
                    <AlertTriangle className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
              {active && !item.badge && (
                <div className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-white"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="group flex w-full items-center gap-3 rounded-xl border border-red-500/20 bg-red-50/50 px-4 py-3 text-sm font-medium text-red-700 transition-all duration-200 hover:border-red-500/30 hover:bg-red-100/70 hover:shadow-md dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:group-hover:bg-red-500/30">
            <LogOut size={16} />
          </div>
          <span>Выйти из аккаунта</span>
        </button>
      </div>
    </aside>
  );
}


