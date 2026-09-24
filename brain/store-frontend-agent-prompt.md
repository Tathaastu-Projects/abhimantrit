# Copy-paste prompt: Tathaastu Store Frontend Agent

Use this prompt with a separate coding agent to build **only the store frontend**. Backend APIs live in the existing Tathaastu admin backend project.

---

## PROMPT START

You are a senior frontend engineer + UI designer. Build a **brand-new public e-commerce storefront** for **Tathaastu** (Rudraksha, gemstones, crystals, yantras, bracelets, spiritual combos).

### Architecture (mandatory)

- Create a **separate** Next.js (App Router) + TypeScript + Tailwind store app (new folder/repo). Name suggestion: `tathaastu-store`.
- **Do not** build backend, admin panel, or Mongo models.
- All catalog data comes from an **existing shared Express backend**:
  - Base URL from `NEXT_PUBLIC_API_URL` (default `http://localhost:5000`)
  - Catalog endpoints already live:
    - `GET /api/products/public` — listed products only
    - `GET /api/products/public/:slug` — product detail
  - Query params for list: `category`, `intention`, `featured=true`, `bestSeller=true`, `isNewArrival=true` or `isNew=true`, `zodiac`, `q`, `page`, `limit`
- Admin manages products elsewhere. Store is **read-only** for catalog. Never call admin mutation routes (`POST/PUT/PATCH/DELETE /api/products...`).
- Commerce checkout API is ready: `POST /api/store/orders` (COD). Also available:
  - `GET /api/store/meta`
  - `GET /api/store/menu` (mega menu)
  - `GET /api/store/catalog` (full filters + sort + pagination)
  - `GET /api/store/catalog/facets` (sidebar facet counts)
  - `GET /api/store/collections` and `GET /api/store/collections/:slug`
  - `GET /api/store/search/suggest`
  - `GET /api/store/products/:slug` and `/related`
  - `GET /api/store/orders/:orderNumber?phone=`
  - `POST /api/store/newsletter`
  - `POST /api/store/leads/consultation`
  Wire checkout to these; do not stub order create unless the API is unreachable.
- **Mandatory reading for API details:** project file `brain/store-frontend-api-reference.md` (or paste its contents). Use `/api/store/catalog` for PLP filters like `minPrice=50000`, `material`, `intention`, `sort=price_asc`, etc.
- Static files/images from API may be relative (`/uploads/...`) — always resolve against `NEXT_PUBLIC_API_URL`.

### Product data contract (use exactly)

Categories: `rudraksha | crystal | stone | gemstone | yantra | bracelet | combo | other`  
Intentions: `Peace | Wealth | Health | Protection | Relationship | Success | Spirituality`

Key fields: `title`, `slug`, `shortDescription`, `description`, `category`, `images[{url,alt,isPrimary}]`, `mrp`, `salePrice`, `quantity`, `variants[{label,mukhi,size,weight,material,color,mrp,salePrice,quantity,isActive,_id}]`, `isFeatured`, `isBestSeller`, `isNewArrival`, `intentions[]`, `attributes{face,stone,shape,weight,gender,color,occasion,zodiac}`, `seo{metaTitle,metaDescription}`, virtuals `discountPercent`, `totalStock`, `isLowStock`.

Pricing UI: show sale price; if MRP > sale, strike MRP and show % off. When a variant is selected, use that variant’s prices/stock.

List response shape:
```json
{ "success": true, "data": [/* products */], "pagination": { "total", "page", "limit", "pages" } }
```
Detail:
```json
{ "success": true, "data": { /* product */ } }
```

### UX reference (structure ONLY)

Study https://gemsmantra.com/ for IA patterns:
- Trust bar, intention shopping, category exploration, bestsellers, product cards with sale pricing, PLP filters, PDP, FAQ, newsletter footer, consultation CTA
- Category PLP pattern: filters + grid + discount badges + SEO content below

**FORBIDDEN:** cloning GemsMantra colors, fonts, logo treatment, copy, exact section order, or component chrome. The result must pass the test: “Would someone mistake this for GemsMantra?” → No.

### Tathaastu visual direction

- Spiritual premium, calm, trustworthy, photo-led.
- Warm stone / soft parchment atmosphere (gradients or subtle texture), deep ink or temple-green primary, soft brass accents sparingly.
- Expressive serif for brand + major headlines; distinctive sans for UI (avoid Inter/Roboto/Arial defaults).
- First viewport = one composition: brand, one headline, one short supporting sentence, CTA group, one dominant visual. No hero card grids, no floating promo stickers, no purple gradients, no generic AI purple SaaS look.
- Product presentation clean and premium; discount badge on-brand (not loud marketplace yellow spam).
- At least 2–3 intentional motions (hero entrance, carousel, product hover).
- Fully responsive.

### Pages to ship (MVP)

1. `/` Home — trust bar, hero, shop-by-intention, categories, featured + bestseller carousels (API flags), optional zodiac, authenticity block, consultation CTA stub, FAQ, footer
2. `/shop` and `/shop/[category]` — filters, grid, pagination, loading/empty/error
3. `/intention/[intention]` — intention-filtered PLP
4. `/product/[slug]` — gallery, variants, price, stock, add to cart, description, SEO metadata
5. `/search?q=`
6. `/cart` — localStorage-persisted cart (Zustand or equivalent)
7. `/checkout` — customer + address + COD; wire to `POST /api/store/orders` when available, else stub with TODO
8. `/order/success`
9. Static: About, Contact, Shipping, Refund, Privacy

### Cart rules

Store: productId, slug, title, image, variantId/label, unitSalePrice, unitMrp, qty.  
Respect inactive variants and zero stock. Show cart count in header.

### Quality bar

- INR formatting (`₹1,499`)
- Accessible controls, meaningful image alts
- Skeleton loaders
- SEO titles/descriptions on PDP from product.seo with fallbacks
- README with setup, env, API map, Phase-2 checkout notes
- Design tokens file (CSS variables) documenting the brand system
- No hardcoded fake catalog as primary source (optional offline mock only if API down, clearly labeled)

### Deliverables

1. Working Next.js store app
2. Distinct Tathaastu design system applied across pages
3. Live integration with public product APIs
4. Cart + checkout UX
5. README + short DESIGN.md (tokens, type, do/don’t)

### Definition of done

- Against a running backend with listed products, user can browse home → PLP → PDP → cart end-to-end
- Unlisted products never appear; invalid slug shows 404
- Looks original to Tathaastu, not a GemsMantra skin or admin dashboard

## PROMPT END
