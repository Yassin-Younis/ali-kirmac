/* Ali Kırmaç · portfolio
   i18n (TR/EN), hero parallax + mouse tilt, pinned manifesto, marquee, reveals, cursor, magnetic buttons. */
(() => {
  "use strict";

  /* ---------- i18n ---------- */
  const I18N = {
    tr: {
      "meta.desc": "Ali Kırmaç, Ankara merkezli girişimci ve Detox Market'in kurucusu. Next Level AVM'de soğuk sıkım meyve suları ve sağlıklı atıştırmalıklar. İletişim.",
      "meta.og": "Detox Market kurucusu · Ankara",
      "nav.about": "Hakkında", "nav.market": "Girişim", "nav.contact": "İletişim",
      "hero.role": "Girişimci", "hero.role2": "Detox Market Kurucusu", "hero.loc": "Ankara, Türkiye",
      "hero.tag": "İyi olanı sade, şeffaf ve ulaşılabilir kılmak için çalışan bir girişimci.",
      "hero.scroll": "Kaydır",
      "marq": "Girişimci · Kurucu · Sağlıklı Yaşam · Ankara · Detox Market · Yeni Fikirler · İş Birliği · ",
      "about.eyebrow": "Hakkında", "about.title": "Merhaba, ben Ali.",
      "about.p1": "Ankara'da yaşayan bir girişimciyim. İşimi tek bir inanç üzerine kurdum: iyi yaşamak, her gün aldığımız küçük kararların kalitesiyle başlar.",
      "about.p2": "2025'te Detox Market'i bu inançla kurdum. Bugün bir sağlıklı yaşam markası yönetiyorum, yeni fikirler üzerinde çalışıyorum ve doğru insanlarla iş birliği yapmayı seviyorum.",
      "about.cap": "Detox Market, Ankara",
      "man.1": "Sade.", "man.2": "Şeffaf.", "man.3": "Samimi.",
      "val.1.t": "Sade", "val.1.p": "İyi bir şey karmaşık olmak zorunda değil. Fazlalığı atar, özü bırakırım.",
      "val.2.t": "Şeffaf", "val.2.p": "Ne yapıyorsam açık açık söylerim. Güven, iş yapmanın tek sürdürülebilir yolu.",
      "val.3.t": "Samimi", "val.3.p": "Masaya oturduğum herkesle uzun vadeli düşünürüm. İş, insanlarla güzel.",
      "mk.eyebrow": "Girişim", "mk.t1": "Detox Market.", "mk.t2": "Sıfırdan kurdum.",
      "mk.p1": "Detox Market'i 2025'te Ankara'da, Next Level AVM'de kurdum. Katkısız yiyecek, içecek ve soğuk sıkım meyve suları üzerine bir sağlıklı yaşam markası.",
      "mk.p2": "Ürün seçiminden marka diline, mağazadan iş ortaklıklarına kadar her adımı kendim tasarladım. Bugün kafeler, ofisler ve etkinliklerle birlikte büyüyor.",
      "mk.f1.t": "Kurucu", "mk.f1.s": "Rol",
      "mk.f2.s": "Kuruluş",
      "mk.f3.s": "Şehir",
      "mk.where": "Detox Market · Next Level AVM · Dumlupınar Blv. No:3C1-160 · Çankaya, Ankara",
      "mk.img": "Detox Market soğuk sıkım meyve suları, Ankara",
      "ct.eyebrow": "İletişim", "ct.title": "Konuşalım.",
      "ct.sub": "Bir fikir, bir iş birliği ya da sadece bir merhaba için.",
      "ct.phone": "Telefon", "ct.mail": "E-posta", "ct.addr": "Adres",
      "foot.mid": "Ankara'da, sevgiyle.", "foot.top": "Yukarı"
    },
    en: {
      "meta.desc": "Ali Kırmaç, Ankara-based entrepreneur and founder of Detox Market. Cold-pressed juices and healthy snacks at Next Level Mall. Contact.",
      "meta.og": "Founder of Detox Market · Ankara",
      "nav.about": "About", "nav.market": "Venture", "nav.contact": "Contact",
      "hero.role": "Entrepreneur", "hero.role2": "Founder of Detox Market", "hero.loc": "Ankara, Türkiye",
      "hero.tag": "An entrepreneur who makes good things simple, honest and within reach.",
      "hero.scroll": "Scroll",
      "marq": "Entrepreneur · Founder · Healthy Living · Ankara · Detox Market · New Ideas · Collaboration · ",
      "about.eyebrow": "About", "about.title": "Hi, I'm Ali.",
      "about.p1": "I'm an entrepreneur based in Ankara. I built my work on one belief: living well starts with the quality of the small decisions we make every day.",
      "about.p2": "In 2025 I founded Detox Market on that belief. Today I run a healthy-living brand, work on new ideas, and enjoy collaborating with the right people.",
      "about.cap": "Detox Market, Ankara",
      "man.1": "Simple.", "man.2": "Honest.", "man.3": "Genuine.",
      "val.1.t": "Simple", "val.1.p": "A good thing doesn't have to be complicated. I cut the excess and keep the essence.",
      "val.2.t": "Honest", "val.2.p": "I say what I do, openly. Trust is the only sustainable way to do business.",
      "val.3.t": "Genuine", "val.3.p": "I think long-term with everyone I sit down with. Business is better with people.",
      "mk.eyebrow": "Venture", "mk.t1": "Detox Market.", "mk.t2": "Built from scratch.",
      "mk.p1": "I founded Detox Market in 2025 at Next Level Mall, Ankara. A healthy-living brand built around additive-free food, drinks and cold-pressed juices.",
      "mk.p2": "From product selection to brand voice, from the store to partnerships, I designed every step myself. Today it grows together with cafés, offices and events.",
      "mk.f1.t": "Founder", "mk.f1.s": "Role",
      "mk.f2.s": "Founded",
      "mk.f3.s": "City",
      "mk.where": "Detox Market · Next Level Mall · Dumlupınar Blv. No:3C1-160 · Çankaya, Ankara",
      "mk.img": "Detox Market cold-pressed juices, Ankara",
      "ct.eyebrow": "Contact", "ct.title": "Let's talk.",
      "ct.sub": "For an idea, a collaboration, or just to say hello.",
      "ct.phone": "Phone", "ct.mail": "Email", "ct.addr": "Address",
      "foot.mid": "Made with love in Ankara.", "foot.top": "Top"
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let onLayoutChange = () => {}; // set by the motion section: re-measure cached geometry after text/layout changes

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
      onLayoutChange();
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
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); onLayoutChange(); } });
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
  const figure = $(".hero__figure");
  const heroLayers = $$("[data-depth]", hero).map(el => ({
    el, d: parseFloat(el.dataset.depth),
    kind: el === figure ? "figure" : el.classList.contains("hero__line--a") ? "a" : el.classList.contains("hero__line--b") ? "b" : "layer"
  }));
  const heroFaders = [$(".hero__meta"), $(".hero__tag"), $(".hero__scroll")];
  const parallaxEls = $$("[data-parallax]").map(el => ({
    el,
    // the old loop measured the already-shifted box every frame, which settles at f / (1 - f); keep that amplitude
    f: (v => v / (1 - v))(parseFloat(el.dataset.parallax)),
    rot: el.classList.contains("tile--brand") ? "rotate(-3deg)" : el.classList.contains("tile--portrait") ? "rotate(2.5deg)" : "",
    bg: el.classList.contains("contact__bg"), reveal: el.classList.contains("reveal"),
    top: 0, h: 0
  }));
  const manifesto = $(".manifesto");
  const words = $$(".manifesto__word");
  const ring = $(".manifesto__ring");
  const marquee = $(".marquee"), track = $(".marquee__track");
  const grain = $(".grain");

  let vh = innerHeight, vw = innerWidth;
  let mouse = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
  let lastY = scrollY, velocity = 0, marqueeX = 0;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // geometry is measured once per layout change (resize, font load, language swap, reveal), never per frame
  const docTop = el => { let t = 0; for (; el; el = el.offsetParent) t += el.offsetTop; return t; };
  const geo = { manTop: 0, manH: 0, half: 0 };
  let dirty = true;
  const measure = () => {
    parallaxEls.forEach(p => { p.top = docTop(p.el); p.h = p.el.offsetHeight; });
    geo.manTop = docTop(manifesto); geo.manH = manifesto.offsetHeight;
    geo.half = track ? track.scrollWidth / 2 : 0;
    dirty = false;
  };
  const markDirty = () => { dirty = true; };
  onLayoutChange = markDirty;
  addEventListener("resize", () => { vh = innerHeight; vw = innerWidth; markDirty(); }, { passive: true });
  if (document.fonts) document.fonts.ready.then(markDirty);
  if ("ResizeObserver" in window) new ResizeObserver(markDirty).observe(document.body);
  addEventListener("pointermove", e => { mouse.x = (e.clientX / vw - .5) * 2; mouse.y = (e.clientY / vh - .5) * 2; }, { passive: true });

  // marquee only ticks while it can be seen
  let marqueeOn = true;
  if (track && "IntersectionObserver" in window) new IntersectionObserver(([e]) => { marqueeOn = e.isIntersecting; }, { rootMargin: "100px 0px" }).observe(marquee);

  const nav = $(".nav");
  let navAnchor = 0;
  const frame = () => {
    const y = scrollY;
    const moved = y !== lastY;
    // nav hides after scrolling down a bit, returns on any upward scroll
    if (moved) {
      if (y < lastY - 2 || y < 80) { nav.classList.remove("is-hidden"); navAnchor = y; }
      else if (y > lastY + 2 && y - navAnchor > 120) nav.classList.add("is-hidden");
    }
    velocity = lerp(velocity, y - lastY, .12); lastY = y;
    if (Math.abs(velocity) < .01) velocity = 0;
    const px = tilt.x, py = tilt.y;
    tilt.x = lerp(tilt.x, mouse.x, .06); tilt.y = lerp(tilt.y, mouse.y, .06);
    if (Math.abs(tilt.x - mouse.x) < 1e-4 && Math.abs(tilt.y - mouse.y) < 1e-4) { tilt.x = mouse.x; tilt.y = mouse.y; }
    const tilted = tilt.x !== px || tilt.y !== py;
    const relayout = dirty;
    if (dirty) measure(); // all reads happen here, before any style write

    // hero layers: each drifts at its own speed while the hero is on screen; portrait rises & scales
    if ((moved || tilted || relayout) && y < vh * 1.2) {
      const p = y / vh;
      heroLayers.forEach(({ el, d, kind }) => {
        const mx = tilt.x * d * 60, my = tilt.y * d * 40;
        if (kind === "figure") el.style.transform = `translate3d(${mx}px, ${-y * d - p * 40}px, 0) scale(${1 + p * .12})`;
        else if (kind === "a") el.style.transform = `translate(calc(var(--ox) + ${mx - y * d * .8}px), calc(var(--oy) + ${-y * d * .35}px))`;
        else if (kind === "b") el.style.transform = `translate(calc(var(--ox) + ${mx + y * d * .8}px), calc(var(--oy) + ${-y * d * .35}px))`;
        else el.style.transform = `translate3d(${mx}px, ${my - y * d}px, 0)`;
      });
      if (moved || relayout) { const o = clamp(1 - p * 1.6, 0, 1); heroFaders.forEach(el => { el.style.opacity = o; }); }
    }

    if (moved || relayout) {
      // generic parallax tiles relative to viewport center
      parallaxEls.forEach(p => {
        const top = p.top - y - (p.bg ? p.h / 2 : 0); // contact__bg sits on its own -50% translate
        if (top + p.h < -200 || top > vh + 200) return;
        const center = top + p.h / 2 - vh / 2;
        if (p.bg) p.el.style.transform = `translate(-50%, calc(-50% + ${center * p.f}px))`;
        else if (!p.reveal || p.el.classList.contains("is-in")) p.el.style.transform = `translate3d(0, ${center * p.f}px, 0) ${p.rot}`;
      });

      // pinned manifesto: progress 0..1 across the section's scroll length
      const mTop = geo.manTop - y;
      if (mTop < vh && mTop + geo.manH > 0) {
        const total = geo.manH - vh;
        const prog = clamp(-mTop / total, 0, 1);
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
    }

    // marquee: constant drift plus scroll velocity, wraps at half the track
    if (track && marqueeOn) {
      marqueeX -= .9 + clamp(velocity * .25, -14, 14);
      const half = geo.half;
      if (half > 0) { if (marqueeX <= -half) marqueeX += half; else if (marqueeX > 0) marqueeX -= half; }
      track.style.transform = `translate3d(${marqueeX}px, 0, 0)`;
    }

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  /* ---------- grain flicker: the 16 positions the old `steps(4)` keyframes produced, stepped from a timer ---------- */
  if (grain) {
    const K = [[0, 0], [-3, 2], [2, -3], [-1, -1], [0, 0]], G = [];
    K.slice(0, -1).forEach(([x, y], i) => { for (let s = 0; s < 4; s++) G.push(`translate(${x + (K[i + 1][0] - x) * s / 4}%, ${y + (K[i + 1][1] - y) * s / 4}%)`); });
    let gi = 0;
    setInterval(() => { grain.style.transform = G[gi = (gi + 1) % G.length]; }, 75);
  }

  /* ---------- custom cursor + magnetic buttons ---------- */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cur = $(".cursor");
    let cx = 0, cy = 0, tx = 0, ty = 0, cursorRaf = 0;
    // `translate` instead of left/top: no layout per frame; the loop stops once the dot has caught up
    const moveCursor = () => {
      cx = lerp(cx, tx, .35); cy = lerp(cy, ty, .35);
      cur.style.translate = `${cx}px ${cy}px`;
      cursorRaf = Math.abs(cx - tx) + Math.abs(cy - ty) > .05 ? requestAnimationFrame(moveCursor) : 0;
    };
    addEventListener("pointermove", e => {
      tx = e.clientX; ty = e.clientY; document.body.classList.add("has-cursor");
      if (!cursorRaf) cursorRaf = requestAnimationFrame(moveCursor);
    }, { passive: true });
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
