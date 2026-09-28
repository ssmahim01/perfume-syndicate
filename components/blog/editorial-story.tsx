import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getBlogCategory } from "@/data/blog";

const storyLinks = ["perfume-guides", "perfume-reviews", "fragrance-tips"] as const;

export function EditorialStory() {
  const main = getBlogCategory("perfume-guides");
  const accent = getBlogCategory("fragrance-tips");

  return (
    <section className="relative overflow-hidden bg-beige/60 py-20 lg:py-28">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative pb-10">
          <div
            data-mask
            className="relative aspect-[4/5] w-[88%] overflow-hidden rounded-t-[999px] rounded-b-2xl"
          >
            <div data-mask-inner className="absolute inset-0">
              <div data-parallax="28" className="absolute inset-x-0 -top-[10%] h-[120%]">
                <Image
                  src={main.image}
                  alt={main.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div data-reveal className="absolute bottom-0 right-0 w-[44%]">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-ivory shadow-xl">
              <Image
                src={accent.image}
                alt={accent.name}
                fill
                sizes="(min-width: 1024px) 18vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <p data-reveal className="eyebrow !text-accent">
            The Journal
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
          >
            The Art of <em className="font-medium italic text-burgundy">Fragrance</em>
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Every fragrance tells a story — of rare notes, of memory, of the moment you wear
            it. Our journal gathers guides, reviews, comparisons and tips so you can choose with
            confidence, whether you are sampling decants, exploring Arabic perfumes or
            discovering luxury and niche houses.
          </p>

          <div data-reveal className="mt-9">
            <Link href="#categories" className="btn-primary focus-ring">
              Explore Stories
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>

          <ul data-reveal className="mt-12 divide-y divide-border border-y border-border">
            {storyLinks.map((id) => {
              const link = getBlogCategory(id);
              return (
                <li key={id}>
                  <Link
                    href={link.href}
                    className="group focus-ring flex items-center justify-between py-4 font-display text-lg text-ink transition-colors hover:text-burgundy"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="text-ink-soft transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-burgundy"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
