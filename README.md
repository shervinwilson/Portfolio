# Portfolio (Next.js + GSAP)

An original, editorial-style portfolio built with the Next.js App Router and GSAP.
Palette: warm off-white `#F8F7F3`, near-black `#171717`, muted olive `#7C8B68`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 18.18 or newer. The fonts (Bricolage Grotesque and Instrument
Sans) are downloaded from Google Fonts at build time by `next/font`.

## Pages

| Route             | What it is                                              |
| ----------------- | ------------------------------------------------------- |
| `/`               | Hero, selected work, about, skills, contact             |
| `/work`           | All projects                                            |
| `/work/[slug]`    | One case study page per project (generated from data)   |
| `/about`          | About and skills                                        |
| `/contact`        | Contact form                                            |
| `/api/contact`    | Form endpoint (validates, then sends email via Resend)  |
| any other URL     | Custom 404 page                                         |

## Make it yours

Almost everything is in **`src/data/site.js`**:

1. Replace `Your Name`, the email address and the LinkedIn / GitHub links
   (all are placeholders).
2. Replace the four **sample projects** with your real work and real results.
   Adding a project adds its case study page automatically.
3. Edit the intro, about text, facts and skills.

Placeholder illustrations live in `src/components/ProjectArt.js`. When you have
real screenshots, put them in `public/` and swap them in with `next/image`.

Colours and spacing are CSS variables at the top of `src/app/globals.css`.

## Animation (GSAP)

- `src/components/Hero.js`: headline line-by-line reveal on load, then a scroll-linked
  drift as you leave the hero.
- `src/components/WorkIndex.js`: cursor-following preview card on the work list
  (only on devices with a mouse).
- `src/components/ParallaxArt.js`: gentle scale on case study images while scrolling.

All animation is wrapped in `gsap.matchMedia()` and switches off for visitors who
prefer reduced motion. GSAP is registered once in `src/lib/gsap.js`.

## Contact form email

Copy `.env.example` to `.env.local` and fill it in (uses [Resend](https://resend.com)):

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@yourdomain.com
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

Without these, messages are logged to the terminal in development, and the form
shows a "not set up yet" message in production.

## Deploy

Works on Vercel out of the box: import the repository, add the three environment
variables, and deploy.
