"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Media = { id?: string; type: 'image' | 'video'; src: string; alt?: string; poster?: string };

const SERVICES = ["web","account","shop","integrations","apps","support"] as const;

export default function EditCasePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [caseId, setCaseId] = useState<string>("");
  const [form, setForm] = useState({ slug: "", title: "", service: "web", summary: "", problem: "", solution: "", result: "", metrics: "" });
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: `query($slug:String!){ case(slug:$slug){ id slug title service summary problem solution result metrics media{ id type src alt poster } } }`, variables: { slug } }) });
        const data = (await res.json()).data?.case;
        if (!data) { router.replace('/admin/cases'); return; }
        setCaseId(data.id);
        setForm({ slug: data.slug, title: data.title, service: data.service, summary: data.summary, problem: data.problem, solution: data.solution, result: data.result, metrics: (data.metrics||[]).join(', ') });
        setMedia((data.media||[]).map((m:any)=>({ id: m.id, type: m.type, src: m.src, alt: m.alt || '', poster: m.poster || '' })));
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, router]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const metrics = form.metrics.split(",").map(s=>s.trim()).filter(Boolean);
    await fetch('/api/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: `mutation U($id:ID!,$slug:String!,$title:String!,$service:ServiceCategory!,$summary:String!,$problem:String!,$solution:String!,$result:String!,$metrics:[String!]){ updateCase(id:$id,slug:$slug,title:$title,service:$service,summary:$summary,problem:$problem,solution:$solution,result:$result,metrics:$metrics) }`, variables: { id: caseId, slug: form.slug, title: form.title, service: form.service, summary: form.summary, problem: form.problem, solution: form.solution, result: form.result, metrics } }) });
    await fetch('/api/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: `mutation M($id:ID!,$m:[CaseMediaInput!]!){ setCaseMedia(caseId:$id, media:$m) }`, variables: { id: caseId, m: media.map((m)=>({ type: m.type, src: m.src, alt: m.alt || null, poster: m.poster || null })) } }) });
    setSaving(false);
    if (form.slug !== slug) router.replace(`/admin/cases/${form.slug}`);
  }

  async function onUpload(f: File) {
    const fd = new FormData();
    fd.append('file', f);
    fd.append('folder', 'cases');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    return data.path as string;
  }

  function addMedia(type: 'image' | 'video') {
    setMedia(xs => [...xs, { type, src: '', alt: '', poster: '' }]);
  }

  function removeMedia(idx: number) { setMedia(xs => xs.filter((_,i)=> i!==idx)); }

  function moveMedia(idx: number, dir: -1 | 1) {
    setMedia(xs => {
      const arr = [...xs];
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return arr;
      const tmp = arr[idx]; arr[idx] = arr[j]; arr[j] = tmp;
      return arr;
    });
  }

  if (loading) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Редактировать кейс</h1>
        <button onClick={onSave} disabled={saving} className="inline-flex h-9 items-center rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white disabled:opacity-60">Сохранить</button>
      </div>

      <form onSubmit={onSave} className="mt-4 grid gap-4 max-w-3xl">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span>Slug</span>
            <input value={form.slug} onChange={(e)=>setForm({...form, slug: e.target.value })} required className="h-10 rounded-md border border-neutral-900/10 px-3 dark:border-white/10" />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Услуга</span>
            <select value={form.service} onChange={(e)=>setForm({...form, service: e.target.value as any })} className="h-10 rounded-md border border-neutral-900/10 px-3 dark:border-white/10">
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
        </div>
        <label className="grid gap-1 text-sm">
          <span>Название</span>
          <input value={form.title} onChange={(e)=>setForm({...form, title: e.target.value })} required className="h-10 rounded-md border border-neutral-900/10 px-3 dark:border-white/10" />
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
          <input value={form.metrics} onChange={(e)=>setForm({...form, metrics: e.target.value })} className="h-10 rounded-md border border-neutral-900/10 px-3 dark:border-white/10" />
        </label>

        <div className="mt-2">
          <div className="text-sm font-semibold">Медиа</div>
          <div className="mt-2 grid gap-3">
            {media.map((m, i) => (
              <div key={i} className="grid gap-2 rounded-lg border border-neutral-900/10 p-3 text-sm dark:border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <select value={m.type} onChange={(e)=>setMedia(xs=>xs.map((x,j)=>j===i?{...x, type: e.target.value as any}:x))} className="h-8 rounded-md border border-neutral-900/10 px-2 dark:border-white/10">
                      <option value="image">image</option>
                      <option value="video">video</option>
                    </select>
                    <button type="button" onClick={()=>moveMedia(i,-1)} className="rounded-md border border-neutral-900/10 px-2 py-1 dark:border-white/10">↑</button>
                    <button type="button" onClick={()=>moveMedia(i,1)} className="rounded-md border border-neutral-900/10 px-2 py-1 dark:border-white/10">↓</button>
                  </div>
                  <button type="button" onClick={()=>removeMedia(i)} className="rounded-md border border-neutral-900/10 px-2 py-1 text-red-600 dark:border-white/10">Удалить</button>
                </div>
                <label className="grid gap-1">
                  <span className="text-xs opacity-70">Источник (URL)</span>
                  <input value={m.src} onChange={(e)=>setMedia(xs=>xs.map((x,j)=>j===i?{...x, src: e.target.value}:x))} className="h-9 rounded-md border border-neutral-900/10 px-2 text-sm dark:border-white/10" placeholder="/uploads/cases/xxx.png" />
                </label>
                <div className="flex items-center gap-2">
                  <input type="file" accept="image/*,video/*" onChange={async (e)=>{ const f=e.target.files?.[0]; if(!f) return; const p = await onUpload(f); setMedia(xs=>xs.map((x,j)=>j===i?{...x, src: p}:x)); }} />
                </div>
                {m.type === 'image' ? (
                  <label className="grid gap-1">
                    <span className="text-xs opacity-70">Alt</span>
                    <input value={m.alt || ''} onChange={(e)=>setMedia(xs=>xs.map((x,j)=>j===i?{...x, alt: e.target.value}:x))} className="h-9 rounded-md border border-neutral-900/10 px-2 text-sm dark:border-white/10" />
                  </label>
                ) : (
                  <label className="grid gap-1">
                    <span className="text-xs opacity-70">Poster</span>
                    <input value={m.poster || ''} onChange={(e)=>setMedia(xs=>xs.map((x,j)=>j===i?{...x, poster: e.target.value}:x))} className="h-9 rounded-md border border-neutral-900/10 px-2 text-sm dark:border-white/10" placeholder="/uploads/cases/poster.jpg" />
                  </label>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <button type="button" onClick={()=>addMedia('image')} className="rounded-md border border-neutral-900/10 px-3 py-1 text-sm dark:border-white/10">Добавить изображение</button>
            <button type="button" onClick={()=>addMedia('video')} className="rounded-md border border-neutral-900/10 px-3 py-1 text-sm dark:border-white/10">Добавить видео</button>
          </div>
        </div>
      </form>
    </div>
  );
}
