"use client";

import { useEffect, type RefObject } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useHowItWorksMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        duration: 1.65,
        smoothWheel: true,
        syncTouch: false,
      });

      const onScroll = () => ScrollTrigger.update();
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", onScroll);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        const titleLines = gsap.utils.toArray<HTMLElement>("[data-hiw-title]");
        gsap.fromTo(
          titleLines,
          { yPercent: 110, autoAlpha: 0, filter: "blur(6px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.7,
            stagger: 0.16,
            ease: "power3.out",
            clearProps: "filter",
          },
        );

        gsap.fromTo(
          ".hiw-opening-copy > p, .hiw-opening-actions",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.12, delay: 0.28, ease: "power2.out" },
        );

        gsap.fromTo(
          ".hiw-opening-frame",
          { clipPath: "inset(10% 8% 12% 18%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: ".hiw-opening",
              start: "top top",
              end: "bottom 35%",
              scrub: 1.1,
            },
          },
        );

        gsap.fromTo(
          ".hiw-opening-frame img",
          { scale: 1.09, yPercent: -2 },
          {
            scale: 1,
            yPercent: 2,
            ease: "none",
            scrollTrigger: {
              trigger: ".hiw-opening",
              start: "top top",
              end: "bottom 30%",
              scrub: 1.2,
            },
          },
        );

        gsap.fromTo(
          ".hiw-path-fill",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".hiw-journey",
              start: "top 78%",
              end: "bottom 32%",
              scrub: 1.15,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>(".hiw-step").forEach((step, index) => {
          gsap.fromTo(
            step,
            { y: 34, autoAlpha: 0.28 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.15,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: step,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );

          const bloom = root.current?.querySelector<SVGElement>(`[data-hiw-bloom='${index}']`);
          if (bloom) {
            gsap.fromTo(
              bloom,
              { scale: 0, transformOrigin: "50% 100%" },
              {
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.35)",
                immediateRender: false,
                scrollTrigger: { trigger: step, start: "top 78%", toggleActions: "play none none reverse" },
              },
            );
          }
        });

        gsap.fromTo(
          ".hiw-journey-photo-a",
          { x: -42, y: 30, rotate: -5, autoAlpha: 0, clipPath: "inset(10% 7% 14% 9%)" },
          {
            x: 0,
            y: 0,
            rotate: -2.5,
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: ".hiw-step-2", start: "top 75%", toggleActions: "play none none reverse" },
          },
        );

        gsap.fromTo(
          ".hiw-journey-photo-b",
          { x: 46, y: 32, rotate: 7, autoAlpha: 0, clipPath: "inset(12% 9% 9% 11%)" },
          {
            x: 0,
            y: 0,
            rotate: 3.5,
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.45,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: ".hiw-step-3", start: "top 75%", toggleActions: "play none none reverse" },
          },
        );

        gsap.fromTo(
          ".hiw-solo-photo-main",
          { clipPath: "inset(7% 12% 8% 4%)", scale: 1.05 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".hiw-solo", start: "top 84%", end: "center 46%", scrub: 1.05 },
          },
        );

        gsap.fromTo(
          ".hiw-solo-photo-small",
          { y: 56, rotate: 7 },
          {
            y: -18,
            rotate: 2.5,
            ease: "none",
            scrollTrigger: { trigger: ".hiw-solo", start: "top bottom", end: "bottom top", scrub: 1.2 },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-hiw-reveal]").forEach(element => {
          gsap.fromTo(
            element,
            { y: 26, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.15,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: { trigger: element, start: "top 88%", toggleActions: "play none none reverse" },
            },
          );
        });
      }, root);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        context.revert();
        gsap.ticker.remove(tick);
        lenis.off("scroll", onScroll);
        lenis.destroy();
      };
    });

    return () => media.revert();
  }, [root]);
}
