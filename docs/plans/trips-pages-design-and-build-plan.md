# Travel & LIV — trips pages design and creation plan

Status: proposed design and implementation sequence, ready for review. No product implementation in this change.
Updated: 26 September 2026.
Baseline: main commit 25374f287db86fe70a7f6b5fa20c175e589c532a.
Plan branch: astra-trips-plan.
Routes: /trips and /trips/[slug].

## 1. The brief that governs every decision

Help visitors imagine joining a trip, find one that fits their dates and budget, and understand what they are booking. Continue the homepage and updated About page's photographic, personal, spacious experience.

**Latest user constraint:** short scenes, short copy, no lengthy sections or multiple explanatory paragraphs. Photography, composition and interaction carry the feeling. A required fact must still be findable.

This document contains detailed building instructions; that detail is not page copy. There will be three main areas on the listing and five main scenes on a complete trip page. No separate long introduction, highlights grid, founder biography, testimonial wall or repeated booking explainer.

### Evidence and limits

- User-supplied input: Pasted text(20260926-010359).txt, summarizing a reported review of 50 luxury travel agencies.
- That attachment supplies patterns and recommendations, not the underlying URLs, counts, screenshots or page-by-page records. Its frequency and comparative-quality claims are not independently verified here.
- Implementation references: app/page.tsx; app/journey.css; components/home/hero.tsx; components/home/experience.tsx; components/home/use-journey-motion.ts; app/about/about.css; components/about/about-experience.tsx; components/about/use-about-motion.ts; app/layout.tsx and app/globals.css.
- Current source governs implementation. Older docs and CSS comments are contextual only. For example, older documentation mentions a different price/currency; current homepage code shows Punta Cana from $1,799.
- Design psychology below is a rationale to test, not a proven conversion uplift.
- Existing documentation is left untouched. This new plan is explicitly requested.

## 2. What to keep, adapt and remove from the research

| Research suggestion | Travel & LIV decision | Reason |
| --- | --- | --- |
| Image-led hero with essential facts | Keep; facts readable immediately | Desire and practical fit must coexist |
| Emotional intro + highlights + signature experiences | Merge into the journey scene | Three separate sections would repeat the pitch |
| Experience / destination / day-range hybrid | Keep, backed by full day plan | A memorable picture with inspectable substance |
| Bespoke enquiry or customization CTA | Replace with departure and room selection where bookable | We sell scheduled group trips, not custom itinerary design |
| Accommodation evidence | Keep actual property and room imagery | Comfort and price are material decisions |
| Separate group, host and proof sections | One human scene | Show who welcomes you without retelling About |
| Practical information near the end | Compact disclosures; early links and key conditions near price | Low reading load must not conceal a commitment |
| Three large CTA sections | One booking destination with contextual links | Avoid repeated sales interruptions |
| Day-by-day accordions feel cheap | Reject as a universal claim | Visual treatment and usability matter; detail disclosures are useful |
| More immersive always means more scroll | Reject | A compact interactive scene can carry more experience than a long pinned section |

Recommended approach: editorial browsing for the collection; five visual scenes plus accessible detail for a trip. A catalogue of dense product cards would lose the existing atmosphere. Repeating the homepage's 500svh opening would slow visitors who already know what they want.

## 3. Existing design language translated into page rules

| Existing cue | Preserve | Adjustment for these pages |
| --- | --- | --- |
| Cormorant Garamond + Manrope | Light serif headings, occasional italic phrase, clear sans facts | Do not italicize every line or shrink useful facts into decoration |
| Cream / forest / sage | #f7f8f4 / #263c32 / #edf0e9; muted #69756c; frame #fffdf5 | Sage marks the human scene; dark CTA marks an action, not urgency |
| Architectural grid and off-center layouts | 1160px maximum editorial width and deliberate shared alignment | Keep facts aligned even where photos are offset |
| Tilted personal photos | Small controlled rotation for real memories | Catalogue covers, hotel evidence and room comparisons stay straight |
| Short headings and breathing room | One thought per scene | Use spacing within a composition instead of giant empty scroll intervals |
| Masked reveals, drift and cloud transitions | Soft, continuous visual movement | One signature reveal on detail; no compulsory film or cloud section |
| Founder-led welcome | Olivia's actual face and role | No unsupported friendship promises or repeating her life story |

### Type, spacing and alignment

