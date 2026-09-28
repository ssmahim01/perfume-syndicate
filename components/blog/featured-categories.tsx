import { CategoryCard } from "@/components/blog/category-card";
import type { BlogCategory } from "@/types/blog";

export function FeaturedCategories({ featured }: { featured: BlogCategory }) {
  return (
    <section
      id="categories"
      aria-labelledby="popular-categories"
      className="scroll-mt-32 pb-10 pt-16 lg:pb-14 lg:pt-24"
    >
      <div className="container-page grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4 lg:pb-4">
          <p data-reveal className="eyebrow !text-accent">
            Featured Stories
          </p>
          <h2
            id="popular-categories"
            data-reveal
            className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-5xl"
          >
            Popular
            <br />
            Categories
          </h2>
          <p data-reveal className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            Explore our most loved fragrance categories and dive into expert insights, reviews
            and exclusive stories.
          </p>
        </div>

        <div data-reveal className="lg:col-span-8">
          <CategoryCard
            category={featured}
            number={1}
            size="featured"
            label="Featured"
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="lg:h-[440px]"
          />
        </div>
      </div>
    </section>
  );
}
