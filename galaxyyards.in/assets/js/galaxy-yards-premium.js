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
    if (!document.querySelector(".yards-float")) {
      var float = document.createElement("div");
      float.className = "yards-float";
      float.innerHTML =
        '<a href="tel:+919837241310" aria-label="Call Galaxy Yards"><i class="fa fa-phone"></i></a>' +
        '<a href="https://wa.me/919837241310?text=Hello%20Galaxy%20Yards%2C%20I%20want%20to%20schedule%20a%20site%20visit." target="_blank" rel="noopener" aria-label="WhatsApp Galaxy Yards"><i class="fab fa-whatsapp"></i></a>';
      document.body.appendChild(float);
    }

    var nav = document.querySelector(".header-area");
    if (nav) {
      var lastScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
      var ticking = false;
      var setNavState = function () {
        var current = window.pageYOffset || document.documentElement.scrollTop || 0;
        var mobileMenuOpen = nav.querySelector(".menu-trigger.active");
        if (current < 120 || current < lastScroll || mobileMenuOpen) {
          nav.classList.remove("yards-nav-hidden");
          nav.classList.add("yards-nav-visible");
        } else if (current > lastScroll && current > window.innerHeight * 0.45) {
          nav.classList.add("yards-nav-hidden");
          nav.classList.remove("yards-nav-visible");
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

    if (!document.querySelector(".yards-page-progress")) {
      var progress = document.createElement("div");
      progress.className = "yards-page-progress";
      document.body.appendChild(progress);
    }

    if (!document.querySelector(".yards-ambient")) {
      var ambient = document.createElement("div");
      ambient.className = "yards-ambient";
      ambient.innerHTML = "<span></span><span></span><span></span>";
      document.body.appendChild(ambient);
    }

    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      if (!/schedule a visit/i.test(link.textContent)) return;
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var form = document.querySelector(".contact-page form, .contact form");
        if (form) {
          form.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          window.location.href = "contact.html";
        }
      });
    });

    if (document.querySelector(".main-banner") && !document.querySelector(".yards-leadbar")) {
      var leadbar = document.createElement("section");
      leadbar.className = "yards-leadbar";
      leadbar.innerHTML =
        '<div class="container">' +
        '<div class="yards-leadbar__grid">' +
        '<div class="yards-leadbar__item"><i class="fa fa-location-dot"></i><strong>Patanjali Food Park</strong><span>Prime Laksar Road location near active growth corridors.</span></div>' +
        '<div class="yards-leadbar__item"><i class="fa fa-border-all"></i><strong>Residential + Commercial</strong><span>Flexible plot options for living, investment and business use.</span></div>' +
        '<div class="yards-leadbar__item"><i class="fa fa-file-signature"></i><strong>Clear Titles</strong><span>Transparent project details and guided documentation support.</span></div>' +
        '<div class="yards-leadbar__item"><i class="fa fa-calendar-check"></i><strong>Site Visits</strong><span>Fast visit scheduling with location and availability guidance.</span></div>' +
        '</div>' +
        '</div>';
      document.querySelector(".main-banner").insertAdjacentElement("afterend", leadbar);
    }

    if ((document.querySelector(".properties") || document.querySelector(".single-property")) && !document.querySelector(".yards-availability")) {
      var availability = document.createElement("section");
      availability.className = "yards-availability";
      availability.innerHTML =
        '<div class="container">' +
        '<div class="yards-availability__wrap">' +
        '<div class="yards-availability__intro"><h2>Live plot planning for RW Kunch.</h2><p>Compare plot sizes, visit the site and shortlist options with the Galaxy Yards team.</p></div>' +
        '<div class="yards-availability__metric"><strong>24/7</strong><span>Inquiry support</span></div>' +
        '<div class="yards-availability__metric"><strong>2</strong><span>Plot categories</span></div>' +
        '<div class="yards-availability__metric"><strong>1</strong><span>Prime Haridwar location</span></div>' +
        '</div>' +
        '</div>';
      var target = document.querySelector(".properties") || document.querySelector(".single-property");
      target.insertAdjacentElement("beforebegin", availability);
    }

    if (!document.querySelector(".yards-marquee")) {
      var marquee = document.createElement("section");
      marquee.className = "yards-marquee";
      marquee.innerHTML =
        '<div class="yards-marquee__track">' +
        '<span>Prime Plots <em>/</em></span><span>Site Visits <em>/</em></span><span>Clear Title <em>/</em></span><span>Haridwar Growth <em>/</em></span>' +
        '<span>Prime Plots <em>/</em></span><span>Site Visits <em>/</em></span><span>Clear Title <em>/</em></span><span>Haridwar Growth <em>/</em></span>' +
        '</div>';
      var anchor = document.querySelector(".featured, .properties, .single-property, .contact-page");
      if (anchor) anchor.insertAdjacentElement("beforebegin", marquee);
    }

    if (typeof gsap === "undefined") return;

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    gsap.to(".yards-page-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: typeof ScrollTrigger !== "undefined" ? {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      } : undefined
    });

    gsap.to(".yards-ambient span:nth-child(1)", { x: 90, y: 80, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".yards-ambient span:nth-child(2)", { x: -110, y: -70, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".yards-ambient span:nth-child(3)", { x: 80, y: -90, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });

    gsap.from(".header-area", {
      y: -28,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out"
    });

    gsap.from(".main-banner .header-text span, .main-banner .header-text h2", {
      y: 64,
      opacity: 0,
      duration: 1,
      stagger: 0.16,
      ease: "power3.out"
    });

    gsap.from(".yards-leadbar__item", {
      y: 46,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0.35
    });

    if (typeof ScrollTrigger !== "undefined") {
      if (document.querySelector(".yards-marquee__track")) {
        gsap.to(".yards-marquee__track", {
          xPercent: -34,
          ease: "none",
          scrollTrigger: {
            trigger: ".yards-marquee",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      gsap.utils.toArray(".featured .left-image, .featured .section-heading, .accordion, .info-table, .properties .item, .best-deal .tabs-content, .single-property .main-image, .single-property .main-content, .contact-page form, .contact-page #map, .yards-availability__metric").forEach(function (el, index) {
        gsap.from(el, {
          x: index % 2 === 0 ? -72 : 72,
          y: 58,
          opacity: 0,
          rotateZ: index % 2 === 0 ? -1.2 : 1.2,
          duration: 0.85,
          delay: (index % 3) * 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true
          }
        });
      });

      gsap.utils.toArray(".main-banner .item, .video-content .video-frame img, .featured .left-image video, .single-property .main-image img, .properties .item img").forEach(function (el, index) {
        gsap.to(el, {
          yPercent: index % 2 === 0 ? -10 : 8,
          scale: el.tagName && el.tagName.toLowerCase() === "img" ? 1.06 : 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      gsap.utils.toArray(".section-heading, .best-deal .info-table, .contact .item").forEach(function (block, index) {
        gsap.from(block, {
          filter: "blur(8px)",
          y: 60,
          opacity: 0,
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
    }

    document.querySelectorAll(".properties .item, .yards-leadbar__item, .info-table, .contact .item").forEach(function (card) {
      card.addEventListener("mousemove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 5,
          rotateX: y * -5,
          y: -5,
          duration: 0.35,
          ease: "power2.out"
        });
      });
      card.addEventListener("mouseleave", function () {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          duration: 0.45,
          ease: "power2.out"
        });
      });
    });

    window.addEventListener("load", function () {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    });
  });
})();
