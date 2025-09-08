import { Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getInternalApiBase } from "@/lib/site";

async function fetchCases() {
  const res = await fetch(`${getInternalApiBase()}/api/graphql`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `query{ cases(service:web, limit: 2){ slug title summary } }` }), cache: 'no-store'
  });
  const json = await res.json();
  return json.data?.cases || [];
}

const ADVANTAGES = [
  "Аналитика и структура перед дизайном",
  "Дизайн‑система и понятный контент",
  "Быстрая загрузка и SEO‑основа",
  "Подключённая аналитика и цели",
];

export default async function WebServicePage() {
  const CASES = await fetchCases();
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          <Globe size={12} /> Услуги
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Сайты и лендинги
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          От посадочных страниц до многостраничных порталов. Фокус на ясном месседже, скорости и конверсии.
        </p>
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2 text-sm font-semibold">Преимущества</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {ADVANTAGES.map((a) => (
            <div key={a} className="flex items-start gap-2 rounded-2xl border border-neutral-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-600" />
              <div className="text-sm text-neutral-800 dark:text-neutral-200">{a}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2 text-sm font-semibold">Кейсы</div>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {CASES.map((c: any) => (
            <Link key={c.slug} href={`/cases/${c.slug}`} className="relative block overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
              <div className="text-sm font-semibold tracking-tight">{c.title}</div>
              <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{c.summary}</div>
              <div className="mt-3 text-sm font-medium text-blue-700 dark:text-blue-300">Читать кейс →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mt-8">
        <div className="flex items-center gap-2 text-sm font-semibold">Стоимость</div>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {[{
            name: "Лендинг",
            price: "20 000 ₽",
            features: ["1‑3 экрана", "Дизайн по гайдам", "Подключение аналитики"],
          }, {
            name: "Многостраничный сайт",
            price: "35 000 ₽",
            features: ["5‑12 страниц", "Иллюстрации/иконки", "SEO‑основа, формы"],
          }, {
            name: "Расширенно",
            price: "от 60 000 ₽",
            features: ["Аудит и ТЗ", "Кастом‑дизайн", "Интеграции"],
          }].map((p) => (
            <div key={p.name} className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              <div className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">{p.name}</div>
              <div className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">{p.price}</div>
              <ul className="mt-3 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2"><span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />{f}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Link href="/contacts" className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-sky-600">Запросить предложение</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-gradient-to-r from-blue-600 to-sky-500 p-5 text-white shadow-sm dark:border-white/10">
          <div className="text-base font-semibold tracking-tight">Готовы обсудить ваш сайт?</div>
          <p className="mt-1 text-sm opacity-90">Поделитесь задачей — оценим сроки и предложим подход.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/contacts" className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm hover:bg-white/90">
              Запросить предложение
            </Link>
            <Link href="/contacts" className="inline-flex h-9 items-center rounded-full border border-white/60 px-4 text-sm font-medium text-white/95 hover:bg-white/10">
              Задать вопрос
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
