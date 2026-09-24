"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="hero" aria-label="Your journey starts here">
      <div className="hero-sticky">
        <div className="hero-scene">
          <video className="hero-film" muted playsInline preload="auto" poster="/media/door-poster.webp" aria-hidden="true">
            <source src="/media/door-journey.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" />
        </div>
        <div className="scene-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="hero-copy hero-title">
          <h1>
            <span className="line-mask"><span className="hero-line">Go somewhere new</span></span>
            <span className="line-mask"><span className="hero-line">with people who are</span></span>
            <span className="line-mask"><em className="hero-line">up for it.</em></span>
          </h1>
        </div>
        <div className="hero-copy hero-intro">
          <p className="hero-intro-lead">
            <span className="line-mask"><span className="intro-line">Come on your own.</span></span>
            <span className="line-mask"><span className="intro-line">We’ll get the group together,</span></span>
            <span className="line-mask"><span className="intro-line">arrange the stay,</span></span>
            <span className="line-mask"><span className="intro-line">and plan the days out.</span></span>
          </p>
          <p className="intro-body">Olivia comes on every trip to host, help, and get everyone talking.</p>
        </div>
        <div className="hero-copy hero-action">
          <a className="button button-light" href="#trips">Find Your Trip <ArrowUpRight size={17} /></a>
          <p>4–5-star stays <span>·</span> Personally hosted by Olivia<br />Payment plans on most trips</p>
        </div>
        <div className="hero-bottom">
          <a className="scroll-cue" href="#experience"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
          <span className="hero-location">A little further from the everyday.</span>
          <div className="hero-count" aria-hidden="true"><span>01</span><i><b /></i><span>03</span></div>
        </div>
        <div className="hero-clouds" aria-hidden="true">
          <img className="hero-cloud-back" src="/media/atmosphere/cloud-back.png" alt="" />
          <img className="hero-cloud-front" src="/media/atmosphere/cloud-front.png" alt="" />
          <div className="cloud-floor" />
        </div>
      </div>
    </section>
  );
}
