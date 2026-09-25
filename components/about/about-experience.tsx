"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, Play, Pause } from "lucide-react";
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
  const film = useRef<HTMLVideoElement>(null);
  const [watch, setWatch] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [filmError, setFilmError] = useState(false);
  useAboutMotion(root);

  useEffect(() => {
    const video = film.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (watch || paused || reduced.matches) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!video.getAttribute("src")) video.src = filmUrl;
        void video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [paused, watch]);

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
        {/* Section 1: The Company Opening (Hero) */}
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

        {/* Section 2: Olivia's Story — Editorial Letter & Margin Artifact */}
        <section id="the-story" className="about-editorial-letter" aria-labelledby="letter-title">
          <div className="wrap">
            <div className="editorial-container" data-about-reveal>
              <div className="editorial-content">
                <span className="about-label">WHY WE STARTED</span>
                <h2 id="letter-title">
                  The group chat never<br />
                  <em>left the group chat.</em>
                </h2>
                <div className="editorial-prose">
                  <p className="editorial-lead">
                    Olivia spent her early twenties wanting to see the world. But planning trips with friends always ran into the same wall: conflicting schedules, shifting budgets, and excitement that faded the moment it came time to put a card down.
                  </p>
                  <p>
                    She started traveling solo because she refused to stay home. What she quickly realized was that navigating foreign cities wasn’t the hard part. The hard part was having no one across the dinner table to share the view with.
                  </p>
                  <blockquote className="editorial-pullquote">
                    “Travel & LIV began for anyone who is done waiting on someone else to pack a bag.”
                  </blockquote>
                  <p className="editorial-signoff">
                    Today, she personally plans, vets, and hosts every single departure.
                  </p>
                </div>
              </div>

              <aside className="editorial-aside" aria-hidden="true">
                <figure className="editorial-polaroid">
                  <div className="polaroid-photo">
                    <img src="/media/olivia.webp" alt="Olivia Owen, founder and host" loading="lazy" />
                  </div>
                  <figcaption>Olivia in Positano, where the idea began.</figcaption>
                </figure>
                <span className="editorial-cursive">From the journal</span>
              </aside>
            </div>
          </div>
        </section>

        {/* Section 3: The Trip Standard — Asymmetrical Photographic Installation */}
        <section className="about-installation" aria-labelledby="standard-title">
          <div className="wrap">
            <div className="installation-header" data-about-reveal>
              <span className="about-label">OUR THREE PROMISES</span>
              <h2 id="standard-title">
                Curated without<br />
                <em>the tour bus.</em>
              </h2>
              <p className="installation-intro">
                Three decisions we refuse to compromise on for any departure.
              </p>
            </div>

            <div className="installation-canvas">
              {/* Element 1: Dominant Landscape (Villa Stay) */}
              <article className="canvas-item item-dominant" data-about-reveal>
                <div className="canvas-media aspect-landscape">
                  <img src="/media/villa-pool.webp" alt="Private luxury boutique villa pool at sunset" loading="lazy" />
                </div>
                <div className="canvas-meta">
                  <span className="canvas-num">01 / THE STAY</span>
                  <h3>4–5-Star Boutique Villas & Hotels</h3>
                  <p>Hand-picked properties chosen for design, location, and privacy. You know the exact stay before you put down a deposit.</p>
                </div>
              </article>

              {/* Offset Row with Element 2 (Tall Catamaran) and Element 3 (Host Moment) */}
              <div className="canvas-row">
                <article className="canvas-item item-portrait" data-about-reveal>
                  <div className="canvas-media aspect-portrait">
                    <img src="/media/boat.webp" alt="Catamaran cruising open Mediterranean water" loading="lazy" />
                  </div>
                  <div className="canvas-meta">
                    <span className="canvas-num">02 / THE RHYTHM</span>
                    <h3>Planned, Not Packed</h3>
                    <p>Curated boat days, cultural visits, and private dinners — balanced with unhurried mornings and free afternoons to wander.</p>
                  </div>
                </article>

                <article className="canvas-item item-candid" data-about-reveal>
                  <div className="canvas-media aspect-square">
                    <img src="/media/moment-7.webp" alt="Olivia and travelers laughing together on a day out" loading="lazy" />
                  </div>
                  <div className="canvas-meta">
                    <span className="canvas-num">03 / THE HOST</span>
                    <h3>Olivia on Every Single Trip</h3>
                    <p>From airport greetings to the farewell toast. Someone who knows the local drivers, handles the tables, and makes sure you never feel alone.</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Who Travels With Us — Monumental Typographic Manifesto on Sage */}
        <section className="about-manifesto" aria-labelledby="manifesto-title">
          <div className="wrap">
            <div className="manifesto-statement" data-about-reveal>
              <span className="about-label">WHO TRAVELS WITH US</span>
              <h2 id="manifesto-title">
                80% of our travelers arrive solo.<br />
                <em>None of them leave that way.</em>
              </h2>
              <p className="manifesto-body">
                You don’t need a travel partner to see the world. Most departures are 10 to 18 people who took the leap completely on their own — and by the first evening, were sharing wine like old friends.
              </p>
            </div>

            <div className="manifesto-visual" data-about-reveal>
              <figure className="manifesto-frame">
                <img src="/media/moment-1.webp" alt="Travel & LIV travelers sharing dinner around a warm table" loading="lazy" />
                <figcaption>Dinner at the villa. Evening three.</figcaption>
              </figure>
            </div>

            <div className="manifesto-reassurance" data-about-reveal>
              <div className="reassurance-fact">
                <span className="fact-title">10–18 TRAVELERS MAX</span>
                <p>Small enough to fit around a single dinner table. Big enough to find your people.</p>
              </div>
              <div className="reassurance-fact">
                <span className="fact-title">ALL ARE WELCOME</span>
                <p>While the majority arrive solo, friends, siblings, and couples join our departures too.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: The Operating Ledger — Swiss Architectural Index Lines */}
        <section className="about-ledger" aria-labelledby="ledger-title">
          <div className="wrap">
            <div className="ledger-intro" data-about-reveal>
              <span className="about-label">HOW IT WORKS</span>
              <h2 id="ledger-title">
                Everything taken care of.
              </h2>
              <p className="ledger-subtitle">
                Zero logistical friction. No surprise checkout fees.
              </p>
            </div>

            <div className="ledger-timeline">
              <div className="timeline-row" data-about-reveal>
                <span className="timeline-step">01</span>
                <div className="timeline-phase">WEEKS BEFORE</div>
                <div className="timeline-content">
                  <h4>Private Trip Chat & Flight Windows</h4>
                  <p>A dedicated group opens weeks early. You get exact flight arrival windows, curated packing lists, and meet everyone before you fly.</p>
                </div>
              </div>

              <div className="timeline-row" data-about-reveal>
                <span className="timeline-step">02</span>
                <div className="timeline-phase">ARRIVAL DAY</div>
                <div className="timeline-content">
                  <h4>Airport Pickups & Villa Welcome</h4>
                  <p>Coordinated private transfers take you from arrivals to the villa. Olivia is there at the door to welcome you in person.</p>
                </div>
              </div>

              <div className="timeline-row" data-about-reveal>
                <span className="timeline-step">03</span>
                <div className="timeline-phase">ON THE GROUND</div>
                <div className="timeline-content">
                  <h4>Private Drivers & Reserved Experiences</h4>
                  <p>Local vetted drivers handle every transfer. Catamaran charters, guided excursions, and group dinners are fully hosted and managed.</p>
                </div>
              </div>

              <div className="timeline-row" data-about-reveal>
                <span className="timeline-step">04</span>
                <div className="timeline-phase">PRICING</div>
                <div className="timeline-content">
                  <h4>Transparent Upfront Inclusions</h4>
                  <p>Accommodations, daily breakfasts, excursions, and key dinners are included in your rate. What you see is what you pay.</p>
                </div>
              </div>
            </div>

            <div className="ledger-bottom-link" data-about-reveal>
              <Link href="/#questions" className="text-link">
                Have questions about room sharing, deposits, or solo travel? Read the FAQ <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 6: Film & Atmospheric Clouds */}
        <section className="about-film-stage" aria-labelledby="film-title">
          <div className="about-film-viewport">
            <video
              ref={film}
              className="about-film-element"
              muted
              loop
              playsInline
              preload="none"
              poster="/media/moment-5.webp"
              aria-label="A candid moment with Olivia and the Travel and LIV group"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setFilmError(true)}
            />
            <div className="about-film-overlay" />
            <div className="about-film-content" data-about-reveal>
              <span className="about-label">A MOMENT WITH THE GROUP</span>
              <h2 id="film-title">
                You’ll get to know her<br />
                <em>pretty quickly.</em>
              </h2>
              <button className="about-watch-btn" onClick={() => { setFilmError(false); setWatch(true); }}>
                <span><Play size={18} fill="currentColor" /></span>
                Watch with sound
              </button>
            </div>
            <button
              className="about-ambient-btn"
              aria-label={playing ? "Pause background video" : "Play background video"}
              onClick={() => {
                if (playing) {
                  setPaused(true);
                  film.current?.pause();
                } else {
                  setPaused(false);
                  if (film.current) {
                    if (!film.current.getAttribute("src")) film.current.src = filmUrl;
                    void film.current.play().catch(() => setPlaying(false));
                  }
                }
              }}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="about-clouds" aria-hidden="true">
              <img className="about-cloud-back" src="/media/atmosphere/cloud-back.png" alt="" loading="lazy" />
              <img className="about-cloud-front" src="/media/atmosphere/cloud-front.png" alt="" loading="lazy" />
              <div className="about-cloud-floor" />
            </div>
          </div>
        </section>

        {/* Section 7: The Invitation */}
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
          <DialogTitle>A moment with Olivia & the group</DialogTitle>
          <DialogDescription>Turn the sound on. Get a feel for the company.</DialogDescription>
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
