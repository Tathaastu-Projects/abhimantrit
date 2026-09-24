# Frontend Agent Brief — Catalog & Backend Fill for Figma UI

**Date:** 2026-09-22  
**Purpose:** Your storefront looked empty vs Figma (home / category PLP / PDP). Backend catalog + home content APIs were filled so every section can render with real data.

Restart the backend after pulling these changes.

---

## 1. What changed (database)

### Product volume (MongoDB)
| Metric | Before (approx) | After |
|--------|------------------|-------|
| Listed products | ~153 | **696** |
| Featured | 2 | **29** |
| Bestsellers | 2 | **160** |
| New arrivals | almost all / sparse flags | **48** |
| With intentions | 4 | **696 (all)** |
| With ratings | 0 | **696 (all)** |
| With color / shape | ~2–3 | **696 (all)** |

### Category counts (for Explore Categories + PLP grids)
| Category | Count |
|----------|-------|
| `gemstone` | 305 |
| `bracelet` (jewelry / malas / bracelets) | 245 |
| `rudraksha` | 120 |
| `crystal` | 23 |
| `stone` / `other` | few |

Enough for Figma’s **4-column × 6-row** gemstone grid and dense home carousels.

### Every listed product now has
- `intentions[]` (Peace, Wealth, Health, Protection, Relationship, Success, Spirituality)
- `ratingAvg` + `ratingCount` (for star rows on cards / PDP)
- `mrp` > `salePrice` when possible (discount badge / % off)
- `attributes.color`, `attributes.shape`, `attributes.origin`, `attributes.zodiac`
- often `attributes.material`, `mukhi` / `face` for rudraksha
- `tags[]`, images (CDN URLs from sample import)
- `effectiveSalePrice` / `effectiveDiscountPercent` on catalog responses

### Reviews
- **120** approved review documents seeded on the first ~40 products  
- Use `GET /api/store/products/:slug/reviews` on PDP

### CMS seed refreshed
- Home hero + consult banners
- 3 blog posts (“From the Journal”)
- FAQ page `home-faq` (JSON Q&A array)
- Coupons still available: `WELCOME10`, `FLAT200`

> Sample products are tagged `source.provider = "gemsmantra-shopify"` as **temporary** filler until real Tathaastu inventory replaces them.

---

## 2. What changed (backend APIs)

### Richer homepage payload (use this for Figma home)
`GET /api/store/content/home`

Returns in one call:
- `banners[]`
- `trustBadges[]`
- `intentions[]` — `{ id, label, href, color, icon }` (Relationship labeled **Love** for UI)
- `categories[]` — `{ id, label, href, productCount, image }`
- `zodiacSigns[]` — 12 signs with hrefs
- `carousels.featured` / `carousels.bestsellers` / `carousels.newArrivals` (up to 16 products each)
- `latestBlogs[]`
- `faqs[]` — `{ question, answer }`
- `consultCta`
- `stats.listedProducts` + `categoryCounts`

### New / updated filters (PLP sidebar like Figma)
Catalog + facets already support, now also **`origin`**:

```
GET /api/store/catalog?category=gemstone&includeFacets=true&sort=best_selling&limit=24
GET /api/store/catalog/facets?category=gemstone
```

Filter params to wire:
- `minPrice` / `maxPrice`
- `intention`, `category`
- `color`, `shape`, `origin`, `material`, `mukhi`
- `zodiac`, `inStock`, `onSale`
- `minCarat` / `maxCarat` / `minRatti` / `maxRatti`
- `tags`
- `sort`: `featured | best_selling | newest | price_asc | price_desc | title_asc | discount_desc`

### Product model attribute added
- `attributes.origin` (Ceylon, Bangkok, African, Nepali, …) — for gemstone sidebar

---

## 3. Figma screen → API map (fill every section)

### Home
| Figma block | API |
|-------------|-----|
| Hero | `content/home` → `banners` (key `home-hero`) |
| Shop by Intention | `content/home` → `intentions` |
| Explore Categories | `content/home` → `categories` (use `productCount` + `image`) |
| Featured / Bestsellers / New | `content/home` → `carousels.*` **or** `/catalog?featured=true` etc. |
| Shop by Zodiac | `content/home` → `zodiacSigns` |
| Journal | `content/home` → `latestBlogs` |
| Trust + Consult | `trustBadges` + `consultCta` |
| FAQ | `faqs` |
| Newsletter | `POST /api/store/newsletter` |

### Category / Gemstones PLP
| Figma block | API |
|-------------|-----|
| Grid (24 cards) | `/catalog?category=gemstone&limit=24&page=1&includeFacets=true` |
| Sort | `sort=best_selling` (or price_*) |
| Sidebar filters | `/catalog/facets?...` same query |
| Collection SEO text | `/collections/gemstone?withProducts=true&includeFacets=true` |
| Consult banner | static from `consultCta` or banner key `consult` |

### PDP
| Figma block | API |
|-------------|-----|
| Gallery / title / prices / variants | `/products/:slug` |
| Intentions chips | `product.intentions` |
| Stock | `effectiveStock` / variant qty |
| Reviews form + list | `GET/POST /products/:slug/reviews` |
| You may also like | `/products/:slug/related?limit=8` |
| Wishlist | `POST /wishlist` (+ auth or `X-Guest-Id`) |

---

## 4. Example product card fields (don’t leave blanks)

Prefer catalog item fields:
- Image: `images` primary
- Badges: `isNewArrival` → NEW, `isBestSeller` → BESTSELLER, `isFeatured` → FEATURED  
  Discount: `effectiveDiscountPercent` or compute from `effectiveMrp` / `effectiveSalePrice`
- Title: `title`
- Stars: `ratingAvg`, `ratingCount`
- Price: `effectiveSalePrice`, strike `effectiveMrp`
- CTA: Add to cart (client cart)

---

## 5. Scripts (if you need to re-seed locally)

```bash
cd backend
npm run import:gemsmantra -- --pages=8 --limit=50
npm run import:gemsmantra:collections
npm run enrich:figma
```

Also: `POST /api/store/admin/cms/seed` for banners/blogs/coupons.

---

## 6. Visual direction reminder (from Figma — not GemsMantra clone)

- Forest green + cream + **pink CTAs** (Add to Cart)
- Serif brand wordmark “Tathaastu”
- Dense product grids / carousels — empty white space usually means the UI isn’t calling the filled APIs above

---

## 7. Docs to keep open

- `brain/store-frontend-api-reference.md` — full endpoint contract  
- `brain/store-phase-c-apis.md` — auth, wishlist, reviews, coupons, Razorpay, CMS  
- `brain/store-frontend-agent-prompt.md` — original build prompt  
- **This file** — what just got filled in DB + home API

If a section still looks empty after restart, check Network tab: home should hit `/api/store/content/home`, PLP should hit `/api/store/catalog` with `limit=24` and facets — not a hard-coded empty array.
