# Christ Laborers Church website

The official website of **Christ Laborers Worldwide Anglican Church of Liberia**, Paynesville (est. March 10, 2020).

It is a fast, static, mobile-first site with no build step. Open `index.html` in a browser, or host the folder anywhere.

## Structure

```
index.html              All page content and sections
assets/css/styles.css   Design system (colors from the church emblem) and layout
assets/js/main.js       Menu, scroll animations, gallery + lightbox, class countdown, prayer form
assets/img/             Logo, favicon, social preview image
assets/img/gallery/     Photos (name.webp full size + name-sm.webp thumbnail)
```

## Common edits

| What | Where |
| --- | --- |
| Service times | `index.html`: the `hero-times` cards and the "Gatherings" line in the Visit section |
| Phone / WhatsApp number | Search `231779230549` in `index.html` and `assets/js/main.js` |
| Events / highlights | `index.html`: the `timeline` list in the `#events` section |
| Gallery photos | Add `name.webp` + `name-sm.webp` to `assets/img/gallery/`, then add a line to `GALLERY` in `assets/js/main.js` |

Prayer requests open WhatsApp with the message pre-filled, so no server is needed.

## Publish free with GitHub Pages

1. In the repository go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch, and set the folder to `/ (root)`.
3. Save. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.
