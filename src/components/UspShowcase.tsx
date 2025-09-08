import Link from "next/link";
import { Bolt, LineChart, Shield } from "lucide-react";

type Feature = {
  k: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  accent: string; // tailwind gradient classes
};

const FEATURES: Feature[] = [
  {
    k: "speed",
    title: "Быстрый запуск",
    desc:
      "Команда и процессы заточены на скорость без потери качества. Планирование, короткие спринты, частые релизы.",
    href: "/services",
    cta: "Смотреть услуги",
    accent: "from-blue-600 to-sky-500",
  },
  {
    k: "metrics",
    title: "Фокус на метриках",
    desc:
      "Работаем на результат: выручка, конверсия, удержание. Технологии — инструмент, бизнес — цель.",
    href: "/cases",
    cta: "Смотреть кейсы",
    accent: "from-indigo-600 to-blue-500",
  },
  {
    k: "care",
    title: "Поддержка и развитие",
    desc:
      "SLA, мониторинг, дорожная карта улучшений — берём на себя стабильность и рост продукта.",
    href: "/contacts",
    cta: "Запросить SLA",
    accent: "from-sky-600 to-blue-700",
  },
];

export default function UspShowcase() {
  return (
    <section aria-label="Уникальное предложение" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <article
            key={f.k}
            className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:min-h-[240px] dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
          >
            <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${f.accent} opacity-20 blur-2xl`} />
            <div className="flex items-center gap-3">
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r ${f.accent} text-white`}>
                {f.k === "speed" && <Bolt size={16} />}
                {f.k === "metrics" && <LineChart size={16} />}
                {f.k === "care" && <Shield size={16} />}
              </div>
              <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{f.desc}</p>
            <div className="mt-auto pt-4">
              <Link
                href={f.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 transition-colors hover:underline hover:decoration-2 hover:underline-offset-4 dark:text-blue-300"
              >
                {f.cta}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
