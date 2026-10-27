import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("cart");
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
