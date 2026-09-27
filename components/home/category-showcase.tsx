import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

export function CategoryShowcase() {
  return (
    <section className="border-t border-ivory/10 bg-charcoal py-0">
      <div className="flex items-end justify-between px-6 py-8 lg:px-10">
        <h2 className="font-display text-[28px] sm:text-[34px] leading-tight text-ivory">
          Shop by
          <br />
          Category
        </h2>
        <Link
          href="/shop"
          className="focus-ring hidden sm:inline-flex items-center gap-2 text-sm text-ivory/80 border-b border-ivory/30 pb-0.5 hover:border-ivory hover:text-ivory"
        >
          View All
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => (
          <Link
            key={category.id}
            href={category.href}
            className={`focus-ring group relative block h-[70vh] min-h-[420px] overflow-hidden ${
              i !== categories.length - 1 ? "border-r border-ivory/10" : ""
            }`}
          >
            {/* base image */}
            <Image
              src={category.image}
              alt={`${category.name} fragrances`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top grayscale-[15%] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />

            {/* moody red/black tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-red-950/30 to-black/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

            {/* label */}
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <p className="font-display text-3xl lg:text-4xl font-bold uppercase tracking-tight text-ivory">
                {category.name}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-amber-200/80">
                {category.label}
                <ArrowRight
                  size={12}
                  strokeWidth={1.75}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}