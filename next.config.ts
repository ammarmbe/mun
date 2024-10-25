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
      {
        source: "/interviews",
        destination: "/interviews/all",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
