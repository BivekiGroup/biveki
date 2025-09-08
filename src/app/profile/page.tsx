"use client";

import { gql } from "@apollo/client/core";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import AccountLayout from "@/components/AccountLayout";

const ME = gql`query{ me { id name email } }`;
const UPDATE = gql`mutation($name:String!){ updateProfile(name:$name) }`;
const CHANGE = gql`mutation($current:String!,$next:String!){ changePassword(current:$current,next:$next) }`;

export default function ProfilePage() {
  const { data, refetch } = useQuery(ME);
  const [update] = useMutation(UPDATE);
  const [change] = useMutation(CHANGE);
  const user = data?.me;
  const [name, setName] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  if (!user) return null;

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const v = name.trim() || user.name;
    await update({ variables: { name: v } });
    await refetch();
    setMsg("Профиль обновлён");
  }

  async function onChange(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (p1.length < 6 || p2.length < 6) { setMsg("Пароль минимум 6 символов"); return; }
    await change({ variables: { current: p1, next: p2 } }).catch(()=> setMsg("Неверный текущий пароль"));
    setP1(""); setP2("");
    if (!msg) setMsg("Пароль изменён");
  }

  return (
    <AccountLayout>
      <main className="py-2">
        <h1 className="text-2xl font-medium tracking-tight">Профиль</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{user.email}</p>
        <div className="mt-3">
          <form onSubmit={async (e)=>{ e.preventDefault(); await fetch('/api/graphql',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ query: 'mutation{ logout }' })}); location.href='/login'; }}>
            <button className="inline-flex h-9 items-center rounded-full border border-neutral-900/10 px-4 text-sm font-normal text-neutral-800 hover:bg-neutral-950/[0.04] dark:border-white/10 dark:text-neutral-200 dark:hover:bg-white/[0.06]">Выйти</button>
          </form>
        </div>

        {msg && <div className="mt-3 rounded-lg border border-blue-600/20 bg-blue-600/10 px-3 py-2 text-xs text-blue-800 dark:text-blue-300">{msg}</div>}

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <form onSubmit={onSave} className="rounded-2xl border border-neutral-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="text-sm font-medium">Данные</div>
            <div className="mt-3 grid gap-2">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Имя</label>
              <input className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm dark:border-white/10" value={name} onChange={(e)=>setName(e.target.value)} placeholder={user.name} />
              <button className="mt-2 inline-flex h-9 items-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-medium text-white">Сохранить</button>
            </div>
          </form>

          <form onSubmit={onChange} className="rounded-2xl border border-neutral-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="text-sm font-medium">Смена пароля</div>
            <div className="mt-3 grid gap-2">
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Текущий пароль</label>
              <input type="password" className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm dark:border-white/10" value={p1} onChange={(e)=>setP1(e.target.value)} />
              <label className="text-xs text-neutral-600 dark:text-neutral-400">Новый пароль</label>
              <input type="password" className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm dark:border-white/10" value={p2} onChange={(e)=>setP2(e.target.value)} />
              <button className="mt-2 inline-flex h-9 items-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-medium text-white">Изменить</button>
            </div>
          </form>
        </section>
      </main>
    </AccountLayout>
  );
}
