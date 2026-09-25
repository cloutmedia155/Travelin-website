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
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

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

        // 1. Lenis Smooth Momentum Scroll (identical to homepage)
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

        // 2. Directional Smart Header (hide on scroll-down, reveal on scroll-up)
        let prevY = window.scrollY;
        const header = page.querySelector<HTMLElement>(".about-header");
        const navUpdate = () => {
          const y = window.scrollY;
          const heroBottom = page.querySelector(".about-opening")?.getBoundingClientRect().bottom || 0;
          header?.classList.toggle("about-header-ink", heroBottom < 80);
          prevY = y;
        };
        window.addEventListener("scroll", navUpdate, { passive: true });

        // 3. Section 1: Hero entrance line-masks & scroll timeline
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
        }

        // 4. Section 2: Story — Portrait curtain unmask & group snap parallax
        const storySection = select(".about-story")[0];
        if (storySection) {
          // Portrait clip-path reveal
          gsap.fromTo(select(".about-portrait-window"), {
            clipPath: "inset(12% 8% 0% 8%)",
          }, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: storySection,
              start: "top 85%",
              end: "top 25%",
              scrub: 1,
            },
          });

          // Inner photo optical counter-parallax
          const portraitImg = select(".about-portrait-window img")[0];
          if (portraitImg) {
            gsap.fromTo(portraitImg, {
              yPercent: -6,
              scale: 1.12,
            }, {
              yPercent: 6,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: storySection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }

          // Secondary Polaroid group snap enters with diagonal drift
          gsap.fromTo(select(".about-group-snap"), {
            y: mobile ? 25 : 60,
            x: mobile ? 15 : 35,
            rotation: 8,
            autoAlpha: 0,
            filter: "blur(4px)",
          }, {
            y: 0,
            x: 0,
            rotation: 4,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: storySection,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // 5. Section 3: The 3 Chapter Stelae — Counter-parallax scroll
        (select(".about-stela") as HTMLElement[]).forEach((stela) => {
          const photo = stela.querySelector(".about-stela-window img");
          if (photo) {
            gsap.fromTo(photo, {
              yPercent: -8,
              scale: 1.14,
            }, {
              yPercent: 8,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: stela,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }
        });

        // 6. Section 4: The Collective — Staggered deep-blur triptych lift
        const cards = select(".about-triptych .about-card") as HTMLElement[];
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 80, autoAlpha: 0, filter: "blur(8px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 2.2,
              stagger: 0.35,
              ease: "power2.out",
              force3D: true,
              scrollTrigger: {
                trigger: ".about-triptych",
                start: "top 76%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Counter-parallax on card images
          cards.forEach((card) => {
            const cardImg = card.querySelector(".about-card-window img");
            if (cardImg) {
              gsap.fromTo(cardImg, {
                yPercent: -5,
                scale: 1.1,
              }, {
                yPercent: 5,
                scale: 1.04,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                },
              });
            }
          });
        }

        // 7. Section 5: Practical Care — Ledger rows sequential stagger
        const ledgerRows = select(".ledger-row") as HTMLElement[];
        if (ledgerRows.length > 0) {
          gsap.fromTo(
            ledgerRows,
            { y: 24, autoAlpha: 0, filter: "blur(3px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 1.4,
              stagger: 0.18,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".about-ledger",
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 8. General Reveal Elements (optical dissolve)
        (select("[data-about-reveal]") as HTMLElement[]).forEach((element) => {
          gsap.fromTo(
            element,
            { y: 32, autoAlpha: 0, filter: "blur(4px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 1.5,
              ease: "power3.out",
              clearProps: "filter",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // 9. Section 6: Invitation — Floating memory pictures
        gsap.fromTo(
          select(".about-memory"),
          { y: 65, scale: 0.92, autoAlpha: 0, filter: "blur(6px)" },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 2.0,
            stagger: 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: select(".about-invitation")[0],
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const refresh = () => ScrollTrigger.refresh();
        document.fonts.ready.then(() => {
          if (page.isConnected && page.classList.contains("about-motion")) refresh();
        });
        window.addEventListener("load", refresh);

        return () => {
          lenis.destroy();
          gsap.ticker.remove(tick);
          window.removeEventListener("scroll", navUpdate);
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
