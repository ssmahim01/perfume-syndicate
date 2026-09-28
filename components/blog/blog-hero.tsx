import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Search } from "lucide-react";
import { getBlogCategory } from "@/data/blog";

export function BlogHero() {
  const decants = getBlogCategory("perfume-decants");
  const womens = getBlogCategory("womens-perfumes");
  const mens = getBlogCategory("mens-perfumes");

  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_20%,hsl(var(--burgundy)/0.55),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_10%_100%,hsl(var(--gold)/0.14),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>

      <div className="container-page relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-24">
        <div>
          <p data-hero className="eyebrow !text-gold">
            Our Fragrance Stories
          </p>
          <h1
            data-hero
            className="mt-5 font-display text-[46px] leading-[1.02] sm:text-6xl lg:text-[76px]"
          >
            The
            <br />
            Perfume <em className="font-medium italic text-gold">Blog</em>
          </h1>
          <p data-hero className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/70">
            Discover stories, tips, reviews and everything about the world of luxury
            fragrances.
          </p>

          <form
            data-hero
            role="search"
            action="/search"
            className="mt-9 flex max-w-md items-center gap-2 rounded-full border border-ivory/20 bg-ivory/5 p-1.5 pl-5 backdrop-blur transition-colors focus-within:border-gold/70"
          >
            <Search size={16} strokeWidth={1.5} className="shrink-0 text-ivory/60" aria-hidden />
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              name="q"
              type="search"
              placeholder="Search articles, tips, reviews..."
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-ivory outline-none placeholder:text-ivory/50"
            />
            <button
              type="submit"
              aria-label="Search"
              className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-charcoal transition-colors hover:bg-champagne"
            >
              <ArrowRight size={16} strokeWidth={1.75} />
            </button>
          </form>

          <div data-hero className="mt-8">
            <Link
              href="#categories"
              className="focus-ring inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-sm uppercase tracking-wide2 text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              Explore Stories
              <ArrowDown size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-xl sm:h-[520px] lg:h-[560px] lg:max-w-none">
          <div
            data-parallax="-24"
            data-parallax-origin="top"
            className="absolute left-[4%] top-[6%] h-[84%] w-[54%]"
          >
            <div
              data-hero-mask
              className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-2xl border border-gold/30"
            >
              <div data-mask-inner className="absolute inset-0">
                <Image
                  src={decants.image}
                  alt={decants.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div
            data-parallax="18"
            data-parallax-origin="top"
            className="absolute right-0 top-0 aspect-[3/4] w-[38%]"
          >
            <div data-hero-mask className="relative h-full w-full overflow-hidden rounded-2xl">
              <div data-mask-inner className="absolute inset-0">
                <Image
                  src={womens.image}
                  alt={womens.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 20vw, 38vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div
            data-parallax="-14"
            data-parallax-origin="top"
            className="absolute bottom-[4%] right-[6%] z-10 aspect-[4/3] w-[42%]"
          >
            <div
              data-hero-mask
              className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-gold/50 shadow-2xl"
            >
              <div data-mask-inner className="absolute inset-0">
                <Image
                  src={mens.image}
                  alt={mens.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="absolute -bottom-2 left-0 z-20 hidden h-28 w-28 items-center justify-center sm:flex"
          >
            <svg
              viewBox="0 0 120 120"
              className="absolute inset-0 h-full w-full animate-spin"
              style={{ animationDuration: "24s" }}
            >
              <defs>
                <path id="blog-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text className="fill-ivory" fontSize="9" letterSpacing="3.1">
                <textPath href="#blog-ring">EXPLORE • FRAGRANCE • STORIES •&nbsp;</textPath>
              </text>
            </svg>
            <ArrowDown size={18} strokeWidth={1.5} className="text-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
