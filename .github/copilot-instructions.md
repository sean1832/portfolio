````instructions
# Portfolio Project - AI Coding Agent Instructions

## Project Overview

This is a **Svelte 5 + SvelteKit** portfolio site showcasing architectural works with interactive algorithmic components, generative systems, and creative coding elements. Built as a fully static, pre-rendered site.

## Key Technologies & Versions

- **Svelte 5** (runes syntax: `$props()`, `$state`, `$derived`, `$effect`)
- **SvelteKit** with `@sveltejs/adapter-static` (entire site pre-rendered)
- **Tailwind CSS v4** via `@tailwindcss/vite` (NOT PostCSS)
- **mode-watcher** for theme management
- TypeScript strict mode, ESLint + Prettier

## Architecture & Structure

### Component Organization (Atomic Design)

```
src/lib/components/
├── atoms/          # Minimal UI elements
├── icons/          # SVG icon components (github, linkedin, youtube, etc.)
├── molecules/      # decoder, gallery-item, lazy-image, pixelated-reveal, theme-toggle
├── organisms/      # distortion-field, navbar, footer (complex interactive components)
└── ui/             # Base UI components (button)
```

### Algorithm Library Pattern

**Critical Design Decision**: Performance-critical algorithms are **pure TypeScript classes** in `src/lib/algorithms/`, separated from Svelte components for testability and reusability. Components are thin wrappers that handle lifecycle and DOM binding.

Current algorithms:

- `text-animator.ts` - Text decoding effects with Strategy pattern (see below)

### Svelte 5 Component Patterns

#### Props Declaration (Svelte 5 Runes)

**Modern syntax** (use for all new components):

```typescript
interface Props {
    class?: string;
    variant?: 'default' | 'ghost';
}
let { class: className = '', variant = 'default' }: Props = $props();
```

**Legacy syntax** (AVOID - migrate existing components to runes):

```typescript
export let boidCount = 600;  // OLD STYLE - DO NOT USE
```

#### Class Name Handling

Always use this pattern for components accepting custom classes:

```typescript
interface Props {
    class?: string;  // Define in interface
}
let { class: className = '' }: Props = $props();

// In template:
<div class={cn("base-classes", className)}>
```

The `cn()` utility (from `$lib/utils`) merges Tailwind classes correctly using `twMerge` + `clsx`.

### Canvas Animation Pattern

Reference `distortion-field.svelte` for the canonical approach:

```typescript
onMount(() => {
    // 1. Initialize canvas, get context
    ctx = canvas.getContext('2d');

    // 2. Set up physics buffers (use Float32Array for performance)
    physicsData = new Float32Array(pointCount * STRIDE);

    // 3. Start animation loop
    animationFrameId = requestAnimationFrame(animate);
});

function animate(currentTime: number) {
    const deltaTime = (currentTime - lastTime) / 1000; // ms to seconds
    // ... update physics & render
    animationFrameId = requestAnimationFrame(animate);
}

// 4. CRITICAL: Clean up on destroy
onDestroy(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
});
```

**Key principles**:

- Use `performance.now()` for delta time calculations
- Store animation frame ID and cancel in `onDestroy`
- Use typed arrays (`Float32Array`) for physics data
- Always null-check canvas context before use

### Image & Video Asset Strategy (static-first)

Critical: All media assets are stored in `static/` as pre-optimized files. We do not run build-time image re-encoding with Vite. This keeps the build simple and ensures you serve the exact files you produce.

Key points:

- Place images & videos in `static/projects/[project-name]/`.
- Reference assets directly using root paths (e.g., `/projects/agentic/collage.avif`).
- A small manifest of tiny base64 placeholders is generated and stored at `static/placeholders.json`. Components read that manifest at runtime for blur-up placeholders.

Placeholder generation:

- Script: `scripts/generate-placeholders.js`
- Run: `npm run build:placeholders`
- Output: `static/placeholders.json` (maps `/projects/...` paths to base64 PNG data)

Usage pattern for images:

