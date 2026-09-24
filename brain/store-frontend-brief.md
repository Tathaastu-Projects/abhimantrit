# Tathaastu Store Frontend — UI/UX & Build Brief

## Mission

Build a **separate public storefront** for Tathaastu where users browse and buy spiritual products. Catalog data comes **only** from the shared Tathaastu backend public/store APIs. Admin manages products elsewhere.

Reference site for **information architecture only**: https://gemsmantra.com/  
**Do not clone** their visual design, copy, or component styling.

---

## Design principles (non-negotiable)

1. **Distinct brand look** — not GemsMantra cream/burgundy clone; not purple SaaS admin look.
2. **Spiritual premium** — calm, trustworthy, photo-led, spacious.
3. **One job per section** — home sections should not feel like a dashboard.
4. **Hero composition** — first viewport: brand + one headline + one short line + CTA group + one dominant visual. No card grid / stats strip / promo clutter in the hero.
5. **Cards only when interactive** — product tiles and filter chips are fine; avoid decorative card walls.
6. **Commerce clarity** — MRP strike, sale price, % off, stock, Add to Cart always obvious.
7. **Mobile-first** — sticky header, usable filters, thumb-friendly CTAs.

### Suggested visual system (customize, but keep cohesive)

| Token | Guidance |
|-------|----------|
| Background | Warm stone / soft parchment gradients or subtle texture — not flat gray, not purple wash |
| Primary | Deep ink OR temple green / deep maroon-adjacent **unique** to Tathaastu |
| Accent | Soft brass / antique gold (sparingly) |
| Text | Expressive serif for brand + H1; modern readable sans for UI/body (avoid default Inter/Roboto/Arial if possible) |
| Motion | 2–3 intentional motions (hero fade/rise, carousel ease, hover on product image) — not noise |
| Imagery | Real product / ritual / atmosphere photography as main visual idea |

### What to borrow from GemsMantra (patterns only)

- Trust bar under nav (Lab certified, shipping, COD, secure)
- Shop by intention / benefits
- Shop by category (and optional zodiac)
- Bestseller / featured carousels
- Product card: image, title, sale vs MRP, discount badge, Add to Cart
- PLP filters + grid + pagination + SEO text block below
- FAQ accordion + newsletter + multi-column footer
- Consultation / recommendation CTA (can be lead form stub in v1)

### What to change

- Color, typography, spacing, section order, illustration style
- Brand name, voice, and all marketing copy must be Tathaastu-original
- Prefer a calmer, more editorial product presentation over aggressive “sale yellow” spam (discount badge can exist, but styled on-brand)

---

## App structure (recommended)

**Stack:** Next.js App Router + TypeScript + Tailwind CSS + Zustand (or Context) for cart.

```
store/
  app/
    layout.tsx
    page.tsx                 # Home
    shop/page.tsx            # All products
    shop/[category]/page.tsx
    intention/[intention]/page.tsx
    product/[slug]/page.tsx
    search/page.tsx
    cart/page.tsx
    checkout/page.tsx
    order/success/page.tsx
    about/page.tsx
    contact/page.tsx
    policies/...
  components/
    layout/Header, Footer, TrustBar
    home/...
    product/ProductCard, ProductGrid, VariantPicker, PriceBlock
    filters/...
    cart/...
  lib/
    api.ts                   # fetch wrappers to NEXT_PUBLIC_API_URL
    cart-store.ts
    format.ts                # INR currency, discount %
  types/product.ts
```

Env:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Pages & behavior

### Home `/`
1. Sticky header: logo (Tathaastu), search, cart count, optional account placeholder
2. Trust bar
3. Hero (brand-first)
4. Shop by Intention → links to `/intention/Wealth` etc.
5. Explore categories → `/shop/rudraksha` etc.
6. Featured carousel → `GET /api/products/public?featured=true`
7. Bestsellers → `?bestSeller=true`
8. Optional zodiac grid → `?zodiac=Aries`
9. Authenticity / trust narrative section
10. Consultation CTA (link or lead stub)
11. FAQ + footer

### Shop `/shop` and `/shop/[category]`
- Grid of ProductCards
- Filters: intention, price display sorting (client sort OK in v1 if API lacks min/max price), search
- Pagination from API `pagination`
- Empty / loading / error states
- Optional long SEO content block under grid (static per category for v1)

### Intention `/intention/[intention]`
- Same grid with `intention` query param
- Validate intention against known enum; 404 otherwise

### Product `/product/[slug]`
- Fetch `GET /api/products/public/:slug`
- Gallery (primary image first)
- Title, short description, PriceBlock
- Variant selector (only `isActive` variants)
- Stock messaging (`totalStock` / variant qty)
- Add to Cart + Buy Now
- Full description
- SEO from `seo.metaTitle` / `seo.metaDescription` with fallbacks
- Related products: same category or shared intention (optional second API call)

### Search `/search?q=`
- Uses `q` on public list endpoint

### Cart `/cart`
- Line items with image, title, variant, qty steppers, line total
- Persist in `localStorage`
- Proceed to checkout

### Checkout `/checkout`
- Collect customer + address
- Show order summary
- **POST** `{API}/api/store/orders` with COD (`paymentMethod: "cod"`)
- Only send `productId`, `variantId` (if any), `quantity` — server sets prices
- On success → `/order/success` with `orderNumber`
- Optional track: `GET /api/store/orders/:orderNumber?phone=`

Also wire:
- Newsletter → `POST /api/store/newsletter`
- Consultation CTA → `POST /api/store/leads/consultation`
- Home/nav constants → `GET /api/store/meta`

---

## Components checklist

- [ ] `PriceBlock` — sale, MRP strike, % off
- [ ] `ProductCard` — image, badges (Sale / Featured / New), prices, CTA
- [ ] `ProductGrid` + skeleton loaders
- [ ] `VariantPicker`
- [ ] `TrustBar`
- [ ] `IntentionNav` / `CategoryNav` / `ZodiacNav`
- [ ] `SearchBox` (header)
- [ ] `CartDrawer` or cart page
- [ ] `FaqAccordion`
- [ ] `Footer` with policies + contact placeholders

---

## Accessibility & quality

- Semantic headings, alt text from `images.alt`
- Keyboard-usable filters and variant buttons
- INR formatting: `₹1,499`
- Never show draft/unlisted (API already filters; still handle 404 on PDP)
- Relative image paths → prefix API origin

---

## Out of scope for store frontend agent

- Building admin UI
- Creating Mongo models
- Calling admin product mutation APIs
- Hardcoding a fake product catalog (use API; mocks only as offline fallback if documented)
- Pixel-perfect GemsMantra recreation

---

## Definition of done (MVP)

1. Runs locally against backend on port 5000
2. Home + shop + intention + PDP + cart work with live listed products
3. Distinct Tathaastu visual system (tokens documented in README or `styles/tokens.css`)
4. Responsive on mobile and desktop
5. README: setup, env, API map, known Phase B checkout hookup
6. No dependency on admin frontend package
