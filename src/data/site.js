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
  aboutPortrait: "/Shervin-Wilson.webp",

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

  services: [
    {
      title: "Web design and builds",
      description:
        "Clear, responsive websites that turn a rough idea into a polished experience people can use on any screen.",
      items: ["Webflow", "WordPress", "Custom code"],
    },
    {
      title: "Redesigns and refinements",
      description:
        "A sharper structure and visual system for sites that have outgrown their original design.",
      items: ["Content structure", "UI/UX", "Responsive design"],
    },
    {
      title: "Performance and support",
      description:
        "Practical improvements that make existing websites faster, more reliable, and easier to maintain.",
      items: ["Core Web Vitals", "Accessibility", "Ongoing care"],
    },
  ],
};

// Project screenshots are stored locally in public/projects.
export const projects = [
  {
    slug: "colourland-uae",
    title: "Colour Land Trading",
    url: "https://colourlanduae.com/",
  },
  {
    slug: "kjp-designs",
    title: "KJP Designs",
    url: "https://kjpdesigns.net/",
  },
  {
    slug: "mercian",
    title: "Mercian",
    url: "https://mercian.ae/",
  },
  {
    slug: "living-water-dentistry",
    title: "Living Water Dentistry",
    url: "https://livingwaterdentistry.ca/",
  },
  {
    slug: "pacific-supply-fzco",
    title: "Pacific Supply FZCO",
    url: "https://pacificsupplyfzco.com/",
  },
  {
    slug: "haidabim",
    title: "Haidabim",
    url: "https://haidabim.com/",
  },
  {
    slug: "katara-limousine",
    title: "Katara Limousine",
    url: "https://kataralimousine.com/",
  },
  {
    slug: "bosq",
    title: "BOSQ",
    url: "https://bosq.in/",
  },
  {
    slug: "iretex-premier",
    title: "The Premier Pack | IRETEX PREMIER",
    url: "https://iretexpremier.com/",
  },
  {
    slug: "global-medilink",
    title: "Global Medilink",
    url: "https://globalmedilink.com/",
  },
  {
    slug: "aman-abs",
    title: "Aman ABS",
    url: "https://amanabs.com/",
  },
  {
    slug: "mcc-global",
    title: "MCC Global",
    url: "https://mccglobal.co/",
  },
  {
    slug: "herbartizan",
    title: "Herbartizan",
    url: "https://herbartizan.com/",
  },
  {
    slug: "neerozhukkil-vaidyasala",
    title: "Neerozhukkil Vaidyasala",
    url: "https://neerozhukkilvaidyasala.com/",
  },
  {
    slug: "charter-247",
    title: "Charter 247",
    url: "https://charter-247.com/",
  },
  {
    slug: "autosmarts",
    title: "AutoSmarts",
    url: "https://autosmarts.co/en",
  },
  {
    slug: "elite-infotech",
    title: "Elite Infotech",
    url: "https://www.eliteinfotech.com/",
  },
  {
    slug: "cliffton-park-club",
    title: "Cliffton Park Club",
    url: "https://clifftonparkclub.com/",
  },
].map((project) => ({
  ...project,
  category: "Website",
  status: "Live",
  summary: "Visit the live website",
  screenshot: `/projects/${project.slug}.jpg`,
}));