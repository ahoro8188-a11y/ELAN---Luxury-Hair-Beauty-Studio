# ÉLAN — Luxury Hair & Beauty Studio

Multi-page demo site for a salon — built as a static portfolio piece. Layout is inspired by a premium skincare landing page: oversized hero type, floating service card, trust stats, artist portraits, studio tour, service menu, and a fake booking form.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Our Story | `story.html` |
| Services | `services.html` |
| Artists | `artists.html` |
| The Studio | `studio.html` |
| Book | `book.html` |

Nothing is booked or saved. Shared CSS lives in `css/styles.css`; nav, carousel, and the demo form live in `js/main.js`.

## Run locally

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Add to a portfolio

This is a static site (HTML, CSS, JS, images). Host the folder on GitHub Pages, Netlify, or any static host, then link the live URL from your portfolio. No build step is required.
