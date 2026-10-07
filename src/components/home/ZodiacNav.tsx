import Link from "next/link";

const ZODIAC_SIGNS = [
  { label: "Aries", hindi: "मेष", icon: "♈" },
  { label: "Taurus", hindi: "वृषभ", icon: "♉" },
  { label: "Gemini", hindi: "मिथुन", icon: "♊" },
  { label: "Cancer", hindi: "कर्क", icon: "♋" },
  { label: "Leo", hindi: "सिंह", icon: "♌" },
  { label: "Virgo", hindi: "कन्या", icon: "♍" },
  { label: "Libra", hindi: "तुला", icon: "♎" },
  { label: "Scorpio", hindi: "वृश्चिक", icon: "♏" },
  { label: "Sagittarius", hindi: "धनु", icon: "♐" },
  { label: "Capricorn", hindi: "मकर", icon: "♑" },
  { label: "Aquarius", hindi: "कुंभ", icon: "♒" },
  { label: "Pisces", hindi: "मीन", icon: "♓" },
] as const;

const PASTELS = [
  "#FFE8EC",
  "#FFF3D6",
  "#E8F4FC",
  "#EAF8F0",
  "#FFF0E4",
  "#F3E9FF",
  "#E0F2FE",
  "#FFE4EC",
  "#FFF8E7",
  "#EDE9FE",
  "#E8F8EF",
  "#FCE7F3",
];

/** Shop by Zodiac — same card language as Shop by Intention */
export function ZodiacNav() {
  return (
    <section id="zodiac" className="container-pad py-14 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl text-ink md:text-4xl">Shop by Zodiac</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
          Explore gemstones & bracelets aligned with your Rashi and personal astrological guidance.
        </p>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-12 lg:gap-2.5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {ZODIAC_SIGNS.map((sign, i) => (
          <Link
            key={sign.label}
            href={`/shop?zodiac=${encodeURIComponent(sign.label)}`}
            className="group flex w-[4.75rem] shrink-0 flex-col items-center justify-center rounded-xl px-1.5 py-3 text-center transition hover:-translate-y-0.5 hover:shadow-sm sm:w-[5.25rem] lg:w-auto lg:min-w-0 lg:px-1 lg:py-3"
            style={{ backgroundColor: PASTELS[i % PASTELS.length] }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-base text-forest shadow-sm sm:h-10 sm:w-10 sm:text-lg">
              {sign.icon}
            </span>
            <p className="mt-2 text-[11px] font-semibold leading-tight text-ink sm:text-xs">
              {sign.label}
            </p>
            <p className="mt-0.5 text-[10px] leading-tight text-ink-soft sm:text-[11px]">
              {sign.hindi}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
