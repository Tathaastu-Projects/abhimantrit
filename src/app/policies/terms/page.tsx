import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { BUSINESS, supportEmail } from "@/lib/business";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of use and sale for ${BUSINESS.brandName}.`,
};

export default function TermsPage() {
  const email = supportEmail();

  return (
    <LegalPage title="Terms & Conditions">
      <p>
        Welcome to <strong>{BUSINESS.brandName}</strong>, operated by{" "}
        <strong>{BUSINESS.legalName}</strong> ({BUSINESS.founder}). By browsing or purchasing from
        this website, you agree to these Terms &amp; Conditions.
      </p>

      <h2>About us</h2>
      <p>
        We sell sacred and spiritual products including Rudraksha, gemstones, crystals, yantras,
        bracelets, and related jewellery. Product pages show descriptions, pricing (inclusive or
        exclusive of taxes as stated at checkout), and availability.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be able to form a binding contract under applicable law. You agree to provide
        accurate contact and shipping details.
      </p>

      <h2>Orders & pricing</h2>
      <ul>
        <li>An order is an offer to buy; we may accept or decline (e.g. stock, pricing error, fraud risk).</li>
        <li>Prices are shown in INR unless stated otherwise and may change without notice for future orders.</li>
        <li>Promotions and sale prices apply only while listed and while stock lasts.</li>
      </ul>

      <h2>Payments</h2>
      <p>
        We may offer Cash on Delivery (where available) and online payment via approved gateways
        such as Razorpay. You authorise us and our payment partners to charge the selected method
        for the order total.
      </p>

      <h2>Shipping & risk</h2>
      <p>
        Delivery timelines are estimates. Title and risk pass as described in our{" "}
        <Link href="/policies/shipping">Shipping &amp; Delivery Policy</Link>. International orders
        may incur customs duties payable by the recipient.
      </p>

      <h2>Returns, refunds & cancellation</h2>
      <p>
        Governed by our{" "}
        <Link href="/policies/refund">Refund &amp; Cancellation Policy</Link>. Energised or
        personalised ritual items may have limited return eligibility as stated there.
      </p>

      <h2>Product authenticity & spiritual guidance</h2>
      <p>
        We strive for authenticity and lab/X-ray certification where claimed on product pages.
        Spiritual or astrological guidance is traditional/informational and not a substitute for
        professional medical, legal, or financial advice.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Site content, branding, and imagery belong to {BUSINESS.brandName} or its licensors. You may
        not copy or reuse them without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, our liability for any order is limited to the amount
        you paid for that order. We are not liable for indirect or consequential losses.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Disputes are subject to the courts of
        competent jurisdiction in India.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${email}`}>{email}</a> ·{" "}
        <Link href="/contact">Contact Us</Link>
      </p>
    </LegalPage>
  );
}
