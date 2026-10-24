"use client";

import { useEffect, useRef } from "react";
import { syncCart } from "@/lib/api";
import { getGuestId, useAuthStore } from "@/lib/auth-store";
import { useCartStore } from "@/lib/cart-store";

/**
 * Keeps the browser cart mirrored on the backend so admin can see
 * what registered / guest shoppers currently have in their bag.
 */
export function CartSync() {
  const items = useCartStore((s) => s.items);
  const token = useAuthStore((s) => s.token);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ready = useRef(false);

  useEffect(() => {
    // Skip the first hydrate tick from zustand persist
    const boot = window.setTimeout(() => {
      ready.current = true;
    }, 400);
    return () => window.clearTimeout(boot);
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      const guestId = getGuestId();
      if (!token && !guestId) return;
      void syncCart(items, { token, guestId }).catch(() => {
        /* network blips are fine — next cart change retries */
      });
    }, 500);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [items, token]);

  return null;
}
