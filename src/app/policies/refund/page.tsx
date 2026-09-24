import { getCmsPage } from "@/lib/api";

export default async function RefundPolicyPage() {
  const page = await getCmsPage("refund-policy");
  return (
    <div className="container-pad max-w-3xl py-14">
      <h1 className="font-display text-4xl">{page?.title || "Returns & Refunds"}</h1>
      {page?.content ? (
        <div className="mt-6 whitespace-pre-wrap leading-relaxed text-ink-soft">{page.content}</div>
      ) : (
        <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
          <p>
            If an item arrives damaged or not as described, contact us within 7 days with photos and
            your order number.
          </p>
          <p>
            Personalized or energized ritual items may have limited return eligibility — we’ll guide
            you case by case.
          </p>
        </div>
      )}
    </div>
  );
}
