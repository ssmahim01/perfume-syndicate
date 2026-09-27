import Image from "next/image";
import { instagramPosts } from "@/data/instagram";

export function InstagramGallery() {
  return (
    <section className="pb-16 lg:pb-20">
      <div className="container-page">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-[32px] sm:text-[38px] leading-tight text-ink">
            Follow Us on Instagram
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="focus-ring hidden sm:block text-sm text-ink-soft hover:text-ink"
          >
            @perfumesyndicate
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="focus-ring group relative block aspect-square overflow-hidden"
              aria-label="View post on Instagram"
            >
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(min-width: 640px) 16vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
