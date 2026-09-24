import { getApiBaseUrl, getApiBaseUrlOrEmpty } from "@/lib/env";
import type {
  CatalogParams,
  CatalogResponse,
  CollectionDetail,
  CouponValidation,
  HomeContent,
  StoreBanner,
  StoreBlogPost,
  StoreCmsPage,
  StoreCustomer,
  StoreMenu,
  StoreMeta,
  StoreProduct,
  StoreReview,
  WishlistItem,
} from "@/types/product";

const API_BASE = getApiBaseUrlOrEmpty();

type ApiResult<T> = {
  success: boolean;
  data: T;
  message?: string;
  pagination?: CatalogResponse["pagination"];
  facets?: CatalogResponse["facets"];
  priceStats?: CatalogResponse["priceStats"];
  sortOptions?: CatalogResponse["sortOptions"];
  appliedFilters?: CatalogResponse["appliedFilters"];
  products?: StoreProduct[];
};

type AuthOpts = {
  token?: string | null;
  guestId?: string | null;
};

function toQuery(params?: Record<string, string | number | boolean | undefined | null>) {
  const q = new URLSearchParams();
  if (!params) return "";
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    q.set(key, String(value));
  });
  const s = q.toString();
  return s ? `?${s}` : "";
}

async function apiFetch<T>(path: string, init?: RequestInit, auth?: AuthOpts): Promise<T> {
  const base = API_BASE || getApiBaseUrl();
  const isServer = typeof window === "undefined";
  const method = init?.method || "GET";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
  if (auth?.guestId) headers["X-Guest-Id"] = auth.guestId;

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers,
    ...(isServer && method === "GET"
      ? { next: { revalidate: 30 } }
      : { cache: "no-store" }),
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    const message =
      body && typeof body === "object" && "message" in body
        ? String((body as { message?: string }).message || "Request failed")
        : `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body as T;
}

export function getApiBase() {
  return API_BASE || getApiBaseUrl();
}

export async function getStoreMeta(): Promise<StoreMeta | null> {
  try {
    const res = await apiFetch<ApiResult<StoreMeta>>("/api/store/meta");
    return res.data;
  } catch {
    return null;
  }
}

export async function getStoreMenu(): Promise<StoreMenu | null> {
  try {
    const res = await apiFetch<ApiResult<StoreMenu>>("/api/store/menu");
    return res.data;
  } catch {
    return null;
  }
}

const EMPTY_HOME: HomeContent = {
  banners: [],
  latestBlogs: [],
  carousels: { featured: [], bestsellers: [], newArrivals: [] },
  faqs: [],
};

export async function getHomeContent(): Promise<HomeContent> {
  try {
    const res = await apiFetch<ApiResult<HomeContent> & Partial<HomeContent>>(
      "/api/store/content/home",
    );
    const data = res.data || (res as unknown as HomeContent);
    if (!data || typeof data !== "object") return EMPTY_HOME;
    return {
      ...EMPTY_HOME,
      ...data,
      banners: data.banners || [],
      latestBlogs: data.latestBlogs || [],
      carousels: {
        featured: data.carousels?.featured || [],
        bestsellers: data.carousels?.bestsellers || [],
        newArrivals: data.carousels?.newArrivals || [],
      },
      faqs: data.faqs || [],
    };
  } catch {
    return EMPTY_HOME;
  }
}

export async function getBlogs(page = 1, limit = 12) {
  try {
    const res = await apiFetch<ApiResult<StoreBlogPost[]>>(
      `/api/store/blogs?page=${page}&limit=${limit}`,
    );
    return { posts: res.data || [], pagination: res.pagination };
  } catch {
    return { posts: [] as StoreBlogPost[], pagination: undefined };
  }
}

export async function getBlogBySlug(slug: string): Promise<StoreBlogPost | null> {
  try {
    const res = await apiFetch<ApiResult<StoreBlogPost>>(`/api/store/blogs/${slug}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function getCmsPage(slug: string): Promise<StoreCmsPage | null> {
  try {
    const res = await apiFetch<ApiResult<StoreCmsPage>>(`/api/store/pages/${slug}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function getCatalog(params?: CatalogParams): Promise<CatalogResponse> {
  const query = toQuery(params as Record<string, string | number | boolean | undefined>);
  try {
    return await apiFetch<CatalogResponse>(`/api/store/catalog${query}`);
  } catch (error) {
    return {
      success: false,
      data: [],
      pagination: { total: 0, page: 1, limit: Number(params?.limit || 24), pages: 0 },
      message: error instanceof Error ? error.message : "Failed to load catalog",
    };
  }
}

export async function getCollection(
  slug: string,
  params?: CatalogParams & { withProducts?: boolean; includeFacets?: boolean },
) {
  const query = toQuery({
    withProducts: params?.withProducts ?? true,
    includeFacets: params?.includeFacets ?? true,
    ...(params || {}),
  } as Record<string, string | number | boolean | undefined>);

  try {
    const res = await apiFetch<
      ApiResult<CollectionDetail> & {
        products?: StoreProduct[];
        pagination?: CatalogResponse["pagination"];
        facets?: CatalogResponse["facets"];
      }
    >(`/api/store/collections/${slug}${query}`);

    return {
      collection: res.data,
      products: res.products || [],
      pagination: res.pagination || { total: 0, page: 1, limit: 24, pages: 0 },
      facets: res.facets,
      success: res.success,
    };
  } catch (error) {
    return {
      collection: null,
      products: [] as StoreProduct[],
      pagination: { total: 0, page: 1, limit: 24, pages: 0 },
      facets: undefined,
      success: false,
      message: error instanceof Error ? error.message : "Collection not found",
    };
  }
}

export async function getProductBySlug(slug: string): Promise<StoreProduct | null> {
  try {
    const res = await apiFetch<ApiResult<StoreProduct>>(`/api/store/products/${slug}`);
    return res.data;
  } catch {
    try {
      const legacy = await apiFetch<ApiResult<StoreProduct>>(`/api/products/public/${slug}`);
      return legacy.data;
    } catch {
      return null;
    }
  }
}

export async function getRelatedProducts(slug: string, limit = 8): Promise<StoreProduct[]> {
  try {
    const res = await apiFetch<ApiResult<StoreProduct[]>>(
      `/api/store/products/${slug}/related?limit=${limit}`,
    );
    return res.data || [];
  } catch {
    return [];
  }
}

export async function searchSuggest(q: string, limit = 8) {
  if (!q.trim()) return [];
  try {
    const res = await apiFetch<ApiResult<StoreProduct[]>>(
      `/api/store/search/suggest?q=${encodeURIComponent(q)}&limit=${limit}`,
    );
    return res.data || [];
  } catch {
    return [];
  }
}

export async function registerCustomer(payload: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}) {
  return apiFetch<ApiResult<{ customer: StoreCustomer; token: string }>>(
    "/api/store/auth/register",
    { method: "POST", body: JSON.stringify(payload) },
  );
}

export async function loginCustomer(payload: { email: string; password: string }) {
  return apiFetch<ApiResult<{ customer: StoreCustomer; token: string }>>(
    "/api/store/auth/login",
    { method: "POST", body: JSON.stringify(payload) },
  );
}

export async function getMe(token: string) {
  return apiFetch<ApiResult<StoreCustomer>>("/api/store/auth/me", undefined, { token });
}

export async function getMyOrders(token: string) {
  return apiFetch<ApiResult<unknown[]>>("/api/store/auth/orders", undefined, { token });
}

export async function getWishlist(auth: AuthOpts) {
  const res = await apiFetch<ApiResult<WishlistItem[]>>("/api/store/wishlist", undefined, auth);
  return res.data || [];
}

export async function addToWishlist(productId: string, auth: AuthOpts) {
  return apiFetch<ApiResult<WishlistItem>>(
    "/api/store/wishlist",
    { method: "POST", body: JSON.stringify({ productId }) },
    auth,
  );
}

export async function removeFromWishlist(productId: string, auth: AuthOpts) {
  return apiFetch<ApiResult<unknown>>(
    `/api/store/wishlist/${productId}`,
    { method: "DELETE" },
    auth,
  );
}

export async function getProductReviews(slug: string, page = 1) {
  try {
    const res = await apiFetch<ApiResult<StoreReview[]>>(
      `/api/store/products/${slug}/reviews?page=${page}&limit=10`,
    );
    return { reviews: res.data || [], pagination: res.pagination };
  } catch {
    return { reviews: [] as StoreReview[], pagination: undefined };
  }
}

export async function submitProductReview(
  slug: string,
  payload: { rating: number; title?: string; body?: string; name?: string; email?: string },
  token?: string | null,
) {
  return apiFetch<ApiResult<StoreReview>>(
    `/api/store/products/${slug}/reviews`,
    { method: "POST", body: JSON.stringify(payload) },
    { token },
  );
}

export async function validateCoupon(code: string, subtotal: number) {
  return apiFetch<ApiResult<CouponValidation>>("/api/store/coupons/validate", {
    method: "POST",
    body: JSON.stringify({ code, subtotal }),
  });
}

export async function createRazorpayOrder(amount: number, receipt?: string) {
  return apiFetch<
    ApiResult<{
      id: string;
      amount: number;
      currency: string;
      receipt: string;
      keyId: string;
      mode: "mock" | "live";
    }>
  >("/api/store/payments/razorpay/create-order", {
    method: "POST",
    body: JSON.stringify({ amount, receipt }),
  });
}

export async function verifyRazorpayPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  storeOrderId?: string;
}) {
  return apiFetch<ApiResult<unknown>>("/api/store/payments/razorpay/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type StoreOrderResult = {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  pricing: {
    subtotal: number;
    shipping?: number;
    discount?: number;
    total: number;
  };
  items: unknown[];
  customer: { name: string; phone: string };
  createdAt: string;
};

export async function createStoreOrder(payload: {
  customer: { name: string; email: string; phone: string };
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
  };
  items: { productId: string; variantId?: string | null; quantity: number }[];
  paymentMethod?: "cod" | "online";
  couponCode?: string;
  notes?: string;
}) {
  return apiFetch<ApiResult<StoreOrderResult>>("/api/store/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function trackOrder(orderNumber: string, phone: string) {
  return apiFetch<ApiResult<unknown>>(
    `/api/store/orders/${encodeURIComponent(orderNumber)}?phone=${encodeURIComponent(phone)}`,
  );
}

export async function subscribeNewsletter(email: string) {
  return apiFetch<ApiResult<{ email: string }>>("/api/store/newsletter", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function submitConsultation(payload: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  interest?: string;
}) {
  return apiFetch<ApiResult<unknown>>("/api/store/leads/consultation", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export const FALLBACK_INTENTIONS = [
  "Peace",
  "Wealth",
  "Health",
  "Protection",
  "Relationship",
  "Success",
  "Spirituality",
] as const;

export const FALLBACK_CATEGORIES = [
  "rudraksha",
  "crystal",
  "stone",
  "gemstone",
  "yantra",
  "bracelet",
  "combo",
] as const;

export const FALLBACK_ZODIAC = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export const FALLBACK_TRUST = [
  { id: "lab", label: "Lab Certified" },
  { id: "ship", label: "Free Shipping" },
  { id: "cod", label: "Cash on Delivery" },
  { id: "secure", label: "Secure Payments" },
];
