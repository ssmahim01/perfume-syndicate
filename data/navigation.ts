import { NavItem } from "@/types";

export interface MainNavItem extends NavItem {
  menu?: "collection";
}

export const mainNav: MainNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collection", menu: "collection" },
  { label: "Top Brands", href: "/top-brands" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export const footerCategoryLinks: NavItem[] = [
  { label: "Niche", href: "/niche" },
  { label: "Designer", href: "/designer" },
  { label: "Arabian", href: "/arabian" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/perfume-reviews" },
];

export const footerUsefulLinks: NavItem[] = [
  { label: "My Account", href: "/my-account" },
  { label: "Order Track", href: "/order-track" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund and Returns Policy", href: "/refund-and-returns-policy" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerPolicyLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund and Returns Policy", href: "/refund-and-returns-policy" },
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