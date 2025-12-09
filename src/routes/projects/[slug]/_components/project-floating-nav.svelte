<script lang="ts">
	import { designProjects } from '$lib/data/designs';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ChevronsLeft from '@lucide/svelte/icons/chevrons-left';
	import ChevronsRight from '@lucide/svelte/icons/chevrons-right';
	import { cn } from '$lib/utils';
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		currentSlug: string;
		class?: string;
	}

	let { currentSlug, class: className }: Props = $props();

	// Find current index and adjacent projects
	let currentIndex = $derived(designProjects.findIndex((p) => p.slug === currentSlug));
	let prevProject = $derived(currentIndex > 0 ? designProjects[currentIndex - 1] : null);
	let nextProject = $derived(
		currentIndex < designProjects.length - 1 ? designProjects[currentIndex + 1] : null
	);

	// Hover states for expand effect (desktop)
	let isPrevHovered = $state(false);
	let isNextHovered = $state(false);

	// Mobile swipe hint state
	let showSwipeHint = $state(false);
	const HINT_STORAGE_KEY = 'portfolio-swipe-hint-seen';
	const HINT_DURATION = 3000; // How long to show the hint
	const HINT_COOLDOWN = 7 * 24 * 60 * 60 * 1000; // expires in 7 days

	// Boundary feedback state (first/last project)
	let boundaryMessage = $state<string | null>(null);
	let boundaryTimeout: ReturnType<typeof setTimeout> | null = null;

	function showBoundaryFeedback(message: string) {
		boundaryMessage = message;
		if (boundaryTimeout) clearTimeout(boundaryTimeout);
		boundaryTimeout = setTimeout(() => {
			boundaryMessage = null;
		}, 1500);
	}

	// Mobile swipe detection
	let touchStartX = 0;
	let touchStartY = 0;
	const SWIPE_THRESHOLD = 80; // Minimum horizontal distance to trigger
	const SWIPE_ANGLE_THRESHOLD = 30; // Max vertical movement relative to horizontal

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
		touchStartY = e.touches[0].clientY;
	}

	function handleTouchEnd(e: TouchEvent) {
		const touchEndX = e.changedTouches[0].clientX;
		const touchEndY = e.changedTouches[0].clientY;

		const deltaX = touchEndX - touchStartX;
		const deltaY = Math.abs(touchEndY - touchStartY);

		// Only trigger if horizontal swipe is significant and mostly horizontal
		if (
			Math.abs(deltaX) > SWIPE_THRESHOLD &&
			deltaY < Math.abs(deltaX) * Math.tan((SWIPE_ANGLE_THRESHOLD * Math.PI) / 180)
		) {
			// Hide hint if user successfully swipes
			showSwipeHint = false;

			if (deltaX > 0) {
				if (prevProject) {
					window.location.href = `/projects/${prevProject.slug}`;
				} else {
					showBoundaryFeedback('First Project');
				}
			} else if (deltaX < 0) {
				if (nextProject) {
					window.location.href = `/projects/${nextProject.slug}`;
				} else {
					showBoundaryFeedback('Last Project');
				}
			}
		}
	}

	function dismissHint() {
		showSwipeHint = false;
	}

	// Check if device is mobile (viewport-based, works with emulation)
	function isMobileViewport() {
		return window.innerWidth < 768; // md breakpoint
	}

	// Check if device supports touch
	function isTouchDevice() {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	}

	onMount(() => {
		// Add swipe listeners on touch devices
		if (isTouchDevice()) {
			document.addEventListener('touchstart', handleTouchStart, { passive: true });
			document.addEventListener('touchend', handleTouchEnd, { passive: true });
		}

		// Show hint on mobile viewport if not seen before
		if (isMobileViewport()) {
			const lastSeen = localStorage.getItem(HINT_STORAGE_KEY);
			const now = Date.now();

			// check if key is missing or if cooldown has passed
			const shouldShow = !lastSeen || now - parseInt(lastSeen) > HINT_COOLDOWN;

			if (shouldShow && (prevProject || nextProject)) {
				// store current timestamp
				localStorage.setItem(HINT_STORAGE_KEY, now.toString());
				showSwipeHint = true;
				setTimeout(() => {
					showSwipeHint = false;
				}, HINT_DURATION);
			}
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined' && isTouchDevice()) {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchend', handleTouchEnd);
		}
		if (boundaryTimeout) clearTimeout(boundaryTimeout);
	});
