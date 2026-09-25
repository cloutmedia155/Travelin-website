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
      gsap.set([".hero-intro", ".hero-action"], { autoAlpha: 0 });
      gsap.fromTo(".hero-line", { yPercent: 115, opacity: 0, rotate: 2, filter: "blur(6px)" }, { yPercent: 0, opacity: 1, rotate: 0, filter: "blur(0px)", duration: 2.4, stagger: .24, delay: .2, ease: "power3.out" });
      const ht = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: 1.6 } });
      ht.to(playhead, { time: 4.7, duration: .82, ease: "none", onUpdate: () => { wantedTime = playhead.time; seek(); } }, .025)
        .to(".hero-title", { y: -110, autoAlpha: 0, filter: "blur(7px)", duration: .16, ease: "power1.inOut" }, .09)
        .fromTo(".hero-intro", { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .16 }, .20)
        .fromTo(".intro-line", { yPercent: 105, filter: "blur(4px)" }, { yPercent: 0, filter: "blur(0px)", stagger: .025, duration: .16 }, .21)
        .to(".hero-intro", { y: -65, autoAlpha: 0, filter: "blur(5px)", duration: .14 }, .48)
        .fromTo(".hero-action", { y: 30, autoAlpha: 0, filter: "blur(4px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: .16 }, .60)
        .fromTo(".action-line", { yPercent: 105, filter: "blur(4px)" }, { yPercent: 0, filter: "blur(0px)", stagger: .025, duration: .16 }, .61)
        .to(".hero-action", { y: -35, autoAlpha: 0, duration: .10 }, .85)
        .fromTo(".hero-cloud-back", { yPercent: 100, scale: 1.25 }, { yPercent: 0, scale: 1, duration: .24 }, .76)
        .fromTo(".hero-cloud-front", { yPercent: 115, scale: 1.1 }, { yPercent: 0, scale: 1.28, duration: .19 }, .81)
        .fromTo(".cloud-floor", { yPercent: 100 }, { yPercent: 0, duration: .15 }, .85);
      if (document.querySelector(".hero-bottom")) ht.to(".hero-bottom", { autoAlpha: 0, duration: .08 }, .78);
      if (document.querySelector(".hero-count b")) ht.to(".hero-count b", { scaleX: 1, duration: 1, ease: "none" }, 0);

      const panels = gsap.utils.toArray<HTMLElement>(".chapter-panel");
      const et = gsap.timeline({ scrollTrigger: { trigger: ".experience-scroll", start: "top top", end: "bottom bottom", scrub: 1.2, onUpdate: self => { const index = self.progress < .29 ? 0 : self.progress < .63 ? 1 : 2; const counter = document.querySelector(".experience-current"); if (counter) counter.textContent = `0${index + 1}`; panels.forEach((p,i)=>p.setAttribute("aria-hidden",String(i!==index))); } } });
      panels.forEach((panel, i) => {
        const copy = panel.querySelector(".chapter-copy");
        const row = panel.querySelector(".chapter-images");
        const photos = panel.querySelectorAll(".journey-photo");
        const start = i * 3;
        if (i === 0) { gsap.set(copy, { autoAlpha: 1 }); }
        else {
          gsap.set(copy, { autoAlpha: 0 });
          gsap.set(photos, { x: -window.innerWidth * 1.25, y: 65, autoAlpha: 0, rotation: -12 });
          et.to(copy, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .65 }, start - .35)
            .fromTo(copy, { y: 25 }, { y: 0, duration: .65 }, start - .35)
            .to(photos, { x: 0, y: 0, autoAlpha: 1, rotation: 0, duration: 1.15, stagger: .12, ease: "power2.out" }, start - .65);
        }
        et.to(photos, { y: (j: number) => j % 2 ? -35 : -70, duration: 1.4, ease: "none" }, start + .45);
        if (mobile) et.to(row, { x: -window.innerWidth * .72, duration: 1.6, ease: "none" }, start + .45);
        if (i < 2) {
          et.to(copy, { autoAlpha: 0, y: -35, filter: "blur(3px)", duration: .55 }, start + 1.85)
            .to(photos, { x: window.innerWidth * 1.35, y: -120, autoAlpha: 0, rotation: 8, duration: 1.05, stagger: .1, ease: "power2.in" }, start + 1.9);
        } else {
          et.to(copy, { autoAlpha: 0, y: -30, duration: .6 }, 8.45).to(photos, { y: -100, autoAlpha: 0, duration: .7, stagger: .1 }, 8.45);
        }
      });
      if (document.querySelector(".experience-progress b")) et.to(".experience-progress b", { scaleX: 1, duration: 9.35, ease: "none" }, 0);

      gsap.fromTo(".film-frame", { clipPath: mobile ? "inset(12% 5% 8% 5%)" : "inset(16% 18% 10% 18%)", y: 80 }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, ease: "none", scrollTrigger: { trigger: ".film-scroll", start: "top 90%", end: "top top", scrub: .9 } });
      gsap.fromTo(".film-poster", { yPercent: -7, scale: 1.15 }, { yPercent: 7, scale: 1.05, ease: "none", scrollTrigger: { trigger: ".film-scroll", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.fromTo(".film-cloud-top", { xPercent: -10, yPercent: -28 }, { xPercent: 8, yPercent: -70, ease: "none", scrollTrigger: { trigger: ".film-scroll", start: "top bottom", end: "bottom top", scrub: 1.5 } });
      gsap.fromTo(".film-cloud-bottom", { xPercent: 12, yPercent: 45 }, { xPercent: -8, yPercent: 0, ease: "none", scrollTrigger: { trigger: ".film-scroll", start: "top top", end: "bottom 35%", scrub: 1.4 } });
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
              start: "top 68%",
              toggleActions: "restart reverse restart reverse"
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

      // ── Sprout tiny flowers & leaves along the journey path (vine effect) ──
      const sproutPath = document.querySelector<SVGPathElement>(".journey-path .path-base");
      const sproutSvg = document.querySelector<SVGSVGElement>(".journey-path");
      const sproutNodes: SVGGElement[] = [];
      if (sproutPath && sproutSvg) {
        const totalLen = sproutPath.getTotalLength();
        const sproutCount = 26;
        const sproutTl = gsap.timeline({
          scrollTrigger: { trigger: ".booking-journey", start: "top 70%", end: "bottom 80%", scrub: 0.8 }
        });
        for (let i = 0; i < sproutCount; i++) {
          const t = (i + 0.5) / sproutCount;
          const dist = t * totalLen;
          const pt = sproutPath.getPointAtLength(dist);
          const ptN = sproutPath.getPointAtLength(Math.min(dist + 1, totalLen));
          const tang = Math.atan2(ptN.y - pt.y, ptN.x - pt.x);
          const side = i % 2 === 0 ? 1 : -1;
          const perp = tang + (Math.PI / 2) * side;
          const sLen = 12 + Math.random() * 9;
          const tx = pt.x + Math.cos(perp) * sLen;
          const ty = pt.y + Math.sin(perp) * sLen;
          const ns = "http://www.w3.org/2000/svg";
          const g = document.createElementNS(ns, "g");
          g.classList.add("path-sprout");
          // Stem (starts collapsed at path point, grows outward)
          const stem = document.createElementNS(ns, "line");
          stem.setAttribute("x1", String(pt.x)); stem.setAttribute("y1", String(pt.y));
          stem.setAttribute("x2", String(pt.x)); stem.setAttribute("y2", String(pt.y));
          stem.setAttribute("stroke", "#8a9e6b"); stem.setAttribute("stroke-width", "0.7");
          g.appendChild(stem);
          // Tip group (flower or leaf)
          const tipG = document.createElementNS(ns, "g");
          tipG.setAttribute("opacity", "0");
          if (i % 3 === 0) {
            // Tiny 5-petal flower
            for (let j = 0; j < 5; j++) {
              const pa = (j * 72) * Math.PI / 180;
              const px = tx + Math.cos(pa) * 3.5, py = ty + Math.sin(pa) * 3.5;
              const petal = document.createElementNS(ns, "ellipse");
              petal.setAttribute("cx", String(px)); petal.setAttribute("cy", String(py));
              petal.setAttribute("rx", "2.5"); petal.setAttribute("ry", "1.4");
              petal.setAttribute("fill", "#a6b097");
              petal.setAttribute("transform", `rotate(${j * 72 + 90}, ${px}, ${py})`);
              tipG.appendChild(petal);
            }
            const ctr = document.createElementNS(ns, "circle");
            ctr.setAttribute("cx", String(tx)); ctr.setAttribute("cy", String(ty));
            ctr.setAttribute("r", "1.8"); ctr.setAttribute("fill", "#7d8d66");
            tipG.appendChild(ctr);
          } else {
            // Tiny leaf oriented along the stem direction
            const deg = perp * 180 / Math.PI;
            const leaf = document.createElementNS(ns, "path");
            leaf.setAttribute("d", "M0,-6 C3.5,-3.5 3.5,1 0,3 C-3.5,1 -3.5,-3.5 0,-6Z");
            leaf.setAttribute("fill", "#78895b"); leaf.setAttribute("opacity", "0.85");
            leaf.setAttribute("transform", `translate(${tx},${ty}) rotate(${deg})`);
            tipG.appendChild(leaf);
          }
          g.appendChild(tipG);
          sproutSvg.appendChild(g);
          sproutNodes.push(g);
          // Timeline: stem grows outward, then flower/leaf appears at tip
          const progress = (i / sproutCount) * 0.94;
          sproutTl.to(stem, { attr: { x2: tx, y2: ty }, duration: 0.03, ease: "power2.out" }, progress);
          sproutTl.to(tipG, { attr: { opacity: 1 }, duration: 0.03, ease: "power2.out" }, progress + 0.015);
        }
      }

      gsap.utils.toArray<HTMLElement>(".botanical").forEach(el=>gsap.fromTo(el, { scale: .2, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .8, scrollTrigger: { trigger: el, start: "top 77%", toggleActions: "play none none reverse" } }));
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
    return () => { ctx.revert(); lenis.destroy(); gsap.ticker.remove(tick); window.removeEventListener("scroll", navUpdate); window.removeEventListener("load", refresh); document.documentElement.classList.remove("journey-motion"); };
  }, []);
}
