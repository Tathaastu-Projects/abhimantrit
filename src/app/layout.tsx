import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CartSync } from "@/components/cart/CartSync";
import { getStoreMenu, getStoreMeta } from "@/lib/api";
import { resolveBannerUrl } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo";

/** Default = Home SEO from Admin (meta title + description). */
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [meta, menu] = await Promise.all([getStoreMeta({ fresh: true }), getStoreMenu()]);

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Playfair+Display:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        {/* No site favicon — blank so browsers do not show the default Next/Vercel icon */}
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <SiteHeader
          menu={menu}
          logoSrc={resolveBannerUrl(meta?.logoUrl) || ""}
          headerBar={meta?.headerBar}
        />
        <CartSync />
        <main className="flex-1">{children}</main>
        <SiteFooter support={meta?.support} />
      </body>
    </html>
  );
}
