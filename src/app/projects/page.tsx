"use client";

import { gql } from "@apollo/client/core";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import AccountLayout from "@/components/AccountLayout";
import {
  Plus,
  FolderKanban,
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Layers,
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const LIST = gql`query($limit:Int,$offset:Int){ myProjects(limit:$limit,offset:$offset){ id name description createdAt } }`;
const CREATE = gql`mutation($name:String!,$description:String){ createProject(name:$name,description:$description) }`;

export default function ProjectsPage() {
  const { data, loading, refetch } = useQuery(LIST, { variables: { limit: 50, offset: 0 } });
  const [create] = useMutation(CREATE);
  const list = data?.myProjects || [];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<"success" | "error">("success");
  const [showModal, setShowModal] = useState(false);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!name.trim()) {
      setMsgType("error");
      setMsg("Название проекта обязательно");
      return;
    }
    await create({ variables: { name: name.trim(), description: description.trim() || null } });
    setName("");
    setDescription("");
    await refetch();
    setMsgType("success");
    setMsg("Проект успешно создан!");
    setShowModal(false);
    setTimeout(() => setMsg(null), 3000);
  }

  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-600",
    "from-cyan-500 to-blue-600",
    "from-violet-500 to-purple-600",
  ];

  return (
    <AccountLayout>
      <main className="py-2 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Мои проекты</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {list.length === 0 ? "Пока нет проектов" : `Всего проектов: ${list.length}`}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/40 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            Новый проект
          </button>
        </div>

        {/* Notification */}
        {msg && (
          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 ${
              msgType === "success"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300"
            }`}
          >
            {msgType === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            )}
            <p className="text-sm font-medium">{msg}</p>
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]"
              >
                {/* Gradient bar skeleton */}
                <div className="absolute inset-x-0 top-0 h-1 animate-pulse bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600"></div>

                {/* Icon skeleton */}
                <div className="mb-4 inline-flex h-11 w-11 animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-700"></div>

                {/* Title skeleton */}
                <div className="h-6 w-3/4 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700"></div>

                {/* Description skeleton */}
                <div className="mt-3 space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
                </div>

                {/* Footer skeleton */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-3.5 w-3.5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="h-3 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"></div>
                </div>
              </div>
            ))}
          </div>
        ) : list.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p: any, idx: number) => {
              const gradient = gradients[idx % gradients.length];
              return (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]"
                >
                  {/* Gradient bar */}
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient}`}></div>

                  {/* Icon */}
                  <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${gradient} p-3 text-white shadow-lg`}>
                    <FolderKanban className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center justify-between">
                    <span>{p.name}</span>
                    <ArrowRight className="h-5 w-5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1" />
                  </h3>
                  {p.description && (
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {p.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <Clock className="h-3.5 w-3.5" />
                    <time>
                      {new Date(p.createdAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-neutral-900/15 bg-neutral-50/50 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 text-violet-600 dark:from-violet-500/20 dark:to-purple-500/20 dark:text-violet-400">
                <FolderKanban className="h-10 w-10" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Нет проектов
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Создайте свой первый проект, чтобы начать работу
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-200 hover:scale-[1.02]"
              >
                <Plus className="h-4 w-4" />
                Создать проект
              </button>
            </div>
          </div>
        )}

        {/* Create Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div
              className="relative w-full max-w-lg rounded-3xl border border-neutral-900/10 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-neutral-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-white/10 dark:hover:text-neutral-200"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30">
                  <Sparkles className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Новый проект
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Создайте проект для управления задачами
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={onCreate} className="mt-8 space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    <FolderKanban className="h-4 w-4 text-neutral-500" />
                    Название проекта
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Мой крутой проект"
                    className="h-12 w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    <FileText className="h-4 w-4 text-neutral-500" />
                    Описание (необязательно)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Краткое описание проекта"
                    rows={3}
                    className="w-full rounded-xl border border-neutral-900/10 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus:bg-white/[0.06]"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border border-neutral-900/10 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition-all duration-200 hover:bg-neutral-50 dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200 dark:hover:bg-white/[0.09]"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="group/btn flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/40 active:scale-[0.98]"
                  >
                    <Plus className="h-4 w-4 transition-transform duration-200 group-hover/btn:rotate-90" />
                    Создать проект
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </AccountLayout>
  );
}


