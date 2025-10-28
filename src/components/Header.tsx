"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";
import React from "react";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  submenu?: {
    title: string;
    items: { label: string; href: string; description: string }[];
  };
};

const NAV: NavItem[] = [
  { label: "О компании", href: "/about" },
  {
    label: "Услуги",
    href: "/services",
    submenu: {
      title: "Наши услуги",
      items: [
        { label: "Веб-разработка", href: "/services/web", description: "Корпоративные сайты и веб-приложения" },
        { label: "Мобильные приложения", href: "/services/apps", description: "Нативная разработка iOS и Android" },
        { label: "E-commerce", href: "/services/shop", description: "Интернет-магазины и торговые площадки" },
        { label: "Интеграции", href: "/services/integrations", description: "API и системные интеграции" },
        { label: "Техподдержка", href: "/services/support", description: "Сопровождение и поддержка проектов" },
        { label: "Личный кабинет", href: "/services/account", description: "Кабинеты для B2B и B2C" },
      ],
    },
  },
  { label: "Кейсы", href: "/cases" },
  { label: "Клиенты", href: "/clients" },
  { label: "Блог", href: "/blog" },
];

const ME = gql`
  query Me { me { id name email } }
`;

function AuthActionsDesktop() {
  const { data } = useQuery(ME);
  const user = data?.me;
  return (
    <div className="hidden lg:flex items-center gap-2">
      {!user ? (
        <>
          <Link
            href="/login"
            className="inline-flex h-9 items-center px-4 text-[13px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Войти
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center px-5 text-[13px] font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Начать проект
          </Link>
        </>
      ) : (
        <Link
          href="/dashboard"
          className="inline-flex h-9 items-center px-5 text-[13px] font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          Личный кабинет
        </Link>
      )}
    </div>
  );
}

function AuthActionsMobile({ onClick }: { onClick: () => void }) {
  const { data } = useQuery(ME);
  const user = data?.me;
  return (
    <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-4">
      {!user ? (
        <>
          <Link
            href="/login"
            onClick={onClick}
            className="inline-flex h-11 items-center justify-center text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Войти
          </Link>
          <Link
            href="/register"
            onClick={onClick}
            className="inline-flex h-11 items-center justify-center text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            Начать проект
          </Link>
        </>
      ) : (
        <Link
          href="/dashboard"
          onClick={onClick}
          className="inline-flex h-11 items-center justify-center text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          Личный кабинет
        </Link>
      )}
    </div>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

  if (!item.submenu) {
    return (
      <Link
        href={item.href}
        className={`relative px-3 py-2 text-[13px] font-medium transition-colors ${
          isActive
            ? "text-neutral-900 dark:text-white"
            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        }`}
      >
        {item.label}
        {isActive && (
          <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-neutral-900 dark:bg-white" />
        )}
      </Link>
    );
  }

  return (
    <div
      className="relative group/dropdown"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button
        className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium transition-colors ${
          isActive
            ? "text-neutral-900 dark:text-white"
            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${showMenu ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
          showMenu
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl overflow-hidden w-[540px]">
          <div className="p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
              {item.submenu.title}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {item.submenu.items.map((subitem) => (
                <Link
                  key={subitem.href}
                  href={subitem.href}
                  className="group flex flex-col gap-1 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white group-hover:text-neutral-900 dark:group-hover:text-white">
                      {subitem.label}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {subitem.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-4">
            <Link
              href={item.href}
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg transition-colors"
            >
              Все услуги
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-neutral-200 dark:border-neutral-800 shadow-sm"
          : "bg-white dark:bg-neutral-950 border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Biveki"
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-bold tracking-tight text-neutral-900 dark:text-white leading-none">
                Biveki
              </span>
              <span className="text-[9px] font-medium tracking-wider text-neutral-500 dark:text-neutral-400 uppercase leading-none mt-0.5">
                Digital Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <DesktopNavItem key={item.href} item={item} />
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/contacts"
              className="text-[13px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Контакты
            </Link>
            <AuthActionsDesktop />
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Меню"
            onClick={() => setOpen(!open)}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
            <nav className="space-y-1">
              {NAV.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div className="ml-3 mt-1 space-y-1">
                        {item.submenu.items.map((subitem) => (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link
                href="/contacts"
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === "/contacts"
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                Контакты
              </Link>
            </nav>
            <AuthActionsMobile onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
