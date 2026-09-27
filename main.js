/* Ali Kırmaç · digital business card
   i18n (TR/EN), name reveal, rotating role line, photo tilt, cursor, magnetic buttons, copy-to-clipboard. */
(() => {
  "use strict";

  const I18N = {
    tr: {
      "meta.desc": "Ali Kırmaç, Ankara merkezli girişimci ve Detox Market'in kurucusu. Next Level AVM'de soğuk sıkım meyve suları ve sağlıklı atıştırmalıklar. İletişim.",
      "meta.og": "Detox Market kurucusu · Ankara",
      "eyebrow": "Ankara, Türkiye",
      "role.static": "Girişimci",
      "roles": ["Girişimci", "Detox Market Kurucusu", "Sağlıklı yaşam", "Soğuk sıkım", "Yeni fikirler", "Ankara, Türkiye"],
      "tag": "Kurucu",
      "btn.wa": "WhatsApp", "btn.ig": "Instagram", "btn.save": "Rehbere ekle",
      "d.phone": "Telefon", "d.mail": "E-posta", "d.addr": "Adres",
      "copied": "Kopyalandı",
      "img.alt": "Ali Kırmaç, Detox Market kurucusu, Ankara",
      "foot.made": "Ankara"
    },
    en: {
      "meta.desc": "Ali Kırmaç, Ankara-based entrepreneur and founder of Detox Market. Cold-pressed juices and healthy snacks at Next Level Mall. Contact.",
      "meta.og": "Founder of Detox Market · Ankara",
      "eyebrow": "Ankara, Türkiye",
      "role.static": "Entrepreneur",
      "roles": ["Entrepreneur", "Founder of Detox Market", "Healthy living", "Cold-pressed", "New ideas", "Ankara, Türkiye"],
      "tag": "Founder",
      "btn.wa": "WhatsApp", "btn.ig": "Instagram", "btn.save": "Save contact",
      "d.phone": "Phone", "d.mail": "Email", "d.addr": "Address",
      "copied": "Copied",
      "img.alt": "Ali Kırmaç, founder of Detox Market, Ankara",
      "foot.made": "Ankara"
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lang = "tr";

  /* ---------- passing text: scramble-decode between phrases ---------- */
  const rot = $(".rotator"), rotT = $(".rotator__t");
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/·-";
  let rotTimer = 0, rotRaf = 0, rotIdx = 0, rotWords = [];
  const scrambleTo = (text, done) => {
    cancelAnimationFrame(rotRaf);
    const from = rotT.textContent, len = Math.max(from.length, text.length), t0 = performance.now(), dur = 900;
    const order = Array.from({ length: len }, (_, i) => i).sort(() => Math.random() - .5); // letters lock in random order
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = text[i] || "";
        const lockAt = (order.indexOf(i) + 1) / len * .85;
        if (p >= lockAt) out += ch;
        else if (ch === " ") out += " ";
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      rotT.textContent = out;
      if (p < 1) rotRaf = requestAnimationFrame(step); else { rotT.textContent = text; done && done(); }
    };
    rotRaf = requestAnimationFrame(step);
  };
  const buildRotator = () => {
    clearTimeout(rotTimer); cancelAnimationFrame(rotRaf);
    rotWords = I18N[lang].roles;
    // reserve the widest phrase so nothing reflows while letters change
    const probe = document.createElement("span"); probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;font:inherit";
    rot.appendChild(probe);
    rot.style.minWidth = Math.max(...rotWords.map(w => { probe.textContent = w; return probe.offsetWidth; })) + "px";
    probe.remove();
    rotIdx = 0; rotT.textContent = rotWords[0];
    if (reduced) return;
    const next = () => { rotIdx = (rotIdx + 1) % rotWords.length; scrambleTo(rotWords[rotIdx], () => { rotTimer = setTimeout(next, 2400); }); };
    rotTimer = setTimeout(next, 2400);
  };

  /* ---------- i18n ---------- */
  const applyLang = (next, animate) => {
    const dict = I18N[next] || I18N.tr;
    const swap = () => {
      lang = next;
      $$("[data-i18n]").forEach(el => { const k = el.dataset.i18n; if (dict[k] != null) el.textContent = dict[k]; });
      $$("[data-i18n-attr]").forEach(el => { const [attr, k] = el.dataset.i18nAttr.split(":"); if (dict[k] != null) el.setAttribute(attr, dict[k]); });
      document.documentElement.lang = next;
      $$(".lang [data-lang]").forEach(s => s.classList.toggle("is-on", s.dataset.lang === next));
      try { localStorage.setItem("lang", next); } catch (_) {}
      buildRotator();
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

  /* ---------- name split into characters ---------- */
  $$(".name .split").forEach(el => {
    const text = el.textContent; el.textContent = "";
    Array.from(text).forEach((ch, i) => { const s = document.createElement("span"); s.className = "ch"; s.style.setProperty("--i", i); s.textContent = ch; el.appendChild(s); });
  });

  applyLang(initialLang, false);
  if (document.fonts) document.fonts.ready.then(buildRotator);
  $(".lang").addEventListener("click", () => applyLang(lang === "tr" ? "en" : "tr", true));
  $("#year").textContent = new Date().getFullYear();

  /* ---------- copy on click for phone/email (long-press friendly: still normal links) ---------- */
  const toast = $(".toast");
  let toastT = 0;
  $$("[data-copy]").forEach(a => a.addEventListener("click", () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(a.dataset.copy).then(() => {
      toast.textContent = I18N[lang].copied; toast.classList.add("is-on");
      clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove("is-on"), 1400);
    }).catch(() => {});
  }));

  if (reduced) return;

  /* ---------- grain flicker (timer, not a compositor animation) ---------- */
  const grain = $(".grain");
  if (grain) {
    const K = [[0, 0], [-3, 2], [2, -3], [-1, -1], [0, 0]], G = [];
    K.slice(0, -1).forEach(([x, y], i) => { for (let s = 0; s < 4; s++) G.push(`translate(${x + (K[i + 1][0] - x) * s / 4}%, ${y + (K[i + 1][1] - y) * s / 4}%)`); });
    let gi = 0;
    setInterval(() => { grain.style.transform = G[gi = (gi + 1) % G.length]; }, 75);
  }

  /* ---------- pointer-driven motion: photo tilt, cursor, magnetic buttons ---------- */
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const frame = $(".photo__frame");
  const lerp = (a, b, t) => a + (b - a) * t;
  let mx = 0, my = 0, tx = 0, ty = 0, raf = 0;
  const tick = () => {
    tx = lerp(tx, mx, .08); ty = lerp(ty, my, .08);
    frame.style.transform = `rotateY(${tx * 7}deg) rotateX(${-ty * 6}deg) translate3d(${tx * 6}px, ${ty * 6}px, 0)`;
    raf = Math.abs(tx - mx) + Math.abs(ty - my) > .002 ? requestAnimationFrame(tick) : 0;
  };
  const onPointer = (x, y) => { mx = (x / innerWidth - .5) * 2; my = (y / innerHeight - .5) * 2; if (!raf) raf = requestAnimationFrame(tick); };
  if (fine) addEventListener("pointermove", e => onPointer(e.clientX, e.clientY), { passive: true });
  else if ("DeviceOrientationEvent" in window) {
    addEventListener("deviceorientation", e => { if (e.gamma == null) return; mx = Math.max(-1, Math.min(1, e.gamma / 30)); my = Math.max(-1, Math.min(1, (e.beta - 45) / 30)); if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
  }

  if (fine) {
    const cur = $(".cursor");
    let cx = 0, cy = 0, px = 0, py = 0, craf = 0;
    const moveCursor = () => { cx = lerp(cx, px, .35); cy = lerp(cy, py, .35); cur.style.translate = `${cx}px ${cy}px`; craf = Math.abs(cx - px) + Math.abs(cy - py) > .05 ? requestAnimationFrame(moveCursor) : 0; };
    addEventListener("pointermove", e => { px = e.clientX; py = e.clientY; document.body.classList.add("has-cursor"); if (!craf) craf = requestAnimationFrame(moveCursor); }, { passive: true });
    $$("a, button").forEach(el => {
      el.addEventListener("pointerenter", () => document.body.classList.add("cursor-big"));
      el.addEventListener("pointerleave", () => document.body.classList.remove("cursor-big"));
    });
    $$(".btn").forEach(el => {
      el.addEventListener("pointermove", e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * .28}px, ${(e.clientY - (r.top + r.height / 2)) * .28}px)`; });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }
})();
