import Link from "next/link";
import { ArrowRight, TrendingUp, Zap, Users } from "lucide-react";
import { listCases } from "@/lib/casesRepo";

const iconMap: Record<string, any> = {
  trending: TrendingUp,
  zap: Zap,
  users: Users,
};

export default async function Cases() {
  const list = await listCases({ limit: 3 });

  return (
    <div className="relative">
      <div className="grid gap-6 lg:grid-cols-3">
        {list.map((c: any, idx: number) => {
          const gradients = [
            "from-blue-500 to-cyan-500",
            "from-violet-500 to-purple-500",
            "from-orange-500 to-pink-500"
          ];
          const gradient = gradients[idx % gradients.length];

          return (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

              {/* Card content */}
              <div className="flex flex-col p-8 flex-grow">
                {/* Icon badge */}
                <div className="mb-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {c.title}
                </h3>

                {/* Summary */}
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3 flex-grow">
                  {c.summary}
                </p>

                {/* Category badge if exists */}
                {c.category && (
                  <div className="mb-4">
                    <span className="inline-flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      {c.category}
                    </span>
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Читать кейс
                  </span>
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-all duration-300">
                    <ArrowRight className="h-5 w-5 text-neutral-600 dark:text-neutral-300 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </div>

              {/* Number indicator */}
              <div className="absolute top-8 right-8 text-6xl font-black text-neutral-100 dark:text-neutral-800/30 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                {idx + 1}
              </div>
            </Link>
          );
        })}
      </div>

      {/* View all button */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/cases"
          className="group inline-flex items-center gap-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-8 py-4 text-sm font-semibold text-neutral-900 dark:text-neutral-50 shadow-lg hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 hover:scale-[1.02] transition-all"
        >
          Все кейсы
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 dark:group-hover:bg-white transition-all">
            <ArrowRight className="h-4 w-4 text-neutral-600 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
          </div>
        </Link>
      </div>
    </div>
  );
}
