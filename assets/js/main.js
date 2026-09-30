/* Christ Laborers Church — site interactions */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var WHATSAPP = "231779230549";
  var IMG = "assets/img/gallery/";

  // Gallery photos: [file name, caption]. Add a photo by dropping
  // name.webp + name-sm.webp into assets/img/gallery and listing it here.
  var GALLERY = [
    ["sanctuary-sermon", "The Word proclaimed in our sanctuary"],
    ["clergy-ordination", "Our Bishop with newly ordained clergy"],
    ["celebration-service", "A joyful celebration service"],
    ["bishop-preaching", "Preaching with passion and conviction"],
    ["teaching-session", "Teaching during our revival meeting"],
    ["front-row-worshippers", "Families gathered in worship"],
    ["ordinands-prayer", "Ordinands standing in prayer"],
    ["worship-leader", "Leading the house in praise"],
    ["revival-congregation", "Revival meeting congregation"],
    ["bishop-blessing", "Vesting and blessing a new minister"],
    ["bible-teaching", "Bible in hand, ministering to the church"],
    ["congregation-listening", "Hearts attentive to the Word"],
    ["honorary-presentation", "Celebrating academic achievement"],
    ["celebration-crowd", "A full house on celebration Sunday"]
  ];

  /* ---------- Header: scrolled state + mobile nav ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setNav(!document.body.classList.contains("nav-open"));
  });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });

  /* ---------- Active nav link ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Build gallery ---------- */
  var masonry = document.getElementById("masonry");
  GALLERY.forEach(function (g, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("data-lightbox", IMG + g[0] + ".webp");
    b.setAttribute("data-caption", g[1]);
    b.setAttribute("data-index", i);
    b.className = "reveal";
    b.innerHTML = '<img src="' + IMG + g[0] + '-sm.webp" alt="' + g[1] + '" loading="lazy">';
    masonry.appendChild(b);
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
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
    document.querySelectorAll("[data-count]").forEach(function (el) { co.observe(el); });
  }

  /* ---------- Countdown to next Monday 4:00 PM (Liberia is UTC+0) ---------- */
  var cd = document.getElementById("countdown");
  function nextClass(now) {
    var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 16, 0, 0));
    var add = (1 - d.getUTCDay() + 7) % 7;             // days until Monday
    d.setUTCDate(d.getUTCDate() + add);
    if (d.getTime() + 2 * 3600e3 <= now.getTime()) d.setUTCDate(d.getUTCDate() + 7); // class runs ~2h
    return d;
  }
  function tick() {
    var now = new Date();
    var target = nextClass(now);
    var diff = target - now;
    if (diff <= 0) { cd.textContent = "In session"; return; }
    var days = Math.floor(diff / 864e5);
    var hrs = Math.floor(diff / 36e5) % 24;
    var mins = Math.floor(diff / 6e4) % 60;
    cd.textContent = days > 0 ? days + "d " + hrs + "h " + mins + "m" : hrs + "h " + mins + "m";
  }
  tick();
  setInterval(tick, 30000);

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector("figcaption");
  var items = [], current = 0, lastFocus = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var it = items[current];
    lbImg.src = it.getAttribute("data-lightbox");
    lbImg.alt = it.getAttribute("data-caption");
    lbCap.textContent = it.getAttribute("data-caption");
    var multi = items.length > 1;
    lb.querySelector(".lb-prev").hidden = !multi;
    lb.querySelector(".lb-next").hidden = !multi;
  }
  function open(trigger) {
    lastFocus = trigger;
    items = trigger.closest(".masonry")
      ? Array.prototype.slice.call(masonry.querySelectorAll("[data-lightbox]"))
      : [trigger];
    show(items.indexOf(trigger));
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
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
    if (lb.hidden) { if (e.key === "Escape") setNav(false); return; }
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  /* ---------- Prayer request → WhatsApp ---------- */
  var form = document.getElementById("prayer-form");
  var note = document.getElementById("form-note");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var req = form.elements.request.value.trim();
    if (!req) {
      note.textContent = "Please share your prayer request first.";
      note.className = "form-note error";
      form.elements.request.focus();
      return;
    }
    var msg = "Prayer request" + (name ? " from " + name : "") + ":\n\n" + req;
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    note.textContent = "Thank you. WhatsApp is opening so you can send your request. We are standing with you in prayer.";
    note.className = "form-note";
    form.reset();
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
