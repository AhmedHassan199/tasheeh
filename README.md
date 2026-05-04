# أكاديمية تصحيح · Tasheeh Calligraphy Academy

A premium, RTL-first React website for the online Arabic calligraphy academy
**تصحيح**. Built with Vite, Tailwind CSS, Framer Motion, and Lucide icons.

## Brand

- **Primary** – `flame-500` `#EF4E1A` (extracted from the academy logo)
- **Cream** – `ink-100` `#F5EDE0`
- **Ink dark** – `ink-900` `#120A05`
- **Signature ornament** – `<◆◆── line ──◆>` rendered as the `Ornament` SVG and reused across sections

## Stack

- React 18 (functional components + hooks)
- Vite 5
- Tailwind CSS 3 (custom theme, dark mode via `class`)
- Framer Motion 11 (entrance, hover, modal transitions)
- Lucide React (icon set)
- Google Fonts: **Reem Kufi Fun**, **Tajawal**, **Aref Ruqaa**, **Amiri**, **Cormorant Garamond**, **Inter**

## Run locally

```bash
cd tasheeh-academy
npm install
npm run dev
```

Then open <http://localhost:5173>.

## Folder structure

```
src/
├── App.jsx
├── main.jsx
├── index.css                 — global tokens, paper texture, brand utilities
├── context/
│   └── ThemeContext.jsx      — light/dark with localStorage persistence
├── data/
│   └── teachers.js           — teachers + gallery + stats (dummy data)
└── components/
    ├── Navbar.jsx            — sticky + blur, mobile drawer
    ├── HeroSection.jsx       — hero, big watermark word, stats strip
    ├── AboutSection.jsx      — pillars + methodology timeline
    ├── InstructorsSection.jsx
    ├── TeacherCard.jsx
    ├── TeacherModal.jsx      — full-detail modal with gallery + CTA
    ├── GalleryGrid.jsx       — masonry-ish grid + lightbox
    ├── RegistrationForm.jsx  — validated form + animated success state
    ├── Footer.jsx
    ├── Logo.jsx
    ├── Ornament.jsx          — brand diamond+line motif
    └── ThemeToggle.jsx
```

## Real assets

Drop the source files into `public/` and reference them where the dummy
Unsplash URLs live in `src/data/teachers.js`. The brand watermark in
`علامة مائية تصحيح.pdf` can replace the SVG watermark used throughout
the sections.

## Notes

- The site is **RTL-first** (`<html dir="rtl" lang="ar">`).
- Form submission is currently mocked. To wire the real Google Form,
  replace the `await new Promise(...)` inside `RegistrationForm.jsx`
  with a `fetch` to the `formResponse` endpoint.
