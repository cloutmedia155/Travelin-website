# Trips listing and single-trip pages — design and creation plan

Status: working design proposal; planning only, no product code changed.
Date: 2026-09-26
Baseline: main at 25374f287db86fe70a7f6b5fa20c175e589c532a.
Branch: astra-trips-plan.
Scope: /trips and /trips/[slug], matching the current homepage and updated About experience.

## Brief
Help a visitor choose a departure and imagine joining it. Preserve short human copy, photography-led scenes, cream and forest-green tones, editorial type, generous space, and slow controlled motion. Make dates, cost, rooming and the route to booking easy to find. Build distinct listing and detail experiences rather than repeating the homepage.

## Evidence boundaries
The supplied file, Pasted text(20260926-010359).txt, is a summary of the user's 50-agency research. It does not contain the 50 page URLs, counts or observation records. Treat its patterns as research input, not independently verified statistics or evidence that one layout converts better.
Current source code is authoritative for the site's implementation. Older documents and CSS comments may be stale. Existing documents are not being revised.

## Research decisions
- Keep an emotional opening, essential facts, experience chapters, accommodation evidence and a named host.
- Adapt bespoke agency enquiry flows to scheduled group departures: choose date and room, review terms, then continue to the existing booking provider.
- Combine emotional intro, highlights and signature experiences; otherwise the same promise repeats.
- Combine group reassurance, Olivia and relevant traveler evidence into one human scene.
- Use experience + place + day range for the primary itinerary; provide the complete day-by-day plan on demand.
- Do not equate an accordion with cheap design. Logistics belong in accessible disclosures where they help comparison.
- Put dates, price basis, eligibility and exclusions early. Details can be progressive; material booking conditions must be accessible before checkout.
- Reuse the motion language selectively. Do not replay the homepage's long door introduction or force horizontal scrolling through the trip catalogue.

## Current destination inventory
These values are present in app/page.tsx; they are not verification of current supplier availability.

| Destination | Proposed route | Current content | Page state |
| --- | --- | --- | --- |
| Punta Cana | /trips/punta-cana | Oct 28–Nov 1, 2026; 5 days / 4 nights; from $1,799; singles trip; flights extra | Full departure page after package, currency, room and booking-link verification |
| Brazil / Rio de Janeiro | /trips/brazil | Dates, duration and price not confirmed | Destination preview; Ask about Brazil |
| Phuket | /trips/phuket | Dates, duration and price not confirmed | Destination preview; Ask about Phuket |
| Bali | /trips/bali | Dates, duration and price not confirmed | Destination preview; Ask about Bali |

Do not invent itineraries, hotels, prices, remaining places, testimonials or waitlist functionality.

## Listing: /trips
1. Compact editorial opening: “Where shall we go next?” with one image and a short invitation.
2. Departure collection: open photographic layouts, comparable facts, clear state and one Explore trip link per destination.
3. Brief human reassurance: Olivia and a real group moment, with one relevant sentence.
4. Quiet help invitation: “Not sure which one?” and a working Ask Olivia link.

One complete trip should be discoverable within the initial screen or immediately below it, depending on viewport. No pinned opening. Use a two-column photographic gallery on desktop and stacked cards on mobile; keep facts aligned and readable. With four trips, omit search and elaborate filters.

## Detail: /trips/[slug]
1. Destination opening + essential facts + See dates & rooms.
2. Signature moments: three images with specific one-line captions.
3. The people and your host: candid group image, Olivia and honest reassurance.
4. Your days here: three to five experience chapters with place and day metadata; full day plan available.
5. Somewhere to come back to: actual booked property and room choices.
6. What is covered: short inclusion / exclusion ledger, then relevant practical questions.
7. Your place on the trip: departure, room, total price basis, payment information and booking-provider handoff.
8. Optional quiet related-trip links after the booking decision.

This is an ordered information hierarchy, not eight identical full-height sections. No separate emotional-intro, highlights, host, testimonial and booking-process blocks repeating content already present.

## Visual and motion direction
Retain Cormorant Garamond and Manrope, forest #263c32, cream #f7f8f4, sage #edf0e9, muted #69756c and photo border #fffdf5. Use the current 1160px editorial measure, existing grid alignment and short copy widths.
Use masked heading entrances, image drift, restrained photo tilt, inset-to-full image reveals and at most one cloud transition on a detail page when its destination-specific footage justifies it. Keep all facts and actions usable without motion. Mobile uses native touch scrolling and shorter vertical compositions.

## Next refinement
Complete exact section layouts, spacing, copy budgets, motion timings, booking states, shared data model, route integration, content requirements and acceptance checks in this same plan.
