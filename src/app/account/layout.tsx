import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("account");
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
