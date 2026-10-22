"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Horizontal card row with left and right arrows so visitors can see it scrolls. */
export function CardScroller({ children, className }: { children: ReactNode; className: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  // Default right to true on mount so the right chevron arrow is immediately visible in production
  const [edges, setEdges] = useState({ left: false, right: true });

  function update() {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    if (max > 6) {
      setEdges({
        left: node.scrollLeft > 6,
        right: node.scrollLeft < max - 6,
      });
    } else if (node.clientWidth > 0) {
      // Content fits without scrolling
      setEdges({
        left: false,
        right: false,
      });
    }
  }

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    update();

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(node);
      Array.from(node.children).forEach((child) => ro.observe(child));
    }

    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    const images = Array.from(node.querySelectorAll("img"));
    images.forEach((img) => {
      if (img.complete) {
        update();
      } else {
        img.addEventListener("load", update, { once: true });
      }
    });

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(update).catch(() => {});
    }

    const rafId = requestAnimationFrame(update);
    const timers = [50, 150, 350, 700, 1400, 2500].map((ms) => setTimeout(update, ms));

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      if (ro) ro.disconnect();
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      images.forEach((img) => img.removeEventListener("load", update));
    };
  }, []);

  function move(direction: -1 | 1) {
    const node = scroller.current;
    if (!node) return;
    const distance = Math.max(280, Math.round(node.clientWidth * 0.75));
    node.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <div className="relative mt-6">
      <div ref={scroller} className={className}>
        {children}
      </div>
      {edges.left ? (
        <Arrow label="Scroll left" className="left-3 md:left-5" onClick={() => move(-1)}>
          <path d="M14 6l-6 6 6 6" />
        </Arrow>
      ) : null}
      {edges.right ? (
        <Arrow label="Scroll right" className="right-3 md:right-5" onClick={() => move(1)}>
          <path d="M10 6l6 6-6 6" />
        </Arrow>
      ) : null}
    </div>
  );
}

function Arrow({
  label,
  className,
  onClick,
  children,
}: {
  label: string;
  className: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ color: "#0f3d2e", backgroundColor: "#ffffff" }}
      className={`absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 shadow-[0_8px_20px_rgba(28,28,28,0.16)] transition hover:!bg-[#0f3d2e] hover:!text-white ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    </button>
  );
}
