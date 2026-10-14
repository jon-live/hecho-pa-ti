/**
 * Hecho Pa' Ti — write-only order & wishlist intake for Google Sheets.
 *
 * Deploy as a Web App (Deploy → New deployment → Web app):
 *   Execute as:      Me
 *   Who has access:  Anyone
 * Paste the resulting /exec URL into js/config.js → formEndpoint.
 *
 * The site can only POST. There is no doGet that returns data, so the
 * endpoint is write-only; the Sheet stays private to your account.
 */

// ── Settings ─────────────────────────────────────────────────────────
var SETTINGS = {
  // Must match formToken in js/config.js. Deters bots; not a secret.
  token: "hpt-2026",
  // Where to notify you. Leave "" to use the account that owns the script.
  ownerEmail: "",
  // Sent to customers as the From name.
  fromName: "Hecho Pa' Ti",
  // Payment handles shown in the customer confirmation.
  zelle: "pedidos@hechopati.com",
  cashApp: "$HechoPaTi",
  whatsappDisplay: "+1 (650) 555-0142",
  pickupPlace: "San José, CA",
  arrivalWeeks: "3–5",
  // Send the customer an automatic confirmation email?
  emailCustomer: true,
  // Reject bodies larger than this (bytes).
  maxBytes: 20000
};

var ORDER_HEADERS = ["Timestamp", "Order #", "Status", "Deposit paid", "Arrived", "Notified",
  "Lang", "Name", "Phone", "Email", "Delivery", "City / ZIP", "Payment", "Notes",
  "Items", "Subtotal", "Shipping", "Total", "Deposit", "Balance", "Raw text"];
var WISH_HEADERS = ["Timestamp", "Req #", "Status", "Replied", "Lang", "Name", "Email", "Phone",
  "Wants", "Similar link", "Qty", "Notes"];

// ── Entry points ─────────────────────────────────────────────────────
function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents || "";
    if (!raw || raw.length > SETTINGS.maxBytes) return reply_(false, "bad request");
    var p = JSON.parse(raw);
    if (SETTINGS.token && p.token !== SETTINGS.token) return reply_(false, "forbidden");
    if (!p.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) return reply_(false, "email required");

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var id = p.type === "wish" ? saveWish_(p) : saveOrder_(p);
    } finally { lock.releaseLock(); }
    notifyOwner_(p, id);
    if (SETTINGS.emailCustomer) notifyCustomer_(p, id);
    return reply_(true, id);
  } catch (err) {
    return reply_(false, String(err));
  }
}

// Intentionally returns nothing useful: no read access through the web app.
function doGet() { return ContentService.createTextOutput("ok"); }

// Run once from the editor to create the tabs with headers.
function setup() { sheet_("Orders", ORDER_HEADERS); sheet_("Wishes", WISH_HEADERS); }

// ── Storage ──────────────────────────────────────────────────────────
function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}
function nextId_(sh, prefix) {
  return prefix + "-" + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyMMdd") + "-" + String(sh.getLastRow()).padStart(3, "0");
}
function saveOrder_(p) {
  var sh = sheet_("Orders", ORDER_HEADERS);
  var id = nextId_(sh, "HPT");
  var items = (p.items || []).map(function (i) {
    var extra = [i.variant, i.perso].filter(Boolean).join(" · ");
    return i.name + (extra ? " (" + extra + ")" : "") + " × " + i.qty + " = $" + i.line;
  }).join("\n");
  var t = p.totals || {};
  sh.appendRow([new Date(), id, "new", false, false, false,
    p.lang || "", s_(p.name), s_(p.phone), s_(p.email), s_(p.delivery), s_(p.city), s_(p.pay), s_(p.notes),
    items, t.sub || 0, t.ship || 0, t.total || 0, t.deposit || 0, t.rest || 0, s_(p.text)]);
  return id;
}
function saveWish_(p) {
  var sh = sheet_("Wishes", WISH_HEADERS);
  var id = nextId_(sh, "REQ");
  sh.appendRow([new Date(), id, "new", false, p.lang || "", s_(p.name), s_(p.email), s_(p.phone),
    s_(p.desc), s_(p.link), s_(p.qty), s_(p.notes)]);
  return id;
}

