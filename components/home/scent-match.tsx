import Link from "next/link";
import { Sun, Cloud, Leaf, SlidersHorizontal, ArrowRight } from "lucide-react";
import { scentMatchOptions } from "@/data/scent-match";
import type { ScentMatchOption } from "@/types";

const icons: Record<ScentMatchOption["icon"], typeof Sun> = {
  sun: Sun,
  cloud: Cloud,
  leaf: Leaf,
  sliders: SlidersHorizontal,
};

export function ScentMatch() {
  return (
    <section className="bg-beige/60 py-16 lg:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow mb-4">Find Your Perfect Fragrance</p>
          <h2 className="font-display text-[34px] sm:text-[40px] leading-tight text-ink">
            Scent Match
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Not sure which perfume suits you? Answer a few simple questions about
            your mood, occasion and preferences — we&rsquo;ll suggest the fragrances
            made for you.
          </p>
          <Link href="/scent-match" className="btn-primary focus-ring mt-8">
            Find My Fragrance
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {scentMatchOptions.map((option) => {
            const Icon = icons[option.icon];
            return (
              <div
                key={option.id}
                className="focus-ring flex flex-col items-start gap-4 bg-surface px-6 py-7 transition-colors duration-300 hover:bg-charcoal hover:text-ivory group"
              >
                <Icon size={22} strokeWidth={1.25} className="text-accent group-hover:text-champagne" />
                <span className="text-sm text-ink group-hover:text-ivory">{option.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
