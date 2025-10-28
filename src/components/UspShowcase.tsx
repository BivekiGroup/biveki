"use client";

import Link from "next/link";
import { Bolt, LineChart, Shield, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

type Feature = {
  k: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  gradient: string;
  stats: { label: string; value: string }[];
};

const FEATURES: Feature[] = [
  {
    k: "speed",
    title: "Эффективная разработка",
    desc:
      "Короткие итерации, приоритизация задач, регулярные демонстрации результата. Фокус на бизнес-ценности без технического переусложнения.",
    href: "/services",
    cta: "Подробнее об услугах",
    gradient: "from-blue-500 to-cyan-500",
    stats: [
      { label: "Спринт", value: "2 недели" },
      { label: "Демо", value: "Еженедельно" }
    ]
  },
  {
    k: "metrics",
    title: "Измеримые результаты",
    desc:
      "Определяем ключевые метрики на старте: конверсия, выручка, время обработки заказов. Технологии служат бизнес-целям.",
    href: "/cases",
    cta: "Примеры проектов",
    gradient: "from-violet-500 to-purple-500",
    stats: [
      { label: "ROI", value: "Прозрачный" },
      { label: "Аналитика", value: "Real-time" }
    ]
  },
  {
    k: "care",
    title: "Техподдержка и SLA",
    desc:
      "Круглосуточный мониторинг, гарантированное время реакции на инциденты, регулярные отчёты и планирование улучшений.",
    href: "/contacts",
    cta: "Обсудить условия",
    gradient: "from-emerald-500 to-teal-500",
    stats: [
      { label: "Uptime", value: "99.9%" },
      { label: "Реакция", value: "< 15 мин" }
    ]
  },
];

export default function UspShowcase() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section aria-label="Ключевые преимущества" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-xl shadow-lg shadow-black/5 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          Наши преимущества
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Почему выбирают нас
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Проверенный подход к разработке корпоративных решений
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {FEATURES.map((f, idx) => (
          <article
            key={f.k}
            className="group relative overflow-hidden"
            onMouseEnter={() => setHoveredCard(f.k)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card background with hover effect */}
            <div className="relative h-full flex flex-col rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 transition-all duration-300 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 group-hover:shadow-2xl group-hover:-translate-y-1">

              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

              {/* Icon with animated gradient background */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />
                <div className={`relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {f.k === "speed" && <Bolt className="h-6 w-6" />}
                  {f.k === "metrics" && <LineChart className="h-6 w-6" />}
                  {f.k === "care" && <Shield className="h-6 w-6" />}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
                {f.desc}
              </p>

              {/* Stats row */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                {f.stats.map((stat, i) => (
                  <div key={i} className="flex-1">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{stat.label}</div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-neutral-50">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              <Link
                href={f.href}
                className="group/link relative inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-50"
              >
                <span className="relative">
                  {f.cta}
                  <span className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r ${f.gradient} group-hover/link:w-full transition-all duration-300`} />
                </span>
                <ArrowRight className={`h-4 w-4 transition-all duration-300 ${hoveredCard === f.k ? 'translate-x-1' : ''}`} />
              </Link>

              {/* Number indicator */}
              <div className="absolute top-6 right-6 text-7xl font-black text-neutral-100 dark:text-neutral-800/50 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                {idx + 1}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
