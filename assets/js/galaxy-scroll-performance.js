(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
      return;
    }
    document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var isMobileScroll = function () {
      return window.matchMedia("(max-width: 991.98px)").matches || window.matchMedia("(pointer: coarse)").matches;
    };

    function enforceNativeMobileScroll() {
      if (!isMobileScroll()) return;

      document.documentElement.classList.add("native-mobile-scroll");
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";

      ["#smooth-wrapper", "#smooth-content", ".my-app"].forEach(function (selector) {
        var node = document.querySelector(selector);
        if (!node) return;
        node.style.maxHeight = "none";
        node.style.height = "auto";
        node.style.overflow = "visible";
        node.style.transform = "none";
      });

      if (window.ScrollSmoother && ScrollSmoother.get && ScrollSmoother.get()) {
        ScrollSmoother.get().kill();
      }
    }

    document.querySelectorAll("img:not([loading])").forEach(function (img, index) {
      if (index > 1) img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", img.getAttribute("decoding") || "async");
    });

    document.querySelectorAll("iframe:not([loading])").forEach(function (frame) {
      frame.setAttribute("loading", "lazy");
    });

    enforceNativeMobileScroll();
    window.addEventListener("load", enforceNativeMobileScroll, { once: true });
    window.addEventListener("orientationchange", function () {
      window.setTimeout(enforceNativeMobileScroll, 250);
    }, { passive: true });
    window.addEventListener("resize", function () {
      if (isMobileScroll()) window.requestAnimationFrame(enforceNativeMobileScroll);
    }, { passive: true });
  });
})();
