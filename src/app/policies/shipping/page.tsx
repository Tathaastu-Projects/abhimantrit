import { getCmsPage } from "@/lib/api";

async function CmsOrFallback({
  slug,
  title,
  fallback,
}: {
  slug: string;
  title: string;
  fallback: string[];
}) {
  const page = await getCmsPage(slug);
  return (
    <div className="container-pad max-w-3xl py-14">
      <h1 className="font-display text-4xl">{page?.title || title}</h1>
      {page?.content ? (
        <div className="mt-6 whitespace-pre-wrap leading-relaxed text-ink-soft">{page.content}</div>
      ) : (
        <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
          {fallback.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function ShippingPolicyPage() {
  return (
    <CmsOrFallback
      slug="shipping-policy"
      title="Shipping Policy"
      fallback={[
        "Orders typically ship within 24–48 hours after confirmation.",
        "Delivery timelines vary by pincode — usually 3–7 business days across India.",
        "You’ll receive updates once your order is dispatched.",
      ]}
    />
  );
}
