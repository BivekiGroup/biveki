export type Job = {
  slug: string;
  title: string;
  team: "engineering" | "design" | "product" | "qa" | "devops";
  level: "junior" | "middle" | "senior";
  type: "full-time" | "part-time" | "contract";
  location: string; // e.g., Remote / Hybrid / City
  salary: string; // text range
  tags: string[];
  about: string;
  responsibilities: string[];
  requirements: string[];
  nice?: string[];
  benefits?: string[];
};

export const TEAM_LABELS: Record<Job["team"], string> = {
  engineering: "Разработка",
  design: "Дизайн",
  product: "Продукт",
  qa: "QA",
  devops: "DevOps",
};

export const JOBS: Job[] = [
  {
    slug: "fullstack-typescript",
    title: "Full‑Stack разработчик (TypeScript)",
    team: "engineering",
    level: "senior",
    type: "full-time",
    location: "Удалённо",
    salary: "от 180 000 ₽",
    tags: ["React/Next.js", "Node.js", "Postgres", "REST/GraphQL"],
    about:
      "Разработка веб‑продуктов: кабинеты, e‑commerce, интеграции. Участвуете в архитектуре и ревью.",
    responsibilities: [
      "Фичи end‑to‑end: от API до UI",
      "Интеграции с платёжными и CRM",
      "Оптимизация производительности",
    ],
    requirements: [
      "Опыт с TypeScript/React/Node.js",
      "Базы данных (Postgres/MySQL)",
      "Чистый код, тестирование, Git",
    ],
    nice: ["Next.js App Router", "Prisma", "Docker"],
    benefits: ["Гибкий график", "Оплачиваемые больничные/отпуска", "Обучение и курсы"],
  },
  {
    slug: "frontend-react",
    title: "Front‑end разработчик (React)",
    team: "engineering",
    level: "middle",
    type: "full-time",
    location: "Удалённо",
    salary: "от 140 000 ₽",
    tags: ["React", "TypeScript", "UI/UX", "Оптимизация"],
    about:
      "Интерфейсы для кабинетов и магазинов: компоненты, состояния, доступность, скорости.",
    responsibilities: [
      "UI‑компоненты и состояния",
      "Техдолг и Lighthouse",
      "Взаимодействие с дизайном и бэкендом",
    ],
    requirements: ["React/TS", "CSS/Tailwind", "Работа с API"],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX дизайнер",
    team: "design",
    level: "middle",
    type: "contract",
    location: "Удалённо",
    salary: "от 100 000 ₽",
    tags: ["Figma", "Design‑system", "Proto"],
    about:
      "Дизайн интерфейсов: кабинеты, лендинги, магазины. От исследований до дизайн‑систем.",
    responsibilities: ["Прототипы и сценарии", "Макеты и компоненты", "Передача в разработку"],
    requirements: ["Figma", "Сетки/типографика", "Портфолио"],
  },
  {
    slug: "qa-engineer",
    title: "QA инженер",
    team: "qa",
    level: "middle",
    type: "part-time",
    location: "Удалённо",
    salary: "от 80 000 ₽",
    tags: ["Тест‑кейсы", "E2E", "Playwright"],
    about: "Функциональное тестирование, регресс, E2E. Чек‑листы, отчётность, взаимодействие с разработкой.",
    responsibilities: ["План тестов", "Регресс","E2E сценарии"],
    requirements: ["Опыт тестирования веб", "Инструменты E2E", "Внимание к деталям"],
  },
  {
    slug: "devops-engineer",
    title: "DevOps инженер",
    team: "devops",
    level: "senior",
    type: "contract",
    location: "Удалённо",
    salary: "от 200 000 ₽",
    tags: ["CI/CD", "Docker", "K8s", "Monitoring"],
    about:
      "Инфраструктура и надёжность: пайплайны, деплой, логирование, алерты, безопасность.",
    responsibilities: ["CI/CD", "IaC", "Наблюдаемость (logs/metrics)"],
    requirements: ["Docker/K8s", "Cloud/VPS", "Observability"],
  },
];

