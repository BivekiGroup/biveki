"use client";

import Link from "next/link";
import { useState } from "react";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client/react";

const REGISTER = gql`
  mutation Register($name:String!,$email:String!,$password:String!){ register(name:$name,email:$email,password:$password){ ok token } }
`;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [mutate] = useMutation(REGISTER);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as any;
    if ((data.password || "").length < 6) {
      setErr("Минимальная длина пароля 6 символов");
      setLoading(false);
      return;
    }
    try {
      const { data: resp } = await mutate({ variables: data });
      if (!resp?.register?.ok) throw new Error("register_failed");
      // Ensure cookie is present immediately (dev-friendly fallback)
      if (resp?.register?.token) {
        document.cookie = `session=${resp.register.token}; Path=/; SameSite=Lax`;
      }
      setOk(true);
      setTimeout(() => router.push("/login"), 800);
    } catch {
      setErr("Такой email уже зарегистрирован");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-10">
      <section className="rounded-2xl border border-neutral-900/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
        <div className="text-sm font-semibold">Регистрация</div>
        {err && <div className="mt-3 rounded-lg border border-rose-600/20 bg-rose-600/10 px-3 py-2 text-xs text-rose-800 dark:text-rose-300">{err}</div>}
        {ok && <div className="mt-3 rounded-lg border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-xs text-emerald-800 dark:text-emerald-300">Успешно. Перенаправляем…</div>}
        <form onSubmit={onSubmit} className="mt-3 grid gap-3">
          <div className="grid gap-1">
            <label className="text-xs text-neutral-600 dark:text-neutral-400">Имя</label>
            <input name="name" required className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
          </div>
          <div className="grid gap-1">
            <label className="text-xs text-neutral-600 dark:text-neutral-400">Email</label>
            <input name="email" type="email" required className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
          </div>
          <div className="grid gap-1">
            <label className="text-xs text-neutral-600 dark:text-neutral-400">Пароль</label>
            <input name="password" type="password" required minLength={6} className="h-10 rounded-lg border border-neutral-900/10 bg-transparent px-3 text-sm outline-none focus:border-blue-500/50 dark:border-white/10" />
          </div>
          <button disabled={loading} className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-semibold text-white hover:from-blue-700 hover:to-sky-600 disabled:opacity-60">
            <Send size={16} /> Зарегистрироваться
          </button>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">
            Уже есть аккаунт? <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-300">Войти</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
