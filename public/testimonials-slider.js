(function () {
  function start(root) {
    if (root.dataset.testimonialsReady === "1") return;
    var frame = root.querySelector("[data-testimonials-frame]");
    var track = root.querySelector("[data-testimonials-track]");
    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-testimonials-slide]"));
    if (!frame || !track || slides.length < 2) return;
    root.dataset.testimonialsReady = "1";

    var index = 0;
    var timer = 0;

    function render() {
      var width = frame.clientWidth;
      if (!width) return;
      slides.forEach(function (slide) {
        slide.style.flex = "0 0 " + width + "px";
        slide.style.width = width + "px";
      });
      track.style.transition = "transform 0.7s ease";
      track.style.transform = "translateX(" + -index * width + "px)";
    }

    function show(next) {
      index = (next + slides.length) % slides.length;
      render();
    }

    function arm() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        show(index + 1);
      }, 5000);
    }

    var prev = root.querySelector("[data-testimonials-prev]");
    var next = root.querySelector("[data-testimonials-next]");
    if (prev) {
      prev.addEventListener("click", function () {
        show(index - 1);
        arm();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        show(index + 1);
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
