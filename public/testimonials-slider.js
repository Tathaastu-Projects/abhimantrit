(function () {
  function visibleCount() {
    return window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
  }

  function gapPx(track) {
    var style = window.getComputedStyle(track);
    var gap = parseFloat(style.columnGap || style.gap || "0");
    return Number.isFinite(gap) ? gap : 0;
  }

  function start(root) {
    if (root.dataset.testimonialsReady === "1") return;
    var frame = root.querySelector("[data-testimonials-frame]");
    var track = root.querySelector("[data-testimonials-track]");
    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-testimonials-slide]"));
    if (!frame || !track || slides.length < 2) return;
    root.dataset.testimonialsReady = "1";

    var index = 0;
    var timer = 0;

    function maxIndex() {
      return Math.max(0, slides.length - visibleCount());
    }

    function render() {
      var count = visibleCount();
      var width = frame.clientWidth;
      if (!width) return;
      var gap = gapPx(track);
      var slideWidth = (width - gap * (count - 1)) / count;
      slides.forEach(function (slide) {
        slide.style.flex = "0 0 " + slideWidth + "px";
        slide.style.width = slideWidth + "px";
        slide.style.minWidth = slideWidth + "px";
      });
      if (index > maxIndex()) index = 0;
      track.style.transition = "transform 0.7s ease";
      track.style.transform = "translateX(" + -(index * (slideWidth + gap)) + "px)";
    }

    function show(next) {
      var max = maxIndex();
      if (max === 0) {
        index = 0;
      } else if (next > max) {
        index = 0;
      } else if (next < 0) {
        index = max;
      } else {
        index = next;
      }
      render();
    }

    function step() {
      return visibleCount();
    }

    function arm() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        show(index + step());
      }, 5000);
    }

    var prev = root.querySelector("[data-testimonials-prev]");
    var next = root.querySelector("[data-testimonials-next]");
    if (prev) {
      prev.addEventListener("click", function () {
        show(index - step());
        arm();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        show(index + step());
        arm();
      });
    }

    window.addEventListener("resize", render);
    render();
    arm();
  }

  function boot() {
    document.querySelectorAll("[data-testimonials]").forEach(start);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
