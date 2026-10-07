import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { BUSINESS, supportEmail } from "@/lib/business";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: `Shipping timelines, delivery areas, and insured shipping for ${BUSINESS.brandName}.`,
};

export default function ShippingPolicyPage() {
  const email = supportEmail();

  return (
    <LegalPage title="Shipping & Delivery Policy">
      <p>
        <strong>{BUSINESS.brandName}</strong> ships physical products (Rudraksha, gemstones,
        jewellery, and related sacred items) across India and, where available, worldwide with
        insured shipping.
      </p>

      <h2>Order processing</h2>
      <ul>
        <li>Orders are typically processed and dispatched within <strong>24–48 hours</strong> after confirmation (excluding Sundays and public holidays).</li>
        <li>You will receive dispatch updates once the shipment is handed to the courier.</li>
      </ul>

      <h2>Delivery timelines</h2>
      <ul>
        <li>
          <strong>India:</strong> usually 3–7 business days after dispatch, depending on pincode and
          courier serviceability
        </li>
        <li>
          <strong>International:</strong> timelines vary by destination (often 7–21 business days);
          customs clearance can add time
        </li>
      </ul>
      <p>All timelines are estimates and not guaranteed delivery dates.</p>

      <h2>Shipping charges</h2>
      <p>
        Shipping cost (if any) is shown at checkout before you pay. Promotional free shipping may
        apply as advertised on the site (including insured worldwide shipping offers when active).
      </p>

      <h2>Tracking</h2>
      <p>
        After dispatch, use <Link href="/track-order">Track Order</Link> with your order number and
        phone, or contact <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>Failed delivery & address errors</h2>
      <p>
        Please ensure your address and phone are correct. Failed deliveries due to incorrect details,
        unreachable recipients, or repeated courier attempts may require re-shipping at additional
        cost or may be treated as a return.
      </p>

      <h2>Damage in transit</h2>
      <p>
        If a package arrives damaged, refuse delivery when possible and contact us within 48 hours
        with photos. Insured shipments are handled per courier and our{" "}
        <Link href="/policies/refund">Refund &amp; Cancellation Policy</Link>.
      </p>

      <h2>Customs & duties (international)</h2>
      <p>
        Import duties, taxes, or brokerage charged by the destination country are the buyer’s
        responsibility unless explicitly stated otherwise.
      </p>

      <h2>Contact</h2>
      <p>
        Shipping questions: <a href={`mailto:${email}`}>{email}</a> ·{" "}
        <Link href="/contact">Contact Us</Link>
      </p>
    </LegalPage>
  );
}
