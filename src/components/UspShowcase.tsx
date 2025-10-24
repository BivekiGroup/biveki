import Link from "next/link";
import { Bolt, LineChart, Shield } from "lucide-react";

type Feature = {
  k: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
};

const FEATURES: Feature[] = [
  {
    k: "speed",
    title: "Эффективная разработка",
    desc:
      "Короткие итерации, приоритизация задач, регулярные демонстрации результата. Фокус на бизнес-ценности без технического переусложнения.",
    href: "/services",
    cta: "Подробнее об услугах",
  },
  {
    k: "metrics",
    title: "Измеримые результаты",
    desc:
      "Определяем ключевые метрики на старте: конверсия, выручка, время обработки заказов. Технологии служат бизнес-целям.",
    href: "/cases",
    cta: "Примеры проектов",
  },
  {
    k: "care",
    title: "Техподдержка и SLA",
    desc:
      "Круглосуточный мониторинг, гарантированное время реакции на инциденты, регулярные отчёты и планирование улучшений.",
    href: "/contacts",
    cta: "Обсудить условия",
  },
];

export default function UspShowcase() {
  return (
    <section aria-label="Ключевые преимущества" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <article
            key={f.k}
            className="flex flex-col rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                {f.k === "speed" && <Bolt size={18} />}
                {f.k === "metrics" && <LineChart size={18} />}
                {f.k === "care" && <Shield size={18} />}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{f.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{f.desc}</p>
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <Link
                href={f.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
              >
                {f.cta}
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
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
