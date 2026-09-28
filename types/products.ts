export interface Product {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly brand: string;
  readonly brandSlug: string;
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly image: string;
  readonly hoverImage?: string;
}