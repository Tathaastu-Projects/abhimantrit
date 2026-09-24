# Store frontend status (this repo)

## Built — MVP + Phase C UI + Figma fill wiring

Next.js App Router storefront in repo root (`src/`).

### Core
- Design: Figma match — forest green + cream + pink CTAs, serif “Tathaastu”, square product images (`aspect-square` + `object-cover`)
- Banners: `/home_banner.svg`, `/pooja_essential_banner.svg`
- Catalog PLP/PDP/cart/COD against `/api/store/*` via `NEXT_PUBLIC_API_URL` from `.env`

### Category PLP banner (2026-09-22)
- Full-width front image via `/pooja_essential_banner.svg` (complete, no `object-cover` crop)
- Dynamic map: `src/lib/category-banners.ts` — all categories share one asset for now; add per-slug paths later
- Component: `src/components/catalog/CategoryBanner.tsx` (Figma left overlay + Shop now + trust row)

### Figma home UI (2026-09-22)
Home screen rebuilt to match Figma left frame:
1. Header — logo left, nav center, icon utilities right
2. Hero — full-width `/home_banner.svg` front image
3. Sacred Essentials — circular category row
4. Pink trust ribbon
5. Shop by intention — pastel square tiles
6. Bestsellers 4-col product grid
7. Consult CTA + FAQ

Removed from home (not in that Figma frame): Explore Categories cards, Zodiac, Journal, Featured/New multi-carousels.


| Screen | API / behavior |
|--------|----------------|
| **Home** | Single call `GET /api/store/content/home` → banners, intentions, category cards (+counts/images), zodiac, carousels (featured / bestsellers / newArrivals up to 12–16), blogs, trust badges, consult CTA, FAQs |
| **PLP** (`/shop`, `/shop/[category]`, collections, search, intention) | `GET /api/store/catalog?...&limit=24&includeFacets=true` — denser 4-col grid, origin + Figma price presets in sidebar |
| **PDP** | Product + reviews + related `limit=8`; intentions chips; effective prices / discount |

Key files:
- `src/app/page.tsx` — home from `getHomeContent()` only (no sparse multi-fetch)
- `src/lib/api.ts` — `getHomeContent()` normalizes carousels / faqs
- `src/components/home/*` — IntentionNav / CategoryNav / ZodiacNav / ProductCarousel / ConsultationCta consume home fields
- `src/lib/catalog-params.ts` — default `limit=24`, `includeFacets=true`, `origin`
- Brief from backend: `brain/frontend-figma-catalog-fill.md`

### Phase C (wired)
- Auth, wishlist, reviews, coupons, Razorpay, CMS pages, tags + weight filters

## Run

```bash
npm install
npm run dev
```

- Store port: `PORT` in `.env` (via `scripts/run-with-env.mjs`) — currently **3007**
- Backend: `NEXT_PUBLIC_API_URL` in `.env` (e.g. `http://localhost:9001`) — **must be running** for filled grids; empty UI usually means API down or old thin DB (re-run backend `enrich:figma`)

## Docs
- `frontend-figma-catalog-fill.md` — DB counts + screen→API map (give to / from backend agent)
- `store-phase-c-apis.md`
- `store-frontend-api-reference.md`
- `store-frontend-brief.md`
