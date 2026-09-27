import { HeroSlide } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "signature",
    eyebrow: "A Signature of You",
    headline: "Fragrance For",
    headlineAccent: "Every",
    headlineTail: "Occasion",
    description:
      "Discover a world of exquisite fragrances crafted with rare ingredients, made to leave a lasting impression.",
    primaryCta: { label: "Shop Collection", href: "/shop" },
    secondaryCta: { label: "Watch Story", href: "/about" },
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Perfume Syndicate signature bottle resting among dried botanicals",
  },
  {
    id: "noir",
    eyebrow: "The Syndicate Edit",
    headline: "Depth Found",
    headlineAccent: "After",
    headlineTail: "Dark",
    description:
      "Smoked amber, black orchid and aged oud — a collection built for the hours after sunset.",
    primaryCta: { label: "Shop Noir", href: "/shop/niche" },
    secondaryCta: { label: "Explore Notes", href: "/about" },
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Dark amber perfume bottle on a stone surface",
  },
  {
    id: "bloom",
    eyebrow: "New Arrival",
    headline: "A Garden In",
    headlineAccent: "Full",
    headlineTail: "Bloom",
    description:
      "Jasmine, peony and white musk layered into a fragrance that carries spring with it year-round.",
    primaryCta: { label: "Discover Bloom", href: "/shop/women" },
    secondaryCta: { label: "Read the Story", href: "/journal" },
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Floral perfume bottle surrounded by fresh white blooms",
  },
];
