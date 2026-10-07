# Tathaastu Store (Frontend)

Public e-commerce storefront for **Tathaastu**. Catalog and checkout talk to the existing Express backend — this app never creates or edits products.

Reference UX (IA only): [gemsmantra.com](https://gemsmantra.com/) — **not** a visual clone.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- Zustand cart (persisted to `localStorage`)
- `NEXT_PUBLIC_API_URL` → backend base URL from `.env` (no hardcoded port fallback)
- `PORT` → store frontend listen port from `.env`

## Setup

```bash
npm install
cp .env.example .env
# edit PORT + NEXT_PUBLIC_API_URL for your machine
npm run dev
```

Open `http://localhost:<PORT>` from your `.env`. Backend must be reachable at `NEXT_PUBLIC_API_URL`.

### Env (required — no ports hardcoded in code)

```
PORT=<your_store_port>
NEXT_PUBLIC_API_URL=http://localhost:<your_backend_port>
```

Set real values in `.env` (see `.env.example`). Change anytime, then restart.
`npm run dev` / `npm start` load `PORT` from `.env` via `scripts/run-with-env.mjs` and pass it to Next — nothing in app code hardcodes a listen port.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Home — trust, hero, intentions, categories, carousels, FAQ |
| `/shop`, `/shop/[category]` | PLP with filters, facets, sort, pagination |
| `/collections/[slug]` | Collection SEO + products + facets |
| `/intention/[intention]` | Intention-filtered PLP |
| `/product/[slug]` | PDP + related |
| `/search?q=` | Search |
| `/cart`, `/checkout` | Cart + COD checkout |
| `/order/success` | Post-order confirmation |
| `/track-order` | Order tracking |
| `/about`, `/contact`, `/policies/*` | Static / lead forms |

## APIs used

See `brain/store-frontend-api-reference.md` for full contract.

Primary:

- `GET /api/store/meta`, `/menu`
- `GET /api/store/catalog` (+ `includeFacets=true`)
- `GET /api/store/catalog/facets`
- `GET /api/store/collections/:slug`
- `GET /api/store/products/:slug` (+ `/related`)
- `GET /api/store/search/suggest`
- `POST /api/store/orders` (COD)
- `GET /api/store/orders/:orderNumber?phone=`
- `POST /api/store/newsletter`, `/leads/consultation`

## Design

Warm stone + temple green + soft brass. Tokens in `src/app/globals.css`. Notes in `DESIGN.md`.

## Phase 2 / Phase C checklist

- [x] CMS banners + blogs (UI wired)
- [x] Customer auth + order history
- [x] Wishlist
- [x] Reviews
- [x] Coupons
- [x] Razorpay (mock without keys; live with env keys on backend)
- [ ] Richer track-order timeline UI
- [ ] Recommendation quiz

## Docs in `/brain`

- `store-architecture.md`
- `store-backend-apis.md`
- `store-frontend-api-reference.md`
- `store-frontend-brief.md`
- `store-frontend-agent-prompt.md`
