# Hecho Pa' Ti — tienda

Static, bilingual (ES / EN) storefront for **Hecho Pa' Ti**: personalized keepsakes and everyday basics for Mexican families in the U.S. No build step, no backend. Orders go out as a pre-filled WhatsApp message (or email / clipboard); payment is confirmed by hand (Zelle, Cash App, cash, card link).

## Run it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8080
# → http://localhost:8080
```

## Before publishing

1. **`js/config.js`** — set your real WhatsApp number, email, Zelle / Cash App handles, shipping fee and lead times.
2. **`js/catalog.js`** — edit products, prices, variants and minimum quantities. Each item is one line.
3. **Photos** — drop a square JPG at `assets/<category>-<index>.jpg` (e.g. `assets/fe-0.jpg` is the first item under *Fe y Protección*). Items without a photo show a colored tile with the product name.
4. **`js/i18n.js`** — all UI copy in Spanish and English.

## Deploy

Any static host works. Examples:

- **GitHub Pages**: Settings → Pages → Deploy from branch `main`, folder `/`.
- **Netlify / Vercel / Cloudflare Pages**: point at the repo, no build command, publish directory `/`.

## Features

- Spanish by default, English toggle (remembered; `#en` in the URL forces English).
- 6 categories, 48 SKUs: *Personalizado* (made to order, 3–4 weeks) and *En stock* (ships 1–2 days).
- Per-item personalization text, variant pickers (state, color), minimum quantities.
- Quince package builder (100 / 150 / 200 guests × favor type).
- Cart persists in the browser; subtotal, flat shipping with free-shipping threshold.
- Checkout via WhatsApp deep link, email, or copy-to-clipboard. No customer data leaves the browser until they send it.
- Search, sticky category nav, dark mode, phone-first layout.
