"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Briefcase, MapPin, Clock, Rocket, Sparkles, Send } from "lucide-react";
import { JOBS, TEAM_LABELS, type Job } from "@/lib/jobs";

const TEAMS = (Object.keys(TEAM_LABELS) as (keyof typeof TEAM_LABELS)[]).map((k) => ({ key: k, label: TEAM_LABELS[k] }));

export default function CareersPage() {
  const [team, setTeam] = useState<"all" | Job["team"]>("all");
  const list = useMemo(() => (team === "all" ? JOBS : JOBS.filter((j) => j.team === team)), [team]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Карьера
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Присоединяйтесь к Biveki
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          Делаем практичные цифровые продукты: кабинеты, магазины, интеграции. Гибкий график, ответственность и рост.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-700 dark:text-neutral-300">
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10"><Rocket size={14} /> Быстрый онбординг</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10"><Sparkles size={14} /> Осмысленные задачи</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10"><Clock size={14} /> Гибкий график</span>
        </div>
      </section>

      {/* Filters */}
      <section className="mt-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTeam("all")}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${
              team === "all"
                ? "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                : "border-neutral-900/10 bg-white/70 text-neutral-800 hover:bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200"
            }`}
          >
            Все
          </button>
          {TEAMS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTeam(t.key)}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${
                team === t.key
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                  : "border-neutral-900/10 bg-white/70 text-neutral-800 hover:bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Jobs list */}
      <section className="mt-6">
        <div className="grid gap-3 lg:grid-cols-2">
          {list.map((j) => (
            <Link
              key={j.slug}
              href={`/careers/${j.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            >
              <div className="flex items-start gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900/90 text-white dark:bg-white/10">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight">{j.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                    <span className="inline-flex items-center gap-1"><MapPin size={14} /> {j.location}</span>
                    <span>·</span>
                    <span>{TEAM_LABELS[j.team]}, {j.level.toUpperCase()}</span>
                    <span>·</span>
                    <span>{j.type === "full-time" ? "Фулл‑тайм" : j.type === "part-time" ? "Парт‑тайм" : "Контракт"}</span>
                    <span>·</span>
                    <span>{j.salary}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {j.tags.map((t) => (
                      <span key={t} className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] text-neutral-800 dark:border-white/10 dark:text-neutral-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* General apply */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-gradient-to-r from-blue-600 to-sky-500 p-5 text-white shadow-sm dark:border-white/10">
          <div className="text-base font-semibold tracking-tight">Не нашли подходящую вакансию?</div>
          <p className="mt-1 text-sm opacity-90">Оставьте общий отклик — расскажите, чем полезны команде.</p>
          <div className="mt-3">
            <Link href="#apply" className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm hover:bg-white/90">
              Откликнуться
            </Link>
          </div>
        </div>

        <form id="apply" onSubmit={async (e)=>{e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); const payload=Object.fromEntries(fd.entries()); await fetch('/api/graphql',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:"mutation($name:String!,$email:String!,$message:String!){ submitContact(name:$name,email:$email,message:$message,reason:\"career\") }",variables:payload})}); (e.currentTarget as HTMLFormElement).reset(); alert('Отклик отправлен');}} className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
          <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="text-sm font-semibold">Общий отклик</div>
          <div className="mt-3 grid gap-3">
            <div className="grid gap-1">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Имя</label>
              <input name="name" required className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
            </div>
            <div className="grid gap-1">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Email</label>
              <input type="email" name="email" required className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
            </div>
            <div className="grid gap-1">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Сообщение</label>
              <textarea name="message" required rows={4} className="rounded-lg border border-neutral-900/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" placeholder="Коротко о себе, стек, ссылки на проекты/портфолио" />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-sky-600">
                <Send size={16} /> Отправить
              </button>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Согласие на обработку персональных данных.</span>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
