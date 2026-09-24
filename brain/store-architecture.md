# Tathaastu Store Architecture

## Decision (locked)

- **One backend** = this repo’s `backend/` (Express + MongoDB).
- **Admin frontend** = existing `frontend/` (manage products, remedies, queries, etc.).
- **Store frontend** = **separate Next.js app** (public shopping site only).
- Store frontend consumes **store/public APIs** from this same backend.
- Do **not** create a second product catalog backend or duplicate Mongo product collections.

```
┌────────────────────┐     admin CRUD      ┌─────────────────────┐
│ Admin Frontend     │ ──────────────────► │ Express Backend     │
│ (tathaastu_admin)  │                     │ + MongoDB           │
└────────────────────┘                     │  - Product          │
                                           │  - StoreOrder (new) │
┌────────────────────┐   public store APIs │  - Store CMS (later)│
│ Store Frontend     │ ──────────────────► │                     │
│ (separate repo/app)│                     └─────────────────────┘
└────────────────────┘
```

## Why this is better

1. Products listed/unlisted once in admin appear on the store automatically.
2. Pricing, variants, intentions, images stay single source of truth.
3. Orders from the store can later be managed in the same admin panel.
4. One deployable API, one database, simpler ops.

## Separation of concerns

| Layer | Owns | Does not own |
|-------|------|--------------|
| Admin UI | Product CRUD, list/unlist, images, audits | Public checkout UX |
| Backend | Product model, public catalog APIs, (upcoming) store orders/checkout/CMS | Visual store branding |
| Store UI | Browse, PDP, cart, checkout UX, SEO pages | Product inventing / hardcoding catalog |

## Branding rule

GemsMantra is a **UX/IA reference only**. Tathaastu store must have its **own UI/UX** (colors, type, layout rhythm, copy). Do not clone their look.

## Phased delivery

### Phase A — Catalog live (backend mostly ready)
- Public product list + product-by-slug
- Filters: category, intention, featured, bestSeller, new, zodiac, search
- Store UI: home, shop, PDP, cart (client-side)

### Phase B — Commerce (backend ready; admin UI later)
- `StoreOrder` model + create/list/track APIs — **done**
- COD checkout first — **done** (API)
- Stock reservation / decrement — **done**
- Admin order management UI — **done** (`/store-orders`)
- Newsletter + consultation leads APIs — **done**

### Phase C — Growth
- Razorpay / UPI online pay
- CMS: banners, FAQs, trust blocks, blogs
- Reviews, consultation booking, recommendation quiz
- Newsletter

## Related docs

- `store-backend-apis.md` — API contract (existing + planned)
- `store-frontend-brief.md` — UI/UX + pages for store frontend agent
- `store-frontend-agent-prompt.md` — copy-paste prompt for another agent
