"use client";

import Link from "next/link";

type QA = { q: string; a: string };
type Section = { title: string; items: QA[] };

const SECTIONS: Section[] = [
  {
    title: "Старт работы",
    items: [
      {
        q: "Как начать сотрудничество?",
        a: "Оставьте заявку на контактах — проведём бриф (30–45 мин), сформируем оценку и план. После согласования подписываем договор и стартуем первый спринт.",
      },
      {
        q: "Сколько длится запуск MVP?",
        a: "Типичный MVP (лендинг/кабинет/интеграция) — от 2 до 3 недель. Срок зависит от сложности сценариев и внешних систем.",
      },
      {
        q: "Как вы планируете работу?",
        a: "Работаем спринтами 1–2 недели. На старте фиксируем цели, по итогу — демо и отчёт. Прозрачный бэклог всегда доступен.",
      },
    ],
  },
  {
    title: "Условия и оплата",
    items: [
      {
        q: "Какие варианты оплаты?",
        a: "Безналичный расчёт по договору (ИП/ООО). По проектам — предоплата и этапы; по поддержке — ежемесячные тарифы.",
      },
      {
        q: "Кто оплачивает облачные услуги?",
        a: "Оформляем и оплачиваем через нас: подключим провайдера (например, Timeweb Cloud), настроим инфраструктуру и перевыставим счета и закрывающие. По согласованию можем оформить напрямую на заказчика.",
      },
      {
        q: "Есть ли гарантийный период?",
        a: "Да. 30 дней на багфикс после релиза проекта (не включает новые фичи и изменения требований).",
      },
    ],
  },
  {
    title: "Технические вопросы",
    items: [
      {
        q: "Кому принадлежат права на код и материалы?",
        a: "Права переходят заказчику по договору. Репозиторий, доступы и документация передаются по завершению этапов.",
      },
      {
        q: "Какие технологии используете?",
        a: "Стек под задачу. Часто: Next.js/React, Node.js, Tailwind, Postgres, интеграции с платежами/CRM, деплой на Timeweb/VPS.",
      },
      {
        q: "Где хранятся код и доступы?",
        a: "Код — в репозитории заказчика (GitHub/GitLab), доступы — в менеджере секретов с разграничением прав и 2FA.",
      },
    ],
  },
  {
    title: "Поддержка и SLA",
    items: [
      {
        q: "Что входит в поддержку?",
        a: "Мониторинг, багфикс, минорные улучшения, обновления зависимостей, бэкапы, отчётность. SLA — по выбранному тарифу.",
      },
      {
        q: "Как быстро реагируете?",
        a: "В рабочее время — в день обращения; критичные инциденты по договорённости (24/7 для расширенных тарифов).",
      },
      {
        q: "Безопасность и доступы?",
        a: "Используем 2FA, разграничение прав, журналирование, бэкапы. Доступы храним в менеджерах секретов, передаём безопасными каналами.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-white/[0.04]">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
          FAQ
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
          Частые вопросы
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
          Собрали ответы про старт, сроки, оплату, технику и поддержку. Если не нашли — напишите нам.
        </p>
      </section>

      {/* Sections */}
      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {SECTIONS.map((sec) => (
          <div key={sec.title} className="rounded-2xl border border-neutral-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="px-1 text-sm font-semibold">{sec.title}</div>
            <div className="mt-2 divide-y divide-neutral-900/10 dark:divide-white/10">
              {sec.items.map((qa) => (
                <details key={qa.q} className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-2 py-3 text-left">
                    <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{qa.q}</span>
                    <span className="ml-auto inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-neutral-900/10 text-[10px] text-neutral-600 transition-transform group-open:rotate-45 dark:border-white/10 dark:text-neutral-300">+</span>
                  </summary>
                  <div className="px-2 pb-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{qa.a}</div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-gradient-to-r from-blue-600 to-sky-500 p-5 text-white shadow-sm dark:border-white/10">
          <div className="text-base font-semibold tracking-tight">Остались вопросы?</div>
          <p className="mt-1 text-sm opacity-90">Напишите нам — поможем разобраться и предложим решение под вашу задачу.</p>
          <div className="mt-3">
            <Link href="/contacts" className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm hover:bg-white/90">Связаться</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
