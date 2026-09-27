"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { heroSlides } from "@/data/hero";
import { cn } from "@/lib/utils";

export function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 7000);
    return () => clearInterval(id);
  }, [emblaApi]);

  useEffect(() => {
    hasAnimated.current = true;
  }, []);

  return (
    <section className="relative border-b border-border">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
              <div className="container-page grid items-center gap-10 py-10 lg:grid-cols-2 lg:py-0 lg:h-[640px]">
                <div className="order-2 lg:order-1">
                  <p className="eyebrow mb-5 animate-fade-up [animation-delay:0.05s]">
                    {slide.eyebrow}
                  </p>
                  <h1 className="font-display text-[42px] leading-[1.08] sm:text-[54px] lg:text-[60px] text-ink animate-fade-up [animation-delay:0.15s]">
                    {slide.headline}{" "}
                    <span className="italic text-accent">{slide.headlineAccent}</span>
                    <br />
                    {slide.headlineTail}
                  </h1>
                  <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft animate-fade-up [animation-delay:0.25s]">
                    {slide.description}
                  </p>
                  <div className="mt-9 flex flex-wrap items-center gap-5 animate-fade-up [animation-delay:0.35s]">
                    <Link href={slide.primaryCta.href} className="btn-primary focus-ring">
                      {slide.primaryCta.label}
                    </Link>
                    <Link
                      href={slide.secondaryCta.href}
                      className="focus-ring inline-flex items-center gap-2.5 text-sm text-ink"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/25">
                        <Play size={12} strokeWidth={1.5} fill="currentColor" />
                      </span>
                      {slide.secondaryCta.label}
                    </Link>
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-auto lg:h-[520px]">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page hidden lg:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between pointer-events-none">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
          className="focus-ring pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-surface/80 text-ink-soft hover:text-ink"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
          className="focus-ring pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-surface/80 text-ink-soft hover:text-ink"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="container-page pb-6 lg:pb-0 lg:absolute lg:bottom-8 flex items-center gap-2.5">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={selected === index}
            className={cn(
              "focus-ring h-1.5 rounded-full transition-all duration-300",
              selected === index ? "w-8 bg-ink" : "w-1.5 bg-ink/25"
            )}
          />
        ))}
      </div>
    </section>
  );
}
