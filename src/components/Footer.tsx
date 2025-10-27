import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 text-neutral-800 dark:text-neutral-200">
      {/* subtle top gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />

      {/* main footer */}
      <div className="bg-white/60 backdrop-blur dark:bg-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="col-span-1 flex items-start gap-3">
              <Image src="/logo.png" alt="Biveki" width={32} height={32} className="h-8 w-auto object-contain" unoptimized priority />
              <div>
                <div className="text-sm font-semibold">Biveki</div>
                <p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">Создаём цифровые продукты: от идеи до поддержки.</p>
                <div className="mt-3 flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                  <Link href="#" aria-label="GitHub" className="hover:text-neutral-900 dark:hover:text-white"><Github size={16} /></Link>
                  <Link href="#" aria-label="LinkedIn" className="hover:text-neutral-900 dark:hover:text-white"><Linkedin size={16} /></Link>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div className="text-sm font-semibold">Навигация</div>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/" className="hover:underline">Главная</Link></li>
                <li><Link href="/services" className="hover:underline">Услуги</Link></li>
                <li><Link href="/cases" className="hover:underline">Кейсы</Link></li>
                <li><Link href="/contacts" className="hover:underline">Контакты</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-sm font-semibold">Компания</div>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/about" className="hover:underline">О компании</Link></li>
                <li><Link href="/partners" className="hover:underline">Партнёрская программа</Link></li>
                <li><Link href="/careers" className="hover:underline">Карьера</Link></li>
                <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-sm font-semibold">Ресурсы</div>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/blog" className="hover:underline">Блог</Link></li>
                <li><Link href="/clients" className="hover:underline">Клиенты</Link></li>
                <li><Link href="/privacy" className="hover:underline">Политика конфиденциальности</Link></li>
                <li><Link href="/terms" className="hover:underline">Пользовательское соглашение</Link></li>
                <li><Link href="/offer" className="hover:underline">Публичная оферта</Link></li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <div className="text-sm font-semibold">Контакты</div>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="inline-flex items-center gap-2"><Phone size={14} /> <a href="tel:+79611177205" className="hover:underline">+7 (961) 117‑72‑05</a></li>
                <li className="inline-flex items-center gap-2"><Mail size={14} /> <a href="mailto:developer@biveki.ru" className="hover:underline">developer@biveki.ru</a></li>
              </ul>
              <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-400">
                ИП Данилов Лев Ильич<br />ИНН: 370230592107<br />ОГРНИП: 324370000049497
              </div>
            </div>
          </div>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-neutral-900/10 to-transparent dark:via-white/10" />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-400">
            <div>© {year} Biveki. Все права защищены.</div>
            <div>Сделано с вниманием к деталям.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
