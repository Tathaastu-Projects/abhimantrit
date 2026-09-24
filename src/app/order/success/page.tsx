import Link from "next/link";

type Props = {
  searchParams: Promise<{ orderNumber?: string }>;
};

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { orderNumber } = await searchParams;

  return (
    <div className="container-pad py-20 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-brass">Order placed</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Thank you for your order</h1>
      {orderNumber ? (
        <p className="mt-4 text-lg text-ink-soft">
          Your order number is <span className="font-semibold text-temple">{orderNumber}</span>
        </p>
      ) : (
        <p className="mt-4 text-ink-soft">Your COD request was received.</p>
      )}
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
        We’ll confirm by phone/email. You can track status anytime with your order number and phone.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={
            orderNumber
              ? `/track-order?orderNumber=${encodeURIComponent(orderNumber)}`
              : "/track-order"
          }
          className="btn btn-primary"
        >
          Track order
        </Link>
        <Link href="/shop" className="btn btn-ghost">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
