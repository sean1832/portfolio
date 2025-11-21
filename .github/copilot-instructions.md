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

### Image Optimization System

**Critical**: Images use `vite-imagetools` for automatic optimization via `image-registry.ts`:

```typescript
// In image-registry.ts
const fullImages = import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp}', {
    eager: true,
    query: { as: 'srcset', format: 'webp', w: '320;640;1024;1440;1920;2560' }
});

const placeholders = import.meta.glob('/src/lib/assets/**/*.{jpg,jpeg,png,webp}', {
    eager: true,
    query: { as: 'base64', format: 'png', w: '16' }
});
```

**Usage pattern**:

1. Place images in `src/lib/assets/projects/[project-name]/`
2. Use `lazy-image.svelte` component with filename prop
3. Component automatically gets srcset, placeholder, and fallback from registry
4. Images are progressively revealed via `pixelated-reveal.svelte` with mosaic effect

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
- `src/lib/helpers/image-registry.ts` - vite-imagetools integration
- `src/lib/components/molecules/decoder.svelte` - Algorithm/component integration example
- `src/lib/components/organisms/distortion-field/distortion-field.svelte` - Canvas animation pattern
- `src/lib/components/molecules/pixelated-reveal.svelte` - Progressive image loading
- `src/lib/utils.ts` - Tailwind merge utility + type helpers
