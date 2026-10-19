"use client";

import { useEffect, useRef, useState } from "react";

export function BlogCover({
  image,
  video,
  className,
}: {
  image?: string;
  video?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !video) return;
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPlay(true);
      },
      { rootMargin: "120px" },
    );
    watcher.observe(node);
    return () => watcher.disconnect();
  }, [video]);

  useEffect(() => {
    if (!play) return;
    const node = videoRef.current;
    if (!node) return;
    node.play().catch(() => {});
  }, [play]);

  return (
    <div ref={ref} className={className}>
      {video ? (
        <video
          ref={videoRef}
          poster={image || undefined}
          src={play ? video : undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      ) : image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ) : null}
    </div>
  );
}
