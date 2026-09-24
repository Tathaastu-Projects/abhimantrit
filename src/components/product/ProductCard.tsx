"use client";

import Link from "next/link";
import { useState } from "react";
import type { StoreProduct } from "@/types/product";
import { primaryImage } from "@/lib/format";
import { PriceBlock } from "@/components/product/PriceBlock";
import { useCartStore } from "@/lib/cart-store";

function StarRow({ avg, count }: { avg?: number; count?: number }) {
  const rating = Math.max(0, Math.min(5, Number(avg || 0)));
  const filled = count && count > 0 ? Math.round(rating) : 5;
  return (
    <p className="stars" aria-label={count ? `${rating} out of 5` : "Product rating"}>
      {"★".repeat(filled)}
      {"☆".repeat(5 - filled)}
    </p>
  );
}

export function ProductCard({ product }: { product: StoreProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const img = primaryImage(product.images);
  const [imgSrc, setImgSrc] = useState(img.url);
  const sale = product.effectiveSalePrice ?? product.salePrice;
  const mrp = product.effectiveMrp ?? product.mrp;
  const discount = product.effectiveDiscountPercent ?? product.discountPercent;
  const stock = product.effectiveStock ?? product.totalStock ?? product.quantity;
  const activeVariants = (product.variants || []).filter((v) => v.isActive);
  const needsVariant = activeVariants.length > 0;

  function quickAdd() {
    if (needsVariant) return;
    addItem({
      productId: product._id,
      slug: product.slug,
      title: product.title,
      image: img.url,
      unitSalePrice: sale,
      unitMrp: mrp,
      maxQty: stock,
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="product-card">
      <Link href={`/product/${product.slug}`} className="product-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={img.alt || product.title}
          className="product-card__img"
          onError={() => setImgSrc("/placeholder-product.svg")}
        />
        <div className="product-card__badges">
          {product.isBestSeller ? <span className="product-card__badge product-card__badge--dark">Best seller</span> : null}
          {!product.isBestSeller && product.isFeatured ? (
            <span className="product-card__badge product-card__badge--dark">Featured</span>
          ) : null}
          {!product.isBestSeller && !product.isFeatured && product.isNewArrival ? (
            <span className="product-card__badge product-card__badge--dark">New</span>
          ) : null}
          {discount && discount > 0 ? (
            <span className="product-card__badge product-card__badge--sale">-{discount}%</span>
          ) : null}
        </div>
      </Link>

      <div className="product-card__body">
        <Link href={`/product/${product.slug}`} className="product-card__title">
          {product.title}
        </Link>
        <div className="product-card__meta">
          <StarRow avg={product.ratingAvg} count={product.ratingCount} />
          <PriceBlock mrp={mrp} salePrice={sale} discount={discount} size="sm" />
        </div>
        <div className="product-card__cta">
          {needsVariant ? (
            <Link href={`/product/${product.slug}`} className="btn btn-primary w-full">
              Add to cart
            </Link>
          ) : stock <= 0 ? (
            <button type="button" disabled className="btn w-full cursor-not-allowed bg-stone-200 text-ink-soft">
              Out of stock
            </button>
          ) : (
            <button type="button" onClick={quickAdd} className="btn btn-primary w-full">
              {added ? "Added" : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
