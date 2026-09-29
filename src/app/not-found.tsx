import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page wandered off the pasture</h1>
        <p className="lead">We couldn&rsquo;t find what you were looking for.</p>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
