/* Ali Kırmaç · digital business card
   Calm edition: slow WebGL background (low-res, 25fps, sleeps when hidden), one-time name reveal,
   scramble-decode passing text, flip to QR back, i18n (TR/EN), share / vCard / copy. */
(() => {
  "use strict";

  const I18N = {
    tr: {
      "meta.desc": "Ali Kırmaç, Ankara merkezli girişimci ve Detox Market'in kurucusu. Next Level AVM'de soğuk sıkım meyve suları ve sağlıklı atıştırmalıklar. İletişim.",
      "meta.og": "Detox Market kurucusu · Ankara",
      "roles": ["Sağlık × Teknoloji", "Detox Market Kurucusu", "Soğuk sıkım", "Doğal olan, akıllıca", "Ankara, Türkiye"],
      "btn.wa": "WhatsApp", "btn.ig": "Instagram", "btn.save": "Rehbere ekle", "btn.share": "Paylaş",
      "d.phone": "Telefon", "d.mail": "E-posta", "d.addr": "Adres",
      "copied": "Kopyalandı", "linkCopied": "Bağlantı kopyalandı",
      "img.alt": "Ali Kırmaç, Detox Market kurucusu, Ankara",
      "hint": "Çevirmek için dokun", "back.url": "Taratın, kartı alın"
    },
    en: {
      "meta.desc": "Ali Kırmaç, Ankara-based entrepreneur and founder of Detox Market. Cold-pressed juices and healthy snacks at Next Level Mall. Contact.",
      "meta.og": "Founder of Detox Market · Ankara",
      "roles": ["Health × Technology", "Founder of Detox Market", "Cold-pressed", "Natural, done smart", "Ankara, Türkiye"],
      "btn.wa": "WhatsApp", "btn.ig": "Instagram", "btn.save": "Save contact", "btn.share": "Share",
      "d.phone": "Phone", "d.mail": "Email", "d.addr": "Address",
      "copied": "Copied", "linkCopied": "Link copied",
      "img.alt": "Ali Kırmaç, founder of Detox Market, Ankara",
      "hint": "Tap to flip", "back.url": "Scan to keep the card"
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const small = innerWidth < 900;
  const weak = (navigator.hardwareConcurrency || 4) <= 4 || (navigator.connection && navigator.connection.saveData);
  const DPR = Math.min(devicePixelRatio || 1, 1.5);
  let lang = "tr";
  let hidden = document.hidden;
  document.addEventListener("visibilitychange", () => { hidden = document.hidden; if (!hidden) wakeBg(); });

  /* ================= slow living background ================= */
  const bgc = $(".bg");
  let gl = null, bgRaf = 0, bgLast = 0; const bgU = {}; const bgStart = performance.now();
  const initBg = () => {
    try { gl = bgc.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" }); } catch (_) { gl = null; }
    if (!gl) { bgc.classList.add("bg--fallback"); return; }
    const vs = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
    const fs = `precision mediump float;
uniform vec2 r;uniform float t;uniform float k;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/r;vec2 p=uv;p.x*=r.x/r.y;
 float tt=t*.025;
 vec2 q=vec2(fbm(p*1.2+tt),fbm(p*1.2-tt*.7+3.1));
 vec2 w=vec2(fbm(p*1.2+q*1.6+vec2(1.7,9.2)+tt*.5),fbm(p*1.2+q*1.6+vec2(8.3,2.8)-tt*.3));
 float f=fbm(p*1.2+w*1.2);
 vec3 c0=vec3(.059,.165,.094),c1=vec3(.122,.302,.169),c2=vec3(.482,.827,.537);
 vec3 c=mix(c0,c1,smoothstep(.22,.85,f));
 c=mix(c,c2*.45,smoothstep(.62,.95,f)*.5);
 c*=1.-.4*length(uv-.5);
 gl_FragColor=vec4(c*k,1.);}`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { gl = null; bgc.classList.add("bg--fallback"); return; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    ["r", "t", "k"].forEach(u => { bgU[u] = gl.getUniformLocation(prog, u); });
    sizeBg(); drawBg(performance.now()); if (!reduced) wakeBg();
  };
  const sizeBg = () => {
    if (!gl) return;
    const s = (weak || small ? .3 : .4) * DPR; // soft noise upscales invisibly; ~6x fewer fragments
    bgc.width = Math.max(2, Math.round(innerWidth * s)); bgc.height = Math.max(2, Math.round(innerHeight * s));
    gl.viewport(0, 0, bgc.width, bgc.height);
  };
  const drawBg = now => {
    const el = (now - bgStart) / 1000;
    gl.uniform2f(bgU.r, bgc.width, bgc.height); gl.uniform1f(bgU.t, el); gl.uniform1f(bgU.k, clamp(el / 2.4, 0, 1));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const bgLoop = now => {
    if (hidden || !gl) { bgRaf = 0; return; }
    if (now - bgLast >= 40) { bgLast = now; drawBg(now); } // 25fps is plenty for a drift this slow
    bgRaf = requestAnimationFrame(bgLoop);
  };
  const wakeBg = () => { if (!bgRaf && gl && !reduced) bgRaf = requestAnimationFrame(bgLoop); };

  /* ================= name reveal (once) ================= */
  $$(".name .split").forEach(el => {
    const text = el.textContent; el.textContent = "";
    Array.from(text).forEach((ch, i) => { const s = document.createElement("span"); s.className = "ch"; s.style.setProperty("--i", i); s.textContent = ch; el.appendChild(s); });
  });

  /* ================= passing text (scramble-decode) ================= */
  const rot = $(".rotator"), rotT = $(".rotator__t");
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/·-";
  let rotTimer = 0, rotRaf = 0, rotIdx = 0, rotWords = [];
  const scrambleTo = (text, done) => {
    cancelAnimationFrame(rotRaf);
    const from = rotT.textContent, len = Math.max(from.length, text.length), t0 = performance.now(), dur = 700;
    const order = Array.from({ length: len }, (_, i) => i).sort(() => Math.random() - .5);
    const step = now => {
      const p = Math.min(1, (now - t0) / dur); let out = "";
      for (let i = 0; i < len; i++) {
        const ch = text[i] || ""; const lockAt = (order.indexOf(i) + 1) / len * .85;
        out += p >= lockAt ? ch : ch === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      rotT.textContent = out;
      if (p < 1) rotRaf = requestAnimationFrame(step); else { rotT.textContent = text; done && done(); }
    };
    rotRaf = requestAnimationFrame(step);
  };
  const buildRotator = () => {
    clearTimeout(rotTimer); cancelAnimationFrame(rotRaf);
    rotWords = I18N[lang].roles;
    const probe = document.createElement("span"); probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;font:inherit";
    rot.appendChild(probe);
    rot.style.minWidth = Math.max(...rotWords.map(w => { probe.textContent = w; return probe.offsetWidth; })) + "px";
    probe.remove();
    rotIdx = 0; rotT.textContent = rotWords[0];
    if (reduced) return;
    const next = () => { if (hidden) { rotTimer = setTimeout(next, 1000); return; } rotIdx = (rotIdx + 1) % rotWords.length; scrambleTo(rotWords[rotIdx], () => { rotTimer = setTimeout(next, 3200); }); };
    rotTimer = setTimeout(next, 3400);
  };

  /* ================= flip ================= */
  const photo = $(".photo");
  photo.addEventListener("click", () => photo.classList.toggle("is-flipped"));
  photo.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); photo.click(); } });

  /* ================= i18n ================= */
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
    if (animate && !reduced) { document.body.classList.add("lang-fade"); setTimeout(() => { swap(); document.body.classList.remove("lang-fade"); }, 190); }
    else swap();
  };
  const initialLang = (() => {
    const q = new URLSearchParams(location.search).get("lang"); if (q && I18N[q]) return q;
    try { const s = localStorage.getItem("lang"); if (s && I18N[s]) return s; } catch (_) {}
    return "tr";
  })();
  applyLang(initialLang, false);
  $(".lang").addEventListener("click", () => applyLang(lang === "tr" ? "en" : "tr", true));
  $("#year").textContent = new Date().getFullYear();

  /* ================= actions ================= */
  const toast = $(".toast"); let toastT = 0;
  const say = msg => { toast.textContent = msg; toast.classList.add("is-on"); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove("is-on"), 1400); };
  $$("[data-copy]").forEach(a => a.addEventListener("click", () => { if (navigator.clipboard) navigator.clipboard.writeText(a.dataset.copy).then(() => say(I18N[lang].copied)).catch(() => {}); }));
  const shareBtn = $(".share");
  if (shareBtn) shareBtn.addEventListener("click", async () => {
    const data = { title: "Ali Kırmaç", text: "Ali Kırmaç · Detox Market", url: location.origin + location.pathname };
    if (navigator.share) { try { await navigator.share(data); } catch (_) {} return; }
    if (navigator.clipboard) navigator.clipboard.writeText(data.url).then(() => say(I18N[lang].linkCopied)).catch(() => {});
  });

  /* ================= boot ================= */
  if (!/[?&]nogl=1/.test(location.search)) initBg(); else bgc.classList.add("bg--fallback");
  const ready = document.fonts ? document.fonts.ready : Promise.resolve();
  ready.then(buildRotator);
  let rT = 0;
  addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(() => { sizeBg(); if (gl && reduced) drawBg(performance.now()); buildRotator(); }, 120); }, { passive: true });
})();
