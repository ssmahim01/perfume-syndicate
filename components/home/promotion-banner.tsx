import Image from "next/image";
import Link from "next/link";

export function PromotionBanner() {
  return (
    <section className="relative overflow-hidden bg-charcoal text-ivory">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1800&auto=format&fit=crop"
          alt="Amber perfume bottle staged among dried branches for the Summer Scent Collection"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/60 to-transparent" />
      </div>

      <div className="container-page relative py-24 lg:py-32">
        <div className="max-w-md">
          <p className="eyebrow mb-4 text-ivory/60">Limited Time Offer</p>
          <h2 className="font-display text-[36px] sm:text-[44px] leading-[1.1]">
            The Summer
            <br />
            Scent Collection
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ivory/70">
            Enjoy up to 30% off selected fragrances. Elevate your everyday with
            timeless scents.
          </p>
          <Link href="/shop" className="btn-primary focus-ring mt-8 bg-ivory text-charcoal hover:bg-champagne">
            Shop Now
          </Link>
        </div>

        <div className="absolute right-6 top-8 sm:right-12 sm:top-12 flex h-20 w-20 sm:h-24 sm:w-24 flex-col items-center justify-center rounded-full border border-ivory/25 text-center">
          <span className="text-[10px] tracking-wide2 text-ivory/60">UP TO</span>
          <span className="font-display text-xl sm:text-2xl">30%</span>
          <span className="text-[10px] tracking-wide2 text-ivory/60">OFF</span>
        </div>
      </div>
    </section>
  );
}
