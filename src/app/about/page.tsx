import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, supportEmail } from "@/lib/business";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${BUSINESS.brandName} — sacred commerce curated by ${BUSINESS.founder}.`,
};

export default function AboutPage() {
  const email = supportEmail();

  return (
    <div className="container-pad max-w-3xl py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/70">Our story</p>
      <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">About {BUSINESS.brandName}</h1>

      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft md:text-base">
        <p>
          <strong className="text-ink">{BUSINESS.brandName}</strong> is a sacred commerce brand for
          Rudraksha, gemstones, crystals, yantras, and spiritual jewellery — curated with care so
          every piece is ready to serve with authenticity.
        </p>
        <p>
          The brand is led by <strong className="text-ink">{BUSINESS.founder}</strong>. We focus on
          lab- and X-ray–certified pieces where claimed, calm guidance by intention and Rashi, and
          a storefront that feels temple-warm rather than marketplace-noisy.
        </p>
        <p>
          Legal / trading name: <strong className="text-ink">{BUSINESS.legalName}</strong>
          <br />
          Business email:{" "}
          <a className="text-pink underline" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
        <div>
          <p className="font-semibold text-ink">Address</p>
          {BUSINESS.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p>
          Browse our <Link className="text-pink underline" href="/shop">catalogue</Link> for clear
          pricing and product details, or{" "}
          <Link className="text-pink underline" href="/contact">
            contact us
          </Link>{" "}
          for order help and recommendations.
        </p>
      </div>
    </div>
  );
}
