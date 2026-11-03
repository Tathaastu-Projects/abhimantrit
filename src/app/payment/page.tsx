"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  cancelUnpaidOrder,
  verifyEasebuzzPayment,
  type EasebuzzVerifyResult,
} from "@/lib/api";
import { useCartStore } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";

type Phase = "verifying" | "success" | "failure";

function PaymentReturnInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clear = useCartStore((s) => s.clear);
  const [phase, setPhase] = useState<Phase>("verifying");
  const [result, setResult] = useState<EasebuzzVerifyResult | null>(null);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const payload: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        payload[key] = value;
      });

      if (!payload.txnid && !payload.orderId && !payload.orderNumber) {
        if (!cancelled) {
          setPhase("failure");
          setError("Missing payment return details. Please contact support with your order number.");
        }
        return;
      }

      try {
        const verified = await verifyEasebuzzPayment(payload);
        if (cancelled) return;
        setResult(verified);

        if (verified.verified && verified.status === "success") {
          clear();
          setPhase("success");
          const number = verified.orderNumber || verified.order?.orderNumber;
          if (number) {
            // Soft redirect so user sees brief confirmation, then success page
            window.setTimeout(() => {
              router.replace(
                `/order/success?orderNumber=${encodeURIComponent(number)}`,
              );
            }, 1200);
          }
        } else {
          setPhase("failure");
          setError(verified.message || "Payment could not be verified.");
        }
      } catch (err) {
        if (cancelled) return;
        setPhase("failure");
        setError(err instanceof Error ? err.message : "Payment verification failed");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [searchParams, clear, router]);

  async function onCancelUnpaid() {
    const orderId = result?.orderId || searchParams.get("orderId");
    if (!orderId) return;
    setCancelling(true);
    try {
      await cancelUnpaidOrder(orderId);
      router.push("/cart");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not cancel unpaid order");
      setCancelling(false);
    }
  }

  const orderNumber =
    result?.orderNumber || result?.order?.orderNumber || searchParams.get("orderNumber") || "";
  const total = result?.order?.pricing?.total;
  const amountLabel = result?.amount || (total != null ? String(total) : "");

  if (phase === "verifying") {
    return (
      <div className="container-pad py-20 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-brass">Easebuzz</p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl">Verifying payment…</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
          Please wait while we confirm your payment with the bank. Do not close this window.
        </p>
        <div className="mx-auto mt-8 h-10 w-10 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
      </div>
    );
  }

  if (phase === "success") {
    return (
      <div className="container-pad py-20 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-brass">Payment successful</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Thank you</h1>
        {orderNumber ? (
          <p className="mt-4 text-lg text-ink-soft">
            Order <span className="font-semibold text-temple">{orderNumber}</span> is confirmed.
          </p>
        ) : null}
        {amountLabel ? (
          <p className="mt-2 text-sm text-ink-soft">
            Amount paid:{" "}
            {Number.isFinite(Number(amountLabel))
              ? formatINR(Number(amountLabel))
              : `₹${amountLabel}`}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-ink-soft">Redirecting to your order confirmation…</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={
              orderNumber
                ? `/order/success?orderNumber=${encodeURIComponent(orderNumber)}`
                : "/order/success"
            }
            className="btn btn-primary"
          >
            View confirmation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-pad py-20 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-sale">Payment failed</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Payment not completed</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">
        {error || "Your payment was not successful. You can retry from checkout or switch to COD."}
      </p>
      {orderNumber ? (
        <p className="mt-3 text-sm text-ink-soft">
          Order reference: <span className="font-semibold text-ink">{orderNumber}</span>
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/checkout" className="btn btn-primary">
          Retry checkout
        </Link>
        <Link href="/cart" className="btn btn-ghost">
          Back to cart
        </Link>
        {(result?.orderId || searchParams.get("orderId")) && (
          <button
            type="button"
            disabled={cancelling}
            onClick={onCancelUnpaid}
            className="btn btn-ghost disabled:opacity-60"
          >
            {cancelling ? "Cancelling…" : "Cancel unpaid order"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="container-pad py-20 text-center">
          <div className="skeleton mx-auto h-40 max-w-lg" />
        </div>
      }
    >
      <PaymentReturnInner />
    </Suspense>
  );
}
