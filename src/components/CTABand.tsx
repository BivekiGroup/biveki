"use client";

import Link from "next/link";
import { ArrowRight, Mail, Sparkles, Zap } from "lucide-react";

type Variant = "contact" | "consultation" | "trial";

export default function CTABand({ variant = "contact" }: { variant?: Variant }) {
  return (
    <section aria-label="CTA" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:from-neutral-100 dark:via-neutral-50 dark:to-neutral-100 p-12 lg:p-16 shadow-2xl">
        {/* Animated gradient orbs */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-2 text-xs font-medium text-white dark:text-neutral-900 dark:border-neutral-900/20 dark:bg-neutral-900/10 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Готовы к старту
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white dark:text-neutral-900 leading-tight">
            Запустите проект мечты<br />уже сегодня
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg text-white/80 dark:text-neutral-700 max-w-2xl mx-auto">
            Обсудим вашу задачу, предложим решение и оценим сроки. Первая консультация — бесплатно. Ответим в течение рабочего дня.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-white dark:text-neutral-900">&lt; 24ч</div>
              <div className="text-sm text-white/70 dark:text-neutral-600 mt-1">Первый ответ</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white dark:text-neutral-900">2-4 недели</div>
              <div className="text-sm text-white/70 dark:text-neutral-600 mt-1">Старт проекта</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white dark:text-neutral-900">0₽</div>
              <div className="text-sm text-white/70 dark:text-neutral-600 mt-1">За консультацию</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contacts"
              className="group inline-flex items-center gap-3 rounded-xl bg-white dark:bg-neutral-900 px-8 py-4 text-sm font-bold text-neutral-900 dark:text-white shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all"
            >
              <Mail className="h-5 w-5" />
              Обсудить проект
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/cases"
              className="group inline-flex items-center gap-3 rounded-xl border-2 border-white/20 dark:border-neutral-900/20 bg-white/10 dark:bg-neutral-900/10 backdrop-blur-xl px-8 py-4 text-sm font-bold text-white dark:text-neutral-900 hover:bg-white/20 dark:hover:bg-neutral-900/20 transition-all"
            >
              Смотреть кейсы
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Contact methods */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70 dark:text-neutral-600">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Быстрый старт</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:developer@biveki.ru" className="hover:text-white dark:hover:text-neutral-900 transition-colors">
                developer@biveki.ru
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+79611177205" className="hover:text-white dark:hover:text-neutral-900 transition-colors">
                +7 (961) 117-72-05
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
