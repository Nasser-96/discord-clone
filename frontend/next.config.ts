import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    domains: ["localhost"], // Add specific domains if needed
  },
};

export default nextConfig;
