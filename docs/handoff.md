# Editing and launch handoff

## Update content

1. Edit the `trips` array in `app/page.tsx`: date range, duration, price, inclusions note and actual booking URL must agree with the trip page. Replace “to be confirmed” only after Olivia supplies the details.
2. Replace the three traveler-story photos with the supplied testimonial clips and their accurate attribution. Do not present staged photography as customer testimony.
3. Replace founder copy with Olivia’s own written story, retaining the verified fact that she personally hosts every trip.
4. Change chapter images in `components/home/experience.tsx`. Keep real group images for the people chapter. Replace inspirational stay photos with the actual accommodation when confirmed.
5. Update FAQ answers against the final booking terms, especially cancellation, payment schedules and room availability.
6. Put optimized assets under `public/media/`; update file references and `ASSETS.md`. Keep meaningful alt text and identify the correct destination.

## Verification before publishing

Run `pnpm exec tsc --noEmit --incremental false`, then `pnpm build` after source changes. Check the browser at the start of the hero, the introduction, the plane/CTA stage, and each experience chapter. Scroll both directions. Check for blank scene gaps, text collisions and horizontal page overflow.

Exercise destination tabs, next/previous buttons, keyboard arrows, FAQ expansion, anchor links, mobile menu and the experience dialog. Check reduced-motion mode and short mobile viewports. Avoid downloading or analyzing the experience film unnecessarily; the client specifically asked to conserve video-inspection credits.

Desktop layout and scroll stages have been inspected in the managed preview. A dedicated physical-device/mobile-browser pass remains recommended before a public launch; responsive CSS is implemented, but that is not equivalent to device testing.

## Content still needed

- Final Olivia story in her own words.
- Three or four video testimonial files, names and usage approval.
- Confirmed upcoming Brazil, Phuket and Bali departures, prices and booking URLs.
- Current Punta Cana inventory, price basis and room options.
- Confirmed accommodation photos for the next departures.
- Production usage permission or replacements for the borrowed door film and cloud assets.

## Source and deployment

GitHub destination requested by the user: `https://github.com/cloutmedia155/Travelin-website`. The previous repository request has been superseded. Use a feature branch and pull request; keep source, lockfile, scripts, local media and these notes together. Exclude generated output and all secrets.

The existing private Sites deployment is updated from an exact committed source revision. Source is pushed before the matching built archive is published; preserve the existing audience. The hosted preview is a client review surface, not a claim that pending trip data and media permissions are final.
