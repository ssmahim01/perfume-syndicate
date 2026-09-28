"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types/products";
import { brandHref, formatBDT, productHref } from "@/lib/format";
import { loadGsap, prefersReducedMotion, type GsapInstance } from "@/lib/gsap";
import { Eyebrow, PriceTag } from "./ui";

interface Props {
  products: readonly Product[];
  viewAllHref?: string;
}

export function NewArrivalShowcase({
  products,
  viewAllHref = "/new-arrivals",
}: Props) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const detail = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const gsapRef = useRef<GsapInstance | null>(null);
  const previous = useRef(0);
  const count = products.length;
  const current = products[active];

  // Intro: one orchestrated, scroll-triggered sequence.
  useEffect(() => {
    let dead = false;
    let ctx: ReturnType<GsapInstance["context"]> | undefined;
    loadGsap().then((g) => {
      if (dead || !root.current) return;
      gsapRef.current = g;
      if (prefersReducedMotion()) return;
      ctx = g.context(() => {
        g.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            once: true,
          },
        })
          .from("[data-head]", {
            y: 28,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            clearProps: "transform,opacity",
          })
          .fromTo(
            "[data-stage]",
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.3,
              ease: "expo.inOut",
              clearProps: "clipPath",
            },
            0.1,
          )
          .from(
            "[data-slide='0'] img",
            {
              scale: 1.25,
              duration: 1.6,
              ease: "power3.out",
              clearProps: "transform",
            },
            0.15,
          )
          .from(
            "[data-row]",
            {
              x: 36,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.05,
              clearProps: "transform,opacity",
            },
            0.5,
          );
      }, root);
    });
    return () => {
      dead = true;
      ctx?.revert();
    };
  }, []);

  // Slide change: wipe the new image in, swap text.
  useEffect(() => {
    const from = previous.current;
    if (from === active) return;
    previous.current = active;
    const els = slides.current;
    const next = els[active];
    const last = els[from];
    if (!next || !last) return;
    const g = gsapRef.current;

    if (!g || prefersReducedMotion()) {
      els.forEach(
        (el, i) => el && (el.style.opacity = i === active ? "1" : "0"),
      );
      return;
    }
    g.killTweensOf([next, last]);
    g.set(next, { zIndex: 2, opacity: 1 });
    g.set(last, { zIndex: 1 });
    g.fromTo(
      next,
      { clipPath: "inset(0 0 0 100%)" },
      {
        clipPath: "inset(0 0 0 0%)",
        duration: 0.95,
        ease: "power3.inOut",
        onComplete: () => {
          g.set(last, { opacity: 0 });
          g.set(next, { clearProps: "clipPath" });
        },
      },
    );
    g.fromTo(
      next.querySelector("img"),
      { scale: 1.18 },
      { scale: 1, duration: 1.3, ease: "power3.out" },
    );
    if (detail.current) {
      g.fromTo(
        detail.current.querySelectorAll("[data-swap]"),
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
        },
      );
    }
  }, [active]);

  const go = (i: number) => setActive((i + count) % count);

  return (
    <section
      ref={root}
      aria-labelledby="new-arrival-title"
      className="relative overflow-hidden bg-[#f6f3ee] pt-10 pb-16 text-[#1d1214] dark:bg-[#0d0a0b] dark:text-[#f1e9df] lg:pb-24"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div data-head>
              <Eyebrow>Discover our latest</Eyebrow>
            </div>
            <h2
              id="new-arrival-title"
              data-head
              className="mt-5 font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl"
            >
              New Arrival
            </h2>
          </div>
          <div data-head className="flex max-w-sm flex-col items-start gap-5">
            <p className="leading-relaxed text-[#1d1214]/70 dark:text-[#f1e9df]/65">
              Be the first to explore our newest fragrance collection,
              handpicked from the world&apos;s most iconic brands.
            </p>
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-3 rounded-full bg-[#6e1220] py-3 pl-6 pr-4 text-sm font-medium text-[#f6e7c8] transition hover:bg-[#8a1727] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6e1220] dark:bg-[#d6b06b] dark:text-[#1d1214] dark:hover:bg-[#e4c383]"
            >
              View all new arrivals
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </header>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Stage */}
          <div className="relative lg:col-span-5">
            <div
              aria-hidden
              className="absolute -bottom-3 inset-0 border-[#6e1220]/30 dark:border-[#d6b06b]/30"
            />
            <div
              data-stage
              className="relative aspect-[4/6] overflow-hidden bg-[#e7e0d6] dark:bg-[#1a1416]"
            >
              {products.map((p, i) => (
                <div
                  key={p.id}
                  ref={(el) => {
                    slides.current[i] = el;
                  }}
                  data-slide={i}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 ${i === 0 ? "" : "opacity-0"}`}
                >
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-out hover:scale-105">
                    <Image
                      src={p.image}
                      alt={`${p.brand} ${p.name}`}
                      fill
                      sizes="(min-width:1024px) 40vw, 92vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
              <span className="absolute left-4 top-4 z-10 rounded-full bg-[#6e1220] px-3 py-1 text-xs font-medium text-[#f6e7c8]">
                New
              </span>
              <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between text-white">
                <span className="rounded-full bg-black/35 px-3 py-1 text-xs tabular-nums backdrop-blur">
                  {active + 1} of {count}
                </span>
                <div className="flex gap-2">
                  {([-1, 1] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => go(active + d)}
                      aria-label={d < 0 ? "Previous product" : "Next product"}
                      className="grid size-11 place-items-center rounded-full bg-black/35 backdrop-blur transition hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    >
                      {d < 0 ? (
                        <ChevronLeft className="size-5" />
                      ) : (
                        <ChevronRight className="size-5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Details + index */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-7">
            <div ref={detail} aria-live="polite" className="min-h-[5rem]">
              <Link
                data-swap
                href={brandHref(current)}
                className="text-sm text-[#7a1626] underline-offset-4 hover:underline dark:text-[#d6b06b]"
              >
                {current.brand}
              </Link>
              <h3
                data-swap
                className="mt-3 font-serif text-3xl leading-[1.02] sm:text-4xl lg:text-5xl"
              >
                {current.name}
              </h3>
              <div
                data-swap
                className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-1"
              >
                <PriceTag product={current} />
                <span className="text-sm opacity-60">
                  Multiple sizes, up to {formatBDT(current.maxPrice)}
                </span>
              </div>
              <Link
                data-swap
                href={productHref(current)}
                className="mt-8 inline-flex items-center gap-2 border-b border-current pb-1 text-sm font-medium transition-[gap] duration-300 hover:gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6e1220]"
              >
                Select options
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <ol className="border-t border-[#1d1214]/15 dark:border-white/15">
              {products.map((p, i) => (
                <li
                  key={p.id}
                  data-row
                  className="border-b border-[#1d1214]/15 dark:border-white/15"
                >
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={i === active}
                    className={`group relative grid w-full grid-cols-[1fr_auto] items-center gap-4 py-4 text-left transition-[padding,color] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#6e1220] ${
                      i === active
                        ? "pl-5 text-[#6e1220] dark:text-[#d6b06b]"
                        : "pl-0 opacity-70 hover:pl-3 hover:opacity-100"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-1/2 h-px w-3 origin-left bg-current transition-transform duration-500 ${i === active ? "scale-x-100" : "scale-x-0"}`}
                    />
                    <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                      <span className="font-serif text-xl">
                        {p.name}
                      </span>
                      <span className="text-xs opacity-70">{p.brand}</span>
                    </span>
                    <span className="text-sm tabular-nums">
                      {formatBDT(p.minPrice)}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
