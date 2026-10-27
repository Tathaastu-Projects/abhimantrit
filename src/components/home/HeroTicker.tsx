const DEFAULT_PHRASES = [
  "💎 Energised Crystals by Dr. Priyanka Singh",
  "✅ X-Ray & Lab-Certified",
  "100% Natural & Authentic",
  "Energised Through Vedic Rituals",
  "📦 Free-Insured Worldwide Shipping",
  "Ships in 48 Hours",
  "Astrology-Guided",
  "Vedic Prana Pratishtha",
];

/** Dark green auto-scroll strip under the hero (Admin → Home Page → Hero ticker). */
export function HeroTicker({ phrases }: { phrases?: string[] }) {
  const items =
    phrases && phrases.length
      ? phrases.map((s) => String(s || "").trim()).filter(Boolean)
      : DEFAULT_PHRASES;

  return (
    <section className="hero-ticker" aria-label="Abhimantrit highlights">
      <div className="hero-ticker__track py-2.5">
        <PhraseRun phrases={items} />
        <PhraseRun phrases={items} hidden />
      </div>
    </section>
  );
}

function PhraseRun({ phrases, hidden = false }: { phrases: string[]; hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[0, 1].map((copy) =>
        phrases.map((phrase) => (
          <span
            key={`${copy}-${phrase}`}
            className="px-8 text-[13px] font-medium tracking-[0.04em] whitespace-nowrap md:text-sm"
          >
            {phrase}
          </span>
        )),
      )}
    </div>
  );
}
