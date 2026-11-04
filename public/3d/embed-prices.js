/**
 * Override 3D model price / MRP / offer / buyLabel / productSlug from admin API
 * before the explorer reads Models/*.json. Buy button opens /product/{slug}.
 */
(function () {
  var byId = {};
  var params = new URLSearchParams(window.location.search);
  var apiUrl = params.get("pricesApi") || "/api/store/3d-prices";

  var ready = fetch(apiUrl, { cache: "no-store" })
    .then(function (res) {
      return res.ok ? res.json() : null;
    })
    .then(function (json) {
      if (json && json.data && json.data.byId && typeof json.data.byId === "object") {
        byId = json.data.byId;
      }
    })
    .catch(function () {
      /* keep static JSON prices if API unavailable */
    });

  function openProduct(slug) {
    if (!slug) return false;
    var clean = String(slug)
      .trim()
      .replace(/^\/product\//i, "")
      .replace(/^\//, "");
    if (!clean) return false;
    var href = "/product/" + encodeURI(clean);
    try {
      (window.top || window).location.href = href;
    } catch (_e) {
      window.location.href = href;
    }
    return true;
  }

  var origFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || "";
    var request = origFetch(input, init);

    if (!/Models\/[^/?#]+\.json/i.test(String(url))) {
      return request;
    }

    return ready.then(function () {
      return request.then(function (res) {
        if (!res.ok) return res;
        return res
          .clone()
          .json()
          .then(function (data) {
            if (!data || typeof data !== "object") return res;
            var ov = data.id && byId[data.id];
            if (!ov) return res;
            if (ov.price != null && ov.price !== "") data.price = ov.price;
            if (ov.originalPrice != null && ov.originalPrice !== "") {
              data.originalPrice = ov.originalPrice;
            }
            if (ov.offer != null && ov.offer !== "") data.offer = ov.offer;
            if (ov.buyLabel != null && ov.buyLabel !== "") data.buyLabel = ov.buyLabel;
            if (ov.productSlug) data.productSlug = ov.productSlug;
            else if (ov.sku && String(ov.sku).indexOf("-") !== -1) data.productSlug = ov.sku;
            return new Response(JSON.stringify(data), {
              status: res.status,
              statusText: res.statusText,
              headers: { "Content-Type": "application/json" },
            });
          })
          .catch(function () {
            return res;
          });
      });
    });
  };

  // Capture Buy clicks even if the explorer binds its own onclick later.
  document.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var btn = t.closest(".buy");
      if (!btn) return;

      var slug =
        btn.getAttribute("data-product-slug") ||
        (btn.closest(".wrap") &&
          btn.closest(".wrap").getAttribute("data-product-slug")) ||
        "";

      if (!slug) {
        // Fall back: match visible price text to an override with productSlug
        var priceEl = document.querySelector(".purchase .price");
        var priceText = priceEl ? String(priceEl.textContent || "").trim() : "";
        var ids = Object.keys(byId);
        for (var i = 0; i < ids.length; i++) {
          var row = byId[ids[i]];
          if (row && row.productSlug && row.price === priceText) {
            slug = row.productSlug;
            break;
          }
        }
      }

      // Prefer explicit slug from last applied model id on the button
      if (!slug && btn._abhiProductSlug) slug = btn._abhiProductSlug;

      if (slug && openProduct(slug)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );

  // When buy label/price updates, stamp productSlug from byId using current h1 match — weak.
  // Stronger: patch explorer buy.onclick via string replace in index.html.
})();