</script>

<!-- Mobile Swipe Hint -->
{#if showSwipeHint}
	<button
		onclick={dismissHint}
		class={cn(
			'fixed bottom-8 left-1/2 z-50 -translate-x-1/2',
			'flex items-center gap-4 px-5 py-3',
			'border border-border bg-background/95 backdrop-blur-sm',
			'shadow-sm',
			'animate-in duration-500 fade-in slide-in-from-bottom-4',
			'md:hidden'
		)}
	>
		<ChevronsLeft class="h-4 w-4 animate-pulse text-muted-foreground" />
		<span class="text-[9px] font-semibold tracking-[0.2em] text-foreground uppercase">
			Swipe to Navigate
		</span>
		<ChevronsRight class="h-4 w-4 animate-pulse text-muted-foreground" />
	</button>
{/if}

<!-- Boundary Feedback (First/Last Project) -->
{#if boundaryMessage}
	<div
		class={cn(
			'fixed bottom-6 left-1/2 z-50 -translate-x-1/2',
			'px-6 py-3',
			'border border-border bg-background',
			'shadow-sm',
			'animate-in duration-200 fade-in slide-in-from-bottom-4',
			'md:hidden'
		)}
	>
		<span class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
			{boundaryMessage}
		</span>
	</div>
{/if}

<!-- Previous Project - Left Side (Desktop only) -->
{#if prevProject}
	<a
		href="/projects/{prevProject.slug}"
		data-sveltekit-reload
		class={cn(
			'fixed top-1/2 left-0 z-40 -translate-y-1/2',
			'hidden items-center gap-1.5 py-2 pr-2.5 pl-1.5 md:flex',
			'border-y border-r border-border/40 bg-background/80',
			'opacity-50 hover:border-border hover:bg-background hover:opacity-100',
			'transition-all duration-200',
			'group',
			className
		)}
		onmouseenter={() => (isPrevHovered = true)}
		onmouseleave={() => (isPrevHovered = false)}
		aria-label="Previous project: {prevProject.name}"
	>
		<ArrowLeft class="h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-foreground" />
		<span
			class={cn(
				'overflow-hidden text-[10px] font-semibold tracking-[0.15em] whitespace-nowrap uppercase transition-all duration-200',
				'text-muted-foreground group-hover:text-foreground',
				isPrevHovered ? 'max-w-48 opacity-100' : 'max-w-0 opacity-0'
			)}
		>
			{prevProject.name}
		</span>
	</a>
{/if}

<!-- Next Project - Right Side (Desktop only) -->
{#if nextProject}
	<a
		href="/projects/{nextProject.slug}"
		data-sveltekit-reload
		class={cn(
			'fixed top-1/2 right-0 z-40 -translate-y-1/2',
			'hidden items-center gap-1.5 py-2 pr-1.5 pl-2.5 md:flex',
			'border-y border-l border-border/40 bg-background/80',
			'opacity-50 hover:border-border hover:bg-background hover:opacity-100',
			'transition-all duration-200',
			'group',
			className
		)}
		onmouseenter={() => (isNextHovered = true)}
		onmouseleave={() => (isNextHovered = false)}
		aria-label="Next project: {nextProject.name}"
	>
		<span
			class={cn(
				'overflow-hidden text-[10px] font-semibold tracking-[0.15em] whitespace-nowrap uppercase transition-all duration-200',
				'text-muted-foreground group-hover:text-foreground',
				isNextHovered ? 'max-w-48 opacity-100' : 'max-w-0 opacity-0'
			)}
		>
			{nextProject.name}
		</span>
		<ArrowRight class="h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-foreground" />
	</a>
{/if}
