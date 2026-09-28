import type { BlogCategory, BlogCategoryId } from "@/types/blog";

const SITE_URL = "https://perfumesyndicatebd.com";
const UPLOADS_URL = `${SITE_URL}/wp-content/uploads/2026/08`;

/** Categories and images taken from the existing Perfume Syndicate blog page. */
export const blogCategories: readonly BlogCategory[] = [
  {
    id: "perfume-decants",
    name: "Perfume Decants",
    href: `${SITE_URL}/perfume-decants`,
    image: `${UPLOADS_URL}/Perfume-Decants-1-1067x800.webp`,
  },
  {
    id: "best-perfumes",
    name: "Best Perfumes",
    href: `${SITE_URL}/best-perfumes/`,
    image: `${UPLOADS_URL}/Best-Perfumes-1-1067x800.webp`,
  },
  {
    id: "mens-perfumes",
    name: "Men's Perfumes",
    href: `${SITE_URL}/mens-perfumes/`,
    image: `${UPLOADS_URL}/Mens-Perfumes-1-1067x800.webp`,
  },
  {
    id: "womens-perfumes",
    name: "Women's Perfumes",
    href: `${SITE_URL}/womens-perfumes/`,
    image: `${UPLOADS_URL}/Womens-Perfumes-1067x800.webp`,
  },
  {
    id: "arabic-perfumes",
    name: "Arabic Perfumes",
    href: `${SITE_URL}/arabic-perfumes/`,
    image: `${UPLOADS_URL}/Arabic-Perfumes-1-1067x800.webp`,
  },
  {
    id: "luxury-niche-perfumes",
    name: "Luxury & Niche Perfumes",
    href: `${SITE_URL}/luxury-niche-perfumes/`,
    image: `${UPLOADS_URL}/Luxury-Niche-Perfumes-1-1067x800.webp`,
  },
  {
    id: "perfume-reviews",
    name: "Perfume Reviews",
    href: `${SITE_URL}/perfume-reviews/`,
    image: `${UPLOADS_URL}/Perfume-Reviews-1-1067x800.webp`,
  },
  {
    id: "perfume-comparisons",
    name: "Perfume Comparisons",
    href: `${SITE_URL}/perfume-comparisons/`,
    image: `${UPLOADS_URL}/Perfume-Comparisons-1-1068x800.webp`,
  },
  {
    id: "seasonal-perfumes",
    name: "Seasonal Perfumes",
    href: `${SITE_URL}/seasonal-perfumes/`,
    image: `${UPLOADS_URL}/Seasonal-Perfumes-1-1067x800.webp`,
  },
  {
    id: "gift-ideas",
    name: "Gift ideas",
    href: `${SITE_URL}/gift-ideas/`,
    image: `${UPLOADS_URL}/Gift-Ideas-1-1067x800.webp`,
  },
  {
    id: "perfume-guides",
    name: "Perfume Guides",
    href: `${SITE_URL}/perfume-guides/`,
    image: `${UPLOADS_URL}/Perfume-Guides-1-1067x800.webp`,
  },
  {
    id: "fragrance-tips",
    name: "Fragrance Tips",
    href: `${SITE_URL}/fragrance-tips/`,
    image: `${UPLOADS_URL}/Fragrance-Tips-1-1067x800.webp`,
  },
];

export function getBlogCategory(id: BlogCategoryId): BlogCategory {
  const category = blogCategories.find((item) => item.id === id);
  if (!category) throw new Error(`Unknown blog category: ${id}`);
  return category;
}
