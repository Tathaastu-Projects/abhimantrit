import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/api";
import { ProductDetail } from "@/components/product/ProductDetail";
import { productUrlKey } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.seo?.metaTitle || product.title,
    description:
      product.seo?.metaDescription ||
      product.shortDescription ||
      `Shop ${product.title} at Abhimantrit`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const canonical = productUrlKey(product);
  const current = decodeURIComponent(String(slug || "")).trim().toLowerCase();

  // /product/new → /product/ne245hk when SKU is set
  if (canonical && current && current !== canonical.toLowerCase()) {
    permanentRedirect(`/product/${canonical}`);
  }

  const related = await getRelatedProducts(canonical || slug, 8);
  return <ProductDetail product={product} related={related} />;
}
