import Link from "next/link";
import { Globe, UserRound, ShoppingCart, Workflow, AppWindow, Shield, ChevronDown, Check } from "lucide-react";

type Item = {
  k: string;
  title: string;
  teaser: string;
  bullets: string[];
  icon: "web" | "account" | "shop" | "integrations" | "apps" | "support";
};

const ITEMS: Item[] = [
  {
    k: "web",
    title: "Корпоративные сайты и порталы",
    teaser: "Многостраничные сайты, презентационные решения, информационные порталы",
    bullets: ["Проектирование архитектуры", "Адаптивный дизайн", "SEO-оптимизация, аналитика"],
    icon: "web",
  },
  {
    k: "account",
    title: "Клиентские порталы и ЛК",
    teaser: "Защищённые системы для клиентов, партнёров и сотрудников",
    bullets: ["Управление доступом", "Личные кабинеты", "Интеграция с корп. системами"],
    icon: "account",
  },
  {
    k: "shop",
    title: "E-commerce платформы",
    teaser: "Интернет-магазины, системы заказов, платёжные модули",
    bullets: ["Каталог и фильтрация", "Платёжные шлюзы", "Интеграция с учётными системами"],
    icon: "shop",
  },
  {
    k: "integrations",
    title: "Интеграции и API",
    teaser: "Связка систем, автоматизация процессов, обмен данными",
    bullets: ["CRM/ERP интеграции", "REST/GraphQL API", "Webhook-уведомления"],
    icon: "integrations",
  },
  {
    k: "apps",
    title: "Мобильные и десктопные приложения",
    teaser: "Нативные и кроссплатформенные решения для всех ОС",
    bullets: ["iOS, Android разработка", "Офлайн-функционал", "Push-уведомления"],
    icon: "apps",
  },
  {
    k: "support",
    title: "Техническая поддержка и SLA",
    teaser: "Гарантированная стабильность, мониторинг, плановое развитие",
    bullets: ["24/7 мониторинг", "Инцидент-менеджмент", "Регулярная отчётность"],
    icon: "support",
  },
];

function Icon({ type }: { type: Item["icon"] }) {
  switch (type) {
    case "web":
      return <Globe className="h-5 w-5" />;
    case "account":
      return <UserRound className="h-5 w-5" />;
    case "shop":
      return <ShoppingCart className="h-5 w-5" />;
    case "integrations":
      return <Workflow className="h-5 w-5" />;
    case "apps":
      return <AppWindow className="h-5 w-5" />;
    case "support":
      return <Shield className="h-5 w-5" />;
  }
}

export default function BusinessServicesAccordion() {
  return (
    <section aria-label="Спектр услуг" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-3xl">Спектр услуг</h2>
        <Link href="/services" className="hidden text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 sm:inline-flex">
          Все услуги →
        </Link>
      </div>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        {ITEMS.map((it) => (
          <details key={it.k} className="group">
            <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
              <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-blue-600 text-white">
                <Icon type={it.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-base font-semibold text-neutral-900 dark:text-neutral-50">{it.title}</span>
                  <ChevronDown className="h-4 w-4 flex-none text-neutral-400 dark:text-neutral-600 transition-transform group-open:rotate-180" />
                </span>
                <span className="mt-1 block text-sm text-neutral-600 dark:text-neutral-400">{it.teaser}</span>
              </span>
            </summary>
            <div className="px-5 pb-5 pt-2 bg-neutral-50 dark:bg-neutral-800/30">
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-4">
                {it.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded bg-blue-600 text-white">
                      <Check size={14} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 pt-2">
                <Link href="/contacts" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Обсудить проект
                </Link>
                <Link href="/cases" className="inline-flex items-center justify-center rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  Примеры работ
                </Link>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