- Listing opening heading: 44–64px desktop, 34–42px mobile. Trip destination heading: 48–72px desktop, 36–46px mobile. Scene headings: 36–52px desktop, 30–36px mobile. Clamp fluidly and permit natural wrapping.
- Body: 15–16px desktop, 16px mobile; line height 1.6–1.8. Essential facts: 14–16px. Decorative labels may use 10–12px; price, date and conditions may not.
- Main outer gutters: 64px on roomy desktop, 32px tablet, 20px mobile; cap content at 1160px. Align text and image edges to the same underlying columns.
- Scene spacing target: 80–112px desktop, 48–72px mobile. Inside a scene: heading to sentence 16–24px; sentence to image/control 24–40px; fact rows 12–20px.
- Text beside photos: about 32–38 characters per line, maximum 42. No body text stretching across the whole page.
- Use roughly seven columns for photography and four for copy, with one breathing column, when a split composition is appropriate.
- Images have declared dimensions and focal points. Frame movement cannot cover text, prices or controls. Keep substantive copy on solid backgrounds except the short hero title with tested contrast.
- Avoid arbitrary numbered eyebrows. Day ranges and chronological steps may have numbers because those numbers mean something.
- These are targets, not fixed heights. Short viewports, longer names, 200% zoom and expanded content must grow naturally.

## 4. All trips: /trips

### Area A — The invitation, already connected to the collection
Draft heading: **Where shall we go next?**
Optional one-line support: **Find the dates that work for you.**

Keep the opening compact. Start the first trip image within the opening composition rather than adding a separate full-screen hero. No door video, pinned scene, loading intro or autoplay carousel. Show the destination count only from actual published data.

### Area B — The departure collection
Desktop: two open photographic columns with equal card widths. A restrained offset of at most 32px in the second column's imagery gives editorial rhythm; align each row's information baseline by reserving equal media slots. Tablet/mobile: one column, image followed immediately by its facts.

Each entry contains:
1. Destination and specific place.
2. One image.
3. Optional mood line of 6–10 words.
4. Date and duration, or one honest pending-date message.
5. Starting price with confirmed currency and occupancy basis, or Price to be confirmed.
6. Relevant restriction such as Singles trip, and Flights extra when confirmed.
7. One descriptive link: Explore Punta Cana / Explore Bali.

Use image and text as one clearly labeled destination link where semantic markup permits; avoid redundant focus stops or nested buttons. No flip cards or hover-only facts. Hover may shift the image slightly, never hide or change price.

Order: confirmed upcoming departures first, by earliest date; then announced destinations with dates pending. Current first candidate is Punta Cana. A small shared “Dates coming soon” label can separate the pending collection; it is not another promotional section.

With four destinations, no search, mood quiz, budget slider or filter drawer. If the inventory grows beyond roughly eight meaningful choices, reconsider month/destination controls using actual content. Do not create controls with no useful results.

### Area C — Human help, then footer
One candid crop or Olivia portrait beside **Not sure which one?** and a working Ask Olivia link. Maximum one short sentence. This is a compact closing composition, not a second About page.

Listing copy target: approximately 100–150 visible words including current trip facts, excluding global navigation/footer. One complete card should be visible in the first desktop viewport; on a typical 390×844 mobile viewport the first image and destination should begin there. No artificial minimum-height intro.

## 5. Single trip: /trips/[slug]

### Scene 1 — You're here
One destination-specific landscape photograph, destination title and a single 6–12-word mood line. Example using existing copy: **Punta Cana — Good company. Caribbean time.**

Immediately adjoining the photograph, on solid cream:
- departure date;
- days / nights;
- price, currency and per-person room basis;
- eligibility, plus significant exclusions such as flights.

Primary action: **See dates & rooms**, linking to #booking. Quiet secondary jump: **Explore the days**. Essential facts and links appear without waiting for a reveal.

Opening media target: roughly 55–70svh desktop and 40–50svh mobile, subject to content fit. The facts may wrap underneath; never force them over a busy photo. No scroll-pinned opening.

After the hero, a compact section navigation offers The days / The stay / The people / Dates & rooms. Mobile uses a simple jump menu plus one bottom booking link after the hero exits. Avoid two stacked sticky bars on small screens.

### Scene 2 — The days, in one photographic composition
This combines mood, highlights and itinerary instead of giving each its own section.

Create up to three or four chapters grounded in the real itinerary. Each has:
- an experiential heading of 3–6 words;
- place and actual day range;
- one sentence of 12–22 words;
- one dominant photograph, with at most one small complementary frame.

Desktop: large image with a quiet caption column. Visitors choose a labeled chapter with accessible buttons or previous/next controls; no auto-advance. A short photo crossfade and directional movement echoes the homepage chapter handover. Do not consume multiple viewport heights just to advance chapters.

