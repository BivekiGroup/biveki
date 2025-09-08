"use client";

import { useState } from "react";
import Link from "next/link";
import { Handshake, Rocket, BadgePercent, CheckCircle2, Send } from "lucide-react";

type Tier = { name: string; pct: string; req: string };
const TIERS: Tier[] = [
  { name: "Bronze", pct: "10%", req: "1–2 сделки/год" },
  { name: "Silver", pct: "12%", req: "3–4 сделки/год" },
  { name: "Gold", pct: "15%", req: "5+ сделок/год" },
];

export default function PartnersPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setLoading(true);
    setSent(null);
    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "mutation($name:String!,$email:String!,$message:String!){ submitContact(name:$name,email:$email,message:$message,reason:\"referral\") }",
          variables: payload,
        }),
      });
      const json = await res.json();
      if (!json.data?.submitContact) throw new Error("failed");
      setSent("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setSent("err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Реферальное партнёрство
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Рекомендуйте нас — заработайте на проекте
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          Передайте контакт клиента, мы доведём сделку и реализуем работу. После оплаты — выплата процента от бюджета.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-700 dark:text-neutral-300">
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10"><Handshake size={14} /> Честные условия</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10"><Rocket size={14} /> Быстрый старт</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10"><CheckCircle2 size={14} /> SLA по договорённости</span>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-sm font-semibold">Как это работает</div>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {[{
            title: "Рекомендуете нас",
            desc: "Передаёте контакт LPR или делаете тёплое интро. Фиксируем вас как реферала.",
          }, {
            title: "Сделка и работы",
            desc: "Проводим брифинг, согласуем смету и сроки, реализуем проект по договору.",
          }, {
            title: "Выплата вознаграждения",
            desc: "После поступления оплаты перечисляем процент от бюджета на ваш счёт.",
          }].map((s) => (
            <div key={s.title} className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900/90 text-white dark:bg-white/10">
                <BadgePercent className="h-5 w-5" />
              </div>
              <div className="mt-2 text-sm font-semibold tracking-tight">{s.title}</div>
              <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-sm font-semibold">Вознаграждение за рекомендации</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.name} className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
              <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              <div className="text-sm font-semibold tracking-tight">{t.name}</div>
              <div className="mt-1 text-3xl font-semibold">{t.pct}</div>
              <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">от бюджета проекта · {t.req}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">Фиксируем условия в договоре или допсоглашении. Детали — по брифу.</p>
      </section>

      {/* Packages + form */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-gradient-to-r from-blue-600 to-sky-500 p-5 text-white shadow-sm dark:border-white/10">
          <div className="text-base font-semibold tracking-tight">Готовы рекомендовать нас?</div>
          <p className="mt-1 text-sm opacity-90">Оставьте заявку — пришлём шаблон интро и зафиксируем условия.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/contacts" className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm hover:bg-white/90">
              Написать
            </Link>
            <Link href="/about" className="inline-flex h-9 items-center rounded-full border border-white/60 px-4 text-sm font-medium text-white/95 hover:bg-white/10">
              Узнать о нас
            </Link>
          </div>
        </div>

        <form onSubmit={onSubmit} className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
          <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="text-sm font-semibold">Заявка на реферальное партнёрство</div>
          {sent === "ok" && (
            <div className="mt-3 inline-flex w-full items-center gap-2 rounded-xl border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" /> Заявка отправлена. Мы свяжемся в течение дня.
            </div>
          )}
          {sent === "err" && (
            <div className="mt-3 inline-flex w-full items-center gap-2 rounded-xl border border-rose-600/20 bg-rose-600/10 px-3 py-2 text-xs text-rose-800 dark:text-rose-300">
              Не удалось отправить. Попробуйте ещё раз.
            </div>
          )}
          <div className="mt-3 grid gap-3">
            <div className="grid gap-1">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Имя/Компания</label>
              <input name="name" required className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
            </div>
            <div className="grid gap-1">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Email</label>
              <input type="email" name="email" required className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
            </div>
            <div className="grid gap-1">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Комментарий</label>
              <textarea name="message" required rows={4} className="rounded-lg border border-neutral-900/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" placeholder="Кого готовы порекомендовать, ниша клиента, этап разговора" />
            </div>
            <input type="hidden" name="reason" value="referral" />
            <div className="flex items-center gap-2">
              <button disabled={loading} className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-sky-600 disabled:opacity-60">
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
