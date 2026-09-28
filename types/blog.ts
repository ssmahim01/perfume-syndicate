export type BlogCategoryId =
  | "perfume-decants"
  | "best-perfumes"
  | "mens-perfumes"
  | "womens-perfumes"
  | "arabic-perfumes"
  | "luxury-niche-perfumes"
  | "perfume-reviews"
  | "perfume-comparisons"
  | "seasonal-perfumes"
  | "gift-ideas"
  | "perfume-guides"
  | "fragrance-tips";

export interface BlogCategory {
  id: BlogCategoryId;
  name: string;
  href: string;
  image: string;
}

export interface ContactInfoItem {
  id: string;
  icon: "phone" | "whatsapp" | "facebook" | "instagram" | "mail" | "map-pin";
  label: string;
  href?: string;
}

export interface SocialLink {
  id: "facebook" | "instagram" | "whatsapp";
  label: string;
  href: string;
}
