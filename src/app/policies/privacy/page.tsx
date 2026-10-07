import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { BUSINESS, supportEmail } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BUSINESS.brandName} collects, uses, and protects your personal information.`,
};

export default function PrivacyPolicyPage() {
  const email = supportEmail();

  return (
    <LegalPage title="Privacy Policy">
      <p>
        This Privacy Policy explains how <strong>{BUSINESS.legalName}</strong> (“we”, “us”, “our”),
        curated by {BUSINESS.founder}, collects and uses information when you visit{" "}
        <strong>{BUSINESS.brandName}</strong> or place an order.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact details: name, email address, phone number</li>
        <li>Shipping and billing address for order fulfilment</li>
        <li>Order history, payment status, and support messages</li>
        <li>Device/browser basics (cookies, IP) for security and site performance</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To process, ship, and support your orders</li>
        <li>To respond to consultations, returns, and customer care requests</li>
        <li>To send order updates; marketing emails only with your consent or as allowed by law</li>
        <li>To prevent fraud and keep payments secure</li>
      </ul>

      <h2>Payments</h2>
      <p>
        Online payments are processed by PCI-compliant payment partners (including Razorpay when
        enabled). We do not store your full card or UPI credentials on our servers.
      </p>

      <h2>Sharing</h2>
      <p>
        We share data only with fulfilment partners, payment gateways, and service providers who
        need it to complete your order or run the store. We do not sell your personal data.
      </p>

      <h2>Data retention & security</h2>
      <p>
        We retain order and account records as needed for legal, tax, and support purposes. We use
        reasonable technical and organisational measures to protect your information.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access, correction, or deletion of your personal data (subject to legal
        retention needs) by emailing{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions: <a href={`mailto:${email}`}>{email}</a>
        <br />
        See also our <Link href="/contact">Contact Us</Link> page.
      </p>
    </LegalPage>
  );
}
