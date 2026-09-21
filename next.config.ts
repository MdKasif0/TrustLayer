import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/documentation",
        destination: "/docs",
      },
    ];
  },
};

export default nextConfig;
