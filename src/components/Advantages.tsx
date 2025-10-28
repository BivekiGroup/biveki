"use client";

import { Clock, Target, Rocket, Shield, Zap, Code2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Advantages() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const items = [
    {
      k: "speed",
      title: "Скорость без компромиссов",
      desc: "Спринты по 2 недели, MVP за месяц. Работаем итерациями — быстрый старт с последующим масштабированием.",
      icon: Clock,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      k: "business",
      title: "Фокус на бизнес-метриках",
      desc: "Не просто пишем код — решаем задачи бизнеса. Каждая фича привязана к конкретным KPI и измеримому результату.",
      icon: Target,
      gradient: "from-violet-500 to-purple-500",
    },
    {
      k: "tech",
      title: "Современный tech stack",
      desc: "React, TypeScript, Node.js, PostgreSQL. Проверенные технологии для надёжных enterprise-решений.",
      icon: Code2,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      k: "sla",
      title: "SLA и гарантии",
      desc: "Контракты с чёткими сроками и ответственностью. 99.9% uptime, мониторинг 24/7, быстрая реакция на инциденты.",
      icon: Shield,
      gradient: "from-orange-500 to-red-500",
    },
    {
      k: "integrations",
      title: "Бесшовные интеграции",
      desc: "Подключаем любые системы: CRM, ERP, 1С, платёжные шлюзы, сервисы рассылок. API и микросервисная архитектура.",
      icon: Zap,
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      k: "delivery",
      title: "Прозрачная передача проекта",
      desc: "Исходный код, документация, доступ к репозиторию — всё остаётся у вас. Полная техническая независимость.",
      icon: Rocket,
      gradient: "from-pink-500 to-rose-500",
    },
  ] as const;

  return (
    <section aria-label="Почему Biveki" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-xl shadow-lg shadow-black/5 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-orange-600" />
          Наши преимущества
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Почему выбирают Biveki
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Надёжный партнёр для амбициозных digital-проектов
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.k}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            onMouseEnter={() => setHoveredItem(item.k)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

            {/* Icon */}
            <div className="relative mb-4">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500`} />
              <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="h-6 w-6" />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-2 relative z-10">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed relative z-10">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
