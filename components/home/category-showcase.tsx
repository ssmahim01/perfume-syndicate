import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

export function CategoryShowcase() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-[32px] sm:text-[38px] leading-tight text-ink">
            Shop by
            <br />
            Category
          </h2>
          <Link
            href="/shop"
            className="focus-ring hidden sm:inline-flex items-center gap-2 text-sm text-ink border-b border-ink/30 pb-0.5 hover:border-ink"
          >
            View All
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="focus-ring group relative block aspect-[3/4] overflow-hidden"
            >
              <Image
                src={category.image}
                alt={`${category.name} fragrances`}
                fill
                sizes="(min-width: 1024px) 24vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                <p className="font-display text-lg">{category.name}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ivory/75">
                  {category.label}
                  <ArrowRight size={12} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
