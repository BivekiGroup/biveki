"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import BrandMark from "./BrandMark";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";
import React from "react";

type NavItem = {
  label: string;
  href: string;
};

const NAV: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "О компании", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Кейсы", href: "/cases" },
  { label: "Клиенты", href: "/clients" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
];

const ME = gql`
  query Me { me { id name email } }
`;

function AuthActionsDesktop() {
  const { data } = useQuery(ME);
  const user = data?.me;
  return (
    <div className="hidden md:flex items-center gap-2">
      {!user ? (
        <>
          <Link href="/login" className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-blue-600 transition-colors">
            Войти
          </Link>
          <Link href="/register" className="inline-flex h-9 items-center rounded-full border border-neutral-900/10 dark:border-white/10 px-4 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-950/[0.04] dark:hover:bg-white/[0.06] transition-colors">
            Регистрация
          </Link>
        </>
      ) : (
        <Link href="/dashboard" className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-blue-600 transition-colors">
          Кабинет
        </Link>
      )}
    </div>
  );
}

function AuthActionsMobile({ onClick }: { onClick: () => void }) {
  const { data } = useQuery(ME);
  const user = data?.me;
  return (
    <div className="mt-3 flex items-center gap-2">
      {!user ? (
        <>
          <Link href="/login" onClick={onClick} className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-blue-600">
            Войти
          </Link>
          <Link href="/register" onClick={onClick} className="inline-flex h-10 flex-1 items-center justify-center rounded-full border border-neutral-900/10 dark:border-white/10 px-4 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-950/[0.04] dark:hover:bg-white/[0.06]">
            Регистрация
          </Link>
        </>
      ) : (
        <Link href="/dashboard" onClick={onClick} className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-blue-600">
          Кабинет
        </Link>
      )}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-colors",
        "border-b border-white/10 dark:border-white/10",
        "bg-white/60 dark:bg-neutral-950/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-neutral-950/50",
        scrolled ? "shadow-[0_8px_30px_rgb(0,0,0,0.06)]" : "",
      ].join(" ")}
    >
      {/* subtle brand gradient underline */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <BrandMark size={32} />
            <span className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Biveki
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-neutral-700/90 dark:text-neutral-300/90 rounded-md hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-950/[0.04] dark:hover:bg-white/[0.04] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <AuthActionsDesktop />

          {/* Mobile hamburger */}
          <button
            aria-label="Открыть меню"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900/10 dark:border-white/10 hover:bg-neutral-950/[0.04] dark:hover:bg-white/[0.06]"
            onClick={() => setOpen((v) => !v)}
          >
            {!open ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-300 overflow-hidden ${
          open ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
          <nav className="mt-2 grid gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-[15px] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-950/[0.04] dark:hover:bg-white/[0.06]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <AuthActionsMobile onClick={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
}
