import { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/settings/personal",
        permanent: true,
      },
      {
        source: "/interview/:id",
        destination: "/interview/:id/info",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