// ── Email ────────────────────────────────────────────────────────────
function notifyOwner_(p, id) {
  var to = SETTINGS.ownerEmail || Session.getEffectiveUser().getEmail();
  var subject = (p.type === "wish" ? "Petición " : "Pedido ") + id + " · " + s_(p.name) + (p.totals ? " · $" + p.totals.total : "");
  MailApp.sendEmail({ to: to, subject: subject, name: SETTINGS.fromName, replyTo: s_(p.email), body: s_(p.text) || JSON.stringify(p, null, 2) });
}
function notifyCustomer_(p, id) {
  var L = p.lang === "en" ? "en" : p.lang === "zh" ? "zh" : "es";
  var t = p.totals || {}, amt = "$" + (t.deposit || 0);
  var M = {
    es: {
      osub: "Recibimos tu pedido " + id,
      obody: "¡Gracias, " + s_(p.name) + "!\n\nRecibimos tu pedido " + id + ".\n\nPara apartarlo manda " + amt + " por Zelle (" + SETTINGS.zelle + ") o Cash App (" + SETTINGS.cashApp + ") con tu nombre. El resto ($" + (t.rest || 0) + ") lo pagas al recoger o antes del envío.\n\nTu pedido tarda " + SETTINGS.arrivalWeeks + " semanas en llegar. Cuando esté aquí te mandamos un correo para recogerlo en " + SETTINGS.pickupPlace + " o enviártelo.\n\nDudas: WhatsApp " + SETTINGS.whatsappDisplay + "\n\n— " + SETTINGS.fromName + "\n\n" + s_(p.text),
      wsub: "Recibimos tu petición " + id,
      wbody: "¡Gracias, " + s_(p.name) + "!\n\nRecibimos tu petición " + id + ":\n" + s_(p.desc) + "\n" + (p.link ? s_(p.link) + "\n" : "") + "\nTe escribimos en 1–2 días con precio y tiempo de entrega.\n\n— " + SETTINGS.fromName
    },
    en: {
      osub: "We received your order " + id,
      obody: "Thanks, " + s_(p.name) + "!\n\nWe received your order " + id + ".\n\nTo reserve it, send " + amt + " by Zelle (" + SETTINGS.zelle + ") or Cash App (" + SETTINGS.cashApp + ") with your name. The balance ($" + (t.rest || 0) + ") is paid at pickup or before shipping.\n\nYour order takes " + SETTINGS.arrivalWeeks + " weeks to arrive. When it's here we'll email you to pick up in " + SETTINGS.pickupPlace + " or have it shipped.\n\nQuestions: WhatsApp " + SETTINGS.whatsappDisplay + "\n\n— " + SETTINGS.fromName + "\n\n" + s_(p.text),
      wsub: "We received your request " + id,
      wbody: "Thanks, " + s_(p.name) + "!\n\nWe received your request " + id + ":\n" + s_(p.desc) + "\n" + (p.link ? s_(p.link) + "\n" : "") + "\nWe'll email you within 1–2 days with price and lead time.\n\n— " + SETTINGS.fromName
    },
    zh: {
      osub: "已收到你的订单 " + id,
      obody: "谢谢你，" + s_(p.name) + "！\n\n我们已收到订单 " + id + "。\n\n请通过 Zelle（" + SETTINGS.zelle + "）或 Cash App（" + SETTINGS.cashApp + "）支付 " + amt + " 定金并备注你的名字。尾款（$" + (t.rest || 0) + "）在自取时或寄送前支付。\n\n订单需要 " + SETTINGS.arrivalWeeks + " 周到货。到货后我们会发邮件通知你到 " + SETTINGS.pickupPlace + " 自取或寄送。\n\n有问题请联系 WhatsApp " + SETTINGS.whatsappDisplay + "\n\n— " + SETTINGS.fromName + "\n\n" + s_(p.text),
      wsub: "已收到你的需求 " + id,
      wbody: "谢谢你，" + s_(p.name) + "！\n\n我们已收到需求 " + id + "：\n" + s_(p.desc) + "\n" + (p.link ? s_(p.link) + "\n" : "") + "\n我们会在 1–2 天内邮件回复价格和交期。\n\n— " + SETTINGS.fromName
    }
  }[L];
  var wish = p.type === "wish";
  MailApp.sendEmail({ to: s_(p.email), subject: wish ? M.wsub : M.osub, body: wish ? M.wbody : M.obody, name: SETTINGS.fromName,
    replyTo: SETTINGS.ownerEmail || Session.getEffectiveUser().getEmail() });
}

// ── Helpers ──────────────────────────────────────────────────────────
function s_(v) { return v == null ? "" : String(v).slice(0, 2000); }
function reply_(ok, msg) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok, id: ok ? msg : undefined, error: ok ? undefined : msg }))
    .setMimeType(ContentService.MimeType.JSON);
}
