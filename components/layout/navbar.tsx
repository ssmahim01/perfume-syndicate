"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/ui/logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-surface/95 backdrop-blur border-b transition-shadow duration-300",
        scrolled ? "border-border shadow-[0_1px_0_0_rgba(0,0,0,0.02)]" : "border-transparent"
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden lg:flex items-center gap-9">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring text-sm text-ink-soft hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden md:flex items-center border-b border-border/70 focus-within:border-ink pr-1">
            <input
              type="search"
              placeholder="Search for fragrances..."
              aria-label="Search for fragrances"
              className="focus-ring w-40 lg:w-52 bg-transparent py-2 text-sm placeholder:text-ink-soft/70 outline-none"
            />
            <Search size={16} strokeWidth={1.5} className="text-ink-soft" />
          </div>

          <Link href="/account" aria-label="Account" className="focus-ring hidden sm:inline-flex p-2 text-ink-soft hover:text-ink">
            <User size={19} strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" className="focus-ring hidden sm:inline-flex p-2 text-ink-soft hover:text-ink">
            <Heart size={19} strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            className="focus-ring relative p-2 text-ink-soft hover:text-ink"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-ivory">
                {itemCount}
              </span>
            )}
          </button>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
