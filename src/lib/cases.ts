export type ServiceCategory =
  | "web"
  | "account"
  | "shop"
  | "integrations"
  | "apps"
  | "support";

export type Media =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export type CaseItem = {
  slug: string;
  title: string;
  service: ServiceCategory;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  metrics?: string[];
  media: Media[];
};

export const SERVICE_LABELS: Record<ServiceCategory, string> = {
  web: "Сайты",
  account: "Кабинеты",
  shop: "Магазины",
  integrations: "Интеграции",
  apps: "Приложения",
  support: "Поддержка",
};

// Данные кейсов теперь управляются через БД и GraphQL API.
