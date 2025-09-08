export type Client = {
  slug: string;
  name: string;
  industry: string;
  summary: string; // кто клиент и что делает
  work: string[]; // что делали мы
  metrics: string[]; // ключевые цифры
  logo?: string; // public path
  site?: string;
};

export type Testimonial = {
  client: string; // slug
  author: string;
  role: string;
  quote: string;
};

export const CLIENTS: Client[] = [
  {
    slug: "regionmarket",
    name: "РегионМаркет",
    industry: "Retail",
    summary: "Сеть продуктовых магазинов в регионах",
    work: ["Интернет‑магазин", "Интеграции со складом", "Доставка"],
    metrics: ["+18% онлайн‑продажи", "0 ручных операций"],
    logo: "/clients/retailone.svg",
    site: "#",
  },
  {
    slug: "stroyprof",
    name: "СтройПроф",
    industry: "B2B · Construction",
    summary: "Дистрибьютор строительных материалов",
    work: ["ЛК партнёра", "Каталог и прайс", "CRM интеграция"],
    metrics: ["x2 скорость заявок", "−35% звонков"],
    logo: "/clients/buildtech.svg",
    site: "#",
  },
  {
    slug: "finplus",
    name: "ФинПлюс",
    industry: "Fintech",
    summary: "Сервис рассрочки и платежей",
    work: ["Сайт", "Вебхуки платежей", "Антифрод"],
    metrics: ["0 потерянных транзакций", "+24% одобрений"],
    logo: "/clients/finhub.svg",
    site: "#",
  },
  {
    slug: "edunova",
    name: "EduNova",
    industry: "Education",
    summary: "Онлайн‑университет и корпоративное обучение",
    work: ["Портал обучения", "Мобильное приложение", "Аналитика"],
    metrics: ["+27% вовлечённость", "NPS 72"],
    logo: "/clients/edupro.svg",
    site: "#",
  },
  {
    slug: "medassist",
    name: "MedAssist",
    industry: "Healthcare",
    summary: "Клиника с филиалами в двух городах",
    work: ["Запись к врачу", "ЛК пациента", "Уведомления"],
    metrics: ["−35% звонков", "+19% онлайн‑записей"],
    logo: "/clients/medspace.svg",
    site: "#",
  },
  {
    slug: "travelgo",
    name: "TravelGo",
    industry: "Travel",
    summary: "Туристический сервис с акционными направлениями",
    work: ["Лендинги под акции", "А/B тесты", "VK Ads"],
    metrics: ["+22% конверсия", "CPL −18%"],
    logo: "/clients/travelix.svg",
    site: "#",
  },
  {
    slug: "technimbus",
    name: "TechNimbus",
    industry: "SaaS",
    summary: "Облачный сервис для DevOps‑команд",
    work: ["Сайт продукта", "CRM интеграции", "Контент"],
    metrics: ["+40% лидов", "+31% SQL"],
    logo: "/clients/alfastar.svg",
    site: "#",
  },
  {
    slug: "beautylab",
    name: "BeautyLab",
    industry: "E‑commerce",
    summary: "Онлайн‑магазин косметики и ухода",
    work: ["Магазин", "Программы лояльности", "CRM"],
    metrics: ["AOV +12%", "Повторные покупки +17%"],
    logo: "/clients/greenmarket.svg",
    site: "#",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    client: "regionmarket",
    author: "Ирина К.",
    role: "Директор по маркетингу, РегионМаркет",
    quote:
      "Интернет‑витрину запустили быстро, синхронизации со складом работают стабильно. Команда держит сроки.",
  },
  {
    client: "finplus",
    author: "Алексей М.",
    role: "Продакт‑менеджер, ФинПлюс",
    quote:
      "Вебхуки и сверка платежей наконец-то стали надёжными. Поддержка реагирует в тот же день.",
  },
  {
    client: "edunova",
    author: "Мария П.",
    role: "Руководитель проектов, EduNova",
    quote:
      "Портал и мобильное приложение сделали удобными. Видим рост вовлечённости и хорошие отзывы пользователей.",
  },
];
