/**
 * Public business identity for storefront + payment gateway reviews (Razorpay, etc.).
 * Keep brand/legal names aligned with your Razorpay KYC application.
 *
 * Update phone / address here before go-live so Contact + footer match your documents.
 */
export const BUSINESS = {
  /** Trading / brand name shown on the site */
  brandName: "Tathaastu",
  /** Legal / application name — must match Razorpay application */
  legalName: "Tathaastu",
  founder: "Priyanka Singh",
  tagline: "Sacred Rudraksha, gemstones, crystals & spiritual jewellery",
  email: "hello@tathaastu.in",
  /**
   * Set your real support number before Razorpay review.
   * Leave empty to hide phone until configured.
   */
  phone: "",
  addressLines: [
    "Tathaastu",
    "Operated by Priyanka Singh",
    "India — online storefront for sacred products",
  ],
  hours: "Mon–Sat, 10:00 AM – 6:00 PM IST",
  certifications: ["X-Ray & Lab Certified", "Free Insured Worldwide Shipping"],
} as const;

export function supportEmail(override?: string | null) {
  return (override && override.trim()) || BUSINESS.email;
}

export function supportPhone(override?: string | null) {
  const fromApi = override?.trim();
  if (fromApi && !/x+/i.test(fromApi)) return fromApi;
  return BUSINESS.phone.trim() || "";
}
