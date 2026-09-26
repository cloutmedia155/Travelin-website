"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Play, Plus } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { puntaPackage as pack, listedPrice, askAbout } from "@/lib/trips";
import { TripMotion } from "./trip-motion";
import { TripFooter } from "./trip-shell";

const memories = [
  { day: "DAY 1 · THE FIRST HELLO", title: "Arrive. Exhale.", italic: "Meet everyone.", text: "Settle in, then meet the group at the all-white welcome mixer.", images: ["/media/moment-1.webp", "/media/moment-5.webp", "/media/moment-7.webp"], note: "Moments from previous Travel & LIV trips." },
  { day: "DAY 2 · A LITTLE ADVENTURE", title: "Let the day", italic: "surprise you.", text: "Buggies, ziplining and a Dominican lunch. A few stories already in the making.", images: ["https://www.travelnliv.com/punta/IMG_6315.JPG", "https://cdn.filestackcontent.com/resize=width:900/l9id04XOQaFsFTjJVB45", "https://cdn.filestackcontent.com/resize=width:700/pjQl2hPsSQeRRUdjQDb9"], note: "Adventure imagery from the published trip." },
  { day: "DAY 3 · OUT ON THE WATER", title: "Nowhere to be.", italic: "Except here.", text: "A private catamaran. A snorkeling stop. Lunch with the sea all around you.", images: ["https://www.travelnliv.com/punta/IMG_6311.JPG"], note: "The catamaran experience pictured in the trip listing." },
  { day: "DAYS 4–5 · YOUR OWN PACE", title: "One more swim.", italic: "One more story.", text: "A day for yourself, a farewell dinner, and a little more to take home.", images: ["/media/punta-beach.webp", pack.propertyImage, pack.propertyDetailImage], note: "Punta Cana and the listed resort." },
];

