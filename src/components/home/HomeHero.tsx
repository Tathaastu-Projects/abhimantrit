import Link from "next/link";

/**
 * Figma hero — full-bleed banner.
 * Headline MUST be exactly 2 lines on desktop (first line does not wrap):
 *   Keep the Blessings of Shiva Close
 *   With Every Rudraksha.
 */
export function HomeHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#efe6d8]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/banners/home_banner_1.svg"
        alt="Sacred Rudraksha, Shiva Lingam and ritual offerings"
        width={1920}
        height={785}
        className="block h-auto w-full object-cover object-center"
        style={{ aspectRatio: "1920 / 785", minHeight: "420px" }}
      />

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[62%] sm:w-[56%] md:w-[52%]"
        style={{
          background:
            "linear-gradient(90deg, rgba(243,235,224,0.92) 0%, rgba(243,235,224,0.72) 48%, rgba(243,235,224,0.18) 78%, rgba(243,235,224,0) 100%)",
        }}
        aria-hidden
      />

      <div className="absolute inset-0 flex items-center">
        <div className="w-full px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16">
          <div className="home-hero__copy">
            <h1 className="home-hero__title">
              <span className="home-hero__title-line">Keep the Blessings of Shiva Close</span>
              <span className="home-hero__title-line home-hero__title-line--strong">
                With Every Rudraksha.
              </span>
            </h1>
            <p className="home-hero__sub">
              Original • Authentic • Energised Through Vedic Rituals
            </p>
            <Link href="/shop/rudraksha" className="home-hero__cta">
              Explore Rudraksha
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
