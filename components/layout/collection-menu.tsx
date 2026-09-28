"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

/** Desktop mega menu. Anchored to the header, so it must sit outside any `relative` wrapper. */
export function CollectionMenu({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  // Mount the images only after the first open so they don't load on every page view.
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (open) setRendered(true);
  }, [open]);

  return (
    <div
      id="collection-menu"
      aria-hidden={!open}
      className={cn(
        "absolute inset-x-0 top-full hidden border-b border-border bg-surface/95 backdrop-blur-xl transition-[opacity,transform,visibility] duration-300 ease-out lg:block",
        "shadow-[0_30px_60px_-30px_hsl(var(--burgundy)/0.35)]",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
      )}
    >
      {rendered && (
        <div className="container-page grid gap-12 py-10 lg:grid-cols-[260px_1fr]">
          <div className="flex flex-col justify-between">
            <div>
              <p className="eyebrow !text-accent">Collection</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ink">
                Find your
                <br />
                signature scent
              </h2>
            </div>
            <Link
              href="/collection"
              onClick={onNavigate}
              className="focus-ring mt-8 inline-flex w-fit items-center gap-2 border-b border-ink/30 pb-0.5 text-sm text-ink transition-colors hover:border-ink"
            >
              View entire collection
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>

          <ul className="grid grid-cols-4 gap-5">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={category.href}
                  onClick={onNavigate}
                  className="group focus-ring relative block aspect-[4/3] overflow-hidden rounded-xl bg-charcoal"
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="18vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-display text-lg text-ivory">
                    {category.name}
                  </span>
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 text-charcoal opacity-0 transition-all duration-300 group-hover:opacity-100"
                  >
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
