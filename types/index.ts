export interface NavItem {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  headlineTail: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: string;
  imageAlt: string;
}

export interface BrandLogo {
  id: string;
  name: string;
}

export interface ScentMatchOption {
  id: string;
  label: string;
  icon: "sun" | "cloud" | "leaf" | "sliders";
}

export interface Category {
  id: string;
  name: string;
  label: string;
  href: string;
  image: string;
}

export type FragranceType = "Eau de Parfum" | "Eau de Toilette" | "Parfum" | "Eau de Cologne";

export interface Product {
  id: string;
  name: string;
  fragranceType: FragranceType;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatar: string;
}

export interface JournalPost {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
  featured?: boolean;
}

export interface ServiceFeature {
  id: string;
  label: string;
  description: string;
  icon: "truck" | "shield-check" | "lock" | "rotate-ccw";
}

export interface InstagramPost {
  id: string;
  image: string;
  href: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  fragranceType: FragranceType;
  price: number;
  quantity: number;
  image: string;
}
