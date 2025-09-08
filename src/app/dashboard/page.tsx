"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountLayout from "@/components/AccountLayout";

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

  async function logout() {
    // Clear cookie client-side
    document.cookie = "session=; Path=/; Max-Age=0; SameSite=Lax";
    router.replace("/login");
  }

  if (!user) return null;

  return (
    <AccountLayout>
      <main className="py-2">
        <h1 className="text-2xl font-medium tracking-tight">Кабинет</h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">Здравствуйте, {user.name} ({user.email})</p>
        <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-200">
          Роль: {user.isAdmin ? "Администратор" : "Пользователь"}
        </p>
        <div className="mt-6">
          {user.isAdmin && (
            <a href="/admin/users" className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-medium text-white mr-3">
              Перейти в админку
            </a>
          )}
          <button onClick={logout} className="inline-flex h-9 items-center rounded-full border border-neutral-900/10 px-4 text-sm font-normal text-neutral-800 hover:bg-neutral-950/[0.04] dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/[0.06]">
            Выйти
          </button>
        </div>
      </main>
    </AccountLayout>
  );
}
