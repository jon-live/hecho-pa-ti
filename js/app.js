/* Hecho Pa' Ti — storefront logic (no build step, no dependencies) */
(function () {
  const CFG = window.HPT_CONFIG, T = window.HPT_I18N, CATS = window.HPT_CATALOG;
  const $ = s => document.querySelector(s);
  let lang = "es", cart = {}, query = "";

  // ── i18n ────────────────────────────────────────────────────
  const VARS = { shipFrom: CFG.shipFrom, d: CFG.stockDays, w: CFG.customWeeks, zelle: CFG.zelle, cashApp: CFG.cashApp, n: CFG.freeShipOver };
  function t(k, extra) {
    let s = T[lang][k] ?? T.es[k] ?? k;
    const v = Object.assign({}, VARS, extra || {});
    return s.replace(/\{(\w+)\}/g, (_, x) => v[x] ?? "");
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ── items index ─────────────────────────────────────────────
  const ITEMS = {};
  CATS.forEach(c => c.items.forEach((it, i) => {
    const id = c.id + "-" + i;
    ITEMS[id] = { id, cat: c, kind: it[0], es: it[1], en: it[2], des: it[3], den: it[4], price: it[5], opt: it[6] || {} };
  }));
  const nameOf = it => lang === "es" ? it.es : it.en;

  // ── persistence ─────────────────────────────────────────────
  function load() {
    try {
      const c = JSON.parse(localStorage.getItem("hpt-cart") || "{}");
      if (c && typeof c === "object") cart = c;
      const l = localStorage.getItem("hpt-lang");
      if (l === "en" || l === "es") lang = l;
    } catch (e) {}
    const h = location.hash.replace("#", "");
    if (h === "en" || h === "es") lang = h;
  }
  function save() { try { localStorage.setItem("hpt-cart", JSON.stringify(cart)); localStorage.setItem("hpt-lang", lang); } catch (e) {} }

  // ── render ──────────────────────────────────────────────────
  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i]").forEach(el => { el.innerHTML = t(el.dataset.i); });
    document.querySelectorAll("[data-p]").forEach(el => { el.placeholder = t(el.dataset.p); });
    $("#es").setAttribute("aria-pressed", lang === "es");
    $("#en").setAttribute("aria-pressed", lang === "en");
    $("#wadisplay").textContent = CFG.whatsappDisplay;
    $("#social").innerHTML = [
      CFG.instagram && `<a href="https://instagram.com/${esc(CFG.instagram)}" target="_blank" rel="noopener">Instagram</a>`,
      CFG.tiktok && `<a href="https://tiktok.com/@${esc(CFG.tiktok)}" target="_blank" rel="noopener">TikTok</a>`,
      `<a href="https://wa.me/${esc(CFG.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>`
    ].filter(Boolean).join("");
    renderCatalog();
    renderCart();
  }

  function matches(it) {
    if (!query) return true;
    const q = query.toLowerCase();
    return [it.es, it.en, it.des, it.den, it.cat.es[0], it.cat.en[0]].some(s => s.toLowerCase().includes(q));
  }

  function renderCatalog() {
    $("#catnav").innerHTML = CATS.map(c => `<a href="#${c.id}">${esc(c[lang][0])}</a>`).join("");
    let any = false;
    $("#main").innerHTML = CATS.map(c => {
      const items = c.items.map((_, i) => ITEMS[c.id + "-" + i]).filter(matches);
      if (!items.length) return "";
      any = true;
      return `<section class="cat" id="${c.id}"><div class="wrap">
        <div class="cathead"><h2>${esc(c[lang][0])}</h2><p>${esc(c[lang][1])}</p></div>
        <div class="grid">${items.map(card).join("")}</div>
        ${c.id === "quince" && !query ? quincePack() : ""}
      </div></section>`;
    }).join("");
    if (!any) $("#main").innerHTML = `<div class="noresults">${t("noresults")}</div>`;
  }

  function card(it) {
    const o = it.opt, name = nameOf(it), desc = lang === "es" ? it.des : it.den;
    const img = `assets/${it.id}.jpg`;
    return `<article class="card ${it.kind === "c" ? "custom" : ""}" data-id="${it.id}">
      <div class="tile ${it.cat.tile}" data-tag="${it.kind === "c" ? t("custom") : t("stock")}">
        <img src="${img}" alt="" loading="lazy" onerror="this.remove()">${esc(name)}</div>
      <div class="info">
        <h3>${esc(name)}</h3><p>${esc(desc)}</p>
        ${o.min ? `<span class="minq">${t("min", { n: o.min })}</span>` : ""}
        ${o.v ? `<select class="variant" aria-label="${t("variant")}"><option value="" disabled selected>${t("variant")}…</option>${o.v.map(v => `<option>${esc(v)}</option>`).join("")}</select>` : ""}
        ${o.p ? `<input class="perso" maxlength="60" placeholder="${t("perso")}">` : ""}
        <div class="row"><span class="price">$${it.price}<small>${t("each")}</small></span><button class="add" data-id="${it.id}">${t("add")}</button></div>
      </div></article>`;
  }

  function quincePack() {
    const per = CFG.quincePerGuest;
    return `<div class="pack" id="pack"><h3>${t("packh")}</h3><p>${t("packp")}</p>
      <div class="opts">${[100, 150, 200].map((n, i) => `<label><input type="radio" name="pk" value="${n}" ${i === 0 ? "checked" : ""}>${n} ${t("invitados")} · $${n * per}</label>`).join("")}</div>
      <div class="opts">${[["Espejo / Mirror"], ["Monedero / Coin purse"], ["Llavero / Keychain"]].map((o, i) => `<label><input type="radio" name="pt" value="${esc(o[0])}" ${i === 0 ? "checked" : ""}>${esc(o[0])}</label>`).join("")}</div>
      <input type="text" id="pkname" maxlength="80" placeholder="${t("quincename")}">
      <div class="sum"><span class="price" id="pkprice">$${100 * per}</span><button class="btn" type="button" id="pkadd">${t("packadd")}</button></div></div>`;
  }

  // ── cart ────────────────────────────────────────────────────
  function lineLabel(l) {
    const it = ITEMS[l.item];
    const base = l.label || (it ? nameOf(it) : l.item);
    const bits = [l.variant, l.perso].filter(Boolean);
    return bits.length ? `${base} (${bits.join(" · ")})` : base;
  }
  function totals() {
    let sub = 0, qty = 0;
    Object.values(cart).forEach(l => { sub += l.price * l.q; qty += l.q; });
    const ship = !CFG.shipping || sub === 0 || sub >= CFG.freeShipOver ? 0 : CFG.shipping;
    return { sub, ship, total: sub + ship, qty };
  }
  function renderCart() {
    const keys = Object.keys(cart);
    $("#lines").innerHTML = keys.length ? keys.map(k => {
      const l = cart[k], it = ITEMS[l.item];
      const lead = l.kind === "c" ? t("wait") : t("fast");
      return `<div class="line"><div><strong>${esc(lineLabel(l))}</strong><div class="meta">${lead}${it && it.opt.min ? " · " + t("min", { n: it.opt.min }) : ""}</div></div>
        <div style="text-align:right"><div class="price" style="font-size:16px">$${l.price * l.q}</div>
        <div class="q"><button type="button" data-d="-1" data-k="${esc(k)}" aria-label="−">−</button><span>${l.q}</span><button type="button" data-d="1" data-k="${esc(k)}" aria-label="+">+</button></div></div></div>`;
    }).join("") : `<div class="empty">${t("empty")}</div>`;
    const s = totals();
    $("#subtotal").textContent = "$" + s.sub;
    $("#ship").textContent = s.ship ? "$" + s.ship : (s.sub ? t("free") : "—");
    $("#shiprow").hidden = !CFG.shipping;
    $("#total").textContent = "$" + s.total;
    $("#count").textContent = s.qty;
  }
  function addLine(key, line, q) {
    const l = cart[key] || Object.assign({ q: 0 }, line);
    l.q += q;
    if (l.q <= 0) delete cart[key]; else cart[key] = l;
    save(); renderCart();
    const b = $("#opencart"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
  }
  function addFromCard(btn) {
    const it = ITEMS[btn.dataset.id], art = btn.closest(".card");
    const variant = art.querySelector(".variant")?.value || "";
    const perso = (art.querySelector(".perso")?.value || "").trim();
    if (it.opt.v && !variant) { art.querySelector(".variant").focus(); toast(t("variant") + "…"); return; }
    const key = [it.id, variant, perso].join("|");
    addLine(key, { item: it.id, kind: it.kind, price: it.price, variant, perso }, it.opt.min && !cart[key] ? it.opt.min : 1);
    btn.textContent = t("added"); btn.classList.add("done");
    setTimeout(() => { btn.classList.remove("done"); btn.textContent = t("add"); }, 1200);
  }

  // ── order text / checkout ───────────────────────────────────
  function orderText() {
    const s = totals();
    const lines = Object.values(cart).map(l => `• ${lineLabel(l)} × ${l.q} = $${l.price * l.q}`);
    const out = [t("order"), ...lines, `${t("subtotal")}: $${s.sub}`];
    if (CFG.shipping) out.push(`${t("shipping")}: ${s.ship ? "$" + s.ship : t("free")}`);
    out.push(`${t("total")}: $${s.total}`, "",
      `${t("name")}: ${$("#name").value}`, `${t("phone")}: ${$("#phone").value}`, `${t("city")}: ${$("#city").value}`,
      `${t("pay")}: ${$("#pay").value}`, `${t("notes")}: ${$("#note").value}`);
    return out.join("\n");
  }
  function toast(m) { const d = document.createElement("div"); d.className = "toast"; d.textContent = m; document.body.appendChild(d); setTimeout(() => d.remove(), 2400); }
  function openCart(o) { $("#cartroot").hidden = !o; if (o) $("#closecart").focus(); }

  // ── events ──────────────────────────────────────────────────
  document.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.id === "es" || b.id === "en") { lang = b.id; save(); render(); return; }
    if (b.classList.contains("add")) { addFromCard(b); return; }
    if (b.id === "pkadd") {
      const n = +document.querySelector("input[name=pk]:checked").value;
      const ty = document.querySelector("input[name=pt]:checked").value;
      const who = ($("#pkname").value || "").trim();
      const key = ["quince-pack", n, ty, who].join("|");
      cart[key] = { item: "quince-pack", kind: "c", q: 1, price: n * CFG.quincePerGuest, label: `${t("packname")} · ${n} ${t("invitados")} · ${ty}`, perso: who };
      save(); renderCart(); toast(t("added")); return;
    }
    if (b.id === "opencart") { openCart(true); return; }
    if (b.id === "closecart") { openCart(false); return; }
    if (b.dataset.d) { addLine(b.dataset.k, cart[b.dataset.k], +b.dataset.d); return; }
    if (b.id === "copy") {
      const txt = orderText();
      navigator.clipboard?.writeText(txt).then(() => toast(t("copied"))).catch(() => {
        const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (x) {} ta.remove(); toast(t("copied"));
      });
      return;
    }
    if (b.id === "mail") {
      if (!Object.keys(cart).length) { toast(t("empty")); return; }
      location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(t("order"))}&body=${encodeURIComponent(orderText())}`;
    }
  });
  document.addEventListener("change", e => {
    if (e.target.name === "pk") $("#pkprice").textContent = "$" + (+e.target.value * CFG.quincePerGuest);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#cartroot").hidden) openCart(false); });
  $("#scrim").addEventListener("click", () => openCart(false));
  $("#form").addEventListener("submit", e => {
    e.preventDefault();
    if (!Object.keys(cart).length) { toast(t("empty")); return; }
    window.open("https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(orderText()), "_blank", "noopener");
    toast(t("thanks"));
  });
  let qt;
  ["#q", "#qm"].forEach(s => $(s).addEventListener("input", e => {
    clearTimeout(qt); qt = setTimeout(() => { query = e.target.value.trim(); ["#q", "#qm"].forEach(o => { if ($(o) !== e.target) $(o).value = e.target.value; }); renderCatalog(); }, 150);
  }));
  window.addEventListener("scroll", () => {
    let cur = "";
    CATS.forEach(c => { const s = document.getElementById(c.id); if (s && s.getBoundingClientRect().top < 140) cur = c.id; });
    document.querySelectorAll("#catnav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + cur));
  }, { passive: true });

  load(); render();
})();
