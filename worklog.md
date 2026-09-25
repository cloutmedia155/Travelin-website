# Worklog

### 1. `components/home/hero.tsx`
**Description:** Hero frame component containing the 3 sequential text stages, CTA, atmospheric clouds, and video.

#### Change A: Hero Frame 3 Headline Typography & Line Masks
* **Before:**
```tsx
<div className="hero-copy hero-action">
  <p className="hero-action-lead">Olivia comes on every trip to host, help, and get everyone talking.</p>
  <div className="hero-action-cta">
    <a className="button button-light" href="#trips">Find Your Trip <ArrowUpRight size={17} /></a>
    <p className="hero-action-note">4–5-star stays <span>·</span> Personally hosted by Olivia<br />Payment plans on most trips</p>
  </div>
</div>
```
* **After:**
```tsx
<div className="hero-copy hero-action">
  <h2 className="hero-action-lead">
    <span className="line-mask"><span className="action-line">Olivia comes on every trip</span></span>
    <span className="line-mask"><span className="action-line">to host, help,</span></span>
    <span className="line-mask"><span className="action-line">and get everyone talking.</span></span>
  </h2>
  <div className="hero-action-cta">
    <a className="button button-light" href="#trips">Find Your Trip <ArrowUpRight size={17} /></a>
    <p className="hero-action-note">4–5-star stays <span>·</span> Payment plans on most trips</p>
  </div>
</div>
```

---

### 2. `components/home/use-journey-motion.ts`
**Description:** Custom React hook managing Lenis kinetic smooth scrolling, GSAP ScrollTrigger timeline orchestration, and RAF synchronization.

#### Change A: Lenis Smooth Scroll Configuration
* **Before:**
```ts
const lenis = new Lenis({ duration: 1.25, smoothWheel: true, touchMultiplier: 1, syncTouch: false, anchors: { offset: -65 }, prevent: node => node.closest('[role="dialog"]') !== null || document.body.dataset.menuOpen === "true" });
```
* **After:**
```ts
const lenis = new Lenis({ duration: 1.65, smoothWheel: true, touchMultiplier: 1, syncTouch: false, anchors: { offset: -65 }, prevent: node => node.closest('[role="dialog"]') !== null || document.body.dataset.menuOpen === "true" });
```

#### Change B: Initial Page-Load Title Reveal Animation
* **Before:**
```ts
gsap.fromTo(".hero-line", { yPercent: 115, opacity: 0, rotate: 2, filter: "blur(6px)" }, { yPercent: 0, opacity: 1, rotate: 0, filter: "blur(0px)", duration: 1.8, stagger: .19, delay: .15, ease: "power3.out" });
```
* **After:**
```ts
gsap.fromTo(".hero-line", { yPercent: 115, opacity: 0, rotate: 2, filter: "blur(6px)" }, { yPercent: 0, opacity: 1, rotate: 0, filter: "blur(0px)", duration: 2.4, stagger: .24, delay: .2, ease: "power3.out" });
```

