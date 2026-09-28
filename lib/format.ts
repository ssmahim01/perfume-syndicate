import type { Product } from "@/types/products";

export const formatBDT = (n: number): string => `৳${n.toLocaleString("en-US")}`;
export const productHref = (p: Product): string => `/product/${p.slug}`;
export const brandHref = (p: Product): string => `/brand/${p.brandSlug}`;