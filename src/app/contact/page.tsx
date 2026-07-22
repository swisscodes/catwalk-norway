import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Catwalk to Freedom Foundation. Have questions about our programs, child sponsorships, or fundraising partnerships?",
};

export default function ContactPage() {
  return <ContactContent />;
}
