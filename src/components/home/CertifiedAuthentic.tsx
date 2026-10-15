import Image from "next/image";

const POINTS = [
  {
    title: "Natural & Authentic",
    description: "Pure & Authentic Crystals & Rudraksha With Certification Where Applicable.",
  },
  {
    title: "Energised with Purpose",
    description: "Traditionally Energised And Prepared For Your Spiritual Journey.",
  },
  {
    title: "Secure Shopping",
    description: "Safe Payments, Trusted Delivery & Easy Returns.",
  },
] as const;

/** Certified & Authentic — after Expert Guidance; banner in /public/trust */
export function CertifiedAuthentic() {
  return (
    <section id="certified" className="w-full bg-white">
      {/* Header */}
      <div className="container-pad pt-14 pb-8 text-center md:pt-16 md:pb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a9590] md:text-xs">
          Purity you can trust
        </p>
        <h2 className="mt-3 font-display text-[1.85rem] font-semibold tracking-[-0.02em] text-forest md:text-4xl">
          Certified &amp; Authentic
        </h2>
        <p className="mt-2 text-sm text-ink-soft md:text-[0.95rem]">
          Lab-Tested · X-Ray Certified
        </p>
      </div>

      {/* Banner — full artwork on the right, copy on the open left */}
      <div className="relative w-full overflow-hidden">
        <Image
          src="/trust/certified-banner.png"
          alt="Abhimantrit certified and authentic — natural crystals and Rudraksha"
          width={1920}
          height={600}
          unoptimized
          className="h-auto w-full"
        />

        <div className="w-full px-5 py-8 sm:px-8 md:absolute md:inset-0 md:flex md:items-center md:py-0 md:px-10 lg:px-14 xl:px-16">
          <ul className="max-w-md space-y-5 md:max-w-lg md:space-y-6">
                {POINTS.map((item) => (
                  <li key={item.title} className="flex gap-3.5">
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c45c3e] text-white md:h-10 md:w-10"
                      aria-hidden
                    >
                      <MandalaIcon />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="font-display text-[0.95rem] font-semibold text-forest md:text-lg">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink md:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MandalaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
