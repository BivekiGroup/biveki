export type Category = "materials" | "articles" | "insights" | "news";

export const CATEGORY_LABELS: Record<Category, string> = {
  materials: "Материалы",
  articles: "Статьи",
  insights: "Инсайты",
  news: "Новости",
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "image"; src: string; alt?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string; // ISO
  readMinutes: number;
  cover: string; // public path
  tags?: string[];
  blocks: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "landing-checklist",
    title: "Чек‑лист запуска лендинга: от оффера до аналитики",
    excerpt:
      "Практические шаги: как быстро собрать лендинг, не забыв про метрики и SEO‑основу.",
    category: "materials",
    date: "2025-08-20",
    readMinutes: 6,
    cover: "/blog/landing.svg",
    tags: ["лендинг", "маркетинг", "аналитика"],
    blocks: [
      { type: "p", text: "Сильный оффер и ясная структура — половина успеха. Дальше — аккуратная верстка и замеры." },
      { type: "h2", text: "Структура страницы" },
      { type: "ul", items: ["Оффер и призыв", "Проблема → Решение", "Соцдоказательство", "CTA и форма"] },
      { type: "h2", text: "Замеры и цели" },
      { type: "p", text: "Подключите события и цели: просмотр формы, отправка, клики по CTA, скроллы." },
    ],
  },
  {
    slug: "payments-webhooks-reliable",
    title: "Надёжные платежные вебхуки: идемпотентность, ретраи, логи",
    excerpt:
      "Какие ошибки приводят к потере платежей и как их избежать на практике.",
    category: "articles",
    date: "2025-08-18",
    readMinutes: 8,
    cover: "/blog/webhooks.svg",
    tags: ["интеграции", "платежи", "вебхуки"],
    blocks: [
      { type: "p", text: "Встроенные ретраи поставщиков — не панацея. Нужна идемпотентность и журнал событий." },
      { type: "h2", text: "Ключевые принципы" },
      { type: "ul", items: ["Idempotency Key", "DLQ", "Алерты", "Регулярная сверка"] },
      { type: "quote", text: "Логи + метрики важнее всего", author: "Команда Biveki" },
    ],
  },
  {
    slug: "b2b-ui-trends",
    title: "UI‑паттерны для B2B‑кабинетов в 2025",
    excerpt:
      "Навигация, права доступа и уведомления: что работает для кабинетов и порталов.",
    category: "insights",
    date: "2025-08-12",
    readMinutes: 7,
    cover: "/blog/b2b-ui.svg",
    tags: ["ui", "кабинеты", "паттерны"],
    blocks: [
      { type: "p", text: "B2B требует простых паттернов: прогнозируемость важнее креатива." },
      { type: "h2", text: "Навигация и роли" },
      { type: "ul", items: ["Ясная сайд‑навигация", "Права на уровне разделов", "Центр уведомлений"] },
    ],
  },
  {
    slug: "company-news-august",
    title: "Biveki: новости августа",
    excerpt: "Запустили новые направления услуг и каталог кейсов.",
    category: "news",
    date: "2025-08-22",
    readMinutes: 3,
    cover: "/blog/news.svg",
    tags: ["компания", "апдейты"],
    blocks: [
      { type: "p", text: "Обновили сайт: услуги разбиты на направления, добавили страницы кейсов и клиентов." },
      { type: "p", text: "Скоро подключим CMS и начнём публиковать новые кейсы регулярно." },
    ],
  },
];

