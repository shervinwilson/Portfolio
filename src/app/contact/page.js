import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Start a project or ask a question.",
};

export default function ContactPage() {
  return (
    <div className="container">
      <header className="page-head">
        <h1>Contact</h1>
        <p className="page-head__lead">
          Tell me what you&apos;re building and when you need it. I reply to
          every message.
        </p>
      </header>

      <section className="section section--tight contact-grid">
        <ContactForm />
        <aside aria-label="Other ways to reach me">
          <h2 className="small-title">Email</h2>
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <h2 className="small-title">Elsewhere</h2>
          <ul className="plain-list">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  className="link"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="small-title">Location</h2>
          <p>{site.location}</p>
        </aside>
      </section>
    </div>
  );
}
