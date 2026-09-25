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
        {/* Section 1: The company — opening (Hero) */}
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

        {/* Section 2: Olivia — How It Started (High-Fashion Monograph Spread) */}
        <section id="the-story" className="about-founder-spread" aria-labelledby="story-heading">
          <div className="about-founder-wrap wrap">
            <div className="about-founder-visual" data-about-reveal>
              <figure className="about-founder-portrait">
                <div className="founder-image-window">
                  <img src="/media/olivia.webp" alt="Olivia Owen, founder and host" loading="lazy" />
                </div>
                <figcaption>Olivia, by the sea.</figcaption>
              </figure>
              <figure className="about-founder-snap" aria-hidden="true">
                <img src="/media/moment-2.webp" alt="Travelers sharing an afternoon together" loading="lazy" />
                <figcaption>A few more people to go with.</figcaption>
              </figure>
              <span className="about-handwriting" aria-hidden="true">How it started</span>
            </div>

            <div className="about-founder-narrative" data-about-reveal>
              <span className="about-label">BEFORE THE COLLECTIVE</span>
              <h2 id="story-heading">
                She wanted to travel.<br />
                <em>Finding people wasn’t easy.</em>
              </h2>
              <p className="about-founder-lead">
                Olivia started traveling solo because she didn’t want to wait around on anyone. But wanting to go and having good people with you are two different things.
              </p>
              <p className="about-founder-sub">
                Travel & LIV began right there: take the stress out of planning, book stays worth traveling for, and bring together people who are easy to talk to.
              </p>

              <div className="about-stats-ledger">
                <div className="stat-row">
                  <span className="stat-num">01</span>
                  <div className="stat-text">
                    <strong>Personally hosted</strong>
                    <small>Olivia on every trip, every time</small>
                  </div>
                </div>
                <div className="stat-row">
                  <span className="stat-num">02</span>
                  <div className="stat-text">
                    <strong>80%+ join solo</strong>
                    <small>Nobody arrives knowing everyone</small>
                  </div>
                </div>
                <div className="stat-row">
                  <span className="stat-num">03</span>
                  <div className="stat-text">
                    <strong>4–5-star stays</strong>
                    <small>Private boutique villas & luxury resorts</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Trip Approach (3 Visual Chapter Stelae with Dual Photos) */}
        <section className="about-chapters" aria-labelledby="approach-heading">
          <div className="about-chapters-intro wrap" data-about-reveal>
            <span className="about-label">THE TRIP APPROACH</span>
            <h2 id="approach-heading">
              Three decisions behind<br />
              <em>every single trip.</em>
            </h2>
          </div>

          <div className="about-chapters-flow wrap">
            {/* Chapter 01: The Stay */}
            <article className="about-chapter-stela chapter-left" data-about-reveal>
              <div className="chapter-photos">
                <figure className="photo-primary">
                  <div className="photo-window">
                    <img src="/media/villa-pool.webp" alt="Private luxury villa pool at sunset" loading="lazy" />
                  </div>
                  <figcaption>Room to slow down.</figcaption>
                </figure>
                <figure className="photo-secondary" aria-hidden="true">
                  <div className="photo-window">
                    <img src="/media/villa-room.webp" alt="Boutique bedroom interior" loading="lazy" />
                  </div>
                  <figcaption>Somewhere to settle in.</figcaption>
                </figure>
              </div>
              <div className="chapter-meta">
                <span className="chapter-watermark" aria-hidden="true">01</span>
                <span className="chapter-tag">01 / THE STAY</span>
                <h3>Somewhere you want<br /><em>to wake up.</em></h3>
                <p>4–5-star boutique villas and design-led stays. Confirmed before you book.</p>
                <span className="chapter-pill">Private rooms or shared matching</span>
              </div>
            </article>

            {/* Chapter 02: The Days */}
            <article className="about-chapter-stela chapter-right" data-about-reveal>
              <div className="chapter-photos">
                <figure className="photo-primary">
                  <div className="photo-window">
                    <img src="/media/boat.webp" alt="Catamaran cruise out on open water" loading="lazy" />
                  </div>
                  <figcaption>A day out on the water.</figcaption>
                </figure>
                <figure className="photo-secondary" aria-hidden="true">
                  <div className="photo-window">
                    <img src="/media/terraces.webp" alt="Lush green destination terraces" loading="lazy" />
                  </div>
                  <figcaption>Time to take it in.</figcaption>
                </figure>
              </div>
              <div className="chapter-meta">
                <span className="chapter-watermark" aria-hidden="true">02</span>
                <span className="chapter-tag">02 / THE DAYS</span>
                <h3>Planned,<br /><em>not packed.</em></h3>
                <p>Curated boat days and group dinners — with space to do your own thing.</p>
                <span className="chapter-pill">No forced schedules or roll calls</span>
              </div>
            </article>

            {/* Chapter 03: The People */}
            <article className="about-chapter-stela chapter-left" data-about-reveal>
              <div className="chapter-photos">
                <figure className="photo-primary">
                  <div className="photo-window">
                    <img src="/media/moment-7.webp" alt="Olivia and travelers laughing together on a day out" loading="lazy" />
                  </div>
                  <figcaption>A first hello.</figcaption>
                </figure>
                <figure className="photo-secondary" aria-hidden="true">
                  <div className="photo-window">
                    <img src="/media/toast.webp" alt="Sunset drink with the group" loading="lazy" />
                  </div>
                  <figcaption>And people to share it with.</figcaption>
                </figure>
              </div>
              <div className="chapter-meta">
                <span className="chapter-watermark" aria-hidden="true">03</span>
                <span className="chapter-tag">03 / THE PEOPLE</span>
                <h3>An introduction<br /><em>when you need one.</em></h3>
                <p>Olivia gets people talking so you never have to walk into a room alone.</p>
                <span className="chapter-pill">From airport welcome to farewell dinner</span>
              </div>
            </article>
          </div>
        </section>

        {/* Section 4: The Collective (Full-Bleed Story Cards Triptych) */}
        <section className="about-collective" aria-labelledby="community-heading">
          <div className="about-collective-intro wrap" data-about-reveal>
            <span className="about-label">THE COLLECTIVE</span>
            <h2 id="community-heading">
              You don’t need a group.<br />
              <em>Just show up.</em>
            </h2>
            <p className="about-collective-sub">
              Most travelers book solo. Friends, siblings, and couples join too.
            </p>
          </div>

          <div className="about-story-triptych wrap">
            <figure className="about-story-card" data-about-reveal>
              <img src="/media/moment-1.webp" alt="Travel & LIV group enjoying dinner together" loading="lazy" />
              <div className="story-card-overlay" />
              <figcaption>
                <span className="story-card-num">01</span>
                <h3>Coming on your own</h3>
                <p>“Within two hours of arriving, we were all laughing over dinner like old friends.”</p>
              </figcaption>
            </figure>

            <figure className="about-story-card card-mid" data-about-reveal>
              <img src="/media/moment-8.webp" alt="Group admiring panoramic destination views" loading="lazy" />
              <div className="story-card-overlay" />
              <figcaption>
                <span className="story-card-num">02</span>
                <h3>10–18 travelers, max</h3>
                <p>Small enough to know everyone by name. Never a crowded tour bus.</p>
              </figcaption>
            </figure>

            <figure className="about-story-card" data-about-reveal>
              <img src="/media/moment-3.webp" alt="Relaxed evening drinks conversation" loading="lazy" />
              <div className="story-card-overlay" />
              <figcaption>
                <span className="story-card-num">03</span>
                <h3>At your own pace</h3>
                <p>Join the evening drinks or have a quiet night by the pool. Your call.</p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Section 5: The People Behind Your Plans (Architectural Ledger) */}
        <section className="about-logistics" aria-labelledby="org-heading">
          <div className="about-logistics-stage wrap">
            <div className="about-logistics-visual" data-about-reveal>
              <figure className="about-logistics-photo">
                <div className="logistics-image-window">
                  <img src="/media/moment-6.webp" alt="Olivia and local partners organizing the day out" loading="lazy" />
                </div>
                <figcaption>On-the-ground support with vetted local partners.</figcaption>
              </figure>
              <div className="about-logistics-card">
                <span className="card-kicker">UPFRONT COMMITMENT</span>
                <p>Every hotel, transfer window, and excursion confirmed before you pay.</p>
                <Link href="/#questions" className="text-link">
                  Booking FAQs <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            <div className="about-logistics-content" data-about-reveal>
              <span className="about-label">HOW WE WORK</span>
              <h2 id="org-heading">
                The details,<br />
                <em>handled quietly.</em>
              </h2>

              <div className="about-ledger-list">
                <div className="about-ledger-row">
                  <span className="ledger-num">01</span>
                  <div className="ledger-detail">
                    <h4>Before you fly</h4>
                    <p>Private group chat opens early. Flight windows and packing guidance included.</p>
                  </div>
                </div>

                <div className="about-ledger-row">
                  <span className="ledger-num">02</span>
                  <div className="ledger-detail">
                    <h4>On the ground</h4>
                    <p>Olivia coordinates transport, drivers, and daily timing behind the scenes.</p>
                  </div>
                </div>

                <div className="about-ledger-row">
                  <span className="ledger-num">03</span>
                  <div className="ledger-detail">
                    <h4>Transparent pricing</h4>
                    <p>4–5-star stays, curated excursions, and key dinners covered. No surprise checkout fees.</p>
                  </div>
                </div>

                <div className="about-ledger-row">
                  <span className="ledger-num">04</span>
                  <div className="ledger-detail">
                    <h4>Safety & respect</h4>
                    <p>Vetted local guides. A welcoming, respectful space for everyone.</p>
                  </div>
                </div>
              </div>
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
