// ─────────────────────────────────────────────────────────────
// Casa Nopal — site configuration
// Edit this file before publishing. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────
window.HPT_CONFIG = {
  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  // Casa Nopal's WhatsApp Business App number (the same one shown on the Facebook Page).
  whatsapp: "15108132352",
  whatsappDisplay: "+1 (510) 813-2352",

  // Where "Enviar por correo" (email order) goes.
  email: "pedidos@casanopal.shop",    // ← REPLACE

  // Payment handles shown after the customer sends an order.
  zelle: "pedidos@casanopal.shop",   // ← REPLACE
  cashApp: "$CasaNopal",             // ← REPLACE

  // Shipping / lead times (used in copy).
  shipFrom: "California",
  stockDays: "1–2",
  customWeeks: "3–4",

  // Flat shipping and free-shipping threshold (USD). Set shipping to 0 to hide.
  shipping: 6,
  freeShipOver: 60,

  // Quince package price per guest (USD).
  quincePerGuest: 4,

  // Pre-order model: customer pays this % now, the rest when the order arrives.
  depositPercent: 10,
  // Typical arrival window shown at checkout.
  arrivalWeeks: "3–5",
  // Pickup location (city is enough).
  pickupPlace: "San José, CA",

  // Where orders and wishlist requests are stored. Recommended: the Google
  // Sheet web app in backend/apps-script (write-only, emails you and the
  // customer). Paste its /exec URL here. Formspree-style endpoints also work.
  // Leave "" to rely on WhatsApp / email only.
  formEndpoint: "",
  // Must match SETTINGS.token in backend/apps-script/Code.gs.
  formToken: "hpt-2026",

  // Public site URL (used by the share button).
  siteUrl: "https://tienda.lgcy.ink",
  // Promise shown in the trust block. Keep it only if you can keep it.
  replyTime: "1 hora",
  // Upcoming occasions for the "order by" banner. Cutoff = date minus leadDays.
  leadDays: 42,
  seasons: [
    { d: "2026-12-12", es: "Virgencita de Guadalupe", en: "Our Lady of Guadalupe", zh: "瓜达卢佩圣母日" },
    { d: "2027-01-06", es: "Día de Reyes", en: "Three Kings Day", zh: "三王节" },
    { d: "2027-02-14", es: "Día del Amor y la Amistad", en: "Valentine's Day", zh: "情人节" },
    { d: "2027-04-30", es: "Día del Niño", en: "Children's Day", zh: "儿童节" },
    { d: "2027-05-10", es: "Día de las Madres", en: "Mother's Day (México)", zh: "母亲节（墨西哥）" },
    { d: "2027-06-20", es: "Día del Padre", en: "Father's Day", zh: "父亲节" },
    { d: "2027-09-15", es: "Fiestas Patrias", en: "Mexican Independence", zh: "墨西哥独立日" },
    { d: "2027-11-01", es: "Día de Muertos", en: "Día de Muertos", zh: "亡灵节" },
    { d: "2027-12-12", es: "Virgencita de Guadalupe", en: "Our Lady of Guadalupe", zh: "瓜达卢佩圣母日" }
  ],
  // Mexican states for the hometown selector and state-variant products.
  states: ["Aguascalientes","Baja California","Chiapas","Chihuahua","CDMX","Colima","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","Estado de México","Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas"],

  // Social handles from Majordomo › Studio › Channels (optional; leave "" to hide).
  instagram: "casanopal.official",
  facebook: "casanopal.official",      // Page username or numeric id, e.g. "casanopal" → facebook.com/casanopal
  tiktok: "",
};
