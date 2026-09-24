"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "@/lib/api";
import { getGuestId, useAuthStore } from "@/lib/auth-store";
import { formatINR, resolveImageUrl } from "@/lib/format";
import type { WishlistItem } from "@/types/product";

function productIdOf(item: WishlistItem) {
  if (typeof item.productId === "string") return item.productId;
  return item.productId?._id || "";
}

export default function WishlistPage() {
  const token = useAuthStore((s) => s.token);
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await getWishlist({ token, guestId: getGuestId() });
      setItems(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load wishlist");
    }
  }

  useEffect(() => {
    setMounted(true);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!mounted) {
    return (
      <div className="container-pad py-16">
        <div className="skeleton h-40" />
      </div>
    );
  }

  return (
    <div className="container-pad py-12">
      <h1 className="font-display text-4xl">Wishlist</h1>
      <p className="mt-2 text-ink-soft">Saved pieces across devices when you’re signed in.</p>
      {error ? <p className="mt-4 text-sm text-sale">{error}</p> : null}

      {!items.length ? (
        <div className="mt-10 rounded-3xl border border-[var(--border)] bg-white/50 px-6 py-14 text-center">
          <p className="font-display text-2xl">Your wishlist is empty</p>
          <Link href="/shop" className="btn btn-primary mt-6">
            Browse products
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const id = productIdOf(item);
            return (
              <li
                key={item._id || id}
                className="overflow-hidden rounded-3xl border border-[var(--border)] bg-white/45"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveImageUrl(item.image)}
                  alt={item.title || "Wishlist item"}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="p-4">
                  <Link
                    href={`/product/${item.productSlug}`}
                    className="font-medium hover:text-temple"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-sm font-semibold">{formatINR(item.salePrice || 0)}</p>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/product/${item.productSlug}`} className="btn btn-primary text-sm">
                      View
                    </Link>
                    <button
                      type="button"
                      className="btn btn-ghost text-sm"
                      onClick={async () => {
                        await removeFromWishlist(id, { token, guestId: getGuestId() });
                        await load();
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
