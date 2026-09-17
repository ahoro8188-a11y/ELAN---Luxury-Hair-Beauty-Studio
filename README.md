# ÉLAN — Luxury Hair & Beauty Studio

One-page demo site for a salon. Layout is inspired by a premium skincare landing page: hero with oversized type, floating service card, trust stats, artist portraits, studio tour, service menu, and a fake booking form.

House pattern for every site we make: an opaque initials veil. On first load, and when a page link or the travel button is used, a dark curtain covers the screen, shows the brand initials, then opens top-to-bottom. Drop in `css/brand-open.css` and `js/brand-open.js`, then set `data-initials` on `[data-brand-open]`.

Nothing is booked or saved. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.
