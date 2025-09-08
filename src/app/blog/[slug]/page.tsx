import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, CATEGORY_LABELS, type Block } from "@/lib/blog";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="mt-3 text-sm leading-7 text-neutral-800 dark:text-neutral-200">{block.text}</p>;
    case "h2":
      return <h2 className="mt-6 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">{block.text}</h2>;
    case "ul":
      return (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-800 dark:text-neutral-200">
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-4 border-l-2 border-blue-500/40 pl-3 text-sm text-neutral-700 dark:text-neutral-300">“{block.text}”{block.author ? ` — ${block.author}` : null}</blockquote>
      );
    case "image":
      return (
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-900/10 dark:border-white/10">
          <div className="relative aspect-[16/9] w-full">
            <Image src={block.src} alt={block.alt || "Изображение"} fill className="object-cover" />
          </div>
        </div>
      );
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-neutral-600 dark:text-neutral-400">
        <Link href="/blog" className="hover:underline">Блог</Link>
        <span className="mx-1">/</span>
        <span>{CATEGORY_LABELS[post.category]}</span>
      </nav>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{post.title}</h1>
      <div className="mt-2 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
        <span>{formatDate(post.date)}</span>
        <span>·</span>
        <span>{post.readMinutes} мин чтения</span>
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-900/10 dark:border-white/10">
        <div className="relative aspect-[16/9] w-full">
          <Image src={post.cover} alt={post.title} fill className="object-cover" />
        </div>
      </section>

      <article className="mt-6">
        {post.blocks.map((b, i) => (
          <RenderBlock key={i} block={b} />
        ))}
      </article>

      <section className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-gradient-to-r from-blue-600 to-sky-500 p-5 text-white shadow-sm dark:border-white/10">
          <div className="text-base font-semibold tracking-tight">Хотите применить у себя?</div>
          <p className="mt-1 text-sm opacity-90">Опишите задачу — предложим быстрый план внедрения.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/contacts" className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-blue-700 shadow-sm hover:bg-white/90">
              Написать нам
            </Link>
            <Link href="/services" className="inline-flex h-9 items-center rounded-full border border-white/60 px-4 text-sm font-medium text-white/95 hover:bg-white/10">
              Посмотреть услуги
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

