"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { trips, type Trip, askAbout, puntaPackage as pack, listedPrice, startingPrice } from "@/lib/trips";
import { TripHeader, TripFooter } from "./trip-shell";
import { TripMotion } from "./trip-motion";

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

function Journey() {
  const [active, setActive] = useState(0);
  const enhanced = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const choose = (index: number, focus = false) => {
    const next = (index + pack.chapters.length) % pack.chapters.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };
  return <section id="itinerary" className="tr-journey tr-wrap tr-scene" aria-labelledby="journey-title">
    <div className="tr-section-top"><div><span className="tr-kicker">A FEW DAYS, WELL SPENT</span><h2 id="journey-title">Get a feel <em>for it.</em></h2></div><span className="tr-side-note">The plans. And the space between.</span></div>
    {enhanced && <div className="tr-chapter-tabs" role="tablist" aria-label="Journey chapters">{pack.chapters.map((chapter, i) => <button key={chapter.name} role="tab" id={`chapter-tab-${i}`} aria-controls={`chapter-panel-${i}`} aria-selected={i === active} tabIndex={i === active ? 0 : -1} ref={el => { tabs.current[i] = el; }} onClick={() => choose(i)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); choose(event.key === "Home" ? 0 : event.key === "End" ? pack.chapters.length - 1 : active + (event.key === "ArrowRight" ? 1 : -1), true); } }}><span>{chapter.days}</span>{chapter.name}</button>)}</div>}
    <div className={`tr-chapter-stage ${enhanced ? "is-enhanced" : ""}`}>
      {pack.chapters.map((chapter, i) => <div key={chapter.name} id={`chapter-panel-${i}`} className="tr-chapter" role={enhanced ? "tabpanel" : undefined} aria-labelledby={enhanced ? `chapter-tab-${i}` : undefined} hidden={enhanced && i !== active} tabIndex={enhanced ? 0 : undefined}>
        <figure className="tr-chapter-photo"><img src={chapter.image} alt={chapter.alt} loading="lazy" width={1000} height={750} /><figcaption>{chapter.caption}</figcaption></figure>
        <div className="tr-chapter-copy"><span className="tr-kicker">{chapter.days} · PUNTA CANA</span><h3>{chapter.title}<br /><em>{chapter.italic}</em></h3><p>{chapter.text}</p><span className="tr-chapter-count" aria-hidden="true">0{i + 1}<i> / 0{pack.chapters.length}</i></span></div>
      </div>)}
      {enhanced && <div className="tr-chapter-controls"><button onClick={() => choose(active - 1)} aria-label="Previous chapter"><ArrowLeft size={18} /></button><button onClick={() => choose(active + 1)} aria-label="Next chapter"><ArrowRight size={18} /></button></div>}
    </div>
    <details className="tr-disclosure tr-full-itinerary"><summary>See the day-by-day plan <Plus size={17} /></summary><ol className="tr-day-list">{pack.itinerary.map(([day, title, text]) => <li key={day}><span className="tr-kicker">{day}</span><div><h4>{title}</h4><p>{text}</p></div></li>)}</ol><p className="tr-small-note">Based on the currently published package. Confirm departure dates and final arrangements with Olivia.</p></details>
  </section>;
}

