
const loginPopup = document.querySelector(".login-popup");
const close = document.querySelector(".close");

if (loginPopup && close) {
  const POPUP_KEY = "ga_quote_popup_dismissed_v1";

  function isMobile() {
    return window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
  }

  function alreadyDismissed() {
    try {
      return window.localStorage.getItem(POPUP_KEY) === "1";
    } catch {
      return false;
    }
  }

  function dismissPopup() {
    loginPopup.classList.remove("show");
    try {
      window.localStorage.setItem(POPUP_KEY, "1");
    } catch {}
  }

  function showPopup() {
    if (alreadyDismissed()) return;
    if (isMobile()) return; // don't block scroll on mobile
    loginPopup.classList.add("show");
  }

  window.addEventListener("load", function () {
    window.setTimeout(showPopup, 2000);
  });

  close.addEventListener("click", dismissPopup);

  // Click outside the box closes it
  loginPopup.addEventListener("click", function (event) {
    if (event.target === loginPopup) dismissPopup();
  });

  // ESC closes it
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") dismissPopup();
  });
}
