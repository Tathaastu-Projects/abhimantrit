import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { BUSINESS, supportEmail } from "@/lib/business";
import { CompanyContactBlock } from "@/components/legal/CompanyContactBlock";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("refund");
}

export default function RefundPolicyPage() {
  const email = supportEmail();

  return (
    <LegalPage title="Refund, Return & Replacement Policy" updated="13 October 2026">
      <p>
        At <strong>{BUSINESS.displayName}</strong>, we strive to provide a smooth and
        reliable shopping experience. Every product is selected and prepared with care, and our
        products are abhimantrit (pre-energised) through sacred practices and positive intentions
        before being shipped.
      </p>
      <p>
        This Refund, Return &amp; Replacement Policy explains the circumstances under which customers
        may request a cancellation, return, replacement or refund for purchases made through our
        website.
      </p>
      <p>
        By placing an order, you acknowledge this policy, subject to your rights under applicable
        consumer protection laws.
      </p>

      <h2>1. Eligibility for Returns and Refunds</h2>
      <p>Return, replacement and refund requests may be considered in the following circumstances:</p>
      <ul>
        <li>
          <strong>Damaged products:</strong> Your order arrives physically damaged.
        </li>
        <li>
          <strong>Defective products:</strong> The product has a defect that affects its intended use
          or materially affects its described characteristics.
        </li>
        <li>
          <strong>Incorrect products:</strong> You receive an item different from the one ordered.
        </li>
        <li>
          <strong>Missing items:</strong> One or more products included in your confirmed order are
          missing from the delivered package.
        </li>
        <li>
          <strong>Lost or undelivered orders:</strong> Your order is confirmed as lost or cannot be
          delivered, subject to verification.
        </li>
        <li>
          <strong>Eligible cancellations:</strong> You cancel an order before dispatch, in accordance
          with the applicable cancellation conditions.
        </li>
        <li>
          <strong>Payment issues:</strong> You are charged more than once for the same order, or
          payment is deducted without a corresponding confirmed order.
        </li>
      </ul>
      <p>
        Each request will be reviewed based on the circumstances, the order details and the
        applicable legal requirements.
      </p>
      <p>Nothing in this policy excludes a remedy that a customer is entitled to under applicable law.</p>

      <h2>2. Products That May Not Qualify for a Change-of-Mind Return</h2>
      <p>
        Due to the nature of our products, we may restrict returns requested solely because a customer
        has changed their mind, selected the wrong item or no longer wishes to keep a product, where
        such restrictions are permitted by law and were disclosed before purchase.
      </p>
      <p>This may apply to products such as:</p>
      <ul>
        <li>Crystal bracelets and anklets</li>
        <li>Individual crystals, loose stones and tumbles</li>
        <li>Malas and rudraksha products</li>
        <li>Crystal trees and pyramids</li>
        <li>Spiritual frames and other spiritual accessories</li>
      </ul>
      <p>
        However, these restrictions do not apply where a product is defective, damaged, incorrect,
        materially misrepresented or otherwise eligible for a remedy under applicable law.
      </p>
      <p>
        The fact that a product has been abhimantrit or pre-energised does not, by itself, remove any
        applicable consumer rights.
      </p>

      <h2>3. Natural Variations in Products</h2>
      <p>
        Many of our products incorporate natural crystals, stones, rudraksha and other materials that
        may vary in appearance.
      </p>
      <p>
        Minor differences in colour, shape, pattern, texture, size or natural markings may occur
        between individual items.
      </p>
      <p>
        Such variations are not necessarily defects when they are consistent with the product
        description and the characteristics of the material.
      </p>
      <p>
        We encourage customers to review product photographs, descriptions, specifications and
        dimensions before placing an order.
      </p>
      <p>
        This provision does not apply where the item materially differs from its advertised
        description or specifications.
      </p>

      <h2>4. Products Damaged During Delivery</h2>
      <p>
        If your order arrives damaged, please contact us within <strong>48 hours</strong> of
        delivery, where reasonably possible, so that we can investigate the issue promptly.
      </p>
      <p>Please provide:</p>
      <ul>
        <li>Your order number.</li>
        <li>Clear photographs of the damaged product.</li>
        <li>Photographs of the outer packaging and shipping label, where available.</li>
        <li>A brief description of the issue.</li>
      </ul>
      <p>We may request additional information reasonably necessary to assess the claim.</p>
      <p>
        Following verification, we may offer an appropriate remedy, such as a replacement, repair
        where applicable, refund or another legally permissible resolution.
      </p>
      <p>
        Failure to report damage within the suggested timeframe will not automatically remove any
        rights or remedies available under applicable law.
      </p>

      <h2>5. Incorrect or Missing Products</h2>
      <p>
        If you receive an incorrect item or discover that an item is missing from your order, please
        contact us as soon as reasonably possible.
      </p>
      <p>
        Include your order number, details of the discrepancy and relevant photographs of the package
        and products received, where available.
      </p>
      <p>
        We will investigate the issue and, where the claim is verified, arrange an appropriate
        resolution. Depending on the circumstances, this may include sending the correct or missing
        item, replacing the incorrect product or issuing a refund where applicable.
      </p>
      <p>We will communicate any further steps required to resolve the issue.</p>

      <h2>6. Order Cancellation</h2>
      <p>Customers may request cancellation by contacting us through our official customer support channels.</p>
      <ul>
        <li>
          <strong>Before dispatch:</strong> Cancellation requests received before the order has been
          dispatched may be eligible for cancellation and a refund, subject to the applicable order
          conditions.
        </li>
        <li>
          <strong>After dispatch:</strong> Once an order has been dispatched, cancellation may no
          longer be possible through the ordinary order cancellation process. Customers may contact us
          to understand the available options under our return and refund policy.
        </li>
        <li>
          <strong>Orders that cannot be fulfilled:</strong> If we cancel an order because a product is
          unavailable or the order cannot be fulfilled, we will arrange an appropriate refund where
          payment has been collected.
        </li>
      </ul>
      <p>
        We will communicate any applicable cancellation restrictions before purchase where required.
        Nothing in this section limits any cancellation or refund rights provided by law.
      </p>

      <h2>7. Refund Eligibility for Abhimantrit Products</h2>
      <p>
        Our products are prepared and abhimantrit through sacred practices and positive intentions
        before shipping.
      </p>
      <p>
        Descriptions of spiritual significance or traditionally associated benefits are provided to
        explain the intended spiritual purpose of our products. Individual beliefs and experiences may
        differ, and specific spiritual outcomes are not guaranteed.
      </p>
      <p>
        A refund will not ordinarily be granted solely because a customer does not experience an
        anticipated spiritual outcome or changes their personal beliefs after purchase.
      </p>
      <p>
        However, this does not affect a customer’s right to seek a remedy where the product is
        defective, materially misrepresented, incorrect or otherwise eligible for a refund under
        applicable law.
      </p>

      <h2>8. Return Conditions and Process</h2>
      <p>
        Where a return is approved or required, we will communicate the return procedure and the
        applicable shipping arrangements.
      </p>
      <p>
        Customers may be asked to provide the order number, photographs or other reasonable
        information to help verify the issue.
      </p>
      <p>Where a return is required:</p>
      <ul>
        <li>The product should be packaged securely to avoid additional damage during transit.</li>
        <li>Any return instructions provided by our customer support team should be followed.</li>
        <li>Original packaging and included accessories should be retained where reasonably possible.</li>
        <li>Customers should not send products to an address that has not been authorised by our support team.</li>
      </ul>
      <p>
        Where a product is returned due to our error, a verified defect or another circumstance for
        which we are responsible, return shipping arrangements or costs will be handled in accordance
        with applicable law and the resolution communicated to the customer.
      </p>
      <p>We will not impose return conditions that unlawfully restrict a customer’s statutory rights.</p>

      <h2>9. Refund Processing</h2>
      <p>
        Once a refund has been approved, it will be initiated within the applicable legal or
        communicated processing timeframe.
      </p>
      <p>
        Refunds will generally be issued through the original payment method wherever possible. If
        this is not feasible, we will communicate an appropriate alternative.
      </p>
      <p>
        The time taken for the refund to appear in your account may vary depending on your bank, card
        issuer or payment service provider.
      </p>
      <p>Customers will be notified when a refund has been initiated, where appropriate.</p>
      <p>
        If a refund does not appear within the communicated timeframe, please contact our support team
        with the relevant order or transaction reference.
      </p>

      <h2>10. Failed Payments and Duplicate Transactions</h2>
      <p>
        If a payment is deducted but your order is not confirmed, please contact us with your
        transaction reference or payment confirmation.
      </p>
      <p>
        We will investigate whether the order was successfully placed and determine whether a refund
        is due.
      </p>
      <p>
        If a duplicate payment is identified, the excess amount will be refunded through the
        appropriate payment channel, subject to verification and applicable payment-provider
        procedures.
      </p>
      <p>
        The time required for the amount to reflect in your account may depend on the relevant
        financial institution or payment service provider.
      </p>

      <h2>11. Refunds for Lost or Undelivered Orders</h2>
      <p>
        If your order has not arrived within the estimated delivery period, please contact us so that
        we can investigate its status with the relevant delivery partner.
      </p>
      <p>
        Where an order is confirmed as lost, cannot be delivered or otherwise qualifies for a refund,
        we will communicate the available resolution.
      </p>
      <p>Depending on the circumstances, this may include a replacement shipment or a refund.</p>
      <p>
        If tracking information shows that an order has been delivered but you have not received it,
        we may request additional information to help investigate the delivery.
      </p>
      <p>Each case will be assessed fairly, subject to applicable law and the circumstances of the order.</p>

      <h2>12. Exchanges and Replacements</h2>
      <p>Where a product is eligible for an exchange or replacement, we will communicate the available options.</p>
      <p>Replacement availability will depend on stock and the nature of the issue.</p>
      <p>
        If the original product is unavailable, we will discuss an appropriate alternative resolution
        with you, which may include a refund where applicable.
      </p>
      <p>
        We will not substitute a different product without appropriate customer agreement where such
        agreement is required.
      </p>

      <h2>13. How to Request a Refund, Return or Replacement</h2>
      <p>
        To submit a request, contact us through the official customer support details below. Please
        provide the following information:
      </p>
      <ul>
        <li>Full name.</li>
        <li>Order number.</li>
        <li>Registered email address or contact number.</li>
        <li>Product name and quantity.</li>
        <li>Reason for the request.</li>
        <li>Photographs or other supporting information, where relevant.</li>
      </ul>
      <p>Providing complete information will help us review your request efficiently.</p>
      <ul>
        <li>
          <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>
          <strong>Website:</strong> <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
      <p>Please retain your order confirmation and payment receipt until the matter has been resolved.</p>

      <h2>14. Changes to This Policy</h2>
      <p>
        {BUSINESS.displayName} may update this policy to reflect changes in our products,
        order processing procedures, return arrangements or applicable laws.
      </p>
      <p>The revised policy will be published on this page with an updated “Last Updated” date.</p>
      <p>
        Changes will apply prospectively where appropriate and will not remove rights or remedies that
        have already accrued.
      </p>
      <p>We encourage customers to review this policy before placing an order.</p>

      <h2>15. Company &amp; Contact Us</h2>
      <p>For questions about cancellations, returns, replacements or refunds, please contact us:</p>
      <CompanyContactBlock />
      <p>
        We will review your request and respond in accordance with this policy and applicable law.
        Shipping questions are covered in our{" "}
        <Link href="/policies/shipping">Shipping &amp; Delivery Policy</Link>.
      </p>
    </LegalPage>
  );
}
