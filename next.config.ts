import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/settings",
        destination: "/settings/personal",
      },
    ];
  },
};

export default nextConfig;
