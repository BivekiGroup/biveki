import Image from "next/image";
import Link from "next/link";
import { CLIENTS, TESTIMONIALS } from "@/lib/clients";

const FACTS = [
  { value: "12+", label: "проекты в проде" },
  { value: "72", label: "NPS по опросам" },
  { value: "96%", label: "возврат за новым" },
  { value: "99.9%", label: "аптайм на SLA" },
];

export default function ClientsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.25), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(14,165,233,0.25), transparent)" }}
        />

        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Клиенты
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Кто доверяет Biveki
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          Примеры брендов и отзывы. Работаем на результат: сроки, прозрачность, метрики.
        </p>

        {/* Facts */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label} className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              <div className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">{f.value}</div>
              <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients list with context */}
      <section className="mt-10">
        <div className="text-sm font-semibold">Клиенты и задачи</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENTS.map((c) => (
            <Link
              key={c.slug}
              href={c.site || "#"}
              className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm transition-colors hover:bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            >
              <div className="flex items-start gap-3">
                {c.logo ? (
                  <Image src={c.logo} alt={c.name} width={80} height={24} className="h-6 w-auto opacity-85" />
                ) : (
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {c.name.slice(0, 1)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight">{c.name}</div>
                  <div className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">{c.summary}</div>
                </div>
                <span className="ml-auto inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[10px] text-neutral-600 dark:border-white/10 dark:text-neutral-400">
                  {c.industry}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.work.map((w) => (
                  <span key={w} className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] text-neutral-800 dark:border-white/10 dark:text-neutral-200">
                    {w}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.metrics.map((m) => (
                  <span key={m} className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] text-neutral-800 dark:border-white/10 dark:text-neutral-200">
                    {m}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-10">
        <div className="text-sm font-semibold">Отзывы</div>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
              <blockquote className="text-sm leading-6 text-neutral-800 dark:text-neutral-200">“{t.quote}”</blockquote>
              <figcaption className="mt-3 text-xs text-neutral-600 dark:text-neutral-400">
                <span className="font-medium text-neutral-900 dark:text-neutral-50">{t.author}</span> · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-gradient-to-r from-blue-600 to-sky-500 p-5 text-white shadow-sm dark:border-white/10">
          <div className="text-base font-semibold tracking-tight">Хотите стать клиентом Biveki?</div>
          <p className="mt-1 text-sm opacity-90">Опишите задачу — предложим подход и оценим сроки.</p>
          <div className="mt-3">
            <Link href="/contacts" className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm hover:bg-white/90">
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
