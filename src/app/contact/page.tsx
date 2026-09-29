import type { Metadata } from "next";
import { retailers, site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Brickhouse Farm in Buckfield, Maine about orders, charcuterie boards, weddings or meat shares.",
};

// Wording from brickhousefarmmaine.com.

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Contact us</p>
          <h1>Ask questions or just say hello!</h1>
          <p className="lead">
            We love to hear from you about what you&rsquo;re cooking and how you&rsquo;re doing. Email or call us, and
            we will get back to you soon.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="container split" style={{ alignItems: "start" }}>
          <div className="card">
            <h2 style={{ fontSize: "1.6rem" }}>Drop us a line</h2>
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
              {site.address}
              <br />
              <a href={site.directions}>Get directions</a>
            </li>
            <li>
              <strong>Find our meats at</strong>
              {retailers.join(" · ")}
            </li>
            <li>
              <strong>Follow along</strong>
              <a href={site.facebook}>Facebook</a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
