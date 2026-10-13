import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { BUSINESS, supportEmail } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How Abhimantrit by ${BUSINESS.brandName} collects, uses, and protects your personal information.`,
};

export default function PrivacyPolicyPage() {
  const email = supportEmail();

  return (
    <LegalPage title="Privacy Policy" updated="13 October 2026">
      <p>
        At <strong>Abhimantrit by {BUSINESS.brandName}</strong> (“we”, “our” or “us”), we value your
        trust and are committed to protecting your personal information. This Privacy Policy
        explains how we collect, use, store and protect your information when you visit our website,
        browse our products, place an order, contact us or use any of our services.
      </p>
      <p>
        Abhimantrit by {BUSINESS.brandName} offers spiritual products that are prepared and
        abhimantrit (energised) through sacred practices and positive intentions before being shipped
        to customers.
      </p>
      <p>
        By accessing our website or placing an order, you acknowledge that you have read this
        Privacy Policy. Where consent is required for the collection or processing of personal
        information, we will seek it in accordance with applicable law.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following categories of information when you interact with our website.</p>

      <h3>a. Personal Information</h3>
      <p>
        When you create an account, place an order, contact us or subscribe to our communications, we
        may collect:
      </p>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Mobile number</li>
        <li>Billing and shipping address</li>
        <li>City, state, postal code and country</li>
        <li>
          Any other information you voluntarily provide through our website or customer support
          channels
        </li>
      </ul>

      <h3>b. Order and Transaction Information</h3>
      <p>When you purchase products from our website, we may collect information relating to:</p>
      <ul>
        <li>Products purchased and quantities ordered</li>
        <li>Order numbers and order history</li>
        <li>Order confirmation and fulfilment status</li>
        <li>Payment status and transaction references</li>
        <li>Shipping, delivery, cancellation and refund details</li>
        <li>Customer support requests relating to your orders</li>
      </ul>
      <p>
        Payments may be processed by third-party payment service providers. We do not intend to
        collect or store complete payment card details, banking passwords or other sensitive payment
        credentials on our own systems.
      </p>

      <h3>c. Customer Communications</h3>
      <p>
        If you contact us with questions about our products, their spiritual significance, product
        selection, order status, delivery or other matters, we may retain the information you provide
        to respond to your enquiry and improve our customer service.
      </p>

      <h3>d. Technical and Usage Information</h3>
      <p>When you visit our website, certain information may be collected automatically, including:</p>
      <ul>
        <li>IP address and general location information derived from it</li>
        <li>Browser type and device information</li>
        <li>Operating system</li>
        <li>Pages viewed and products browsed</li>
        <li>Referring websites and time spent on our website</li>
        <li>Cookies and similar tracking technologies, where applicable</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information collected for purposes including:</p>
      <ul>
        <li>To process, confirm and fulfil your orders.</li>
        <li>To arrange product packaging, dispatch and delivery.</li>
        <li>
          To communicate order confirmations, payment updates, shipping notifications and delivery
          information.
        </li>
        <li>To respond to customer enquiries and provide after-sales support.</li>
        <li>To process cancellations, returns and refunds in accordance with our applicable policies.</li>
        <li>To maintain order histories, transaction records and accounting information.</li>
        <li>To improve our products, website functionality and shopping experience.</li>
        <li>To understand customer preferences and evaluate website performance.</li>
        <li>To detect and prevent fraudulent transactions, misuse and unauthorised activity.</li>
        <li>
          To send product updates, offers, newsletters and promotional communications where permitted
          by law and subject to applicable consent requirements.
        </li>
        <li>To comply with applicable legal, regulatory and accounting obligations.</li>
      </ul>
      <p>
        We will not use your personal information for purposes unrelated to those described in this
        policy unless we have an appropriate legal basis to do so.
      </p>

      <h2>3. Order Processing and Delivery</h2>
      <p>
        To deliver your purchases, we may share the information necessary to fulfil your order with
        relevant service providers, including payment processors, logistics partners and courier
        companies.
      </p>
      <p>
        This may include your name, contact number, delivery address, order reference and information
        required to identify or deliver your package.
      </p>
      <p>
        Such information will be shared only to the extent reasonably necessary for order processing,
        delivery, customer support or other relevant operational purposes.
      </p>

      <h2>4. Cookies and Similar Technologies</h2>
      <p>
        Our website may use cookies and similar technologies to improve functionality, remember
        customer preferences, understand website traffic and support marketing activities.
      </p>
      <p>These technologies may help us:</p>
      <ul>
        <li>Keep essential website features functioning.</li>
        <li>Remember shopping preferences and improve navigation.</li>
        <li>Understand how customers browse products and interact with our website.</li>
        <li>Measure website performance and marketing effectiveness, where applicable.</li>
      </ul>
      <p>
        You may manage or disable cookies through your browser settings. Disabling certain cookies may
        affect some website features.
      </p>
      <p>
        Where required by applicable law, we will seek consent before using non-essential cookies or
        similar tracking technologies.
      </p>

      <h2>5. Sharing of Personal Information</h2>
      <p>We do not sell your personal information to third parties.</p>
      <p>We may share relevant information with the following categories of recipients where necessary:</p>
      <ul>
        <li>
          <strong>Payment service providers:</strong> To process payments, verify transactions and
          facilitate refunds.
        </li>
        <li>
          <strong>Courier and logistics partners:</strong> To dispatch, transport and deliver orders.
        </li>
        <li>
          <strong>Website and e-commerce service providers:</strong> To operate our website, shopping
          cart, checkout process and order management systems.
        </li>
        <li>
          <strong>Communication providers:</strong> To send order confirmations, delivery updates and
          customer support communications.
        </li>
        <li>
          <strong>Analytics and marketing providers:</strong> To measure website performance and
          manage promotional activities, where applicable and subject to relevant consent
          requirements.
        </li>
        <li>
          <strong>Professional advisers:</strong> Such as legal, accounting or compliance
          professionals, where necessary.
        </li>
        <li>
          <strong>Government authorities and law enforcement:</strong> Where disclosure is required by
          applicable law or a valid legal process.
        </li>
        <li>
          <strong>Business successors:</strong> In connection with a merger, restructuring,
          acquisition or transfer of business assets, subject to applicable legal requirements.
        </li>
      </ul>
      <p>We aim to limit the information shared to what is reasonably necessary for the relevant purpose.</p>

      <h2>6. Third-Party Websites and Services</h2>
      <p>
        Our website may contain links to third-party websites, payment gateways, delivery tracking
        platforms or social media services.
      </p>
      <p>
        These third parties operate independently and may have their own privacy policies and data
        handling practices. Abhimantrit by {BUSINESS.brandName} does not control the privacy
        practices or security measures of independent third-party websites.
      </p>
      <p>
        We encourage you to review their privacy policies before sharing personal information
        directly with them.
      </p>

      <h2>7. Data Storage and Security</h2>
      <p>
        We take reasonable measures to protect your personal information against unauthorised access,
        disclosure, alteration, loss or misuse.
      </p>
      <p>
        These measures may include appropriate technical safeguards, access restrictions and the use
        of reputable service providers.
      </p>
      <p>
        Access to customer information is intended to be limited to authorised individuals and
        service providers who need it for legitimate business purposes.
      </p>
      <p>
        However, no electronic transmission or storage system can be guaranteed to be completely
        secure. While we take reasonable steps to safeguard your information, we cannot guarantee
        absolute security.
      </p>

      <h2>8. Data Retention</h2>
      <p>
        We retain personal information for as long as reasonably necessary to fulfil the purposes for
        which it was collected, including processing orders, providing customer support, maintaining
        transaction records, resolving disputes and complying with applicable legal requirements.
      </p>
      <p>
        Certain information, including invoices and transaction records, may need to be retained for
        legally prescribed periods.
      </p>
      <p>
        When personal information is no longer required, we will take reasonable steps to delete it,
        anonymise it or otherwise dispose of it securely, subject to applicable retention
        obligations.
      </p>

      <h2>9. Your Privacy Rights and Choices</h2>
      <p>Subject to applicable law, you may have the right to:</p>
      <ul>
        <li>Request information about the personal data we hold about you.</li>
        <li>Request correction or updating of inaccurate or incomplete information.</li>
        <li>Withdraw consent where consent is the applicable legal basis for processing.</li>
        <li>
          Request deletion of personal information where legally permissible and where retention is no
          longer required.
        </li>
        <li>Opt out of promotional emails or other marketing communications.</li>
        <li>Raise concerns or grievances regarding the handling of your personal information.</li>
      </ul>
      <p>
        You may unsubscribe from promotional emails by using the unsubscribe mechanism provided in
        the communication, where available. You may also contact us directly to manage your
        communication preferences.
      </p>
      <p>
        Please note that withdrawing consent or requesting deletion may affect our ability to provide
        certain services. We may retain information where permitted or required by law.
      </p>
      <p>
        To exercise your privacy rights, please contact us using the details in the Contact Us
        section below. We may need to verify your identity before acting on your request.
      </p>

      <h2>10. Children’s Privacy</h2>
      <p>
        Our website is not intended to be used independently by children without appropriate parental
        or guardian involvement where required by law.
      </p>
      <p>
        We do not knowingly collect children’s personal information in circumstances where such
        collection is prohibited. If we become aware that personal information has been collected in
        violation of applicable requirements, we will take appropriate steps to address the matter.
      </p>
      <p>
        Where applicable law requires parental consent or other safeguards for processing a child’s
        personal information, we will follow the relevant requirements.
      </p>

      <h2>11. International Data Processing</h2>
      <p>
        Depending on the service providers and technology used to operate our website, personal
        information may be processed or stored in locations outside your state or country of
        residence.
      </p>
      <p>
        Where applicable, such processing will be subject to the requirements of relevant data
        protection laws and any restrictions on international transfers of personal information.
      </p>

      <h2>12. Updates to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our products,
        website functionality, business practices or applicable laws.
      </p>
      <p>
        Any revised policy will be published on this page along with an updated “Last Updated” date.
        We encourage you to review this page periodically to remain informed about how we handle
        personal information.
      </p>

      <h2>13. Contact Us</h2>
      <p>
        If you have any questions, concerns or requests regarding this Privacy Policy or the handling
        of your personal information, please contact us:
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
        We will review and respond to privacy-related enquiries in accordance with applicable law.
        You can also reach us through <Link href="/contact">Contact Us</Link>.
      </p>
      <p>
        By using our website and services, you acknowledge this Privacy Policy and understand how
        your personal information may be handled as described above, subject to applicable consent
        requirements and legal rights.
      </p>
    </LegalPage>
  );
}
