"use client";

import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";

const Q = gql`
  query($reason:String,$limit:Int,$offset:Int){
    contacts(reason:$reason,limit:$limit,offset:$offset){ id name email message reason createdAt }
  }
`;

export default function AdminContactsPage() {
  const [reason, setReason] = useState<string|undefined>(undefined);
  const { data, refetch } = useQuery(Q, { variables: { reason, limit: 50, offset: 0 } });
  const list = data?.contacts || [];

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Заявки</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          {k: undefined, label: 'Все'},
          {k: 'contact', label: 'Контакты'},
          {k: 'referral', label: 'Партнёрство'},
          {k: 'career', label: 'Карьера'},
        ].map((r)=> (
          <button key={String(r.k)} onClick={()=>{ setReason(r.k as any); refetch({ reason: r.k }); }} className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${reason===r.k? 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300':'border-neutral-900/10 bg-white/70 text-neutral-800 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200'}`}>
            {r.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3">
        {list.map((c:any)=> (
          <article key={c.id} className="rounded-2xl border border-neutral-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">{c.name} <span className="ml-2 font-normal text-neutral-600 dark:text-neutral-400">{c.email}</span></div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">{new Date(c.createdAt).toLocaleString('ru-RU')}</div>
            </div>
            <div className="mt-2 text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">{c.message}</div>
            <div className="mt-2"><span className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] text-neutral-700 dark:border-white/10 dark:text-neutral-300">{c.reason || '—'}</span></div>
          </article>
        ))}
      </div>
    </main>
  );
}

