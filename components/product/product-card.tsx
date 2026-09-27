"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ProductRating } from "@/components/product/product-rating";
import { ProductPrice } from "@/components/product/product-price";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 70vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <button
          type="button"
          onClick={() => setWishlisted((v) => !v)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="focus-ring absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-ink-soft hover:text-burgundy transition-colors"
        >
          <Heart size={15} strokeWidth={1.5} fill={wishlisted ? "currentColor" : "none"} className={cn(wishlisted && "text-burgundy")} />
        </button>
      </div>

      <div className="pt-4">
        <h3 className="font-display text-[17px] text-ink">{product.name}</h3>
        <p className="text-xs text-ink-soft mt-1">{product.fragranceType}</p>
        <div className="mt-2">
          <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} />
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
