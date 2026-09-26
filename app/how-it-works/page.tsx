import type { Metadata } from "next";
import { HowItWorksExperience } from "@/components/support/how-it-works-experience";
import "../support.css";

export const metadata: Metadata = {
  title: "How It Works — Travel & LIV Collective",
  description: "How Travel & LIV trips work, from choosing and booking to room options, preparation, arrival and support.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return <HowItWorksExperience />;
}
