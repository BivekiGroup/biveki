"use client";

import { gql } from "@apollo/client/core";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import AccountLayout from "@/components/AccountLayout";

const LIST = gql`query($limit:Int,$offset:Int){ myProjects(limit:$limit,offset:$offset){ id name description createdAt } }`;
const CREATE = gql`mutation($name:String!,$description:String){ createProject(name:$name,description:$description) }`;

export default function ProjectsPage() {
  const { data, refetch } = useQuery(LIST, { variables: { limit: 50, offset: 0 } });
  const [create] = useMutation(CREATE);
  const list = data?.myProjects || [];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!name.trim()) { setMsg("Название обязательно"); return; }
    await create({ variables: { name: name.trim(), description: description.trim() || null } });
    setName(""); setDescription("");
    await refetch();
    setMsg("Проект создан");
  }

  return (
    <AccountLayout>
      <main className="py-2">
        <h1 className="text-2xl font-medium tracking-tight">Проекты</h1>

        <form onSubmit={onCreate} className="mt-4 rounded-2xl border border-neutral-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.06]">
          <div className="text-sm font-medium">Создать проект</div>
          {msg && <div className="mt-3 rounded-lg border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-xs text-emerald-800 dark:text-emerald-300">{msg}</div>}
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Название" className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm dark:border-white/10" />
            <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Описание (необязательно)" className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm dark:border-white/10" />
          </div>
          <button className="mt-3 inline-flex h-9 items-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-medium text-white">Создать</button>
        </form>

        <section className="mt-6 grid gap-3">
          {list.map((p:any)=> (
            <article key={p.id} className="rounded-2xl border border-neutral-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="text-sm font-medium">{p.name}</div>
              {p.description && <div className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{p.description}</div>}
              <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{new Date(p.createdAt).toLocaleString('ru-RU')}</div>
            </article>
          ))}
          {list.length === 0 && (
            <div className="rounded-2xl border border-dashed border-neutral-900/15 p-6 text-center text-sm text-neutral-700 dark:border-white/10 dark:text-neutral-300">Пока нет проектов. Создайте первый.</div>
          )}
        </section>
      </main>
    </AccountLayout>
  );
}


