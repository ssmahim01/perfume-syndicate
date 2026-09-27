"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      aria-label={`Add ${product.name} to cart`}
      className="focus-ring inline-flex items-center gap-2 text-xs tracking-wide2 uppercase text-ink border-b border-ink/30 pb-0.5 hover:border-ink transition-colors"
    >
      <ShoppingBag size={14} strokeWidth={1.5} />
      Add to Cart
    </button>
  );
}
