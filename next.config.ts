import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    domains: ['www.gravatar.com'],
  },
  experimental: {
    authInterrupts: true,
  }
}

export default config;
