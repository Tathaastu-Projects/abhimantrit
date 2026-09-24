"use client";

import { useState } from "react";

/** Falls back to placeholder if remote category image fails */
export function CategoryCardImage({ src, alt = "" }: { src: string; alt?: string }) {
  const [url, setUrl] = useState(src || "/placeholder-product.svg");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      onError={() => setUrl("/placeholder-product.svg")}
    />
  );
}