#### Change C: Hero ScrollTrigger Timeline Scrub & Frame Reveals
* **Before:**
```ts
const ht = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: 1.15 } });
ht.to(playhead, { time: 4.7, duration: .82, ease: "none", onUpdate: () => { wantedTime = playhead.time; seek(); } }, .025)
  .to(".hero-title", { y: -110, autoAlpha: 0, filter: "blur(7px)", duration: .16, ease: "power1.inOut" }, .09)
  .fromTo(".hero-intro", { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .12 }, .21)
  .fromTo(".intro-line", { yPercent: 105, filter: "blur(4px)" }, { yPercent: 0, filter: "blur(0px)", stagger: .018, duration: .12 }, .22)
  .to(".hero-intro", { y: -65, autoAlpha: 0, filter: "blur(5px)", duration: .13 }, .5)
  .fromTo(".hero-action", { y: 30, autoAlpha: 0, filter: "blur(4px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: .12 }, .62)
  .to(".hero-action", { y: -35, autoAlpha: 0, duration: .09 }, .85)
```
* **After:**
```ts
const ht = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: 1.6 } });
ht.to(playhead, { time: 4.7, duration: .82, ease: "none", onUpdate: () => { wantedTime = playhead.time; seek(); } }, .025)
  .to(".hero-title", { y: -110, autoAlpha: 0, filter: "blur(7px)", duration: .16, ease: "power1.inOut" }, .09)
  .fromTo(".hero-intro", { y: 45, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .16 }, .20)
  .fromTo(".intro-line", { yPercent: 105, filter: "blur(4px)" }, { yPercent: 0, filter: "blur(0px)", stagger: .025, duration: .16 }, .21)
  .to(".hero-intro", { y: -65, autoAlpha: 0, filter: "blur(5px)", duration: .14 }, .48)
  .fromTo(".hero-action", { y: 30, autoAlpha: 0, filter: "blur(4px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: .16 }, .60)
  .fromTo(".action-line", { yPercent: 105, filter: "blur(4px)" }, { yPercent: 0, filter: "blur(0px)", stagger: .025, duration: .16 }, .61)
  .to(".hero-action", { y: -35, autoAlpha: 0, duration: .10 }, .85)
```

#### Change D: Defensive Element Presence Checks
* **Before:**
```ts
ht.to(".hero-bottom", { autoAlpha: 0, duration: .08 }, .78)
  .to(".hero-count b", { scaleX: 1, duration: 1, ease: "none" }, 0);
...
et.to(".experience-progress b", { scaleX: 1, duration: 9.35, ease: "none" }, 0);
```
* **After:**
```ts
if (document.querySelector(".hero-bottom")) ht.to(".hero-bottom", { autoAlpha: 0, duration: .08 }, .78);
if (document.querySelector(".hero-count b")) ht.to(".hero-count b", { scaleX: 1, duration: 1, ease: "none" }, 0);
...
if (document.querySelector(".experience-progress b")) et.to(".experience-progress b", { scaleX: 1, duration: 9.35, ease: "none" }, 0);
```

---

### 3. `app/journey.css`
**Description:** Core stylesheet controlling layout dimensions, sticky stage pinning, typography rules, responsive breakpoints, and grid lines.

#### Change A: Hero Scroll Runway Height
* **Before:**
```css
.hero{height:400svh;background:#a3c4d6}
...
@media(max-width:700px){... .hero{height:360svh} ...}
```
* **After:**
```css
.hero{height:500svh;background:#a3c4d6}
...
@media(max-width:700px){... .hero{height:460svh} ...}
```

#### Change B: Hero Action Copy Styling & Typography Synchronization
* **Before:**
```css
.hero-action{top:auto;bottom:14%;left:7%;right:7%;translate:none;text-align:center;width:auto;max-width:none}
.hero-action-lead{font-size:clamp(16px,1.5vw,22px);max-width:540px;margin:0 auto 20px}
```
* **After:**
```css
.hero-action{top:29%;left:7%;bottom:24%;translate:none;width:auto;max-width:480px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;text-align:left}
.hero-title h1,.hero-intro p.hero-intro-lead,.hero-action-lead,.hero-action h2.hero-action-lead{font:400 clamp(26px,2.6vw,41px)/1.15 var(--serif)!important;letter-spacing:-.02em!important;color:#fff!important;text-shadow:0 2px 30px #23405220}
.hero-action-lead{margin:0;max-width:480px}
.hero-action-cta .hero-action-note{font-size:11px;line-height:2.1;margin-top:22px;max-width:440px}
.hero-action .button{min-width:200px}
```

