import { Metadata } from "next"

export const metadata: Metadata = { title: "О нас" }

export default function AboutPage() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Biveki</h1>
        <p className="mt-3 text-muted-foreground">
          Мы — продуктовая команда, которая делает сайты и web‑приложения по подписочной модели. Фокус на качестве, скорости и результате.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground">Стек</h2>
            <ul className="mt-2 text-sm leading-7">
              <li>Next.js, React, TypeScript</li>
              <li>Tailwind, shadcn‑style UI</li>
              <li>API, интеграции, аналитика</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground">Подход</h2>
            <ul className="mt-2 text-sm leading-7">
              <li>Прозрачная приоритизация задач</li>
              <li>Еженедельные релизы</li>
              <li>Долгосрочная поддержка</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

