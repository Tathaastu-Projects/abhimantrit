import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, "..", "public", "3d", "index.html");

let html = fs.readFileSync(indexPath, "utf8");
const ver = Date.now();

function ensureHeadAsset(tagHtml, testRe, replaceRe, hrefOrSrc) {
  if (testRe.test(html)) {
    html = html.replace(replaceRe, hrefOrSrc);
  } else if (html.includes("</head>")) {
    html = html.replace("</head>", `${tagHtml}</head>`);
  } else if (/<body\b/i.test(html)) {
    html = html.replace(/<body\b/i, `${tagHtml}<body`);
  } else {
    html = tagHtml + html;
  }
}

ensureHeadAsset(
  `<link rel="stylesheet" href="./embed-fit.css?v=${ver}">`,
  /embed-fit\.css/,
  /href="\.\/embed-fit\.css[^"]*"/g,
  `href="./embed-fit.css?v=${ver}"`
);

ensureHeadAsset(
  `<script src="./embed-prices.js?v=${ver}"></script>`,
  /embed-prices\.js/,
  /src="\.\/embed-prices\.js[^"]*"/g,
  `src="./embed-prices.js?v=${ver}"`
);

// Pull camera back so the bracelet isn't cropped at the iframe edge.
const fitNeedle =
  'return (entry.file==="chakra-mix-placeholder.glb"&&W<700?205:150) * (1 + Math.max(0, 1.5 / aspect - 1) * 0.7)';
const fitPatched = `${fitNeedle} * 1.28`;
if (!html.includes(fitPatched) && html.includes(fitNeedle)) {
  html = html.replace(fitNeedle, fitPatched);
  console.log("applied camera zoom-out ×1.28");
}

html = html.replace(/var cam = \{ r: 150,/, "var cam = { r: 192,");

// Buy button → product detail page when copy.productSlug is set (from admin SKU).
const buyOld =
  "const buy=root.querySelector('.buy');buy.textContent=copy.buyLabel||'Buy Now';buy.onclick=()=>showBuyToast(entry.name);";
const buyNew =
  "const buy=root.querySelector('.buy');buy.textContent=copy.buyLabel||'Buy Now';buy.setAttribute('data-product-slug',copy.productSlug||'');buy._abhiProductSlug=copy.productSlug||'';buy.onclick=()=>{const slug=copy.productSlug;if(slug){const href='/product/'+String(slug).replace(/^\\/product\\//i,'').replace(/^\\//,'');try{(window.top||window).location.href=href}catch(e){location.href=href}return}showBuyToast(entry.name)};";
if (html.includes(buyOld)) {
  html = html.replace(buyOld, buyNew);
  console.log("patched buy → product detail navigation");
} else if (html.includes("buy._abhiProductSlug")) {
  console.log("buy product-link patch already present");
} else {
  console.warn("buy.onclick pattern not found — skip product link patch");
}

fs.writeFileSync(indexPath, html);
console.log("patched index.html", ver);
