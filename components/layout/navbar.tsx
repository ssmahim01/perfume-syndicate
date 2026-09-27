"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/ui/logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

function IconButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "focus-ring flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink",
        props.className,
      )}
    >
      {children}
    </button>
  );
}

const iconLinkClass =
  "focus-ring flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b transition-[border-color,box-shadow] duration-300",
        scrolled
          ? "border-border shadow-[0_1px_0_0_rgba(0,0,0,0.03)]"
          : "border-transparent",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-6 transition-[height] duration-300 ease-out",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Logo compact={scrolled} />

        <nav className="hidden lg:flex items-center gap-8">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring group relative py-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <div className="hidden md:flex items-center">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border bg-surface-2/60 pl-4 pr-1.5 py-1.5 transition-all duration-300",
                "border-border focus-within:border-ink/25 focus-within:bg-surface",
              )}
            >
              <Search
                size={15}
                strokeWidth={1.5}
                className="text-ink-soft shrink-0"
              />
              <input
                type="search"
                placeholder="Search fragrances..."
                aria-label="Search for fragrances"
                className="focus-ring w-32 lg:w-48 bg-transparent py-1 text-sm placeholder:text-ink-soft/60 outline-none"
              />
            </div>
          </div>

          <IconButton
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="md:hidden"
          >
            <Search size={18} strokeWidth={1.5} />
          </IconButton>

          <Link
            href="/account"
            aria-label="Account"
            className={cn(iconLinkClass, "hidden sm:flex")}
          >
            <User size={18} strokeWidth={1.5} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className={cn(iconLinkClass, "hidden sm:flex")}
          >
            <Heart size={18} strokeWidth={1.5} />
          </Link>

          <IconButton
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="relative"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium leading-none text-ivory ring-2 ring-surface">
                {itemCount}
              </span>
            )}
          </IconButton>

          <MobileNavigation />
        </div>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out md:hidden",
          searchOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="container-page flex items-center gap-3 border-t border-border py-3">
            <Search
              size={16}
              strokeWidth={1.5}
              className="text-ink-soft shrink-0"
            />
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search fragrances..."
              aria-label="Search for fragrances"
              className="focus-ring flex-1 bg-transparent py-1 text-sm placeholder:text-ink-soft/60 outline-none"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="focus-ring text-ink-soft hover:text-ink"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
