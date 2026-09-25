import type { Metadata } from "next";
import { AboutExperience } from "@/components/about/about-experience";
import "../journey.css";
import "./about.css";

export const metadata: Metadata = {
  title: "Our Story — Travel & LIV Collective",
  description: "Curated, personally hosted international group trips designed for connection, 4–5-star stays, and effortless days. Meet Olivia Owen and discover our collective.",
};

export default function AboutPage() {
  return <AboutExperience />;
}
