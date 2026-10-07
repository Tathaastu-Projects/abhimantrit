import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { BUSINESS, supportEmail } from "@/lib/business";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `Returns, refunds, and order cancellations for ${BUSINESS.brandName}.`,
};

export default function RefundPolicyPage() {
  const email = supportEmail();

  return (
    <LegalPage title="Refund & Cancellation Policy">
      <p>
        This policy explains how <strong>{BUSINESS.legalName}</strong> ({BUSINESS.brandName})
        handles cancellations, returns, and refunds for physical sacred products.
      </p>

      <h2>Order cancellation</h2>
      <ul>
        <li>
          <strong>Before dispatch:</strong> Email <a href={`mailto:${email}`}>{email}</a> with your
          order number. If the order has not shipped, we will cancel and refund eligible payments.
        </li>
        <li>
          <strong>After dispatch:</strong> The order cannot be cancelled; you may refuse delivery or
          request a return under the conditions below (subject to product type).
        </li>
        <li>COD orders cancelled before dispatch incur no charge.</li>
      </ul>

      <h2>Returns</h2>
      <p>Contact us within <strong>7 days</strong> of delivery if:</p>
      <ul>
        <li>The item arrived damaged or defective</li>
        <li>You received the wrong product</li>
        <li>The item is materially not as described</li>
      </ul>
      <p>
        Please include your order number and clear photos. Approved returns must be unused, in
        original packaging where applicable, and shipped as instructed by our team.
      </p>

      <h2>Non-returnable / limited return items</h2>
      <ul>
        <li>Personalised, custom-made, or specifically energised / ritual-prepared items</li>
        <li>Items damaged due to misuse after delivery</li>
        <li>Products without proof of purchase / order number</li>
      </ul>

      <h2>Refunds</h2>
      <ul>
        <li>Approved refunds are processed to the original payment method where possible</li>
        <li>Online payments: typically 5–10 business days after approval (gateway timelines may vary)</li>
        <li>COD purchases: refund via bank transfer / UPI after we receive your account details</li>
        <li>Shipping fees are refundable only if the return is due to our error or a defective item</li>
      </ul>

      <h2>Replacements</h2>
      <p>
        Where stock allows, we may offer a replacement instead of a refund for damaged or incorrect
        items.
      </p>

      <h2>How to raise a request</h2>
      <p>
        Email <a href={`mailto:${email}`}>{email}</a> or use{" "}
        <Link href="/contact">Contact Us</Link>. We aim to respond within 1–2 business days.
      </p>
    </LegalPage>
  );
}
