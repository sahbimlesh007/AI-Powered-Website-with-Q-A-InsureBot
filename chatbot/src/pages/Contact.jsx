import { useState } from "react";
import { company } from "../data/companyData";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(company.address)}&output=embed`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true); // demo only: no backend call
    e.target.reset();
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="box">
            <h3>Send us a message</h3>
            {sent && (
              <p className="success">
                Thank you! Our team will contact you shortly.
              </p>
            )}
            <form className="form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Full name" required />
              <input type="email" placeholder="Email address" required />
              <input type="tel" placeholder="Phone number" />
              <select defaultValue="">
                <option value="" disabled>
                  Interested in...
                </option>
                <option>Motor Insurance</option>
                <option>Health Insurance</option>
                <option>Business Insurance</option>
                <option>Claim Assistance</option>
              </select>
              <textarea rows="5" placeholder="Your message" required />
              <button type="submit" className="btn btn-maroon">
                Send Message
              </button>
            </form>
          </div>

          <div>
            <div className="box">
              <h3>Get in touch</h3>
              <ul className="info-list">
                <li>📍 {company.address}</li>
                <li>📞 {company.phone}</li>
                <li>✉️ {company.email}</li>
                <li>🕒 {company.hours}</li>
              </ul>
            </div>
            <iframe
              className="map"
              title="Office location"
              src={mapSrc}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
