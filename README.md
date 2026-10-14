# Hecho Pa' Ti — tienda

Static, bilingual (ES / EN) storefront for **Hecho Pa' Ti**: personalized keepsakes and everyday basics for Mexican families in the U.S. No build step, no backend.

**Pre-order model.** Customers add to cart and send the order; checkout tells them it takes a few weeks to arrive, that they only pay a 10% deposit now (Zelle / Cash App), and that we email them to pick up or ship once it lands. Orders go out as a pre-filled WhatsApp message (or email / clipboard), and optionally to a form backend.

**Wishlist ("Pídelo").** Customers describe what they want, paste a link to a similar product, and leave their email; we source it and reply with a price.

## Run it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8080
# → http://localhost:8080
```

## Before publishing

1. **`js/config.js`** — set your real WhatsApp number, email, Zelle / Cash App handles, deposit %, arrival window, pickup city and shipping fee.
   - `formEndpoint`: optional. Point it at a Formspree / Basin / Web3Forms form URL and every order and wishlist request is also POSTed there as JSON, so they land in your inbox without the customer opening WhatsApp.
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
- Checkout: 10% deposit now, rest on arrival; pickup or ship; email required so we can notify them. Confirmation panel shows the deposit amount and payment handles.
- Checkout via WhatsApp deep link, email, copy-to-clipboard, or optional form backend. No customer data leaves the browser until they send it.
- Wishlist form: description + link to a similar product + email; link is validated; sent by email/WhatsApp/form backend.
- Search, sticky category nav, dark mode, phone-first layout.
