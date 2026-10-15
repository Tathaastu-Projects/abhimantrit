(function () {
  function boot() {
    var root = document.getElementById("home-hero");
    if (!root || root.getAttribute("data-bound") === "1") return;
    root.setAttribute("data-bound", "1");

    var track = root.querySelector("[data-hero-track]");
    if (!track) return;

    var count = Number(root.getAttribute("data-count") || "1");
    var pages = count + 1;
    var index = 0;
    var timer = 0;
    var moveMs = 700;

    function render(next, animate) {
      index = next;
      track.style.animation = "none";
      track.style.transition = animate ? "transform " + moveMs + "ms ease-in-out" : "none";
      track.style.transform = "translate3d(" + (-next * (100 / pages)) + "%, 0, 0)";
    }

    function go(direction) {
      var next = index + direction;
      if (next < 0) next = count;
      if (next > count) next = 0;
      render(next, true);
      if (next === count) {
        window.setTimeout(function () {
          if (index === count) render(0, false);
        }, moveMs);
      }
      arm();
    }

    function arm() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        go(1);
      }, 3000);
    }

    var buttons = root.querySelectorAll("[data-hero-dir]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        go(Number(this.getAttribute("data-hero-dir")));
      });
    }

    render(0, false);
    arm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
