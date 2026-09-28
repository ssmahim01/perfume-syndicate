import type { ReactNode } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/types/products";
import { formatBDT } from "@/lib/format";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-sm tracking-wide text-[#7a1626] dark:text-[#d6b06b] ${className}`}>
      <span aria-hidden className="h-px w-10 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function PriceTag({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <p className={`flex items-baseline gap-2 ${className}`}>
      <span className="text-xs opacity-60">From</span>
      <span className="font-serif text-2xl tabular-nums">{formatBDT(product.minPrice)}</span>
    </p>
  );
}

interface WishlistButtonProps {
  label: string;
  onToggle: () => void;
  className?: string;
}

export function WishlistButton({ label, onToggle, className = "" }: WishlistButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Add ${label} to wishlist`}
      className={`grid size-10 place-items-center rounded-full bg-white/80 text-[#2b1a1c] backdrop-blur transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a1626] ${className}`}
    >
      <Heart className="size-[18px]" strokeWidth={1.5} />
    </button>
  );
}