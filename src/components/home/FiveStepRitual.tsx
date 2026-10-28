const STEPS = [
  { id: "source", label: "Source", icon: "sprout" as const },
  { id: "cleanse", label: "Cleanse", icon: "droplets" as const },
  { id: "energise", label: "Energise", icon: "sun" as const },
  { id: "deliver", label: "Deliver", icon: "box" as const },
] as const;

/**
 * “The Abhimantrit Way” — built UI (not a flat image), above Best Sellers.
 */
export function FiveStepRitual() {
  return (
    <section className="w-full bg-[#f7f4ef] px-4 pb-2 pt-4 sm:px-6 md:px-8 md:pb-3 md:pt-5 lg:px-10">
      <div className="mx-auto max-w-[1100px] rounded-2xl border border-[#e2d5c0] bg-[#f9f4eb] px-4 py-5 shadow-[0_8px_22px_rgba(40,30,20,0.04)] sm:px-6 sm:py-5 md:px-8 md:py-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7b55] sm:text-[11px]">
          The Abhimantrit Way
        </p>

        <h2 className="mt-1.5 max-w-3xl font-display text-[1.35rem] leading-[1.2] tracking-tight text-forest sm:text-2xl md:text-[1.75rem] md:leading-[1.18]">
          From Nature, Through Sacred Rituals, To You.
        </h2>

        <p className="mt-1.5 max-w-2xl text-[13px] leading-snug text-[#6b5a48] sm:text-sm">
          Every product follows a thoughtful journey of selection, cleansing, mantra-jap, and
          careful preparation before it reaches your hands.
        </p>

        <div className="mt-4 border-t border-[#e2d5c0] pt-4 md:mt-5 md:pt-5">
          <ol className="flex flex-wrap items-center justify-center gap-y-4 sm:justify-between sm:gap-y-0">
            {STEPS.map((step, index) => (
              <li key={step.id} className="flex items-center">
                <div className="flex min-w-[4.75rem] flex-col items-center gap-1.5 sm:min-w-[5.75rem] md:min-w-[6.5rem]">
                  <span className="flex h-8 w-8 items-center justify-center text-[#8a6a3f] sm:h-9 sm:w-9">
                    <StepIcon name={step.icon} />
                  </span>
                  <span className="font-display text-sm font-semibold text-forest sm:text-base">
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 ? (
                  <span
                    className="mx-1.5 hidden text-[#c4a574] sm:mx-2.5 sm:inline-flex md:mx-4"
                    aria-hidden
                  >
                    <ArrowIcon />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepIcon({ name }: { name: (typeof STEPS)[number]["icon"] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "sprout") {
    return (
      <svg {...common}>
        <path d="M12 21V11" />
        <path d="M12 14c-3.2-.2-5.5-2.2-6.2-5.2 3.5-.2 5.8 1.4 6.2 5.2z" />
        <path d="M12 12c3.2-.4 5.6-2.5 6.3-5.6-3.6.1-5.9 2-6.3 5.6z" />
      </svg>
    );
  }

  if (name === "droplets") {
    return (
      <svg {...common}>
        <path d="M8.5 14.5c0 1.4-1.1 2.5-2.5 2.5S3.5 15.9 3.5 14.5 6 9 6 9s2.5 4.1 2.5 5.5z" />
        <path d="M14.2 12.8c0 1.7-1.35 3-3 3s-3-1.3-3-3S11.2 6.5 11.2 6.5s3 4.6 3 6.3z" />
        <path d="M20.5 14.2c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5S18 9 18 9s2.5 3.8 2.5 5.2z" />
      </svg>
    );
  }

  if (name === "sun") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4.5 9.5h15v9.5a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V9.5z" />
      <path d="M4.5 9.5l1.8-3.6a1.5 1.5 0 0 1 1.35-.9h8.7a1.5 1.5 0 0 1 1.35.9l1.8 3.6" />
      <path d="M12 9.5v10.5" />
      <path d="M9.6 13.2l1.5 1.5 3-3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
      <path
        d="M1 7h18M14 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
