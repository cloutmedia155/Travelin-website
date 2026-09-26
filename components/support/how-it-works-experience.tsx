"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { FlowerSymbol } from "@/components/home/flower-symbol";
import { SupportFooter, SupportHeader } from "./support-shell";
import { useHowItWorksMotion } from "./use-how-it-works-motion";

const processSteps = [
  {
    number: "01",
    label: "FIND YOUR TRIP",
    title: "Choose what fits.",
    text: "Check the dates, itinerary, room choices, inclusions and total cost on the trip page.",
  },
  {
    number: "02",
    label: "BOOK YOUR PLACE",
    title: "Make it official.",
    text: "Choose the room type, accept the traveler terms and pay the required amount. Your place is secured only after the booking platform confirms payment.",
  },
  {
    number: "03",
    label: "GET READY",
    title: "Know before you fly.",
    text: "After confirmation, you’ll receive instructions for the private trip chat. Wait for written trip confirmation and flight guidance before booking nonrefundable flights.",
  },
  {
    number: "04",
    label: "ARRIVE",
    title: "Turn up with a plan.",
    text: "Use the confirmed arrival window and trip instructions. Airport transfers are included only when your trip page or itinerary says so.",
  },
];

export function HowItWorksExperience() {
  const root = useRef<HTMLDivElement>(null);
  useHowItWorksMotion(root);

  return (
    <div className="support-page hiw-page" ref={root}>
      <a className="skip-link" href="#the-steps">Skip to the steps</a>
      <SupportHeader current="how-it-works" />

      <main>
        <section className="hiw-opening support-wrap" aria-labelledby="hiw-title">
          <div className="hiw-opening-copy">
            <span className="support-label">HOW IT WORKS</span>
            <h1 id="hiw-title">
              <span className="support-line-mask"><span data-hiw-title>From “maybe”</span></span>
              <span className="support-line-mask"><em data-hiw-title>to meeting everyone.</em></span>
            </h1>
            <p>Choose a trip, secure your place, get the information you need, then meet the group.</p>
            <div className="hiw-opening-actions">
              <Link className="support-button support-button-dark" href="/trips">
                Explore trips <ArrowUpRight size={16} />
              </Link>
              <a className="support-text-link" href="#the-steps">
                How booking works <ArrowDown size={15} />
              </a>
            </div>
          </div>

          <figure className="hiw-opening-frame">
            <img src="/media/moment-5.webp" alt="Olivia with travelers during a previous Travel & LIV group trip" fetchPriority="high" />
            <figcaption>A moment with the collective.</figcaption>
          </figure>

          <nav className="hiw-jump-links" aria-label="How it works sections">
            <a href="#the-steps">The steps</a>
            <a href="#coming-solo">Coming solo</a>
            <a href="#before-you-book">Before you book</a>
          </nav>
        </section>

        <section className="hiw-journey" id="the-steps" aria-labelledby="steps-title">
          <div className="support-wrap">
            <div className="hiw-journey-heading" data-hiw-reveal>
              <span className="support-label">ONE CONNECTED JOURNEY</span>
              <h2 id="steps-title">What happens<br /><em>after you choose.</em></h2>
              <p>Four stages. The exact dates, prices, rooms and inclusions still belong to the trip you pick.</p>
            </div>

            <div className="hiw-journey-visual">
              <svg className="hiw-journey-svg" viewBox="0 0 1200 760" fill="none" aria-hidden="true">
                <defs><FlowerSymbol /></defs>
                <path className="hiw-path-base" d="M95 118 C360 -35 540 150 490 300 C430 475 760 360 895 435 C1095 545 845 715 1110 665" />
                <path className="hiw-path-fill" pathLength="1" d="M95 118 C360 -35 540 150 490 300 C430 475 760 360 895 435 C1095 545 845 715 1110 665" />
                <g className="hiw-blooms">
                  <use data-hiw-bloom="0" href="#vine-flower" x="285" y="93" width="17" height="33" transform="rotate(-24 293 110)" />
                  <use data-hiw-bloom="1" href="#vine-flower" x="505" y="270" width="18" height="35" transform="rotate(34 514 288)" />
                  <use data-hiw-bloom="2" href="#vine-flower" x="783" y="393" width="16" height="31" transform="rotate(-18 791 409)" />
                  <use data-hiw-bloom="3" href="#vine-flower" x="985" y="610" width="19" height="37" transform="rotate(26 994 628)" />
                </g>
              </svg>

              {processSteps.map((step, index) => (
                <article className={`hiw-step hiw-step-${index + 1}`} key={step.number}>
                  <span className="hiw-step-number">{step.number}</span>
                  <div>
                    <span className="support-label">{step.label}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}

              <figure className="hiw-journey-photo hiw-journey-photo-a">
                <img src="/media/moment-7.webp" alt="Travel & LIV travelers laughing together on a previous trip" loading="lazy" />
                <figcaption>Getting to know the group.</figcaption>
              </figure>
              <figure className="hiw-journey-photo hiw-journey-photo-b">
                <img src="/media/moment-8.webp" alt="Travel & LIV travelers sharing a city moment on a previous trip" loading="lazy" />
                <figcaption>The moments around the plan.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="hiw-solo" id="coming-solo" aria-labelledby="solo-title">
          <div className="support-wrap hiw-solo-layout">
            <div className="hiw-solo-pictures" aria-hidden="false">
              <figure className="hiw-solo-photo-main">
                <img src="/media/moment-1.webp" alt="Travel & LIV travelers sharing dinner on a previous trip" loading="lazy" />
                <figcaption>A previous Travel & LIV group dinner.</figcaption>
              </figure>
              <figure className="hiw-solo-photo-small">
                <img src="/media/olivia.webp" alt="Olivia Owen, Travel & LIV founder and host" loading="lazy" />
                <figcaption>Olivia Owen.</figcaption>
              </figure>
            </div>

            <div className="hiw-solo-copy" data-hiw-reveal>
              <span className="support-label">THE HUMAN QUESTION</span>
              <h2 id="solo-title">Coming on<br /><em>your own?</em></h2>
              <p>That can work. Room choices depend on the trip, and some departures offer solo roommate matching.</p>

              <div className="hiw-room-lines" aria-label="Typical room choices">
                <div>
                  <span>01</span>
                  <strong>Your own space</strong>
                  <p>Choose single occupancy when the trip offers it.</p>
                </div>
                <div>
                  <span>02</span>
                  <strong>Share with someone you know</strong>
                  <p>Book the matching room category and list each other as requested roommates.</p>
                </div>
                <div>
                  <span>03</span>
                  <strong>Roommate matching</strong>
                  <p>Available on some trips, generally same-gender and subject to availability. Assignments are usually shared closer to departure.</p>
                </div>
              </div>

              <p className="hiw-host-note">Most hosted trips include a Travel & LIV host, co-host or designated on-the-ground contact for trip-related logistics.</p>
            </div>
          </div>
        </section>

        <section className="hiw-details support-wrap" id="before-you-book" aria-labelledby="details-title">
          <div className="hiw-details-intro" data-hiw-reveal>
            <span className="support-label">BEFORE YOU COMMIT</span>
            <h2 id="details-title">The details should<br /><em>feel clear.</em></h2>
            <p>Trip-specific terms always take priority. These are the company-level rules currently documented.</p>
          </div>

          <div className="hiw-disclosures" data-hiw-reveal>
            <details>
              <summary><span>Payment & confirmation</span><Plus size={18} /></summary>
              <div><p>Your place is secured only after the booking platform confirms the required payment. Payment schedules and financing options vary by trip and checkout.</p></div>
            </details>
            <details>
              <summary><span>Flights & arrival</span><Plus size={18} /></summary>
              <div><p>Wait for written trip confirmation and flight guidance before booking nonrefundable airfare. Airport transfers apply only when the selected trip lists them and may be limited to stated airports or time windows.</p></div>
            </details>
            <details>
              <summary><span>Changes & cancellations</span><Plus size={18} /></summary>
              <div><p>Refunds, credits and transfers follow the terms accepted for your booking. Do not assume a personal cancellation or requested change will be refundable or transferable.</p></div>
            </details>
            <details>
              <summary><span>Support on the ground</span><Plus size={18} /></summary>
              <div><p>Hosted trips include trip-related support, but a host is not a 24-hour concierge, medical professional or emergency service. In an immediate emergency, contact local emergency services first.</p></div>
            </details>
          </div>

          <div className="hiw-details-links" data-hiw-reveal>
            <a className="support-text-link" href="/#questions">Read the current common questions <ArrowUpRight size={14} /></a>
            <Link className="support-text-link" href="/contact?topic=general-question">Ask us directly <ArrowUpRight size={14} /></Link>
          </div>
        </section>

        <section className="hiw-closing" aria-labelledby="hiw-closing-title">
          <div className="hiw-closing-image" aria-hidden="true">
            <img src="/media/moment-4.webp" alt="" loading="lazy" />
          </div>
          <div className="hiw-closing-copy" data-hiw-reveal>
            <span className="support-label">YOUR NEXT MOVE</span>
            <h2 id="hiw-closing-title">Ready to find<br /><em>your dates?</em></h2>
            <div>
              <Link className="support-button support-button-light" href="/trips">Explore trips <ArrowUpRight size={16} /></Link>
              <Link className="hiw-closing-question" href="/contact?topic=choosing-a-trip">Ask a question</Link>
            </div>
          </div>
        </section>
      </main>

      <SupportFooter />
    </div>
  );
}
