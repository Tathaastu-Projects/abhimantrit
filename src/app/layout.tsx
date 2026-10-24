import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CartSync } from "@/components/cart/CartSync";
import { getStoreMenu, getStoreMeta } from "@/lib/api";
import { resolveBannerUrl } from "@/lib/format";

export const metadata: Metadata = {
  title: {
    default: "Tathaastu | Sacred Rudraksha, Gemstones & Spiritual Jewellery",
    template: "%s · Tathaastu",
  },
  description:
    "Shop lab-certified Rudraksha, gemstones, crystals, yantras and spiritual jewellery — curated and energized with care.",
  // No site favicon — blank so browsers do not show the default Next/Vercel icon
  icons: {
    icon: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" }],
    shortcut: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" }],
    apple: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [meta, menu] = await Promise.all([getStoreMeta(), getStoreMenu()]);

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Playfair+Display:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <SiteHeader menu={menu} logoSrc={resolveBannerUrl(meta?.logoUrl) || ""} />
        <CartSync />
        <main className="flex-1">{children}</main>
        <SiteFooter support={meta?.support} />
      </body>
    </html>
  );
}
