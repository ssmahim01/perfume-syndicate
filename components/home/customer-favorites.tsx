"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types/products";
import { brandHref, formatBDT, productHref } from "@/lib/format";
import { loadGsap, prefersReducedMotion, type GsapInstance } from "@/lib/gsap";
import { Eyebrow, WishlistButton } from "./ui";

interface Props {
  products: readonly Product[];
  viewAllHref?: string;
  onToggleWishlist?: (product: Product) => void;
}

export function CustomerFavorites({
  products,
  viewAllHref = "/best-sellers",
  onToggleWishlist,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const prevBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);

  // Progress bar + arrow disabled state.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      if (bar.current)
        bar.current.style.transform = `scaleX(${(el.scrollLeft + el.clientWidth) / el.scrollWidth})`;
      if (prevBtn.current) prevBtn.current.disabled = el.scrollLeft <= 2;
      if (nextBtn.current) nextBtn.current.disabled = el.scrollLeft >= max - 2;
    };
    const schedule = () => {
      raf ||= requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      el.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Entrance: header, then only the first cards that are actually on screen.
  useEffect(() => {
    let dead = false;
    let ctx: ReturnType<GsapInstance["context"]> | undefined;
    loadGsap().then((g) => {
      if (dead || !root.current || !track.current || prefersReducedMotion())
        return;
      const cards = Array.from(
        track.current.querySelectorAll<HTMLElement>("[data-card]"),
      ).slice(0, 5);
      ctx = g.context(() => {
        g.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
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
            cards.map((c) => c.querySelector("[data-mask]")),
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.2,
              ease: "expo.inOut",
              stagger: 0.1,
              clearProps: "clipPath",
            },
            0.2,
          )
          .from(
            cards.map((c) => c.querySelector("[data-mask] img")),
            {
              scale: 1.3,
              duration: 1.5,
              ease: "power3.out",
              stagger: 0.1,
              clearProps: "transform",
            },
            0.2,
          )
          .from(
            cards.map((c) => c.querySelector("[data-info]")),
            {
              y: 20,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
              clearProps: "transform,opacity",
            },
            0.9,
          );
      }, root);
    });
    return () => {
      dead = true;
      ctx?.revert();
    };
  }, []);

  const page = (dir: 1 | -1) =>
    track.current?.scrollBy({
      left: dir * track.current.clientWidth * 0.8,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });

  const arrow =
    "grid size-12 place-items-center rounded-full border border-current/40 transition hover:bg-[#6e1220] hover:text-[#f6e7c8] disabled:pointer-events-none disabled:opacity-30 dark:hover:bg-[#d6b06b] dark:hover:text-[#150d0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6e1220]";

  return (
    <section
      ref={root}
      aria-labelledby="favorites-title"
      className="relative overflow-hidden bg-[#ece3d6] py-20 text-[#22130f] dark:bg-[#150d0f] dark:text-[#f1e9df] lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_88%_0%,rgba(110,18,32,0.16),transparent),radial-gradient(45%_45%_at_0%_100%,rgba(214,176,107,0.14),transparent)] dark:bg-[radial-gradient(60%_55%_at_88%_0%,rgba(150,30,45,0.35),transparent),radial-gradient(45%_45%_at_0%_100%,rgba(214,176,107,0.10),transparent)]"
      />
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12">
        <header className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div data-head>
              <Eyebrow>Our most loved scents</Eyebrow>
            </div>
            <h2
              id="favorites-title"
              data-head
              className="mt-5 font-serif text-5xl leading-[0.95] sm:text-7xl lg:text-8xl"
            >
              Customer Favorites
            </h2>
            <p data-head className="mt-6 font-serif text-2xl">
              Best Sellers
            </p>
          </div>
          <div data-head className="flex flex-col gap-6 lg:col-span-5">
            <p className="max-w-md leading-relaxed opacity-75">
              Fragrances loved by our community, chosen for their exceptional
              quality, timeless appeal and unforgettable scent profiles.
            </p>
            <div className="flex items-center justify-between gap-6">
              <Link
                href={viewAllHref}
                className="group inline-flex items-center gap-3 rounded-full border border-current/50 py-3 pl-6 pr-4 text-sm font-medium transition hover:bg-[#22130f] hover:text-[#f1e9df] dark:hover:bg-[#f1e9df] dark:hover:text-[#150d0f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6e1220]"
              >
                View all best sellers
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <div className="flex gap-2">
                <button
                  ref={prevBtn}
                  type="button"
                  onClick={() => page(-1)}
                  aria-label="Scroll back"
                  className={arrow}
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  ref={nextBtn}
                  type="button"
                  onClick={() => page(1)}
                  aria-label="Scroll forward"
                  className={arrow}
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <ul
          ref={track}
          tabIndex={0}
          aria-label="Customer favorite fragrances"
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-20 lg:gap-7"
        >
          {products.map((p, i) => (
            <li
              key={p.id}
              data-card
              className="w-[72vw] max-w-[320px] shrink-0 snap-start sm:w-[290px] lg:w-[310px]"
            >
              <article className="group transition-transform duration-500 ease-out hover:scale-[1.03]">
                <div
                  data-mask
                  className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-md border border-[#22130f]/15 bg-[#dccfbd] dark:border-[#d6b06b]/25 dark:bg-[#22171a]"
                >
                  <Link
                    href={productHref(p)}
                    aria-label={`${p.brand} ${p.name}`}
                    className="absolute inset-0 block"
                  >
                    <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-110">
                      <Image
                        src={p.image}
                        alt={`${p.brand} ${p.name}`}
                        fill
                        sizes="(min-width:1024px) 310px, (min-width:640px) 290px, 72vw"
                        className="object-cover"
                        loading={i < 4 ? "eager" : "lazy"}
                      />
                      {p.hoverImage && (
                        <Image
                          src={p.hoverImage}
                          alt=""
                          fill
                          sizes="310px"
                          loading="lazy"
                          className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        />
                      )}
                    </div>
                  </Link>
                  {onToggleWishlist && (
                    <WishlistButton
                      label={p.name}
                      onToggle={() => onToggleWishlist(p)}
                      className="absolute bottom-3 right-3"
                    />
                  )}
                </div>

                <div
                  data-info
                  className="mt-5 flex items-end justify-between gap-4"
                >
                  <div className="min-w-0">
                    <Link
                      href={brandHref(p)}
                      className="text-xs opacity-65 underline-offset-4 hover:underline"
                    >
                      {p.brand}
                    </Link>
                    <h3 className="mt-1 font-serif text-xl leading-tight">
                      <Link
                        href={productHref(p)}
                        className="hover:underline underline-offset-4"
                      >
                        {p.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm tabular-nums opacity-80">
                      From {formatBDT(p.minPrice)}
                    </p>
                  </div>
                  <Link
                    href={productHref(p)}
                    aria-label={`Select options for ${p.name}`}
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-current/40 transition hover:bg-[#6e1220] hover:text-[#f6e7c8] dark:hover:bg-[#d6b06b] dark:hover:text-[#150d0f]"
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div aria-hidden className="mt-4 h-px w-full bg-current/15">
          <span
            ref={bar}
            className="block h-full origin-left bg-[#6e1220] transition-transform duration-200 dark:bg-[#d6b06b]"
            style={{ transform: "scaleX(0.1)" }}
          />
        </div>
      </div>
    </section>
  );
}
