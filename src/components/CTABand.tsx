import Link from "next/link";
import { Mail, Plus, Sparkles } from "lucide-react";

type Variant = "contact" | "consultation" | "trial";

export default function CTABand({ variant = "contact" }: { variant?: Variant }) {
  const map: Record<Variant, { href: string; label: string; icon: JSX.Element }> = {
    contact: {
      href: "/contacts",
      label: "Связаться",
      icon: <Mail size={16} />,
    },
    consultation: {
      href: "/contacts?type=consultation",
      label: "Заказать консультацию",
      icon: <Plus size={16} />,
    },
    trial: {
      href: "/contacts?type=trial",
      label: "Попробовать бесплатно",
      icon: <Sparkles size={16} />,
    },
  };

  const cta = map[variant];

  return (
    <section aria-label="CTA" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-700 to-blue-500 p-6 text-white shadow-2xl">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" aria-hidden />

        <div className="relative grid items-center gap-4 sm:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Готовы обсудить задачу или стартовать пилот?
            </h2>
            <p className="mt-2 max-w-prose text-sm/6 text-white/90">
              Ответим в течение рабочего дня, предложим варианты по срокам и бюджету.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <Link href={cta.href} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-blue-700 hover:bg-white/90">
              {cta.icon}
              {cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
