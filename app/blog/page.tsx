import type { Metadata } from "next";
import { BlogMotion } from "@/components/blog/blog-motion";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogCategoryNav } from "@/components/blog/blog-category-nav";
import { FeaturedCategories } from "@/components/blog/featured-categories";
import { CategoryGrid } from "@/components/blog/category-grid";
import { EditorialStory } from "@/components/blog/editorial-story";
import { NewsletterBanner } from "@/components/blog/newsletter-banner";
import { blogCategories } from "@/data/blog";

const title = "The Perfume Blog";
const description =
  "Fragrance stories, guides, reviews, comparisons and tips from Perfume Syndicate — from decants and Arabic perfumes to luxury and niche scents.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${title} | Perfume Syndicate`,
    description,
    url: "/blog",
    type: "website",
    images: [{ url: blogCategories[0].image }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Perfume Syndicate`,
    description,
  },
};

export default function BlogPage() {
  const [featured, ...rest] = blogCategories;

  return (
    <BlogMotion>
      <BlogHero />
      <BlogCategoryNav categories={blogCategories} />
      <FeaturedCategories featured={featured} />
      <CategoryGrid categories={rest} />
      <EditorialStory />
      <NewsletterBanner />
    </BlogMotion>
  );
}
