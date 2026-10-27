import Link from "next/link";
import { BUSINESS, supportEmail, supportPhone, businessAddressText } from "@/lib/business";

/** Shared company + contact block for Terms / Privacy / Refund / Shipping. */
export function CompanyContactBlock() {
  const email = supportEmail();
  const phone = supportPhone();

  return (
    <>
      <p>{BUSINESS.companyAbout}</p>
      <ul>
        <li>
          <strong>Brand:</strong> {BUSINESS.displayName}
        </li>
        <li>
          <strong>Legal entity:</strong> {BUSINESS.legalName}
        </li>
        <li>
          <strong>Website:</strong> <Link href="/">this website</Link>
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
        </li>
        {phone ? (
          <li>
            <strong>Mobile:</strong>{" "}
            <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
          </li>
        ) : null}
        <li>
          <strong>Business address:</strong> {businessAddressText()}
        </li>
      </ul>
    </>
  );
}
