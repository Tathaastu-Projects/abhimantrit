import { getCmsPage } from "@/lib/api";

export default async function PrivacyPolicyPage() {
  const page = await getCmsPage("privacy-policy");
  return (
    <div className="container-pad max-w-3xl py-14">
      <h1 className="font-display text-4xl">{page?.title || "Privacy Policy"}</h1>
      {page?.content ? (
        <div className="mt-6 whitespace-pre-wrap leading-relaxed text-ink-soft">{page.content}</div>
      ) : (
        <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
          <p>
            We collect only what we need to fulfill orders and respond to consultations — name, phone,
            email, and shipping details.
          </p>
          <p>
            We do not sell personal data. Payment gateway details are handled by PCI-compliant
            providers when online pay is enabled.
          </p>
        </div>
      )}
    </div>
  );
}
