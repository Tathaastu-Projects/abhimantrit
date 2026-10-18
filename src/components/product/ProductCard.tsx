"use client";

import Link from "next/link";
import { useState } from "react";
import type { StoreProduct } from "@/types/product";
import { primaryImage } from "@/lib/format";
import { PriceBlock } from "@/components/product/PriceBlock";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/cn";

function DetailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8.5v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="15.8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function StarRow({ avg, count }: { avg?: number; count?: number }) {
  const rating = Math.max(0, Math.min(5, Number(avg || 0)));
  const filled = count && count > 0 ? Math.round(rating) : 5;
  const empty = 5 - filled;
  const showScore = count && count > 0;

  return (
    <p className="stars" aria-label={showScore ? `${rating} out of 5` : "Product rating"}>
      <span>{"★".repeat(filled)}</span>
      {empty > 0 ? <span className="stars__empty">{"★".repeat(empty)}</span> : null}
      {showScore ? (
        <span className="stars__score">
          {rating.toFixed(1)}
          {count ? ` · ${count}` : ""}
        </span>
      ) : null}
    </p>
  );
}

export function ProductCard({
  product,
  tone = "default",
}: {
  product: StoreProduct;
  tone?: "default" | "premium";
}) {
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

  const cta = needsVariant ? (
    <Link href={`/product/${product.slug}`} className={cn("btn w-full", tone === "premium" ? "btn-premium" : "btn-primary")}>
      View details
    </Link>
  ) : stock <= 0 ? (
    <button type="button" disabled className="btn w-full cursor-not-allowed bg-stone-200 text-ink-soft">
      Out of stock
    </button>
  ) : (
    <button
      type="button"
      onClick={quickAdd}
      className={cn("btn w-full", tone === "premium" ? "btn-premium" : "btn-primary")}
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );

  const details = (product.hoverDetails || []).map((item) => item.label).filter(Boolean).slice(0, 6);
  const bagLabel = added ? "Added" : stock <= 0 ? "Out of stock" : "Add to bag";

  return (
    <article className={cn("product-card", tone === "premium" && "product-card--premium")}>
      <div className="product-card__media">
        <Link href={`/product/${product.slug}`} className="absolute inset-0 z-[1]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={img.alt || product.title}
            className="product-card__img"
            onError={() => setImgSrc("/placeholder-product.svg")}
          />
        </Link>
        <div className="product-card__badges">
          {product.isBestSeller ? (
            <span className="product-card__badge product-card__badge--dark">Best seller</span>
          ) : null}
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
        {details.length ? (
          <aside className="product-card__details" aria-hidden>
            {details.map((label) => (
              <p key={label} className="product-card__detail">
                <span className="product-card__detail-icon" aria-hidden>
                  <DetailIcon />
                </span>
                {label}
              </p>
            ))}
          </aside>
        ) : null}
        {needsVariant ? (
          <Link href={`/product/${product.slug}`} className="product-card__bag" style={{ color: "#ffffff" }}>
            Add to bag
          </Link>
        ) : (
          <button
            type="button"
            className="product-card__bag"
            style={{ color: "#ffffff" }}
            onClick={quickAdd}
            disabled={stock <= 0}
          >
            {bagLabel}
          </button>
        )}
      </div>

      <div className="product-card__body">
        <Link href={`/product/${product.slug}`} className="product-card__title">
          {product.title}
        </Link>
        <div className="product-card__meta">
          <StarRow avg={product.ratingAvg} count={product.ratingCount} />
          <PriceBlock mrp={mrp} salePrice={sale} discount={discount} size="sm" />
        </div>
        <div className="product-card__cta">{cta}</div>
      </div>
    </article>
  );
}
