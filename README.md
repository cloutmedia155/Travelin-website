# Travel & LIV Collective

Homepage for Olivia Owen’s personally hosted group trips. React 19, TypeScript, Vinext/Vite, GSAP ScrollTrigger, Lenis and Tailwind 4. This repository contains the application, local images, opening film, source copy, motion implementation and operating documentation.

## Run locally

Use Node 22.13 or later and pnpm 11.25.0 (the version pinned in `package.json`).

```sh
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

The portable development server defaults to http://localhost:5173. The managed Sites preview uses its own supervisor and port. No database, API key or environment secret is required by this homepage.

```sh
pnpm exec tsc --noEmit --incremental false
pnpm build
pnpm start
```

`pnpm start` serves the built Cloudflare worker locally; use the URL printed by Wrangler. The deployment target is Cloudflare Workers through Sites, not a static HTML export. See [starter operations](docs/starter-operations.md) for the included framework tooling.

## Where to edit

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Trips, FAQs, founder, video, gallery, booking and final CTA |
| `components/home/hero.tsx` | Approved three-stage hero copy and door scene |
| `components/home/experience.tsx` | Stay, days out and people chapters |
| `components/home/use-journey-motion.ts` | Scroll choreography, video seeking and reveals |
| `app/globals.css` | Base styles, components and responsive layouts |
| `app/journey.css` | Revised editorial layout and scroll scenes |
| `app/layout.tsx` | Metadata and root layout |
| `public/media/` | Local photography, clouds and door film |

## Design and handoff

- [Design rationale and section order](docs/design-and-copy.md)
- [Animation specification](docs/motion.md)
- [Editing, launch and verification](docs/handoff.md)
- [Asset provenance and outstanding content](ASSETS.md)
- [Pull request description](docs/pull-request.md)

Only the homepage is implemented. Trip buttons open the existing client trip page or an email inquiry. Three testimonial positions currently contain real group photos, explicitly labeled as awaiting video stories. No testimonials, booking availability or unconfirmed prices have been invented.

## Publishing and source control

Current requested GitHub destination: `cloutmedia155/Travelin-website`. This source tree is also maintained in the existing Sites source repository. Preserve the existing site identity in `.openai/hosting.json`; do not create another site just to update the homepage. Do not commit credentials, environment secrets, dependency folders or build caches.

The requested GitHub PR must be made from a feature branch, without overwriting unrelated repository content or merging automatically. If the target is empty, it first needs a baseline branch for a meaningful PR comparison. GitHub authentication belongs in the connected provider or the developer’s normal credential manager, never in this repository.