Mobile: one active chapter image, caption, visible position indicator and 44px-or-larger controls; optional swipe supplements buttons. Natural vertical page scroll remains free. Chapter height reserves enough space to avoid jumps when captions change.

All chapter names remain easy to discover. Use an accessible tab pattern if panels are mutually exclusive; implement its keyboard behavior and selected state. Server-render the content. With JavaScript unavailable, show the chapter summaries in ordinary document flow.

**Full day-by-day itinerary** opens directly below in a compact disclosure. Use scannable day rows with meals, included activities and free time where confirmed. Do not require a PDF download. A PDF is optional, supplemental and must match the page.

Do not fabricate named activities to fill three chapters. With only two verified moments, use two.

### Scene 3 — Somewhere to come back to
One actual property image and one room/interior image in a quiet asymmetric composition, not a masonry wall. Show the property name and location, a 12–20-word stay description, then two or three material room facts.

Place **Compare rooms** beside the scene. It expands a compact comparison: occupancy, bed arrangement, matching/private-room conditions, room-specific price and verified status. Choosing a room here updates the same selection used at #booking. Do not build a second independent booking form.

Never present the homepage's generic villa imagery as the booked hotel. If the property is unconfirmed, label that accurately and adjust the page's booking readiness. Do not assert a star rating from how the image looks.

### Scene 4 — A place at the table
Sage background, one genuine group photograph and a smaller Olivia portrait if the composition needs it. One sentence of 15–24 words about what she does as host.

Draft: **Coming on your own? Olivia is there to welcome you and get the group talking.**
Adjust this to the trip's actual eligibility and host.

One genuine short traveler quote may replace the supporting sentence when permission, attribution and relevance are available; it does not create another section. General-brand proof must not imply attendance on this exact trip.

Do not reproduce “80% arrive solo,” “10–18 travelers” or guarantees that everyone leaves as friends without trip-appropriate evidence. The About page's presence of a claim does not validate it for every departure.

### Scene 5 — Your place on the trip
A calm, solid-background decision area with a clear heading and two desktop columns: useful details on the left, dates/room selection on the right. Stack on mobile.

**Before you book** contains four concise disclosures:
- Included / not included.
- Arrival, departure and transfers.
- Room sharing and who can join.
- Payments, cancellations and travel requirements.

Questions reveal short lists or compact factual answers. Required legal wording may be longer and must not be cut merely to satisfy a word count. Prominent exclusions, price basis and material cancellation/deposit conditions also appear next to the booking action; do not hide them exclusively in a collapsed answer.

**Dates & rooms** shows:
- selected departure;
- eligible room options and total per person for that option;
- currency, occupancy and separately payable charges;
- deposit and payment schedule only when confirmed;
- concise material terms with working full-policy links;
- **Continue to booking**, labeled with the actual provider when verified.

“See dates & rooms” is an internal jump. “Continue to booking” is the external checkout handoff. Never call a redirect Booked or imply a reservation before payment succeeds.

A small Ask Olivia link includes destination context. Below the booking area, at most two relevant alternative destinations can appear as quiet footer links with thumbnails. Omit them when there is no useful alternative; no extra full-screen CTA.

### Visible copy budget
- Five scene headings; no introductory essays.
- One sentence per storytelling scene, not several paragraphs.
- Each journey chapter: one sentence, whether active or expanded in fallback.
- Approximately 160–220 narrative words across all chapter summaries, excluding facts, room options, navigation and disclosures.
- No fixed word ceiling for essential terms or the full itinerary. Reduce reading effort through structure, not omission.
- Each image must establish destination, activity, accommodation or human reassurance. Remove atmospheric filler that adds no new feeling or evidence.

## 6. Motion and transition specification

The current code uses Lenis duration 1.65, masked 2.2–2.4s heading reveals, GSAP scrub around 1–1.6, photographic drift and layered clouds. Match its softness while shortening the effort needed to browse.

| Element | Proposed behavior | Constraints |
| --- | --- | --- |
| Listing heading | Small masked rise, blur 4px to 0, 1.2–1.5s, power3.out | Never hide the catalogue while it finishes |
| Catalogue images | 20px rise and opacity, 0.7–0.9s; subtle scale on hover | Facts and links render immediately; no long stagger across all trips |
| Detail heading | Masked reveal, up to 1.6–2s; 0.12–0.18s between lines | Facts and booking action are independent and immediately usable |
| Journey entrance | Inset image opens toward its final frame; scrub 1–1.2 across the approach | No pin and no artificial spacer |
| Chapter selection | Image travels at most 24px and crossfades over 0.45–0.65s; caption fades after 0.08s | Input remains responsive; replace interrupted animations cleanly |
| Photographic drift | About -4% to +4%, scale 1.08–1.12, scrub 1.1–1.3 | Adequate crop overscan; none on booking controls or body text |
| Human memory frame | At most -3 to +3 degrees; 20–32px arrival, 1.2–1.5s | Keep essential comparisons straight |
| Disclosure | Immediate state change with optional 0.18–0.25s height/opacity transition | No blur; preserve focus and refresh scroll measurements |
| Route change | Normal navigation with a restrained page entrance | No simulated shared-element transition until genuinely implemented |

