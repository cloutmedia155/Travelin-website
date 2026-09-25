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

        // 2. Header State on Scroll
        const header = page.querySelector<HTMLElement>(".about-header");
        const navUpdate = () => {
          const heroBottom = page.querySelector(".about-opening")?.getBoundingClientRect().bottom || 0;
          header?.classList.toggle("about-header-ink", heroBottom < 80);
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

        // 4. Section 2: Olivia's Story — Portrait curtain unmask & snapshot drift
        const storySection = select(".about-story")[0];
        if (storySection) {
          // Portrait clip-path reveal
          gsap.fromTo(select(".portrait-image-wrapper"), {
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
          const portraitImg = select(".portrait-image-wrapper img")[0];
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

          // Secondary snapshot enters with diagonal drift
          gsap.fromTo(select(".about-snapshot-card"), {
            y: mobile ? 25 : 55,
            x: mobile ? 15 : 30,
            rotation: 8,
            autoAlpha: 0,
            filter: "blur(4px)",
          }, {
            y: 0,
            x: 0,
            rotation: 5,
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

        // 5. Section 3: The Trip Approach — 3-Photo Horizon Panorama Stagger & Parallax
        const horizonSection = select(".about-horizon")[0];
        if (horizonSection) {
          const panels = select(".horizon-panel") as HTMLElement[];
          if (panels.length > 0) {
            gsap.fromTo(
              panels,
              { y: 55, autoAlpha: 0, filter: "blur(6px)" },
              {
                y: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 1.8,
                stagger: 0.22,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: ".about-horizon-grid",
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              }
            );

            panels.forEach((panel) => {
              const panelImg = panel.querySelector(".horizon-window img");
              if (panelImg) {
                gsap.fromTo(panelImg, {
                  yPercent: -8,
                  scale: 1.12,
                }, {
                  yPercent: 8,
                  scale: 1.04,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                  },
                });
              }
            });
          }
        }

        // 6. Section 4: The Collective — Magazine Double-Page Spread
        const spreadSection = select(".about-community-spread")[0];
        if (spreadSection) {
          const spreadImg = select(".spread-photo img")[0];
          if (spreadImg) {
            gsap.fromTo(spreadImg, {
              yPercent: -6,
              scale: 1.1,
            }, {
              yPercent: 6,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: spreadSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }

          gsap.fromTo(
            select(".spread-photo"),
            { y: 45, autoAlpha: 0, filter: "blur(6px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: spreadSection,
                start: "top 72%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            select(".spread-points .point-item"),
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.2,
              stagger: 0.16,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".spread-points",
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 7. Section 5: Practical Care — Swiss Ledger Column Stagger
        const ledgerColumns = select(".ledger-column") as HTMLElement[];
        if (ledgerColumns.length > 0) {
          gsap.fromTo(
            ledgerColumns,
            { y: 28, autoAlpha: 0, filter: "blur(3px)" },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 1.4,
              stagger: 0.14,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".ledger-grid",
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 8. Section 6: Film Section with Cloud Swell & Clip-Path Expand (matches homepage)
        const filmSection = select(".about-film-stage")[0];
        if (filmSection) {
          gsap.fromTo(
            select(".about-film-viewport"),
            { clipPath: mobile ? "inset(8% 5% 8% 5%)" : "inset(14% 16% 10% 16%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: filmSection,
                start: "top 90%",
                end: "top top",
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            select(".about-film-element"),
            { scale: 1.12, yPercent: -4 },
            {
              scale: 1.04,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: filmSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );

          gsap.set(select(".about-cloud-back, .about-cloud-front, .about-cloud-floor"), { autoAlpha: 0 });
          const ft = gsap.timeline({
            scrollTrigger: {
              trigger: filmSection,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          });

          ft.to(select(".about-film-content, .about-ambient-btn"), { autoAlpha: 0, y: -25, duration: 0.18 }, 0.45)
            .fromTo(select(".about-cloud-back"), { yPercent: 100, scale: 1.12 }, { yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.38, ease: "power1.out" }, 0.52)
            .fromTo(select(".about-cloud-front"), { yPercent: 110, scale: 1.05 }, { yPercent: 0, scale: 1.16, autoAlpha: 1, duration: 0.32, ease: "power1.out" }, 0.58)
            .fromTo(select(".about-cloud-floor"), { yPercent: 100 }, { yPercent: 0, autoAlpha: 1, duration: 0.28 }, 0.65)
            .to({}, { duration: 0.07 });
        }

        // 9. General Reveal Elements (optical dissolve)
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

        // 10. Section 7: Invitation — Floating memory pictures
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
