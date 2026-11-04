import Link from "next/link";

type Props = {
  searchParams: Promise<{ orderNumber?: string; reason?: string }>;
};

export default async function OrderFailedPage({ searchParams }: Props) {
  const { orderNumber, reason } = await searchParams;

  return (
    <div className="container-pad py-20 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-sale">Payment failed</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">We couldn&apos;t complete payment</h1>
      {orderNumber ? (
        <p className="mt-4 text-lg text-ink-soft">
          Order <span className="font-semibold text-temple">{orderNumber}</span> was not paid.
        </p>
      ) : (
        <p className="mt-4 text-ink-soft">Your online payment did not go through.</p>
      )}
      {reason ? <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">{reason}</p> : null}
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
        Your cart was cleared when payment started. Please add items again, or contact support with
        your order number if money was deducted.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn btn-primary">
          Continue shopping
        </Link>
        <Link
          href={
            orderNumber
              ? `/track-order?orderNumber=${encodeURIComponent(orderNumber)}`
              : "/track-order"
          }
          className="btn btn-ghost"
        >
          Track order
        </Link>
      </div>
    </div>
  );
}
