"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountLayout from "@/components/AccountLayout";
import {
  Sparkles,
  TrendingUp,
  FolderKanban,
  Clock,
  Settings,
  ArrowRight,
  User,
  Shield,
  Zap
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ query: "query{ me { id name email isAdmin } }" }),
      });
      const json = await res.json();
      if (!json.data?.me) router.replace("/login");
      else setUser(json.data.me);
    })();
  }, [router]);

  if (!user) return null;

  const stats = [
    {
      label: "Активных проектов",
      value: "0",
      icon: FolderKanban,
      gradient: "from-violet-500 to-purple-600",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20"
    },
    {
      label: "Завершено задач",
      value: "0",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      label: "Часов работы",
      value: "0",
      icon: Clock,
      gradient: "from-amber-500 to-orange-600",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
  ];

  const quickActions = [
    { label: "Новый проект", href: "/projects", icon: FolderKanban },
    { label: "Настройки профиля", href: "/profile", icon: Settings },
    ...(user.isAdmin ? [{ label: "Админ-панель", href: "/admin/users", icon: Shield }] : []),
  ];

  const recentActivity = [
    { text: "Добро пожаловать в ваш личный кабинет!", time: "Сейчас" },
  ];

  return (
    <AccountLayout>
      <main className="py-2 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white dark:border-white/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
          <div className="relative flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
              <User className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Привет, {user.name}!
                </h1>
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
              </div>
              <p className="mt-1 text-blue-100 text-sm">{user.email}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm ring-1 ring-white/30">
                {user.isAdmin ? (
                  <>
                    <Shield className="h-3 w-3" />
                    <span>Администратор</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-3 w-3" />
                    <span>Пользователь</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`group relative overflow-hidden rounded-2xl border ${stat.border} ${stat.bg} p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-4xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-xl bg-gradient-to-br ${stat.gradient} p-3 text-white shadow-lg`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                <TrendingUp className="h-3 w-3" />
                <span>В этом месяце</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Zap className="h-5 w-5 text-amber-500" />
            <h2>Быстрые действия</h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="group flex items-center justify-between rounded-xl border border-neutral-900/10 bg-white p-4 transition-all duration-200 hover:border-blue-500/30 hover:bg-blue-500/5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-blue-500/10"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-2 text-white shadow-sm">
                    <action.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">{action.label}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-blue-500" />
            <h2>Последняя активность</h2>
          </div>
          <div className="mt-4 space-y-3">
            {recentActivity.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-neutral-900/5 bg-neutral-50/50 p-3 dark:border-white/5 dark:bg-white/[0.02]"
              >
                <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </AccountLayout>
  );
}
