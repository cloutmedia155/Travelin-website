"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useAboutMotion } from "./use-about-motion";

const filmUrl = "https://www.travelnliv.com/travelnliv_who.mp4";

function AboutWordmark({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`wordmark ${footer ? "wordmark-footer" : ""}`} href="/" aria-label="Travel and LIV Collective home">
      <span>TRAVEL <i>&</i> LIV</span>
      <small>C O L L E C T I V E</small>
    </Link>
  );
}

export function AboutExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [watch, setWatch] = useState(false);
  const [filmError, setFilmError] = useState(false);
  useAboutMotion(root);

  return (
    <div className="about-page" ref={root}>
      <a className="skip-link" href="#the-story">Skip to our story</a>

      {/* Header */}
      <header className="about-header">
        <nav aria-label="Main navigation">
          <Link href="/" className="about-home-link">
            <ArrowLeft size={14} />
            <span>Home</span>
          </Link>
          <Link href="/about" aria-current="page" className="about-current">Our story</Link>
        </nav>
        <AboutWordmark />
        <div className="about-header-actions">
          <button className="about-header-watch" onClick={() => setWatch(true)} aria-label="Watch experience film">
            <Play size={13} fill="currentColor" />
            <span>Watch film</span>
          </button>
          <Link className="about-header-trip" href="/#trips">
            Find your trip <ArrowUpRight size={15} />
          </Link>
        </div>
      </header>

      <main id="main-content">
        {/* Section 1: The company — opening */}
        <section className="about-opening" aria-labelledby="about-title">
          <div className="about-opening-stage">
            <div className="about-opening-frame">
              <img
                className="about-opening-image"
                src="/media/moment-5.webp"
                alt="Olivia and travelers enjoying a candid moment on a Travel & LIV trip"
                fetchPriority="high"
              />
              <div className="about-opening-shade" />
            </div>

            <div className="about-opening-copy">
              <span className="about-label">TRAVEL & LIV COLLECTIVE</span>
              <h1 id="about-title">
                <span className="about-line-mask"><span>Curated group trips.</span></span>
                <span className="about-line-mask"><em>Personally hosted.</em></span>
              </h1>
              <p>
                International group travel designed for connection, 4–5-star stays, and effortless days. Olivia plans every detail — and comes on every trip to host.
              </p>
            </div>

            <a className="about-scroll-cue" href="#the-story">
              SCROLL TO EXPLORE <ArrowDown size={15} />
            </a>

            <div className="about-opening-bridge" aria-hidden="true">
              <span className="about-label">OLIVIA OWEN · FOUNDER & HOST</span>
              <p>
                The planning.<br />
                The first hello.<br />
                <em>She’s there for both.</em>
              </p>
            </div>

            <span className="about-opening-caption" aria-hidden="true">
              A moment with the collective.
            </span>
          </div>
        </section>

        {/* Section 2: Olivia — how it started (Concise, visual-first) */}
        <section id="the-story" className="about-story" aria-labelledby="story-heading">
          <div className="about-story-wrap wrap">
            <div className="about-story-media" data-about-reveal>
              <figure className="about-portrait-card">
                <div className="about-portrait-window">
                  <img src="/media/olivia.webp" alt="Olivia Owen, founder and host" loading="lazy" />
                </div>
                <figcaption>Olivia Owen / Founder & Host</figcaption>
              </figure>
              <figure className="about-group-snap" aria-hidden="true">
                <img src="/media/moment-2.webp" alt="Travelers sharing an afternoon together" loading="lazy" />
                <figcaption>From traveling solo to bringing people together.</figcaption>
              </figure>
            </div>

            <div className="about-story-content" data-about-reveal>
              <span className="about-label">HOW IT STARTED</span>
              <h2 id="story-heading">
                She wanted to travel.<br />
                <em>Finding people to go with wasn’t a given.</em>
              </h2>
              <p className="about-lead">
                Olivia started traveling solo because she didn’t want to wait on anyone. But wanting to go and having people who are genuinely up for it are two different things.
              </p>
              <p className="about-sub">
                Travel & LIV began right there: take the stress out of the planning, choose stays worth traveling for, and bring together people who are easy to talk to.
              </p>

              <div className="about-badges">
                <div className="about-badge-item">
                  <strong>Personally hosted</strong>
                  <span>On every departure</span>
                </div>
                <div className="about-badge-item">
                  <strong>80%+ join solo</strong>
                  <span>Nobody arrives knowing everyone</span>
                </div>
                <div className="about-badge-item">
                  <strong>4–5-star stays</strong>
                  <span>Private villas & boutique hotels</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How that becomes a trip (The 3 Chapter Stelae) */}
        <section className="about-approach" aria-labelledby="approach-heading">
          <div className="about-approach-intro wrap" data-about-reveal>
            <span className="about-label">THE TRIP APPROACH</span>
            <h2 id="approach-heading">
              Three decisions behind<br />
              <em>every itinerary.</em>
            </h2>
          </div>

          <div className="about-approach-flow wrap">
            {/* Stela 01: The Stay */}
            <article className="about-stela stela-left" data-about-reveal>
              <figure className="about-stela-photo">
                <div className="about-stela-window">
                  <img src="/media/villa-pool.webp" alt="Private luxury villa pool at sunset" loading="lazy" />
                </div>
                <figcaption>Private villas & boutique resorts.</figcaption>
              </figure>
              <div className="about-stela-copy">
                <span className="about-stela-tag">01 / THE STAY</span>
                <h3>Somewhere you want<br /><em>to wake up.</em></h3>
                <p>4–5-star boutique villas and design-led stays. Confirmed before you book.</p>
                <div className="about-stela-pill">Private rooms or shared matching</div>
              </div>
            </article>

            {/* Stela 02: The Days */}
            <article className="about-stela stela-right" data-about-reveal>
              <figure className="about-stela-photo">
                <div className="about-stela-window">
                  <img src="/media/boat.webp" alt="Private boat day on open waters" loading="lazy" />
                </div>
                <figcaption>Planned days out, unhurried afternoons.</figcaption>
              </figure>
              <div className="about-stela-copy">
                <span className="about-stela-tag">02 / THE DAYS</span>
                <h3>Time together.<br /><em>Time for yourself.</em></h3>
                <p>Curated boat days and group dinners — with space to do your own thing.</p>
                <div className="about-stela-pill">No forced schedules or roll calls</div>
              </div>
            </article>

            {/* Stela 03: The Host */}
            <article className="about-stela stela-left" data-about-reveal>
              <figure className="about-stela-photo">
                <div className="about-stela-window">
                  <img src="/media/moment-7.webp" alt="Olivia and travelers laughing together on a day out" loading="lazy" />
                </div>
                <figcaption>Someone there to break the ice.</figcaption>
              </figure>
              <div className="about-stela-copy">
                <span className="about-stela-tag">03 / THE HOST</span>
                <h3>Personally hosted.<br /><em>From the first hello.</em></h3>
                <p>Olivia is there on every trip so you never have to walk into a room alone.</p>
                <div className="about-stela-pill">Airport welcome to farewell dinner</div>
              </div>
            </article>
          </div>
        </section>

        {/* Section 4: The Collective (Staggered visual triptych) */}
        <section className="about-community" aria-labelledby="community-heading">
          <div className="about-community-intro wrap" data-about-reveal>
            <span className="about-label">THE COLLECTIVE</span>
            <h2 id="community-heading">
              You don’t need a group.<br />
              <em>Just show up.</em>
            </h2>
            <p className="about-community-sub">
              Most guests book solo. Friends and couples welcome too.
            </p>
          </div>

          <div className="about-triptych wrap">
            <figure className="about-card card-lift-1" data-about-reveal>
              <div className="about-card-window">
                <img src="/media/moment-1.webp" alt="Travel & LIV travelers sharing dinner around a warm table" loading="lazy" />
              </div>
              <figcaption>
                <span className="card-tag">SOLO TRAVEL</span>
                <h3>A seat at the table</h3>
                <p className="card-quote">“Within two hours of arriving, we were all laughing over dinner like old friends.”</p>
              </figcaption>
            </figure>

            <figure className="about-card card-lift-2" data-about-reveal>
              <div className="about-card-window">
                <img src="/media/moment-8.webp" alt="Travelers enjoying a panoramic view of the destination together" loading="lazy" />
              </div>
              <figcaption>
                <span className="card-tag">INTIMATE GROUPS</span>
                <h3>10–18, max</h3>
                <p className="card-caption">Small enough to actually know everyone. No crowded tour buses.</p>
              </figcaption>
            </figure>

            <figure className="about-card card-lift-3" data-about-reveal>
              <div className="about-card-window">
                <img src="/media/moment-3.webp" alt="A relaxed evening conversation with group members" loading="lazy" />
              </div>
              <figcaption>
                <span className="card-tag">YOUR OWN PACE</span>
                <h3>Zero pressure</h3>
                <p className="card-caption">Join the drinks or have a quiet night by the pool. Entirely your call.</p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Section 5: Practical Care & Organization (Clean architectural ledger) */}
        <section className="about-organization" aria-labelledby="org-heading">
          <div className="about-org-stage wrap">
            <div className="about-org-visual" data-about-reveal>
              <figure className="about-org-frame">
                <div className="about-org-window">
                  <img src="/media/moment-6.webp" alt="Olivia and local partners organizing the day out" loading="lazy" />
                </div>
                <figcaption>On-the-ground support with vetted local partners.</figcaption>
              </figure>
              <div className="about-org-stat-box">
                <span className="stat-label">UPFRONT DETAILS</span>
                <p>Exact hotels, itinerary timings, and inclusions confirmed before you pay.</p>
                <Link href="/#questions" className="text-link">
                  Booking FAQs <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            <div className="about-org-content" data-about-reveal>
              <span className="about-label">PRACTICAL CARE</span>
              <h2 id="org-heading">
                The details,<br />
                <em>handled quietly.</em>
              </h2>

              <div className="about-ledger">
                <div className="ledger-row">
                  <span className="ledger-num">01</span>
                  <div className="ledger-body">
                    <h4>Before you fly</h4>
                    <p>Private group chat opens early. Flight windows and packing guidance included.</p>
                  </div>
                </div>

                <div className="ledger-row">
                  <span className="ledger-num">02</span>
                  <div className="ledger-body">
                    <h4>On the ground</h4>
                    <p>Olivia handles transfers, drivers, and daily coordination quietly in the background.</p>
                  </div>
                </div>

                <div className="ledger-row">
                  <span className="ledger-num">03</span>
                  <div className="ledger-body">
                    <h4>Transparent pricing</h4>
                    <p>4–5-star stays, curated excursions, and key dinners covered. No surprise checkout fees.</p>
                  </div>
                </div>

                <div className="ledger-row">
                  <span className="ledger-num">04</span>
                  <div className="ledger-body">
                    <h4>Safety & respect</h4>
                    <p>Vetted local guides. A welcoming, respectful space for everyone.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: The invitation */}
        <section className="about-invitation" aria-labelledby="invitation-title">
          <div className="about-invitation-pictures" aria-hidden="true">
            <figure className="about-memory memory-left">
              <img src="/media/moment-4.webp" alt="" loading="lazy" />
            </figure>
            <figure className="about-memory memory-right">
              <img src="/media/moment-8.webp" alt="" loading="lazy" />
            </figure>
          </div>

          <div className="about-invitation-copy" data-about-reveal>
            <span className="about-label">THERE’S MORE TO COME</span>
            <h2 id="invitation-title">
              Come meet us<br />
              <em>somewhere new.</em>
            </h2>
            <div className="about-invitation-actions">
              <Link className="button button-dark" href="/#trips">
                Find Your Trip <ArrowUpRight size={17} />
              </Link>
              <a className="about-question" href="mailto:Info@travelnliv.com">
                Ask Olivia a question <ArrowUpRight size={13} />
              </a>
            </div>
            <p className="about-signature">
              See you out there,<br />
              <em>Olivia</em>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="about-footer wrap">
        <AboutWordmark footer />
        <nav aria-label="Footer navigation">
          <Link href="/#trips">The trips</Link>
          <Link href="/about" aria-current="page">Our story</Link>
          <Link href="/#questions">Your questions</Link>
          <a href="https://www.instagram.com/travelnlivcollective" target="_blank" rel="noreferrer">
            Follow the moments <ArrowUpRight size={13} />
          </a>
        </nav>
        <div className="about-footer-bottom">
          <span>© {new Date().getFullYear()} Travel & LIV Collective</span>
          <a href="mailto:Info@travelnliv.com">Info@travelnliv.com</a>
        </div>
      </footer>

      {/* Film modal */}
      <Dialog open={watch} onOpenChange={setWatch}>
        <DialogContent className="experience-dialog about-dialog">
          <DialogTitle>A moment with Travel & LIV</DialogTitle>
          <DialogDescription>Olivia and the group, in their own element.</DialogDescription>
          {watch && (
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              src={filmUrl}
              poster="/media/moment-5.webp"
              onError={() => setFilmError(true)}
            />
          )}
          {filmError && (
            <p className="about-film-error">
              The film couldn’t load. <a href={filmUrl} target="_blank" rel="noreferrer">Open the video directly <ArrowUpRight size={14} /></a>
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
