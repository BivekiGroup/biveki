"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Case = { id: string; slug: string; title: string; service: string; createdAt: string };

export default function AdminCasesPage() {
  const [list, setList] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: `query{ cases(limit: 200){ id slug title service createdAt } }` }),
        });
        const json = await res.json();
        setList(json.data?.cases || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onDelete(id: string) {
    if (!confirm("Удалить кейс?")) return;
    await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: `mutation($id: ID!){ deleteCase(id:$id) }`, variables: { id } }),
    });
    setList((xs) => xs.filter((x) => x.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Кейсы</h1>
        <Link href="/admin/cases/new" className="inline-flex h-9 items-center rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white">
          Новый кейс
        </Link>
      </div>
      <div className="mt-4 grid gap-2">
        {loading && <div className="text-sm opacity-70">Загрузка…</div>}
        {!loading && list.length === 0 && <div className="text-sm opacity-70">Пусто</div>}
        {list.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-lg border border-neutral-900/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/[0.06]">
            <div className="flex min-w-0 items-center gap-2">
              <div className="truncate font-medium">{c.title}</div>
              <div className="shrink-0 rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] dark:border-white/10">{c.service}</div>
              <div className="hidden shrink-0 text-xs text-neutral-600 dark:text-neutral-400 sm:block">/{c.slug}</div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/cases/${c.slug}`} className="rounded-md border border-neutral-900/10 px-2 py-1 hover:bg-neutral-950/[0.03] dark:border-white/10 dark:hover:bg-white/[0.06]">Редактировать</Link>
              <button onClick={() => onDelete(c.id)} className="rounded-md border border-neutral-900/10 px-2 py-1 text-red-600 hover:bg-red-50 dark:border-white/10 dark:hover:bg-white/[0.06]">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

