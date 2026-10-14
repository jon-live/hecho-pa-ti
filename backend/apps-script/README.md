# Google Sheet intake (write-only)

Orders and wishlist requests from the site are appended to a private Google Sheet and you get an email for each one. The customer gets an automatic confirmation in their language with the deposit amount.

The site only has the web-app URL. That URL accepts POSTs and returns nothing else, so the Sheet is write-only from the outside and stays private to your Google account.

## Setup (about 5 minutes)

1. Create a new Google Sheet, e.g. **Hecho Pa' Ti — Pedidos**.
2. In the Sheet: **Extensions → Apps Script**. Delete the sample code and paste the contents of `Code.gs`.
3. Edit the `SETTINGS` block at the top: your email, Zelle / Cash App handles, WhatsApp number, pickup city. Keep `token` in sync with `formToken` in `js/config.js`.
4. Run `setup` once (pick it in the function dropdown, press ▶). Approve the permissions. This creates the **Orders** and **Wishes** tabs.
5. **Deploy → New deployment → Web app**. Execute as **Me**, Who has access **Anyone**. Deploy and copy the URL ending in `/exec`.
6. Paste that URL into `js/config.js` → `formEndpoint`. Commit and push.

To change the script later: edit, then **Deploy → Manage deployments → ✎ → Version: New** so the same URL picks up the change.

## What lands in the Sheet

**Orders**: timestamp, order number (`HPT-yymmdd-nnn`), status, checkboxes for *Deposit paid / Arrived / Notified*, language, name, phone, email, pickup or ship, city, payment method, notes, one line per item, subtotal, shipping, total, deposit, balance, and the raw order text.

**Wishes**: timestamp, request number (`REQ-…`), status, *Replied* checkbox, language, name, email, phone, what they want, the similar-product link, quantity, notes.

Tick the checkboxes as you go. Filtering on *Arrived = TRUE, Notified = FALSE* gives you the list of people to email.

## Limits and notes

- Free quota is ~20,000 requests and 100 emails per day per Google account (owner + customer = 2 emails per order).
- Anyone who finds the URL can add rows. The token, email check and size limit keep bots out; the worst case is a junk row.
- The Sheet contains customer names, phones and emails. Keep sharing off (the default) and do not put it in the repo.
- If you turn `emailCustomer` off, customers still see the on-site confirmation with the deposit amount.
