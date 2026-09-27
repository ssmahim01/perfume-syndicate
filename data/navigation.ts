import { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const footerShopLinks: NavItem[] = [
  { label: "All Fragrances", href: "/shop" },
  { label: "Women", href: "/shop/women" },
  { label: "Men", href: "/shop/men" },
  { label: "Unisex", href: "/shop/unisex" },
  { label: "Niche", href: "/shop/niche" },
  { label: "Gift Sets", href: "/shop/gift-sets" },
];

export const footerCompanyLinks: NavItem[] = [
  { label: "Our Story", href: "/about" },
  { label: "Craftsmanship", href: "/about/craftsmanship" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const footerCareLinks: NavItem[] = [
  { label: "Shipping Information", href: "/care/shipping" },
  { label: "Returns & Refunds", href: "/care/returns" },
  { label: "Size Guide", href: "/care/size-guide" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
];
