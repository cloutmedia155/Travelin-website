import type { Metadata } from "next";
import { ContactExperience } from "@/components/support/contact-experience";
import "../support.css";

export const metadata: Metadata = {
  title: "Contact — Travel & LIV Collective",
  description: "Ask about a Travel & LIV trip, get help with an existing booking, or send a partnership enquiry.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactExperience />;
}
