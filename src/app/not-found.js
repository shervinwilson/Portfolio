import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container page-head">
      <h1>Page not found</h1>
      <p className="page-head__lead">
        That page doesn&apos;t exist or has moved. Head back home or browse the
        work.
      </p>
      <div className="actions">
        <Link href="/" className="btn btn--solid">
          Go home
        </Link>
        <Link href="/work" className="btn">
          View work
        </Link>
      </div>
    </div>
  );
}
