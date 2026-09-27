import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journalPosts } from "@/data/journal";

export function JournalSection() {
  const [featured, ...rest] = journalPosts;

  return (
    <section className="py-16 lg:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-[32px] sm:text-[38px] leading-tight text-ink">
            From Our Journal
          </h2>
          <Link
            href="/journal"
            className="focus-ring hidden sm:inline-flex items-center gap-2 text-sm text-ink border-b border-ink/30 pb-0.5 hover:border-ink"
          >
            View All
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Link href={featured.href} className="focus-ring group block">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-5 text-xs text-ink-soft">
              {featured.category} &middot; {featured.date}
            </p>
            <h3 className="mt-2 font-display text-2xl text-ink">{featured.title}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed max-w-md">
              {featured.excerpt}
            </p>
          </Link>

          <div className="flex flex-col gap-8">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={post.href}
                className="focus-ring group grid grid-cols-[120px_1fr] gap-5 sm:grid-cols-[160px_1fr]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div>
                  <p className="text-xs text-ink-soft">
                    {post.category} &middot; {post.date}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg leading-snug text-ink">
                    {post.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink border-b border-ink/20 pb-0.5">
                    Read More
                    <ArrowRight size={11} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
