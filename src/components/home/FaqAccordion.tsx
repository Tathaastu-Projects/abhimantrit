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

/** FAQ accordion — numbered gold badges, forest text, + / × toggle.
 *  Pass faqs to show them. Omit / empty = hide section (except homepage which uses defaults).
 */
export function FaqAccordion({
  faqs,
  allowDefaults = false,
  compact = false,
  embedded = false,
}: {
  faqs?: { question: string; answer: string }[];
  /** Homepage only — fall back to built-in FAQs when admin list is empty */
  allowDefaults?: boolean;
  /** Smaller spacing/type for product pages */
  compact?: boolean;
  /** Use inside a product left/right panel (no full-bleed section chrome) */
  embedded?: boolean;
}) {
  const items =
    faqs && faqs.length
      ? faqs.map((f) => ({ q: f.question, a: f.answer }))
      : allowDefaults
        ? DEFAULT_FAQS
        : [];

  if (!items.length) return null;

  const small = compact || embedded;

  const list = (
        <div
          className={
            small
              ? "mt-3 grid grid-cols-1 gap-2"
              : "mt-5 grid grid-cols-1 gap-3.5 md:mt-6 md:grid-cols-2 md:gap-4 md:gap-x-5"
          }
        >
          {items.map((item, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <details
                key={item.q}
                name={allowDefaults ? "home-faq" : "product-faq"}
                className={
                  small
                    ? "group h-fit rounded-xl border border-transparent bg-white px-3 py-2 shadow-[0_4px_12px_rgba(28,28,28,0.05)] open:border-[#c9a227]/70] open:shadow-[0_6px_16px_rgba(15,61,46,0.08)]"
                    : "group h-fit rounded-2xl border border-transparent bg-white px-4 py-3.5 shadow-[0_6px_18px_rgba(28,28,28,0.06)] open:border-[#c9a227]/70] open:shadow-[0_10px_28px_rgba(15,61,46,0.1)] sm:px-5 md:rounded-[1.25rem] md:px-6 md:py-4"
                }
              >
                <summary
                  className={
                    small
                      ? "flex cursor-pointer list-none items-center gap-2 text-left marker:content-none [&::-webkit-details-marker]:hidden"
                      : "flex cursor-pointer list-none items-center gap-3 text-left marker:content-none sm:gap-4 [&::-webkit-details-marker]:hidden"
                  }
                >
                  <span
                    className={
                      small
                        ? "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4b56a] text-[10px] font-semibold tabular-nums text-[#0f3d2e]"
                        : "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d4b56a] text-[12px] font-semibold tabular-nums text-[#0f3d2e] sm:h-9 sm:w-9 sm:text-[13px]"
                    }
                    aria-hidden
                  >
                    {num}
                  </span>
                  <span
                    className={
                      small
                        ? "min-w-0 flex-1 text-[12px] font-semibold leading-snug text-[#0f3d2e] sm:text-[13px]"
                        : "min-w-0 flex-1 text-[14px] font-semibold leading-snug text-[#0f3d2e] sm:text-[15px] md:text-base"
                    }
                  >
                    {item.q}
                  </span>
                  <span
                    className={
                      small
                        ? "relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f0ec] text-[#0f3d2e] transition group-open:bg-[#0f3d2e] group-open:text-white"
                        : "relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f0ec] text-[#0f3d2e] transition group-open:bg-[#0f3d2e] group-open:text-white sm:h-9 sm:w-9"
                    }
                    aria-hidden
                  >
                    <PlusIcon
                      className={
                        small
                          ? "h-3 w-3 group-open:hidden"
                          : "h-3.5 w-3.5 group-open:hidden sm:h-4 sm:w-4"
                      }
                    />
                    <CloseIcon
                      className={
                        small
                          ? "hidden h-3 w-3 group-open:block"
                          : "hidden h-3.5 w-3.5 group-open:block sm:h-4 sm:w-4"
                      }
                    />
                  </span>
                </summary>

                <p
                  className={
                    small
                      ? "mt-2 pl-8 pr-7 text-[12px] leading-relaxed text-[#3a4540] sm:text-[13px]"
                      : "mt-3 pl-11 pr-10 text-sm leading-relaxed text-[#3a4540] sm:pl-[3.25rem] md:mt-3.5 md:text-[0.95rem] md:leading-[1.7]"
                  }
                >
                  {item.a}
                </p>
              </details>
            );
          })}
        </div>
  );

  if (embedded) {
    return (
      <div id="faq" className="min-w-0">
        <h2 className="font-display text-xl text-ink md:text-2xl">FAQs</h2>
        <p className="mt-0.5 text-[12px] text-ink-soft">Common questions about this piece.</p>
        {list}
      </div>
    );
  }

  return (
    <section
      id="faq"
      className={
        compact
          ? "w-full bg-[#f7f3ec] py-4 md:py-5"
          : "w-full bg-[#f7f3ec] pb-5 pt-8 md:pb-6 md:pt-10"
      }
    >
      <div
        className={
          compact
            ? "mx-auto w-full max-w-5xl px-3 sm:px-4 md:px-5"
            : "mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10"
        }
      >
        <h2
          className={
            compact
              ? "text-center font-display text-xl font-medium tracking-wide text-ink md:text-2xl"
              : "text-center font-display text-3xl font-medium tracking-wide text-ink md:text-4xl"
          }
        >
          FAQs
        </h2>
        {list}
      </div>
    </section>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}
