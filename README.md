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
| `/blog`           | Published posts from Sanity                             |
| `/blog/[slug]`    | Sanity post detail page                                 |
| `/studio`         | Sanity content studio                                   |
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

## Environment variables

Copy `.env.example` to `.env.local`, then set the Sanity project ID and dataset
for your project. The Sanity values connect the blog and embedded Studio to your
content project. `.env.local` is intentionally excluded from Git.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin (for example,
`https://your-domain.com`). This is used for canonical links, social metadata,
`robots.txt`, and the sitemap. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is
used as a fallback when `NEXT_PUBLIC_SITE_URL` is not set.

The contact form sends mail through [Resend](https://resend.com). Set
`RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in `.env.local` and in the production
deployment. `CONTACT_TO_EMAIL` defaults to `shervinwilson379@gmail.com`. For
production delivery, verify your sending domain with Resend and use an address
on that domain as `CONTACT_FROM_EMAIL`.

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@yourdomain.com
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

Without the Resend settings, the form reports that email delivery is not
configured. Messages are not stored or logged as successful submissions.

## Deploy

Works on Vercel out of the box: import the repository, add the three environment
variables, and deploy.
