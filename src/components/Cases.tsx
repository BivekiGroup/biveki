import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function fetchCases() {
  const query = `query{ cases(limit: 3){ slug title summary media{ type src } } }`;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/graphql`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }), cache: 'no-store'
  });
  const json = await res.json();
  return json.data?.cases || [];
}

export default async function Cases() {
  const list = await fetchCases();
  return (
    <section aria-label="Кейсы" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Кейсы</h2>
        <Link href="/cases" className="hidden text-sm font-medium text-blue-700 hover:underline dark:text-blue-300 sm:inline-flex">
          Все кейсы →
        </Link>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {list.map((c: any) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className="relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-neutral-900/10 bg-white/70 p-5 text-neutral-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
            <h3 className="text-base font-semibold tracking-tight">{c.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">{c.summary}</p>
            <div className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-300">
              Читать кейс
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
