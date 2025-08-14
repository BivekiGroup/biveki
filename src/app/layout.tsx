import type { Metadata } from "next";
// Using system fonts to avoid external fetch during build
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { AnnouncementBar } from "@/components/site/announcement";

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
          <AnnouncementBar />
          <Header />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
