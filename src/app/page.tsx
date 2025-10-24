import Link from "next/link";
import UspShowcase from "../components/UspShowcase";
import BusinessServicesAccordion from "../components/BusinessServicesAccordion";
import Advantages from "../components/Advantages";
import Cases from "../components/Cases";
import CTABand from "../components/CTABand";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* Subtle gradient accent */}
          <div className="absolute left-0 top-0 h-[600px] w-full bg-gradient-to-br from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20" />
          {/* Minimal grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-4xl">
            {/* Professional badge */}
            <div className="inline-flex items-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
              Разработка корпоративных digital-решений
            </div>

            {/* Main value proposition */}
            <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
              Превращаем бизнес-задачи в{" "}
              <span className="text-blue-600 dark:text-blue-500">технологические решения</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-3xl">
              Полный цикл разработки от аналитики и проектирования до запуска в production и технической поддержки.
              Работаем с фокусом на бизнес-метрики и долгосрочное масштабирование.
            </p>

            {/* Key metrics */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50">50+</div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Реализованных проектов</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50">5+</div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Лет опыта команды</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50">24/7</div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">SLA поддержка</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50">98%</div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Успешных внедрений</div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Обсудить проект
              </Link>
              <Link
                href="/cases"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Портфолио
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Tech stack */}
            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">Стек технологий</p>
              <div className="flex flex-wrap gap-3">
                {[
                  "React / Next.js",
                  "Node.js",
                  "TypeScript",
                  "PostgreSQL",
                  "GraphQL",
                  "Docker",
                  "AWS / Azure",
                  "Kubernetes"
                ].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition cards */}
      <section className="py-16 sm:py-20 lg:py-24">
        <UspShowcase />
      </section>

      {/* Cases */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Реализованные проекты
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              Примеры внедрённых решений с измеримыми результатами для бизнеса
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Cases />
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 lg:py-24">
        <BusinessServicesAccordion />
      </section>

      {/* Advantages */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <Advantages />
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <CTABand variant="contact" />
      </section>
    </main>
  );
}
