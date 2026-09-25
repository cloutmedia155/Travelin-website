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
        </div>
        <div className="hero-copy hero-action">
          <h2 className="hero-action-lead">
            <span className="line-mask"><span className="action-line">Olivia comes on every trip</span></span>
            <span className="line-mask"><span className="action-line">to host, help,</span></span>
            <span className="line-mask"><span className="action-line">and get everyone talking.</span></span>
          </h2>
          <div className="hero-action-cta">
            <a className="button button-light" href="#trips">Find Your Trip <ArrowUpRight size={17} /></a>
            <p className="hero-action-note">4–5-star stays <span>·</span> Personally hosted by Olivia<br />Payment plans on most trips</p>
          </div>
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
