"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Portal } from "@/components/ui/portal";
import { categories } from "@/data/categories";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { cn } from "@/lib/utils";

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <Portal>
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[60] transition-[visibility] duration-0",
          open ? "visible" : "invisible [transition-delay:300ms]"
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close search"
          onClick={onClose}
          className={cn(
            "absolute inset-0 bg-charcoal/55 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className={cn(
            "relative mx-auto mt-[10vh] w-[min(92vw,720px)] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-[transform,opacity] duration-300 ease-out",
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <form role="search" action="/search" className="flex items-center gap-3 border-b border-border px-5">
            <Search size={20} strokeWidth={1.5} className="shrink-0 text-ink-soft" aria-hidden />
            <input
              ref={inputRef}
              name="q"
              type="search"
              autoComplete="off"
              placeholder="Search fragrances, brands, notes…"
              aria-label="Search fragrances"
              className="h-16 min-w-0 flex-1 bg-transparent font-display text-lg text-ink outline-none placeholder:text-ink-soft/50 sm:text-xl"
            />
            <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-ink-soft sm:block">
              Esc
            </kbd>
          </form>

          <div className="px-5 py-6">
            <p className="eyebrow">Popular</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={category.href}
                    onClick={onClose}
                    className="focus-ring inline-flex rounded-full border border-border px-4 py-2 text-sm text-ink-soft transition-colors hover:border-burgundy hover:text-burgundy"
                  >
                    {category.name} {category.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              onClick={onClose}
              className="focus-ring mt-6 inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-burgundy"
            >
              Browse the Perfume Blog
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </Portal>
  );
}
