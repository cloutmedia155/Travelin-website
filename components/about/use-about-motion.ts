"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function useAboutMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    gsap.registerPlugin(ScrollTrigger);
    const match = gsap.matchMedia();
    match.add({ motion: "(prefers-reduced-motion: no-preference) and (min-height: 600px)", mobile: "(max-width: 700px)", desktop: "(min-width: 701px)" }, context => {
      if (!context.conditions?.motion) return;
      const mobile = context.conditions.mobile;
      page.classList.add("about-motion");
      const select = gsap.utils.selector(page);
      const lenis = new Lenis({ duration: 1.65, smoothWheel: true, syncTouch: false, touchMultiplier: 1, anchors: { offset: -75 }, prevent: node => node.closest('[role="dialog"]') !== null || document.body.hasAttribute("data-scroll-locked") });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);

      gsap.from(select(".about-line-mask > *"), { yPercent: 110, opacity: 0, filter: "blur(6px)", duration: 2.2, stagger: 0.22, ease: "power3.out", clearProps: "filter" });
      gsap.from(select(".about-opening-copy > p, .about-opening-copy > .about-label, .about-scroll-cue"), { opacity: 0, y: 14, duration: 1.6, delay: 0.5, stagger: 0.12, ease: "power2.out" });
      const hero = gsap.timeline({ scrollTrigger: { trigger: select(".about-opening")[0], start: "top top", end: "bottom bottom", scrub: 1.5 } });
      hero.to(select(".about-opening-copy, .about-scroll-cue"), { y: -45, autoAlpha: 0, filter: "blur(5px)", duration: 0.25 }, 0.08)
        .to(select(".about-opening-frame"), { clipPath: mobile ? "inset(9% 6% 42% 6%)" : "inset(10% 7% 13% 48%)", duration: 0.55, ease: "power2.inOut" }, 0.23)
        .to(select(".about-opening-shade"), { opacity: 0, duration: 0.45 }, 0.25)
        .fromTo(select(".about-opening-bridge"), { y: 35, autoAlpha: 0, filter: "blur(6px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.3 }, 0.6)
        .fromTo(select(".about-opening-caption"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0.8)
        .to({}, { duration: 0.05 });

      ScrollTrigger.create({ trigger: select(".about-opening")[0], start: "top top", end: "bottom top", onUpdate: self => page.querySelector(".about-header")?.classList.toggle("about-header-ink", self.progress > 0.35) });

      const beats = select(".about-story-beat") as HTMLElement[];
      const dots = select(".about-story-progress i");
      gsap.set(beats.slice(1), { autoAlpha: 0, y: 28, filter: "blur(5px)" });
      gsap.set(select(".about-story-group"), { x: mobile ? 30 : 80, y: 70, rotation: 9, autoAlpha: 0 });
      const story = gsap.timeline({ scrollTrigger: { trigger: select(".about-story")[0], start: "top top", end: "bottom bottom", scrub: 1.2, onUpdate: self => {
        const active = self.progress < 0.34 ? 0 : self.progress < 0.68 ? 1 : 2;
        beats.forEach((beat, i) => beat.setAttribute("aria-hidden", String(i !== active)));
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
      } } });
      story.to(select(".about-story-portrait"), { y: -22, rotation: -4, duration: 1, ease: "none" }, 0)
        .to(beats[0], { autoAlpha: 0, y: -25, filter: "blur(5px)", duration: 0.16 }, 0.22)
        .to(beats[1], { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.2 }, 0.32)
        .to(beats[1], { autoAlpha: 0, y: -25, filter: "blur(5px)", duration: 0.16 }, 0.56)
        .to(beats[2], { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.2 }, 0.66)
        .to(select(".about-story-group"), { x: 0, y: 0, rotation: 5, autoAlpha: 1, duration: 0.36, ease: "power2.out" }, 0.6)
        .to({}, { duration: 0.05 });

      (select("[data-about-reveal]") as HTMLElement[]).forEach(element => {
        gsap.from(element, { y: 35, opacity: 0, filter: "blur(5px)", duration: 1.7, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", toggleActions: "play none none reverse" } });
      });
      (select(".about-moment") as HTMLElement[]).forEach((element, i) => {
        gsap.from(element, { y: mobile ? 40 : 70 + i * 15, opacity: 0, filter: "blur(5px)", duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 88%", toggleActions: "play none none reverse" } });
        gsap.fromTo(element.querySelector("img"), { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 1.1 } });
      });
      gsap.fromTo(select(".about-film-frame"), { clipPath: mobile ? "inset(8% 5% 8% 5%)" : "inset(14% 16% 10% 16%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: select(".about-film")[0], start: "top 90%", end: "top top", scrub: 1 } });
      gsap.fromTo(select(".about-film-video"), { scale: 1.12, yPercent: -4 }, { scale: 1.04, yPercent: 4, ease: "none", scrollTrigger: { trigger: select(".about-film")[0], start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.set(select(".about-cloud-back, .about-cloud-front, .about-cloud-floor"), { autoAlpha: 0 });
      const film = gsap.timeline({ scrollTrigger: { trigger: select(".about-film")[0], start: "top top", end: "bottom bottom", scrub: 1.2 } });
      film.to(select(".about-film-copy, .about-ambient"), { autoAlpha: 0, y: -25, duration: 0.18 }, 0.45)
        .fromTo(select(".about-cloud-back"), { yPercent: 100, scale: 1.12 }, { yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.38, ease: "power1.out" }, 0.52)
        .fromTo(select(".about-cloud-front"), { yPercent: 110, scale: 1.05 }, { yPercent: 0, scale: 1.16, autoAlpha: 1, duration: 0.32, ease: "power1.out" }, 0.58)
        .fromTo(select(".about-cloud-floor"), { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 0.28 }, 0.65)
        .to({}, { duration: 0.07 });
      gsap.from(select(".about-memory"), { y: 75, scale: 0.9, autoAlpha: 0, duration: 1.8, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: select(".about-invitation")[0], start: "top 70%", toggleActions: "play none none reverse" } });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts.ready.then(() => { if (page.isConnected && page.classList.contains("about-motion")) refresh(); });
      window.addEventListener("load", refresh);
      return () => {
        lenis.destroy();
        gsap.ticker.remove(tick);
        window.removeEventListener("load", refresh);
        page.classList.remove("about-motion");
        page.querySelector(".about-header")?.classList.remove("about-header-ink");
        beats.forEach(beat => beat.removeAttribute("aria-hidden"));
      };
    }, page);
    return () => match.revert();
  }, [root]);
}