Use at most one inset-to-full signature moment. If verified destination footage is supplied, it can replace the journey scene's dominant media, with an optional brief cloud exit inside that scene. Do not add a separate film section just to repeat the homepage. The generic group film must not imply a particular destination.

Retain existing Lenis configuration for wheel scrolling if reused, native touch behavior (syncTouch false), and correct dialog/menu scroll handling. One scroll engine per mounted route; clean up ticker callbacks, GSAP contexts, observers and listeners on navigation. Use scoped selectors.

Reduced motion and short viewports: remove drift, blur, rotation, scrub and cloud travel; show final readable layouts. Listen for preference changes. With JavaScript absent or hydration failing, essential content and links remain visible. Avoid CSS that hides all content until motion initializes.

Video is muted only when autoplaying, has a poster and pause control, and stops out of view. Sound starts by deliberate action. No new video download where a photograph does the job.

## 7. Actual destination and content readiness

Values below describe current repository content, not current supplier availability.

| Destination / route | Existing homepage content | Planned initial state |
| --- | --- | --- |
| Punta Cana /trips/punta-cana | Oct 28–Nov 1, 2026; 5 days / 4 nights; from $1,799; singles trip; flights extra; existing link https://www.travelnliv.com/puntacana.html | First complete template candidate, pending verification |
| Brazil /trips/brazil | Rio de Janeiro; no confirmed next dates, duration or price | Honest destination preview |
| Phuket /trips/phuket | No confirmed next dates, duration or price | Honest destination preview |
| Bali /trips/bali | No confirmed next dates, duration or price | Honest destination preview |

A pending-date destination gets a shortened page: destination image + one line; clearly labeled next-departure status; any verified experience imagery; Ask about [destination]. No invented five-scene package, room selector or prices. Use the existing working email route initially. Do not display Join the waitlist until a real submission and confirmation flow exists.

Other required states: sold out -> Ask about future dates; ended departure -> archive notice and upcoming alternatives; unavailable booking provider -> useful status and contact path; unknown room availability -> verify before checkout, no remaining-place badge. Derive expiry from the departure's local dates and timezone.

### Content needed before a bookable trip goes live

1. Confirmed dates, nights, timezone, eligibility and host.
2. Real itinerary, included meals/activities, exclusions and free time.
3. Actual property, room categories, bed/occupancy arrangements and asset rights.
4. Currency, per-room-option price basis, deposits, payment schedule and mandatory extra costs.
5. Booking provider URL/identifiers, room/departure mapping and actual availability source.
6. Current cancellation/transfer terms and other required booking policies.
7. Destination-specific photography/video and accurately attributed traveler evidence.

Existing media such as rio.webp, punta-beach.webp, phuket.webp, beach.webp and olivia.webp are inventory candidates. Filenames do not prove location, property identity or image rights. Verify each image before making a package claim.

Current homepage and About copy differ in specificity about meals, transfers and group size. Resolve those details against the actual trip/package before publishing; do not copy a broad site-wide claim into every departure.

## 8. Build architecture and integration

Use existing Next App Router, React, GSAP, Lenis and accessible UI primitives. No new animation framework or backend solely for this page work.

Proposed responsibilities:
- app/trips/page.tsx: server-rendered catalogue, metadata.
- app/trips/[slug]/page.tsx: typed lookup, unknown-slug 404, metadata and correct complete/preview state.
- app/trips/trips.css: scoped listing/detail rules; avoid further global overrides.
- lib/trips.ts: one validated source for catalogue, homepage summaries and detail records.
- components/trips/: trip collection, journey scene, room comparison, booking summary and scoped motion hook.
- Reuse shared navigation/footer styles through a small presentational boundary if needed. Do not import the whole homepage motion hook or redesign homepage sections.

