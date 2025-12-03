<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import PixelatedReveal from './pixelated-reveal.svelte';
	import { getImage } from '$lib/helpers/image-registry';

	interface Props {
		children: Snippet;
		class?: string;
		style?: string;
		poster?: string;
	}
	let { children, class: className, poster, style }: Props = $props();

	const posterData = poster ? getImage(poster) : undefined;

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

<div class="relative h-full w-full overflow-hidden">
	{#if posterData}
		<div
			class="pointer-events-none absolute inset-0 z-20 h-full w-full"
			class:opacity-0={isPlaying}
		>
			<PixelatedReveal
				src={posterData.fallbackSrc}
				srcset={posterData.srcset}
				placeholder={posterData.placeholder}
				alt="Video Poster"
				class="h-full w-full"
				{style}
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
</div>
