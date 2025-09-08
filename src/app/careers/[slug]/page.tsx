"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Briefcase, MapPin, Clock, CheckCircle2, Send } from "lucide-react";
import { JOBS, TEAM_LABELS } from "@/lib/jobs";

export default function JobDetail({ params }: { params: { slug: string } }) {
  const job = JOBS.find((j) => j.slug === params.slug);
  if (!job) return notFound();

  async function onApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'mutation($name:String!,$email:String!,$message:String!,$reason:String){ submitContact(name:$name,email:$email,message:$message,reason:$reason) }',
        variables: { ...payload, reason: `career:${job.slug}` },
      }),
    });
    (e.currentTarget as HTMLFormElement).reset();
    alert('Отклик отправлен');
  }

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-neutral-600 dark:text-neutral-400">
        <Link href="/careers" className="hover:underline">Карьера</Link>
        <span className="mx-1">/</span>
        <span>{TEAM_LABELS[job.team]}</span>
      </nav>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{job.title}</h1>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
        <span className="inline-flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
        <span>·</span>
        <span>{TEAM_LABELS[job.team]}, {job.level.toUpperCase()}</span>
        <span>·</span>
        <span>{job.type === "full-time" ? "Фулл‑тайм" : job.type === "part-time" ? "Парт‑тайм" : "Контракт"}</span>
        <span>·</span>
        <span>{job.salary}</span>
      </div>

      <section className="mt-6">
        <p className="text-sm leading-6 text-neutral-800 dark:text-neutral-200">{job.about}</p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.06]">
          <div className="text-sm font-semibold">Задачи</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-800 dark:text-neutral-200">
            {job.responsibilities.map((i) => (<li key={i}>{i}</li>))}
          </ul>
        </div>
        <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.06]">
          <div className="text-sm font-semibold">Требования</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-800 dark:text-neutral-200">
            {job.requirements.map((i) => (<li key={i}>{i}</li>))}
          </ul>
        </div>
      </section>

      {(job.nice || job.benefits) && (
        <section className="mt-4 grid gap-4 sm:grid-cols-2">
          {job.nice && (
            <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="text-sm font-semibold">Будет плюсом</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-800 dark:text-neutral-200">
                {job.nice.map((i) => (<li key={i}>{i}</li>))}
              </ul>
            </div>
          )}
          {job.benefits && (
            <div className="rounded-2xl border border-neutral-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="text-sm font-semibold">Мы предлагаем</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-800 dark:text-neutral-200">
                {job.benefits.map((i) => (<li key={i}>{i}</li>))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.06]">
          <div className="text-sm font-semibold">Отклик на вакансию</div>
          <form onSubmit={onApply} className="mt-3 grid gap-3">
            
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
              <textarea name="message" required rows={4} className="rounded-lg border border-neutral-900/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" placeholder="Опыт, стек, ссылки на проекты/резюме" />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-sky-600">
                <Send size={16} /> Отправить
              </button>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Согласие на обработку персональных данных.</span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
