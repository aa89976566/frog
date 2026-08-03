import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare quick-tunnel hosts during local preview
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
