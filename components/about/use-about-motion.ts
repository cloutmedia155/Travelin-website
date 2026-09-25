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

    match.add(
      {
        motion: "(prefers-reduced-motion: no-preference) and (min-height: 600px)",
        mobile: "(max-width: 700px)",
        desktop: "(min-width: 701px)",
      },
      (context) => {
        if (!context.conditions?.motion) return;
        const mobile = Boolean(context.conditions.mobile);
        page.classList.add("about-motion");
        const select = gsap.utils.selector(page);

        // Weighted luxury momentum scrolling
        const lenis = new Lenis({
          duration: 1.65,
          smoothWheel: true,
          syncTouch: false,
          touchMultiplier: 1,
          anchors: { offset: -75 },
          prevent: (node) =>
            node.closest('[role="dialog"]') !== null ||
            document.body.hasAttribute("data-scroll-locked"),
        });

        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);

        // Section 1: Opening entrance masks & scroll timeline
        gsap.from(select(".about-line-mask > *"), {
          yPercent: 110,
          opacity: 0,
          filter: "blur(6px)",
          duration: 2.2,
          stagger: 0.22,
          ease: "power3.out",
          clearProps: "filter",
        });

        gsap.from(select(".about-opening-copy > p, .about-opening-copy > .about-label, .about-scroll-cue"), {
          opacity: 0,
          y: 16,
          duration: 1.6,
          delay: 0.5,
          stagger: 0.12,
          ease: "power2.out",
        });

        const heroTrigger = select(".about-opening")[0];
        if (heroTrigger) {
          const hero = gsap.timeline({
            scrollTrigger: {
              trigger: heroTrigger,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.5,
            },
          });

          hero.to(select(".about-opening-copy, .about-scroll-cue"), {
            y: -45,
            autoAlpha: 0,
            filter: "blur(5px)",
            duration: 0.25,
          }, 0.08)
            .to(select(".about-opening-frame"), {
              clipPath: mobile ? "inset(9% 6% 42% 6%)" : "inset(10% 7% 13% 48%)",
              duration: 0.55,
              ease: "power2.inOut",
            }, 0.23)
            .to(select(".about-opening-shade"), { opacity: 0, duration: 0.45 }, 0.25)
            .fromTo(select(".about-opening-bridge"), {
              y: 35,
              autoAlpha: 0,
              filter: "blur(6px)",
            }, {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.3,
            }, 0.6)
            .fromTo(select(".about-opening-caption"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0.8)
            .to({}, { duration: 0.05 });

          // Header background transition on scroll
          ScrollTrigger.create({
            trigger: heroTrigger,
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
              page.querySelector(".about-header")?.classList.toggle("about-header-ink", self.progress > 0.35);
            },
          });
        }

        // Section 2: Story photos subtle parallax drift
        const storySection = select(".about-story")[0];
        if (storySection) {
          gsap.fromTo(select(".about-portrait-card"), {
            y: mobile ? 20 : 40,
            rotation: -4,
          }, {
            y: mobile ? -20 : -40,
            rotation: -2,
            ease: "none",
            scrollTrigger: {
              trigger: storySection,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          gsap.fromTo(select(".about-group-snap"), {
            y: mobile ? 30 : 60,
            rotation: 6,
          }, {
            y: mobile ? -15 : -30,
            rotation: 3,
            ease: "none",
            scrollTrigger: {
              trigger: storySection,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }

        // Section 3: Flowing approach items — controlled diagonal parallax
        (select(".about-flow-item") as HTMLElement[]).forEach((item) => {
          const photo = item.querySelector(".about-flow-window img");
          if (photo) {
            gsap.fromTo(photo, {
              yPercent: -6,
              scale: 1.1,
            }, {
              yPercent: 6,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }
        });

        // Section 4: Community cards subtle stagger reveal
        (select(".about-community-card") as HTMLElement[]).forEach((card, i) => {
          gsap.from(card, {
            y: mobile ? 30 : 45 + i * 15,
            opacity: 0,
            filter: "blur(4px)",
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Generic reveal elements: soft optical dissolve
        (select("[data-about-reveal]") as HTMLElement[]).forEach((element) => {
          gsap.from(element, {
            y: 32,
            opacity: 0,
            filter: "blur(4px)",
            duration: 1.5,
            ease: "power3.out",
            clearProps: "filter",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Section 6: Invitation memory photos floating reveal
        gsap.from(select(".about-memory"), {
          y: 60,
          scale: 0.92,
          autoAlpha: 0,
          duration: 1.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: select(".about-invitation")[0],
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });

        const refresh = () => ScrollTrigger.refresh();
        document.fonts.ready.then(() => {
          if (page.isConnected && page.classList.contains("about-motion")) refresh();
        });
        window.addEventListener("load", refresh);

        return () => {
          lenis.destroy();
          gsap.ticker.remove(tick);
          window.removeEventListener("load", refresh);
          page.classList.remove("about-motion");
          page.querySelector(".about-header")?.classList.remove("about-header-ink");
        };
      },
      page
    );

    return () => match.revert();
  }, [root]);
}
