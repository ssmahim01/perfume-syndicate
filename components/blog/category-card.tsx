import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogCategory } from "@/types/blog";

interface CategoryCardProps {
  category: BlogCategory;
  number: number;
  sizes: string;
  size?: "default" | "featured";
  label?: string;
  priority?: boolean;
  className?: string;
}

export function CategoryCard({
  category,
  number,
  sizes,
  size = "default",
  label,
  priority = false,
  className,
}: CategoryCardProps) {
  const featured = size === "featured";

  return (
    <Link
      href={category.href}
      className={cn(
        "group focus-ring relative block aspect-[4/3] overflow-hidden rounded-2xl bg-charcoal transition-transform duration-500 ease-out hover:scale-[1.02] motion-reduce:hover:scale-100 lg:aspect-auto lg:h-full",
        className
      )}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-charcoal/10 transition-colors duration-500 group-hover:from-charcoal" />
      <div className="absolute inset-0 bg-burgundy/20 mix-blend-multiply" />

      <p className="absolute left-5 top-5 flex items-center gap-3 font-display text-sm tracking-[0.2em] text-ivory/85 sm:left-6 sm:top-6">
        {String(number).padStart(2, "0")}
        {label && (
          <span className="font-sans text-[10px] uppercase tracking-wide2 text-gold">{label}</span>
        )}
      </p>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0">
          <h3
            className={cn(
              "font-display leading-tight text-ivory",
              featured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
            )}
          >
            {category.name}
          </h3>
          <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-champagne">
            View All
            <ArrowRight
              size={13}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal"
        >
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
