import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICE_LABELS, type ServiceCategory } from "@/lib/cases";
import { getCaseBySlug } from "@/lib/casesRepo";

export const dynamic = 'force-dynamic';

export default async function CaseDetail({ params }: { params: { slug: string } }) {
  const item = await getCaseBySlug(params.slug);
  if (!item) return notFound();

  const m0 = item.media[0];

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-neutral-600 dark:text-neutral-400">
        <Link href="/cases" className="hover:underline">Кейсы</Link>
        <span className="mx-1">/</span>
        <span>{SERVICE_LABELS[item.service as ServiceCategory]}</span>
      </nav>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{item.title}</h1>
      {item.client ? (
        <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{item.client}{item.year? ` · ${item.year}`: ''}</div>
      ) : null}
      <div className="mt-2">
        <span className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] text-neutral-800 dark:border-white/10 dark:text-neutral-200">
          {SERVICE_LABELS[item.service as ServiceCategory]}
        </span>
      </div>

      {/* Media */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-900/10 dark:border-white/10">
        <div className="relative aspect-[16/9] w-full">
          {m0?.type === "image" ? (
            <Image src={(m0 as any).src} alt={(m0 as any).alt || item.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-900/5 dark:bg-white/5">
              <span className="text-xs opacity-70">Видео</span>
            </div>
          )}
        </div>
      </section>

      {/* PSR */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight">Проблема</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{item.problem}</p>
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold tracking-tight">Решение</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{item.solution}</p>
        {item.tech?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <span key={t} className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] text-neutral-800 dark:border-white/10 dark:text-neutral-200">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold tracking-tight">Результат</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{item.result}</p>
        {item.metrics?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.metrics.map((m) => (
              <span key={m} className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] text-neutral-800 dark:border-white/10 dark:text-neutral-200">
                {m}
              </span>
            ))}
          </div>
        ) : null}
      </section>

      {/* CTA */}
      <section className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-gradient-to-r from-blue-600 to-sky-500 p-5 text-white shadow-sm dark:border-white/10">
          <div className="text-base font-semibold tracking-tight">Похожий проект?</div>
          <p className="mt-1 text-sm opacity-90">Расскажите, что хотите получить — предложим подход и сроки.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/contacts" className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm hover:bg-white/90">
              Запросить предложение
            </Link>
            <Link href="/services" className="inline-flex h-9 items-center rounded-full border border-white/60 px-4 text-sm font-medium text-white/95 hover:bg-white/10">
              Посмотреть услуги
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