Data model:
- Trip: slug, destination, region, short mood line, publication state, ordered images with alt/focal point/rights/provenance, verified chapters, stay, host, proof and disclosures.
- Departure: stable ID, start/end/local timezone, eligibility, duration, status, currency, room options, payment terms, verified booking target.
- Room option: stable ID, occupancy/bed basis, actual amount in minor currency units, mandatory charges, status and provider mapping.
- Every material claim: source and last verification date. Unknown values remain absent; not zero or a fictional default.
- Compute listing price from applicable confirmed departure/room data. Do not maintain a disconnected marketing price string.
- Separate destination content from departures so new dates do not require copied pages.

The booking provider remains responsible for payment and final availability. Verify whether the existing flow is WeTravel and its supported link parameters before encoding them. If a selection cannot be passed reliably, say it must be confirmed at checkout and avoid showing a fake live quote. Do not build custom payment collection or coupon eligibility into this design task.

Navigation:
- Global Find your trip and About trip links point to /trips when implemented.
- Preserve homepage #trips for existing links and its carousel section; add View all trips and route individual destinations to internal detail pages.
- Retain the homepage carousel's visual design and motion.
- /trips -> detail -> browser Back restores catalogue position. Deep links to #itinerary, #stay and #booking account for header height.
- Keep selected room/departure stable across disclosure and chapter interactions. Use non-sensitive URL selection parameters only where useful and supported.
- Provide real canonical URLs, destination-specific titles/descriptions and social images from configured production origin. Add structured data only for verified facts.

## 9. Implementation sequence

1. Content preparation: collect and verify Punta Cana package data; classify other destinations as previews. Confirm provider handoff and media provenance.
2. Shared data and route skeleton: build typed records, validation, server-rendered routes, metadata and preview/unknown states.
3. Listing: implement the compact invitation, four-destination collection and help close; then add restrained motion.
4. One complete detail page: implement Punta Cana's five scenes, full itinerary disclosure, rooms and booking mapping. Use verified content or keep the route explicitly nonbookable.
5. Other destinations: publish complete pages only when source content qualifies; otherwise build truthful previews using the same system.
6. Navigation integration: update trip destinations and global discovery links; preserve homepage/About visual behavior.
7. Validation and review: responsive checks, accessibility, motion lifecycle, factual consistency, provider handoff and build checks.
8. Publication after implementation is requested: preview and review the result, push product code on its feature branch, then deploy through the existing project workflow. This planning task does not deploy product changes.

## 10. Acceptance and critique checks

- Listing has three main areas; full detail has five main scenes. No stacked mini-essays or repeated trust/CTA blocks.
- At 390×844, catalogue choices start in the first screen; detail key facts are within the hero and immediately following fact strip.
- A quick visitor can reach price, dates, room choices and itinerary without completing motion sequences.
- At 320, 390, 768 and 1440px and at 200% zoom: no cut-off copy, accidental horizontal page overflow, covered focus or overlapping sticky controls.
- Photos keep sensible focal points; hotel and activity images match the actual claims.
- Chapter buttons, disclosures, jump links and booking controls work by keyboard; visible focus, correct roles/state and readable contrast.
- No essential hover-only information. Mobile bottom action respects safe-area and keyboard space and disappears while the actual booking action is in view.
- Reduced-motion, no-JavaScript, failed video and slow-image conditions still expose useful content and navigation.
- Expanding details, choosing rooms, navigating away/back and resizing do not leave stale ScrollTriggers or shift the wrong section.
- Prices, dates, occupancy, exclusions and availability agree across listing, detail and provider. No test payment is needed to verify a handoff.
- Build and type checks pass; interaction tests cover meaningful selection, preview states, unknown slugs and booking-link behavior.
- Load only the opening image eagerly. Lazy-load later media; reserve sizes; inspect real performance before claiming a score.
- Self-critique: if the page feels like a brochure, cut repeated copy; if it feels like a checkout catalogue, restore photographic space; if it feels slow, remove a scroll dependency before changing the brand.

## 11. Decisions settled and still open

Settled by the brief: existing brand, compact copy, photo-led experience, catalogue + individual routes, no lengthy section stack, no invented facts.

Proposed here: three listing areas; five detail scenes; interactive journey chapters; factual disclosures; shared trip data; first full template based on Punta Cana; previews for unconfirmed destinations.

Still needed for implementation: confirmed package content and assets, live booking target and mapping, and review of this specific design proposal. Missing content does not prevent building the common structure, but it prevents presenting an unverified package as bookable.

## Plan history
- First GitHub checkpoint: initial research adaptation and route/page direction.
- This revision: incorporated the explicit no-long-sections/no-multiple-paragraphs constraint; consolidated detail to five scenes; added motion, spacing, content states, integration and acceptance criteria.
