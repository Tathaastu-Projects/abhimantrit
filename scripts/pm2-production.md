# Abhimantrit storefront — production (PM2)

Buttons / cart / banner clicks do **nothing** if the site is started with `next dev`.
Production must use a **build + start** process.

## Correct PM2 setup

```bash
cd /path/to/abhimantrit
npm ci
npm run build
pm2 delete abhimantrit_store_frontend   # if exists
pm2 start npm --name abhimantrit_store_frontend -- start
# or: pm2 start "npm run start" --name abhimantrit_store_frontend
pm2 save
```

`package.json` → `"start": "node scripts/run-with-env.mjs start"` runs `next start` (production).

## Wrong (causes dead clicks)

```bash
pm2 start npm --name abhimantrit_store_frontend -- run dev
```

`next dev` + nginx domain = client JS often fails to hydrate → Add to Cart, Buy Now, image thumbs, banner arrows look fine but do not work.

## Quick check

Open the live site → DevTools → Network → look for scripts named `turbopack` / `next-devtools`.
If you see those on the live domain, you are still on **dev mode**. Switch to `npm run start` after `npm run build`.
