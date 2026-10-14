import Link from "next/link";
import { site } from "@/data/site";

export default function ContactBlock({ headingId }) {
  return (
    <div className="contact">
      <p className="contact__eyebrow">Let&apos;s make it happen /</p>
      <h2 id={headingId}>Have a good idea? Let&apos;s build it well.</h2>
      <a className="contact__email" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <div className="actions">
        <Link href="/contact" className="btn btn--solid">
          Send a message
        </Link>
      </div>
    </div>
  );
}
