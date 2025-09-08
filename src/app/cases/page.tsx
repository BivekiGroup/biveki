import Image from "next/image";
import Link from "next/link";
import { SERVICE_LABELS, type ServiceCategory } from "@/lib/cases";
import { listCases } from "@/lib/casesRepo";

const CATEGORIES: { key: ServiceCategory; label: string }[] = (
  ["web", "account", "shop", "integrations", "apps", "support"] as const
).map((k) => ({ key: k, label: SERVICE_LABELS[k] }));

export default async function CasesPage({ searchParams }: { searchParams: { service?: ServiceCategory } }) {
  const active = (searchParams?.service || 'all') as 'all' | ServiceCategory;
  const list = await listCases(active === 'all' ? undefined : { service: active });

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Примеры проектов
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Кейсы
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          Примеры выполненных проектов с фото/видео. Структура: проблема → решение → результат.
        </p>
      </section>

      {/* Category filter */}
      <section className="mt-6">
        <div className="flex flex-wrap gap-2">
          <Link href={`/cases`} className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${active === 'all' ? 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300' : 'border-neutral-900/10 bg-white/70 text-neutral-800 hover:bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200'}`}>Все</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.key} href={`/cases?service=${c.key}`} className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${active === c.key ? 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300' : 'border-neutral-900/10 bg-white/70 text-neutral-800 hover:bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200'}`}>{c.label}</Link>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item: any) => (
            <Link
              key={item.slug}
              href={`/cases/${item.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {item.media[0]?.type === "image" ? (
                  <Image
                    src={(item.media[0] as any).src}
                    alt={(item.media[0] as any).alt || item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-900/5 dark:bg-white/5">
                    <span className="text-xs opacity-70">Видео</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold tracking-tight line-clamp-2">{item.title}</div>
                <div className="mt-1 line-clamp-2 text-xs text-neutral-600 dark:text-neutral-400">{item.summary}</div>
                <div className="mt-3">
                  <span className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] text-neutral-800 dark:border-white/10 dark:text-neutral-200">
                    {SERVICE_LABELS[item.service as ServiceCategory]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
