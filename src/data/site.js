// ---------------------------------------------------------------------------
// All content lives here. Replace every placeholder with your own details.
//
// IMPORTANT: the projects below are SAMPLE entries so the layout has something
// to show. Swap in your real work (and real results) before publishing.
// ---------------------------------------------------------------------------

export const site = {
  name: "Shervin Wilson",
  role: "Creative web developer",
  location: "Based in Kerala, India",
  availability: "Available for work",

  // Short line next to your portrait on the home page.
  heroIntro:
    "I design and build clear, fast websites in Webflow, WordPress and code. Open to freelance projects and full-time roles.",

  // Your photo lives in /public/portrait.jpg. Replace that file to change it
  // (or set this to "" to show a placeholder illustration instead).
  portrait: "/portrait.jpg",

  // Placeholders: replace with your real contact details.
  email: "shervinwilson379@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shervinwilson" },
    { label: "GitHub", href: "https://github.com/shervinwilson" },
  ],

  intro:
    "I'm a creative web developer. I design and build websites in Webflow, WordPress and code, from the first layout to launch day.",

  aboutLead:
    "I design and build websites that are easy to use, quick to load and made to last.",
  about: [
    "I work across Webflow, WordPress and hand-written code. I like the space between design and engineering: turning a loose idea into a layout, then making it behave properly on every screen.",
    "Clients usually come to me for a new site, a redesign, or a slow site that needs fixing. I handle the whole job, from structure and visual design through to build and launch.",
  ],
  facts: [
    { label: "Focus", value: "Websites and web design" },
    { label: "Working with", value: "Webflow, WordPress, JavaScript" },
    { label: "Location", value: "Kerala, India" },
    { label: "Open to", value: "Freelance projects and full-time roles" },
  ],

  skills: [
    { title: "Platforms", items: ["Webflow", "WordPress", "Elementor"] },
    { title: "Code", items: ["HTML & CSS", "JavaScript"] },
    {
      title: "Craft",
      items: ["Responsive Web Design", "UI/UX Design", "Website Optimization"],
    },
  ],
};

// `art` picks one of the four placeholder illustrations (0-3).
// Replace the illustrations with real screenshots whenever you're ready.
export const projects = [
  {
    slug: "studio-landing-page",
    title: "Studio landing page",
    category: "Webflow build",
    year: "2026",
    art: 0,
    summary:
      "A one-page site for a small design studio, with a CMS for case studies.",
    role: "Design and development",
    tools: ["Webflow", "CMS", "Custom interactions"],
    overview:
      "A small design studio needed a site that showed its work quickly and could be updated without a developer. I designed the layout and built it in Webflow with a CMS-driven case study section.",
    challenge:
      "The studio had a lot of visual work but very little time to maintain a site. The page had to feel considered while staying simple enough for the team to edit on their own.",
    approach:
      "I started from the content, sketching the page as a sequence of clear moments before touching colour or type. Case studies became CMS items with a fixed structure, so new projects take minutes to publish.",
    outcome:
      "The studio now publishes new work itself. Replace this line with a real result such as load time, enquiries, or client feedback.",
  },
  {
    slug: "local-shop-redesign",
    title: "Local shop redesign",
    category: "Redesign and build",
    year: "2026",
    art: 1,
    summary:
      "A clearer structure and faster pages for an independent retail shop.",
    role: "UI/UX design and development",
    tools: ["WordPress", "Elementor", "Responsive design"],
    overview:
      "An independent shop had a site that was hard to browse on phones and slow to load. I reworked the structure, simplified the navigation and rebuilt the key pages.",
    challenge:
      "Most visitors arrived on mobile, but the old layout was built for desktop. Product pages were heavy and the path to contacting the shop was buried.",
    approach:
      "I mapped the main visitor journeys, rebuilt the templates mobile-first, and cut unnecessary plugins and oversized images.",
    outcome:
      "The new site is simpler to browse and easier to maintain. Replace this line with a real result.",
  },
  {
    slug: "performance-audit",
    title: "Performance audit",
    category: "Website optimization",
    year: "2025",
    art: 2,
    summary:
      "Finding and fixing what was slowing down a content-heavy website.",
    role: "Audit and implementation",
    tools: ["JavaScript", "Image optimization", "Core Web Vitals"],
    overview:
      "A content-heavy site felt sluggish, especially on mid-range phones. I audited it, ranked the causes by impact, and fixed the biggest ones first.",
    challenge:
      "Slowness came from many small things rather than one big one: large images, render-blocking scripts and layout shifts.",
    approach:
      "I measured before changing anything, fixed issues in order of impact, and re-measured after each change so the gains were clear.",
    outcome:
      "Pages load noticeably faster and feel more stable. Replace this line with your measured before and after numbers.",
  },
  {
    slug: "photographer-portfolio",
    title: "Photographer portfolio",
    category: "Design and development",
    year: "2025",
    art: 3,
    summary:
      "An image-led portfolio where the photographs get the whole screen.",
    role: "Design and development",
    tools: ["Webflow", "JavaScript", "Responsive design"],
    overview:
      "A photographer wanted a portfolio that stayed out of the way of the images. I designed a quiet, grid-based layout with generous space and fast-loading galleries.",
    challenge:
      "Large images usually mean slow pages. The site needed to show photography at full quality without making visitors wait.",
    approach:
      "I used responsive image sizes, lazy loading below the fold, and a restrained interface so the work leads.",
    outcome:
      "Galleries open quickly and look sharp on any screen. Replace this line with a real result.",
  },
];