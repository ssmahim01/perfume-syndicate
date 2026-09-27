import { brandLogos } from "@/data/brands";

export function BrandMarquee() {
  const loop = [...brandLogos, ...brandLogos];

  return (
    <section aria-label="Featured brands" className="border-b border-border bg-surface-2/50 py-7">
      <div className="group overflow-hidden">
        <div className="flex w-max gap-16 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((brand, index) => (
            <span
              key={`${brand.id}-${index}`}
              className="font-display text-lg sm:text-xl tracking-[0.15em] text-ink-soft/70 whitespace-nowrap"
            >
              {brand.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
