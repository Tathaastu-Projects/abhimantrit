import { useAuthStore } from "@/lib/auth-store";

/** Login/register URL that returns the shopper to checkout after sign-in. */
export function checkoutLoginHref(next = "/checkout") {
  const safe = next.startsWith("/") ? next : "/checkout";
  return `/account?next=${encodeURIComponent(safe)}`;
}

/** True when a store customer session is present. */
export function isCheckoutLoggedIn() {
  const { token, customer } = useAuthStore.getState();
  return Boolean(token && customer);
}

/**
 * If not logged in, send the user to account login and return false.
 * Call before navigating to /checkout (Buy Now / Proceed to checkout).
 */
export function requireCheckoutLogin(next = "/checkout"): boolean {
  if (isCheckoutLoggedIn()) return true;
  if (typeof window !== "undefined") {
    window.location.href = checkoutLoginHref(next);
  }
  return false;
}
