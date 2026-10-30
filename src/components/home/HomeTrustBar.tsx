const TRUST_ITEMS = [
  {
    id: "auth",
    label: "Authentic & Certified",
    description: "Every Gem is X-Ray & Lab-Certified",
    icon: "shield",
  },
  {
    id: "vedic",
    label: "Vedic Prana Pratishtha",
    description: "Performed Through Traditional Vedic Rituals",
    icon: "flame",
  },
  {
    id: "ship",
    label: "Ships in 48 Hours",
    description: "Energized And Prepared With Care Before Dispatch",
    icon: "truck",
  },
  {
    id: "astro",
    label: "Astrology-Guided",
    description: "Personal Gemstone & Rudraksha Guidance",
    icon: "mandala",
  },
] as const;

/** Figma value strip — brand-green icon tiles + uppercase labels */
export function HomeTrustBar() {
  return (
    <section className="bg-[#fff8f9]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-6 pt-5 pb-2 sm:grid-cols-2 md:grid-cols-4 md:gap-6 md:px-10 md:pt-6 md:pb-3 lg:px-14">
        {TRUST_ITEMS.map((item) => (
          <div key={item.id} className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-forest text-white shadow-sm">
              <TrustIcon name={item.icon} />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-ink">
                {item.label}
              </p>
              <p className="mt-1 text-[12px] leading-snug text-ink-soft">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustIcon({ name }: { name: (typeof TRUST_ITEMS)[number]["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" />
        <path d="M9.2 12.1l1.9 1.9 3.8-3.9" />
      </svg>
    );
  }
  if (name === "flame") {
    return (
      <svg {...common}>
        <path d="M12 21c3.3 0 5.5-2.2 5.5-5.3 0-2.8-1.7-4.4-3.2-5.9-.4-.4-.8.1-.6.6.6 1.4.3 2.3-.6 2.3-1.8 0-2.6-2.4-1.5-4.8.2-.4-.3-.8-.6-.5C8.5 9.2 6.5 12 6.5 15.7 6.5 18.8 8.7 21 12 21z" />
      </svg>
    );
  }
  if (name === "truck") {
    return (
      <svg {...common}>
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7V10z" />
        <circle cx="7" cy="18" r="1.4" />
        <circle cx="17" cy="18" r="1.4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 4.5l1.1 2.8 3 .3-2.3 1.9.8 2.9L12 10.9 9.4 12.4l.8-2.9-2.3-1.9 3-.3L12 4.5z" />
      <path d="M12 4v1.2M12 18.8V20M4 12h1.2M18.8 12H20" />
    </svg>
  );
}
