import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Allow Cloudflare quick-tunnel hosts during local preview
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
