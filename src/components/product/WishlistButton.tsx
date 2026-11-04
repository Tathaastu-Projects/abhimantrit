"use client";

import { useEffect, useState } from "react";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/api";
import { getGuestId, useAuthStore } from "@/lib/auth-store";
import { cn } from "@/lib/cn";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "#e11d48" : "none"}
      stroke={filled ? "#e11d48" : "currentColor"}
      strokeWidth="1.8"
      aria-hidden
    >
      <path
        d="M12 20s-7-4.5-7-10a4.2 4.2 0 0 1 7-3 4.2 4.2 0 0 1 7 3c0 5.5-7 10-7 10z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WishlistButton({ productId }: { productId: string }) {
  const token = useAuthStore((s) => s.token);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const guestId = getGuestId();
        const items = await getWishlist({ token, guestId });
        if (cancelled) return;
        const ids = items.map((i) => {
          if (typeof i.productId === "string") return i.productId;
          if (i.productId && typeof i.productId === "object" && "_id" in i.productId) {
            return String((i.productId as { _id: string })._id);
          }
          return String(i.product?._id || "");
        });
        setSaved(ids.includes(productId));
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [productId, token]);

  async function toggle() {
    if (busy) return;
    const next = !saved;
    // Instant red / un-red on click
    setSaved(next);
    setBusy(true);
    const auth = { token, guestId: getGuestId() };
    try {
      if (next) {
        await addToWishlist(productId, auth);
      } else {
        await removeFromWishlist(productId, auth);
      }
    } catch {
      // Revert if API fails
      setSaved(!next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={toggle}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white transition disabled:opacity-60",
        saved
          ? "border-[#e11d48]/50 bg-[#fff1f2]"
          : "border-[var(--border)] text-ink hover:border-forest/30 hover:text-forest",
      )}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      title={saved ? "Wishlisted" : "Add to wishlist"}
    >
      <HeartIcon filled={saved} />
    </button>
  );
}
