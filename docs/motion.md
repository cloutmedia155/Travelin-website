# Scroll and motion specification

## Shared rhythm

GSAP ScrollTrigger coordinates movement against scroll position. Native scrolling drives ScrollTrigger directly; this avoids layering Lenis wheel smoothing over scrubbed animation. Sticky scenes use CSS rather than a separate scroll container. Text and image transitions can reverse when the visitor scrolls upward.

## Hero

- Hero scroll region: 470 small viewport heights on desktop; mobile: 420.
- Sticky scene: one viewport. A local seekable MP4 follows a 0–4.7 second playhead, driven by scroll rather than autoplay.
- Opening title: line masks, gentle upward movement, blur settling to zero, 1.8-second reveal and 0.19-second stagger.
- Progress 9–25%: opening title leaves.
- 21–40%: left introduction reveals, then supporting paragraph.
- 50–63%: introduction leaves.
- 62–74%: trip button and supporting claims appear during the flight scene.
- 76–100%: two cloud layers rise and a light floor joins the next section.
- Numeric scrub smoothing: 1.15 seconds. Seeking waits for the video to be ready and for an outstanding seek to finish.

## Experience

One sticky stage holds all three chapters over 500 viewport heights on desktop and 470 on mobile. Each chapter gets a reading hold, gentle photo drift, then an exit to the right while the next group enters from the left. Text sits above a descending row of three photographs; image windows rotate 3, 8 and 13 degrees.

On mobile the image row travels left during each hold so the narrow viewport can reveal the later images. The chapter counter changes with the active scene. Inactive scenes are hidden from assistive technology while animated.

## Film and subsequent sections

The film frame expands from an inset rectangle while approaching the viewport; photography drifts within it. Cloud overlays move at a different pace. The experience video loads only when its section enters view; background playback is muted with a pause control. Sound playback opens in a dialog.

Section headings reveal over 1.5 seconds; paragraphs over 1.25 seconds. Destination, story and founder photographs have a restrained vertical parallax. Founder photography reveals through an inset mask. The collage begins with a larger central picture and brings surrounding images in from different edges. The booking SVG draws with scroll; small leaves and flowers reveal progressively along the path. Final destination imagery moves behind fixed-position copy.

## Accessibility and behavior

- Reduced-motion preference skips GSAP animation setup. Hero copy and all three experience chapters appear in normal reading order; the booking line is fully visible.
- Navigation and CTA anchors stay real links. Trip cards support buttons, keyboard arrows and touch swipes.
- Mobile menu stops document scrolling. Escape closes it. Video uses the existing accessible dialog implementation.
- No sound autoplays. Background video has a pause control.
- The persistent header hides when scrolling down, returns when scrolling up, and becomes solid after the hero.

## Tuning

Change scene heights in `app/journey.css` for reading duration. Change timing ratios and numeric `scrub` values in `use-journey-motion.ts` for transitions. Do not add another requestAnimationFrame scroll loop or CSS transform animation to these same elements: two motion systems will conflict.
