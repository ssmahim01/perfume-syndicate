"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";

export function ProductCarousel({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    slidesToScroll: 1,
  });

  return (
    <section className="py-16 lg:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-[32px] sm:text-[38px] leading-tight text-ink">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-ink-soft max-w-md">{subtitle}</p>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous products"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-soft hover:text-ink"
            >
              <ChevronLeft size={17} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next products"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-soft hover:text-ink"
            >
              <ChevronRight size={17} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="container-page flex gap-5 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 flex-[0_0_62%] xs:flex-[0_0_48%] sm:flex-[0_0_32%] lg:flex-[0_0_22%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
