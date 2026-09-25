"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useJourneyMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let prevY = window.scrollY;
    const header = document.querySelector<HTMLElement>(".site-header");
    const navUpdate = () => {
      const y = window.scrollY;
      const heroBottom = document.querySelector(".hero")?.getBoundingClientRect().bottom || 0;
      header?.classList.toggle("header-solid", heroBottom < 90);
      if (Math.abs(y - prevY) > 8) header?.classList.toggle("header-hidden", y > prevY && y > 180 && document.body.dataset.menuOpen !== "true");
      prevY = y;
    };
    navUpdate();
    window.addEventListener("scroll", navUpdate, { passive: true });

    // Rebuild motion at a breakpoint change; desktop positions must not survive a mobile resize.
    const media = gsap.matchMedia();
    media.add({ mobile: "(max-width: 700px)", desktop: "(min-width: 701px)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      if (context.conditions?.reduced) return;
      const mobile = Boolean(context.conditions?.mobile);
      document.documentElement.classList.add("journey-motion");
      const video = document.querySelector<HTMLVideoElement>(".hero-film");
      const playhead = { progress: 0 };
      let disposed = false;
      const seek = () => {
        if (!video || video.readyState < 2 || video.seeking || !Number.isFinite(video.duration)) return;
        const time = playhead.progress * Math.max(0, video.duration - .05);
        if (Math.abs(video.currentTime - time) > 1 / 60) video.currentTime = time;
      };
      // A decoded frame clears the poster on browsers that keep it visible before first playback.
      const prime = () => {
        if (!video) return;
        void video.play().then(() => {
          video.pause();
          if (!disposed) seek();
        }).catch(seek);
      };
      video?.addEventListener("seeked", seek);
      video?.addEventListener("canplay", seek);
      if (video && video.readyState >= 2) prime();
      else video?.addEventListener("loadeddata", prime, { once: true });

      gsap.set(".hero-intro", { autoAlpha: 0 });
      gsap.fromTo(".hero-line", { yPercent: 105, opacity: 0, filter: "blur(3px)" }, { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.45, stagger: .15, ease: "power3.out" });
      const hero = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: 1.1 } });
      hero.to(playhead, { progress: 1, duration: 1, ease: "none", onUpdate: seek }, 0)
        .to(".hero-title", { y: -24, autoAlpha: 0, duration: .16 }, .16)
        .fromTo(".hero-intro", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .17 }, .33)
        .fromTo(".intro-line", { yPercent: 70 }, { yPercent: 0, stagger: .015, duration: .16 }, .33)
        .to(".hero-intro", { y: -20, autoAlpha: 0, duration: .14 }, .78)
        .fromTo(".hero-cloud-back", { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: .65, duration: .18 }, .82)
        .fromTo(".hero-cloud-front", { yPercent: 90, opacity: 0 }, { yPercent: 0, opacity: .65, duration: .14 }, .86)
        .to(".hero-count b", { scaleX: 1, duration: 1, ease: "none" }, 0);

      // Each chapter stays in document flow. No overlapping pinned panels or sideways exits.
      gsap.utils.toArray<HTMLElement>(".chapter-panel").forEach(panel => {
        gsap.fromTo(panel.querySelector(".chapter-copy"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: panel, start: "top 84%", once: true } });
        gsap.fromTo(panel.querySelectorAll(".journey-photo"), { x: mobile ? -12 : -48, y: 22, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 1.35, stagger: .14, ease: "power3.out", scrollTrigger: { trigger: panel.querySelector(".chapter-images"), start: "top 91%", once: true } });
        if (!mobile) gsap.fromTo(panel.querySelectorAll(".photo-window"), { y: 12 }, { y: -12, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 1 } });
      });
      gsap.fromTo(".film-frame", { clipPath: mobile ? "inset(4% 3% 4% 3%)" : "inset(8% 10% 8% 10%)", y: 35 }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, ease: "none", scrollTrigger: { trigger: ".film-scroll", start: "top 90%", end: "top 15%", scrub: .8 } });
      gsap.utils.toArray<HTMLElement>(".editorial-heading, .trips-heading h2, .people-heading h2, .founder-copy h2, .faq-intro h2, .booking-section h2, .final-copy h2, .collage-title h2").forEach(el => {
        gsap.fromTo(el, { y: 28, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" }, { y: 0, autoAlpha: 1, clipPath: "inset(0 0 -4% 0)", duration: 1.25, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".experience-intro-copy p, .people-heading>div:last-child, .founder-copy>p, .founder-copy>.text-link, .founder-copy>.signature, .faq-intro>p, .booking-step").forEach(el => {
        gsap.fromTo(el, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
      if (!mobile) {
        gsap.utils.toArray<HTMLElement>(".trip-card img, .founder-photo img, .story-card img").forEach(el => {
          gsap.fromTo(el, { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
        });
        const collage = gsap.timeline({ scrollTrigger: { trigger: ".collage-section", start: "top 20%", end: "bottom bottom", scrub: 1 } });
        collage.fromTo(".collage-0", { scale: 1.12 }, { scale: 1, duration: 1, ease: "none" }, 0);
        gsap.utils.toArray<HTMLElement>(".collage-image:not(.collage-0)").forEach((el, i) => {
          collage.fromTo(el, { x: i % 2 ? 45 : -45, y: i < 2 ? -25 : 35, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: .7, ease: "power2.out" }, .12 + i * .08);
        });
      } else {
        gsap.fromTo(".collage-image", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: .1, scrollTrigger: { trigger: ".collage-grid", start: "top 85%", once: true } });
      }
      const branch = gsap.timeline({ scrollTrigger: { trigger: ".booking-journey", start: "top 75%", end: "bottom 80%", scrub: .8 } });
      branch.fromTo(".path-fill", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0)
        .fromTo(".branch-sprig .growth-line", { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: .18, stagger: .07, ease: "none" }, .12)
        .fromTo(".branch-bloom", { scale: .75, opacity: 0, transformOrigin: "center center" }, { scale: 1, opacity: 1, duration: .2, stagger: .14, ease: "power2.out" }, .32);
      if (!mobile) gsap.fromTo(".final-cta>img", { yPercent: -5, scale: 1.1 }, { yPercent: 5, scale: 1.1, ease: "none", scrollTrigger: { trigger: ".final-cta", start: "top bottom", end: "bottom top", scrub: 1 } });
      return () => {
        disposed = true;
        video?.pause();
        video?.removeEventListener("seeked", seek);
        video?.removeEventListener("canplay", seek);
        video?.removeEventListener("loadeddata", prime);
        document.documentElement.classList.remove("journey-motion");
      };
    });
    let mounted = true;
    const refresh = () => { if (mounted) ScrollTrigger.refresh(); };
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      mounted = false;
      media.revert();
      window.removeEventListener("scroll", navUpdate);
      window.removeEventListener("load", refresh);
    };
  }, []);
}
