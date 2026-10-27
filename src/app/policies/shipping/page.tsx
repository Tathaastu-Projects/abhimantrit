import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { BUSINESS, supportEmail } from "@/lib/business";
import { CompanyContactBlock } from "@/components/legal/CompanyContactBlock";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata("shipping");
}

export default function ShippingPolicyPage() {
  const email = supportEmail();

  return (
    <LegalPage title="Shipping & Delivery Policy" updated="13 October 2026">
      <p>
        At <strong>{BUSINESS.displayName}</strong>, we take care to prepare and package
        your spiritual products with devotion and attention. Every product offered as Abhimantrit is
        pre-energised through sacred practices and positive intentions before being dispatched, so it
        reaches you ready to be part of your spiritual journey.
      </p>
      <p>
        This Shipping &amp; Delivery Policy explains how we process, ship and deliver orders placed
        through this website.
      </p>

      <h2>1. Order Processing</h2>
      <p>
        Orders are processed after successful payment confirmation, except for orders placed using an
        approved alternative payment method.
      </p>
      <p>
        Please allow <strong>1–2 business days</strong> (typically 24–48 hours, excluding Sundays and
        public holidays) for order processing and preparation before dispatch.
      </p>
      <p>
        Processing times may vary during festivals, promotional events, high-demand periods or
        unforeseen circumstances.
      </p>
      <p>
        If an item is temporarily unavailable or an order requires additional processing time, we will
        make reasonable efforts to notify you using the contact details provided at checkout.
      </p>

      <h2>2. Shipping &amp; Delivery Timelines</h2>
      <p>
        Estimated delivery timelines depend on your delivery location, courier service and the time
        required to process your order.
      </p>
      <ul>
        <li>
          <strong>Within India:</strong> Estimated delivery within 3–7 business days after dispatch.
        </li>
        <li>
          <strong>Remote locations:</strong> Deliveries to remote areas or locations with limited
          courier access may take longer.
        </li>
        <li>
          <strong>International orders:</strong> International shipping is available where offered at
          checkout. Estimated delivery is often 7–21 business days after dispatch. Customs clearance
          can add time.
        </li>
      </ul>
      <p>
        Delivery estimates are indicative and not guaranteed. Delays may occur due to weather
        conditions, public holidays, courier disruptions, operational issues or other circumstances
        beyond our reasonable control.
      </p>
      <p>
        Where a delivery delay materially affects your order, please contact our support team for
        assistance. Nothing in this policy limits any rights you may have under applicable consumer
        protection laws.
      </p>

      <h2>3. Shipping Charges</h2>
      <p>
        Shipping charges, if applicable, will be displayed at checkout before you complete your
        purchase.
      </p>
      <ul>
        <li>
          <strong>Standard shipping:</strong> The applicable charge, if any, is shown at checkout
          before you pay.
        </li>
        <li>
          <strong>Free shipping:</strong> Promotional free shipping, including insured shipping
          offers, applies only while it is advertised on the site.
        </li>
        <li>
          <strong>Additional charges:</strong> Any applicable delivery-related charges will be
          disclosed before the order is placed.
        </li>
      </ul>
      <p>
        Shipping charges may vary based on the delivery location, order weight, package dimensions or
        delivery method.
      </p>

      <h2>4. Order Confirmation &amp; Tracking</h2>
      <p>
        Once your order is successfully placed, you may receive an order confirmation through your
        registered email address, phone number or another communication channel used by us.
      </p>
      <p>
        After dispatch, tracking details will be shared where tracking is available through our
        courier partner. Tracking updates may take some time to appear in the courier system. You can
        also use <Link href="/track-order">Track Order</Link> with your order number.
      </p>
      <p>
        If you have not received your order confirmation or tracking details within the expected
        timeframe, please contact us with your order number.
      </p>

      <h2>5. Accurate Delivery Information</h2>
      <p>
        Please ensure that your shipping address, phone number, email address and other delivery
        details are accurate and complete when placing your order.
      </p>
      <p>
        {BUSINESS.displayName} cannot guarantee successful delivery where an order
        contains incorrect or incomplete information supplied by the customer. If you notice an error,
        contact us as soon as possible.
      </p>
      <p>
        Once an order has been dispatched, changes to the shipping address or delivery instructions
        may not be possible. We will try to assist where the courier’s process allows it.
      </p>
      <p>
        Additional delivery attempts, re-shipping charges or other costs arising from an incorrect
        address or an unsuccessful delivery may apply where reasonably justified and permitted by
        applicable law. Any applicable charges will be communicated to you.
      </p>

      <h2>6. Delivery Attempts &amp; Undelivered Orders</h2>
      <p>
        Our courier partners may contact you or attempt delivery using the details provided with your
        order.
      </p>
      <p>
        If a delivery is unsuccessful because the recipient is unavailable, the address is incomplete,
        or the parcel is refused or unclaimed, the courier may return the shipment to us.
      </p>
      <p>
        If your order is returned to us, please contact our support team. Depending on the
        circumstances, we may arrange re-shipping or explain the available cancellation or refund
        options. Any additional shipping charges will be communicated before re-shipping.
      </p>
      <p>
        This section does not restrict any remedies available to you under applicable law, including
        where an order is not delivered as agreed.
      </p>

      <h2>7. Damaged, Incorrect or Missing Items</h2>
      <p>
        We take care to package orders appropriately before dispatch. However, if your parcel arrives
        damaged, contains an incorrect product, or appears to be missing an item, please contact us at{" "}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
      <p>To help us resolve the issue, please provide:</p>
      <ul>
        <li>Your order number.</li>
        <li>A description of the issue.</li>
        <li>Clear photographs or an unboxing video, if available.</li>
        <li>Photographs of the outer packaging and shipping label, where relevant.</li>
      </ul>
      <p>
        Please report the issue as soon as reasonably possible after delivery so that we can
        investigate it with our team or courier partner. We may request additional information where
        necessary.
      </p>
      <p>
        Depending on the circumstances and the applicable policy, we may arrange a replacement,
        reshipment, refund or another appropriate resolution. Any request will be handled in
        accordance with our{" "}
        <Link href="/policies/refund">Refund, Return &amp; Replacement Policy</Link> and applicable
        law.
      </p>
      <p>
        Failure to provide photographs or report an issue within a suggested timeframe will not
        automatically remove any rights available to you under applicable law.
      </p>

      <h2>8. Products Requiring Special Care</h2>
      <p>
        Our collection may include crystals, natural stones, bracelets, anklets, malas, rudraksha
        products, decorative spiritual items and other products.
      </p>
      <p>
        We take reasonable care when packaging these items for transit. Natural products may have
        variations in colour, pattern, shape, texture or size. Such variations may be inherent to the
        material and do not necessarily indicate damage or a defect, provided the product
        substantially matches its description.
      </p>
      <p>Please refer to the relevant product listing for specific product details and care instructions.</p>

      <h2>9. Abhimantrit Product Preparation</h2>
      <p>
        Products identified as Abhimantrit are pre-energised through the sacred practices followed by
        {BUSINESS.displayName} before dispatch.
      </p>
      <p>
        Shipping and delivery do not include a separate energisation ritual unless explicitly stated
        in the relevant product listing or order confirmation.
      </p>
      <p>
        Our spiritual practices reflect the intention and purpose with which the products are
        prepared. They do not guarantee specific personal, financial, health, relationship or other
        outcomes.
      </p>

      <h2>10. Delays &amp; Exceptional Circumstances</h2>
      <p>
        We make reasonable efforts to dispatch and deliver orders within the stated timelines.
        However, delays may occur due to circumstances such as:
      </p>
      <ul>
        <li>Severe weather or natural events.</li>
        <li>Public holidays or festival-related delivery disruptions.</li>
        <li>Courier service interruptions.</li>
        <li>Incorrect or incomplete address details.</li>
        <li>Government restrictions or other unforeseen events.</li>
      </ul>
      <p>
        If we become aware of a significant delay, we will make reasonable efforts to communicate
        relevant updates. If your order remains undelivered beyond the expected timeframe, please
        contact our support team so we can investigate.
      </p>

      <h2>11. International Shipping, Customs &amp; Duties</h2>
      <p>International shipping is available only if expressly offered at checkout or on our website.</p>
      <p>
        For international orders, customs duties, import taxes or other charges may apply depending on
        the destination country’s rules. Unless the order price states otherwise, those charges are
        payable by the customer.
      </p>
      <p>
        Customers are responsible for providing accurate international shipping information and
        complying with applicable import requirements. Delivery timelines may be affected by customs
        clearance or local delivery procedures.
      </p>

      <h2>12. Company &amp; Contact Us</h2>
      <p>For questions about shipping, tracking or delivery, please contact:</p>
      <CompanyContactBlock />
      <p>
        Please include your order number in your communication so that we can assist you more
        efficiently. You can also use <Link href="/contact">Contact Us</Link>.
      </p>

      <h2>13. Policy Updates</h2>
      <p>
        {BUSINESS.displayName} may update this Shipping &amp; Delivery Policy from time
        to time. Any updated version will be published on our website with its revised effective
        date. Changes will not remove rights that customers are entitled to under applicable law.
      </p>
      <p>
        By placing an order, you acknowledge that you have read this policy and understand the
        shipping and delivery terms applicable to your purchase.
      </p>
    </LegalPage>
  );
}
