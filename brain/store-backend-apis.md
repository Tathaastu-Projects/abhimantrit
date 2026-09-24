# Store Backend API Contract

Base URL (local): `http://localhost:5000`  
All storefront calls use **public / store routes**. Admin-only routes must not be used by the store frontend.

Response shape convention:
```json
{ "success": true, "data": ..., "pagination": optional }
```
Errors:
```json
{ "success": false, "message": "..." }
```

---

## 1. Already available (use now)

Mounted at `/api/products`.

### 1.1 Health
- `GET /api/health`
- Returns API up status.

### 1.2 Public product list
- `GET /api/products/public`
- Query params:

| Param | Type | Notes |
|-------|------|--------|
| `category` | string | `rudraksha`, `crystal`, `stone`, `gemstone`, `yantra`, `bracelet`, `combo`, `other` |
| `intention` | string | `Peace`, `Wealth`, `Health`, `Protection`, `Relationship`, `Success`, `Spirituality` |
| `featured` | `"true"` | `isFeatured` |
| `bestSeller` | `"true"` | `isBestSeller` |
| `isNewArrival` / `isNew` | `"true"` | new arrivals |
| `zodiac` | string | case-insensitive match on `attributes.zodiac` |
| `q` | string | text search |
| `page` | number | default 1 |
| `limit` | number | default 40 |

- Filter always includes `status: "listed"` only.
- Sort: featured → bestseller → newest.

Example:
```
GET /api/products/public?intention=Wealth&page=1&limit=12
GET /api/products/public?category=rudraksha&bestSeller=true
GET /api/products/public?q=neelam
```

### 1.3 Public product detail
- `GET /api/products/public/:slug`
- Returns one listed product or 404.

### 1.4 Product object (store-relevant fields)

```ts
type StoreProduct = {
  _id: string;
  title: string;
  slug: string;
  sku?: string;
  shortDescription?: string;
  description?: string;
  category: "rudraksha" | "crystal" | "stone" | "gemstone" | "yantra" | "bracelet" | "combo" | "other";
  images: { url: string; alt?: string; isPrimary?: boolean }[];
  mrp: number;
  salePrice: number;
  quantity: number;
  lowStockThreshold?: number;
  variants: {
    _id?: string;
    sku?: string;
    label: string;
    mukhi?: string;
    size?: string;
    weight?: string;
    material?: string;
    color?: string;
    mrp: number;
    salePrice: number;
    quantity: number;
    isActive: boolean;
  }[];
  status: "draft" | "listed" | "unlisted"; // store only receives listed
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  intentions: ("Peace"|"Wealth"|"Health"|"Protection"|"Relationship"|"Success"|"Spirituality")[];
  attributes: {
    face?: string;
    stone?: string;
    shape?: string;
    weight?: string;
    gender?: string;
    color?: string;
    occasion?: string;
    zodiac?: string;
  };
  seo?: { metaTitle?: string; metaDescription?: string };
  discountPercent?: number; // virtual
  totalStock?: number;      // virtual
  isLowStock?: boolean;     // virtual
  createdAt?: string;
  updatedAt?: string;
};
```

**Image URLs:** may be relative (`/uploads/...`). Store must prefix with `API_BASE` when needed.

**Pricing UI rule:**
- Prefer variant prices when a variant is selected.
- Show `salePrice`; if `mrp > salePrice`, show struck MRP + `% OFF`.

---

## 2. Admin-only (DO NOT use from store frontend)

- `GET/POST /api/products`
- `GET/PUT/PATCH/DELETE /api/products/:id`
- `POST /api/products/:id/images`
- `POST /api/products/bulk-status`
- `GET /api/products/meta|stats|audits`

These mutate catalog / expose drafts. Store must never call them.

---

## 3. Store APIs (ready — mounted at `/api/store`)

Keeps existing `/api/products/public*` for catalog. Commerce + leads live under `/api/store`.

### 3.1 Store meta (for filters / nav)
`GET /api/store/meta`

Returns:
```json
{
  "success": true,
  "data": {
    "categories": ["rudraksha","crystal","stone","gemstone","yantra","bracelet","combo","other"],
    "intentions": ["Peace","Wealth","Health","Protection","Relationship","Success","Spirituality"],
    "zodiacSigns": ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],
    "paymentMethods": ["cod"],
    "currency": "INR",
    "trustBadges": [
      { "id": "lab", "label": "Lab Certified" },
      { "id": "ship", "label": "Free Shipping" },
      { "id": "cod", "label": "Cash on Delivery" },
      { "id": "secure", "label": "100% Secure Payments" }
    ],
    "support": { "email": "...", "phone": "..." }
  }
}
```

### 3.2 Create store order (checkout)
`POST /api/store/orders`

Body:
```json
{
  "customer": {
    "name": "string",
    "email": "string",
    "phone": "string"
  },
  "shippingAddress": {
    "line1": "string",
    "line2": "string",
    "city": "string",
    "state": "string",
    "pincode": "string",
    "country": "India"
  },
  "items": [
    {
      "productId": "ObjectId",
      "variantId": "ObjectId|null",
      "quantity": 1
    }
  ],
  "paymentMethod": "cod",
  "notes": "optional"
}
```

Server behavior:
- Re-validates listed status, **server prices**, and stock (ignores client unit prices).
- Requires `variantId` when the product has variants.
- Decrements stock atomically-ish via conditional updates; rolls back stock if order create fails.
- Creates order with `status: "placed"`, `paymentStatus: "pending"`.
- Returns `{ id, orderNumber, status, paymentMethod, paymentStatus, pricing, items, customer, createdAt }`.

Order number format: `TST-YYYYMMDD-####`.

### 3.3 Track order
`GET /api/store/orders/:orderNumber?phone=9876543210`  
Phone digits must match the order (min 10 digits).

### 3.4 Newsletter
`POST /api/store/newsletter` `{ "email": "..." }`

### 3.5 Consultation lead
`POST /api/store/leads/consultation` `{ name, phone, email, message, interest }`

### 3.6 Admin helpers (for admin UI later)
- `GET /api/store/admin/orders?status=&q=&page=&limit=`
- `GET /api/store/admin/orders/:id`
- `PATCH /api/store/admin/orders/:id/status` body `{ status, adminNote?, paymentStatus? }`  
  Cancelling an order restores stock when it was decremented.
- `GET /api/store/admin/leads?type=&status=&page=&limit=`

### 3.7 Still planned (Phase C)
- `GET /api/store/content/home` — banners, hero, FAQ, testimonials (CMS)
- Online payments (Razorpay / UPI)

---

## 4. CORS / env for store frontend

Backend already uses `cors()`. Ensure production origin of store domain is allowed if CORS is later restricted.

Store frontend env:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 5. Current gap vs GemsMantra-like store

| Need | Status |
|------|--------|
| Listed product catalog + filters | Ready |
| Product detail by slug | Ready |
| Store meta endpoint | Ready (`GET /api/store/meta`) |
| Real store orders (COD) | Ready (`StoreOrder` + `/api/store/orders`) — do **not** use mock `/api/orders` |
| Order tracking | Ready |
| Newsletter + consultation leads | Ready |
| Admin order/lead list APIs | Ready (UI pending) |
| Online payments | Planned Phase C |
| CMS banners/blogs/reviews | Planned Phase C |

---

## 6. Models

- `backend/models/StoreOrder.js`
- `backend/models/StoreLead.js`
- Routes: `backend/routes/store.js` mounted at `/api/store` in `server.js`
