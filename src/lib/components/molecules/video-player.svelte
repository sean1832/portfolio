<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import PixelatedReveal from './pixelated-reveal.svelte';
	import VideoLoader from '../atoms/loader.svelte';
	import { onMount } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
		style?: string;
		/** Path to poster image in static folder (e.g., "/projects/video-poster.webp") */
		poster?: string;
		/** Aspect ratio to maintain container dimensions (e.g., "16/9") */
		aspectRatio?: string;
	}
	let { children, class: className, poster, style, aspectRatio }: Props = $props();

	// Compute container style with aspect ratio
	let containerStyle = $derived(
		[aspectRatio ? `aspect-ratio: ${aspectRatio}` : '', style].filter(Boolean).join('; ')
	);

	// Get poster placeholder from pre-generated manifest
	let posterPlaceholder = $state<string | undefined>(poster);

	onMount(async () => {
		if (poster) {
			try {
				const response = await fetch('/placeholders.json');
				const placeholders = await response.json();
				posterPlaceholder = placeholders[poster] ?? poster;
			} catch (e) {
				// Fallback to poster if manifest doesn't exist
				posterPlaceholder = poster;
			}
		}
	});

	let isPlaying = $state(false);
	const lazyPlay: Action<HTMLVideoElement> = (node) => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// force browser to load the source
						node.preload = 'auto';

						// play the video
						node
							.play()
							.then(() => {
								isPlaying = true;
							})
							.catch(() => {
								// Silent catch: Auto-play policies or
								// Low Power Mode interactions are expected failures.
								// Still mark as playing to hide loader (user will see static poster)
								isPlaying = true;
							});

						// stop observing for performance optimization
						observer.unobserve(node);
						observer.disconnect();
					}
				});
			},
			{
				rootMargin: '200px', // start loading 200px before it enters the screen
				threshold: 0.01 // Trigger as soon as 1% is visible
			}
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	};
</script>

<div class="relative h-full w-full overflow-hidden" style={containerStyle}>
	{#if poster}
		<div
			class="pointer-events-none absolute inset-0 z-20 h-full w-full"
			class:opacity-0={isPlaying}
		>
			<PixelatedReveal
				src={poster}
				placeholder={posterPlaceholder ?? poster}
				alt="Video Poster"
				class="h-full w-full"
				style={containerStyle}
			/>
		</div>
	{/if}
	<video
		use:lazyPlay
		class={cn('h-full w-full object-cover', className)}
		{style}
		preload="none"
		muted
		loop
		playsinline
		disablePictureInPicture
		tabindex="-1"
		aria-hidden="true"
		controlsList="nodownload nofullscreen noremoteplayback"
		oncontextmenu={(e) => e.preventDefault()}
	>
		{@render children()}
	</video>
	<div class="absolute inset-0 z-10 bg-transparent"></div>

	<!-- Loading Animation Overlay (on top of everything, visible until video plays) -->
	{#if !isPlaying}
		<VideoLoader />
	{/if}
</div>
