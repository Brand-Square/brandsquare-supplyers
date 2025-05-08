import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["api.brandsquare.store"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.brandsquare.store",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;