#### Change C: Grid Overlay Styles
* **Before:** (Not present)
* **After:**
```css
.grid-overlay{position:fixed;inset:0;pointer-events:none;z-index:15;width:100%;height:100%;overflow:hidden}
.grid-overlay .grid-line{position:absolute;top:0;bottom:0;width:1px;background-color:var(--foreground);opacity:.12}
.grid-overlay .line-1{left:16.666%}
.grid-overlay .line-2{left:33.333%}
.grid-overlay .line-3{left:50%}
.grid-overlay .line-4{left:66.666%}
.grid-overlay .line-5{left:83.333%}
@media(max-width:700px){.grid-overlay .line-1,.grid-overlay .line-5{display:none}.grid-overlay .line-2{left:25%}.grid-overlay .line-3{left:50%}.grid-overlay .line-4{left:75%}}
```

#### Change D: Standardized Editorial Section Heights
* **Before:**
```css
.experience-intro{padding:180px 0;margin-bottom:0}
.people-heading{padding:140px 0;margin-bottom:0}
```
* **After:**
```css
.experience-intro,.people-heading{position:relative;display:grid;grid-template-columns:1fr 2fr;gap:7%;max-width:1160px;min-height:100svh;align-content:center;align-items:start;box-sizing:border-box;padding:100px 0;margin-bottom:0!important}
```

---

### 4. `package.json`
**Description:** Project manifest declaring npm scripts and dependencies.

#### Change A: Build Script Alignment for Vercel
* **Before:**
```json
"scripts": {
  "install:ci": "bash scripts/install-pnpm.sh",
  "dev": "node scripts/run-framework.mjs dev",
  "build": "node scripts/run-framework.mjs build",
  "start": "node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js dev --config dist/server/wrangler.json --local --persist-to .wrangler/state --ip 127.0.0.1 --inspector-port 0",
  "lint": "eslint . --ignore-pattern dist --ignore-pattern .next",
  "db:generate": "drizzle-kit generate"
}
```
* **After:**
```json
"scripts": {
  "install:ci": "bash scripts/install-pnpm.sh",
  "dev": "node scripts/run-framework.mjs dev",
  "build": "next build",
  "build:vinext": "node scripts/run-framework.mjs build",
  "start": "node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js dev --config dist/server/wrangler.json --local --persist-to .wrangler/state --ip 127.0.0.1 --inspector-port 0",
  "lint": "eslint . --ignore-pattern dist --ignore-pattern .next",
  "db:generate": "drizzle-kit generate"
}
```

#### Change B: Lockfile Specifier Alignment
* **Before:**
```json
"vinext": "^1.0.0-alpha.0"
```
* **After:**
```json
"vinext": "1.0.0-beta.5"
```

---

### 5. `vercel.json`
**Description:** Vercel deployment configuration.

* **Before:** (Not present)
* **After:**
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs"
}
```

---

### 6. `.github/workflows/deploy.yml`
**Description:** Redundant GitHub Actions deployment workflow.

* **Before:** Present, causing duplicate/failing workflow runs.
* **After:** Deleted; deployments are handled natively via Vercel's GitHub Git integration.

---

### 7. `components/home/experience.tsx`
**Description:** Experience section component containing the editorial intro copy and three horizontal chapter panels.

#### Change A: Independent Masked Line Structure for Editorial Headline
* **Before:**
```tsx
<div className="experience-intro-copy"><h2 className="editorial-heading">There’s a whole trip behind<br /><em>those laughing videos.</em></h2><p>The days out. The conversations over dinner. Someone getting everyone up to dance. Those are the moments we make room for, along with time to head off on your own or do nothing for a while.</p></div>
```
* **After:**
```tsx
<div className="experience-intro-copy">
  <h2 className="editorial-heading">
    <span className="line-mask"><span className="editorial-line">There’s a whole trip behind</span></span>
    <span className="line-mask"><em className="editorial-line">those laughing videos.</em></span>
  </h2>
  <p>The days out. The conversations over dinner. Someone getting everyone up to dance. Those are the moments we make room for, along with time to head off on your own or do nothing for a while.</p>
