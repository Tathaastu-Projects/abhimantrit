"use client";

import { useState } from "react";

const DEFAULT_FAQS = [
  {
    q: "Are your Rudraksha and gemstones certified?",
    a: "Yes. Listed pieces are lab-checked where applicable, and we share authenticity details with every order.",
  },
  {
    q: "Do you energize products before shipping?",
    a: "Selected items are consecrated by our experts before dispatch. You’ll see energization notes on the product page when available.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "COD is available on eligible orders across India. You can choose COD at checkout.",
  },
  {
    q: "How long does shipping take?",
    a: "Most orders ship within 24–48 hours. Delivery usually takes 3–7 business days depending on your pincode.",
  },
];

export function FaqAccordion({
  faqs,
}: {
  faqs?: { question: string; answer: string }[];
}) {
  const items = faqs?.length
    ? faqs.map((f) => ({ q: f.question, a: f.answer }))
    : DEFAULT_FAQS;
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#faf7f2] py-12 md:py-16">
      <div className="container-pad">
        <h2 className="font-display text-3xl md:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)] bg-transparent">
          {items.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={item.q} className="px-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-forest">{item.q}</span>
                  <span className="text-lg text-forest">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen ? (
                  <p className="pb-5 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
