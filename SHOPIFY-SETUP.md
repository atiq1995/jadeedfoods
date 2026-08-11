# Shopify setup checklist — Jadeed Foods

Use this after the theme is connected from GitHub (`atiq1995/jadeedfoods`, branch `main`).  
Live preview: https://fpjm0m-sa.myshopify.com/

Theme code is already pushed. Everything below is done **inside Shopify Admin**.

---

## 1. Store identity

| Step | Where | What to do |
|------|--------|------------|
| Rename store | **Settings → Store details** | Change name from `My Store` to **Jadeed Foods** |
| Contact email | Same page | Use `web@jadeedfoods.com` (or your live email) |
| Address / phone | Same page | Match footer: Rawalpindi address, `+92-51-111-JADEED` |
| Favicon / logo | **Online Store → Themes → Customize → Theme settings → Logo** | Upload `jadeed-logo.png` as store logo if not already set |

---

## 2. Create pages (and assign Jadeed templates)

Go to **Online Store → Pages → Add page**. For each page, set **Theme template** in the right sidebar (scroll down on the page editor).

| Page title | Suggested URL handle | Theme template (dropdown label) |
|------------|----------------------|----------------------------------|
| About Us | `about-us` | `about` |
| Contact Us | `contact-us` | `contact` |
| FAQs | `faqs` | `faqs` |
| Feedback | `feedback` | `feedback` |
| Order Tracking | `order-tracking` | `order-tracking` |
| Privacy Policy | `privacy-policy` | **`privacy-policy`** (or `privacy`) |
| Terms & Conditions | `terms-and-conditions` | `terms` |
| Wishlist | `wishlist` | `wishlist` |

**Privacy Policy — important:**
- Shopify does **not** auto-create this page for you. You must add it manually under **Pages**.
- In the page editor, open **Theme template** (right side) and choose **`privacy-policy`** — not “Default page”.
- Do **not** confuse this with **Settings → Policies → Privacy policy** — that is Shopify’s checkout policy text, not your styled Jadeed page.
- After GitHub sync (~1 min), if you still don’t see `privacy-policy`, refresh the admin page or re-open the page editor.

Notes:
- Handles must match footer links (already set in the theme): `/pages/about-us`, `/pages/contact-us`, etc.
- Publish each page when ready.

---

## 3. Navigation (header menu)

Shopify moved this out of Online Store. Go to **Content → Menus** (left sidebar), then open **Main menu**.

Recommended items (match the Figma header):

1. Home → `/`
2. About Us → `/pages/about-us`
3. Jadeed Products / Catalog → `/collections/all` (or a parent collection)
4. Special Deals → collection or page you create
5. Contact → `/pages/contact-us`
6. FAQs → `/pages/faqs`
7. Order Tracking → `/pages/order-tracking`
8. Blog → `/blogs/news` (after blog exists)

Then:
- Open **Customize → Header**
- Confirm **Menu** = Main menu
- Set **Become a Vendor** URL (e.g. `/pages/contact-us`)

---

## 4. Collections & products

Homepage cards work with placeholder images, but for a real store:

| Task | Where |
|------|--------|
| Create collections | **Products → Collections** — e.g. Rice, Spices, Oil |
| Add products | **Products → Add product** — images, price (PKR), inventory |
| Assign products to collections | On each product or collection |
| Homepage wiring | **Customize → Homepage** → edit blocks: |

- **Shop by Category** — pick a Collection (or leave image defaults)
- **Special Deals** — set links / images
- **Best Selling Products** — pick Products

Until collections exist, cards link to `/collections/all`.

---

## 5. Blog

| Task | Where |
|------|--------|
| Create blog | **Online Store → Blog posts → Manage blogs** — keep or rename `News` |
| Add posts | Create posts with images so the Blogs section can use real content later |
| Optional | In **Customize → Homepage → Blogs**, switch source from Manual to Shopify blog |

Manual cards currently link to `/blogs/news`.

---

## 6. Footer & social

**Customize → Footer (Jadeed footer):**

- Confirm About text, address, email, phone
- Quick links / Company links already point at the pages above — create those pages first
- Set Instagram URL
- Upload Instagram grid images in the Instagram blocks (or leave theme asset defaults)
- **Theme settings → Social media** — add Instagram / Facebook / YouTube / Twitter links for icons

---

## 7. Homepage sections to review in the theme editor

Open **Online Store → Themes → Customize** (homepage):

1. **Announcement bar** — edit welcome text if needed  
2. **Hero** — optional custom background image  
3. **Shop by Category** — collections + titles  
4. **Special Deals** — images + links  
5. **Rich Aroma** — image/text OK by default  
6. **Best Selling Products** — assign products  
7. **Purity** — copy OK by default  
8. **Blogs** — titles/images/links or switch to blog  
9. **Lifestyle** — background image OK by default  
10. **Testimonials** — edit quotes/names; lockup should read **“IT HAS TO BE”** + Jadeed logo + **FOODS** above the red Testimonials band  

If Testimonials lockup still looks wrong after sync, tell the developer — it should match the cream “IT HAS TO BE / JADEED FOODS” block above the red Testimonials section.

---

## 8. Payments, shipping, taxes (store must sell)

| Step | Where |
|------|--------|
| Currency | **Settings → Store details** — PKR |
| Payments | **Settings → Payments** — enable providers / manual payments |
| Shipping | **Settings → Shipping and delivery** — zones & rates |
| Taxes | **Settings → Taxes and duties** |
| Checkout | **Settings → Checkout** — customer accounts, etc. |

---

## 9. Domains & publish

| Step | Where |
|------|--------|
| Custom domain | **Settings → Domains** — connect `jadeedfoods.com` (or your domain) |
| Password page | **Online Store → Preferences** — turn off password when ready to go live |
| Publish theme | **Online Store → Themes** — Publish the GitHub-connected Jadeed theme |

---

## 10. Apps (optional / later)

| Need | Note |
|------|------|
| Wishlist | Theme has a wishlist page placeholder — needs a wishlist app |
| Reviews | Product reviews section can stay manual or use Judge.me / Loox / etc. |
| Order tracking | Page UI exists; real tracking needs an app or fulfillment workflow |

---

## Quick “done” checklist

- [ ] Store renamed to Jadeed Foods  
- [ ] All Jadeed pages created with correct handles + templates  
- [ ] Main menu matches design links  
- [ ] Collections + products added  
- [ ] Homepage blocks linked to real collections/products  
- [ ] Blog created / posts added  
- [ ] Footer + social filled in  
- [ ] Payments + shipping configured  
- [ ] Domain connected  
- [ ] Password removed & theme published  

---

## Notes

- GitHub theme sync is automatic for code changes. You do **not** re-upload the theme for normal pushes.
- If a section disappears after a sync, check the theme’s GitHub log in Shopify for schema errors.
- Design reference folder (`design/`) is local only and is not part of the Shopify theme repo.
