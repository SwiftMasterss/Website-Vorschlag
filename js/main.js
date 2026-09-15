/* Grimme Bodengutachten — kleine UI-Interaktionen (mobiles Menü, Kartentooltip) */
(function () {
  "use strict";

  // Mobiles Menü ein-/ausblenden
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    });

    // Menü schließen, sobald ein Link angeklickt wird (mobil)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Menü öffnen");
      });
    });
  }

  // Standort-Tooltip auf der Karte: auch per Tastatur/Touch bedienbar
  var pinWrap = document.querySelector(".map-pin-wrap");
  var pin = document.querySelector(".map-pin");

  if (pinWrap && pin) {
    pin.addEventListener("click", function (e) {
      e.preventDefault();
      pinWrap.classList.toggle("is-open");
    });

    document.addEventListener("click", function (e) {
      if (!pinWrap.contains(e.target)) {
        pinWrap.classList.remove("is-open");
      }
    });
  }

  // Footer-Jahr automatisch aktuell halten
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Kopfzeile bleibt sticky, wird aber ab wenigen Pixeln Scroll kompakter,
  // damit sie nicht dauerhaft zu viel vom Sichtfeld einnimmt.
  var header = document.querySelector(".site-header");
  if (header) {
    var ticking = false;
    function applyScrolledState() {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(applyScrolledState);
          ticking = true;
        }
      },
      { passive: true }
    );
    applyScrolledState();
  }
})();
