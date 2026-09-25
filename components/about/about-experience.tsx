"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, Pause, Play } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useAboutMotion } from "./use-about-motion";

const filmUrl = "https://www.travelnliv.com/travelnliv_who.mp4";
const story = [
  { lead: "She wanted to", emphasis: "see more.", note: "Olivia’s own solo travels are where this story begins." },
  { lead: "Someone to go with", emphasis: "wasn’t always a given.", note: "Wanting to travel. Finding the people. She knows that feeling." },
  { lead: "So she started", emphasis: "bringing people together.", note: "Today, she plans and personally hosts Travel & LIV trips." },
];
const moments = [
  { image: "moment-7", alt: "Olivia and travelers exploring together in China", title: "A first hello.", text: "Olivia helps with that part.", className: "hello" },
  { image: "moment-1", alt: "Travel & LIV travelers sharing dinner around a table", title: "A seat at the table.", text: "And a conversation over dinner.", className: "table" },
  { image: "olivia", alt: "Olivia enjoying a quiet moment beside the sea", title: "A little time for yourself.", text: "There’s room for that, too.", className: "quiet" },
];

function AboutWordmark() {
  return <Link className="wordmark" href="/" aria-label="Travel and LIV Collective home"><span>TRAVEL <i>&</i> LIV</span><small>C O L L E C T I V E</small></Link>;
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
    if (watch || paused || reduced.matches) { video.pause(); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!video.getAttribute("src")) video.src = filmUrl;
        void video.play().catch(() => setPlaying(false));
      } else video.pause();
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, [paused, watch]);

  return <div className="about-page" ref={root}>
    <a className="skip-link" href="#olivias-story">Skip to Olivia’s story</a>
    <header className="about-header">
      <nav aria-label="Main navigation"><Link href="/" className="about-home-link"><ArrowLeft size={14} /><span>Home</span></Link><Link href="/about" aria-current="page" className="about-current">Our story</Link></nav>
      <AboutWordmark />
      <Link className="about-header-trip" href="/#trips">Find your trip <ArrowUpRight size={16} /></Link>
    </header>

    <main>
      <section className="about-opening" aria-labelledby="about-title">
        <div className="about-opening-stage">
          <div className="about-opening-frame"><img className="about-opening-image" src="/media/moment-5.webp" alt="Olivia taking a photograph with the Travel & LIV group" fetchPriority="high" /><div className="about-opening-shade" /></div>
          <div className="about-opening-copy"><span className="about-label">A LITTLE ABOUT US</span><h1 id="about-title"><span className="about-line-mask"><span>Meet Olivia.</span></span><span className="about-line-mask"><em>She’s coming too.</em></span></h1><p>The person planning your trip<br />is right there with you.</p></div>
          <a className="about-scroll-cue" href="#olivias-story">SCROLL TO MEET HER <ArrowDown size={16} /></a>
          <div className="about-opening-bridge" aria-hidden="true"><span className="about-label">OLIVIA OWEN · FOUNDER & HOST</span><p>The plans.<br />The first hello.<br /><em>She’s there for both.</em></p></div>
          <span className="about-opening-caption" aria-hidden="true">A moment with the collective.</span>
        </div>
      </section>

      <section id="olivias-story" className="about-story" aria-label="How Travel and LIV started">
        <div className="about-story-stage">
          <div className="about-story-images" aria-hidden="true"><figure className="about-story-portrait"><img src="/media/olivia.webp" alt="" loading="lazy" /><figcaption>Olivia, by the sea.</figcaption></figure><figure className="about-story-group"><img src="/media/moment-2.webp" alt="" loading="lazy" /><figcaption>A few more people to go with.</figcaption></figure><span className="about-story-handwriting">How it started</span></div>
          <div className="about-story-words"><span className="about-label">BEFORE THE COLLECTIVE</span>{story.map((item, index) => <div className="about-story-beat" key={item.lead} data-beat={index}><h2>{item.lead}<br /><em>{item.emphasis}</em></h2><p>{item.note}</p></div>)}<div className="about-story-progress" aria-hidden="true"><i /><i /><i /></div></div>
        </div>
      </section>

      <section className="about-moments" aria-labelledby="moments-title">
        <div className="about-moments-intro"><span className="about-label">THE LITTLE THINGS</span><h2 id="moments-title" data-about-reveal>Getting everyone together.<br /><em>Giving everyone room.</em></h2></div>
        <div className="about-moments-grid">{moments.map(item => <figure className={`about-moment about-moment-${item.className}`} key={item.title}><div className="about-moment-window"><img src={`/media/${item.image}.webp`} alt={item.alt} loading="lazy" /></div><figcaption><h3>{item.title}</h3><p>{item.text}</p></figcaption></figure>)}</div>
      </section>

      <section className="about-film" aria-labelledby="about-film-title"><div className="about-film-stage"><div className="about-film-frame"><video ref={film} className="about-film-video" muted loop playsInline preload="none" poster="/media/moment-5.webp" aria-label="A candid moment with Olivia and the Travel and LIV group" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFilmError(true)} /><div className="about-film-shade" /><div className="about-film-copy"><span className="about-label">OLIVIA, IN HER ELEMENT</span><h2 id="about-film-title" data-about-reveal>You’ll get to know her<br /><em>pretty quickly.</em></h2><button className="about-watch" onClick={() => { setFilmError(false); setWatch(true); }}><span><Play size={17} fill="currentColor" /></span>Watch with sound</button></div><button className="about-ambient" aria-label={playing ? "Pause background video" : "Play background video"} onClick={() => { if (playing) { setPaused(true); film.current?.pause(); } else { setPaused(false); if (film.current) { if (!film.current.getAttribute("src")) film.current.src = filmUrl; void film.current.play().catch(() => setPlaying(false)); } } }}>{playing ? <Pause size={17} /> : <Play size={17} />}</button><div className="about-clouds" aria-hidden="true"><img className="about-cloud-back" src="/media/atmosphere/cloud-back.png" alt="" loading="lazy" /><img className="about-cloud-front" src="/media/atmosphere/cloud-front.png" alt="" loading="lazy" /><div className="about-cloud-floor" /></div></div></div></section>

      <section className="about-invitation" aria-labelledby="invitation-title"><div className="about-invitation-pictures" aria-hidden="true"><figure className="about-memory memory-left"><img src="/media/moment-4.webp" alt="" loading="lazy" /></figure><figure className="about-memory memory-right"><img src="/media/moment-8.webp" alt="" loading="lazy" /></figure></div><div className="about-invitation-copy"><span className="about-label">THERE’S MORE TO COME</span><h2 id="invitation-title" data-about-reveal>Come meet us<br /><em>somewhere new.</em></h2><Link className="button button-dark" href="/#trips">Find Your Trip <ArrowUpRight size={18} /></Link><a className="about-question" href="mailto:Info@travelnliv.com">Ask Olivia a question <ArrowUpRight size={14} /></a><p className="about-signature">See you out there,<br /><em>Olivia</em></p></div></section>
    </main>

    <footer className="about-footer"><AboutWordmark /><nav aria-label="Footer navigation"><Link href="/#trips">The trips</Link><Link href="/about" aria-current="page">Our story</Link><Link href="/#questions">Your questions</Link><a href="https://www.instagram.com/travelnlivcollective" target="_blank" rel="noreferrer">Follow the moments <ArrowUpRight size={13} /></a></nav><div className="about-footer-bottom"><span>© {new Date().getFullYear()} Travel & LIV Collective</span><a href="mailto:Info@travelnliv.com">Info@travelnliv.com</a></div></footer>

    <Dialog open={watch} onOpenChange={setWatch}><DialogContent className="experience-dialog about-dialog"><DialogTitle>A moment with Olivia & the group</DialogTitle><DialogDescription>Turn the sound on. Get a feel for the company.</DialogDescription>{watch && <video controls autoPlay playsInline preload="metadata" src={filmUrl} poster="/media/moment-5.webp" onError={() => setFilmError(true)} />}{filmError && <p className="about-film-error">The film couldn’t load. <a href={filmUrl} target="_blank" rel="noreferrer">Open the video directly <ArrowUpRight size={14} /></a></p>}</DialogContent></Dialog>
  </div>;
}
