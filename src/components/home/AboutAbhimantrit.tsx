import Image from "next/image";

const FEATURES = [
  {
    title: "Lab Certified",
    description: "Quality you can trust, backed by recognised laboratory certification.",
    icon: "badge",
  },
  {
    title: "Abhimantrit",
    description: "Each piece is energised through traditional Vedic rituals with care and intention.",
    icon: "ritual",
  },
  {
    title: "Authenticity & Quality",
    description: "Carefully checked to ensure authenticity, purity, and quality in every piece.",
    icon: "check",
  },
  {
    title: "Astrologically Guided",
    description: "Selected with astrological guidance for a more personal experience.",
    icon: "star",
  },
] as const;

/** About Abhimantrit — full banner background + text overlay */
export function AboutAbhimantrit() {
  return (
    <section id="about" className="w-full overflow-hidden bg-[#f7f1e8]">
      <div className="relative w-full">
        <Image
          src="/about/abhimantrit-banner.png"
          alt="Abhimantrit lotus"
          width={1920}
          height={600}
          priority
          unoptimized
          className="h-auto w-full"
        />
        <div className="container-pad relative py-8 md:absolute md:inset-0 md:flex md:items-center md:py-0">
          <div className="max-w-md lg:max-w-lg">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9a9590] md:text-xs">
              About
            </p>
            <h2 className="mt-2.5 font-display text-[2rem] font-semibold tracking-[-0.02em] text-forest md:text-4xl lg:text-[2.55rem]">
              ABHIMANTRIT
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#5c5752] md:text-[0.95rem] md:leading-[1.75]">
              Abhimantrit brings together authentic Rudraksha, crystals, and spiritual essentials,
              thoughtfully chosen for their astrological and spiritual significance. Each piece is
              carefully checked for authenticity and quality, then energised through traditional
              Vedic rituals with care and intention.
            </p>
          </div>
        </div>
      </div>

      <div className="container-pad relative pb-14 md:pb-16 lg:pb-20">
        <h3 className="font-display text-xl font-semibold text-forest md:text-[1.35rem]">
          What Sets Us Apart?
        </h3>

        {/* Feature row */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2 md:mt-10 lg:grid-cols-4 lg:gap-8 xl:gap-10">
          {FEATURES.map((item) => (
            <div key={item.title} className="flex gap-3.5">
              <span
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e74660] text-white md:h-11 md:w-11"
                aria-hidden
              >
                <FeatureIcon name={item.icon} />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="font-display text-[0.95rem] font-semibold text-forest md:text-base">
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#6b6660] md:text-[13px] md:leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ name }: { name: (typeof FEATURES)[number]["icon"] }) {
  if (name === "badge") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3l2.2 2.4 3.1-.4 1 3 2.8 1.5-1.5 2.8.4 3.1-3 1-1.5 2.8-2.8-1.5-3.1.4-1-3-2.8-1.5 1.5-2.8-.4-3.1 3-1L12 3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12.2l1.7 1.7 3.5-3.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "ritual") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 15c0 2.2 1.3 4 3 4s3-1.8 3-4H9z" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 3c1.2-1.4 2.8-1.2 3.2.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "check") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8.8 12.2l2.2 2.2 4.2-4.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.5l1.6 3.6 3.9.4-2.9 2.6.9 3.8L12 13.2 8.5 14.9l.9-3.8-2.9-2.6 3.9-.4L12 4.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
