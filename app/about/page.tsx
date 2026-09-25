import type { Metadata } from "next";
import { AboutExperience } from "@/components/about/about-experience";
import "../journey.css";
import "./about.css";

export const metadata: Metadata = {
  title: "Meet Olivia — Travel & LIV Collective",
  description: "Meet Olivia Owen, the person bringing Travel & LIV together. A little of her story, a moment with the group, and an invitation to join the next trip.",
};

export default function AboutPage() {
  return <AboutExperience />;
}
