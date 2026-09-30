# Christ Laborers Church website

The official website of **Christ Laborers Worldwide Anglican Church of Liberia**, Paynesville (est. March 10, 2020).

It is a fast, static, mobile-first site with no build step. Open `index.html` in a browser, or host the folder anywhere.

## Structure

```
index.html              Home page
about.html              Story, mission & vision, emblem, values, beliefs
leadership.html         Presiding Bishop, clergy roles, path to ordination
ministries.html         Every ministry in detail
discipleship.html       Equipping The Saints school, modules, registration, FAQ
events.html             Weekly services, yearly calendar, highlights
gallery.html            Filterable photo gallery
give.html               Ways to give, impact, prayer requests
contact.html            Visit info, map, message form, first-visit FAQ
404.html                Friendly "page not found"
assets/discipleship-class.ics   "Add to calendar" file for Monday classes
assets/css/styles.css   Design system (colors from the church emblem) and layout
assets/js/main.js       Menu, scroll animations, gallery + lightbox, class countdown, prayer form
assets/img/             Logo, favicon, social preview image
assets/img/gallery/     Photos (name.webp full size + name-sm.webp thumbnail)
```

## Common edits

| What | Where |
| --- | --- |
| Service times | `index.html` (hero cards + Visit section), `events.html`, `contact.html`, and the menu note in each page header |
| Menu / footer links | The header and footer are the same on every page; change them in all `.html` files |
| Phone / WhatsApp number | Search `231779230549` in `index.html` and `assets/js/main.js` |
| Events / highlights | `index.html`: the `timeline` list in the `#events` section |
| Gallery photos | Add `name.webp` + `name-sm.webp` to `assets/img/gallery/`, then add a line to `GALLERY` in `assets/js/main.js` |

Prayer requests, class registration and contact messages open WhatsApp with the message pre-filled, so no server is needed.

## Publish free with GitHub Pages

1. In the repository go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch, and set the folder to `/ (root)`.
3. Save. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.
