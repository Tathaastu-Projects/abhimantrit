import type { Metadata } from "next";
import { getStoreMeta } from "@/lib/api";
import type { PageSeo } from "@/types/product";

const FALLBACK: Record<string, PageSeo> = {
  home: {
    metaTitle: "Abhimantrit by Tathasstu | Energised Rudraksha & Gemstones.",
    metaDescription:
      "Shop Energised Gemstones & Rudraksha by Abhimantrit by Tathasstu. Explore X-ray and lab certified crystal bracelets, crystal anklets, tumbles, crrystal trees and more. Shop now.",
  },
  shop: {
    metaTitle: "Shop | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Rudraksha, gemstones, crystal bracelets, anklets, tumbles, trees and more — X-ray & lab certified.",
  },
  about: {
    metaTitle: "About Us | Abhimantrit by Tathasstu",
    metaDescription:
      "About Abhimantrit by Tathasstu — energised crystals and Rudraksha curated by Dr. Priyanka Singh.",
  },
  blog: {
    metaTitle: "Blog | Abhimantrit by Tathasstu",
    metaDescription: "Guides, rituals and stories on Rudraksha, gemstones and spiritual jewellery.",
  },
  contact: {
    metaTitle: "Contact | Abhimantrit by Tathasstu",
    metaDescription: "Contact Abhimantrit by Tathasstu for product guidance and support.",
  },
  cart: {
    metaTitle: "Cart | Abhimantrit by Tathasstu",
    metaDescription: "Your Abhimantrit shopping cart.",
  },
  account: {
    metaTitle: "Account | Abhimantrit by Tathasstu",
    metaDescription: "Sign in to your Abhimantrit account.",
  },
  shipping: {
    metaTitle: "Shipping Policy | Abhimantrit by Tathasstu",
    metaDescription: "Order processing, delivery timelines, and shipping for Abhimantrit.",
  },
  refund: {
    metaTitle: "Refund Policy | Abhimantrit by Tathasstu",
    metaDescription: "Cancellations, returns, replacements, and refunds for Abhimantrit.",
  },
  privacy: {
    metaTitle: "Privacy Policy | Abhimantrit by Tathasstu",
    metaDescription: "How Abhimantrit collects, uses, and protects your personal information.",
  },
  terms: {
    metaTitle: "Terms of Use | Abhimantrit by Tathasstu",
    metaDescription: "Terms of use and sale for Abhimantrit by Tathasstu.",
  },
  "crystal-bracelets": {
    metaTitle: "Crystal Bracelets | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Crystal Bracelets from Abhimantrit by Tathasstu — X-ray & lab certified. Explore our crystal bracelets collection and shop now.",
  },
  rudraksha: {
    metaTitle: "Rudraksha | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Rudraksha from Abhimantrit by Tathasstu — X-ray & lab certified. Explore our rudraksha collection and shop now.",
  },
  "crystal-anklets": {
    metaTitle: "Crystal Anklets | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Crystal Anklets from Abhimantrit by Tathasstu — X-ray & lab certified. Explore our crystal anklets collection and shop now.",
  },
  tumbles: {
    metaTitle: "Tumbles | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Tumbles from Abhimantrit by Tathasstu — X-ray & lab certified. Explore our tumbles collection and shop now.",
  },
  "crystal-trees": {
    metaTitle: "Crystal Trees | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Crystal Trees from Abhimantrit by Tathasstu — X-ray & lab certified. Explore our crystal trees collection and shop now.",
  },
  pyramids: {
    metaTitle: "Pyramids | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Pyramids from Abhimantrit by Tathasstu — X-ray & lab certified. Explore our pyramids collection and shop now.",
  },
  "loose-stones": {
    metaTitle: "Loose Stones | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Loose Stones from Abhimantrit by Tathasstu — X-ray & lab certified. Explore our loose stones collection and shop now.",
  },
  mala: {
    metaTitle: "Mala | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Mala from Abhimantrit by Tathasstu — X-ray & lab certified. Explore our mala collection and shop now.",
  },
  "photo-frames": {
    metaTitle: "Photo Frames | Abhimantrit by Tathasstu",
    metaDescription:
      "Shop energised Photo Frames from Abhimantrit by Tathasstu — X-ray & lab certified. Explore our photo frames collection and shop now.",
  },
};

export async function getPageSeo(pageKey: string): Promise<PageSeo> {
  const fallback = FALLBACK[pageKey] || FALLBACK.home;
  try {
    const meta = await getStoreMeta({ fresh: true });
    const fromApi = meta?.seo?.[pageKey];
    return {
      metaTitle: fromApi?.metaTitle?.trim() || fallback.metaTitle,
      metaDescription: fromApi?.metaDescription?.trim() || fallback.metaDescription,
    };
  } catch {
    return fallback;
  }
}

export async function buildPageMetadata(pageKey: string): Promise<Metadata> {
  const seo = await getPageSeo(pageKey);
  const title = seo.metaTitle || FALLBACK.home.metaTitle!;
  const description = seo.metaDescription || FALLBACK.home.metaDescription!;
  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      siteName: "Abhimantrit by Tathasstu",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
