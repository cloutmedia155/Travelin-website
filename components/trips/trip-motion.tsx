"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function TripMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const page = root.current;
    const match = gsap.matchMedia();
    match.add("(prefers-reduced-motion: no-preference) and (min-height: 600px)", () => {
      const lenis = new Lenis({ duration: 1.65, smoothWheel: true, syncTouch: false, anchors: { offset: -100 } });
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      lenis.on("scroll", ScrollTrigger.update);
      const ctx = gsap.context(() => {
        gsap.from("[data-tr-title]", { y: 22, opacity: 0, filter: "blur(4px)", duration: 1.5, stagger: .13, ease: "power3.out", clearProps: "all" });
        gsap.utils.toArray<HTMLElement>("[data-tr-reveal]").forEach(el => {
          gsap.from(el, { y: 24, opacity: 0, duration: 1.15, ease: "power3.out", clearProps: "all", scrollTrigger: { trigger: el, start: "top 94%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>("[data-tr-drift]").forEach(el => {
          gsap.fromTo(el, { yPercent: -3, scale: 1.09 }, { yPercent: 3, scale: 1.09, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1.2 } });
        });
      }, page);
      let frame = 0;
      const refresh = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => ScrollTrigger.refresh()); };
      const resize = new ResizeObserver(refresh);
      resize.observe(page);
      document.fonts.ready.then(() => { if (page.isConnected) refresh(); });
      return () => { resize.disconnect(); cancelAnimationFrame(frame); ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
    }, page);
    return () => match.revert();
  }, []);
  return <div ref={root} className="tr-page">{children}</div>;
}
