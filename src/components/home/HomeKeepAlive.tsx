"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useHomeStore } from "@/lib/home-store";
import { HomeScreen } from "@/components/home/HomeScreen";

/**
 * Keeps the home tree mounted after the first visit.
 * Hidden on other routes; shown instantly when returning to `/`.
 */
export function HomeKeepAlive() {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";
  const above = useHomeStore((s) => s.above);
  const below = useHomeStore((s) => s.below);
  const meta = useHomeStore((s) => s.meta);
  const pinned = useHomeStore((s) => s.pinned);
  const pin = useHomeStore((s) => s.pin);

  useEffect(() => {
    if (isHome && above && below) pin();
  }, [isHome, above, below, pin]);

  if (!pinned || !above || !below) return null;

  return (
    <div
      id="home-keepalive"
      className={isHome ? "block" : "hidden"}
      aria-hidden={!isHome}
    >
      <HomeScreen initialAbove={above} initialBelow={below} initialMeta={meta} />
    </div>
  );
}
