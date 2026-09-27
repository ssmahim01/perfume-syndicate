import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

const stats = [
  { label: "Years of Expertise", value: "10+" },
  { label: "Happy Customers", value: "500K+" },
  { label: "Satisfaction Rate", value: "98%" },
  { label: "Premium Quality", value: "100%" },
];

export function BrandStory() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1615372716053-4b9a0b1e6b2f?q=80&w=1200&auto=format&fit=crop"
            alt="Perfumer's hands crafting a fragrance among natural botanicals"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
          <button
            type="button"
            aria-label="Watch our story"
            className="focus-ring absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ivory/90 text-charcoal transition-transform duration-300 hover:scale-105">
              <Play size={18} strokeWidth={1.5} fill="currentColor" />
            </span>
          </button>
        </div>

        <div>
          <p className="eyebrow mb-4">Our Story</p>
          <h2 className="font-display text-[32px] sm:text-[38px] leading-tight text-ink max-w-sm">
            Crafted from nature. Inspired by emotion.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
            At Perfume Syndicate, we blend rare ingredients with artistry to
            create fragrances that inspire, empower and leave a legacy.
          </p>
          <Link href="/about" className="btn-outline focus-ring mt-8">
            Discover Our Story
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>

          <dl className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl text-ink">{stat.value}</dd>
                <p className="mt-1 text-xs text-ink-soft leading-snug">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
