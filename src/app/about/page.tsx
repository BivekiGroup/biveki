import { BarChart3, Cloud, CreditCard, MessageCircle, ShoppingCart, Building2, Target, Users, Lightbulb, HeartHandshake, Workflow, Sparkles } from "lucide-react";

type TimelineItem = { year: string; title: string; desc: string };
const TIMELINE: TimelineItem[] = [
  { year: "2023", title: "Старт Biveki", desc: "Собрали команду, запустили первые проекты и оформили стандарты качества." },
  { year: "2024", title: "Рост и процессы", desc: "Прозрачные спринты, чек‑листы запуска и поддержка (SLA)." },
  { year: "2025", title: "Масштабирование", desc: "Фокус на кабинетах, интеграциях и e‑commerce с измеримыми метриками." },
];

type Value = { icon: React.ElementType; title: string; desc: string };
const VALUES: Value[] = [
  { icon: Target, title: "Результат", desc: "Считаем успех по метрикам: выручка, конверсия, удержание." },
  { icon: Workflow, title: "Прозрачность", desc: "План, демо, отчётность и доступ к бэклогу на каждом этапе." },
  { icon: Lightbulb, title: "Практичность", desc: "Простые решения, понятная архитектура, без лишней сложности." },
  { icon: HeartHandshake, title: "Партнёрство", desc: "Честная коммуникация, долгосрочные отношения, взаимная выгода." },
];

type Person = { name: string; title: string; tags: string[]; initials: string; href?: string };
const TEAM: Person[] = [
  { name: "Лев", title: "Владелец · Full‑Stack", tags: ["Архитектура", "Интеграции", "Запуск"], initials: "Л" },
  { name: "Александр", title: "Full‑Stack · AI", tags: ["LLM", "ML", "Бэкенд"], initials: "А" },
  { name: "Алексей", title: "Front‑end · UI/UX · QA", tags: ["Интерфейсы", "Дизайн", "Тесты"], initials: "А" },
  { name: "Егор", title: "Front‑end", tags: ["Верстка", "React", "Оптимизация"], initials: "Е" },
  { name: "Артём", title: "DevOps", tags: ["CI/CD", "Инфраструктура", "Надежность"], initials: "А" },
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white text-sm font-semibold shadow-sm ring-2 ring-white/40 dark:ring-white/10">
      {initials}
    </div>
  );
}

type Fact = { value: string; label: string };
const FACTS: Fact[] = [
  { value: "12+", label: "проекты в проде" },
  { value: "3 дня", label: "от идеи до MVP" },
  { value: "99.9%", label: "аптайм на проде" },
  { value: "< 24ч", label: "реакция поддержки" },
];

type Partner = {
  name: string;
  category: string;
  icon: React.ElementType;
  gradient: string; // Tailwind gradient classes
  accent: string; // Tailwind text color for accents
  desc: string;
};

