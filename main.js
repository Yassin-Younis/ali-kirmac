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
      "roles": ["Detox Market Kurucusu", "Sağlıklı yaşam", "Soğuk sıkım", "Yeni fikirler", "İş birliğine açık"],
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
      "roles": ["Founder of Detox Market", "Healthy living", "Cold-pressed", "New ideas", "Open to collaboration"],
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

  /* ---------- rotating role line ---------- */
  const rot = $(".rotator");
  let rotTimer = 0, rotIdx = 0, rotWords = [];
  const buildRotator = () => {
    clearTimeout(rotTimer);
    rot.textContent = "";
    rotWords = I18N[lang].roles.map(t => { const s = document.createElement("span"); s.className = "rotator__w"; s.textContent = t; rot.appendChild(s); return s; });
    // reserve the widest word so the line never reflows
    rot.style.minWidth = Math.max(...rotWords.map(w => w.offsetWidth)) + "px";
    rotIdx = 0; rotWords[0].classList.add("is-in");
    if (reduced) return;
    const step = () => {
      const cur = rotWords[rotIdx], next = rotWords[(rotIdx + 1) % rotWords.length];
      cur.classList.remove("is-in"); cur.classList.add("is-out");
      next.classList.remove("is-out"); next.classList.add("is-in");
      setTimeout(() => cur.classList.remove("is-out"), 900);
      rotIdx = (rotIdx + 1) % rotWords.length;
      rotTimer = setTimeout(step, 2600);
    };
    rotTimer = setTimeout(step, 2600);
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
