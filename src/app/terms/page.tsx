type TItem = { id: string; title: string; body: (string | { ul: string[] })[] };

const TSECTIONS: TItem[] = [
  { id: "terms", title: "1. Термины", body: ["«Мы/Компания» — Biveki. «Сайт/Сервисы» — ресурсы и продукты, размещённые на доменах, контролируемых Biveki. «Пользователь» — лицо, использующее Сайт/Сервисы."] },
  { id: "accept", title: "2. Принятие условий", body: ["Используя Сайт/Сервисы, вы соглашаетесь с настоящими условиями и Политикой конфиденциальности."] },
  { id: "services", title: "3. Услуги", body: ["Состав и сроки услуг определяются в договоре/заказе. Мы можем изменять Сайт/Сервисы, не нарушая существенных условий договоров."] },
  { id: "accounts", title: "4. Аккаунты и доступ", body: ["Пользователь отвечает за сохранность своих доступов и действия в аккаунте. Мы можем ограничить доступ при нарушении условий или угрозе безопасности."] },
  { id: "payment", title: "5. Оплата", body: ["Порядок оплаты определяется договором/счётом. При просрочке мы вправе приостанавливать оказание услуг до оплаты."] },
  { id: "ip", title: "6. Интеллектуальная собственность", body: ["Права на результаты работ переходят по условиям договора. Материалы сайта защищены законом и не могут использоваться без разрешения."] },
  { id: "liability", title: "7. Ограничение ответственности", body: ["Мы не несём ответственность за косвенные убытки, упущенную выгоду, а также за сбои третьих лиц (провайдеры, платёжные системы), кроме случаев, прямо предусмотренных договором."] },
  { id: "privacy", title: "8. Конфиденциальность", body: ["Данные обрабатываются согласно Политике конфиденциальности. Стороны сохраняют конфиденциальность коммерческой информации."] },
  { id: "termination", title: "9. Расторжение", body: ["Соглашение может быть прекращено по договору или в случае существенного нарушения условий одной из сторон."] },
  { id: "law", title: "10. Применимое право", body: ["Споры разрешаются по праву и в юрисдикции, определённым в договоре с заказчиком. При отсутствии — по месту регистрации исполнителя."] },
  { id: "changes", title: "11. Изменения условий", body: ["Мы можем обновлять настоящие условия, публикуя новую версию на странице. Дата обновления: "+new Date().toLocaleDateString("ru-RU")+"."] },
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">Документы</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">Пользовательское соглашение</h1>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Условия использования сайта и сервисов Biveki.</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-700 dark:text-neutral-300">
          <span className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10">Обновлено: {new Date().toLocaleDateString("ru-RU")}</span>
          <span className="inline-flex items-center rounded-full border border-neutral-900/10 px-2 py-1 dark:border-white/10">Контакт: info@biveki.com</span>
        </div>
      </section>

      {/* TOC */}
      <section className="mt-6">
        <div className="flex flex-wrap gap-2">
          {TSECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="inline-flex items-center rounded-full border border-neutral-900/10 bg-white/70 px-3 py-1 text-sm hover:bg-neutral-950/[0.03] dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200">
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="mt-6 grid gap-3">
        {TSECTIONS.map((s) => (
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
