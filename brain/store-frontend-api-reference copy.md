# Tathaastu Store — Complete Frontend API Reference

Base URL: `http://localhost:5000` (or your deployed API)  
Store frontend should set `NEXT_PUBLIC_API_URL` and call these endpoints only (never admin mutation product APIs).

Reference UX (IA only): https://gemsmantra.com/collections/jewelry?filter.v.price.gte=50000  
Patterns covered: mega menu, collection page, left filters with facet counts, price range, sort, product grid, SEO/FAQ blocks, search.

---

## Quick map (what the store UI needs)

| UI area | API |
|--------|-----|
| Header mega menu | `GET /api/store/menu` |
| Constants / filter keys | `GET /api/store/meta` |
| Collection page (SEO + products) | `GET /api/store/collections/:slug?withProducts=true&includeFacets=true&...` |
| Product grid / shop | `GET /api/store/catalog?...` |
| Sidebar filter counts | `GET /api/store/catalog/facets?...` |
| Search autocomplete | `GET /api/store/search/suggest?q=` |
| Product detail | `GET /api/store/products/:slug` |
| Related products | `GET /api/store/products/:slug/related` |
| Checkout COD | `POST /api/store/orders` |
| Track order | `GET /api/store/orders/:orderNumber?phone=` |
| Newsletter | `POST /api/store/newsletter` |
| Consultation lead | `POST /api/store/leads/consultation` |

Legacy aliases (also work):
- `GET /api/products/public` → same catalog engine as `/api/store/catalog`
- `GET /api/products/public/:slug` → product detail

---

## 1. Meta

`GET /api/store/meta`

Returns categories, intentions, zodiac signs, sort options, filter key list, trust badges, support contacts.

---

## 2. Mega menu

`GET /api/store/menu`

```json
{
  "success": true,
  "data": {
    "primary": [
      {
        "id": "rudraksha",
        "label": "Rudraksha",
        "href": "/shop/rudraksha",
        "columns": [
          { "title": "Shop by Mukhi", "links": [{ "label": "1 Mukhi", "href": "/shop/rudraksha?mukhi=1" }] }
        ]
      }
    ],
    "utility": [{ "label": "Track Order", "href": "/track-order" }]
  }
}
```

---

## 3. Catalog (filters + sort + pagination)

`GET /api/store/catalog`

### Query params

| Param | Example | Notes |
|-------|---------|--------|
| `category` / `categories` | `bracelet` or `gemstone,stone` | CSV allowed |
| `intention` / `intentions` | `Wealth,Protection` | enum intentions |
| `stone` | `Neelam,Ruby` | `attributes.stone` |
| `color` | `Blue` | |
| `shape` | `Oval` | |
| `gender` | `Women` | |
| `material` / `metal` | `Silver,Gold` | product attr or variant material |
| `mukhi` / `face` | `5,7` | attr/variant mukhi |
| `jewelryType` / `type` / `form` | `Ring,Pendant` | `attributes.jewelryType` |
| `zodiac` | `Aries` | |
| `occasion` | `Wedding` | |
| `planet` | `Saturn` | |
| `minPrice` / `priceMin` / `filter.v.price.gte` | `50000` | effective sale price |
| `maxPrice` / `priceMax` / `filter.v.price.lte` | `100000` | |
| `inStock` | `true` | or `availability=in_stock` |
| `onSale` / `sale` | `true` | salePrice < mrp |
| `featured` | `true` | |
| `bestSeller` | `true` | |
| `isNewArrival` / `isNew` / `new` | `true` | |
| `q` / `search` | `neelam` | title/sku/desc/stone |
| `sort` | `price_asc` | see sort values |
| `page` | `1` | |
| `limit` | `24` | max 100 |
| `includeFacets` / `facets` | `true` | embed facets in same response |

### Sort values

- `featured` (default)
- `best_selling`
- `newest`
- `oldest`
- `title_asc`
- `title_desc`
- `price_asc`
- `price_desc`
- `discount_desc`

### Example (GemsMantra-like price filter)

```
GET /api/store/catalog?category=bracelet&minPrice=50000&sort=price_asc&page=1&limit=24&includeFacets=true
```

### Response

