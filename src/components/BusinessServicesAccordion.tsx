"use client";

import Link from "next/link";
import { Globe, UserRound, ShoppingCart, Workflow, AppWindow, Shield, Check, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

type Item = {
  k: string;
  title: string;
  teaser: string;
  bullets: string[];
  icon: "web" | "account" | "shop" | "integrations" | "apps" | "support";
  gradient: string;
  href: string;
};

const ITEMS: Item[] = [
  {
    k: "web",
    title: "Корпоративные сайты и порталы",
    teaser: "Многостраничные сайты, презентационные решения, информационные порталы",
    bullets: ["Проектирование архитектуры", "Адаптивный дизайн", "SEO-оптимизация, аналитика"],
    icon: "web",
    gradient: "from-blue-500 to-cyan-500",
    href: "/services/web"
  },
  {
    k: "account",
    title: "Клиентские порталы и ЛК",
    teaser: "Защищённые системы для клиентов, партнёров и сотрудников",
    bullets: ["Управление доступом", "Личные кабинеты", "Интеграция с корп. системами"],
    icon: "account",
    gradient: "from-violet-500 to-purple-500",
    href: "/services/account"
  },
  {
    k: "shop",
    title: "E-commerce платформы",
    teaser: "Интернет-магазины, системы заказов, платёжные модули",
    bullets: ["Каталог и фильтрация", "Платёжные шлюзы", "Интеграция с учётными системами"],
    icon: "shop",
    gradient: "from-orange-500 to-pink-500",
    href: "/services/shop"
  },
  {
    k: "integrations",
    title: "Интеграции и API",
    teaser: "Связка систем, автоматизация процессов, обмен данными",
    bullets: ["CRM/ERP интеграции", "REST/GraphQL API", "Webhook-уведомления"],
    icon: "integrations",
    gradient: "from-emerald-500 to-teal-500",
    href: "/services/integrations"
  },
  {
    k: "apps",
    title: "Мобильные и десктопные приложения",
    teaser: "Нативные и кроссплатформенные решения для всех ОС",
    bullets: ["iOS, Android разработка", "Офлайн-функционал", "Push-уведомления"],
    icon: "apps",
    gradient: "from-indigo-500 to-blue-500",
    href: "/services/apps"
  },
  {
    k: "support",
    title: "Техническая поддержка и SLA",
    teaser: "Гарантированная стабильность, мониторинг, плановое развитие",
    bullets: ["24/7 мониторинг", "Инцидент-менеджмент", "Регулярная отчётность"],
    icon: "support",
    gradient: "from-red-500 to-rose-500",
    href: "/services/support"
  },
];

function Icon({ type }: { type: Item["icon"] }) {
  switch (type) {
    case "web":
      return <Globe className="h-6 w-6" />;
    case "account":
      return <UserRound className="h-6 w-6" />;
    case "shop":
      return <ShoppingCart className="h-6 w-6" />;
    case "integrations":
      return <Workflow className="h-6 w-6" />;
    case "apps":
      return <AppWindow className="h-6 w-6" />;
    case "support":
      return <Shield className="h-6 w-6" />;
  }
}

export default function BusinessServicesAccordion() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section aria-label="Спектр услуг" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-xl shadow-lg shadow-black/5 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-violet-600" />
          Полный спектр услуг
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Что мы разрабатываем
        </h2>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          От концепции до запуска и поддержки в production
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => (
          <Link
            key={item.k}
            href={item.href}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            onMouseEnter={() => setHoveredCard(item.k)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

            {/* Icon with glow */}
            <div className="relative mb-6">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />
              <div className={`relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon type={item.icon} />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-2 relative z-10">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 relative z-10">
              {item.teaser}
            </p>

            {/* Bullets */}
            <ul className="space-y-2 mb-6 relative z-10">
              {item.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                  <div className={`mt-0.5 flex-shrink-0 h-4 w-4 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800 relative z-10">
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                Подробнее
              </span>
              <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 transition-all duration-300 ${
                hoveredCard === item.k ? `bg-gradient-to-br ${item.gradient}` : ''
              }`}>
                <ArrowRight className={`h-5 w-5 transition-all ${
                  hoveredCard === item.k
                    ? 'text-white translate-x-0.5'
                    : 'text-neutral-600 dark:text-neutral-300'
                }`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View all button */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/services"
          className="group inline-flex items-center gap-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-8 py-4 text-sm font-semibold text-neutral-900 dark:text-neutral-50 shadow-lg hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 hover:scale-[1.02] transition-all"
        >
          Все услуги
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 dark:group-hover:bg-white transition-all">
            <ArrowRight className="h-4 w-4 text-neutral-600 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
          </div>
        </Link>
      </div>
    </section>
  );
}
