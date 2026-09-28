import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/blog/newsletter-form";
import { getBlogCategory } from "@/data/blog";

export function NewsletterBanner() {
  const image = getBlogCategory("gift-ideas");

  return (
    <section aria-labelledby="newsletter-heading" className="py-16 lg:py-24">
      <div className="container-page">
        <div
          data-reveal
          className="grid overflow-hidden rounded-3xl bg-beige lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div className="relative min-h-[260px] lg:min-h-[420px]">
            <Image
              src={image.image}
              alt={image.name}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-beige/60 lg:to-beige/40" />
          </div>

          <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
            <p className="eyebrow !text-accent">Newsletter</p>
            <h2
              id="newsletter-heading"
              className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-5xl"
            >
              Stay in the Loop
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Be the first to know about new arrivals, exclusive offers, and behind-the-scenes
              stories.
            </p>

            <div className="mt-8 max-w-lg">
              <NewsletterForm />
            </div>

            <p className="mt-5 max-w-lg text-xs leading-relaxed text-ink-soft">
              By subscribing, you agree to our{" "}
              <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
                Privacy Policy
              </Link>
              . Unsubscribe anytime. Already a member?{" "}
              <Link href="/my-account" className="underline underline-offset-2 hover:text-ink">
                Log in to your account →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
