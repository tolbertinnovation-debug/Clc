/* Christ Laborers Church — site interactions (shared by every page) */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var WHATSAPP = "231779230549";
  var IMG = "assets/img/gallery/";

  // Gallery photos: [file name, caption, category].
  // Add a photo by dropping name.webp + name-sm.webp into assets/img/gallery
  // and listing it here. Categories: worship, revival, ordination, celebration.
  var GALLERY = [
    ["sanctuary-sermon", "The Word proclaimed in our sanctuary", "worship"],
    ["clergy-team", "Our Bishop with newly ordained clergy", "ordination"],
    ["clergy-50-days", "Clergy commissioned during 50 Days With the Lord", "ordination"],
    ["celebration-service", "A joyful celebration service", "celebration"],
    ["bishop-preaching-hd", "Preaching with passion and conviction", "worship"],
    ["teaching-session", "Teaching during our revival meeting", "revival"],
    ["front-row-worshippers", "Families gathered in worship", "celebration"],
    ["ordinands-prayer-hd", "Ordinands standing in prayer", "ordination"],
    ["worship-leader-hd", "Leading the house in praise", "worship"],
    ["revival-congregation", "Revival meeting congregation", "revival"],
    ["bishop-blessing", "Vesting and blessing a new minister", "ordination"],
    ["bible-teaching-hd", "Bible in hand, ministering to the church", "revival"],
    ["congregation-listening", "Hearts attentive to the Word", "celebration"],
    ["honorary-presentation", "Celebrating academic achievement", "celebration"],
    ["celebration-crowd", "A full house on celebration Sunday", "celebration"]
  ];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Header: scrolled state ---------- */
  var header = $(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = $(".nav-toggle");
  var nav = $("#nav");
  var mq = window.matchMedia("(max-width: 1180px)");

  function isOpen() { return document.body.classList.contains("nav-open"); }
  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      var first = $(".nav-links a", nav);
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 50);
    }
  }
  toggle.addEventListener("click", function () { setNav(!isOpen()); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
  // Close if the screen grows past the mobile breakpoint while open.
  (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function (e) {
    if (!e.matches) setNav(false);
  });
  // Keep keyboard focus inside the open menu.
  document.addEventListener("keydown", function (e) {
    if (!isOpen()) return;
    if (e.key === "Escape") { setNav(false); toggle.focus(); return; }
    if (e.key !== "Tab") return;
    var focusables = [toggle].concat($$("a, button", nav));
    var i = focusables.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
    else if (!e.shiftKey && i === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
  });

  /* ---------- Gallery ---------- */
  var masonry = $("#masonry");
  if (masonry) {
    var limit = parseInt(masonry.getAttribute("data-limit"), 10) || GALLERY.length;
    GALLERY.slice(0, limit).forEach(function (g) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "reveal";
      b.setAttribute("data-lightbox", IMG + g[0] + ".webp");
      b.setAttribute("data-caption", g[1]);
      b.setAttribute("data-cat", g[2]);
      var img = document.createElement("img");
      img.src = IMG + g[0] + "-sm.webp";
      img.alt = g[1];
      img.loading = "lazy";
      b.appendChild(img);
      masonry.appendChild(b);
    });

    var filterBtns = $$(".filters [data-filter]");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filterBtns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === btn)); });
        $$("button[data-cat]", masonry).forEach(function (item) {
          item.hidden = f !== "all" && item.getAttribute("data-cat") !== f;
          item.classList.add("in");
        });
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Count-up numbers ---------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var start = target > 1000 ? target - 60 : 0;
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach(function (el) { co.observe(el); });
  }

  /* ---------- Countdown to next Monday 4:00 PM (Liberia is UTC+0) ---------- */
  var cd = $("#countdown");
  if (cd) {
    var nextClass = function (now) {
      var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 16, 0, 0));
      d.setUTCDate(d.getUTCDate() + (1 - d.getUTCDay() + 7) % 7);                       // this/next Monday
      if (d.getTime() + 2 * 3600e3 <= now.getTime()) d.setUTCDate(d.getUTCDate() + 7); // class runs ~2h
      return d;
    };
    var tick = function () {
      var now = new Date();
      var diff = nextClass(now) - now;
      if (diff <= 0) { cd.textContent = "In session"; return; }
      var days = Math.floor(diff / 864e5);
      var hrs = Math.floor(diff / 36e5) % 24;
      var mins = Math.floor(diff / 6e4) % 60;
      cd.textContent = days > 0 ? days + "d " + hrs + "h " + mins + "m" : hrs + "h " + mins + "m";
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox");
  if (lb) {
    var lbImg = $("img", lb);
    var lbCap = $("figcaption", lb);
    var items = [], current = 0, lastFocus = null;

    var show = function (i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      lbImg.src = it.getAttribute("data-lightbox");
      lbImg.alt = it.getAttribute("data-caption");
      lbCap.textContent = it.getAttribute("data-caption");
      var multi = items.length > 1;
      $(".lb-prev", lb).hidden = !multi;
      $(".lb-next", lb).hidden = !multi;
    };
    var open = function (trigger) {
      lastFocus = trigger;
      items = masonry && masonry.contains(trigger)
        ? $$("[data-lightbox]", masonry).filter(function (b) { return !b.hidden; })
        : [trigger];
      show(items.indexOf(trigger));
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      $(".lb-close", lb).focus();
    };
    var close = function () {
      lb.hidden = true;
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-lightbox]");
      if (t) { e.preventDefault(); open(t); }
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.closest(".lb-close")) close();
      else if (e.target.closest(".lb-prev")) show(current - 1);
      else if (e.target.closest(".lb-next")) show(current + 1);
    });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Forms → WhatsApp (prayer, registration, contact) ---------- */
  $$("form.wa-form").forEach(function (form) {
    var note = $(".form-note", form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var missing = $$("[required]", form).filter(function (f) { return !f.value.trim(); })[0];
      if (missing) {
        note.textContent = "Please fill in the required fields first.";
        note.className = "form-note error";
        missing.focus();
        return;
      }
      var lines = [form.getAttribute("data-intro") || "Hello!", ""];
      $$("input, textarea, select", form).forEach(function (f) {
        var v = f.value.trim();
        if (v) lines.push(f.name + ": " + v);
      });
      window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
      note.textContent = "Thank you! WhatsApp is opening so you can send your message.";
      note.className = "form-note";
      form.reset();
    });
  });

  /* ---------- Video: big play button, then native controls ---------- */
  $$(".video-frame").forEach(function (frame) {
    var video = $("video", frame);
    var btn = $(".play-btn", frame);
    video.controls = false;
    btn.addEventListener("click", function () {
      video.controls = true;
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    });
    video.addEventListener("play", function () { frame.classList.add("is-playing"); video.controls = true; });
  });

  /* ---------- Share links: include this page's address ---------- */
  $$("[data-share]").forEach(function (a) {
    var url = location.href.split("#")[0] + "#video";
    a.href = "https://wa.me/?text=" + encodeURIComponent(a.getAttribute("data-share") + " " + url);
  });

  /* ---------- Footer year ---------- */
  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
