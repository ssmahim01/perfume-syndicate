import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { footerShopLinks, footerCompanyLinks, footerCareLinks } from "@/data/navigation";

const socials = [
  { id: "instagram", icon: Instagram, href: "https://instagram.com" },
  { id: "facebook", icon: Facebook, href: "https://facebook.com" },
  { id: "twitter", icon: Twitter, href: "https://twitter.com" },
  { id: "youtube", icon: Youtube, href: "https://youtube.com" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-ink mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="focus-ring text-sm text-ink-soft hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-page py-16 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-6">
        <div className="col-span-2 lg:col-span-2 pr-4">
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/images/logo.webp"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
            <span className="font-display text-lg tracking-[0.15em] uppercase leading-none">
              Perfume
              <span className="block text-[9px] tracking-[0.4em] text-ivory/50 font-sans font-medium mt-1">
                Syndicate
              </span>
            </span>
          </div>
          <p className="text-sm text-ivory/60 leading-relaxed max-w-xs">
            Timeless fragrances for every occasion. Crafted with rare ingredients,
            made to be remembered.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map(({ id, icon: Icon, href }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={id}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 hover:border-ivory/40 hover:text-ivory transition-colors"
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="[&_h3]:text-ivory [&_a]:text-ivory/60 [&_a:hover]:text-ivory">
          <FooterColumn title="Shop" links={footerShopLinks} />
        </div>
        <div className="[&_h3]:text-ivory [&_a]:text-ivory/60 [&_a:hover]:text-ivory">
          <FooterColumn title="Company" links={footerCompanyLinks} />
        </div>
        <div className="[&_h3]:text-ivory [&_a]:text-ivory/60 [&_a:hover]:text-ivory">
          <FooterColumn title="Customer Care" links={footerCareLinks} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-sm font-medium text-ivory mb-5">Subscribe</h3>
          <p className="text-sm text-ivory/60 mb-4">
            Get exclusive offers, new arrivals and fragrance inspiration.
          </p>
          <form className="flex border-b border-ivory/25 focus-within:border-ivory">
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="focus-ring w-full bg-transparent py-2 text-sm placeholder:text-ivory/40 outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="focus-ring px-2 text-sm text-ivory/80 hover:text-ivory"
            >
              &rarr;
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-page py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-ivory/45">
          <p>&copy; {new Date().getFullYear()} Perfume Syndicate. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map((method) => (
              <span
                key={method}
                className="rounded border border-ivory/15 px-2 py-1 text-[10px] tracking-wide"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
