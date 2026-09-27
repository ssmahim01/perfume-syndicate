import Image from "next/image";
import Link from "next/link";

export function Logo({ className, compact }: { className?: string, compact?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${className ?? compact ?? ""}`}
      aria-label="Perfume Syndicate — home"
    >
      <Image
        src="/images/logo.webp"
        alt="Perfume Syndicate"
        width={500}
        height={500}
        priority
        className="h-14 w-full object-cover"
      />
     
    </Link>
  );
}
