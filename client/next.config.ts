import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hsapf.org.tw",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};
export default nextConfig;
