import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    domains: ['www.gravatar.com'],
  },
  experimental: {
    authInterrupts: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default config;
