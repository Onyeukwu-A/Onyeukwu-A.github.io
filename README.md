# Anuri Onyeukwu — Product Manager Portfolio

Personal career portfolio with three case studies (TagGrid, Abara Care, Pennywise).
Plain HTML, CSS and JavaScript on GitHub Pages. No build step, no backend.

## Files

```
/
├── index.html      page content: hero, work, case studies, experience, skills, about, GitHub, contact
├── style.css       design (colours are the variables at the top)
├── script.js       your GitHub username + page switching for the case studies
├── og-image.png          link preview image (LinkedIn, WhatsApp, X)
├── favicon.svg           browser tab icon ("AO")
├── favicon-32.png        tab icon for older browsers
├── apple-touch-icon.png  icon for phone home screens
├── sitemap.xml           tells Google which page to index
├── robots.txt            points search engines to the sitemap
├── assets/
│   ├── profile.jpg                headshot
│   └── Anuri-Onyeukwu-CV.pdf      CV behind the Download CV buttons
└── README.md
```

## Settings

- GitHub username: `Onyeukwu-A` (set in `script.js`, line 7, and in the GitHub links in `index.html`)

## Editing content

- **Case studies:** each one is a `<main data-view="...">` block in `index.html` (`taggrid`, `abara`, `pennywise`).
- **Work cards:** the three `<a class="case">` blocks under `id="work"`.
- **GitHub section:** hidden for now. In `index.html`, delete the word `hidden` from `<section class="block" id="github" hidden>` to show it again.
- **CV:** replace `assets/Anuri-Onyeukwu-CV.pdf`, keeping the same name.
- **Photo:** replace `assets/profile.jpg`, keeping the same name (portrait, about 640×800).

## After changes

- Update `<lastmod>` in `sitemap.xml` to the date of the change.
- If you change the photo or title, make a new `og-image.png` (1200×630), then paste your link into LinkedIn Post Inspector so LinkedIn refreshes its preview.

## Run locally

Run `python3 -m http.server` in this folder and open http://localhost:8000.
