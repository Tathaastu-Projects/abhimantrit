/**
 * Public business identity for storefront + payment gateway reviews (Razorpay, etc.).
 * Keep brand/legal names aligned with your Razorpay KYC application.
 */
export const BUSINESS = {
  /** Short brand name */
  brandName: "Abhimantrit",
  /** Public display name on policies / share title */
  displayName: "Abhimantrit by Tathasstu",
  /** Parent / group company */
  parentCompany: "Thrive Tech Land Private Limited",
  /** Legal entity name */
  legalName: "Thrive Tech Land Private Limited",
  founder: "Dr. Priyanka Singh",
  tagline: "Sacred Rudraksha, gemstones, crystals & spiritual jewellery",
  companyAbout:
    "Abhimantrit is a subsidiary of Thrive Tech Land Private Limited and operates within its group of companies, offering astrology, spiritual guidance, and holistic healing services through its platform.",
  email: "care@tathasstu.com",
  phone: "+91-9756303737",
  addressLines: ["201, 2nd Floor, Stellar 1423", "Noida-142"],
  hours: "Mon–Sat, 10:00 AM – 6:00 PM IST",
  certifications: ["✅ X-Ray & Lab-Certified", "📦 Free-Insured Worldwide Shipping"],
} as const;

export function supportEmail(override?: string | null) {
  return (override && override.trim()) || BUSINESS.email;
}

export function supportPhone(override?: string | null) {
  const fromApi = override?.trim();
  if (fromApi && !/x+/i.test(fromApi)) return fromApi;
  return BUSINESS.phone.trim() || "";
}

export function businessAddressText() {
  return BUSINESS.addressLines.join(", ");
}
