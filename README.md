# Perfume Syndicate — Homepage

A premium, editorial homepage for a luxury fragrance e-commerce brand, built with Next.js App Router, TypeScript, Tailwind CSS, Embla Carousel and GSAP.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`, `providers.tsx`)
- `components/layout/` — announcement bar, navbar, mobile nav, footer
- `components/home/` — every homepage section (hero, scent match, category showcase, product carousel, promo banner, benefits strip, brand story, testimonials, journal, Instagram gallery)
- `components/product/` — product card, rating, price, add-to-cart
- `components/cart/` — cart drawer
- `components/ui/` — shared primitives (logo)
- `data/` — typed mock content (swap for API calls later)
- `types/` — shared TypeScript interfaces
- `lib/` — `cn` helper and cart context (client state, ready to wire to a backend cart later)

## Notes

- Product, category and Instagram imagery use Unsplash placeholder URLs — replace with real product photography before shipping (`next.config.mjs` is set up for `images.unsplash.com`; add your own CDN domain when you swap images).
- Dark mode uses `class` strategy: toggle by adding/removing `dark` on `<html>`. A theme toggle UI isn't wired up yet — the design tokens in `app/globals.css` are ready for one.
- Cart state is local (`lib/cart-context.tsx`) and structured so it can be swapped for a backend-backed cart without touching component code.
- `prefers-reduced-motion` is respected in `globals.css` and in the brand marquee.