function usePuntaMotion(root: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const page = root.current;
    const match = gsap.matchMedia();
    match.add({ motion: "(prefers-reduced-motion: no-preference) and (min-height: 600px)", mobile: "(max-width: 700px)" }, context => {
      if (!context.conditions?.motion) return;
      const mobile = Boolean(context.conditions.mobile);
      page.classList.add("pc-motion");
      const select = gsap.utils.selector(page);
      const ctx = gsap.context(() => {
        gsap.from(".pc-hero-title > span", { yPercent: 65, autoAlpha: 0, filter: "blur(5px)", duration: 1.8, stagger: .17, ease: "power3.out", clearProps: "all" });
        const opening = gsap.timeline({ scrollTrigger: { trigger: ".pc-opening", start: "top top", end: "bottom bottom", scrub: 1.3 } });
        opening.to(".pc-hero-copy", { y: -65, autoAlpha: 0, duration: .28 }, .06)
          .to(".pc-hero-image", { clipPath: mobile ? "inset(9% 6% 43% 6%)" : "inset(12% 7% 15% 49%)", duration: .58, ease: "power2.inOut" }, .22)
          .to(".pc-hero-shade", { autoAlpha: 0, duration: .4 }, .24)
          .to(".pc-hero-facts", { autoAlpha: 0, y: 20, duration: .15 }, .1)
          .fromTo(".pc-bridge", { y: 35, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .28 }, .65);
        const panels = select(".pc-memory") as HTMLElement[];
        const timeline = gsap.timeline({ scrollTrigger: { trigger: ".pc-memories", start: "top top", end: "bottom bottom", scrub: 1.15,
          onUpdate: self => panels.forEach((panel, index) => panel.setAttribute("aria-hidden", String(index !== Math.min(3, Math.floor(self.progress * 4))))) } });
        panels.forEach((panel, index) => {
          const photos = panel.querySelectorAll(".pc-memory-photo");
          const copy = panel.querySelector(".pc-memory-copy");
          const note = panel.querySelector(".pc-memory-note");
          const start = index * 2.5;
          if (index > 0) {
            gsap.set(panel, { autoAlpha: 0 });
            timeline.set(panel, { autoAlpha: 1 }, start - .4)
              .fromTo(photos, { x: mobile ? -70 : -220, y: 60, rotation: -5, autoAlpha: 0 }, { x: 0, y: 0, rotation: 0, autoAlpha: 1, duration: .8, stagger: .1, ease: "power2.out" }, start - .35)
              .fromTo(copy, { y: 32, autoAlpha: 0, filter: "blur(4px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: .65 }, start - .12);
          }
          timeline.to(photos, { y: (i: number) => i % 2 ? -16 : -35, duration: 1.2, ease: "none" }, start + .4);
          if (index === 2) timeline.to(photos, { width: "100%", left: "0%", height: mobile ? "55%" : "61%", rotation: 0, duration: .8, ease: "power2.inOut" }, start + .55);
          if (index < 3) timeline.to([copy, note], { autoAlpha: 0, y: -22, duration: .4 }, start + 1.7)
            .to(photos, { x: mobile ? 90 : 240, y: -70, autoAlpha: 0, rotation: 4, duration: .65, stagger: .08 }, start + 1.7)
            .set(panel, { autoAlpha: 0 }, start + 2.45);
        });
        timeline.to({}, { duration: .3 });
        gsap.fromTo(".pc-stay-main", { clipPath: "inset(9% 7% 5% 7%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".pc-stay", start: "top 85%", end: "top 15%", scrub: 1.1 } });
        gsap.fromTo(".pc-stay-detail", { y: 65, rotation: -9 }, { y: 0, rotation: -4, ease: "none", scrollTrigger: { trigger: ".pc-stay", start: "top 80%", end: "bottom 80%", scrub: 1.2 } });
        gsap.fromTo(".pc-group-frame", { clipPath: mobile ? "inset(12% 5% 12% 5%)" : "inset(14% 17% 12% 17%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".pc-group", start: "top 90%", end: "top top", scrub: 1.15 } });
        const clouds = gsap.timeline({ scrollTrigger: { trigger: ".pc-group", start: "top top", end: "bottom bottom", scrub: 1.2 } });
        clouds.to(".pc-group-copy, .pc-group-credit", { autoAlpha: 0, y: -30, duration: .25 }, .3)
          .fromTo(".pc-cloud-back", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .5 }, .4)
          .fromTo(".pc-cloud-front", { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .4 }, .5)
          .fromTo(".pc-cloud-floor", { yPercent: 100 }, { yPercent: 0, duration: .3 }, .65);
        gsap.from(".pc-invitation-photo", { y: 65, autoAlpha: 0, duration: 1.6, stagger: .2, ease: "power3.out", scrollTrigger: { trigger: ".pc-invitation", start: "top 85%", once: true } });
      }, page);
      return () => { ctx.revert(); page.classList.remove("pc-motion"); page.querySelectorAll(".pc-memory").forEach(panel => panel.removeAttribute("aria-hidden")); };
    }, page);
    return () => match.revert();
  }, [root]);
}

export function PuntaExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [roomId, setRoomId] = useState(pack.rooms[0].id);
  const [watch, setWatch] = useState(false);
  const room = pack.rooms.find(r => r.id === roomId)!;
  usePuntaMotion(root);
  return <TripMotion><div ref={root} className="pc-page">
    <a className="skip-link" href="#itinerary">Skip to the itinerary</a>
    <header className="pc-header"><Link href="/trips" className="pc-all-trips">← All trips</Link><Link href="/" className="wordmark" aria-label="Travel and LIV home"><span>TRAVEL <i>&</i> LIV</span><small>C O L L E C T I V E</small></Link><a href="#booking">Dates & rooms <ArrowUpRight size={14} /></a></header>
    <main>
      <section className="pc-opening" aria-labelledby="pc-title"><div className="pc-opening-stage">
        <div className="pc-hero-image"><img src="/media/punta-beach.webp" alt="The palm-lined coast of Punta Cana" width={1600} height={1000} fetchPriority="high" /><div className="pc-hero-shade" /></div>
        <div className="pc-hero-copy"><span className="pc-label">DOMINICAN REPUBLIC · SINGLES ESCAPE</span><h1 id="pc-title" className="pc-hero-title"><span>Punta Cana.</span><span>Good company.</span><span><em>Caribbean time.</em></span></h1><a href="#itinerary" className="pc-explore">STEP INTO THE DAYS <ArrowDown size={16} /></a></div>
        <div className="pc-hero-facts"><span>Dates being confirmed</span><span>5 days / 4 nights</span><a href="#booking">From {listedPrice(pack.rooms[0].amount)} per person <ArrowUpRight size={14} /><small>Singles only · Flights extra</small></a></div>
        <div className="pc-bridge"><span className="pc-label">A FEW DAYS AWAY</span><p>Less figuring it out.<br /><em>More being here.</em></p><span>The days are planned.<br />There’s room to make them yours.</span></div>
      </div></section>
      <nav className="pc-nav" aria-label="Trip sections"><a href="#itinerary">The days</a><a href="#stay">The stay</a><a href="#people">The people</a><a href="#booking">Dates & rooms ↗</a></nav>
      <section className="pc-memories" id="itinerary" aria-label="The days in Punta Cana"><div className="pc-memory-stage">{memories.map((memory, i) => <article className={`pc-memory pc-memory-${i}`} key={memory.day} aria-labelledby={`memory-title-${i}`}><div className="pc-memory-copy"><span className="pc-label">{memory.day}</span><h2 id={`memory-title-${i}`}>{memory.title}<br /><em>{memory.italic}</em></h2><p>{memory.text}</p></div><div className="pc-memory-images">{memory.images.map((image, j) => <figure className={`pc-memory-photo pc-photo-${j}`} key={image}><img src={image} alt={i === 0 ? "A candid moment from a previous Travel & LIV trip" : `${memory.day.split(" · ")[1]} — photo ${j + 1} from the destination or published package`} width={800} height={700} loading="lazy" /></figure>)}</div><span className="pc-memory-note">{memory.note}</span><span className="pc-memory-count" aria-hidden="true">0{i + 1}<i> / 04</i></span></article>)}</div></section>
      <div className="pc-itinerary tr-wrap"><details className="tr-disclosure"><summary>Open the full day-by-day itinerary <Plus size={17} /></summary><ol className="tr-day-list">{pack.itinerary.map(([day,title,text])=><li key={day}><span className="tr-kicker">{day}</span><div><h4>{title}</h4><p>{text}</p></div></li>)}</ol><p className="tr-small-note">Published package outline. Confirm departure dates and final arrangements with Olivia.</p></details></div>
      <section className="pc-stay tr-wrap" id="stay" aria-labelledby="pc-stay-title"><div className="pc-stay-images"><figure className="pc-stay-main"><img src={pack.propertyImage} alt="Excellence Punta Cana, as pictured in the accommodation listing" width={1200} height={800} loading="lazy" /></figure><figure className="pc-stay-detail"><img src={pack.propertyDetailImage} alt="A second view of the listed Excellence Punta Cana resort" width={500} height={650} loading="lazy" /><figcaption>A little room to unwind.</figcaption></figure><span className="pc-stay-margin">SLOW MORNINGS LOOK GOOD ON YOU.</span></div><div className="pc-stay-bottom"><div><span className="pc-label">EXCELLENCE PUNTA CANA</span><h2 id="pc-stay-title">Somewhere to<br /><em>come back to.</em></h2></div><div><p>An adults-only, all-inclusive stay.<br />The beach close. The day still yours.</p><span className="pc-stay-facts">4 nights · Resort meals & drinks</span><a className="tr-text-link" href="#room-options">Find your room <ArrowUpRight size={16} /></a></div></div>
        <details className="tr-disclosure" id="room-options"><summary>Compare room options <Plus size={17} /></summary><fieldset className="tr-rooms"><legend className="tr-sr-only">Your preferred room</legend>{pack.rooms.map(option=><label className={`tr-room ${roomId===option.id?"is-selected":""}`} key={option.id}><input type="radio" name="pc-room" checked={roomId===option.id} onChange={()=>setRoomId(option.id)} value={option.id}/><span><strong>{option.name}</strong><small>{option.type}</small><p>{option.description}</p></span><span className="tr-room-price">{listedPrice(option.amount)}<small>listed per person</small></span></label>)}</fieldset><p className="tr-small-note">Preference only. Confirm bedding, current price and availability before booking.</p></details>
      </section>
      <section className="pc-group" id="people" aria-labelledby="pc-people-title"><div className="pc-group-stage"><div className="pc-group-frame"><img src="/media/moment-5.webp" alt="Olivia and the collective on a previous group trip" width={1600} height={1100} loading="lazy"/><div className="pc-group-shade" /></div><div className="pc-group-copy"><span className="pc-label">YOU DON’T HAVE TO KNOW EVERYONE</span><h2 id="pc-people-title">Just come<br /><em>as you are.</em></h2><button className="pc-watch" onClick={()=>setWatch(true)}><span><Play size={16} fill="currentColor"/></span>Meet the collective</button></div><span className="pc-group-credit">REAL MOMENTS FROM PREVIOUS TRAVEL & LIV TRIPS</span><div className="pc-clouds" aria-hidden="true"><img className="pc-cloud-back" src="/media/atmosphere/cloud-back.png" alt="" loading="lazy"/><img className="pc-cloud-front" src="/media/atmosphere/cloud-front.png" alt="" loading="lazy"/><div className="pc-cloud-floor"/></div></div></section>
      <div className="pc-host tr-wrap"><img src="/media/olivia.webp" alt="Olivia Owen" width={100} height={130} loading="lazy"/><div><p>Olivia is there<br /><em>for the first hello.</em></p><span>YOUR HOST · OLIVIA OWEN</span></div></div>
      <section className="pc-practical tr-wrap" aria-labelledby="pc-practical-title"><div><span className="pc-label">THE LITTLE THINGS, TAKEN CARE OF</span><h2 id="pc-practical-title">Before <em>you go.</em></h2></div><div><details className="tr-disclosure"><summary>What’s included? <Plus size={17}/></summary><p>Four resort nights with meals and drinks, airport transfers, activity transport, welcome mixer, adventure day, catamaran, hosting and the private group chat.</p><p>Flights, insurance, personal spending and optional nightlife are extra.</p></details><details className="tr-disclosure"><summary>Getting there <Plus size={17}/></summary><p>Ask Olivia to confirm the departure dates, arrival airport and transfer windows before arranging flights.</p></details><details className="tr-disclosure"><summary>Sharing a room <Plus size={17}/></summary><p>This is a singles departure. Choose roommate matching, sharing with a friend, or your own room. The friend package has one shared bed.</p></details><details className="tr-disclosure"><summary>Payments & cancellations <Plus size={17}/></summary><p>The published WeTravel listing shows a $500 deposit. Confirm currency, fees, payment schedule and applicable cancellation terms before paying. Do not assume payments are refundable.</p></details></div></section>
      <section className="pc-invitation" id="booking" aria-labelledby="pc-booking-title"><figure className="pc-invitation-photo pc-invite-left" aria-hidden="true"><img src="/media/moment-4.webp" alt="" width={400} height={500} loading="lazy"/></figure><figure className="pc-invitation-photo pc-invite-right" aria-hidden="true"><img src="/media/punta-beach.webp" alt="" width={400} height={500} loading="lazy"/></figure><div className="pc-invitation-center"><span className="pc-label">THERE’S A PLACE FOR YOU IN THIS STORY</span><h2 id="pc-booking-title">Come be<br /><em>part of it.</em></h2><div className="pc-booking-details"><p className="pc-date-check"><strong>Confirm the dates with Olivia.</strong> WeTravel lists {pack.providerDates}; earlier trip information lists {pack.websiteDates}.</p><label htmlFor="pc-room-select">Your preferred room</label><select id="pc-room-select" value={roomId} onChange={e=>setRoomId(e.target.value)}>{pack.rooms.map(option=><option key={option.id} value={option.id}>{option.name}</option>)}</select><div className="pc-price" aria-live="polite"><strong>{listedPrice(room.amount)}</strong><span>Listed per person<br />{room.type}</span></div><a href={askAbout(`Punta Cana dates and ${room.type}`)} className="tr-button">Confirm with Olivia <ArrowUpRight size={17}/></a><a className="pc-provider" href={pack.providerSource} target="_blank" rel="noreferrer">View current WeTravel listing ↗<span className="tr-sr-only"> (opens in a new tab)</span></a><p className="tr-small-note">Flights extra. Room preference is not a reservation. Confirm currency, fees and cancellation terms before paying.</p></div></div></section>
    </main><TripFooter/>
    <Dialog open={watch} onOpenChange={setWatch}><DialogContent className="pc-film-dialog"><DialogTitle>A moment with the collective</DialogTitle><DialogDescription>Olivia and the group on previous trips.</DialogDescription>{watch&&<video controls autoPlay playsInline preload="metadata" src="https://www.travelnliv.com/travelnliv_who.mp4" poster="/media/moment-5.webp"/>}</DialogContent></Dialog>
  </div></TripMotion>;
}
