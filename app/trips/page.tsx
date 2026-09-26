import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trips, listedPrice, startingPrice } from "@/lib/trips";
import { TripHeader, TripFooter } from "@/components/trips/trip-shell";
import { TripMotion } from "@/components/trips/trip-motion";
import "./trips.css";

export const metadata: Metadata = { alternates: { canonical: "/trips" }, title: "Find Your Trip — Travel & LIV Collective", description: "A few places we'd love to take you. Explore Punta Cana, Brazil, Phuket and Bali with Travel & LIV Collective." };
export default function TripsPage() {
  return <TripMotion><a className="skip-link" href="#destinations">Skip to trips</a><TripHeader />
    <main>
      <section className="tr-collection tr-wrap" aria-labelledby="collection-title">
        <div className="tr-collection-heading"><div><span className="tr-kicker" data-tr-title>THE NEXT CHAPTER</span><h1 id="collection-title" data-tr-title>Where shall<br />we go <em>next?</em></h1></div><div className="tr-heading-aside"><p>Somewhere new.<br />Someone to share it with.</p><a href="#destinations" className="tr-index-link">Explore {trips.length} destinations <span>↓</span></a></div></div>
        <div className="tr-collection-grid" id="destinations">
          {trips.map((trip, i) => <article className="tr-destination" key={trip.slug}>
            <Link href={`/trips/${trip.slug}`} aria-label={`Explore ${trip.name}`} className="tr-destination-link">
              <div className="tr-card-image"><img src={trip.image} alt={trip.alt} loading={i < 2 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} style={{ objectPosition: trip.position }} width={900} height={675} /><span className="tr-card-status">{trip.state === "review" ? "SINGLES ESCAPE" : "ON THE HORIZON"}</span><span className="tr-round-arrow"><ArrowUpRight size={23} /></span></div>
              <div className="tr-card-title"><span className="tr-kicker">{trip.region}</span><h2>{trip.name}</h2><p>{trip.mood.join(" ")}</p></div>
              <div className="tr-card-facts"><span>{trip.state === "review" ? "Dates being confirmed" : "Next dates coming soon"}<small>{trip.state === "review" ? "5 days / 4 nights · Singles only" : "Be part of the next chapter"}</small></span><span>{trip.state === "review" ? `From ${listedPrice(startingPrice)}` : "Explore destination"}<small>{trip.state === "review" ? "Listed per person · Flights extra" : "Price to be confirmed"}</small></span></div>
            </Link>
          </article>)}
        </div>
      </section>
      <section className="tr-help tr-wrap" aria-labelledby="help-title" data-tr-reveal><figure><img src="/media/olivia.webp" alt="Olivia Owen" width={200} height={240} loading="lazy" /></figure><div><span className="tr-kicker">A LITTLE HELP CHOOSING</span><h2 id="help-title">Not sure <em>which one?</em></h2><a className="tr-text-link" href="mailto:Info@travelnliv.com?subject=Help%20choosing%20a%20trip">Ask Olivia <ArrowUpRight size={16} /></a></div><span className="tr-help-signature" aria-hidden="true">See you<br />out there.</span></section>
    </main><TripFooter /></TripMotion>;
}
