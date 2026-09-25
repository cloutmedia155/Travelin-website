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

        {/* Section 2: Olivia's Story — Monograph Portrait & Confession */}
        <section id="the-story" className="about-story" aria-labelledby="story-heading">
          <div className="about-story-wrap wrap">
            <div className="about-story-visual" data-about-reveal>
              <figure className="about-portrait-frame">
                <div className="portrait-image-wrapper">
                  <img src="/media/olivia.webp" alt="Olivia Owen, founder and host" loading="lazy" />
                </div>
                <figcaption>Olivia, by the sea.</figcaption>
              </figure>
              <figure className="about-snapshot-card" aria-hidden="true">
                <img src="/media/moment-2.webp" alt="Travelers sharing an afternoon together" loading="lazy" />
                <figcaption>A few more people to go with.</figcaption>
              </figure>
              <span className="about-handwriting" aria-hidden="true">How it started</span>
            </div>

            <div className="about-story-narrative" data-about-reveal>
              <span className="about-label">BEFORE THE COLLECTIVE</span>
              <h2 id="story-heading">
                She wanted to travel.<br />
                <em>Finding people wasn’t easy.</em>
              </h2>
              <p className="story-lead">
                Olivia started traveling solo because she didn’t want to wait on anyone’s schedule. But wanting to explore and finding people who are genuinely up for it are two different things.
              </p>
              <p className="story-sub">
                Travel & LIV began with a simple idea: book stays worth traveling for, take the friction out of the planning, and bring together people who are easy to talk to.
              </p>
              <div className="story-signoff">
                <p>Today, she personally plans and hosts every single departure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Trip Approach — 3-Photo Horizon Panorama */}
        <section className="about-horizon" aria-labelledby="approach-heading">
          <div className="about-horizon-intro wrap" data-about-reveal>
            <h2 id="approach-heading">
              Three decisions behind<br />
              <em>every single trip.</em>
            </h2>
          </div>

          <div className="about-horizon-grid wrap">
            <article className="horizon-panel panel-left" data-about-reveal>
              <div className="horizon-window">
                <img src="/media/villa-pool.webp" alt="Private luxury villa pool at sunset" loading="lazy" />
              </div>
              <div className="horizon-caption">
                <span className="horizon-num">01</span>
                <h3>4–5-star stays</h3>
                <p>Boutique villas and design-led hotels. You’ll know where you stay before you book.</p>
              </div>
            </article>

            <article className="horizon-panel panel-center" data-about-reveal>
              <div className="horizon-window">
                <img src="/media/boat.webp" alt="Catamaran cruise out on open water" loading="lazy" />
              </div>
              <div className="horizon-caption">
                <span className="horizon-num">02</span>
                <h3>Planned, not packed</h3>
                <p>Curated boat days, cultural moments, and dinners — balanced with time to yourself.</p>
              </div>
            </article>

            <article className="horizon-panel panel-right" data-about-reveal>
              <div className="horizon-window">
                <img src="/media/moment-7.webp" alt="Olivia and travelers laughing together on a day out" loading="lazy" />
              </div>
              <div className="horizon-caption">
                <span className="horizon-num">03</span>
                <h3>Olivia on every trip</h3>
                <p>Someone there from the airport welcome to the farewell dinner. Never walk into a room alone.</p>
              </div>
            </article>
          </div>
        </section>

        {/* Section 4: The Collective — Magazine Double-Page Feature on Sage */}
        <section className="about-community-spread" aria-labelledby="community-heading">
          <div className="about-spread-wrap wrap">
            <div className="spread-visual" data-about-reveal>
              <figure className="spread-photo">
                <img src="/media/moment-1.webp" alt="Travel & LIV travelers sharing dinner around a warm table" loading="lazy" />
                <figcaption>Dinner with the collective.</figcaption>
              </figure>
            </div>

            <div className="spread-content" data-about-reveal>
              <span className="about-label">THE COLLECTIVE</span>
              <h2 id="community-heading">
                You don’t need a group.<br />
                <em>Just show up.</em>
              </h2>
              <blockquote className="spread-quote">
                “Within two hours of arriving, we were all laughing over dinner like old friends.”
              </blockquote>
              <div className="spread-points">
                <div className="point-item">
                  <strong>80%+ join on their own</strong>
                  <p>Most travelers arrive solo. Friends, siblings, and couples join our general departures too.</p>
                </div>
                <div className="point-item">
                  <strong>10–18 travelers, max</strong>
                  <p>Small enough to actually know everyone by name. Never a crowded tour bus.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Practical Care — Swiss Architectural Ledger */}
        <section className="about-ledger-section" aria-labelledby="org-heading">
          <div className="ledger-wrap wrap">
            <div className="ledger-header" data-about-reveal>
              <span className="about-label">PRACTICAL CARE</span>
              <h2 id="org-heading">
                How we run things.
              </h2>
            </div>

            <div className="ledger-grid">
              <div className="ledger-column" data-about-reveal>
                <span className="ledger-index">01</span>
                <h4>Pre-Departure</h4>
                <p>Private trip chat opens weeks early. Direct guidance on flight windows and packing.</p>
              </div>

              <div className="ledger-column" data-about-reveal>
                <span className="ledger-index">02</span>
                <h4>On The Ground</h4>
                <p>Olivia coordinates with local drivers, guides, and hotel staff behind the scenes.</p>
              </div>

              <div className="ledger-column" data-about-reveal>
                <span className="ledger-index">03</span>
                <h4>Transparent Pricing</h4>
                <p>Accommodations, excursions, and key dinners included. No surprise checkout fees.</p>
              </div>

              <div className="ledger-column" data-about-reveal>
                <span className="ledger-index">04</span>
                <h4>Safety & Respect</h4>
                <p>Vetted local operators. A welcoming, mutually respectful space for every traveler.</p>
              </div>
            </div>

            <div className="ledger-footer" data-about-reveal>
              <Link href="/#questions" className="text-link">
                Have questions before booking? Read the FAQ <ArrowUpRight size={14} />
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
