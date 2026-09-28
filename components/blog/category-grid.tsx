import { CategoryCard } from "@/components/blog/category-card";
import type { BlogCategory } from "@/types/blog";

/** Column spans (12-col grid, large screens) that give the grid its editorial rhythm. */
const SPANS: readonly string[] = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "sm:col-span-2 lg:col-span-3",
];

export function CategoryGrid({
  categories,
  startNumber = 2,
}: {
  categories: readonly BlogCategory[];
  startNumber?: number;
}) {
  return (
    <section aria-labelledby="all-categories" className="pb-20 lg:pb-28">
      <div className="container-page">
        <h2
          id="all-categories"
          data-reveal
          className="mb-8 font-display text-3xl text-ink sm:text-4xl lg:mb-10"
        >
          Browse Every Story
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[340px] lg:grid-cols-12 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              data-reveal
              className={SPANS[index] ?? "lg:col-span-4"}
            >
              <CategoryCard
                category={category}
                number={startNumber + index}
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
