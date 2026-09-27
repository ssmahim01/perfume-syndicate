"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductRating } from "@/components/product/product-rating";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });

  return (
    <section className="bg-beige/50 py-16 lg:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-[32px] sm:text-[38px] leading-tight text-ink">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Real stories from fragrance lovers around the world.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonials"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-soft hover:text-ink"
            >
              <ChevronLeft size={17} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonials"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-soft hover:text-ink"
            >
              <ChevronRight size={17} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="container-page flex gap-5">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_31%] bg-surface p-7"
            >
              <ProductRating rating={testimonial.rating} size={14} />
              <p className="mt-4 text-[15px] leading-relaxed text-ink">
                &ldquo;{testimonial.review}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="36px" className="object-cover" />
                </div>
                <span className="text-sm text-ink">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