export function TripDetail({ trip }: { trip: Trip }) {
  const full = trip.state === "review";
  const [roomId, setRoomId] = useState(pack.rooms[0].id);
  const room = pack.rooms.find(option => option.id === roomId)!;
  const [showDock, setShowDock] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const booking = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!full || !hero.current || !booking.current) return;
    let heroPassed = false, bookingVisible = false;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero.current) heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (entry.target === booking.current) bookingVisible = entry.isIntersecting;
      }
      setShowDock(heroPassed && !bookingVisible);
    });
    observer.observe(hero.current); observer.observe(booking.current);
    return () => observer.disconnect();
  }, [full]);
  return <TripMotion><a className="skip-link" href={full ? "#itinerary" : "#next-departure"}>Skip to trip details</a><TripHeader detail />
    <main>
      <section className="tr-detail-opening" ref={hero} aria-labelledby="trip-title">
        <div className="tr-detail-title tr-wrap"><div><span className="tr-kicker" data-tr-title>{trip.region}{full ? " · SINGLES ESCAPE" : " · ON THE HORIZON"}</span><h1 id="trip-title" data-tr-title>{trip.name}<span className="tr-destination-dot">.</span></h1></div><p data-tr-title>{trip.mood[0]}<br /><em>{trip.mood[1]}</em></p></div>
        <div className="tr-hero-photo"><img src={trip.image} alt={trip.alt} style={{ objectPosition: trip.position }} width={1600} height={850} fetchPriority="high" data-tr-drift /><span className="tr-photo-label">TRAVEL & LIV COLLECTIVE <i> / </i> {trip.region.toUpperCase()}</span></div>
        <div className="tr-facts tr-wrap"><div><span className="tr-kicker">{full ? "THE NEXT DEPARTURE" : "A LITTLE FURTHER AHEAD"}</span><strong>{full ? "Dates being confirmed" : "Next dates coming soon"}</strong></div>{full && <><div><span className="tr-kicker">TIME AWAY</span><strong>{pack.duration}</strong></div><div><span className="tr-kicker">LISTED PER PERSON</span><strong>From {listedPrice(startingPrice)}<small>Singles only · Flights extra</small></strong></div></>}<a className="tr-button" href={full ? "#booking" : "#next-departure"}>{full ? "See dates & rooms" : `Ask about ${trip.name}`}<ArrowUpRight size={17} /></a></div>
      </section>
      {full ? <>
        <nav className="tr-jump-nav" aria-label="Trip sections"><a href="#itinerary">The days</a><a href="#stay">The stay</a><a href="#people">The people</a><a href="#booking">Dates & rooms <ArrowUpRight size={13} /></a></nav>
        <Journey />
        <section className="tr-stay tr-wrap tr-scene" id="stay" aria-labelledby="stay-title">
          <div className="tr-stay-layout"><div className="tr-stay-copy" data-tr-reveal><span className="tr-kicker">EXCELLENCE PUNTA CANA</span><h2 id="stay-title">Somewhere to<br /><em>settle into.</em></h2><p>An adults-only, all-inclusive stay, with the beach close and the day ahead of you.</p><ul className="tr-inline-facts"><li>4 nights</li><li>Resort meals & drinks</li><li>Shared or private</li></ul><a className="tr-text-link" href="#room-options">Find your room <ArrowUpRight size={16} /></a></div>
          <div className="tr-stay-pictures"><figure className="tr-property-photo"><img src={pack.propertyImage} alt="Excellence Punta Cana property image from the trip's WeTravel listing" width={900} height={1000} loading="lazy" data-tr-drift /></figure><figure className="tr-property-detail"><img src={pack.propertyDetailImage} alt="Another view of Excellence Punta Cana from the trip's accommodation listing" width={450} height={500} loading="lazy" /><figcaption>A little room to unwind.</figcaption></figure></div></div>
          <details className="tr-disclosure" id="room-options"><summary>Compare your room options <Plus size={17} /></summary><fieldset className="tr-rooms"><legend className="tr-sr-only">Choose your preferred room</legend>{pack.rooms.map(option => <label key={option.id} className={`tr-room ${roomId === option.id ? "is-selected" : ""}`}><input type="radio" name="preferred-room" value={option.id} checked={roomId === option.id} onChange={() => setRoomId(option.id)} /><span><strong>{option.name}</strong><small>{option.type}</small><p>{option.description}</p></span><span className="tr-room-price">{listedPrice(option.amount)}<small>listed per person</small></span></label>)}</fieldset><p className="tr-small-note">Preference only; no room is held. Confirm current price, bedding and availability with Olivia.</p></details>
        </section>
        <section id="people" className="tr-people tr-scene" aria-labelledby="people-title"><div className="tr-wrap tr-people-layout"><figure className="tr-people-photo" data-tr-reveal><img src="/media/moment-5.webp" alt="Olivia and travelers sharing a moment on a previous Travel & LIV trip" width={1000} height={800} loading="lazy" /><figcaption>A moment with the collective, on a previous trip.</figcaption></figure><div className="tr-people-copy" data-tr-reveal><span className="tr-kicker">YOU DON’T HAVE TO KNOW EVERYONE</span><h2 id="people-title">Just come<br /><em>as you are.</em></h2><p>Olivia is there to welcome you and get the group talking, at your own pace.</p><div className="tr-host"><img src="/media/olivia.webp" alt="Olivia Owen" width={80} height={100} loading="lazy" /><span>Olivia Owen<small>Your host</small></span></div></div></div></section>
        <section className="tr-booking tr-wrap tr-scene" id="booking" ref={booking} aria-labelledby="booking-title"><div className="tr-section-top"><div><span className="tr-kicker">YOUR NEXT CHAPTER</span><h2 id="booking-title">Picture yourself <em>here?</em></h2></div></div><div className="tr-booking-layout"><div className="tr-practical"><span className="tr-kicker">BEFORE YOU GO</span>
          <details className="tr-disclosure"><summary>What’s covered? <Plus size={17} /></summary><ul><li>Four resort nights, with meals and drinks.</li><li>Airport transfers and included activity transport.</li><li>Welcome mixer, adventure day and catamaran.</li><li>Host and private group chat.</li></ul><p>Flights, insurance, personal spending and optional nightlife are extra.</p></details>
          <details className="tr-disclosure"><summary>Getting there & back <Plus size={17} /></summary><p>Airport transfers are included. Ask Olivia for the arrival airport and transfer windows before arranging flights.</p></details>
          <details className="tr-disclosure"><summary>Coming solo or with a friend? <Plus size={17} /></summary><p>This departure is for singles. Choose roommate matching, a shared room with a friend, or a private room.</p><p>The bring-a-friend room has one shared bed. Confirm bedding for roommate matching before paying.</p></details>
          <details className="tr-disclosure"><summary>Payments & cancellations <Plus size={17} /></summary><p>WeTravel currently lists a $500 deposit. Confirm the currency, payment schedule, fees and cancellation terms for your departure before paying.</p><p>Do not assume payments are refundable. Ask Olivia for the applicable terms and confirm passport and entry requirements for your nationality.</p></details>
          <a className="tr-text-link tr-question" href={askAbout(trip.name)}>Ask Olivia a question <ArrowUpRight size={16} /></a>
        </div><div className="tr-booking-card"><span className="tr-kicker">PUNTA CANA · SINGLES ESCAPE</span><h3>Let’s get the<br /><em>details right.</em></h3><div className="tr-date-notice"><strong>Confirm your departure first</strong><p>WeTravel lists {pack.providerDates}. Earlier trip information lists {pack.websiteDates}. Ask Olivia which dates apply before booking.</p></div><label className="tr-select-label" htmlFor="booking-room">Your preferred room</label><select id="booking-room" value={roomId} onChange={e => setRoomId(e.target.value)}>{pack.rooms.map(option => <option key={option.id} value={option.id}>{option.name} — {listedPrice(option.amount)}</option>)}</select><div className="tr-price-summary" aria-live="polite" aria-atomic="true"><strong>{listedPrice(room.amount)}</strong><span>Listed per person<br />{room.type}</span></div><a className="tr-button" href={askAbout(`${trip.name} dates and ${room.type.toLowerCase()}`)}>Confirm with Olivia <ArrowUpRight size={16} /></a><a className="tr-provider-link" href={pack.providerSource} target="_blank" rel="noreferrer">View current WeTravel listing <ArrowUpRight size={14} /><span className="tr-sr-only"> (opens in a new tab)</span></a><p className="tr-small-note">Flights extra. Prices and room preference are not a reservation; confirm currency, fees and terms before paying.</p></div></div></section>
      </> : <section className="tr-preview-close tr-wrap tr-scene" id="next-departure" aria-labelledby="preview-title"><figure data-tr-reveal><img src="/media/olivia.webp" alt="Olivia Owen, Travel & LIV founder" width={400} height={500} loading="lazy" /><figcaption>Your host, Olivia.</figcaption></figure><div data-tr-reveal><span className="tr-kicker">THIS ONE IS STILL TAKING SHAPE</span><h2 id="preview-title">Something to<br /><em>look forward to.</em></h2><p>Dates, stays and prices for {trip.name} are still to come. Ask Olivia about the next departure.</p><a className="tr-button" href={askAbout(trip.name)}>Ask about {trip.name} <ArrowUpRight size={17} /></a><Link className="tr-text-link" href="/trips">Explore all destinations <ArrowRight size={16} /></Link></div></section>}
      <aside className="tr-related tr-wrap" aria-label="Other destinations"><span className="tr-kicker">OR SOMEWHERE ELSE?</span>{trips.filter(item => item.slug !== trip.slug).slice(0, 2).map(item => <Link href={`/trips/${item.slug}`} key={item.slug}><img src={item.image} alt="" loading="lazy" width={90} height={70} /><span>{item.name}<small>{item.region}</small></span><ArrowUpRight size={18} /></Link>)}</aside>
    </main><TripFooter />{full && showDock && <a className="tr-mobile-dock" href="#booking"><span>From {listedPrice(startingPrice)}<small>Dates being confirmed</small></span><span>Dates & rooms <ArrowUpRight size={16} /></span></a>}
  </TripMotion>;
}
