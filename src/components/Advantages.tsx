import { Clock, LineChart, Layers, Shield, Plug, KeyRound } from "lucide-react";

export default function Advantages() {
  const items = [
    {
      k: "speed",
      title: "Быстро без потери качества",
      desc: "Короткие спринты, приоритет бизнес‑ценности, регулярные релизы.",
      icon: "clock",
    },
    {
      k: "transparent",
      title: "Прозрачный процесс",
      desc: "План, демо, отчётность и доступ к бэклогу в любой момент.",
      icon: "chart",
    },
    {
      k: "fullcycle",
      title: "Полный цикл под ключ",
      desc: "Аналитика → UX/UI → разработка → интеграции → поддержка.",
      icon: "layers",
    },
    {
      k: "sla",
      title: "Ответственность и SLA",
      desc: "Договорённые сроки, показатели и контроль качества на поддержке.",
      icon: "shield",
    },
    {
      k: "integrations",
      title: "Интеграции без боли",
      desc: "CRM, платежи, 1С, рассылки — подружим ваши системы.",
      icon: "plug",
    },
    {
      k: "ownership",
      title: "Код и права — ваши",
      desc: "Прозрачная передача, репозиторий и документация у заказчика.",
      icon: "key",
    },
  ] as const;

  const Icon = ({ type }: { type: typeof items[number]["icon"] }) => {
    switch (type) {
      case "clock":
        return <Clock className="h-4 w-4" />;
      case "chart":
        return <LineChart className="h-4 w-4" />;
      case "layers":
        return <Layers className="h-4 w-4" />;
      case "shield":
        return <Shield className="h-4 w-4" />;
      case "plug":
        return <Plug className="h-4 w-4" />;
      case "key":
        return <KeyRound className="h-4 w-4" />;
    }
  };

  return (
    <section aria-label="Почему Biveki" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Почему выбирают Biveki</h2>
      </div>

      {/* band with subtle blue background to differ from previous blocks */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-gradient-to-b from-blue-500/[0.06] to-transparent p-5 dark:border-white/10 dark:from-white/[0.06]">
        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.k} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-600 text-white">
                <Icon type={it.icon} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">{it.title}</div>
                <p className="mt-1 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
