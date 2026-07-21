"use client";

import { useState } from "react";
import styles from "./contact.module.css";

const FAQS = [
  {
    question: "How are girls identified for your protection programs?",
    answer: "We work directly with a network of local public school teachers, community health workers, and tribal mediation circles who alert our crisis teams when a girl ceases school attendance or is at imminent risk of forced marriage."
  },
  {
    question: "Is my sponsorship donation tax-deductible?",
    answer: "Yes, Radiant Horizon Foundation is a registered 501(c)(3) tax-exempt nonprofit organization. All donations are fully tax-deductible to the extent permitted by law. You will receive an official tax receipt via email."
  },
  {
    question: "Can I contact or write letters to a girl I sponsor?",
    answer: "Yes! Sponsoring partners can write letter updates, which are translated and delivered by our field coordinators. To protect the absolute safety, privacy, and psychological well-being of the girls, all correspondence is mediated through our office staff."
  },
  {
    question: "How can our student group or school get involved?",
    answer: "We offer comprehensive school outreach kits, presentation materials, and fundraising guidelines. Students can launch awareness clubs, host film screenings, or coordinate local events to fund school packages."
  }
];

export default function Contact() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && message) {
      setFormSubmitted(true);
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>Get in Touch</h1>
          <p className={styles.headerTagline}>
            Have questions about our programs, sponsorships, or fundraising partnerships? Reach out to us.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="section">
        <div className={`${styles.contactGrid} container`}>
          {/* Contact Form Column */}
          <div className={`${styles.formCard} glass-panel`}>
            {formSubmitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(15, 118, 110, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    color: "var(--primary)",
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
                <h3 className={styles.formTitle} style={{ color: "var(--primary)" }}>Message Sent</h3>
                <p className={styles.formText} style={{ marginBottom: "0" }}>
                  Thank you for reaching out. A member of our support team will respond to you within 24–48 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formText}>All inquiries are strictly confidential.</p>

                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">Inquiry Type</label>
                  <select
                    id="contact-subject"
                    className="form-control"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Sponsorship Program">Child Sponsorship</option>
                    <option value="Donation Receipts">Donation Receipts & Tax Tax-Exemptions</option>
                    <option value="Media & Press">Media & Interview Inquiries</option>
                    <option value="Volunteering">Volunteering Opportunities</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    className="form-control"
                    rows={5}
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-accent styles.submitBtn" style={{ width: "100%" }}>
                  Send Confidential Message
                </button>
              </form>
            )}
          </div>

          {/* FAQ Column */}
          <div className={styles.faqSection}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <div className={styles.accordion}>
              {FAQS.map((faq, idx) => {
                const isActive = activeFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`${styles.accordionItem} ${isActive ? styles.accordionActive : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.accordionHeader}
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isActive}
                    >
                      {faq.question}
                      <span className={`${styles.chevron} ${isActive ? styles.chevronActive : ""}`}>
                        ▼
                      </span>
                    </button>
                    <div
                      className={`${styles.accordionBody} ${isActive ? styles.accordionBodyOpen : ""}`}
                      style={{ maxHeight: isActive ? "200px" : "0px" }}
                    >
                      <div className={styles.accordionContent}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
