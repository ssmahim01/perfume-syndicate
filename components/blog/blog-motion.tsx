"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function all(root: HTMLElement, selector: string) {
  return Array.from(root.querySelectorAll<HTMLElement>(selector));
}

/**
 * Single client boundary for every blog animation. Sections stay Server
 * Components and opt in through data attributes:
 *  data-hero          staggered page-load entrance
 *  data-hero-mask     image mask reveal on load
 *  data-reveal        fade-up on scroll (batched / staggered)
 *  data-mask          image mask reveal on scroll
 *  data-mask-inner    element scaled down while its mask opens
 *  data-parallax      subtle scrubbed parallax (value = px amplitude)
 */
export function BlogMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const revealMask = (el: HTMLElement, onScroll: boolean) => {
      const inner = el.querySelector<HTMLElement>("[data-mask-inner]");
      const tl = gsap.timeline({
        delay: onScroll ? 0 : 0.2,
        scrollTrigger: onScroll ? { trigger: el, start: "top 85%", once: true } : undefined,
      });
      tl.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.out", clearProps: "clipPath" }
      );
      if (inner) {
        tl.fromTo(inner, { scale: 1.2 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
      }
    };

    const ctx = gsap.context(() => {
      // Navbar
      const header = document.querySelector<HTMLElement>("header");
      if (header) {
        gsap.from(header, {
          y: -16,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        });
      }

      // Hero
      const heroItems = all(root, "[data-hero]");
      gsap.set(heroItems, { autoAlpha: 0, y: 32 });
      gsap.to(heroItems, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
        clearProps: "transform",
      });
      all(root, "[data-hero-mask]").forEach((el, i) => {
        gsap.delayedCall(i * 0.15, () => revealMask(el, false));
      });

      // Scroll reveals
      const reveal = all(root, "[data-reveal]");
      gsap.set(reveal, { autoAlpha: 0, y: 40 });
      ScrollTrigger.batch(reveal, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            overwrite: true,
            clearProps: "transform",
          }),
      });

      all(root, "[data-mask]").forEach((el) => revealMask(el, true));

      // Parallax
      all(root, "[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax ?? 0);
        const fromTop = el.dataset.parallaxOrigin === "top";
        gsap.fromTo(
          el,
          { y: fromTop ? 0 : -amount },
          {
            y: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") ?? el,
              start: fromTop ? "top top" : "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    }, root);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
