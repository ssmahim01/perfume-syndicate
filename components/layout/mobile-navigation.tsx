"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Heart, Menu, Search, User, X } from "lucide-react";
import { Portal } from "@/components/ui/portal";
import { categories } from "@/data/categories";
import { mainNav } from "@/data/navigation";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      <Portal>
        <div
          aria-hidden={!open}
          className={cn(
            "fixed inset-0 z-[60] lg:hidden transition-[visibility] duration-0",
            open ? "visible" : "invisible [transition-delay:500ms]"
          )}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className={cn(
              "absolute inset-0 bg-charcoal/55 backdrop-blur-sm transition-opacity duration-500",
              open ? "opacity-100" : "opacity-0"
            )}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className={cn(
              "absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-surface shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-6">
              <span className="eyebrow !text-accent">Menu</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <form
                role="search"
                action="/search"
                className="flex items-center gap-3 rounded-full border border-border bg-surface-2/60 px-4 transition-colors focus-within:border-ink/30"
              >
                <Search size={16} strokeWidth={1.5} className="shrink-0 text-ink-soft" aria-hidden />
                <input
                  name="q"
                  type="search"
                  placeholder="Search fragrances…"
                  aria-label="Search fragrances"
                  className="h-11 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/60"
                />
              </form>

              <nav aria-label="Mobile" className="mt-4">
                <ul>
                  {mainNav.map((item, index) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li
                        key={item.href}
                        style={{ transitionDelay: open ? `${150 + index * 50}ms` : "0ms" }}
                        className={cn(
                          "border-b border-border/60 transition-[opacity,transform] duration-500",
                          open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        )}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "focus-ring group flex items-center justify-between py-4 font-display text-2xl transition-colors",
                            active ? "text-burgundy" : "text-ink hover:text-burgundy"
                          )}
                        >
                          {item.label}
                          <ArrowUpRight
                            size={18}
                            strokeWidth={1.5}
                            className="text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8">
                <p className="eyebrow">Shop by</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={category.href}
                        className="focus-ring inline-flex rounded-full border border-border px-4 py-2 text-sm text-ink-soft transition-colors hover:border-burgundy hover:text-burgundy"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-border p-6">
              <Link
                href="/account"
                className="focus-ring flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm text-ink transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <User size={16} strokeWidth={1.5} />
                Account
              </Link>
              <Link
                href="/wishlist"
                className="focus-ring flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm text-ink transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <Heart size={16} strokeWidth={1.5} />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
}
