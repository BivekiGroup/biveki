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
      <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800 min-h-[85vh] flex items-center">
        {/* Background with animated grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* Main gradient */}
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-blue-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-blue-950/20" />

          {/* Animated grid pattern */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"
            style={{
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)'
            }}
          />

          {/* Floating orbs */}
          <div className="absolute top-20 left-[10%] h-72 w-72 rounded-full bg-blue-400/30 dark:bg-blue-600/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-40 right-[15%] h-96 w-96 rounded-full bg-violet-400/20 dark:bg-violet-600/10 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Content */}
            <div className="max-w-2xl">
              {/* Professional badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-xl shadow-lg shadow-black/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Разработка корпоративных digital-решений
              </div>

              {/* Main value proposition */}
              <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.1]">
                Превращаем<br />бизнес-задачи в{" "}
                <span className="text-blue-600 dark:text-blue-500">технологические решения</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
                Полный цикл разработки от аналитики и проектирования до запуска в production и технической поддержки.
                Работаем с фокусом на бизнес-метрики и долгосрочное масштабирование.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contacts"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 dark:bg-white px-8 py-4 text-sm font-semibold text-white dark:text-neutral-900 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  Обсудить проект
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/cases"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-8 py-4 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg transition-all"
                >
                  Портфолио
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Tech stack badges */}
              <div className="mt-12 flex flex-wrap gap-2">
                {[
                  "React / Next.js",
                  "TypeScript",
                  "Node.js",
                  "PostgreSQL",
                  "GraphQL",
                  "Docker"
                ].map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side - Interactive metrics cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50+", label: "Реализованных проектов", color: "blue" },
                { value: "5+", label: "Лет опыта команды", color: "violet" },
                { value: "24/7", label: "SLA поддержка", color: "emerald" },
                { value: "98%", label: "Успешных внедрений", color: "orange" }
              ].map((metric, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative z-10">
                    <div className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">{metric.value}</div>
                    <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-snug">{metric.label}</div>
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                      metric.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                      metric.color === 'violet' ? 'from-violet-500 to-purple-500' :
                      metric.color === 'emerald' ? 'from-emerald-500 to-teal-500' :
                      'from-orange-500 to-red-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition cards */}
      <section className="py-16 sm:py-20 lg:py-24">
        <UspShowcase />
      </section>

      {/* Cases */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-950 dark:via-neutral-900/50 dark:to-neutral-950" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-xl shadow-lg shadow-black/5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              Портфолио проектов
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Реализованные проекты
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              Примеры внедрённых решений с измеримыми результатами для бизнеса
            </p>
          </div>
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
