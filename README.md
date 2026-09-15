# Anuri Onyeukwu — Product Manager Portfolio

Personal career portfolio with three case studies (TagGrid, Abara Care, Pennywise).
Plain HTML, CSS and JavaScript on GitHub Pages. No build step, no backend.

## Files

```
/
├── index.html      page content: hero, work, case studies, experience, skills, about, GitHub, contact
├── style.css       design (colours are the variables at the top)
├── script.js       your GitHub username + page switching for the case studies
├── assets/
│   └── profile.jpg headshot
└── README.md
```

## Settings

- GitHub username: `Onyeukwu-A` (set in `script.js`, line 7, and in the GitHub links in `index.html`)

## Editing content

- **Case studies:** each one is a `<main data-view="...">` block in `index.html` (`taggrid`, `abara`, `pennywise`).
- **Work cards:** the three `<a class="case">` blocks under `id="work"`.
- **Photo:** replace `assets/profile.jpg`, keeping the same name (portrait, about 640×800).

## Run locally

Run `python3 -m http.server` in this folder and open http://localhost:8000.
