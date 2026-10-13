import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { BUSINESS, supportEmail } from "@/lib/business";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of use and sale for Abhimantrit by ${BUSINESS.brandName}.`,
};

export default function TermsPage() {
  const email = supportEmail();

  return (
    <LegalPage title="Terms & Conditions" updated="13 October 2026">
      <p>
        Welcome to <strong>Abhimantrit by {BUSINESS.brandName}</strong>. These Terms &amp;
        Conditions (“Terms”) govern your access to and use of our website and your purchase of
        products and related services offered through it.
      </p>
      <p>
        Abhimantrit by {BUSINESS.brandName} offers spiritual products, including crystals,
        bracelets, anklets, malas, rudraksha, pyramids, spiritual frames, crystal trees, loose
        stones and other spiritual accessories. Our products are prepared and abhimantrit
        (pre-energised) through sacred practices and positive intentions before being shipped to
        customers.
      </p>
      <p>
        Throughout these Terms, “Abhimantrit”, “we”, “our” and “us” refer to Abhimantrit by{" "}
        {BUSINESS.brandName} and its relevant operating entity. “You” and “your” refer to any
        individual accessing our website or purchasing our products.
      </p>
      <p>
        By accessing our website or placing an order, you agree to these Terms &amp; Conditions. If
        you do not agree with these Terms, please refrain from using our website.
      </p>

      <h2>1. Use of Our Website</h2>
      <p>You agree to use our website only for lawful purposes and in accordance with these Terms.</p>
      <p>When using our website, you agree:</p>
      <ul>
        <li>To provide accurate and complete information when placing an order or contacting us.</li>
        <li>To use the website for personal, lawful purposes.</li>
        <li>
          Not to misuse, disrupt or attempt to interfere with the website’s functionality or
          security.
        </li>
        <li>Not to submit false, misleading or fraudulent information.</li>
        <li>
          Not to reproduce, distribute or commercially exploit website content without prior written
          permission.
        </li>
        <li>Not to engage in activities that violate applicable laws or infringe the rights of others.</li>
      </ul>
      <p>
        We reserve the right to restrict or suspend access where reasonably necessary due to fraud,
        misuse, security concerns or a material violation of these Terms, subject to applicable law.
      </p>

      <h2>2. Our Products</h2>
      <p>
        Abhimantrit by {BUSINESS.brandName} offers spiritual products intended for personal use,
        gifting, spiritual practices and related purposes.
      </p>
      <p>Our product range may include:</p>
      <ul>
        <li>Crystal bracelets and anklets</li>
        <li>Individual crystals and loose stones</li>
        <li>Crystal tumbles</li>
        <li>Malas and rudraksha products</li>
        <li>Crystal trees</li>
        <li>Spiritual frames</li>
        <li>Pyramids and other spiritual accessories</li>
        <li>Other products listed on our website from time to time</li>
      </ul>
      <p>
        Product availability, specifications, prices and descriptions are displayed on the relevant
        product pages.
      </p>
      <p>
        We make reasonable efforts to ensure that product descriptions, photographs and other
        information are accurate. However, certain variations in colour, shape, size, pattern,
        texture and appearance may occur, particularly with natural crystals, stones, rudraksha and
        other naturally sourced materials.
      </p>
      <p>
        Such natural variations do not necessarily indicate a defect or a difference in the
        product’s intended characteristics.
      </p>
      <p>
        Customers are encouraged to review the product description, specifications, dimensions and
        other available details before placing an order.
      </p>

      <h2>3. Abhimantrit Products and Spiritual Significance</h2>
      <p>
        A defining feature of Abhimantrit by {BUSINESS.brandName} is that our products are
        abhimantrit, meaning they are prepared and pre-energised through sacred practices and
        positive intentions before shipping.
      </p>
      <p>
        Product descriptions may explain the traditional spiritual significance, commonly associated
        benefits or intended purpose of individual products.
      </p>
      <p>By purchasing our products, you acknowledge that:</p>
      <ul>
        <li>
          Spiritual significance and traditional beliefs associated with crystals, rudraksha and
          other spiritual items may vary across traditions and individual beliefs.
        </li>
        <li>
          Descriptions of spiritual benefits are provided for general informational purposes and
          should not be interpreted as guarantees of specific results.
        </li>
        <li>
          We do not guarantee particular outcomes relating to wealth, luck, relationships, marriage,
          career, business, health, protection or any other aspect of life.
        </li>
        <li>Individual experiences and beliefs may differ.</li>
        <li>
          Products are not substitutes for medical treatment, mental health care, financial advice,
          legal advice or other professional services.
        </li>
      </ul>
      <p>
        Our abhimantrit preparation process reflects the spiritual practices and intentions
        associated with our brand. It does not constitute a promise of scientifically established
        effects or guaranteed outcomes.
      </p>

      <h2>4. Product Images and Descriptions</h2>
      <p>
        We aim to represent our products as accurately as reasonably possible through product
        photographs, descriptions and specifications.
      </p>
      <p>
        However, the appearance of a product on your screen may differ slightly from the physical
        item due to lighting, photography, display settings and the natural characteristics of the
        materials used.
      </p>
      <p>
        Where products are made using natural stones or other naturally varying materials, each item
        may have individual characteristics.
      </p>
      <p>
        Any images, illustrations or representations used to explain the appearance, use or spiritual
        significance of a product should be read alongside its written description.
      </p>
      <p>
        If you have questions about a product’s size, material, appearance or specifications, please
        contact us before placing your order.
      </p>

      <h2>5. Pricing and Product Availability</h2>
      <p>All product prices will be displayed on the website at the time of purchase.</p>
      <p>Unless otherwise stated:</p>
      <ul>
        <li>Prices are subject to change before an order is placed.</li>
        <li>Applicable taxes and delivery charges will be displayed or communicated as required.</li>
        <li>Promotional offers may be subject to separate eligibility conditions and validity periods.</li>
        <li>Product availability may change depending on inventory and operational requirements.</li>
      </ul>
      <p>
        If a product becomes unavailable after an order is placed, we will communicate the issue and
        explain the available options, which may include an alternative arrangement or a refund, as
        appropriate under our policies and applicable law.
      </p>
      <p>
        We reserve the right to correct genuine pricing, listing or typographical errors. Where an
        error materially affects a confirmed order, we will communicate with the customer and resolve
        the matter in accordance with applicable law.
      </p>

      <h2>6. Orders and Order Confirmation</h2>
      <p>
        When placing an order, you are responsible for reviewing the selected products, quantities,
        prices, delivery address and contact details before completing the purchase.
      </p>
      <p>
        An order will be processed after the applicable checkout and payment requirements have been
        fulfilled.
      </p>
      <p>
        An order confirmation indicates that we have received your order. Any further confirmation
        or communication concerning acceptance, dispatch or delivery will be provided through the
        relevant order notifications.
      </p>
      <p>
        We reserve the right to investigate or decline orders involving suspected fraud, unauthorised
        transactions, materially incorrect information or other legitimate concerns, subject to
        applicable law.
      </p>
      <p>
        If we cannot fulfil a paid order, we will communicate the issue and provide an appropriate
        resolution, including a refund where applicable.
      </p>

      <h2>7. Payments</h2>
      <p>Payments must be made through the payment methods made available on our website.</p>
      <p>
        Depending on the available checkout options, these may include digital payment methods,
        cards, net banking, UPI or other authorised payment facilities.
      </p>
      <p>
        By completing a transaction, you confirm that you are authorised to use the selected payment
        method.
      </p>
      <p>
        Payments may be processed by third-party payment service providers and may be subject to
        their applicable terms and conditions.
      </p>
      <p>
        If an amount is deducted but your order is not confirmed, please contact our support team
        with the relevant transaction details so that we can investigate the matter.
      </p>
      <p>
        Any duplicate payments, failed transactions or eligible refunds will be handled in accordance
        with our applicable policies and legal obligations.
      </p>

      <h2>8. Shipping and Delivery</h2>
      <p>
        We aim to process and dispatch orders within the estimated timelines communicated on our
        website or at checkout.
      </p>
      <p>
        Delivery timelines are estimates and may vary depending on the delivery location, courier
        operations, weather conditions, public holidays, operational delays and other circumstances
        beyond our reasonable control.
      </p>
      <p>
        Customers are responsible for providing accurate and complete shipping information, including
        the recipient’s name, address, postal code and contact number.
      </p>
      <p>
        Abhimantrit by {BUSINESS.brandName} will not be responsible for delays caused by incorrect or
        incomplete delivery information supplied by the customer, although we will make reasonable
        efforts to assist with delivery-related issues.
      </p>
      <p>
        Where an order is delayed, damaged, lost or marked as delivered but not received, customers
        should contact our support team so that the matter can be investigated with the relevant
        delivery partner.
      </p>
      <p>
        Please refer to our <Link href="/policies/shipping">Shipping &amp; Delivery Policy</Link> for
        detailed information about dispatch, delivery estimates, shipping charges and delivery-related
        queries.
      </p>

      <h2>9. Cancellations, Returns and Refunds</h2>
      <p>We understand that customers may occasionally need to cancel an order or report an issue with a product.</p>
      <p>
        Cancellation, return, replacement and refund requests will be handled in accordance with our
        published{" "}
        <Link href="/policies/refund">Refund, Return &amp; Replacement Policy</Link> and applicable
        consumer protection laws.
      </p>
      <p>
        Depending on the circumstances and the applicable policy, customers may be asked to provide
        the order number, photographs of the product or packaging, or other information reasonably
        necessary to assess the request.
      </p>
      <p>
        Where an order is eligible for cancellation, return, replacement or refund, the applicable
        procedure and timelines will be communicated to the customer.
      </p>
      <p>
        If a product arrives damaged, defective or materially different from its description, please
        contact us promptly with the relevant details so that we can review the issue and provide an
        appropriate resolution.
      </p>
      <p>
        Nothing in these Terms is intended to remove or restrict any consumer rights or remedies that
        cannot legally be excluded.
      </p>

      <h2>10. Product Care and Use</h2>
      <p>Customers are responsible for using, handling and maintaining purchased products appropriately.</p>
      <p>
        Where relevant, product-specific care instructions may be provided on the website, with the
        product or through customer support.
      </p>
      <p>
        Natural stones, crystals, beads, threads, metals and other materials may have different care
        requirements. Some materials may be sensitive to water, sunlight, chemicals, impact or other
        environmental conditions.
      </p>
      <p>
        Customers should follow the applicable care instructions and avoid exposing products to
        conditions that may damage them.
      </p>
      <p>
        Products should be kept away from children and pets where small parts, breakable materials or
        other physical hazards may present a risk.
      </p>
      <p>
        Unless expressly stated otherwise, products are intended for their described ornamental,
        personal, gifting or spiritual uses and are not intended to be ingested or used as medical
        devices.
      </p>

      <h2>11. Customer Conduct</h2>
      <p>Customers are expected to interact respectfully with our team and service providers.</p>
      <p>You agree not to:</p>
      <ul>
        <li>Submit fraudulent orders or knowingly provide false information.</li>
        <li>Abuse, threaten or harass our employees, representatives or customer support team.</li>
        <li>Attempt to exploit promotions or payment systems through fraudulent means.</li>
        <li>Interfere with the security or operation of our website.</li>
        <li>Use our website for unlawful activities.</li>
        <li>Infringe our intellectual property rights or those of third parties.</li>
      </ul>
      <p>
        We may take reasonable action in response to violations of these Terms, including restricting
        access or declining future transactions where appropriate and legally permissible.
      </p>
      <p>
        Any action affecting a confirmed order or a customer’s rights will remain subject to
        applicable law and the relevant order policies.
      </p>

      <h2>12. Intellectual Property</h2>
      <p>
        All website content, including text, product descriptions, photographs, graphics, logos,
        illustrations, videos, original designs and other creative materials, is owned by or licensed
        to Abhimantrit by {BUSINESS.brandName}, unless otherwise indicated.
      </p>
      <p>
        The Abhimantrit by {BUSINESS.brandName} name, branding, logos and associated creative assets
        may not be copied, reproduced, modified, distributed or commercially used without prior
        written authorisation from the relevant rights holder, except where permitted by law.
      </p>
      <p>
        Purchasing a product does not transfer ownership of the brand’s intellectual property rights
        to the customer.
      </p>
      <p>All rights not expressly granted remain with their respective owners.</p>

      <h2>13. Third-Party Services and Links</h2>
      <p>
        Our website may use or link to third-party services, including payment gateways, courier
        tracking platforms, analytics tools and social media websites.
      </p>
      <p>
        These services may operate independently and may be governed by their own terms and privacy
        policies.
      </p>
      <p>
        We do not control the independent operations, content or privacy practices of third-party
        websites. However, our own obligations to customers remain subject to applicable law.
      </p>
      <p>We encourage customers to review the relevant third-party terms before using external services.</p>

      <h2>14. Website Availability and Accuracy</h2>
      <p>
        We make reasonable efforts to maintain the website, product listings and checkout facilities
        in working order.
      </p>
      <p>
        However, temporary interruptions, technical errors, maintenance, inaccuracies or delays may
        occasionally occur.
      </p>
      <p>
        We reserve the right to update website content, modify product listings or temporarily
        suspend features where reasonably necessary for maintenance, security or operational
        purposes.
      </p>
      <p>
        Such changes will not remove any rights or remedies that customers have already acquired under
        applicable law.
      </p>

      <h2>15. Limitation of Liability</h2>
      <p>
        To the extent permitted by applicable law, Abhimantrit by {BUSINESS.brandName} will not be
        responsible for indirect or consequential losses arising from the use or inability to use our
        website or from reliance on general spiritual descriptions of our products.
      </p>
      <p>
        We do not guarantee that purchasing or using any product will produce a particular spiritual,
        financial, emotional, relationship-related, health-related or other outcome.
      </p>
      <p>
        Customers remain responsible for their own decisions and for using products in accordance
        with the relevant descriptions and care instructions.
      </p>
      <p>
        Nothing in these Terms excludes or limits liability where such exclusion or limitation is
        prohibited by law, including liability that cannot legally be waived.
      </p>
      <p>These Terms do not affect any statutory consumer rights or remedies available to you.</p>

      <h2>16. Privacy and Personal Information</h2>
      <p>
        Your use of our website and purchase of products are also governed by our{" "}
        <Link href="/policies/privacy">Privacy Policy</Link>.
      </p>
      <p>
        The Privacy Policy explains how we collect, use, store and protect personal information,
        including information required for order processing, payments, delivery and customer support.
      </p>
      <p>
        Where consent is required for the collection or use of personal information, the applicable
        consent requirements will apply.
      </p>

      <h2>17. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time to reflect changes in our products, website
        functionality, business practices or applicable laws.
      </p>
      <p>Revised Terms will be published on this page with an updated “Last Updated” date.</p>
      <p>
        Changes will apply prospectively where appropriate and will not remove rights or remedies
        that have already accrued. Where required by law, we will provide notice of material changes
        or obtain any necessary consent.
      </p>
      <p>We encourage customers to review these Terms periodically.</p>

      <h2>18. Governing Law and Jurisdiction</h2>
      <p>
        These Terms will be governed by the laws of India, subject to applicable consumer protection
        and other mandatory legal requirements.
      </p>
      <p>
        Any dispute arising from the use of our website or the purchase of our products will be
        handled by the competent courts or forums having jurisdiction under applicable law.
      </p>
      <p>
        Nothing in this section prevents a customer from exercising statutory rights or approaching a
        consumer commission or other forum where legally entitled to do so.
      </p>

      <h2>19. Contact Us</h2>
      <p>
        If you have questions, concerns or requests relating to these Terms, our products or an
        order, please contact us using the details below.
      </p>
      <ul>
        <li>
          <strong>Brand:</strong> Abhimantrit by {BUSINESS.brandName}
        </li>
        <li>
          <strong>Website:</strong> <Link href="/">this website</Link>
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>
          <strong>Business name:</strong> {BUSINESS.legalName}, operated by {BUSINESS.founder}
        </li>
        <li>
          <strong>Business address:</strong> {BUSINESS.addressLines.join(", ")}
        </li>
      </ul>
      <p>
        We will make reasonable efforts to address your enquiry and respond in accordance with
        applicable law. You can also use our <Link href="/contact">Contact Us</Link> page.
      </p>
      <p>
        By accessing our website or placing an order, you acknowledge that you have read and
        understood these Terms &amp; Conditions, subject to your applicable statutory rights and any
        consent requirements imposed by law.
      </p>
    </LegalPage>
  );
}
