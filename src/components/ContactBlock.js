import Link from "next/link";
import { site } from "@/data/site";

export default function ContactBlock({ headingId }) {
  return (
    <div className="contact">
      <h2 id={headingId}>Have a project in mind? Tell me what you&apos;re building.</h2>
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
