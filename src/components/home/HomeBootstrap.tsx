"use client";

import { useEffect } from "react";
import type { HomeContent, StoreMeta } from "@/types/product";
import { useHomeStore } from "@/lib/home-store";
import { HomeScreen } from "@/components/home/HomeScreen";

type Props = {
  initialAbove: HomeContent;
  initialBelow: HomeContent;
  initialMeta: StoreMeta | null;
};

/**
 * First home visit: hydrate the session cache + render home.
 * After keep-alive pins home, layout hides this tree while away and
 * shows the pinned copy — coming back is instant (no full reload).
 */
export function HomeBootstrap({ initialAbove, initialBelow, initialMeta }: Props) {
  const hydrate = useHomeStore((s) => s.hydrate);
  const pinned = useHomeStore((s) => s.pinned);

  useEffect(() => {
    hydrate(initialAbove, initialBelow, initialMeta);
  }, [hydrate, initialAbove, initialBelow, initialMeta]);

  // Keep-alive in layout already showing home — avoid duplicate DOM
  if (pinned) return null;

  return (
    <HomeScreen
      initialAbove={initialAbove}
      initialBelow={initialBelow}
      initialMeta={initialMeta}
    />
  );
}
