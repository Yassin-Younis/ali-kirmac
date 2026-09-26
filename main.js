/* Ali Kırmaç · portfolio
   i18n (TR/EN), hero parallax + mouse tilt, pinned manifesto, marquee, reveals, cursor, magnetic buttons. */
(() => {
  "use strict";

  /* ---------- i18n ---------- */
  const I18N = {
    tr: {
      "meta.desc": "Ali Kırmaç. Detox Market kurucusu. Ankara'da soğuk sıkım meyve suları ve sağlıklı yaşam.",
      "meta.og": "Detox Market kurucusu · Ankara",
      "nav.about": "Hakkında", "nav.market": "Detox Market", "nav.contact": "İletişim",
      "hero.role": "Kurucu", "hero.loc": "Ankara, Türkiye",
      "hero.tag": "Sağlıklı olanı lezzetli ve ulaşılabilir kılan bir girişimci.",
      "hero.scroll": "Kaydır",
      "marq": "Yeşil Detox · Soğuk Sıkım · Wellness Shot · Zencefil · Zerdeçal · Pancar · Süper Besin · Doğal Atıştırmalık · ",
      "about.eyebrow": "Hakkında", "about.title": "Merhaba, ben Ali.",
      "about.p1": "Ankara'da yaşayan bir girişimciyim. Detox Market'i tek bir fikirle kurdum: sağlıklı olan, aynı zamanda lezzetli ve ulaşılabilir de olmalı.",
      "about.p2": "Soğuk sıkım meyve sularından doğal atıştırmalıklara kadar her ürünü kendim seçiyorum. Küçük bir ekiple, her gün, aynı özenle.",
      "about.cap": "Ankara, 2026",
      "man.1": "Taze.", "man.2": "Doğal.", "man.3": "Her gün.",
      "val.1.t": "Taze", "val.1.p": "Her gün taze sıkım. Isıl işlem yok, bekleme yok.",
      "val.2.t": "Doğal", "val.2.p": "Katkısız, şekersiz. Sadece gerçek meyve ve sebze.",
      "val.3.t": "Her gün", "val.3.p": "Küçük bir alışkanlık, büyük bir fark.",
      "mk.eyebrow": "Detox Market", "mk.t1": "Soğuk sıkım.", "mk.t2": "Ankara'nın kalbinde.",
      "mk.p1": "Detox Market, Next Level AVM'de soğuk sıkım meyve suları, wellness shot'lar ve doğal atıştırmalıklar sunan bir sağlıklı yaşam markası.",
      "mk.p2": "Amacımız basit: günde bir küçük iyilik. Sabah bir yeşil detox, öğlen bir zencefil shot, akşam bir süper besin.",
      "mk.f1.t": "Soğuk sıkım", "mk.f1.s": "meyve suları",
      "mk.f2.t": "Wellness", "mk.f2.s": "shot'lar",
      "mk.f3.t": "Doğal", "mk.f3.s": "atıştırmalıklar",
      "mk.where": "Next Level AVM · Dumlupınar Blv. No:3C1-160 · Çankaya, Ankara",
      "mk.img": "Soğuk sıkım meyve suları",
      "ct.eyebrow": "İletişim", "ct.title": "Konuşalım.",
      "ct.sub": "Bir fikir, bir iş birliği ya da sadece bir merhaba için.",
      "ct.phone": "Telefon", "ct.mail": "E-posta", "ct.addr": "Adres",
      "foot.mid": "Ankara'da, sevgiyle.", "foot.top": "Yukarı"
    },
    en: {
      "meta.desc": "Ali Kırmaç. Founder of Detox Market. Cold-pressed juices and healthy living in Ankara.",
      "meta.og": "Founder of Detox Market · Ankara",
      "nav.about": "About", "nav.market": "Detox Market", "nav.contact": "Contact",
      "hero.role": "Founder", "hero.loc": "Ankara, Türkiye",
      "hero.tag": "An entrepreneur making healthy taste good, and easy to reach.",
      "hero.scroll": "Scroll",
      "marq": "Green Detox · Cold Pressed · Wellness Shot · Ginger · Turmeric · Beetroot · Superfood · Natural Snacks · ",
      "about.eyebrow": "About", "about.title": "Hi, I'm Ali.",
      "about.p1": "I'm an entrepreneur based in Ankara. I founded Detox Market on a single idea: what's healthy should also be delicious, and within everyone's reach.",
      "about.p2": "From cold-pressed juices to natural snacks, I pick every product myself. A small team, every day, with the same care.",
      "about.cap": "Ankara, 2026",
      "man.1": "Fresh.", "man.2": "Natural.", "man.3": "Every day.",
      "val.1.t": "Fresh", "val.1.p": "Pressed fresh every day. No heat, no waiting.",
      "val.2.t": "Natural", "val.2.p": "No additives, no added sugar. Just real fruit and vegetables.",
      "val.3.t": "Every day", "val.3.p": "A small habit that makes a big difference.",
      "mk.eyebrow": "Detox Market", "mk.t1": "Cold pressed.", "mk.t2": "In the heart of Ankara.",
      "mk.p1": "Detox Market is a healthy-living brand at Next Level Mall, serving cold-pressed juices, wellness shots and natural snacks.",
      "mk.p2": "The goal is simple: one small good thing a day. A green detox in the morning, a ginger shot at noon, a superfood in the evening.",
      "mk.f1.t": "Cold pressed", "mk.f1.s": "juices",
      "mk.f2.t": "Wellness", "mk.f2.s": "shots",
      "mk.f3.t": "Natural", "mk.f3.s": "snacks",
      "mk.where": "Next Level Mall · Dumlupınar Blv. No:3C1-160 · Çankaya, Ankara",
      "mk.img": "Cold-pressed juices",
      "ct.eyebrow": "Contact", "ct.title": "Let's talk.",
      "ct.sub": "For an idea, a collaboration, or just to say hello.",
      "ct.phone": "Phone", "ct.mail": "Email", "ct.addr": "Address",
      "foot.mid": "Made with love in Ankara.", "foot.top": "Top"
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const applyLang = (lang, animate) => {
    const dict = I18N[lang] || I18N.tr;
    const swap = () => {
      $$("[data-i18n]").forEach(el => { const k = el.dataset.i18n; if (dict[k] != null) el.textContent = dict[k]; });
      $$("[data-i18n-attr]").forEach(el => {
        const [attr, k] = el.dataset.i18nAttr.split(":"); if (dict[k] != null) el.setAttribute(attr, dict[k]);
      });
      document.documentElement.lang = lang;
      $$(".lang [data-lang]").forEach(s => s.classList.toggle("is-on", s.dataset.lang === lang));
      try { localStorage.setItem("lang", lang); } catch (_) {}
    };
    if (animate && !reduced) {
      document.body.classList.add("lang-fade");
      setTimeout(() => { swap(); document.body.classList.remove("lang-fade"); }, 190);
    } else swap();
  };

  const initialLang = (() => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && I18N[q]) return q;
    try { const s = localStorage.getItem("lang"); if (s && I18N[s]) return s; } catch (_) {}
    return "tr";
  })();
  applyLang(initialLang, false);
  $(".lang").addEventListener("click", () => applyLang(document.documentElement.lang === "tr" ? "en" : "tr", true));

  /* ---------- split hero name into characters ---------- */
  $$(".hero .split").forEach(el => {
    const text = el.textContent; el.textContent = "";
    Array.from(text).forEach((ch, i) => {
      const s = document.createElement("span"); s.className = "ch"; s.style.setProperty("--i", i); s.textContent = ch; el.appendChild(s);
    });
  });

  /* ---------- reveals ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: .15, rootMargin: "0px 0px -8% 0px" });
  const pending = $$(".reveal");
  pending.forEach(el => {
    const siblings = el.parentElement ? $$(".reveal", el.parentElement) : [];
    el.style.setProperty("--d", `${(siblings.indexOf(el) % 4) * 90}ms`);
    io.observe(el);
  });
  // safety net: anything scrolled past in a fast jump (anchor links, fast flicks) still reveals
  const sweepReveals = () => {
    for (let i = pending.length - 1; i >= 0; i--) {
      const el = pending[i];
      if (el.classList.contains("is-in")) { pending.splice(i, 1); continue; }
      if (el.getBoundingClientRect().top < innerHeight * .92) { el.classList.add("is-in"); io.unobserve(el); pending.splice(i, 1); }
    }
  };
  addEventListener("scroll", sweepReveals, { passive: true });

  $("#year").textContent = new Date().getFullYear();

  if (reduced) return;

  /* ---------- scroll-driven motion ---------- */
  const hero = $(".hero");
  const heroLayers = $$("[data-depth]", hero);
  const figure = $(".hero__figure");
  const parallaxEls = $$("[data-parallax]");
  const manifesto = $(".manifesto");
  const words = $$(".manifesto__word");
  const ring = $(".manifesto__ring");
  const track = $(".marquee__track");

  let vh = innerHeight, vw = innerWidth;
  let mouse = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
  let lastY = scrollY, velocity = 0, marqueeX = 0;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  addEventListener("resize", () => { vh = innerHeight; vw = innerWidth; }, { passive: true });
  addEventListener("pointermove", e => { mouse.x = (e.clientX / vw - .5) * 2; mouse.y = (e.clientY / vh - .5) * 2; }, { passive: true });

  const nav = $(".nav");
  let navAnchor = 0;
  const frame = () => {
    const y = scrollY;
    // nav hides after scrolling down a bit, returns on any upward scroll
    if (y < lastY - 2 || y < 80) { nav.classList.remove("is-hidden"); navAnchor = y; }
    else if (y > lastY + 2 && y - navAnchor > 120) nav.classList.add("is-hidden");
    velocity = lerp(velocity, y - lastY, .12); lastY = y;
    tilt.x = lerp(tilt.x, mouse.x, .06); tilt.y = lerp(tilt.y, mouse.y, .06);

    // hero layers: each drifts at its own speed while the hero is on screen; portrait rises & scales
    if (y < vh * 1.2) {
      const p = y / vh;
      heroLayers.forEach(el => {
        const d = parseFloat(el.dataset.depth);
        const mx = tilt.x * d * 60, my = tilt.y * d * 40;
        if (el === figure) {
          el.style.transform = `translate3d(${mx}px, ${-y * d - p * 40}px, 0) scale(${1 + p * .12})`;
        } else if (el.classList.contains("hero__line--a")) {
          el.style.transform = `translate3d(${mx - y * d * .8}px, calc(var(--oy) + ${-y * d * .35}px), 0)`;
        } else if (el.classList.contains("hero__line--b")) {
          el.style.transform = `translate3d(${mx + y * d * .8}px, calc(var(--oy) + ${-y * d * .35}px), 0)`;
        } else {
          el.style.transform = `translate3d(${mx}px, ${my - y * d}px, 0)`;
        }
      });
      hero.style.setProperty("--fade", clamp(1 - p * 1.4, 0, 1));
      $(".hero__meta").style.opacity = $(".hero__tag").style.opacity = $(".hero__scroll").style.opacity = clamp(1 - p * 1.6, 0, 1);
    }

    // generic parallax tiles relative to viewport center
    parallaxEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const center = r.top + r.height / 2 - vh / 2;
      const f = parseFloat(el.dataset.parallax);
      const base = el.dataset.base || (el.dataset.base = getComputedStyle(el).rotate !== "none" ? "" : "");
      const rot = el.classList.contains("tile--brand") ? "rotate(-3deg)" : el.classList.contains("tile--portrait") ? "rotate(2.5deg)" : "";
      if (el.classList.contains("contact__bg")) el.style.transform = `translate(-50%, calc(-50% + ${center * f}px))`;
      else if (el.classList.contains("is-in") || !el.classList.contains("reveal")) el.style.transform = `translate3d(0, ${center * f}px, 0) ${rot}`;
    });

    // pinned manifesto: progress 0..1 across the section's scroll length
    const mr = manifesto.getBoundingClientRect();
    if (mr.top < vh && mr.bottom > 0) {
      const total = mr.height - vh;
      const prog = clamp(-mr.top / total, 0, 1);
      const n = words.length;
      words.forEach((w, i) => {
        const start = i / n, end = (i + 1) / n;
        const local = clamp((prog - start) / (end - start), 0, 1);
        // ease in, hold, ease out
        const inA = clamp(local / .35, 0, 1), outA = clamp((local - .7) / .3, 0, 1);
        const op = i === n - 1 ? inA : inA * (1 - outA);
        const sc = .7 + .3 * inA + (i === n - 1 ? 0 : outA * .25);
        w.style.opacity = op;
        w.style.transform = `scale(${sc}) translateY(${(1 - inA) * 30}px)`;
      });
      ring.style.transform = `scale(${clamp(prog * 1.8, 0, 1) * (1 + Math.sin(prog * Math.PI * 3) * .08) * 2.2}) rotate(${prog * 90}deg)`;
    }

    // marquee: constant drift plus scroll velocity, wraps at half the track
    if (track) {
      marqueeX -= .9 + clamp(velocity * .25, -14, 14);
      const half = track.scrollWidth / 2;
      if (marqueeX <= -half) marqueeX += half; else if (marqueeX > 0) marqueeX -= half;
      track.style.transform = `translate3d(${marqueeX}px, 0, 0)`;
    }

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  /* ---------- custom cursor + magnetic buttons ---------- */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cur = $(".cursor");
    let cx = 0, cy = 0, tx = 0, ty = 0;
    addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; document.body.classList.add("has-cursor"); }, { passive: true });
    const moveCursor = () => { cx = lerp(cx, tx, .35); cy = lerp(cy, ty, .35); cur.style.left = cx + "px"; cur.style.top = cy + "px"; requestAnimationFrame(moveCursor); };
    moveCursor();
    $$("a, button").forEach(el => {
      el.addEventListener("pointerenter", () => document.body.classList.add("cursor-big"));
      el.addEventListener("pointerleave", () => document.body.classList.remove("cursor-big"));
    });
    $$(".magnetic").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * .28, dy = (e.clientY - (r.top + r.height / 2)) * .28;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }
})();
