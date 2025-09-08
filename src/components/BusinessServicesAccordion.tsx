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
    title: "Сайты и лендинги",
    teaser: "От посадочных страниц до многостраничных сайтов с воронкой",
    bullets: ["Аналитика и структура", "Дизайн и контент", "SEO‑основа, замеры"],
    icon: "web",
  },
  {
    k: "account",
    title: "Личные кабинеты и порталы",
    teaser: "Закрытые разделы для клиентов и партнёров",
    bullets: ["Роли и права", "Профили, уведомления", "Интеграция с CRM"],
    icon: "account",
  },
  {
    k: "shop",
    title: "Интернет‑магазины и оплата",
    teaser: "Каталог, корзина, оплата и доставка",
    bullets: ["Категории и фильтры", "Оплаты, чеки", "Склад и CRM"],
    icon: "shop",
  },
  {
    k: "integrations",
    title: "Интеграции и автоматизация",
    teaser: "Соединяем сервисы и упрощаем процессы",
    bullets: ["CRM/ERP", "Платёжные системы", "Боты и webhooks"],
    icon: "integrations",
  },
  {
    k: "apps",
    title: "Мобильные и десктопные приложения",
    teaser: "iOS, Android, Windows, macOS",
    bullets: ["Пуш‑уведомления", "Офлайн‑режим", "Автообновления"],
    icon: "apps",
  },
  {
    k: "support",
    title: "Поддержка и развитие (SLA)",
    teaser: "Берём стабильность и рост на себя",
    bullets: ["Мониторинг и алерты", "Бэклог улучшений", "Отчётность"],
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
    <section aria-label="Услуги — список" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-2 flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Что мы делаем</h2>
        <Link href="/services" className="hidden text-sm font-medium text-blue-700 hover:underline dark:text-blue-300 sm:inline-flex">
          Все услуги →
        </Link>
      </div>
      <div className="divide-y divide-neutral-900/10 rounded-2xl border border-neutral-900/10 bg-white/70 dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.06]">
        {ITEMS.map((it) => (
          <details key={it.k} className="group">
            <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-4 sm:gap-4 sm:px-5">
              <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-600 text-white">
                <Icon type={it.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-base font-semibold text-neutral-900 dark:text-white">{it.title}</span>
                  <ChevronDown className="h-4 w-4 flex-none text-neutral-500 transition-transform" />
                </span>
                <span className="mt-0.5 block truncate text-sm text-neutral-600 dark:text-neutral-300">{it.teaser}</span>
              </span>
            </summary>
            <div className="px-4 pb-4 sm:px-5">
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {it.bullets.map((b) => (
                  <li key={b} className="inline-flex items-center gap-2 text-sm text-neutral-800 dark:text-neutral-200">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check size={12} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex gap-2">
                <Link href="/contacts" className="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 text-sm font-semibold text-white hover:from-blue-700 hover:to-blue-600">
                  Оценить проект
                </Link>
                <Link href="/cases" className="inline-flex h-10 items-center rounded-full border border-neutral-900/10 px-4 text-sm font-medium text-neutral-800 hover:bg-neutral-950/[0.04] dark:border-white/10 dark:text-neutral-100 dark:hover:bg-white/[0.06]">
                  Примеры кейсов
                </Link>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
