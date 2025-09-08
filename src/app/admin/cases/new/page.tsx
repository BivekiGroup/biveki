"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SERVICES = ["web","account","shop","integrations","apps","support"] as const;

export default function NewCasePage() {
  const router = useRouter();
  const [form, setForm] = useState({ slug: "", title: "", service: "web", summary: "", problem: "", solution: "", result: "", metrics: "" });
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const metrics = form.metrics.split(",").map(s=>s.trim()).filter(Boolean);
    const res = await fetch('/api/graphql', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation C($slug:String!,$title:String!,$service:ServiceCategory!,$summary:String!,$problem:String!,$solution:String!,$result:String!,$metrics:[String!]){ createCase(slug:$slug,title:$title,service:$service,summary:$summary,problem:$problem,solution:$solution,result:$result,metrics:$metrics) }`,
        variables: { slug: form.slug, title: form.title, service: form.service, summary: form.summary, problem: form.problem, solution: form.solution, result: form.result, metrics },
      })
    });
    const ok = (await res.json()).data?.createCase;
    setSaving(false);
    if (ok) router.replace(`/admin/cases/${form.slug}`);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Новый кейс</h1>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3 max-w-2xl">
        <label className="grid gap-1 text-sm">
          <span>Slug</span>
          <input value={form.slug} onChange={(e)=>setForm({...form, slug: e.target.value })} required className="h-10 rounded-md border border-neutral-900/10 px-3 dark:border-white/10" placeholder="example-slug" />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Название</span>
          <input value={form.title} onChange={(e)=>setForm({...form, title: e.target.value })} required className="h-10 rounded-md border border-neutral-900/10 px-3 dark:border-white/10" />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Услуга</span>
          <select value={form.service} onChange={(e)=>setForm({...form, service: e.target.value as any })} className="h-10 rounded-md border border-neutral-900/10 px-3 dark:border-white/10">
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span>Кратко</span>
          <textarea value={form.summary} onChange={(e)=>setForm({...form, summary: e.target.value })} required className="min-h-20 rounded-md border border-neutral-900/10 px-3 py-2 dark:border-white/10" />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Проблема</span>
          <textarea value={form.problem} onChange={(e)=>setForm({...form, problem: e.target.value })} required className="min-h-20 rounded-md border border-neutral-900/10 px-3 py-2 dark:border-white/10" />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Решение</span>
          <textarea value={form.solution} onChange={(e)=>setForm({...form, solution: e.target.value })} required className="min-h-20 rounded-md border border-neutral-900/10 px-3 py-2 dark:border-white/10" />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Результат</span>
          <textarea value={form.result} onChange={(e)=>setForm({...form, result: e.target.value })} required className="min-h-20 rounded-md border border-neutral-900/10 px-3 py-2 dark:border-white/10" />
        </label>
        <label className="grid gap-1 text-sm">
          <span>Метрики (через запятую)</span>
          <input value={form.metrics} onChange={(e)=>setForm({...form, metrics: e.target.value })} className="h-10 rounded-md border border-neutral-900/10 px-3 dark:border-white/10" placeholder="+36% конверсия, −28% CPL" />
        </label>
        <div>
          <button disabled={saving} className="inline-flex h-10 items-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white disabled:opacity-60">Создать</button>
        </div>
      </form>
    </div>
  );
}
