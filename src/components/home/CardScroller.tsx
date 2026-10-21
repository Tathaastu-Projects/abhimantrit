"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Horizontal card row with left and right arrows so visitors can see it scrolls. */
export function CardScroller({ children, className }: { children: ReactNode; className: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  function update() {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setEdges({
      left: node.scrollLeft > 8,
      right: max - node.scrollLeft > 8,
    });
  }

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    node.addEventListener("scroll", update, { passive: true });
    const images = [...node.querySelectorAll("img")];
    images.forEach((img) => img.addEventListener("load", update));
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", update);
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
          <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </Arrow>
      ) : null}
      {edges.right ? (
        <Arrow label="Scroll right" className="right-3 md:right-5" onClick={() => move(1)}>
          <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-forest shadow-[0_8px_20px_rgba(28,28,28,0.16)] transition hover:bg-forest hover:text-white ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        {children}
      </svg>
    </button>
  );
}
