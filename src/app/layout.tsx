import type { Metadata } from "next";
// Using system fonts to avoid external fetch during build
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

// Removed next/font to keep build offline-friendly

export const metadata: Metadata = {
  title: {
    default: "Biveki — Веб‑разработка по подписке",
    template: "%s • Biveki",
  },
  description: "Современные сайты и продукты на подписке. Быстро, прозрачно, предсказуемо.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased font-sans`}>
        <div className="relative min-h-dvh bg-background text-foreground">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(250px_150px_at_20%_10%,oklch(0.97_0_0)_0%,transparent_60%),radial-gradient(250px_150px_at_80%_0%,oklch(0.97_0_0)_0%,transparent_60%)]" />
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
