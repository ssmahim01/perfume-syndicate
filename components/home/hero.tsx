"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkle,
} from "lucide-react";
import { heroSlides } from "@/data/hero";
import { cn } from "@/lib/utils";
import { loadGsap, prefersReducedMotion, type GsapInstance } from "@/lib/gsap";

type Timeline = ReturnType<GsapInstance["timeline"]>;
type Tween = ReturnType<GsapInstance["to"]>;
type QuickTo = ReturnType<GsapInstance["quickTo"]>;
type Dir = 1 | -1;

const AUTOPLAY_SECONDS = 7;
const FULL = "inset(0% 0% 0% 0%)";
const pad = (n: number) => String(n).padStart(2, "0");
const pick = (el: HTMLElement, selector: string) =>
  Array.from(el.querySelectorAll(selector));
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  const count = heroSlides.length;
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const countRef = useRef<HTMLSpanElement>(null);
  const goRef = useRef<(target: number, dir?: Dir) => void>(() => {});
  const swipe = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const slides = slideRefs.current;
    const bars = barRefs.current;
    const reduce = prefersReducedMotion();
    const holds = new Set<string>();
    let g: GsapInstance | null = null;
    let tl: Timeline | null = null;
    let timer: Tween | null = null;
    let ctx: ReturnType<GsapInstance["context"]> | undefined;
    let cur = 0;
    let dead = false;

    const hold = (reason: string, on: boolean) => {
      if (on) holds.add(reason);
      else holds.delete(reason);
      if (holds.size) timer?.pause();
      else timer?.play();
    };

    function restartTimer(idx: number) {
      const G = g;
      if (!G || reduce) return;
      timer?.kill();
      bars.forEach((b) => b && G.set(b, { scaleX: 0 }));
      const bar = bars[idx];
      if (!bar) return;
      timer = G.to(bar, {
        scaleX: 1,
        duration: AUTOPLAY_SECONDS,
        ease: "none",
        onComplete: () => go(idx + 1, 1),
      });
      if (holds.size) timer.pause();
    }

    function go(target: number, dirArg?: Dir) {
      const to = (target + count) % count;
      const from = cur;
      if (to === from) return;
      const dir: Dir = dirArg ?? (to > from ? 1 : -1);
      cur = to;
      setActive(to);
      const outS = slides[from];
      const inS = slides[to];
      const G = g;
      if (!outS || !inS) return;

      if (!G || reduce) {
        slides.forEach((el, i) => {
          if (!el) return;
          el.style.visibility = i === to ? "visible" : "hidden";
          el.style.opacity = i === to ? "1" : "0";
        });
        bars.forEach(
          (b, i) =>
            b &&
            (b.style.transform =
              reduce && i === to ? "scaleX(1)" : "scaleX(0)"),
        );
        return;
      }

      tl?.progress(1).kill();
      const outLines = pick(outS, "[data-line]");
      const outFades = pick(outS, "[data-fade]");
      const outMedia = pick(outS, "[data-media]");
      const inLines = pick(inS, "[data-line]");
      const inFades = pick(inS, "[data-fade]");
      const inMedia = pick(inS, "[data-media]");
      const inImg = pick(inS, "[data-img]");
      const inDraw = pick(inS, "[data-draw]");
      const outClip = dir > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)";
      const inClip = dir > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";

      G.set(outMedia, { clipPath: FULL });
      G.set(inLines, { yPercent: 110 });
      G.set(inFades, { opacity: 0, y: 16 });
      G.set(inMedia, { clipPath: inClip });
      G.set(inImg, { scale: 1.25 });
      G.set(inDraw, { strokeDashoffset: 1 });

      tl = G.timeline()
        .to(
          outLines,
          { yPercent: -110, duration: 0.55, stagger: 0.05, ease: "power3.in" },
          0,
        )
        .to(outFades, { opacity: 0, duration: 0.35 }, 0)
        .to(
          outMedia,
          { clipPath: outClip, duration: 0.9, ease: "expo.inOut" },
          0,
        )
        .set(inS, { autoAlpha: 1, zIndex: 2 }, 0.3)
        .to(
          inMedia,
          {
            clipPath: FULL,
            duration: 1.1,
            ease: "expo.inOut",
            clearProps: "clipPath",
          },
          0.3,
        )
        .to(inImg, { scale: 1, duration: 1.6, ease: "power3.out" }, 0.3)
        .to(
          inLines,
          { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power4.out" },
          0.65,
        )
        .to(
          inFades,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
          0.8,
        )
        .to(
          inDraw,
          { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" },
          1.1,
        )
        .set(outS, { autoAlpha: 0, zIndex: 0 }, 0.95)
        .add(() => {
          G.set(outLines, { clearProps: "transform" });
          G.set(outFades, { clearProps: "opacity,transform" });
          G.set(outMedia, { clearProps: "clipPath" });
          G.set(pick(outS, "[data-img]"), { clearProps: "transform" });
          G.set(pick(outS, "[data-draw]"), { clearProps: "strokeDashoffset" });
        }, 0.96);

      if (countRef.current)
        G.fromTo(
          countRef.current,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.6, ease: "power3.out" },
        );
      restartTimer(to);
    }

    goRef.current = go;

    // Pause autoplay on hover, keyboard focus, hidden tab and while off-screen.
    const onEnter = () => hold("hover", true);
    const onLeave = () => hold("hover", false);
    const onFocusIn = (e: FocusEvent) =>
      hold("focus", (e.target as HTMLElement).matches(":focus-visible"));
    const onFocusOut = () => hold("focus", false);
    const onVisibility = () => hold("hidden", document.hidden);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibility);
    const io = new IntersectionObserver(
      ([entry]) => hold("offscreen", !entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(root);

    let onMove: ((e: PointerEvent) => void) | undefined;
    let onOut: (() => void) | undefined;

    loadGsap().then((G) => {
      if (dead) return;
      g = G;
      if (reduce) {
        const bar = bars[cur];
        if (bar) bar.style.transform = "scaleX(1)";
        return;
      }
      restartTimer(cur);

      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const fine = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;

      ctx = G.context(() => {
        if (!wide) return;
        const scrub = {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        G.to("[data-stage]", { y: 70, ease: "none", scrollTrigger: scrub });
        G.to("[data-glow]", { y: 180, ease: "none", scrollTrigger: scrub });
      }, root);

      if (wide && fine) {
        const drifts = slides.map(
          (s) => s?.querySelector<HTMLElement>("[data-drift]") ?? null,
        );
        const dX: (QuickTo | null)[] = drifts.map((d) =>
          d ? G.quickTo(d, "x", { duration: 0.9, ease: "power3.out" }) : null,
        );
        const dY: (QuickTo | null)[] = drifts.map((d) =>
          d ? G.quickTo(d, "y", { duration: 0.9, ease: "power3.out" }) : null,
        );
        const badge = root.querySelector<HTMLElement>("[data-float='badge']");
        const card = root.querySelector<HTMLElement>("[data-float='next']");
        const bX = badge
          ? G.quickTo(badge, "x", { duration: 1.1, ease: "power3.out" })
          : null;
        const bY = badge
          ? G.quickTo(badge, "y", { duration: 1.1, ease: "power3.out" })
          : null;
        const cX = card
          ? G.quickTo(card, "x", { duration: 1.1, ease: "power3.out" })
          : null;
        const cY = card
          ? G.quickTo(card, "y", { duration: 1.1, ease: "power3.out" })
          : null;
        const apply = (nx: number, ny: number) => {
          dX[cur]?.(nx * -20);
          dY[cur]?.(ny * -16);
          bX?.(nx * 30);
          bY?.(ny * 24);
          cX?.(nx * -14);
          cY?.(ny * -10);
        };
        onMove = (e) => {
          const r = root.getBoundingClientRect();
          apply(
            (e.clientX - r.left) / r.width - 0.5,
            (e.clientY - r.top) / r.height - 0.5,
          );
        };
        onOut = () => apply(0, 0);
        root.addEventListener("pointermove", onMove, { passive: true });
        root.addEventListener("pointerleave", onOut);
      }
    });

    return () => {
      dead = true;
      timer?.kill();
      tl?.kill();
      ctx?.revert();
      io.disconnect();
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibility);
      if (onMove) root.removeEventListener("pointermove", onMove);
      if (onOut) root.removeEventListener("pointerleave", onOut);
    };
  }, [count]);

  const go = (target: number, dir?: Dir) => goRef.current(target, dir);
  const next = heroSlides[(active + 1) % count];

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative isolate overflow-hidden border-b border-border"
    >
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[560px] rounded-full bg-accent opacity-[0.12] blur-3xl"
      />

      <div className="container-page relative">
        <div
          data-stage
          className="grid touch-pan-y"
          onPointerDown={(e) => {
            swipe.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerCancel={() => {
            swipe.current = null;
          }}
          onPointerUp={(e) => {
            const s = swipe.current;
            swipe.current = null;
            if (!s) return;
            const dx = e.clientX - s.x;
            const dy = e.clientY - s.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              const dir: Dir = dx < 0 ? 1 : -1;
              go(active + dir, dir);
            }
          }}
        >
          {heroSlides.map((slide, i) => {
            const first = i === 0;
            const Heading = first ? "h1" : "h2";
            return (
              <div
                key={slide.id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== active}
                className={cn(
                  "grid items-center gap-8 py-8 [grid-area:1/1] lg:h-[680px] lg:grid-cols-2 lg:gap-10 lg:py-0",
                  !first && "invisible opacity-0",
                )}
              >
                <div className="order-2 lg:order-1">
                  <p
                    data-fade
                    className={cn("eyebrow mb-6", first && "hero-a-fade")}
                    style={delay(0.1)}
                  >
                    {slide.eyebrow}
                  </p>
                  <Heading className="font-display text-[44px] leading-[1.02] text-ink sm:text-[58px] lg:text-[76px]">
                    <span className="-mb-[0.2em] block overflow-hidden pb-[0.2em]">
                      <span
                        data-line
                        className={cn("block", first && "hero-a-line")}
                        style={delay(0.15)}
                      >
                        {slide.headline}{" "}
                        <span className="relative inline-block italic text-accent">
                          {slide.headlineAccent}
                          <svg
                            aria-hidden
                            viewBox="0 0 100 10"
                            preserveAspectRatio="none"
                            className="absolute inset-x-0 -bottom-1 h-2 w-full overflow-visible"
                          >
                            <path
                              data-draw
                              d="M2 6 C 25 1, 50 9, 98 3"
                              pathLength={1}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              vectorEffect="non-scaling-stroke"
                              className={cn(
                                "[stroke-dasharray:1]",
                                first && "hero-a-draw",
                              )}
                              style={delay(0.9)}
                            />
                          </svg>
                        </span>
                      </span>
                    </span>
                    <span className="-mb-[0.2em] block overflow-hidden pb-[0.2em]">
                      <span
                        data-line
                        className={cn("block", first && "hero-a-line")}
                        style={delay(0.25)}
                      >
                        {slide.headlineTail}
                      </span>
                    </span>
                  </Heading>
                  <p
                    data-fade
                    className={cn(
                      "mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft",
                      first && "hero-a-fade",
                    )}
                    style={delay(0.5)}
                  >
                    {slide.description}
                  </p>
                  <div
                    data-fade
                    className={cn(
                      "mt-9 flex flex-wrap items-center gap-5",
                      first && "hero-a-fade",
                    )}
                    style={delay(0.62)}
                  >
                    <Link
                      href={slide.primaryCta.href}
                      className="btn-primary focus-ring group inline-flex items-center gap-2"
                    >
                      {slide.primaryCta.label}
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                    <Link
                      href={slide.secondaryCta.href}
                      className="focus-ring group inline-flex items-center gap-2.5 text-sm text-ink"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 transition-transform duration-300 group-hover:scale-110">
                        <Play size={12} strokeWidth={1.5} fill="currentColor" />
                      </span>
                      {slide.secondaryCta.label}
                    </Link>
                  </div>
                </div>

                <div className="relative order-1 mx-auto w-full max-w-[440px] lg:order-2 lg:ml-auto lg:mr-0 lg:max-w-[480px]">
                  <div
                    data-fade
                    aria-hidden
                    className={cn(
                      "absolute inset-0 translate-x-1 translate-y-1 rounded-b-2xl rounded-t-[999px] border-ink/20",
                      first && "hero-a-fade",
                    )}
                    style={delay(0.4)}
                  />
                  <div
                    data-media
                    className="relative aspect-[4/5] overflow-hidden rounded-b-2xl rounded-t-[999px] bg-ink/5 lg:aspect-auto lg:h-[540px]"
                  >
                    <div data-drift className="absolute -inset-4">
                      <Image
                        data-img
                        src={slide.image}
                        alt={slide.imageAlt}
                        fill
                        priority={first}
                        sizes="(min-width: 1024px) 480px, 90vw"
                        className={cn("object-cover", first && "hero-a-settle")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shared decorative layer (desktop) */}
        <div
          data-float="badge"
          aria-hidden
          className="pointer-events-none absolute left-[calc(50%-3.5rem)] top-10 hidden size-28 lg:block"
        >
          <svg
            viewBox="0 0 100 100"
            className="size-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none"
          >
            <defs>
              <path
                id="hero-ring"
                d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
              />
            </defs>
            <text className="fill-ink text-[7.5px]" letterSpacing="1.6">
              <textPath href="#hero-ring">
                Perfume Syndicate · Perfume Syndicate ·{" "}
              </textPath>
            </text>
          </svg>
          <span className="absolute inset-0 grid place-items-center text-accent">
            <Sparkle size={18} strokeWidth={1.25} />
          </span>
        </div>

        <button
          type="button"
          data-float="next"
          onClick={() => go(active + 1, 1)}
          aria-label={`Show next slide: ${next.headline} ${next.headlineAccent}`}
          className="focus-ring absolute bottom-[96px] right-6 hidden w-60 items-center gap-3 rounded-xl border border-white/25 bg-surface/80 p-2 pr-4 text-left backdrop-blur-md transition-colors hover:bg-surface lg:flex"
        >
          <span className="relative size-14 shrink-0 overflow-hidden rounded-lg">
            <Image
              key={next.id}
              src={next.image}
              alt=""
              fill
              sizes="56px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-ink-soft">Up next</span>
            <span className="block truncate text-sm text-ink">
              {next.headline} {next.headlineAccent}
            </span>
          </span>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="shrink-0 text-ink-soft"
          />
        </button>

        {/* Controls */}
        <div className="flex items-center gap-5 pb-8 pt-2 sm:gap-8 lg:absolute lg:inset-x-0 lg:bottom-6 lg:pb-0 lg:pt-0">
          <p
            className="flex items-baseline gap-1.5 font-display text-ink tabular-nums"
            aria-hidden
          >
            <span className="inline-block h-[1.2em] overflow-hidden text-xl leading-[1.2]">
              <span ref={countRef} className="block">
                {pad(active + 1)}
              </span>
            </span>
            <span className="text-sm text-ink-soft">/ {pad(count)}</span>
          </p>

          <div className="flex max-w-xs flex-1 gap-2">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={active === i}
                className="focus-ring relative h-6 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-px bg-ink/20" />
                <span
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 scale-x-0 bg-ink"
                />
              </button>
            ))}
          </div>

          <div className="ml-auto flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => go(active + d, d)}
                aria-label={d < 0 ? "Previous slide" : "Next slide"}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-surface/80 text-ink-soft transition-colors hover:text-ink"
              >
                {d < 0 ? (
                  <ChevronLeft size={18} strokeWidth={1.5} />
                ) : (
                  <ChevronRight size={18} strokeWidth={1.5} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
