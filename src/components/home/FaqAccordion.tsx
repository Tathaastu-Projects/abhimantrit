const DEFAULT_FAQS = [
  {
    q: "How do I know which gemstone is right for me?",
    a: "Choosing a gemstone can be personal. In Vedic astrology, suitability may depend on factors in an individual's birth chart rather than only their zodiac sign. If you are unsure, you can seek personalised guidance before making your choice.",
  },
  {
    q: "Are Abhimantrit gemstones authentic?",
    a: "At Abhimantrit, we bring together natural and authentic gemstones, carefully selected for their quality and traditional significance. Where applicable, certification details are provided to help you understand and choose your gemstone with confidence.",
  },
  {
    q: "What does a gemstone certificate tell me?",
    a: "A gemstone certificate provides important details about the stone and its characteristics, as assessed by a recognised certifying laboratory. The information may vary depending on the gemstone and certification authority. You can review the certificate provided with your gemstone for a clearer understanding of your purchase.",
  },
  {
    q: "Are Abhimantrit Rudraksha original?",
    a: "Yes. Abhimantrit offers original Rudraksha, carefully selected for authenticity and quality. Where applicable, product-specific certification and authenticity details are provided, along with information about the Rudraksha’s Mukhi and traditional associations.",
  },
  {
    q: "What is gemstone energisation?",
    a: "Gemstone energisation is a traditional practice rooted in Vedic traditions. At Abhimantrit, gemstones may be energised through traditional rituals as part of their spiritual preparation. It is a meaningful part of the journey, rather than a guarantee of any specific life outcome.",
  },
  {
    q: "How do I choose the right Rudraksha?",
    a: "Choosing a Rudraksha can depend on its Mukhi, traditional associations, and your personal spiritual or astrological journey. If you’re unsure which Rudraksha may be suitable for you, personalised astrology guidance can help you explore your options with greater clarity.",
  },
  {
    q: "Can I get personalised guidance before buying?",
    a: "Absolutely. If you’re unsure which gemstone or Rudraksha to choose, you can seek personalised guidance from Dr. Priyanka Singh. This can help you understand the different options and make a choice that feels more personal and meaningful.",
  },
];

/** Figma FAQ — numbered pink-border cards, +/- toggle */
export function FaqAccordion({
  faqs,
}: {
  faqs?: { question: string; answer: string }[];
}) {
  // Prefer curated Abhimantrit FAQs; fall back to CMS only if explicitly longer set needed later
  const items =
    faqs && faqs.length >= 7
      ? faqs.map((f) => ({ q: f.question, a: f.answer }))
      : DEFAULT_FAQS;
  return (
    <section id="faq" className="w-full bg-white py-14 md:py-16">
      <div className="container-pad mx-auto max-w-3xl">
        <h2 className="text-center font-display text-[1.85rem] font-semibold text-ink md:text-[2.15rem]">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-3 md:mt-10 md:space-y-3.5">
          {items.map((item, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <details
                key={item.q}
                name="home-faq"
                className="group rounded-[1.35rem] border border-[#f0c4cc] bg-white px-4 py-4 md:px-5 md:py-4.5"
              >
                <summary className="flex cursor-pointer list-none items-start gap-3 text-left marker:content-none md:gap-4 [&::-webkit-details-marker]:hidden">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f0c4cc] text-xs font-semibold text-pink md:h-10 md:w-10 md:text-sm"
                    aria-hidden
                  >
                    {num}
                  </span>

                  <span className="min-w-0 flex-1 pt-1.5 text-[0.95rem] font-medium leading-snug text-ink md:pt-2 md:text-base">
                    {item.q}
                  </span>

                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f0c4cc] text-lg leading-none text-pink md:h-10 md:w-10"
                    aria-hidden
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>

                <p className="mt-3 pl-12 pr-12 text-sm leading-relaxed text-ink-soft md:mt-3.5 md:pl-[3.5rem] md:pr-14 md:text-[0.95rem] md:leading-[1.7]">
                  {item.a}
                </p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
