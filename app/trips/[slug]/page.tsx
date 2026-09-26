import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { trips, getTrip } from "@/lib/trips";
import { TripDetail } from "@/components/trips/trip-detail";
import "../trips.css";
import "../punta.css";
import { PuntaExperience } from "@/components/trips/punta-experience";
export function generateStaticParams() { return trips.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const trip = getTrip((await params).slug);
  if (!trip) return { title: "Trip not found — Travel & LIV" };
  return { alternates: { canonical: `/trips/${trip.slug}` }, title: `${trip.name} — Travel & LIV Collective`, description: `${trip.mood.join(" ")} Explore ${trip.name} with Travel & LIV Collective.`, openGraph: { title: `${trip.name} — Travel & LIV Collective`, description: trip.mood.join(" "), images: [trip.image] } };
}
export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const trip = getTrip((await params).slug);
  if (!trip) notFound();
  return trip.slug === "punta-cana" ? <PuntaExperience /> : <TripDetail trip={trip} />;
}
