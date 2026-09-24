/**
 * Runtime config — ports/URLs come only from env (`.env`).
 * Never hardcode localhost ports here.
 */

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing. Set it in .env (e.g. http://localhost:YOUR_BACKEND_PORT).",
    );
  }
  return url.replace(/\/$/, "");
}

export function getApiBaseUrlOrEmpty(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim();
  return url ? url.replace(/\/$/, "") : "";
}