const PARTNERS: Partner[] = [
  // Инфраструктура и облака (оставляем только Timeweb)
  {
    name: "Timeweb Cloud",
    category: "Хостинг",
    icon: Cloud,
    gradient: "from-blue-600 to-sky-500",
    accent: "text-sky-700 dark:text-sky-300",
    desc: "Надёжный хостинг и облако для Next.js/Node.js, быстрые сети и понятная тарификация.",
  },

  // Платежи
  {
    name: "ЮKassa",
    category: "Платежи",
    icon: CreditCard,
    gradient: "from-emerald-600 to-teal-500",
    accent: "text-emerald-700 dark:text-emerald-300",
    desc: "Приём оплат картами, СБП, кошельками; подписки и быстрые возвраты.",
  },
  {
    name: "CloudPayments",
    category: "Платежи",
    icon: CreditCard,
    gradient: "from-cyan-600 to-blue-500",
    accent: "text-cyan-700 dark:text-cyan-300",
    desc: "Онлайн‑платежи, рекуррентные списания и 3‑D Secure 2 для e‑commerce.",
  },

  // Маркетинг и аналитика
  {
    name: "VK Ads",
    category: "Маркетинг",
    icon: BarChart3,
    gradient: "from-blue-700 to-indigo-600",
    accent: "text-blue-700 dark:text-blue-300",
    desc: "Медиапокупки и перформанс в экосистеме VK, ретаргетинг и A/B‑тесты.",
  },
  {
    name: "Yandex Metrica",
    category: "Аналитика",
    icon: BarChart3,
    gradient: "from-yellow-500 to-amber-500",
    accent: "text-yellow-700 dark:text-yellow-300",
    desc: "Сквозная аналитика, Вебвизор, цели, сегменты и наглядные отчёты.",
  },
  {
    name: "Google Analytics",
    category: "Аналитика",
    icon: BarChart3,
    gradient: "from-amber-600 to-orange-600",
    accent: "text-orange-700 dark:text-orange-300",
    desc: "GA4 события, e‑commerce воронки и экспорт данных в BigQuery.",
  },

  // Коммуникации и CRM
  {
    name: "Bitrix24",
    category: "CRM и коммуникации",
    icon: MessageCircle,
    gradient: "from-sky-600 to-cyan-500",
    accent: "text-sky-700 dark:text-sky-300",
    desc: "CRM, сделки, воронки и интеграция с сайтом и телефонией.",
  },
  {
    name: "Telegram",
    category: "Коммуникации",
    icon: MessageCircle,
    gradient: "from-cyan-500 to-sky-500",
    accent: "text-cyan-700 dark:text-cyan-300",
    desc: "Боты, уведомления и вход через Telegram Login для кабинетов.",
  },

  // CMS и e‑commerce
  {
    name: "1C‑Bitrix",
    category: "CMS · e‑commerce",
    icon: ShoppingCart,
    gradient: "from-red-600 to-rose-600",
    accent: "text-rose-700 dark:text-rose-300",
    desc: "CMS с каталогом, корзиной, 1С‑интеграцией и маркетплейсом модулей.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
        {/* background accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.25), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(14,165,233,0.25), transparent)" }}
        />

        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          <Sparkles size={12} /> О компании
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Biveki — команда, которая делает цифровые продукты
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          Собираем требуемый результат из стратегии, дизайна, разработки и интеграций. Быстро, прозрачно и с упором на бизнес‑метрики.
        </p>

        {/* quick facts */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label} className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              <div className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">{f.value}</div>
              <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-sm font-semibold"><Building2 size={16} /> История Biveki</div>
        <div className="relative mt-4 grid gap-5 sm:grid-cols-3">
          {TIMELINE.map((t) => (
            <article key={t.year} className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
              <div className="pointer-events-none absolute -right-4 -top-6 text-6xl font-black tracking-tight text-neutral-900/5 dark:text-white/5">
                {t.year}
              </div>
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                {t.year}
              </div>
              <div className="mt-2 text-base font-semibold tracking-tight">{t.title}</div>
              <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{t.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mt-12">
        <div className="flex items-center gap-2 text-sm font-semibold"><Target size={16} /> Миссия и ценности</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <article key={v.title} className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
              <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-sm">
                {/* @ts-ignore */}
                <v.icon size={16} />
              </div>
              <div className="mt-2 text-sm font-semibold tracking-tight">{v.title}</div>
              <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{v.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mt-12">
        <div className="flex items-center gap-2 text-sm font-semibold"><Users size={16} /> Команда</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((p) => (
            <div key={p.name} className="group rounded-2xl border border-neutral-900/10 bg-white/70 p-4 shadow-sm transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="flex items-center gap-3">
                <Avatar initials={p.initials} />
                <div>
                  <div className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">{p.name}</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">{p.title}</div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[10px] text-neutral-700 dark:border-white/10 dark:text-neutral-300 hover:border-blue-500/40 hover:bg-neutral-950/[0.04] dark:hover:bg-white/[0.08] transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">Хотите присоединиться? Смотрите раздел Карьера.</p>
      </section>

      {/* Partners grid */}
      <section className="mt-12">
        <div className="flex items-center gap-2 text-sm font-semibold">Партнёры</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            >
              {/* glow */}
              <div className="pointer-events-none absolute -inset-1 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100">
                <div className={`h-full w-full bg-gradient-to-br ${p.gradient} opacity-25`} />
              </div>

              {/* subtle pattern */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
                  backgroundSize: "18px 18px",
                }}
              />

              <div className="relative z-10 flex items-start gap-3">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-sm`}>
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight truncate">{p.name}</div>
                  <div className="mt-1">
                    <span className={`inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-0.5 text-[10px] dark:border-white/10 ${p.accent}`}>
                      {p.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* decorative underline */}
              <div className="relative z-10 mt-4 h-px w-full bg-gradient-to-r from-transparent via-neutral-500/30 to-transparent dark:via-white/20" />

              <div className="relative z-10 mt-3 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
                {p.desc}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
