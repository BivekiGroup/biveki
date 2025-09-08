"use client";

import { gql } from "@apollo/client/core";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";

const Q = gql`query($limit:Int,$offset:Int,$search:String){ users(limit:$limit,offset:$offset,search:$search){ id name email isAdmin createdAt } }`;
const SET = gql`mutation($id:ID!,$isAdmin:Boolean!){ setUserAdmin(id:$id,isAdmin:$isAdmin) }`;
const UPDATE = gql`mutation($id:ID!,$name:String!,$email:String!){ updateUser(id:$id,name:$name,email:$email) }`;
const DEL = gql`mutation($id:ID!){ deleteUser(id:$id) }`;

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const { data, refetch } = useQuery(Q, { variables: { limit: 50, offset: 0, search: undefined as any } });
  const [setAdmin] = useMutation(SET);
  const [updateUser] = useMutation(UPDATE);
  const [deleteUser] = useMutation(DEL);
  const list = data?.users || [];
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<{ name: string; email: string }>({ name: "", email: "" });

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    await refetch({ limit: 50, offset: 0, search: search || undefined });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Пользователи</h1>

      <form onSubmit={onSearch} className="mt-3 flex gap-2">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Поиск по email/имени" className="h-10 flex-1 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm dark:border-white/10" />
        <button className="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-semibold text-white">Найти</button>
      </form>

      <div className="mt-4 grid gap-3">
        {list.map((u:any)=> (
          <article key={u.id} className="rounded-2xl border border-neutral-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
            {editingId === u.id ? (
              <form
                onSubmit={async (e)=>{
                  e.preventDefault();
                  await updateUser({ variables: { id: u.id, name: form.name, email: form.email } });
                  setEditingId(null);
                  await refetch();
                }}
                className="flex flex-col gap-2"
              >
                <div className="text-sm font-semibold">Редактировать пользователя</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm dark:border-white/10" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} placeholder="Имя" />
                  <input className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm dark:border-white/10" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} placeholder="Email" />
                </div>
                <div className="flex gap-2">
                  <button className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-3 text-sm font-semibold text-white">Сохранить</button>
                  <button type="button" onClick={()=>setEditingId(null)} className="inline-flex h-9 items-center rounded-full border border-neutral-900/10 px-3 text-sm font-medium text-neutral-800 dark:border-white/10 dark:text-neutral-200">Отмена</button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{u.name || '—'} <span className="ml-2 font-normal text-neutral-600 dark:text-neutral-400">{u.email}</span></div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">{new Date(u.createdAt).toLocaleString('ru-RU')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${u.isAdmin? 'border-emerald-500/50 text-emerald-700 dark:text-emerald-300':'border-neutral-900/10 text-neutral-700 dark:border-white/10 dark:text-neutral-300'}`}>{u.isAdmin? 'Admin':'User'}</span>
                  <button onClick={async ()=>{ await setAdmin({ variables: { id: u.id, isAdmin: !u.isAdmin } }); await refetch(); }} className="inline-flex h-9 items-center rounded-full border border-neutral-900/10 px-3 text-sm font-medium text-neutral-800 hover:bg-neutral-950/[0.04] dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/[0.06]">{u.isAdmin? 'Снять админа':'Назначить админом'}</button>
                  <button onClick={()=>{ setEditingId(u.id); setForm({ name: u.name || '', email: u.email || '' }); }} className="inline-flex h-9 items-center rounded-full border border-neutral-900/10 px-3 text-sm font-medium text-neutral-800 hover:bg-neutral-950/[0.04] dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/[0.06]">Изменить</button>
                  <button onClick={async ()=>{ if (confirm(`Удалить пользователя ${u.email}?`)) { await deleteUser({ variables: { id: u.id } }); await refetch(); } }} className="inline-flex h-9 items-center rounded-full border border-rose-600/20 px-3 text-sm font-medium text-rose-700 hover:bg-rose-600/10 dark:text-rose-300">Удалить</button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
