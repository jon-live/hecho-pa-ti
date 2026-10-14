// ─────────────────────────────────────────────────────────────
// Hecho Pa' Ti — site configuration
// Edit this file before publishing. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────
window.HPT_CONFIG = {
  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  whatsapp: "16505550142",            // ← REPLACE with your real number
  whatsappDisplay: "+1 (650) 555-0142",

  // Where "Enviar por correo" (email order) goes.
  email: "pedidos@hechopati.com",     // ← REPLACE

  // Payment handles shown after the customer sends an order.
  zelle: "pedidos@hechopati.com",
  cashApp: "$HechoPaTi",

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

  // Optional: a form backend (Formspree, Basin, Web3Forms…) that receives
  // orders and wishlist requests as JSON POST, so they land in your inbox
  // automatically. Leave "" to rely on WhatsApp / email only.
  // Example (Formspree): "https://formspree.io/f/abcdwxyz"
  formEndpoint: "",

  // Instagram / TikTok handles (optional; leave "" to hide).
  instagram: "hechopati",
  tiktok: "hechopati",
};
