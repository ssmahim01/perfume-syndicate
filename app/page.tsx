import { Hero } from "@/components/home/hero";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { ScentMatch } from "@/components/home/scent-match";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { ProductCarousel } from "@/components/home/product-carousel";
import { PromotionBanner } from "@/components/home/promotion-banner";
import { BenefitsStrip } from "@/components/home/benefits-strip";
import { BrandStory } from "@/components/home/brand-story";
import { Testimonials } from "@/components/home/testimonials";
import { JournalSection } from "@/components/home/journal-section";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { bestSellers, CUSTOMER_FAVORITES, NEW_ARRIVALS } from "@/data/products";
import { NewArrivalShowcase } from "@/components/home/new-arrivals-showcase";
import { CustomerFavorites } from "@/components/home/customer-favorites";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <ScentMatch />
      <NewArrivalShowcase products={NEW_ARRIVALS} viewAllHref="/shop" />
      <CategoryShowcase />
      <CustomerFavorites products={CUSTOMER_FAVORITES} viewAllHref="/shop" />
      <ProductCarousel
        title="Best Sellers"
        subtitle="Each fragrance crafted to complement your unique essence."
        products={bestSellers}
      />
      <PromotionBanner />
      <BenefitsStrip />
      <BrandStory />
      <Testimonials />
      <JournalSection />
      <InstagramGallery />
    </>
  );
}
