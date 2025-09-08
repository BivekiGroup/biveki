import Link from "next/link";
import { Globe, UserRound, ShoppingCart, Workflow, AppWindow, Shield } from "lucide-react";

type Dir = {
  slug: string;
  title: string;
  teaser: string;
  icon: React.ElementType;
  accent: string; // tailwind gradient classes
  price: string;
};

const DIRS: Dir[] = [
  { slug: "web", title: "Сайты и лендинги", teaser: "От посадочных до многостраничных порталов", icon: Globe, accent: "from-blue-600 to-sky-500", price: "от 20 000 ₽" },
  { slug: "account", title: "Личные кабинеты и порталы", teaser: "Закрытые разделы для клиентов и партнёров", icon: UserRound, accent: "from-sky-600 to-cyan-500", price: "от 70 000 ₽" },
  { slug: "shop", title: "Интернет‑магазины и оплата", teaser: "Каталог, корзина, эквайринг и доставка", icon: ShoppingCart, accent: "from-indigo-600 to-blue-600", price: "от 55 000 ₽" },
  { slug: "integrations", title: "Интеграции и автоматизация", teaser: "Соединяем системы и упрощаем процессы", icon: Workflow, accent: "from-emerald-600 to-teal-500", price: "от 30 000 ₽" },
  { slug: "apps", title: "Мобильные и десктопные приложения", teaser: "iOS, Android, Windows, macOS", icon: AppWindow, accent: "from-rose-600 to-pink-600", price: "от 150 000 ₽" },
  { slug: "support", title: "Поддержка и развитие (SLA)", teaser: "Берём стабильность и рост на себя", icon: Shield, accent: "from-amber-600 to-orange-600", price: "от 7 000 ₽/мес" },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <section>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          Услуги
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Основные направления
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          Подбираем решение под вашу задачу: сайты, кабинеты, e‑commerce, интеграции и приложения. Чёткие сроки, прозрачный процесс и измеримый результат.
        </p>
      </section>

      <section className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIRS.map((d) => (
            <Link
              href={`/services/${d.slug}`}
              key={d.slug}
              className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            >
              <div className={`pointer-events-none absolute -right-12 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${d.accent} opacity-20 blur-2xl`} />
              <div className="flex items-start gap-3">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${d.accent} text-white shadow-sm`}>
                  {/* @ts-ignore */}
                  <d.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight">{d.title}</div>
                  <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{d.teaser}</div>
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[11px] text-neutral-800 dark:border-white/10 dark:text-neutral-200">
                      {d.price}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-blue-700 group-hover:underline dark:text-blue-300">
                Перейти →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
