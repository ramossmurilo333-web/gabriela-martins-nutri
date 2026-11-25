/* Gabriela Martins — Nutricionista
 * Lê js/config.js e cuida de: links de WhatsApp/Instagram, fotos,
 * header ao rolar, menu mobile, animações de entrada e parallax. */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function safe(name, fn) { try { fn(); } catch (e) { console.warn("[site] " + name + ":", e); } }

  /* WhatsApp ------------------------------------------------------------- */
  safe("whatsapp", function () {
    var wa = cfg.whatsapp || {};
    var number = String(wa.number || "").replace(/\D/g, "");
    $all("[data-wa]").forEach(function (a) {
      var text = encodeURIComponent(a.getAttribute("data-wa-message") || wa.message || "");
      a.href = "https://wa.me/" + number + (text ? "?text=" + text : "");
      a.target = "_blank";
      a.rel = "noopener";
    });
  });

  /* Instagram e dados profissionais ------------------------------------- */
  safe("contatos", function () {
    $all("[data-instagram]").forEach(function (a) {
      if (cfg.instagram) {
        a.href = cfg.instagram;
        if (a.hasAttribute("data-instagram-handle")) {
          var handle = cfg.instagram.replace(/\/+$/, "").split("/").pop();
          if (handle) a.textContent = "@" + handle;
        }
      } else {
        var item = a.closest("[data-instagram-item]");
        (item || a).hidden = true;
      }
    });
    var info = cfg.professional || {};
    $all("[data-info]").forEach(function (el) {
      var value = info[el.getAttribute("data-info")];
      if (value) { el.textContent = value; el.hidden = false; }
    });
    $all("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  });

  /* Fotos ---------------------------------------------------------------- */
  safe("fotos", function () {
    var photos = cfg.photos || {};
    $all("[data-photo]").forEach(function (fig) {
      var key = fig.getAttribute("data-photo");
      var p = photos[key];
      if (!p || !p.src) return;
      var img = new Image();
      img.alt = p.alt || "";
      img.decoding = "async";
      if (key === "hero") { img.setAttribute("fetchpriority", "high"); }
      else { img.loading = "lazy"; }
      if (p.position) img.style.objectPosition = p.position;
      img.onload = function () { fig.classList.add("has-photo"); };
      img.onerror = function () { console.warn("[site] foto não encontrada:", p.src); img.remove(); };
      img.src = p.src;
      fig.appendChild(img);
    });
  });

  /* Header ao rolar ------------------------------------------------------ */
  var header = document.getElementById("header");
  function onScrollHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* Menu mobile ---------------------------------------------------------- */
  safe("menu", function () {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("menu");
    if (!toggle || !nav) return;
    var root = document.documentElement;

    function setOpen(open) {
      root.classList.toggle("menu-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    }
    toggle.addEventListener("click", function () {
      setOpen(!root.classList.contains("menu-open"));
    });
    $all("a", nav).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("menu-open")) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", function (e) { if (e.matches) setOpen(false); });
  });

  /* Animações de entrada ------------------------------------------------- */
  safe("reveal", function () {
    var items = $all("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    // pequeno atraso em cascata entre irmãos
    items.forEach(function (el) {
      var siblings = $all(":scope > [data-reveal]", el.parentElement);
      var i = siblings.indexOf(el);
      if (i > 0) el.style.setProperty("--d", Math.min(i, 5) * 0.08 + "s");
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  });

  /* Parallax suave ------------------------------------------------------- */
  safe("parallax", function () {
    if (reduceMotion) return;
    var els = $all("[data-parallax]");
    if (!els.length) return;
    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0;
        var offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  });

  /* Seção interativa: objetivos ----------------------------------------- */
  safe("objetivos", function () {
    var section = document.getElementById("objetivos");
    if (!section) return;
    var tabs = $all('[role="tab"]', section);
    var DURATION = 7000;
    var timer = null, autoplay = !reduceMotion, inView = false;
    section.style.setProperty("--goal-time", DURATION / 1000 + "s");

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (!panel) return;
        if (on) {
          panel.hidden = false;
          panel.classList.remove("is-active");
          void panel.offsetWidth; // reinicia as animações de entrada
          panel.classList.add("is-active");
        } else {
          panel.hidden = true;
          panel.classList.remove("is-active");
        }
      });
      if (focus) tab.focus();
      // reinicia a barrinha de progresso
      var bar = tab.querySelector(".goals__bar");
      if (bar) { bar.style.display = "none"; void bar.offsetWidth; bar.style.display = ""; }
      schedule();
    }
    function next() {
      var i = tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; });
      select(tabs[(i + 1) % tabs.length]);
    }
    function schedule() {
      clearTimeout(timer);
      section.classList.toggle("is-autoplay", autoplay && inView);
      if (autoplay && inView) timer = setTimeout(next, DURATION);
    }
    function stopAutoplay() { autoplay = false; schedule(); }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { stopAutoplay(); select(tab); });
      tab.addEventListener("keydown", function (e) {
        var to = null;
        if (e.key === "ArrowRight") to = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") to = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") to = tabs[0];
        if (e.key === "End") to = tabs[tabs.length - 1];
        if (to) { e.preventDefault(); stopAutoplay(); select(to, true); }
      });
    });
    // parar a troca automática quando a pessoa interage com o painel
    $all(".goal", section).forEach(function (p) {
      p.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") stopAutoplay(); });
      p.addEventListener("touchstart", stopAutoplay, { passive: true });
      p.addEventListener("focusin", stopAutoplay);
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        schedule();
      }, { rootMargin: "-35% 0px -35% 0px" }).observe(section);
    }
    // cards das áreas abrem o objetivo correspondente
    $all("[data-goal-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        var tab = section.querySelector('[data-goal="' + link.getAttribute("data-goal-link") + '"]');
        if (tab) { stopAutoplay(); select(tab); }
      });
    });
  });

  /* Linha do "Como funciona" acompanha a rolagem -------------------------- */
  safe("timeline", function () {
    var list = document.querySelector("[data-timeline]");
    if (!list) return;
    var items = $all(".timeline__item", list);
    var ticking = false;
    function update() {
      var r = list.getBoundingClientRect();
      var mark = window.innerHeight * 0.6;
      var p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
      list.style.setProperty("--progress", p.toFixed(3));
      items.forEach(function (it) {
        it.classList.toggle("is-reached", it.getBoundingClientRect().top + 28 < mark);
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  });

  /* Foto do hero reage ao mouse (só desktop) ----------------------------- */
  safe("tilt", function () {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var hero = document.querySelector(".hero");
    var els = $all("[data-tilt]");
    if (!hero || !els.length) return;
    hero.addEventListener("pointermove", function (e) {
      var x = e.clientX / window.innerWidth - 0.5;
      var y = e.clientY / window.innerHeight - 0.5;
      els.forEach(function (el) {
        var k = parseFloat(el.getAttribute("data-tilt")) || 0;
        el.style.transform = "translate3d(" + (x * k).toFixed(1) + "px," + (y * k).toFixed(1) + "px,0)";
      });
    });
    hero.addEventListener("pointerleave", function () {
      els.forEach(function (el) { el.style.transform = ""; });
    });
  });

  /* Movimento reduzido: pausa animações SVG ------------------------------ */
  if (reduceMotion) {
    $all("svg").forEach(function (svg) { if (svg.pauseAnimations) svg.pauseAnimations(); });
  }
})();
