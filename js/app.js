/* Hecho Pa' Ti — storefront logic (no build step, no dependencies) */
(function () {
  const CFG = window.HPT_CONFIG, T = window.HPT_I18N, CATS = window.HPT_CATALOG;
  const $ = s => document.querySelector(s);
  const LANGS = ["es", "en", "zh"];
  let lang = "es", cart = {}, query = "";

  // ── i18n ────────────────────────────────────────────────────
  const VARS = { shipFrom: CFG.shipFrom, d: CFG.stockDays, w: CFG.customWeeks, zelle: CFG.zelle, cashApp: CFG.cashApp, n: CFG.freeShipOver, dp: CFG.depositPercent, aw: CFG.arrivalWeeks, pickup: CFG.pickupPlace, rt: CFG.replyTime, url: CFG.siteUrl };
  const SP = window.HPT_SPECS || { labels: {}, types: {} };
  let state = "";
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
    const zh = (window.HPT_CATALOG_ZH || {})[id] || [];
    ITEMS[id] = { id, cat: c, kind: it[0], es: it[1], en: it[2], des: it[3], den: it[4], zh: zh[0], dzh: zh[1], price: it[5], opt: it[6] || {} };
  }));
  const nameOf = it => lang === "es" ? it.es : lang === "zh" ? (it.zh || it.en) : it.en;
  const descOf = it => lang === "es" ? it.des : lang === "zh" ? (it.dzh || it.den) : it.den;
  const catName = (c, i) => (lang === "zh" && c.zh ? c.zh : c[lang] || c.en)[i];

  // ── persistence ─────────────────────────────────────────────
  function load() {
    try {
      const c = JSON.parse(localStorage.getItem("hpt-cart") || "{}");
      if (c && typeof c === "object") cart = c;
      state = localStorage.getItem("hpt-state") || "";
      const l = localStorage.getItem("hpt-lang");
      if (LANGS.includes(l)) lang = l;
    } catch (e) {}
    const h = location.hash.replace("#", "");
    if (LANGS.includes(h)) lang = h;
  }
  function save() { try { localStorage.setItem("hpt-cart", JSON.stringify(cart)); localStorage.setItem("hpt-lang", lang); localStorage.setItem("hpt-state", state); } catch (e) {} }
  const fold = s => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  function fmtDate(iso) {
    const d = new Date(iso + "T12:00:00");
    return new Intl.DateTimeFormat({ es: "es-MX", en: "en-US", zh: "zh-CN" }[lang], { day: "numeric", month: "long" }).format(d);
  }
  function renderSeason() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const rows = (CFG.seasons || []).map(x => { const d = new Date(x.d + "T12:00:00"); const cut = new Date(d); cut.setDate(cut.getDate() - (CFG.leadDays || 42)); return { ...x, date: d, cut }; })
      .filter(x => x.cut >= today).slice(0, 2);
    $("#season").hidden = !rows.length;
    $("#seasonlist").innerHTML = rows.map(x => `<span>${t("season", { cut: fmtDate(x.cut.toISOString().slice(0, 10)), date: fmtDate(x.d), name: esc(x[lang] || x.es) })}</span>`).join("");
  }
  function renderState() {
    const sel = $("#state");
    sel.innerHTML = `<option value="">${t("stateany")}</option>` + (CFG.states || []).map(x => `<option ${x === state ? "selected" : ""}>${esc(x)}</option>`).join("");
    let line = document.querySelector(".stateline");
    if (state) { if (!line) { line = document.createElement("span"); line.className = "stateline"; $(".herorow").appendChild(line); } line.textContent = t("stateline", { state }); }
    else if (line) line.remove();
  }

  // ── render ──────────────────────────────────────────────────
  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i]").forEach(el => { el.innerHTML = t(el.dataset.i); });
    document.querySelectorAll("[data-p]").forEach(el => { el.placeholder = t(el.dataset.p); });
    LANGS.forEach(l => $("#" + l).setAttribute("aria-pressed", lang === l));
    $("#wadisplay").textContent = CFG.whatsappDisplay;
    $("#social").innerHTML = [
      CFG.instagram && `<a href="https://instagram.com/${esc(CFG.instagram)}" target="_blank" rel="noopener">Instagram</a>`,
      CFG.tiktok && `<a href="https://tiktok.com/@${esc(CFG.tiktok)}" target="_blank" rel="noopener">TikTok</a>`,
      `<a href="https://wa.me/${esc(CFG.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>`
    ].filter(Boolean).join("");
    $("#share").href = "https://wa.me/?text=" + encodeURIComponent(t("sharetext"));
    renderState(); renderSeason();
    renderCatalog();
    renderCart();
  }

  function matches(it) {
    if (!query) return true;
    const q = fold(query);
    return [it.es, it.en, it.des, it.den, it.zh, it.dzh, it.cat.es[0], it.cat.en[0], it.cat.zh?.[0]].some(s => s && fold(s).includes(q));
  }

  function renderCatalog() {
    $("#catnav").innerHTML = CATS.map(c => `<a href="#${c.id}">${esc(catName(c, 0))}</a>`).join("") + `<a href="#pedido">✦ ${esc({ es: "Pídelo", en: "Ask for it", zh: "告诉我们" }[lang])}</a>`;
    let any = false;
    $("#main").innerHTML = CATS.map(c => {
      const items = c.items.map((_, i) => ITEMS[c.id + "-" + i]).filter(matches);
      if (!items.length) return "";
      any = true;
      return `<section class="cat" id="${c.id}"><div class="wrap">
        <div class="cathead"><h2>${esc(catName(c, 0))}</h2><p>${esc(catName(c, 1))}</p></div>
        <div class="grid">${items.map(card).join("")}</div>
        ${c.id === "quince" && !query ? quincePack() : ""}
      </div></section>`;
    }).join("");
    if (!any) $("#main").innerHTML = `<div class="noresults">${t("noresults")}</div>`;
  }

  function card(it) {
    const o = it.opt, name = nameOf(it), desc = descOf(it);
    const img = `assets/${it.id}.jpg`;
    return `<article class="card ${it.kind === "c" ? "custom" : ""}" data-id="${it.id}">
      <div class="tile ${it.cat.tile}" data-tag="${it.kind === "c" ? t("custom") : t("stock")}" data-sample="${t(it.kind === "c" ? "sample" : "refphoto")}">
        <img src="${img}" alt="" loading="lazy" onerror="this.remove()" onload="this.parentNode.classList.add('hasimg')">${esc(name)}</div>
      <div class="info">
        <h3>${esc(name)}</h3><p>${esc(desc)}</p>
        ${o.min ? `<span class="minq">${t("min", { n: o.min })}</span>` : ""}
        ${o.v ? variantSelect(o.v, "variant") : ""}
        ${o.p ? `<input class="perso" maxlength="60" placeholder="${t("perso")}">` : ""}
        <button type="button" class="details" data-open="${it.id}">${t("details")} →</button>
        <div class="row"><span class="price">$${it.price}<small>${t("each")}</small></span><button class="add" data-id="${it.id}">${t("add")}</button></div>
      </div></article>`;
  }

  function isStateVariant(v) { return v.some(x => /estado|state/i.test(x)) || v.includes("Jalisco"); }
  function variantSelect(v, cls) {
    const st = state && isStateVariant(v);
    const opts = v.map(x => { const isMine = /mi estado|my state/i.test(x); const val = isMine && state ? state : x; const sel = st && (isMine || x === state) ? "selected" : ""; return `<option value="${esc(val)}" ${sel}>${esc(isMine && state ? state : x)}</option>`; });
    return `<select class="${cls}" aria-label="${t("variant")}"><option value="" disabled ${st ? "" : "selected"}>${t("variant")}…</option>${opts.join("")}</select>`;
  }
  // ── product modal ──────────────────────────────────────────
  let pmItem = null, lastFocus = null;
  const lockScroll = () => document.body.classList.toggle("locked", !$("#pmroot").hidden || !$("#cartroot").hidden);
  function restoreFocus() { if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true }); lastFocus = null; }
  function openProduct(id) {
    const it = ITEMS[id]; if (!it) return; pmItem = it;
    const o = it.opt, sp = (SP.types[o.sp] || SP.types.stock || {})[lang] || {}, L = SP.labels[lang] || {};
    const img = `assets/${it.id}.jpg`;
    const box = $("#pmimg"); box.className = "pmimg " + it.cat.tile; box.setAttribute("data-sample", t(it.kind === "c" ? "sample" : "refphoto"));
    box.innerHTML = `<img src="${img}" alt="" onerror="this.remove()" onload="this.parentNode.classList.add('hasimg')">${esc(nameOf(it))}`;
    $("#pmtag").textContent = it.kind === "c" ? (L.made || t("custom")) : (L.stockt || t("stock"));
    $("#pmtitle").textContent = nameOf(it); $("#pmdesc").textContent = descOf(it);
    $("#pmspecs").innerHTML = ["m", "s", "f", "a", "p", "z", "q"].filter(k => sp[k] && sp[k] !== "—").map(k => `<dt>${esc(L[k] || k)}</dt><dd>${esc(sp[k])}</dd>`).join("");
    $("#pmhow").hidden = it.kind !== "c";
    $("#pmsteps").innerHTML = ["s1", "s2", "s3", "s4", "s5", "s6"].map(k => `<li>${t(k)}</li>`).join("");
    const v = $("#pmvariant"); v.hidden = !o.v; if (o.v) v.outerHTML = variantSelect(o.v, "pmv").replace('class="pmv"', 'id="pmvariant" class="pmv"');
    const pe = $("#pmperso"); pe.hidden = !o.p; pe.placeholder = t("perso"); pe.value = "";
    const q = $("#pmqty"); q.min = o.min || 1; q.value = o.min || 1;
    $("#pmmin").textContent = o.min ? t("min", { n: o.min }) : "";
    updatePmPrice();
    lastFocus = document.activeElement;
    $("#pmroot").hidden = false; lockScroll(); $("#pmclose").focus();
  }
  function updatePmPrice() { if (!pmItem) return; const q = Math.max(1, +$("#pmqty").value || 1); $("#pmprice").innerHTML = `$${pmItem.price * q}<small> · $${pmItem.price}${t("each")}</small>`; }
  function closeProduct() { $("#pmroot").hidden = true; pmItem = null; lockScroll(); restoreFocus(); }
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
    const base = l.pack ? `${t("packname")} · ${l.pack.n} ${t("invitados")} · ${l.pack.ty}` : l.label || (it ? nameOf(it) : l.item);
    const bits = [l.variant, l.perso].filter(Boolean);
    return bits.length ? `${base} (${bits.join(" · ")})` : base;
  }
  const delivery = () => document.querySelector("input[name=dl]:checked")?.value || "pickup";
  function totals() {
    let sub = 0, qty = 0;
    Object.values(cart).forEach(l => { sub += l.price * l.q; qty += l.q; });
    const ship = delivery() === "pickup" || !CFG.shipping || sub === 0 || sub >= CFG.freeShipOver ? 0 : CFG.shipping;
    const total = sub + ship;
    const deposit = Math.ceil(total * CFG.depositPercent / 100);
    return { sub, ship, total, deposit, rest: total - deposit, qty };
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
    $("#shiprow").hidden = !CFG.shipping || delivery() === "pickup";
    $("#total").textContent = "$" + s.total;
    $("#deposit").textContent = "$" + s.deposit;
    $("#rest").textContent = "$" + s.rest;
    $("#count").textContent = s.qty;
    $("#opencart").setAttribute("aria-label", `${t("cart")} (${s.qty})`);
  }
  function addLine(key, line, q) {
    const l = cart[key] || Object.assign({ q: 0 }, line);
    l.q += q;
    if (l.q <= 0) delete cart[key]; else cart[key] = l;
    save(); renderCart(); bump();
  }
  function bump() { const b = $("#opencart"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  function addProduct(it, variant, perso, qty) {
    const key = [it.id, variant, perso].join("|");
    const q = qty || (it.opt.min && !cart[key] ? it.opt.min : 1);
    addLine(key, { item: it.id, kind: it.kind, price: it.price, variant, perso }, q);
  }
  function addFromCard(btn) {
    const it = ITEMS[btn.dataset.id], art = btn.closest(".card");
    const variant = art.querySelector(".variant")?.value || "";
    const perso = (art.querySelector(".perso")?.value || "").trim();
    if (it.opt.v && !variant) { art.querySelector(".variant").focus(); toast(t("variant") + "…"); return; }
    addProduct(it, variant, perso);
    btn.textContent = t("added"); btn.classList.add("done");
    setTimeout(() => { btn.classList.remove("done"); btn.textContent = t("add"); }, 1200);
  }

  // ── order text / checkout ───────────────────────────────────
  function orderText() {
    const s = totals();
    const lines = Object.values(cart).map(l => `• ${lineLabel(l)} × ${l.q} = $${l.price * l.q}`);
    const out = [t("order"), ...lines, `${t("subtotal")}: $${s.sub}`];
    if (CFG.shipping) out.push(`${t("shipping")}: ${s.ship ? "$" + s.ship : t("free")}`);
    out.push(`${t("total")}: $${s.total}`,
      `${t("deposit")}: $${s.deposit}`, `${t("rest")}: $${s.rest}`, "",
      `${t("name")}: ${$("#name").value}`, `${t("phone")}: ${$("#phone").value}`, `${t("email")}: ${$("#email").value}`,
      `${t("deliver")}: ${delivery() === "pickup" ? t("pickup") : t("mailit")}`, `${t("city")}: ${$("#city").value}`,
      `${t("pay")}: ${$("#pay").value}`, `${t("notes")}: ${$("#note").value}`);
    return out.join("\n");
  }
  // Optional: POST to a form backend so orders / wishes land in the inbox automatically.
  // Sent as text/plain so the browser skips the CORS preflight, which Apps
  // Script web apps cannot answer. Falls back to an opaque no-cors POST.
  function postForm(payload) {
    if (!CFG.formEndpoint) return Promise.resolve(false);
    const body = JSON.stringify(Object.assign({ token: CFG.formToken, site: location.hostname, ua: navigator.userAgent.slice(0, 120) }, payload));
    const opts = { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body };
    return fetch(CFG.formEndpoint, opts).then(r => r.ok)
      .catch(() => fetch(CFG.formEndpoint, Object.assign({ mode: "no-cors" }, opts)).then(() => true).catch(() => false));
  }
  function cartItems() {
    return Object.values(cart).map(l => ({ id: l.item, name: lineLabel(l).replace(/ \(.*\)$/, ""), variant: l.variant || "", perso: l.perso || "", qty: l.q, price: l.price, line: l.price * l.q, kind: l.kind }));
  }
  function showDone() {
    const s = totals();
    $("#donep").innerHTML = t("sentp", { amt: "$" + s.deposit });
    $("#form").hidden = true; $("#lines").hidden = true; $("#done").hidden = false;
  }
  function resetDone() { $("#form").hidden = false; $("#lines").hidden = false; $("#done").hidden = true; }
  function toast(m) { const d = document.createElement("div"); d.className = "toast"; d.textContent = m; document.body.appendChild(d); setTimeout(() => d.remove(), 2400); }
  function openCart(o) {
    if (o && $("#cartroot").hidden) lastFocus = document.activeElement;
    $("#cartroot").hidden = !o; lockScroll();
    if (o) $("#closecart").focus(); else restoreFocus();
  }

  // ── events ──────────────────────────────────────────────────
  document.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (LANGS.includes(b.id)) { lang = b.id; save(); render(); return; }
    if (b.classList.contains("add")) { addFromCard(b); return; }
    if (b.dataset.open) { openProduct(b.dataset.open); return; }
    if (b.id === "pmclose") { closeProduct(); return; }
    if (b.id === "pkadd") {
      const n = +document.querySelector("input[name=pk]:checked").value;
      const ty = document.querySelector("input[name=pt]:checked").value;
      const who = ($("#pkname").value || "").trim();
      const key = ["quince-pack", n, ty, who].join("|");
      cart[key] = { item: "quince-pack", kind: "c", q: 1, price: n * CFG.quincePerGuest, pack: { n, ty }, perso: who };
      save(); renderCart(); bump(); toast(t("added")); return;
    }
    if (b.id === "opencart") { openCart(true); return; }
    if (b.id === "closecart") { openCart(false); return; }
    if (b.dataset.d) { addLine(b.dataset.k, cart[b.dataset.k], +b.dataset.d); return; }
    if (b.id === "again") { resetDone(); openCart(false); return; }
    if (b.id === "wwa") { sendWish("wa"); return; }
    if (b.id === "copy" || b.id === "copy2") {
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
  document.addEventListener("click", e => { const tile = e.target.closest(".card .tile, .card h3"); if (tile) openProduct(tile.closest(".card").dataset.id); });
  $("#pmscrim").addEventListener("click", closeProduct);
  $("#pmqty").addEventListener("input", updatePmPrice);
  $("#pmform").addEventListener("submit", e => {
    e.preventDefault(); if (!pmItem) return;
    const variant = $("#pmvariant").value || "", perso = ($("#pmperso").value || "").trim(), qty = Math.max(+$("#pmqty").min || 1, +$("#pmqty").value || 1);
    if (pmItem.opt.v && !variant) { $("#pmvariant").focus(); toast(t("variant") + "…"); return; }
    addProduct(pmItem, variant, perso, qty); toast(t("added")); closeProduct(); openCart(true);
  });
  $("#state").addEventListener("change", e => { state = e.target.value; save(); render(); });
  document.addEventListener("change", e => {
    if (e.target.name === "pk") $("#pkprice").textContent = "$" + (+e.target.value * CFG.quincePerGuest);
    if (e.target.name === "dl") renderCart();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { if (!$("#pmroot").hidden) closeProduct(); else if (!$("#cartroot").hidden) openCart(false); } });
  $("#scrim").addEventListener("click", () => openCart(false));
  $("#form").addEventListener("submit", e => {
    e.preventDefault();
    if (!Object.keys(cart).length) { toast(t("empty")); return; }
    if (!$("#form").reportValidity()) return;
    const text = orderText();
    window.open("https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    postForm({ type: "order", lang, email: $("#email").value.trim(), name: $("#name").value.trim(), phone: $("#phone").value.trim(),
      city: $("#city").value.trim(), delivery: delivery(), pay: $("#pay").value, notes: $("#note").value.trim(), items: cartItems(), totals: totals(), text });
    showDone();
  });

  // ── wishlist ("Pídelo") ─────────────────────────────────────
  function wishText() {
    return [{ es: "Petición Hecho Pa' Ti", en: "Hecho Pa' Ti request", zh: "Hecho Pa' Ti 需求" }[lang],
      `${t("wdesc").split(" (")[0]}: ${$("#wdesc").value.trim()}`,
      `${t("wlink")}: ${$("#wlink").value.trim() || "—"}`,
      `${t("wqty")}: ${$("#wqty").value || "—"}`,
      `${t("name")}: ${$("#wname").value.trim()}`, `${t("email")}: ${$("#wemail").value.trim()}`, `${t("phone")}: ${$("#wphone").value.trim()}`,
      `${t("notes")}: ${$("#wnote").value.trim()}`].join("\n");
  }
  function sendWish(via) {
    const desc = $("#wdesc").value.trim(), email = $("#wemail").value.trim(), link = $("#wlink").value.trim();
    if (!desc || !email || !$("#wemail").checkValidity()) { toast(t("wneed")); (desc ? $("#wemail") : $("#wdesc")).focus(); return; }
    if (link && !/^https?:\/\//i.test(link)) { toast(t("badlink")); $("#wlink").focus(); return; }
    const text = wishText();
    const posted = postForm({ type: "wish", lang, email, name: $("#wname").value.trim(), phone: $("#wphone").value.trim(), desc, link, qty: $("#wqty").value, notes: $("#wnote").value.trim(), text });
    if (via === "wa") window.open("https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    else posted.then(ok => { if (!ok) location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(text.split("\n")[0])}&body=${encodeURIComponent(text)}`; });
    $("#wdone").hidden = false; toast(t("wsent"));
  }
  $("#wishform").addEventListener("submit", e => { e.preventDefault(); sendWish("mail"); });
  let qt;
  ["#q", "#qm"].forEach(s => $(s).addEventListener("input", e => {
    clearTimeout(qt); qt = setTimeout(() => { query = e.target.value.trim(); ["#q", "#qm"].forEach(o => { if ($(o) !== e.target) $(o).value = e.target.value; }); renderCatalog(); }, 150);
  }));
  window.addEventListener("scroll", () => {
    let cur = "";
    CATS.forEach(c => { const s = document.getElementById(c.id); if (s && s.getBoundingClientRect().top < 140) cur = c.id; });
    document.querySelectorAll("#catnav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + cur));
  }, { passive: true });

  // Keep the sticky category bar right under the header, whatever its height.
  const hdr = document.querySelector("header.bar");
  const setHdr = () => document.documentElement.style.setProperty("--hdr", hdr.offsetHeight + "px");
  if (window.ResizeObserver) new ResizeObserver(setHdr).observe(hdr); else window.addEventListener("resize", setHdr);

  load(); render(); setHdr();
})();
