"use client";

import { Mail, Phone, Send, Github, Linkedin, MessageCircle, ShieldCheck, Clock, Copy, Check, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function ContactsPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);
  const [copied, setCopied] = useState<"phone" | "email" | null>(null);

  const phone = "+7 (961) 117‑72‑05";
  const phoneHref = "+79611177205";
  const email = "info@biveki.com";

  const reasons = useMemo(() => ([
    { value: "project", label: "Проект/оценка" },
    { value: "support", label: "Поддержка (SLA)" },
    { value: "career", label: "Карьера/сотрудничество" },
    { value: "other", label: "Другое" },
  ] as const), []);

  const budgets = useMemo(() => ([
    { value: "<50k", label: "до 50 000 ₽" },
    { value: "50-150k", label: "50–150 000 ₽" },
    { value: "150-300k", label: "150–300 000 ₽" },
    { value: ">300k", label: "300 000 ₽+" },
  ] as const), []);

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
          query: "mutation($name:String!,$email:String!,$message:String!,$reason:String){ submitContact(name:$name,email:$email,message:$message,reason:$reason) }",
          variables: { ...payload, reason: (payload as any).reason || "contact" },
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
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.25), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(14,165,233,0.25), transparent)" }}
        />

        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Контакты
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Связаться с Biveki
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          Напишите нам в мессенджер или оставьте заявку — отвечаем в течение дня.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-neutral-700 dark:text-neutral-300">
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10"><Clock size={14} /> Ответ в течение дня</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10"><ShieldCheck size={14} /> Данные защищены</span>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Left: quick channels */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
            <div className="text-sm font-semibold">Быстрые контакты</div>
            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                  <Phone size={16} />
                  <a href={`tel:${phoneHref}`} className="hover:underline">{phone}</a>
                </div>
                <button
                  type="button"
                  onClick={async () => { try { await navigator.clipboard.writeText(phoneHref); setCopied("phone"); setTimeout(() => setCopied(null), 1500);} catch {} }}
                  className="inline-flex h-8 items-center justify-center gap-1 rounded-full border border-neutral-900/10 px-2 text-xs hover:bg-neutral-950/[0.04] dark:border-white/10 dark:hover:bg-white/[0.06]"
                >
                  {copied === "phone" ? <Check size={14} /> : <Copy size={14} />}
                  {copied === "phone" ? "Скопировано" : "Копировать"}
                </button>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                  <Mail size={16} />
                  <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                </div>
                <button
                  type="button"
                  onClick={async () => { try { await navigator.clipboard.writeText(email); setCopied("email"); setTimeout(() => setCopied(null), 1500);} catch {} }}
                  className="inline-flex h-8 items-center justify-center gap-1 rounded-full border border-neutral-900/10 px-2 text-xs hover:bg-neutral-950/[0.04] dark:border-white/10 dark:hover:bg-white/[0.06]"
                >
                  {copied === "email" ? <Check size={14} /> : <Copy size={14} />}
                  {copied === "email" ? "Скопировано" : "Копировать"}
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href="#" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-900/10 bg-gradient-to-r from-sky-600 to-cyan-500 px-3 text-sm font-semibold text-white shadow-sm hover:from-sky-700 hover:to-cyan-600">
                <MessageCircle size={16} /> Telegram
              </a>
              <a href="#" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-900/10 bg-gradient-to-r from-emerald-600 to-teal-500 px-3 text-sm font-semibold text-white shadow-sm hover:from-emerald-700 hover:to-teal-600">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
            <div className="text-sm font-semibold">Соцсети</div>
            <div className="mt-3 flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
              <a href="#" aria-label="GitHub" className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-3 py-1 text-sm hover:bg-neutral-950/[0.04] dark:border-white/10 dark:hover:bg-white/[0.06]"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a>
              <a href="#" aria-label="LinkedIn" className="inline-flex items-center gap-1 rounded-full border border-neutral-900/10 px-3 py-1 text-sm hover:bg-neutral-950/[0.04] dark:border-white/10 dark:hover:bg-white/[0.06]"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a>
            </div>
            <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400">Предпочитаете диалог? Напишите — ответим в течение дня.</p>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={onSubmit} className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
          <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          <div className="text-sm font-semibold">Форма обратной связи</div>

          {sent === "ok" && (
            <div className="mt-3 inline-flex w-full items-center gap-2 rounded-xl border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-xs text-emerald-800 dark:text-emerald-300">
              <Check size={14} /> Сообщение отправлено. Ответим в течение дня.
            </div>
          )}
          {sent === "err" && (
            <div className="mt-3 inline-flex w-full items-center gap-2 rounded-xl border border-rose-600/20 bg-rose-600/10 px-3 py-2 text-xs text-rose-800 dark:text-rose-300">
              Произошла ошибка. Попробуйте ещё раз.
            </div>
          )}

          <div className="mt-3 grid gap-3">
            <div className="grid gap-1">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Имя</label>
              <input name="name" required className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
            </div>
            <div className="grid gap-1">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Email</label>
              <input type="email" name="email" required className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
            </div>
            <div className="grid gap-1 sm:grid-cols-2 sm:gap-3">
              <div className="grid gap-1">
                <label className="text-xs text-neutral-600 dark:text-neutral-400">Тип запроса</label>
                <select name="reason" className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10">
                  {reasons.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-xs text-neutral-600 dark:text-neutral-400">Бюджет (необязательно)</label>
                <select name="budget" className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10">
                  <option value="">Не указан</option>
                  {budgets.map((b) => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-1">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Сообщение</label>
              <textarea name="message" required rows={5} className="rounded-lg border border-neutral-900/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
            </div>

            <label className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <input type="checkbox" name="acceptOffer" required className="mt-0.5 h-4 w-4 rounded border-neutral-900/10 text-blue-600 focus:ring-blue-500 dark:border-white/10" />
              <span>
                Я ознакомлен(а) и согласен(на) с условиями{" "}
                <Link href="/offer" target="_blank" className="text-blue-600 hover:underline dark:text-blue-400">
                  Публичной оферты
                </Link>
                {" "}и{" "}
                <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline dark:text-blue-400">
                  Политики конфиденциальности
                </Link>
              </span>
            </label>

            <div className="flex items-center gap-2">
              <button disabled={loading} className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-sky-600 disabled:opacity-60">
                <Send size={16} />
                Отправить
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
