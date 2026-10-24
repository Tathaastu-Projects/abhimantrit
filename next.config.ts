import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

function hostFrom(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

function protocolFrom(url: string): "http" | "https" {
  try {
    return new URL(url).protocol === "https:" ? "https" : "http";
  } catch {
    return "http";
  }
}

const hostname = apiUrl ? hostFrom(apiUrl) : "";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
  { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
  { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
];

if (hostname) {
  remotePatterns.push({
    protocol: protocolFrom(apiUrl!),
    hostname,
    pathname: "/**",
  });
}

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns,
  },
  // Serve backend media from the storefront origin so logo/images work on
  // localhost and LAN IPs (avoids broken localhost:3024 img URLs in the browser).
  async rewrites() {
    if (!apiUrl) return [];
    const base = apiUrl.replace(/\/$/, "");
    return [
      {
        source: "/uploads/:path*",
        destination: `${base}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
