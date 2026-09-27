"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="focus-ring p-2 -mr-2 text-ink"
      >
        <Menu size={22} strokeWidth={1.5} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
          />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-surface shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <span className="font-display text-lg uppercase tracking-wide2">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="focus-ring p-2 text-ink"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-6 gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring py-3 text-base text-ink border-b border-border/60 last:border-none"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
