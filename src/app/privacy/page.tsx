type PItem = { id: string; title: string; body: (string | { ul: string[] })[] };

const ITEMS: PItem[] = [
  {
    id: "general",
    title: "1. Общие положения",
    body: [
      "Мы обрабатываем персональные данные в соответствии с действующим законодательством и применяем организационные и технические меры для их защиты.",
    ],
  },
  {
    id: "data",
    title: "2. Какие данные собираем",
    body: [
      { ul: [
        "Контактные данные: имя, email, телефон.",
        "Сообщения из форм обратной связи.",
        "Технические данные: cookies, IP‑адрес, информация об устройстве и браузере.",
      ] },
    ],
  },
  {
    id: "purposes",
    title: "3. Цели обработки",
    body: [{ ul: ["Ответы на запросы и предоставление услуг.", "Улучшение качества сервисов и аналитика.", "Выполнение требований закона и договоров."] }],
  },
  {
    id: "cookies",
    title: "4. Cookies и аналитика",
    body: [
      "Можем использовать cookies и аналитики (Яндекс.Метрика/Google Analytics) для статистики и улучшения интерфейсов. Вы можете ограничить cookies в настройках браузера.",
    ],
  },
  {
    id: "third",
    title: "5. Передача третьим лицам",
    body: [
      "Передаём данные только при необходимости оказания услуг (хостинг, платежи, почта) или по требованию закона. Заключаем договоры о конфиденциальности.",
    ],
  },
  { id: "retention", title: "6. Срок хранения", body: ["Храним данные до достижения целей обработки или по срокам закона/договора, затем удаляем или обезличиваем."] },
  { id: "rights", title: "7. Права пользователя", body: ["Запрос доступа/исправления/удаления данных или ограничение обработки; отзыв согласия — по адресу info@biveki.com."] },
  { id: "security", title: "8. Защита данных", body: ["Шифрование, ограничение доступа, мониторинг, обновления ПО и ревизии."] },
  { id: "contacts", title: "9. Контакты", body: ["Вопросы по данным: info@biveki.com."] },
  { id: "changes", title: "10. Изменения политики", body: ["Актуальная версия публикуется на этой странице. Дата обновления: "+new Date().toLocaleDateString("ru-RU")+"."] },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">Документы</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">Политика конфиденциальности</h1>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Порядок обработки и защиты персональных данных пользователей сервисов Biveki.</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-700 dark:text-neutral-300">
          <span className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10">Обновлено: {new Date().toLocaleDateString("ru-RU")}</span>
          <span className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10">Контакт: info@biveki.com</span>
        </div>
      </section>

      {/* TOC */}
      <section className="mt-6">
        <div className="flex flex-wrap gap-2">
          {ITEMS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="inline-flex items-center rounded-full border border-neutral-900/10 bg-white/70 px-3 py-1 text-sm hover:bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200">
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="mt-6 grid gap-3">
        {ITEMS.map((s) => (
          <div key={s.id} id={s.id} className="rounded-2xl border border-neutral-900/10 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
            <div className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">{s.title}</div>
            <div className="mt-2 space-y-2 text-sm leading-7 text-neutral-800 dark:text-neutral-200">
              {s.body.map((b, i) => (
                typeof b === "string" ? (
                  <p key={i}>{b}</p>
                ) : (
                  <ul key={i} className="list-disc space-y-1 pl-5">
                    {b.ul.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
