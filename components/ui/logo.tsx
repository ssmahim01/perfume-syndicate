import Image from "next/image";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${className ?? ""}`}
      aria-label="Perfume Syndicate — home"
    >
      <Image
        src="/images/logo.webp"
        alt=""
        width={40}
        height={40}
        priority
        className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
      />
      <span className="font-display text-lg sm:text-xl tracking-[0.15em] uppercase text-ink leading-none">
        Perfume
        <span className="block text-[9px] tracking-[0.4em] text-ink-soft font-sans font-medium mt-1">
          Syndicate
        </span>
      </span>
    </Link>
  );
}
