const PHRASES = [
  "By Priyanka Singh",
  "X-Ray & Lab Certified",
  "100% Natural & Authentic",
  "Energised Through Vedic Rituals",
  "Free Insured Worldwide Shipping",
  "Ships in 48 Hours",
  "Astrology-Guided",
  "Vedic Prana Pratishtha",
];

/** Black strip under the hero. Two identical runs so the loop has no gap. */
export function HeroTicker() {
  return (
    <section className="hero-ticker" aria-label="Abhimantrit highlights">
      <div className="hero-ticker__track py-2.5">
        <PhraseRun />
        <PhraseRun hidden />
      </div>
    </section>
  );
}

function PhraseRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[0, 1].map((copy) =>
        PHRASES.map((phrase) => (
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
