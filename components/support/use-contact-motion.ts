"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useContactMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(
          "[data-contact-title]",
          { yPercent: 80, autoAlpha: 0, filter: "blur(4px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.15,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "filter",
          },
        );

        gsap.fromTo(
          ".contact-intro-copy > p, .contact-email, .contact-form-shell",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, delay: 0.2, ease: "power2.out" },
        );

        gsap.fromTo(
          ".contact-photo-main",
          { clipPath: "inset(8% 10% 10% 12%)", scale: 1.045 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".contact-intro", start: "top top", end: "bottom 40%", scrub: 0.9 },
          },
        );

        gsap.fromTo(
          ".contact-photo-small",
          { y: 36, rotate: 7, autoAlpha: 0 },
          {
            y: 0,
            rotate: 3,
            autoAlpha: 1,
            duration: 1.1,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: ".contact-visuals", start: "top 82%", toggleActions: "play none none reverse" },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-contact-reveal]").forEach(element => {
          gsap.fromTo(
            element,
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: { trigger: element, start: "top 90%", toggleActions: "play none none reverse" },
            },
          );
        });
      }, root);

      return () => context.revert();
    });

    return () => media.revert();
  }, [root]);
}
