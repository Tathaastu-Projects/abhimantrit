const TRUST_ITEMS = [
  {
    id: "auth",
    label: "Authentic & Pure",
    description: "Sourced with care.",
    icon: "shield",
  },
  {
    id: "pay",
    label: "Secure Payments",
    description: "100% safe checkout.",
    icon: "lock",
  },
  {
    id: "ship",
    label: "Fast & Reliable Delivery",
    description: "Pan India shipping.",
    icon: "truck",
  },
  {
    id: "trust",
    label: "Trusted by Thousands",
    description: "4.9+ average rating.",
    icon: "star",
  },
];

/** Figma trust bar — soft pink wash, icon + title + description */
export function HomeTrustBar() {
  return (
    <section className="bg-[#fff1f3]">
      <div className="grid w-full grid-cols-2 gap-6 px-4 py-7 sm:px-6 md:grid-cols-4 md:gap-8 md:px-8 md:py-8 lg:px-10">
        {TRUST_ITEMS.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink/15 text-pink">
              <TrustIcon name={item.icon} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{item.label}</p>
              <p className="mt-0.5 text-xs text-ink-soft">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustIcon({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
  } as const;

  if (name === "lock") {
    return (
      <svg {...common}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }
  if (name === "truck") {
    return (
      <svg {...common}>
        <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7V10z" />
        <circle cx="7" cy="18" r="1.5" />
        <circle cx="17" cy="18" r="1.5" />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg {...common}>
        <path d="M12 3l2.4 4.9L20 9l-4 3.9.9 5.4L12 15.8 7.1 18.3 8 12.9 4 9l5.6-1.1L12 3z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />
    </svg>
  );
}