```json
{
  "success": true,
  "data": [ /* products with effectiveSalePrice, effectiveMrp, effectiveStock, effectiveDiscountPercent */ ],
  "pagination": { "total": 12, "page": 1, "limit": 24, "pages": 1 },
  "priceStats": { "minPrice": 499, "maxPrice": 89999 },
  "appliedFilters": { /* normalized params */ },
  "sortOptions": [{ "value": "price_asc", "label": "price asc" }],
  "facets": { /* only if includeFacets=true */ }
}
```

**Pricing UI:** prefer `effectiveSalePrice` / `effectiveMrp` / `effectiveDiscountPercent` on PLP. On PDP use selected variant prices when variants exist.

Only `status: "listed"` products are returned.

---

## 4. Facets (sidebar)

`GET /api/store/catalog/facets` + same filter query params as catalog.

Returns counts for:
- `category`, `intention`, `stone`, `color`, `shape`, `gender`, `material`, `mukhi`, `jewelryType`, `zodiac`, `occasion`, `planet`, `availability`
- `price: { min, max }` for the current filter context (price filter itself excluded from that range calc)

Facet counts ignore the facet’s own selected values (standard PLP behavior).

---

## 5. Collections (SEO pages)

### List
`GET /api/store/collections`

Seeded defaults: `all`, `rudraksha`, `gemstone`, `crystal`, `bracelet`, `yantra`, `combo`, `sale`, `bestsellers`, `new-arrivals`.

### Detail
`GET /api/store/collections/:slug`

Optional:
- `withProducts=true` — also returns products using collection `defaultFilters` merged with request query
- `includeFacets=true` — facets for that collection context
- any catalog filter/sort/page params

Response includes:
- `collection.title`, `subtitle`, `description`
- `seo`, `trustBadges`, `comparisonTable`, `faqs`
- `defaultFilters`
- optional `products`, `pagination`, `facets`

This powers the GemsMantra-style block below the grid (story + comparison + FAQ).

---

## 6. Search suggest

`GET /api/store/search/suggest?q=rudra&limit=8`

Returns lightweight product hits for header autocomplete.

---

## 7. Product detail + related

```
GET /api/store/products/:slug
GET /api/store/products/:slug/related?limit=8
```

---

## 8. Cart / Checkout / Leads

### Create order
`POST /api/store/orders`

```json
{
  "customer": { "name": "", "email": "", "phone": "" },
  "shippingAddress": {
    "line1": "", "line2": "", "city": "", "state": "", "pincode": "", "country": "India"
  },
  "items": [{ "productId": "", "variantId": null, "quantity": 1 }],
  "paymentMethod": "cod",
  "notes": ""
}
```

Server validates listed status, **recomputes prices**, checks stock, decrements inventory.

### Track
`GET /api/store/orders/TST-20260916-1234?phone=9876543210`

### Newsletter
`POST /api/store/newsletter` `{ "email": "" }`

### Consultation
`POST /api/store/leads/consultation` `{ "name", "phone", "email", "message", "interest" }`

---

## 9. Recommended frontend routes

| Frontend route | API usage |
|----------------|-----------|
| `/` | featured/bestseller catalog calls + menu + meta |
| `/shop` | `/catalog` + `/catalog/facets` |
| `/shop/[category]` | catalog with `category=` |
| `/collections/[slug]` | `/collections/:slug?withProducts=true&includeFacets=true` |
| `/intention/[intention]` | catalog `intention=` |
| `/product/[slug]` | product + related |
| `/search?q=` | catalog `q=` + suggest for typeahead |
| `/cart`, `/checkout` | local cart → create order |
| `/track-order` | track order API |

---

## 10. Product attributes to populate in admin (for rich filters)

Ensure listed products fill where relevant:
- `intentions[]`
- `attributes.stone`, `color`, `shape`, `gender`, `zodiac`, `occasion`
- `attributes.material`, `mukhi`, `jewelryType`, `planet`
- variant `material` / `mukhi` when using variants

Without attribute data, facet sidebars will be empty (same as a filtered GemsMantra page with 0 matches).

---

## 11. Admin-only (not for store frontend)

- `/api/store/admin/orders*`
- `/api/store/admin/leads`
- `/api/store/admin/collections*`
- `/api/products` mutations

---

## 13. Parity check vs GemsMantra

See `gemsmantra-api-parity.md` and `store-phase-c-apis.md`.

**MVP + Phase C storefront APIs: covered** (auth, wishlist, reviews, coupons, Razorpay, CMS, tags, carat/ratti).  
Optional later: admin UI for CMS/coupons, public remedy quiz, multi-type search suggest.