1. Place pre-optimized images in `static/projects/[project-name]/`
2. Run `npm run build:placeholders` (CI or locally)
3. Use `lazy-image.svelte` with `src="/projects/.."`. The component reads `static/placeholders.json` for the small placeholder.
4. `pixelated-reveal.svelte` progressively reveals the full image using the placeholder.

Usage pattern for videos:

1. Pre-encode videos externally (AV1 WebM + H.264 MP4 recommended)
2. Place videos in `static/projects/[project-name]/`
3. Generate posters as part of `npm run build:vid` (ffmpeg pipeline)
4. Reference using root paths in project data (e.g., `/projects/foo.AV1.webm`), and use posters at `/projects/foo-poster.webp`

Constraints & recommendations:

- No build-time image re-encoding (we intentionally removed `vite-imagetools`).
- Dual-codec for videos is recommended for broad compatibility (WebM + MP4).
- Posters and placeholders are pre-generated; components read the static manifest.

### Strategy Pattern

Used for algorithm variations (see `text-animator.ts`):

```typescript
interface IDecoderStrategy {
    scramble(state: string[], target: string, progress: number): string[];
}

// Concrete implementations:
class ScrambleStrategy implements IDecoderStrategy { ... }  // Random chars
class ShuffleStrategy implements IDecoderStrategy { ... }   // Shuffled target chars
```

Components can switch strategies at runtime (see `decoder.svelte` variant prop).

## Development Workflow

### Commands

```bash
npm run dev              # Vite dev server (HMR enabled)
npm run build            # Build static site → build/
npm run preview          # Preview production build
npm run check            # Type check (svelte-check + tsc)
npm run format           # Format all files (Prettier)
npm run lint             # Lint (ESLint + Prettier check)
npm run build:placeholders  # Generate `static/placeholders.json`
```

### Build Process

1. SvelteKit adapter-static pre-renders all routes (`+layout.ts`: `export const prerender = true`)
2. Outputs to `build/` directory
3. Immutable hashed assets in `build/_app/immutable/`
4. Deploy entire `build/` folder to static host

### Path Aliases

- `$lib` → `src/lib/` (SvelteKit default)
- `$static` → `static/*` (configured in `svelte.config.js`)

**Examples**:

```typescript
import favicon from '$static/favicon.svg';
import { cn } from '$lib/utils';
```

## Coding Conventions

### TypeScript Patterns

- **Strict mode enabled** (no implicit any)
- Define `interface Props` for all component props
- Configuration objects use interfaces: `TextAnimatorConfig`, `ImageAsset`
- Type utilities in `utils.ts`: `WithoutChild`, `WithElementRef`, `WithoutChildrenOrChild`

### Performance Optimization

1. **Typed Arrays**: Use `Float32Array` for physics simulations (see `distortion-field.svelte`)
2. **Lazy Loading**: Images load on intersection observer (via `pixelated-reveal.svelte`)
3. **Frame Budgeting**: Use delta time for frame-rate independence
4. **Progressive Enhancement**: Start with low-quality placeholders, progressively reveal

### SSR Safety

Always check for browser context before using window/DOM APIs:

```typescript
let windowWidth = 1024;  // Default fallback
if (typeof window !== 'undefined') {
    windowWidth = window.innerWidth;
}
```

### Theme Management

Uses `mode-watcher` library for dark mode. Access via:

```typescript
import { toggleMode } from 'mode-watcher';
```

## Critical Gotchas

1. **Svelte 5 Migration**: Some components still use `export let` instead of `$props()` - migrate to runes when touching them
2. **Tailwind v4 Setup**: Uses `@tailwindcss/vite` plugin (in `vite.config.ts`), NOT PostCSS config
3. **Canvas Context Null Checks**: Always verify `ctx` before use in canvas components
4. **Image Paths**: Store assets in `static/projects/` and reference them by root path (`/projects/...`)
5. **Static Site Constraints**: No server-side logic, entire site pre-rendered at build time
6. **Path Aliases**: `$static` works for importing JSON manifests; prefer root `/` paths in templates

## Testing Approach

**Current state**: No test infrastructure configured.

**When adding tests**:

- Use Vitest (already compatible with Vite setup)
- Test algorithm classes (e.g., `text-animator.ts`) independently from Svelte components
- Mock canvas context for visual components
- Use `@testing-library/svelte` for component tests

