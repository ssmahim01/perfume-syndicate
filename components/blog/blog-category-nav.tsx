"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogCategory } from "@/types/blog";

const chipBase =
  "focus-ring inline-flex snap-start items-center whitespace-nowrap rounded-full border px-5 py-2.5 text-sm transition-colors duration-300";

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Scroll categories left" : "Scroll categories right"}
      className="focus-ring hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-burgundy hover:text-burgundy disabled:pointer-events-none disabled:opacity-30 md:flex"
    >
      <Icon size={17} strokeWidth={1.5} />
    </button>
  );
}

export function BlogCategoryNav({ categories }: { categories: readonly BlogCategory[] }) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    update();
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.6, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <nav
      aria-label="Blog categories"
      className="sticky top-16 z-30 border-b border-border bg-surface/90 backdrop-blur-md"
    >
      <div className="container-page flex items-center gap-3 py-3">
        <ArrowButton direction="prev" disabled={edge.start} onClick={() => scrollByPage(-1)} />
        <ul
          ref={scrollerRef}
          className="flex flex-1 snap-x gap-2 overflow-x-auto scroll-smooth px-1 [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <li>
            <Link
              href="/blog"
              aria-current="page"
              className={cn(chipBase, "border-burgundy bg-burgundy text-ivory")}
            >
              All Articles
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={category.href}
                className={cn(
                  chipBase,
                  "border-border text-ink-soft hover:border-burgundy hover:text-burgundy"
                )}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <ArrowButton direction="next" disabled={edge.end} onClick={() => scrollByPage(1)} />
      </div>
    </nav>
  );
}
