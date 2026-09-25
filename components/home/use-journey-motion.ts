"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

export function useJourneyMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    document.documentElement.classList.add("journey-motion");
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const lenis = new Lenis({ duration: 1.65, smoothWheel: true, touchMultiplier: 1, syncTouch: false, anchors: { offset: -65 }, prevent: node => node.closest('[role="dialog"]') !== null || document.body.dataset.menuOpen === "true" });
    if (typeof window !== "undefined") (window as any).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    let prevY = window.scrollY;
    const header = document.querySelector<HTMLElement>(".site-header");
    const navUpdate = () => {
      const y = window.scrollY;
      const heroBottom = document.querySelector(".hero")?.getBoundingClientRect().bottom || 0;
      header?.classList.toggle("header-solid", heroBottom < 90);
      if (Math.abs(y - prevY) > 8) header?.classList.toggle("header-hidden", y > prevY && y > 180 && document.body.dataset.menuOpen !== "true");
      prevY = y;
    };
    window.addEventListener("scroll", navUpdate, { passive: true });
    const ctx = gsap.context(() => {
      const video = document.querySelector<HTMLVideoElement>(".hero-film");
      let wantedTime = 0;
      const seek = () => { if (video && video.readyState >= 1 && !video.seeking && Math.abs(video.currentTime - wantedTime) > .022) video.currentTime = wantedTime; };
      video?.addEventListener("seeked", seek);
      video?.addEventListener("loadedmetadata", seek);
      const playhead = { time: 0 };
      gsap.set([".hero-intro", ".hero-action", ".hero-cloud-back", ".hero-cloud-front", ".cloud-floor", ".film-cloud-back", ".film-cloud-front", ".film-cloud-floor"], { autoAlpha: 0 });
      gsap.fromTo(".hero-line", { yPercent: 115, opacity: 0, rotate: 2, filter: "blur(6px)" }, { yPercent: 0, opacity: 1, rotate: 0, filter: "blur(0px)", duration: 2.4, stagger: .24, delay: .2, ease: "power3.out" });
      const ht = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: 1.6 } });
      ht.to(playhead, { time: 4.7, duration: .82, ease: "none", onUpdate: () => { wantedTime = playhead.time; seek(); } }, .025)
        .to(".hero-title", { y: -110, autoAlpha: 0, filter: "blur(7px)", duration: .16, ease: "power1.inOut" }, .09)
        .fromTo(".hero-intro", { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .16 }, .20)
        .fromTo(".intro-line", { yPercent: 105, filter: "blur(4px)" }, { yPercent: 0, filter: "blur(0px)", stagger: .025, duration: .16 }, .21)
        .to(".hero-intro", { y: -65, autoAlpha: 0, filter: "blur(5px)", duration: .14 }, .48)
        .fromTo(".hero-action", { y: 30, autoAlpha: 0, filter: "blur(4px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: .16 }, .60)
        .fromTo(".action-line", { yPercent: 105, filter: "blur(4px)" }, { yPercent: 0, filter: "blur(0px)", stagger: .025, duration: .16 }, .61)
        .to(".hero-action", { y: -35, autoAlpha: 0, duration: .10 }, .79)
        .fromTo(".hero-cloud-back", { yPercent: 100, scale: 1.12, autoAlpha: 0 }, { yPercent: 0, scale: 1, autoAlpha: 1, duration: .20, ease: "power1.out" }, .80)
        .fromTo(".hero-cloud-front", { yPercent: 110, scale: 1.05, autoAlpha: 0 }, { yPercent: 0, scale: 1.16, autoAlpha: 1, duration: .17, ease: "power1.out" }, .83)
        .fromTo(".cloud-floor", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .15, ease: "power1.inOut" }, .85);
      if (document.querySelector(".hero-bottom")) ht.to(".hero-bottom", { autoAlpha: 0, duration: .08 }, .78);
      if (document.querySelector(".hero-count b")) ht.to(".hero-count b", { scaleX: 1, duration: 1, ease: "none" }, 0);

      const panels = gsap.utils.toArray<HTMLElement>(".chapter-panel");
      const xTravel = Math.min(window.innerWidth * 0.35, 420);
      const et = gsap.timeline({
        scrollTrigger: {
          trigger: ".experience-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate: self => {
            const index = self.progress < .31 ? 0 : self.progress < .65 ? 1 : 2;
            const counter = document.querySelector(".experience-current");
            if (counter) counter.textContent = `0${index + 1}`;
            panels.forEach((p, i) => p.setAttribute("aria-hidden", String(i !== index)));
          }
        }
      });
      panels.forEach((panel, i) => {
        const copy = panel.querySelector(".chapter-copy");
        const row = panel.querySelector(".chapter-images");
        const photos = panel.querySelectorAll(".journey-photo");
        const start = i * 3;
        if (i === 0) {
          gsap.set(copy, { autoAlpha: 1 });
        } else {
          gsap.set(copy, { autoAlpha: 0, y: 25, filter: "blur(4px)" });
          gsap.set(photos, { x: -xTravel, y: 45, autoAlpha: 0, rotation: -4, filter: "blur(3px)" });
          et.to(photos, { x: 0, y: 0, autoAlpha: 1, rotation: 0, filter: "blur(0px)", duration: 1.05, stagger: .08, ease: "power1.out" }, start - .70)
            .to(copy, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .70, ease: "power1.out" }, start - .35);
        }
        et.to(photos, { y: (j: number) => j % 2 ? -30 : -60, duration: 1.4, ease: "none" }, start + .40);
        if (mobile) et.to(row, { x: -window.innerWidth * .72, duration: 1.5, ease: "none" }, start + .40);
        if (i < 2) {
          et.to(copy, { autoAlpha: 0, y: -25, filter: "blur(4px)", duration: .65, ease: "power1.inOut" }, start + 1.80)
            .to(photos, { x: xTravel, y: -95, autoAlpha: 0, rotation: 4, filter: "blur(3px)", duration: 1.1, stagger: .08, ease: "power1.inOut" }, start + 1.85);
        } else {
          et.to(copy, { autoAlpha: 0, y: -25, filter: "blur(4px)", duration: .65, ease: "power1.inOut" }, 8.30)
            .to(photos, { y: -80, autoAlpha: 0, filter: "blur(4px)", duration: .75, stagger: .08, ease: "power1.inOut" }, 8.30);
        }
      });
      if (document.querySelector(".experience-progress b")) et.to(".experience-progress b", { scaleX: 1, duration: 9.35, ease: "none" }, 0);

      gsap.fromTo(".film-frame", { clipPath: mobile ? "inset(12% 5% 8% 5%)" : "inset(16% 18% 10% 18%)", y: 80 }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, ease: "none", scrollTrigger: { trigger: ".film-scroll", start: "top 90%", end: "top top", scrub: .9 } });
      gsap.fromTo(".film-poster", { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.04, ease: "none", scrollTrigger: { trigger: ".film-scroll", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.fromTo(".film-cloud-top", { xPercent: -4, yPercent: -15 }, { xPercent: 4, yPercent: -50, ease: "none", scrollTrigger: { trigger: ".film-scroll", start: "top bottom", end: "bottom top", scrub: 1 } });

      const ft = gsap.timeline({ scrollTrigger: { trigger: ".film-scroll", start: "top top", end: "bottom bottom", scrub: 1.2 } });
      ft.to([".film-copy", ".ambient-control"], { autoAlpha: 0, y: -25, duration: .18, ease: "power1.in" }, .48)
        .fromTo(".film-cloud-back", { yPercent: 100, scale: 1.12, autoAlpha: 0 }, { yPercent: 0, scale: 1, autoAlpha: 1, duration: .36, ease: "power1.out" }, .52)
        .fromTo(".film-cloud-front", { yPercent: 110, scale: 1.05, autoAlpha: 0 }, { yPercent: 0, scale: 1.16, autoAlpha: 1, duration: .32, ease: "power1.out" }, .58)
        .fromTo(".film-cloud-floor", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .28, ease: "power1.inOut" }, .64);
      const expLines = document.querySelectorAll<HTMLElement>(".experience-intro .editorial-line");
      if (expLines.length > 0) {
        gsap.fromTo(expLines, { yPercent: 110, autoAlpha: 0, clipPath: "inset(0 0 100% 0)", filter: "blur(4px)" }, { yPercent: 0, autoAlpha: 1, clipPath: "inset(0 0 -4% 0)", filter: "blur(0px)", duration: 2.2, stagger: .26, ease: "power3.out", scrollTrigger: { trigger: ".experience-intro .editorial-heading", start: "top 87%", toggleActions: "restart reverse restart reverse" } });
      }
      const expIntroP = document.querySelector<HTMLParagraphElement>(".experience-intro-copy p");
      let splitIntroP: SplitText | null = null;
      if (expIntroP) {
        splitIntroP = new SplitText(expIntroP, { type: "lines, words" });
        gsap.set(splitIntroP.lines, { display: "inline" });
        gsap.set(splitIntroP.words, { display: "inline-block" });
        gsap.fromTo(splitIntroP.lines, {
          opacity: 0,
          filter: "blur(10px)"
        }, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: expIntroP,
            start: "top 80%",
            toggleActions: "restart reverse restart reverse"
          }
        });
      }
      gsap.utils.toArray<HTMLElement>(".trips-heading h2, .people-heading h2, .founder-copy h2, .faq-intro h2, .booking-section h2, .final-copy h2, .collage-title h2").forEach(el => {
        gsap.fromTo(el, { y: 48, autoAlpha: 0, clipPath: "inset(0 0 100% 0)", filter: "blur(3px)" }, { y: 0, autoAlpha: 1, clipPath: "inset(0 0 -4% 0)", filter: "blur(0px)", duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 87%", toggleActions: "play none none reverse" } });
      });
      gsap.utils.toArray<HTMLElement>(".people-heading>div:last-child, .founder-copy>p, .founder-copy>.text-link, .founder-copy>.signature, .faq-intro>p, .booking-step").forEach(el => {
        gsap.fromTo(el, { y: 25, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.25, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 91%" } });
      });
      const storyCards = gsap.utils.toArray<HTMLElement>(".story-cards .story-card");
      if (storyCards.length > 0) {
        gsap.fromTo(
          storyCards,
          { y: 80, autoAlpha: 0, filter: "blur(8px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 2.5,
            stagger: 0.45,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: ".story-cards",
              start: "top 72%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
      gsap.utils.toArray<HTMLElement>(".trip-card img, .founder-photo img, .story-card img").forEach(el => {
        gsap.fromTo(el, { yPercent: -7, scale: 1.16 }, { yPercent: 7, scale: 1.16, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1.1 } });
      });
      gsap.fromTo(".founder-photo", { clipPath: "inset(12% 8% 0% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".founder-section", start: "top 85%", end: "top 10%", scrub: 1 } });
      const ct = gsap.timeline({ scrollTrigger: { trigger: ".collage-section", start: "top top", end: "bottom bottom", scrub: 1.1 } });
      ct.fromTo(".collage-0", { scale: mobile ? 1.65 : 2.2 }, { scale: 1, duration: 1, ease: "power1.inOut" }, 0);
      gsap.utils.toArray<HTMLElement>(".collage-image:not(.collage-0)").forEach((el,i)=>{
        ct.fromTo(el, { x: i % 2 ? 130 : -130, y: i < 2 ? -90 : 160, scale: .75, autoAlpha: 0 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .7, ease: "power2.out" }, .18 + i * .1);
      });
      gsap.fromTo(".path-fill", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".booking-journey", start: "top 70%", end: "bottom 80%", scrub: .8 } });

      // ── Sprout tiny flowers along the journey path (vine branch using Flower.svg) ──
      const sproutPath = document.querySelector<SVGPathElement>(".journey-path .path-base");
      const sproutSvg = document.querySelector<SVGSVGElement>(".journey-path");
      const sproutNodes: SVGGElement[] = [];
      if (sproutPath && sproutSvg) {
        const totalLen = sproutPath.getTotalLength();
        const sproutCount = 46;
        const sproutTl = gsap.timeline({
          scrollTrigger: { trigger: ".booking-journey", start: "top 70%", end: "bottom 80%", scrub: 0.8 }
        });
        const ns = "http://www.w3.org/2000/svg";
        const palette = ["#6d8154", "#5b7049", "#78895b", "#546848", "#63774d"];

        for (let i = 0; i < sproutCount; i++) {
          const t = 0.03 + (i / (sproutCount - 1)) * 0.94;
          const dist = t * totalLen;
          const pt = sproutPath.getPointAtLength(dist);
          const ptN = sproutPath.getPointAtLength(Math.min(dist + 2, totalLen));
          const tang = Math.atan2(ptN.y - pt.y, ptN.x - pt.x);
          const side = i % 2 === 0 ? 1 : -1;
          const perp = tang + side * (Math.PI / 2.3 + ((i % 5) - 2) * 0.06);
          const rot = ((perp + Math.PI / 2) * 180) / Math.PI;

          // Dainty flower sizes matching the website's delicate botanical aesthetic
          const fw = 14 + (i % 4) * 2.2;
          const fh = fw * (426.224 / 221.941);
          const color = palette[i % palette.length];

          const g = document.createElementNS(ns, "g");
          g.classList.add("vine-flower");
          g.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${rot})`);

          const useEl = document.createElementNS(ns, "use");
          useEl.setAttribute("href", "#vine-flower");
          useEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#vine-flower");
          useEl.setAttribute("width", String(fw));
          useEl.setAttribute("height", String(fh));
          useEl.setAttribute("x", String(-fw * 0.5));
          useEl.setAttribute("y", String(-fh));
          useEl.setAttribute("fill", color);
          useEl.style.fill = color;
          g.setAttribute("fill", color);

          g.appendChild(useEl);
          sproutSvg.appendChild(g);
          sproutNodes.push(g);

          gsap.set(g, { scale: 0, autoAlpha: 0, transformOrigin: "0px 0px" });

          // Synchronized timeline animation: flowers sprout progressively as line draws
          const progress = t * 0.94;
          sproutTl.to(g, { scale: 1, autoAlpha: 1, duration: 0.026, ease: "back.out(1.4)" }, progress);
        }
      }

      gsap.fromTo(".final-cta>img", { yPercent: -12, scale: 1.1 }, { yPercent: 12, scale: 1.1, ease: "none", scrollTrigger: { trigger: ".final-cta", start: "top bottom", end: "bottom top", scrub: 1.1 } });
      return () => {
        video?.removeEventListener("seeked", seek);
        video?.removeEventListener("loadedmetadata", seek);
        splitIntroP?.revert();
        sproutNodes.forEach(el => el.remove());
      };
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => { ctx.revert(); delete (window as any).__lenis; lenis.destroy(); gsap.ticker.remove(tick); window.removeEventListener("scroll", navUpdate); window.removeEventListener("load", refresh); document.documentElement.classList.remove("journey-motion"); };
  }, []);
}