## Key Files Reference

- `src/lib/algorithms/text-animator.ts` - Strategy pattern implementation
- `scripts/generate-placeholders.js` - Generates `static/placeholders.json` (placeholder manifest)
- `static/placeholders.json` - Generated manifest mapping `/projects/...` paths to base64 placeholders
- `src/lib/components/molecules/decoder.svelte` - Algorithm/component integration example
- `src/lib/components/molecules/lazy-image.svelte` - Image component (reads placeholders manifest)
- `src/lib/components/molecules/lazy-video.svelte` - Video component (uses static paths and posters)
- `src/lib/components/molecules/video-player.svelte` - Low-level video player (takes <source> children, used internally)
- `src/lib/components/organisms/distortion-field/distortion-field.svelte` - Canvas animation pattern
- `src/lib/components/molecules/pixelated-reveal.svelte` - Progressive image loading
- `src/lib/types/project.ts` - Media interface with JSDoc for video patterns
- `src/lib/utils.ts` - Tailwind merge utility + type helpers

````

# Portfolio Project - AI Coding Agent Instructions

## Project Overview

This is a **Svelte 5 + SvelteKit** portfolio site showcasing architectural works with interactive algorithmic components, generative systems, and creative coding elements. Built as a fully static, pre-rendered site.

## Key Technologies & Versions

- **Svelte 5** (runes syntax: `$props()`, `$state`, `$derived`, `$effect`)
- **SvelteKit** with `@sveltejs/adapter-static` (entire site pre-rendered)
- **Tailwind CSS v4** via `@tailwindcss/vite` (NOT PostCSS)
- **vite-imagetools** for responsive image optimization
- **mode-watcher** for theme management
- TypeScript strict mode, ESLint + Prettier

## Architecture & Structure

### Component Organization (Atomic Design)

```
src/lib/components/
├── atoms/          # Minimal UI elements
├── icons/          # SVG icon components (github, linkedin, youtube, etc.)
├── molecules/      # decoder, gallery-item, lazy-image, pixelated-reveal, theme-toggle
├── organisms/      # distortion-field, navbar, footer (complex interactive components)
└── ui/             # Base UI components (button)
```

### Algorithm Library Pattern

**Critical Design Decision**: Performance-critical algorithms are **pure TypeScript classes** in `src/lib/algorithms/`, separated from Svelte components for testability and reusability. Components are thin wrappers that handle lifecycle and DOM binding.

Current algorithms:

- `text-animator.ts` - Text decoding effects with Strategy pattern (see below)

### Svelte 5 Component Patterns

#### Props Declaration (Svelte 5 Runes)

**Modern syntax** (use for all new components):

```typescript
interface Props {
    class?: string;
    variant?: 'default' | 'ghost';
}
let { class: className = '', variant = 'default' }: Props = $props();
```

**Legacy syntax** (AVOID - migrate existing components to runes):

```typescript
export let boidCount = 600;  // OLD STYLE - DO NOT USE
```

#### Class Name Handling

Always use this pattern for components accepting custom classes:

```typescript
interface Props {
    class?: string;  // Define in interface
}
let { class: className = '' }: Props = $props();

// In template:
<div class={cn("base-classes", className)}>
```

The `cn()` utility (from `$lib/utils`) merges Tailwind classes correctly using `twMerge` + `clsx`.

### Canvas Animation Pattern

Reference `distortion-field.svelte` for the canonical approach:

```typescript
onMount(() => {
    // 1. Initialize canvas, get context
    ctx = canvas.getContext('2d');

    // 2. Set up physics buffers (use Float32Array for performance)
    physicsData = new Float32Array(pointCount * STRIDE);

    // 3. Start animation loop
    animationFrameId = requestAnimationFrame(animate);
});

function animate(currentTime: number) {
    const deltaTime = (currentTime - lastTime) / 1000; // ms to seconds
    // ... update physics & render
    animationFrameId = requestAnimationFrame(animate);
}

// 4. CRITICAL: Clean up on destroy
onDestroy(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
});
```

**Key principles**:

- Use `performance.now()` for delta time calculations
- Store animation frame ID and cancel in `onDestroy`
- Use typed arrays (`Float32Array`) for physics data
- Always null-check canvas context before use

### Image System

**Critical**: Images use pre-optimized source files with tiny placeholders for progressive loading via `image-registry.ts`:

```typescript
// In image-registry.ts - No srcset re-encoding (source images are pre-optimized)
const originalImages = import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    import: 'default'
});

// Tiny base64 placeholders for blur-up effect
const placeholders = import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    query: { as: 'base64', format: 'png', w: '16' }
});
```

**Usage pattern**:

1. Place pre-optimized images in `src/lib/assets/projects/[project-name]/`
2. Use `lazy-image.svelte` component with filename prop
3. Component gets original image URL + tiny placeholder from registry
4. Images are progressively revealed via `pixelated-reveal.svelte` with mosaic effect

### Video Registry System

**Critical**: Videos use `video-registry.ts` for **URL resolution only** (NO optimization—videos must be pre-encoded):

```typescript
// In video-registry.ts
const videos = import.meta.glob('/src/lib/assets/**/*.{mp4,webm}', {
    eager: false,  // Lazy load to avoid bundle bloat
    import: 'default'
});

export function getVideo(primaryFilename: string, fallbackFilename: string, posterFilename?: string): VideoAsset | null
```

**Usage pattern** (NEW - recommended for consistency):

1. **Pre-encode videos** externally (AV1 WebM + H.264 MP4 for browser compatibility)
2. Place videos in `src/lib/assets/projects/[project-name]/`
3. Generate posters: `npm run build:vid` (creates WebP posters via ffmpeg)
4. Reference via **path strings** in project data files:
   ```typescript
   {
       type: 'video',
       src: '/projects/boundary-expansion.av1.webm',
       fallbackSrc: '/projects/boundary-expansion.h264.mp4',
       posterSrc: '/projects/boundary-expansion-poster.webp',
       alt: 'video description'
   }
   ```
5. Layout components auto-detect path-based videos and use `lazy-video-registry.svelte`

**Constraints**:

- **No build-time optimization** (unlike images—`vite-imagetools` doesn't support video)
- **Dual-codec required**: Must provide both `src` and `fallbackSrc` (any combination: WebM, MP4, OGG)
- **MIME types auto-detected**: Component detects video format from file extension (.webm → video/webm, .mp4 → video/mp4, .ogg/.ogv → video/ogg)
- **Manual encoding workflow**: Use ffmpeg/HandBrake pre-build for desired quality/bitrate
- **Posters integrated**: `posterSrc` uses existing `image-registry.ts` for optimization

**Legacy pattern** (backward compatible):

```typescript
// ESM imports (still supported for existing projects)
import video from '$lib/assets/projects/my-video.av1.webm';
import videoFallback from '$lib/assets/projects/my-video.h264.mp4';

{
    type: 'video',
    src: video,  // Vite-resolved URL
    fallbackSrc: videoFallback
}
```

**Video encoding recommendations**:

- **Primary codec options**:
  - **AV1 WebM** (`.av1.webm`): Lower bitrate, modern browsers (Chrome, Firefox, Edge)
  - **VP9 WebM** (`.webm`): Good compression, wide support
  - **H.264 MP4** (`.h264.mp4`): Universal compatibility
- **Fallback codec**: Always provide H.264 MP4 for Safari/older browsers
- **Naming convention** (flexible): `[name]_[resolution]_[bitrate].[codec].[ext]`
  - Example: `boundary-expansion_1080p_128kbps.av1.webm` (primary)
  - Example: `boundary-expansion_1080p_768kbps.h264.mp4` (fallback)
- **Poster naming**: `[video-name]-poster.webp` (auto-generated via `npm run build:vid`)
- **No naming assumptions**: Registry requires explicit `fallbackSrc` parameter (no auto-pairing)

### Strategy Pattern

Used for algorithm variations (see `text-animator.ts`):

```typescript
interface IDecoderStrategy {
    scramble(state: string[], target: string, progress: number): string[];
}

// Concrete implementations:
class ScrambleStrategy implements IDecoderStrategy { ... }  // Random chars
class ShuffleStrategy implements IDecoderStrategy { ... }   // Shuffled target chars
```

Components can switch strategies at runtime (see `decoder.svelte` variant prop).

## Development Workflow

### Commands

```bash
npm run dev              # Vite dev server (HMR enabled)
npm run build            # Build static site → build/
npm run preview          # Preview production build
npm run check            # Type check (svelte-check + tsc)
npm run format           # Format all files (Prettier)
npm run lint             # Lint (ESLint + Prettier check)
```

### Build Process

1. SvelteKit adapter-static pre-renders all routes (`+layout.ts`: `export const prerender = true`)
2. Outputs to `build/` directory
3. Immutable hashed assets in `build/_app/immutable/`
4. Deploy entire `build/` folder to static host

### Path Aliases

- `$lib` → `src/lib/` (SvelteKit default)
- `$static` → `static/*` (configured in `svelte.config.js`)

**Examples**:

```typescript
import favicon from '$static/favicon.svg';
import { cn } from '$lib/utils';
```

## Coding Conventions

### TypeScript Patterns

- **Strict mode enabled** (no implicit any)
- Define `interface Props` for all component props
- Configuration objects use interfaces: `TextAnimatorConfig`, `ImageAsset`
- Type utilities in `utils.ts`: `WithoutChild`, `WithElementRef`, `WithoutChildrenOrChild`

### Performance Optimization

1. **Typed Arrays**: Use `Float32Array` for physics simulations (see `distortion-field.svelte`)
2. **Lazy Loading**: Images load on intersection observer (via `pixelated-reveal.svelte`)
3. **Frame Budgeting**: Use delta time for frame-rate independence
4. **Progressive Enhancement**: Start with low-quality placeholders, progressively reveal

### SSR Safety

Always check for browser context before using window/DOM APIs:

```typescript
let windowWidth = 1024;  // Default fallback
if (typeof window !== 'undefined') {
    windowWidth = window.innerWidth;
}
```

### Theme Management

Uses `mode-watcher` library for dark mode. Access via:

```typescript
import { toggleMode } from 'mode-watcher';
```

## Critical Gotchas

1. **Svelte 5 Migration**: Some components still use `export let` instead of `$props()` - migrate to runes when touching them
2. **Tailwind v4 Setup**: Uses `@tailwindcss/vite` plugin (in `vite.config.ts`), NOT PostCSS config
3. **Canvas Context Null Checks**: Always verify `ctx` before use in canvas components
4. **Image Paths**: Use glob patterns in `image-registry.ts`, reference via `/projects/...` path
5. **Static Site Constraints**: No server-side logic, entire site pre-rendered at build time
6. **Path Aliases**: `$static` only works for imports, not in HTML `src` attributes (use `/` root path instead)

## Testing Approach

**Current state**: No test infrastructure configured.

**When adding tests**:

- Use Vitest (already compatible with Vite setup)
- Test algorithm classes (e.g., `text-animator.ts`) independently from Svelte components
- Mock canvas context for visual components
- Use `@testing-library/svelte` for component tests

## Key Files Reference

- `src/lib/algorithms/text-animator.ts` - Strategy pattern implementation
- `src/lib/helpers/image-registry.ts` - vite-imagetools integration for images
- `src/lib/helpers/video-registry.ts` - Lazy glob-based video URL resolution
- `src/lib/components/molecules/decoder.svelte` - Algorithm/component integration example
- `src/lib/components/molecules/lazy-image.svelte` - Image component using registry (path-based)
- `src/lib/components/molecules/lazy-video.svelte` - Video component using registry (path-based, mirrors lazy-image)
- `src/lib/components/molecules/video-player.svelte` - Low-level video player (takes <source> children, used internally)
- `src/lib/components/organisms/distortion-field/distortion-field.svelte` - Canvas animation pattern
- `src/lib/components/molecules/pixelated-reveal.svelte` - Progressive image loading
- `src/lib/types/project.ts` - Media interface with JSDoc for video patterns
- `src/lib/utils.ts` - Tailwind merge utility + type helpers