</div>
```

---

### 8. `components/home/use-journey-motion.ts` (Editorial Line Animation)
**Description:** Separated editorial heading animation from bulk heading tween into an independent, staggered line-by-line reveal.

#### Change A: Staggered Line Animation for *"There’s a whole trip behind those laughing videos."*
* **Before:**
```ts
gsap.utils.toArray<HTMLElement>(".editorial-heading, .trips-heading h2, .people-heading h2, .founder-copy h2, .faq-intro h2, .booking-section h2, .final-copy h2, .collage-title h2").forEach(el => {
  gsap.fromTo(el, { y: 48, autoAlpha: 0, clipPath: "inset(0 0 100% 0)", filter: "blur(3px)" }, { y: 0, autoAlpha: 1, clipPath: "inset(0 0 -4% 0)", filter: "blur(0px)", duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 87%", toggleActions: "play none none reverse" } });
});
```
* **After:**
```ts
const expLines = document.querySelectorAll<HTMLElement>(".experience-intro .editorial-line");
if (expLines.length > 0) {
  gsap.fromTo(expLines, { yPercent: 110, autoAlpha: 0, clipPath: "inset(0 0 100% 0)", filter: "blur(4px)" }, { yPercent: 0, autoAlpha: 1, clipPath: "inset(0 0 -4% 0)", filter: "blur(0px)", duration: 2.2, stagger: .26, ease: "power3.out", scrollTrigger: { trigger: ".experience-intro .editorial-heading", start: "top 87%", toggleActions: "restart reverse restart reverse" } });
}
const expP = document.querySelector<HTMLElement>(".experience-intro-copy p");
if (expP) {
  gsap.fromTo(expP, { y: 25, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: expP, start: "top 91%", toggleActions: "restart reverse restart reverse" } });
}
gsap.utils.toArray<HTMLElement>(".trips-heading h2, .people-heading h2, .founder-copy h2, .faq-intro h2, .booking-section h2, .final-copy h2, .collage-title h2").forEach(el => {
  gsap.fromTo(el, { y: 48, autoAlpha: 0, clipPath: "inset(0 0 100% 0)", filter: "blur(3px)" }, { y: 0, autoAlpha: 1, clipPath: "inset(0 0 -4% 0)", filter: "blur(0px)", duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 87%", toggleActions: "play none none reverse" } });
});
```

---

### 9. `app/journey.css` (Editorial Line Display Rules)
**Description:** Added `.editorial-line` to the hardware-accelerated `.line-mask` block transforms.

#### Change A: Class Selector Addition
* **Before:**
```css
.hero-line,.intro-line,.action-line{display:block;transform-origin:left bottom}
```
* **After:**
```css
.hero-line,.intro-line,.action-line,.editorial-line{display:block;transform-origin:left bottom}
```

---

### 10. `components/home/use-journey-motion.ts` (SplitText Paragraph Reveal)
**Description:** Applied GSAP + ScrollTrigger + SplitText line-reveal animation to the intro copy paragraph (`.experience-intro-copy p`) without modifying existing layout, typography, or styling.

#### Change A: SplitText Registration and Line Reveal Animation
* **Before:**
```ts
const expP = document.querySelector<HTMLElement>(".experience-intro-copy p");
if (expP) {
  gsap.fromTo(expP, { y: 25, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: expP, start: "top 91%", toggleActions: "restart reverse restart reverse" } });
}
```
* **After:**
```ts
const expIntroP = document.querySelector<HTMLParagraphElement>(".experience-intro-copy p");
let splitIntroP: SplitText | null = null;
if (expIntroP) {
  splitIntroP = new SplitText(expIntroP, { type: "lines, words" });
  gsap.set(splitIntroP.lines, { display: "inline" });
  gsap.set(splitIntroP.words, { display: "inline-block" });
  gsap.fromTo(splitIntroP.lines, {
    opacity: 0,
    filter: "blur(10px)"
  }, {
    opacity: 1,
    filter: "blur(0px)",
    duration: 2,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: expIntroP,
      start: "top 80%",
      toggleActions: "restart reverse restart reverse"
    }
  });
}
```


