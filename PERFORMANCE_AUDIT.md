# Performance Audit — Utsav 2026 Landing Page

## CRITICAL — Bundle Size (548 KB, over the 500 KB warning)

### 1. Code-split heavy libraries with `React.lazy()`

**Rule:** `bundle-dynamic-imports`

`framer-motion` (~140 KB), `gsap` (~90 KB), and `ogl` (~80 KB) are all bundled into one chunk. Sections below the fold (`ThemeAboutSection`, `GallerySection`, `PatronsSection`, `ContactSection`, etc.) should be lazy-loaded since users don't see them on initial paint.

```tsx
// App.tsx — instead of static imports for below-fold sections:
import { lazy, Suspense } from 'react'

const ThemeAboutSection = lazy(() => import('./sections/ThemeAboutSection'))
const GallerySection    = lazy(() => import('./sections/GallerySection'))
const SponsorsSection   = lazy(() => import('./sections/SponsorsSection'))
const PatronsSection    = lazy(() => import('./sections/PatronsSection'))
const ContactSection    = lazy(() => import('./sections/ContactSection'))
const FooterSection     = lazy(() => import('./sections/FooterSection'))

// Wrap in Suspense:
<Suspense fallback={null}>
  <ThemeAboutSection />
  <GallerySection />
  ...
</Suspense>
```

This alone could cut the initial JS payload by ~40-50%.

---

### 2. `react-icons` barrel import pulls in huge bundles

**Rule:** `bundle-barrel-imports`

In `src/sections/ContactSection.tsx` (line 2):

```tsx
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'
```

`react-icons/fa6` is a barrel file with ~1600 icons. While Vite tree-shakes well, the safer pattern is direct imports:

```tsx
import { FaFacebook } from 'react-icons/fa6/FaFacebook'
```

Or better — replace with inline SVGs (4 simple icons) to eliminate the `react-icons` dependency entirely (~30 KB saved).

---

## HIGH — Asset Optimization

### 3. SVG logo layers are extremely large (1.9 MB total for 7 SVGs)

**Rule:** `rendering-svg-precision`

Each `logo-path*.svg` is 76–428 KB. These are loaded **twice** (once in the intro overlay, once in the fixed navbar). Consider:

- Run `svgo` to optimize precision and remove metadata
- Combine layers into a single SVG with `<g>` groups
- For the small navbar copy (52px wide), use a single pre-rasterized PNG/WebP at 2x (104px) — no need for 7 separate files

### 4. Background PNG is 2.7 MB

`public/wallhaven-28g97y_1920x1080.png` appears unused in the code (only `wallhaven-yxy8zk_1920x1080.webp` at 276 KB is used). If unused, delete it. If used elsewhere, convert to WebP.

### 5. Hero video (7.1 MB) — no `poster` attribute

The `<video>` in `src/sections/HeroSection.tsx` (line 25) has no `poster`. Add a low-res poster image so users see something immediately while the video loads:

```tsx
<video poster="/hero-poster.webp" autoPlay loop muted playsInline preload="auto">
```

---

## MEDIUM-HIGH — Rendering Performance

### 6. DarkVeil WebGL shader runs on every frame, even when not visible

**Rule:** `rendering-content-visibility`

The `DarkVeil` canvas is `position: fixed` and renders a complex CPPN shader every single frame at full resolution. This is the biggest runtime perf concern. Suggestions:

- Lower `resolutionScale` to `0.5` — the shader is blurred/abstract, half-res looks identical
- Pause the animation loop when the tab is not visible (use `document.visibilitychange`)
- Consider rendering only every 2nd or 3rd frame (the animation runs at `speed: 0.5`, so 30fps is more than enough)

### 7. CountdownSection re-renders every 1 second

**Rule:** `rerender-use-ref-transient-values`

`src/sections/CountdownSection.tsx` (line 236) uses `setInterval(() => setTime(getTimeLeft()), 1000)` which triggers a full component re-render every second. The `RollDigit` components already use GSAP for animation. Consider:

- Using refs + direct DOM manipulation for the time display instead of React state
- Or memoize the `SubUnit` components with `React.memo` so only changed digits re-render

### 8. Duplicate `GlassCard` and `fadeUp` definitions (code duplication → bigger bundle)

`GlassCard`, `fadeUp`, and `hoverLift` are copy-pasted identically in both `src/sections/ThemeAboutSection.tsx` and `src/sections/PatronsSection.tsx`. Extract them to a shared module to eliminate ~2 KB of duplicated code and improve maintainability.

---

## MEDIUM — Re-render & Event Optimization

### 9. Inline style objects re-created every render

**Rule:** `rerender-memo-with-default-value`

Throughout `CountdownSection.tsx` and `HeroSection.tsx`, there are many inline `style={{ ... }}` objects. Each render creates new object references. For components that re-render frequently (like CountdownSection every 1s), hoist static style objects to module-level constants:

```tsx
const sectionStyle = { position: 'relative', width: '100%', ... } as const
```

### 10. `onMouseEnter`/`onMouseLeave` handlers create new closures on every render

**Rule:** `rerender-functional-setstate`

The "Explore Events" button in `src/sections/CountdownSection.tsx` (lines 373-383) uses inline event handlers that manipulate `style` directly. Since this component re-renders every second, these closures are recreated each time. Either use CSS `:hover` instead (preferred), or wrap in `useCallback`.

### 11. `ShinyText` runs `useAnimationFrame` unconditionally

**Rule:** `client-passive-event-listeners`

Every `ShinyText` instance runs an animation frame loop even when not in the viewport. With 5+ instances on the page, that's 5 animation frame callbacks running simultaneously. Add an `IntersectionObserver` to pause animation when off-screen.

---

## LOW-MEDIUM — Quick Wins

### 12. Missing `loading="lazy"` on images

The BMSCE logo in `ThemeAboutSection.tsx` (line 127) has `loading="lazy"` (good), but the navbar logo images in `LogoSection.tsx` do not. Since the navbar logo is visible immediately, that's fine — but the CircularGallery images loaded via WebGL should be deferred.

### 13. `gsap.registerPlugin(ScrollTrigger)` called in multiple files

Both `App.tsx` (line 17) and `CountdownSection.tsx` (line 4) call `gsap.registerPlugin(ScrollTrigger)`. This is idempotent but noisy — call it once in `main.tsx`.

### 14. Google Fonts blocking render

In `index.html` (lines 11-15), the fonts are loaded via a render-blocking `<link>`. Add `font-display: swap` by appending `&display=swap` (already done) and consider using `<link rel="preload">` for the font files directly, or load them via CSS `@font-face` with `font-display: optional` to prevent layout shift.

---

## Summary — Highest-Impact Changes (Ranked)

| # | Change | Est. Impact |
|---|--------|-------------|
| 1 | Lazy-load below-fold sections | **~200 KB** less initial JS |
| 2 | Lower DarkVeil `resolutionScale` to 0.5 | **~4x less GPU work** per frame |
| 3 | Run `svgo` on logo SVGs | **~1 MB** less to load |
| 4 | Add `poster` to hero video | **Instant perceived load** |
| 5 | Delete unused 2.7 MB PNG | **2.7 MB** saved |
| 6 | Replace react-icons with inline SVGs | **~30 KB** less JS |
| 7 | Extract shared GlassCard/fadeUp | **~2 KB** less + cleaner code |
| 8 | CSS `:hover` instead of JS hover handlers | Fewer re-render allocations |
