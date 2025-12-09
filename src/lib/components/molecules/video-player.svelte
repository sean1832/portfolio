<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { Action } from 'svelte/action';
	import PixelatedReveal from './pixelated-reveal.svelte';
	import VideoLoader from '../atoms/loader.svelte';
	import Play from '@lucide/svelte/icons/play';
	import { onMount } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
		style?: string;
		poster?: string;
		aspectRatio?: string;
	}
	let { children, class: className, poster, style, aspectRatio }: Props = $props();

	let containerStyle = $derived(
		[aspectRatio ? `aspect-ratio: ${aspectRatio}` : '', style].filter(Boolean).join('; ')
	);

	let posterPlaceholder = $state<string | undefined>(poster);
	let videoEl = $state<HTMLVideoElement | undefined>();

	// State management
	let isPlaying = $state(false); // Video is actually running
	let isLoading = $state(false); // Waiting for browser/network
	let showPlayButton = $state(false); // Autoplay failed, waiting for user click
	let hasTriedWeChatAutoplay = false;

	onMount(async () => {
		if (poster) {
			try {
				const response = await fetch('/placeholders.json');
				const placeholders = await response.json();
				posterPlaceholder = placeholders[poster] ?? poster;
			} catch (e) {
				posterPlaceholder = poster;
			}
		}

		// [WeChat] Listen for bridge ready to trigger immediate play
		// This is our best "aggressive" shot at bypassing the click requirement
		if (typeof window !== 'undefined') {
			const tryWeChatPlay = () => {
				if (videoEl && !isPlaying && !hasTriedWeChatAutoplay) {
					hasTriedWeChatAutoplay = true;
					videoEl.muted = true; // Mute increases success rate
					const p = videoEl.play();
					if (p !== undefined) {
						p.then(() => {
							isPlaying = true;
							isLoading = false;
							showPlayButton = false;
						}).catch(() => {
							// Blocked again? Show button.
							isLoading = false;
							showPlayButton = true;
						});
					}
				}
			};

			if ((window as any).WeixinJSBridge) {
				tryWeChatPlay();
			} else {
				document.addEventListener('WeixinJSBridgeReady', tryWeChatPlay, false);
			}
		}
	});

	// Helper to attempt playback and manage UI state
	function tryPlay(node: HTMLVideoElement) {
		isLoading = true; // Show spinner while we ask permission
		const playPromise = node.play();

		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					// Success!
					isPlaying = true;
					isLoading = false;
					showPlayButton = false;
				})
				.catch((e) => {
					console.warn('Autoplay blocked:', e);
					// Failed! Stop loading, show Play button
					isPlaying = false;
					isLoading = false;
					showPlayButton = true;
				});
		} else {
			// Older browsers (synchronous play)
			isPlaying = true;
			isLoading = false;
			showPlayButton = false;
		}
	}

	const lazyPlay: Action<HTMLVideoElement> = (node) => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						node.preload = 'auto';
						tryPlay(node);
						observer.unobserve(node);
						observer.disconnect();
					}
				});
			},
			{ rootMargin: '200px', threshold: 0.01 }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	};

	function handleManualPlay() {
		if (videoEl) {
			if (videoEl.paused) {
				videoEl.muted = true;
				tryPlay(videoEl);
			} else {
				// Pause
			}
		}
	}
</script>

<div
	class="group relative h-full w-full cursor-pointer overflow-hidden"
	style={containerStyle}
	role="button"
	tabindex="0"
	onclick={handleManualPlay}
	onkeydown={(e) => e.key === 'Enter' && handleManualPlay()}
>
	{#if poster}
		<div
			class="pointer-events-none absolute inset-0 z-20 h-full w-full transition-opacity duration-500"
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
		bind:this={videoEl}
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

	{#if isLoading && !isPlaying && !showPlayButton}
		<VideoLoader />
	{/if}

	{#if showPlayButton && !isPlaying && !isLoading}
		<div
			class="absolute inset-0 z-30 flex animate-in items-center justify-center bg-black/10 backdrop-blur-[2px] transition-all duration-300 fade-in"
		>
			<div
				class="rounded-full bg-white/20 p-4 backdrop-blur-md transition-transform group-hover:scale-110"
			>
				<Play class="h-8 w-8 fill-white text-white" />
			</div>
		</div>
	{/if}
</div>
