import Link from "next/link";
import UspShowcase from "../components/UspShowcase";
import BusinessServicesAccordion from "../components/BusinessServicesAccordion";
import Advantages from "../components/Advantages";
import Cases from "../components/Cases";
import CTABand from "../components/CTABand";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        {/* Clean minimal background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* soft radial vignette */}
          <div className="absolute left-1/2 top-8 h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,rgba(59,130,246,0.20)_0%,rgba(59,130,246,0)_70%)]" />
          {/* subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.04] dark:opacity-[0.08]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 sm:pb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-blue-700 dark:text-blue-300">
            Biveki • Digital Products
          </span>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl sm:leading-tight">
            Создаём <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">цифровые продукты</span>,
            которые двигают бизнес вперёд
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-700 dark:text-neutral-300 sm:text-base">
            От стратегии и дизайна до разработки, внедрения и SLA‑поддержки. Работаем быстро, прозрачно и с упором на бизнес‑метрики.
          </p>

          {/* Feature chips (без повторов со слайдером) */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["Аналитика", "UX/UI", "Front‑end", "Back‑end", "Интеграции"].map((f) => (
              <span
                key={f}
                className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="inline-flex h-11 items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-blue-600"
            >
              Услуги
            </Link>
            <Link
              href="/contacts"
              className="inline-flex h-11 items-center rounded-full border border-neutral-900/10 dark:border-white/10 px-5 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-950/[0.04] dark:hover:bg-white/[0.06]"
            >
              Связаться
            </Link>
            <Link
              href="/cases"
              className="inline-flex h-11 items-center rounded-full px-2 text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
            >
              Кейсы →
            </Link>
          </div>

          {/* Accent underline */}
          <div className="mt-8 h-px w-full max-w-xl bg-gradient-to-r from-blue-600/60 to-transparent" />
        </div>
      </section>

      {/* USP Cards */}
      <div className="mt-3 sm:mt-4">
        <UspShowcase />
      </div>

      {/* Business Services — Accordion (clean, non-technical) */}
      <div className="mt-4 sm:mt-5">
        <BusinessServicesAccordion />
      </div>

      {/* Advantages */}
      <div className="mt-5 sm:mt-6">
        <Advantages />
      </div>

      {/* Cases */}
      <div className="mt-5 sm:mt-6">
        <Cases />
      </div>

      {/* CTA */}
      <div className="mt-5 sm:mt-6 mb-8 sm:mb-10">
        <CTABand variant="contact" />
      </div>
    </main>
  );
}
