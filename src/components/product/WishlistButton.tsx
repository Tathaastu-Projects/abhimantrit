"use client";

import { useEffect, useState } from "react";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/api";
import { getGuestId, useAuthStore } from "@/lib/auth-store";

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
    setBusy(true);
    const auth = { token, guestId: getGuestId() };
    try {
      if (saved) {
        await removeFromWishlist(productId, auth);
        setSaved(false);
      } else {
        await addToWishlist(productId, auth);
        setSaved(true);
      }
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={toggle}
      className="btn btn-ghost disabled:opacity-60"
      aria-pressed={saved}
    >
      {saved ? "Saved ♥" : "Wishlist"}
    </button>
  );
}
