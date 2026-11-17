"use client";

import { useEffect, useRef, useState } from "react";

/** True once the element is near the viewport (stays true after first entry). */
export function useNearViewport<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (near) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          watcher.disconnect();
        }
      },
      { rootMargin },
    );
    watcher.observe(node);
    return () => watcher.disconnect();
  }, [near, rootMargin]);

  return { ref, near };
}
