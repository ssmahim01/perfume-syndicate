import type { gsap as Gsap } from "gsap";

export type GsapInstance = typeof Gsap;

let cache: Promise<GsapInstance> | null = null;

export function loadGsap(): Promise<GsapInstance> {
  cache ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return gsap;
    },
  );
  return cache;
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
