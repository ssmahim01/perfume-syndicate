/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "perfumesyndicatebd.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
