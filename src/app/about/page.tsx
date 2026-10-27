import Link from "next/link";
import { BUSINESS, supportEmail, supportPhone } from "@/lib/business";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("about");
}

export default function AboutPage() {
  const email = supportEmail();
  const phone = supportPhone();

  return (
    <div className="container-pad max-w-3xl py-14 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest/70">Our story</p>
      <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">About {BUSINESS.displayName}</h1>

      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft md:text-base">
        <p>{BUSINESS.companyAbout}</p>
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
          Legal entity: <strong className="text-ink">{BUSINESS.legalName}</strong>
          <br />
          Email:{" "}
          <a className="text-pink underline" href={`mailto:${email}`}>
            {email}
          </a>
          {phone ? (
            <>
              <br />
              Mobile:{" "}
              <a className="text-pink underline" href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            </>
          ) : null}
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
