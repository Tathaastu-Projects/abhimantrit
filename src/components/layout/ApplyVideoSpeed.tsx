"use client";

import { useEffect } from "react";

function applyRate(root: ParentNode, rate: number) {
  root.querySelectorAll("video").forEach((node) => {
    const video = node as HTMLVideoElement;
    try {
      video.playbackRate = rate;
      video.defaultPlaybackRate = rate;
    } catch {
      /* ignore unsupported */
    }
  });
}

/** Applies admin-configured playback speed to every <video> on the storefront. */
export function ApplyVideoSpeed({ rate = 1 }: { rate?: number }) {
  useEffect(() => {
    const safeRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
    applyRate(document, safeRate);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.tagName === "VIDEO") {
            try {
              (node as HTMLVideoElement).playbackRate = safeRate;
              (node as HTMLVideoElement).defaultPlaybackRate = safeRate;
            } catch {
              /* ignore */
            }
          } else {
            applyRate(node, safeRate);
          }
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });

    const onPlay = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLVideoElement) {
        try {
          target.playbackRate = safeRate;
        } catch {
          /* ignore */
        }
      }
    };
    document.addEventListener("play", onPlay, true);

    return () => {
      mo.disconnect();
      document.removeEventListener("play", onPlay, true);
    };
  }, [rate]);

  return null;
}
