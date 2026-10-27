import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("contact");
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
