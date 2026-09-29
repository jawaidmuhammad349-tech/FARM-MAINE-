import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Brickhouse Farm about orders, charcuterie boards, meat shares or farm visits.",
};

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>We&rsquo;d love to hear from you</h1>
          <p className="lead">Questions about an order, a custom board or a beef share? Send us a note.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="container split" style={{ alignItems: "start" }}>
          <div className="card">
            <ContactForm />
          </div>
          <ul className="contact-list">
            <li>
              <strong>Email</strong>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <strong>Phone</strong>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>
            </li>
            <li>
              <strong>Farm</strong>
              {site.location}
            </li>
            <li>
              <strong>Pickup</strong>
              Farm pickup by arrangement — we&rsquo;ll confirm a time with your order.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
