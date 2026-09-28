"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Heart, Search, ShoppingBag, User } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "@/components/ui/logo";
import { CollectionMenu } from "@/components/layout/collection-menu";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { SearchPanel } from "@/components/layout/search-panel";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const iconClass =
  "focus-ring flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink";

const navLinkClass =
  "focus-ring relative flex items-center gap-1 rounded-full px-4 py-2 text-[12.5px] font-medium uppercase tracking-[0.14em] transition-colors";

function IconButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={cn(iconClass, className)} />;
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shortcut, setShortcut] = useState("");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const collectionTriggerRef = useRef<HTMLButtonElement>(null);
  const lockedRef = useRef(false);
  const hoverOpenedAtRef = useRef(0);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeCollection = useCallback(() => setCollectionOpen(false), []);

  const moveIndicator = (element: HTMLElement) =>
    setIndicator({ left: element.offsetLeft, width: element.offsetWidth, visible: true });

  useEffect(() => {
    lockedRef.current = collectionOpen || searchOpen;
  }, [collectionOpen, searchOpen]);

  useEffect(() => setCollectionOpen(false), [pathname]);

  // Scroll: shrink, smart hide/show, progress line.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;

      setScrolled(y > 12);

      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }

      if (lockedRef.current || y < 120) {
        setHidden(false);
      } else if (delta > 6 && y > 320) {
        setHidden(true);
        setCollectionOpen(false);
      } else if (delta < -6) {
        setHidden(false);
      }

      if (Math.abs(delta) > 6) lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard: Ctrl/Cmd + K opens search, Escape closes the mega menu.
  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K");

    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape" && lockedRef.current) {
        setCollectionOpen((wasOpen) => {
          if (wasOpen) collectionTriggerRef.current?.focus();
          return false;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close the mega menu on outside press (touch / click).
  useEffect(() => {
    if (!collectionOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setCollectionOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [collectionOpen]);

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={closeCollection}
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "sticky top-0 z-40 border-b bg-surface/85 backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 ease-out",
          scrolled
            ? "border-border shadow-[0_10px_30px_-18px_hsl(var(--burgundy)/0.35)]"
            : "border-transparent",
          hidden && "-translate-y-full"
        )}
      >
        <div
          className={cn(
            "container-page grid grid-cols-[1fr_auto] items-center gap-4 transition-[height] duration-300 ease-out lg:grid-cols-[1fr_auto_1fr]",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <div className="justify-self-start">
            <Logo compact={scrolled} />
          </div>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul
              className="relative flex items-center"
              onMouseLeave={() => setIndicator((current) => ({ ...current, visible: false }))}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 my-auto h-9 rounded-full bg-ink/[0.06] transition-[transform,width,opacity] duration-300 ease-out"
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: indicator.width,
                  opacity: indicator.visible ? 1 : 0,
                }}
              />
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                const tone = active ? "text-ink" : "text-ink-soft hover:text-ink";
                const dot = active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                  />
                );

                return (
                  <li key={item.href}>
                    {item.menu ? (
                      <button
                        ref={collectionTriggerRef}
                        type="button"
                        aria-expanded={collectionOpen}
                        aria-controls="collection-menu"
                        onMouseEnter={(event) => {
                          moveIndicator(event.currentTarget);
                          hoverOpenedAtRef.current = Date.now();
                          setCollectionOpen(true);
                        }}
                        onFocus={(event) => moveIndicator(event.currentTarget)}
                        onClick={() => {
                          if (collectionOpen && Date.now() - hoverOpenedAtRef.current < 500) return;
                          setCollectionOpen((value) => !value);
                        }}
                        className={cn(navLinkClass, collectionOpen ? "text-ink" : tone)}
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          strokeWidth={1.75}
                          className={cn("transition-transform duration-300", collectionOpen && "rotate-180")}
                        />
                        {dot}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onMouseEnter={(event) => {
                          moveIndicator(event.currentTarget);
                          setCollectionOpen(false);
                        }}
                        onFocus={(event) => moveIndicator(event.currentTarget)}
                        className={cn(navLinkClass, tone)}
                      >
                        {item.label}
                        {dot}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              aria-haspopup="dialog"
              className="focus-ring mr-1 hidden w-56 items-center gap-3 rounded-full border border-border bg-surface-2/60 py-2 pl-4 pr-2 text-left transition-colors hover:border-ink/25 hover:bg-surface lg:flex"
            >
              <Search size={15} strokeWidth={1.5} className="shrink-0 text-ink-soft" />
              <span className="flex-1 text-sm text-ink-soft/80">Search...</span>
              {shortcut && (
                <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-ink-soft">
                  {shortcut}
                </kbd>
              )}
            </button>

            <IconButton
              type="button"
              aria-label="Search"
              aria-haspopup="dialog"
              onClick={() => setSearchOpen(true)}
              className="lg:hidden"
            >
              <Search size={18} strokeWidth={1.5} />
            </IconButton>

            <Link href="/account" aria-label="Account" className={cn(iconClass, "hidden sm:flex")}>
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className={cn(iconClass, "hidden sm:flex")}>
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
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-medium leading-none text-ivory ring-2 ring-surface">
                  {itemCount}
                </span>
              )}
            </IconButton>

            <MobileNavigation />
          </div>
        </div>

        <CollectionMenu open={collectionOpen} onNavigate={closeCollection} />

        <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px]">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-burgundy via-gold to-gold"
          />
        </div>
      </header>

      <SearchPanel open={searchOpen} onClose={closeSearch} />
    </>
  );
}
