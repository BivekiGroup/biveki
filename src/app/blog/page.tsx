"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { POSTS, CATEGORY_LABELS, type Category } from "@/lib/blog";

const CATS: { key: Category; label: string }[] = (
  ["materials", "articles", "insights", "news"] as const
).map((k) => ({ key: k, label: CATEGORY_LABELS[k] }));

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
  } catch {
    return iso;
  }
}

export default function BlogPage() {
  const [active, setActive] = useState<"all" | Category>("all");
  const list = useMemo(
    () => (active === "all" ? POSTS : POSTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Блог
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Полезные материалы и новости
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          Полезные материалы, статьи, инсайты из нашей сферы и новости компании.
        </p>
      </section>

      {/* Category filter */}
      <section className="mt-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActive("all")}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${
              active === "all"
                ? "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                : "border-neutral-900/10 bg-white/70 text-neutral-800 hover:bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200"
            }`}
          >
            Все
          </button>
          {CATS.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${
                active === c.key
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                  : "border-neutral-900/10 bg-white/70 text-neutral-800 hover:bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image src={post.cover} alt={post.title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold tracking-tight line-clamp-2">{post.title}</div>
                <div className="mt-1 line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400">{post.excerpt}</div>
                <div className="mt-3 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                  <span>{formatDate(post.date)} · {post.readMinutes} мин</span>
                  <span className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[10px] text-neutral-700 dark:border-white/10 dark:text-neutral-300">
                    {CATEGORY_LABELS[post.category]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
