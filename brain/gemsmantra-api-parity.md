# GemsMantra API discovery vs Tathaastu store APIs

**Date:** 2026-09-16  
**Source site:** https://gemsmantra.com (Shopify store: `gemsmantra.myshopify.com`)  
**Catalog size observed:** ~**1872** products (`/collections/all.json` → `products_count: 1872`)  
**Collections observed:** **250+** handles via `/collections.json`

> Important: We do **not** need to copy their products or Shopify endpoints 1:1.  
> We need **feature parity** for a similar storefront UX, powered by **our** `/api/store/*` APIs.

---

## 1. What GemsMantra actually exposes (public Shopify JSON)

These are standard Shopify Ajax / JSON endpoints (confirmed live):

| GemsMantra / Shopify endpoint | Purpose |
|-------------------------------|---------|
| `GET /meta.json` | Shop identity, currency INR, countries |
| `GET /products.json?limit=&page=` | Paginated all products |
| `GET /products/{handle}.json` | Single product PDP payload |
| `GET /collections.json?limit=` | List collections (handles, counts) |
| `GET /collections/{handle}.json` | Collection meta + `products_count` |
| `GET /collections/{handle}/products.json` | Products inside a collection |
| `GET /search/suggest.json?q=&resources[type]=...` | Predictive search (products, collections, queries, articles, pages) |
| `GET /cart.js` | Current cart session |
| `POST /cart/add.js` | Add line item(s) |
| `POST /cart/change.js` / `update.js` / `clear.js` | Cart mutations (Shopify standard) |
| `GET /recommendations/products.json?product_id=` | Related products |
| `GET /pages.json` | CMS pages (large content dump) |
| Collection URL filters | e.g. `?filter.v.price.gte=50000` (Shopify Search & Discovery / storefront filters; mostly theme/SSR, not a simple public JSON facet API) |
| Hosted Shopify Checkout | Payments, discounts, shipping — not a custom public “create order” JSON for storefront apps |
| 3rd-party apps | Reviews (Judge.me / Loox scripts seen), sizing, analytics |

### Product shape they use (important fields)

From live `products.json` / `{handle}.json`:

- `title`, `handle`, `body_html`, `vendor`, `product_type`, `tags[]`
- `images[]` with CDN URLs
- `options[]` (e.g. **Pooja Energization** tiers)
- `variants[]`: `price`, `compare_at_price` (MRP), `sku`, `available`, option values
- Tags drive much of their navigation/collections (`jewelry-collection`, `5-mukhi-rudraksha`, intention-like tags, sale tags)

---

## 2. Coverage matrix — do we have what we need?

| Storefront capability | GemsMantra | Tathaastu API | Status |
|----------------------|------------|---------------|--------|
| Shop / currency meta | `/meta.json` | `GET /api/store/meta` | **Ready** |
| Mega menu / nav | Theme sections | `GET /api/store/menu` | **Ready** |
| Product listing + pagination | `/products.json`, collection products | `GET /api/store/catalog` (+ `/api/products/public`) | **Ready** |
| Collection pages | `/collections/*.json` | `GET /api/store/collections`, `/:slug` | **Ready** |
| Price filter (min/max) | `filter.v.price.gte/lte` | `minPrice` / `maxPrice` (aliases included) | **Ready** |
| Attribute filters + facet counts | Theme filters / Search & Discovery | `GET /api/store/catalog/facets` + catalog query params | **Ready** (stronger than public Shopify JSON) |
| Sort (price, bestselling, A–Z, date) | Theme sort | `sort=price_asc\|price_desc\|best_selling\|...` | **Ready** |
| Search autocomplete | `/search/suggest.json` | `GET /api/store/search/suggest` | **Ready** (products only) |
| Product detail | `/products/{handle}.json` | `GET /api/store/products/:slug` | **Ready** |
| Related products | `/recommendations/products.json` | `GET /api/store/products/:slug/related` | **Ready** |
| Variants + sale vs MRP | variants price/compare_at | `variants[]` + `mrp`/`salePrice` + effective price fields | **Ready** |
| Stock / availability filter | `available` | `inStock=true` + `effectiveStock` | **Ready** |
| Add to cart | `/cart/add.js` | Client cart (frontend) | **Ready** (different architecture) |
| Place order / COD | Shopify Checkout | `POST /api/store/orders` | **Ready** (COD) |
| Track order | Account / apps | `GET /api/store/orders/:orderNumber?phone=` | **Ready** |
| Newsletter | Apps / forms | `POST /api/store/newsletter` | **Ready** |
| Consultation lead | Forms | `POST /api/store/leads/consultation` | **Ready** |
| Admin order ops | Shopify Admin | `/api/store/admin/orders*` + UI `/store-orders` | **Ready** |

### Gaps (Phase C — now implemented in this backend)

| Capability | API |
|------------|-----|
| Wishlist | `/api/store/wishlist` (+ guest header) |
| Reviews / ratings | `/api/store/products/:slug/reviews` |
| Coupons | `/api/store/coupons/validate` + order `couponCode` |
| Online payments | `/api/store/payments/razorpay/*` |
| Customer login / orders | `/api/store/auth/*` |
| CMS banners / blogs / pages | `/api/store/content/home`, `/banners`, `/blogs`, `/pages/:slug` |
| Tags filter | `tags` on catalog + facets |
| Numeric carat/ratti | `minCarat`/`maxCarat`/`minRatti`/`maxRatti` |

See `store-phase-c-apis.md` for full request shapes.

Sample catalog: **150** GemsMantra products imported via `npm run import:gemsmantra` (temporary until own data arrives).

---

## 3. Verdict

**For building a GemsMantra-like storefront (browse, filter, sort, collection SEO, PDP, cart, COD checkout, leads): we already have the APIs we need.**

Our catalog/facets layer is actually **more explicit** than Shopify’s public JSON APIs (Shopify hides most filter facet JSON behind theme/Storefront GraphQL).

What we do **not** need to clone:
- Their 1872 products / 250 collections content
- Shopify cart.js protocol
- Their third-party review apps

What to add later (Phase C), not blockers for frontend start:
1. Online payments  
2. Reviews  
3. Coupons  
4. Wishlist (or local-only)  
5. Blog/CMS banners  
6. Optional `tags[]` + numeric weight filters if gemstone PLP needs them  

---

## 4. Frontend agent: use these docs

1. `brain/store-frontend-api-reference.md` — endpoint contract  
2. `brain/store-frontend-agent-prompt.md` — build prompt  
3. `brain/store-frontend-brief.md` — UI/UX  
4. This file — parity / gap checklist  

### Must-wire endpoints for PLP like jewellery + price≥50000

```http
GET /api/store/collections/bracelet?withProducts=true&includeFacets=true&minPrice=50000&sort=price_asc&page=1&limit=24
```
or
```http
GET /api/store/catalog?category=bracelet&minPrice=50000&sort=price_asc&includeFacets=true
GET /api/store/catalog/facets?category=bracelet&minPrice=50000
```

---

## 5. Data note for rich filters

GemsMantra filters work because products are heavily tagged (`product_type`, `tags`, metafields).  
For Tathaastu facets to look full, admin must fill on listed products:

- `intentions`
- `attributes.stone|material|mukhi|jewelryType|zodiac|color|shape|gender|planet|weight`
- variants with real `mrp` / `salePrice` / `quantity`
