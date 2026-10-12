import Link from "next/link";

const STATS = [
  { value: "15+", label: "Years of Astrology Practice" },
  { value: "10,00,000+", label: "People Guided" },
  { value: "50,000+", label: "Consultations Done" },
];

/** Figma — full-width banner + left copy overlay */
export function FounderSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#faf6f0]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/banners/home_banner_2.svg"
        alt=""
        width={1920}
        height={728}
        className="block h-auto w-full object-cover object-center"
        style={{ aspectRatio: "1920 / 728", minHeight: "380px" }}
      />

      {/* Left wash so copy reads on the photo */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full sm:w-[72%] md:w-[58%] lg:w-[52%]"
        style={{
          background:
            "linear-gradient(90deg, rgba(250,246,240,0.97) 0%, rgba(250,246,240,0.88) 42%, rgba(250,246,240,0.45) 72%, rgba(250,246,240,0) 100%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-5 py-12 sm:px-8 md:px-10 lg:px-14 xl:px-16">
          <div className="founder-section__copy max-w-xl md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-pink md:text-xs">
              Natural • Authentic • Trusted
            </p>
            <h2 className="founder-section__title mt-3 font-display text-[2rem] font-semibold leading-tight tracking-[-0.02em] text-forest md:text-4xl lg:text-[2.85rem]">
              By Dr. Priyanka Singh
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft md:text-base">
              Every crystal and Rudraksha is thoughtfully selected with astrological guidance,
              checked for authenticity, and Abhimantrit through Vedic rituals.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 md:mt-9">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[1.65rem] leading-none text-pink md:text-[1.85rem]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-ink-soft md:text-[13px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/about" className="home-hero__cta mt-8 md:mt-9">
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
