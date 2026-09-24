# Phase C Store APIs (completed)

Base: `http://localhost:9001`

## Customer auth
- `POST /api/store/auth/register` `{ name, email, phone, password }`
- `POST /api/store/auth/login` `{ email, password }` → `{ customer, token }`
- `GET /api/store/auth/me` (Bearer token)
- `PUT /api/store/auth/me`
- `GET /api/store/auth/orders` — customer order history

Header: `Authorization: Bearer <token>`

## Wishlist
- `GET /api/store/wishlist` — auth **or** `X-Guest-Id`
- `POST /api/store/wishlist` `{ productId }`
- `DELETE /api/store/wishlist/:productId`

## Reviews
- `GET /api/store/products/:slug/reviews`
- `POST /api/store/products/:slug/reviews` `{ rating, title, body, name?, email? }`
- Admin: `GET /api/store/admin/reviews`, `PATCH /api/store/admin/reviews/:id/status`

Product fields updated: `ratingAvg`, `ratingCount`

## Coupons
- `POST /api/store/coupons/validate` `{ code, subtotal }`
- Checkout: pass `couponCode` on `POST /api/store/orders`
- Sample codes (after CMS seed): `WELCOME10`, `FLAT200`
- Admin: `GET/POST /api/store/admin/coupons`, `PUT /api/store/admin/coupons/:id`

## Online payments (Razorpay)
- `POST /api/store/payments/razorpay/create-order` `{ amount, receipt? }`
- `POST /api/store/payments/razorpay/verify` `{ razorpay_order_id, razorpay_payment_id, razorpay_signature, storeOrderId? }`
- Env: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`  
  Without keys → **mock** order (`mode: "mock"`) for local wiring

## CMS
- `GET /api/store/content/home` — banners + latest blogs
- `GET /api/store/banners?key=`
- `GET /api/store/blogs`, `GET /api/store/blogs/:slug`
- `GET /api/store/pages/:slug` (shipping-policy, refund-policy, privacy-policy)
- Admin seed: `POST /api/store/admin/cms/seed`
- Admin CRUD: banners/blogs/pages under `/api/store/admin/...`

## Catalog extras (Phase C filters)
- `tags` / `tag` CSV filter + facet
- `minCarat` / `maxCarat`
- `minRatti` / `maxRatti`
- Product fields: `tags[]`, `weightCarat`, `weightRatti`

## Sample products import
```bash
cd backend
npm run import:gemsmantra
# or
node scripts/importGemsmantraProducts.js --pages=3 --limit=50
```
Imports temporary GemsMantra Shopify products (images via CDN URLs) as `listed` with `source.provider=gemsmantra-shopify`. Replace later with real Tathaastu catalog.
