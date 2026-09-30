# Christ Laborers Church website

The official website of **Christ Laborers Worldwide Anglican Church of Liberia**, Paynesville (est. March 10, 2020).

It is a fast, static, mobile-first site with no build step. Open `index.html` in a browser, or host the folder anywhere.

## Structure

```
index.html              Home page
about.html              History, calling, vision & mission, core values, beliefs
leadership.html         Founders, House of Bishops, Bishops in America, clergy
ministries.html         The 25 ministries & departments, grouped
institutions.html       University, schools, clinics, theology school, academy, chaplaincy
global.html             Global ministries, Order of Knights & Dames, Honors & Awards, IPEA
join.html               Membership steps, partnership, forms & resources
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
| Menu / footer links | The header and footer (with dropdown menus) are the same on every page; change them in all `.html` files |
| Contact details | Footer on every page, plus `contact.html` and the home page Visit section |
| Phone / WhatsApp number | Search `231779230549` in `index.html` and `assets/js/main.js` |
| Events / highlights | `index.html`: the `timeline` list in the `#events` section |
| Gallery photos | Add `name.webp` + `name-sm.webp` to `assets/img/gallery/`, then add a line to `GALLERY` in `assets/js/main.js` |

Prayer requests, class registration and contact messages open WhatsApp with the message pre-filled, so no server is needed.

## Publish free with GitHub Pages

1. In the repository go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, pick the branch, and set the folder to `/ (root)`.
3. Save. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

## After editing CSS or JavaScript

Run `./stamp-assets.sh`. It updates the `?v=` version on the stylesheet and script links in every page, so visitors' browsers load the new files instead of an old saved copy.
