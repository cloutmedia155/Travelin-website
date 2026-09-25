"use client";

import { useEffect, useRef, useState } from "react";
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
          <button className="about-header-watch" onClick={() => setWatch(true)} aria-label="Watch the experience film">
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
                alt="Olivia and travelers enjoying a candid moment together on a Travel & LIV trip"
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

        {/* Section 2: Olivia — how it started */}
        <section id="the-story" className="about-story" aria-labelledby="story-heading">
          <div className="about-story-wrap wrap">
            <div className="about-story-media" data-about-reveal>
              <figure className="about-portrait-card">
                <img src="/media/olivia.webp" alt="Olivia Owen, founder and host of Travel & LIV Collective" loading="lazy" />
                <figcaption>Olivia Owen / Founder & Host</figcaption>
              </figure>
              <figure className="about-group-snap" aria-hidden="true">
                <img src="/media/moment-2.webp" alt="Travel & LIV travelers sharing an afternoon together" loading="lazy" />
                <figcaption>A few more people to go with.</figcaption>
              </figure>
            </div>

            <div className="about-story-content" data-about-reveal>
              <span className="about-label">HOW IT STARTED</span>
              <h2 id="story-heading">
                She wanted to see the world.<br />
                <em>Finding people to go with wasn’t always a given.</em>
              </h2>
              <div className="about-story-prose">
                <p>
                  Olivia started traveling solo because she didn’t want to wait around for friends’ schedules to align. But wanting to explore and finding people who are genuinely up for it are two very different things.
                </p>
                <p>
                  Travel & LIV began with that simple problem: take the stress out of the planning, choose stays you actually want to spend time in, and bring together people who are easy to talk to. Today, she plans every itinerary and personally hosts every single departure.
                </p>
              </div>
              <div className="about-story-badges">
                <span className="about-badge">Personally hosted</span>
                <span className="about-badge">80%+ solo travelers</span>
                <span className="about-badge">4–5-star stays</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How that becomes a trip */}
        <section className="about-approach" aria-labelledby="approach-heading">
          <div className="about-approach-intro wrap" data-about-reveal>
            <span className="about-label">THE TRIP APPROACH</span>
            <h2 id="approach-heading">
              Three decisions behind<br />
              <em>every itinerary.</em>
            </h2>
            <p>
              We built Travel & LIV around what actually makes group travel feel effortless: high standards for where you sleep, balanced days, and someone there to break the ice.
            </p>
          </div>

          <div className="about-approach-flow wrap">
            {/* Beat 1: The Stay */}
            <article className="about-flow-item flow-left" data-about-reveal>
              <figure className="about-flow-photo">
                <div className="about-flow-window">
                  <img src="/media/villa-pool.webp" alt="Private luxury villa pool at sunset" loading="lazy" />
                </div>
                <figcaption>Room to slow down and settle in.</figcaption>
              </figure>
              <div className="about-flow-text">
                <span className="about-flow-num">DECISION 01</span>
                <h3>4–5-star stays.<br /><em>Somewhere you want to wake up.</em></h3>
                <p>
                  We choose boutique villas, private resorts, and design-led hotels because your room and downtime matter just as much as the excursions. Each trip page lists the exact accommodations before you book.
                </p>
              </div>
            </article>

            {/* Beat 2: The Days */}
            <article className="about-flow-item flow-right" data-about-reveal>
              <figure className="about-flow-photo">
                <div className="about-flow-window">
                  <img src="/media/boat.webp" alt="Travel & LIV group enjoying a private boat day out on the water" loading="lazy" />
                </div>
                <figcaption>A day out on open water.</figcaption>
              </figure>
              <div className="about-flow-text">
                <span className="about-flow-num">DECISION 02</span>
                <h3>Planned, not packed.<br /><em>Time together, time for yourself.</em></h3>
                <p>
                  A thoughtfully curated mix of private boat days, cultural visits, and dinners out — balanced with unhurried mornings and free afternoons to explore or do nothing by the pool.
                </p>
              </div>
            </article>

            {/* Beat 3: The People */}
            <article className="about-flow-item flow-left" data-about-reveal>
              <figure className="about-flow-photo">
                <div className="about-flow-window">
                  <img src="/media/moment-7.webp" alt="Olivia and travelers laughing together on a day out" loading="lazy" />
                </div>
                <figcaption>People who are easy to talk to.</figcaption>
              </figure>
              <div className="about-flow-text">
                <span className="about-flow-num">DECISION 03</span>
                <h3>Personally hosted.<br /><em>From the very first hello.</em></h3>
                <p>
                  Olivia is there on every trip to welcome you at arrival, coordinate with local guides, and make sure everyone feels included. You never have to walk into a room alone.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Section 4: The people who make the collective */}
        <section className="about-community" aria-labelledby="community-heading">
          <div className="about-community-intro wrap" data-about-reveal>
            <span className="about-label">THE COLLECTIVE</span>
            <h2 id="community-heading">
              You don’t need a group.<br />
              <em>You just need to show up.</em>
            </h2>
            <p>
              Most travelers book solo. Friends, siblings, and couples join our general departures too. You’ll find professionals, creatives, and entrepreneurs in their mid-20s to early 40s who simply love beautiful places and good conversation.
            </p>
          </div>

          <div className="about-community-grid wrap">
            <figure className="about-community-card" data-about-reveal>
              <div className="about-community-image">
                <img src="/media/moment-1.webp" alt="Travel & LIV guests sharing dinner around a warm table" loading="lazy" />
              </div>
              <figcaption>
                <span className="community-tag">COMING SOLO</span>
                <h3>A seat at the table</h3>
                <p>“I was nervous about coming on my own. Within two hours of arriving, we were all laughing over dinner like old friends.”</p>
                <small>— Traveler reflection</small>
              </figcaption>
            </figure>

            <figure className="about-community-card" data-about-reveal>
              <div className="about-community-image">
                <img src="/media/moment-8.webp" alt="Travelers enjoying a panoramic view of the destination together" loading="lazy" />
              </div>
              <figcaption>
                <span className="community-tag">INTIMATE GROUPS</span>
                <h3>10–18 travelers, max</h3>
                <p>Small enough that you actually get to know everyone by name. Spacious enough that you never feel herded like a tour bus.</p>
                <small>— Intentional group cap</small>
              </figcaption>
            </figure>

            <figure className="about-community-card" data-about-reveal>
              <div className="about-community-image">
                <img src="/media/moment-3.webp" alt="A relaxed evening conversation with group members" loading="lazy" />
              </div>
              <figcaption>
                <span className="community-tag">YOUR OWN PACE</span>
                <h3>Room to do your thing</h3>
                <p>Join the evening drinks or take a quiet night in. No roll calls, no mandatory participation, and zero pressure to perform.</p>
                <small>— Freedom on your terms</small>
              </figcaption>
            </figure>
          </div>

          <div className="about-community-footnote wrap" data-about-reveal>
            <p>
              * Some departures (such as our singles trips or adults-only retreats) carry specific eligibility guidelines, noted clearly on each trip page.
            </p>
          </div>
        </section>

        {/* Section 5: The people behind your plans */}
        <section className="about-organization" aria-labelledby="org-heading">
          <div className="about-org-stage wrap">
            <div className="about-org-visual" data-about-reveal>
              <figure className="about-org-photo">
                <img src="/media/moment-6.webp" alt="Olivia and local partners organizing the day out for travelers" loading="lazy" />
                <figcaption>On-the-ground support with local partners and private transfers.</figcaption>
              </figure>
              <div className="about-org-card">
                <span className="org-card-title">Clear, upfront details</span>
                <p>Every trip page outlines accommodations, included meals, and activity schedules before you place a deposit.</p>
                <Link href="/#questions" className="text-link">
                  Read booking FAQs <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            <div className="about-org-content" data-about-reveal>
              <span className="about-label">PRACTICAL CARE</span>
              <h2 id="org-heading">
                The organization<br />
                <em>behind the experience.</em>
              </h2>
              <p className="about-org-lead">
                Effortless travel requires obsessive preparation. We manage the logistics so you can stay entirely in the moment.
              </p>

              <div className="about-org-rows">
                <div className="about-org-row">
                  <div className="org-row-head">
                    <span className="org-row-num">01</span>
                    <h4>Pre-Departure Guidance</h4>
                  </div>
                  <p>
                    Clear flight arrival windows, entry requirement reminders, and packing advice. A private trip group chat opens weeks before departure so you can meet fellow travelers early.
                  </p>
                </div>

                <div className="about-org-row">
                  <div className="org-row-head">
                    <span className="org-row-num">02</span>
                    <h4>On-the-Ground Coordination</h4>
                  </div>
                  <p>
                    Olivia works directly with vetted local drivers, boutique hotel staff, and excursion guides. If weather or schedules shift, it’s handled quietly behind the scenes.
                  </p>
                </div>

                <div className="about-org-row">
                  <div className="org-row-head">
                    <span className="org-row-num">03</span>
                    <h4>Transparent Inclusions</h4>
                  </div>
                  <p>
                    Accommodations, scheduled excursions, designated transfers, and key group dinners are built into your package. Flight recommendations and personal downtime expenses stay clear.
                  </p>
                </div>

                <div className="about-org-row">
                  <div className="org-row-head">
                    <span className="org-row-num">04</span>
                    <h4>Safety & Code of Conduct</h4>
                  </div>
                  <p>
                    We partner with reputable local operators. Mutual respect is non-negotiable — every guest is supported so the group remains a welcoming space for all.
                  </p>
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
                Find Your Trip <ArrowUpRight size={18} />
              </Link>
              <a className="about-question" href="mailto:Info@travelnliv.com">
                Ask Olivia a question <ArrowUpRight size={14} />
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
