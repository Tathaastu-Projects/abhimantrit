(function () {
  function boot() {
    var root = document.getElementById("home-hero");
    if (!root || root.getAttribute("data-bound") === "1") return;
    root.setAttribute("data-bound", "1");

    var track = root.querySelector("[data-hero-track]");
    if (!track) return;

    var count = Number(root.getAttribute("data-count") || "1");
    var pages = count + 2;
    var index = 1;
    var timer = 0;
    var paused = 0;
    var moveMs = 700;

    function render(next, animate) {
      index = next;
      track.style.animation = "none";
      track.style.transition = animate ? "transform " + moveMs + "ms ease-in-out" : "none";
      track.style.transform = "translate3d(" + (-next * (100 / pages)) + "%, 0, 0)";
    }

    function go(direction) {
      var next = index + direction;
      if (next < 0) next = 0;
      if (next > count + 1) next = count + 1;
      render(next, true);
      if (next === 0) {
        window.setTimeout(function () {
          if (index === 0) render(count, false);
        }, moveMs);
      } else if (next === count + 1) {
        window.setTimeout(function () {
          if (index === count + 1) render(1, false);
        }, moveMs);
      }
      arm();
    }

    function arm() {
      window.clearInterval(timer);
      if (paused) return;
      timer = window.setInterval(function () {
        go(1);
      }, 3000);
    }

    function pause() {
      paused = 1;
      window.clearInterval(timer);
    }

    function resume() {
      if (!paused) return;
      paused = 0;
      arm();
    }

    var holds = root.querySelectorAll("[data-hero-pause]");
    for (var h = 0; h < holds.length; h++) {
      holds[h].addEventListener("mouseenter", pause);
      holds[h].addEventListener("mouseleave", resume);
      holds[h].addEventListener("focus", pause);
      holds[h].addEventListener("blur", resume);
    }

    var buttons = root.querySelectorAll("[data-hero-dir]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        go(Number(this.getAttribute("data-hero-dir")));
      });
    }

    render(1, false);
    arm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
