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
    var hasGsap = typeof window.gsap !== "undefined";
    var hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
    var hasScrollSmoother = typeof window.ScrollSmoother !== "undefined";

    if (hasGsap && hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (
      hasGsap &&
      hasScrollTrigger &&
      hasScrollSmoother &&
      document.querySelector("#smooth-wrapper") &&
      document.querySelector("#smooth-content") &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.registerPlugin(ScrollSmoother);
      if (!ScrollSmoother.get()) {
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.25,
          smoothTouch: 0.12,
          normalizeScroll: true,
          ignoreMobileResize: true,
          effects: false
        });
        window.setTimeout(function () {
          if (window.ScrollTrigger) ScrollTrigger.refresh();
        }, 180);
      }
    }

    document.querySelectorAll('div[style*="position:fixed"] img[src^="images/"]').forEach(function (img) {
      var holder = img.closest("div");
      if (holder) holder.remove();
    });

    if (!document.querySelector(".galaxy-float")) {
      var float = document.createElement("div");
      float.className = "galaxy-float";
      float.innerHTML =
        '<a href="tel:+919837241310" aria-label="Call Galaxy Advertisers"><i class="fa-solid fa-phone"></i></a>' +
        '<a href="https://wa.me/919837241310?text=Hello%20Galaxy%20Advertisers%2C%20I%20need%20an%20outdoor%20advertising%20quotation." aria-label="WhatsApp Galaxy Advertisers" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>';
      document.body.appendChild(float);
    }

    var nav = document.querySelector(".primary-navbar");
    if (nav) {
      var lastScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
      var ticking = false;
      var setNavState = function () {
        var current = window.pageYOffset || document.documentElement.scrollTop || 0;
        var menuOpen = document.querySelector(".show-offcanvas-menu, .show-menu");
        if (current < 120 || current < lastScroll || menuOpen) {
          nav.classList.remove("galaxy-nav-hidden");
          nav.classList.add("galaxy-nav-visible");
        } else if (current > lastScroll && current > window.innerHeight * 0.45) {
          nav.classList.add("galaxy-nav-hidden");
          nav.classList.remove("galaxy-nav-visible");
        }
        lastScroll = Math.max(current, 0);
        ticking = false;
      };
      window.addEventListener("scroll", function () {
        if (!ticking) {
          window.requestAnimationFrame(setNavState);
          ticking = true;
        }
      }, { passive: true });
      setNavState();
    }

    if (!document.querySelector(".galaxy-page-progress")) {
      var progress = document.createElement("div");
      progress.className = "galaxy-page-progress";
      document.body.appendChild(progress);
    }

    if (!document.querySelector(".galaxy-scanline")) {
      var scanline = document.createElement("div");
      scanline.className = "galaxy-scanline";
      document.body.appendChild(scanline);
    }

    var main = document.querySelector("main");
    if (main) {
      [
        ".avista-works",
        ".galaxy-rollout",
        ".offer",
        ".testimonial",
        ".blog",
        ".sponsor",
        ".next-page"
      ].forEach(function (selector) {
        main.querySelectorAll(selector).forEach(function (node) {
          node.classList.add("is-hidden-home-flow");
        });
      });

      [
        ".avista-home",
        ".galaxy-services",
        ".galaxy-logos",
        ".galaxy-impact",
        ".galaxy-showcase",
        ".agency",
        ".galaxy-testimonials",
        ".galaxy-faq",
        ".galaxy-blog",
        ".galaxy-contact"
      ].forEach(function (selector) {
        var section = main.querySelector(selector);
        if (section) {
          main.appendChild(section);
        }
      });
    }

    if (document.querySelector(".portfolio") && !document.querySelector(".galaxy-marquee")) {
      var marquee = document.createElement("section");
      marquee.className = "galaxy-marquee";
      marquee.innerHTML =
        '<div class="galaxy-marquee__track">' +
        '<span>Unipole <em>/</em></span><span>Glow Sign <em>/</em></span><span>In-Shop Branding <em>/</em></span><span>Display Boards <em>/</em></span><span>OOH Strategy <em>/</em></span>' +
        '<span>Unipole <em>/</em></span><span>Glow Sign <em>/</em></span><span>In-Shop Branding <em>/</em></span><span>Display Boards <em>/</em></span><span>OOH Strategy <em>/</em></span>' +
        '</div>';
      document.querySelector(".portfolio").insertAdjacentElement("beforebegin", marquee);
    }

    if (document.querySelector(".service-single-banner") && !document.querySelector(".galaxy-service-strip")) {
      var title = document.querySelector(".service-single-banner .title");
      var serviceTitle = title ? title.textContent.trim() : "Outdoor Advertising";
      var strip = document.createElement("section");
      strip.className = "galaxy-service-strip";
      strip.innerHTML =
        '<div class="container">' +
        '<div class="galaxy-service-strip__layout">' +
        '<div>' +
        '<span class="galaxy-service-strip__eyebrow">Campaign Engine</span>' +
        '<h2 class="title-anim">Plan, print, install and track ' + serviceTitle + ' with one execution team.</h2>' +
        '<p class="primary-text section__content-cta">High-footfall placements, local route intelligence, production support and fast deployment across Uttarakhand, West UP and Punjab.</p>' +
        '<div class="galaxy-service-points">' +
        '<span>Location strategy <i class="fa-solid fa-location-crosshairs"></i></span>' +
        '<span>Creative sizing <i class="fa-solid fa-pen-ruler"></i></span>' +
        '<span>Installation follow-up <i class="fa-solid fa-screwdriver-wrench"></i></span>' +
        '</div>' +
        '</div>' +
        '<div class="galaxy-service-panel topy-tilt">' +
        '<img src="assets/images/clients/portfolio/Haridwar-5.jpg" alt="Outdoor advertising campaign">' +
        '<h4>Live market visibility</h4>' +
        '<p>Built for road traffic, retail areas, pilgrim routes and high-recall brand moments.</p>' +
        '</div>' +
        '</div>' +
        '</div>';
      document.querySelector(".service-single-banner").insertAdjacentElement("afterend", strip);
    }

    if (!hasGsap) return;

    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.set(".banner__content-inner, .galaxy-impact-card, .galaxy-livebar__item, .galaxy-service-panel", {
      transformOrigin: "center center"
    });

    gsap.to(".galaxy-page-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: hasScrollTrigger ? {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      } : undefined
    });

    gsap.to(".galaxy-scanline", {
      y: 80,
      repeat: -1,
      duration: 3.4,
      ease: "none"
    });

    gsap.from(".primary-navbar", {
      y: -24,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out"
    });

    if (document.querySelector(".banner")) {
      var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".banner__content h1", { y: 70, opacity: 0, duration: 1.05 })
        .from(".banner__content-inner", { y: 36, opacity: 0, duration: 0.85 }, "-=0.55")
        .from(".banner__content-inner .single", { y: 28, opacity: 0, stagger: 0.12, duration: 0.7 }, "-=0.45")
        .from(".banner-one-thumb", { x: 90, rotate: 4, opacity: 0, duration: 1 }, "-=0.8");

      if (hasScrollTrigger) {
        gsap.to(".banner-one-thumb", {
          yPercent: -16,
          rotate: -2,
          ease: "none",
          scrollTrigger: {
            trigger: ".banner",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }

    if (hasScrollTrigger) {
      if (document.querySelector(".galaxy-marquee__track")) {
        gsap.to(".galaxy-marquee__track", {
          xPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: ".galaxy-marquee",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      gsap.utils.toArray(".galaxy-impact-card, .contact-m__single, .mission-s__single, .service-details .details-group, .galaxy-service-panel").forEach(function (el, index) {
        gsap.from(el, {
          x: index % 2 === 0 ? -90 : 90,
          y: 58,
          opacity: 0,
          rotateX: 5,
          rotateZ: index % 2 === 0 ? -1.5 : 1.5,
          duration: 0.9,
          delay: (index % 4) * 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".portfolio__single img, .service-details .poster img, .award__thumb img, .agency__thumb img, .offer__cta-single").forEach(function (img, index) {
        gsap.to(img, {
          yPercent: index % 2 === 0 ? -10 : 10,
          scale: img.tagName && img.tagName.toLowerCase() === "img" ? 1.08 : 1,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      gsap.utils.toArray(".section__header, .section__content, .footer-two__left, .footer-two__right, .cta-two-wrapper").forEach(function (block, index) {
        gsap.from(block, {
          y: 70,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1,
          delay: (index % 3) * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 86%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".portfolio__single").forEach(function (card, index) {
        gsap.from(card, {
          x: index % 2 === 0 ? -120 : 120,
          y: 90,
          opacity: 0,
          rotate: index % 2 === 0 ? -3 : 3,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".galaxy-livebar__item strong").forEach(function (num) {
        var raw = num.textContent.trim();
        var value = parseInt(raw.replace(/\D/g, ""), 10);
        if (!value) return;
        var suffix = raw.replace(/[0-9]/g, "");
        var state = { val: 0 };
        gsap.to(state, {
          val: value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: num,
            start: "top 92%",
            once: true
          },
          onUpdate: function () {
            num.textContent = Math.round(state.val) + suffix;
          }
        });
      });
    }

    document.querySelectorAll(".galaxy-impact-card, .portfolio__single, .contact-m__single, .galaxy-service-panel").forEach(function (card) {
      card.addEventListener("mousemove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 7,
          rotateX: y * -7,
          y: -4,
          duration: 0.45,
          ease: "power2.out"
        });
      });
      card.addEventListener("mouseleave", function () {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          duration: 0.55,
          ease: "power2.out"
        });
      });
    });

    if (window.innerWidth > 768 && !document.querySelector(".galaxy-cursor-light")) {
      var light = document.createElement("div");
      light.className = "galaxy-cursor-light";
      document.body.appendChild(light);
      window.addEventListener("mousemove", function (event) {
        gsap.to(light, {
          x: event.clientX,
          y: event.clientY,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out"
        });
      });
    }

    window.addEventListener("load", function () {
      if (hasScrollTrigger) ScrollTrigger.refresh();
    });
  });
})();
