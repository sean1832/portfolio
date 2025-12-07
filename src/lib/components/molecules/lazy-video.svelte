<script lang="ts">
	import { getVideo } from '$lib/helpers/video-registry';
	import VideoPlayer from './video-player.svelte';
	import PixelatedReveal from './pixelated-reveal.svelte';
	import { onMount } from 'svelte';

	interface Props {
		/** Path to primary video (e.g., "/projects/my-video.av1.webm") */
		primarySrc: string;
		/** Path to fallback video (e.g., "/projects/my-video.h264.mp4") */
		fallbackSrc?: string;
		/** Optional poster image path (e.g., "/projects/my-video-poster.webp") */
		posterSrc?: string;
		alt: string;
		class?: string;
		style?: string;
		/** Aspect ratio to maintain during loading (e.g., "16/9", "4/3") */
		aspectRatio?: string;
	}

	let {
		primarySrc,
		fallbackSrc,
		posterSrc,
		alt,
		class: className,
		style,
		aspectRatio
	}: Props = $props();

	// Compute combined style with aspect ratio for loading states
	let placeholderStyle = $derived(
		[aspectRatio ? `aspect-ratio: ${aspectRatio}` : '', style].filter(Boolean).join('; ')
	);

	// State for async loading
	let primaryUrl = $state<string | null>(null);
	let fallbackUrl = $state<string | null>(null);
	let isLoading = $state(true);
	let hasError = $state(false);

	// Get video asset from registry
	const videoAsset = getVideo(primarySrc, fallbackSrc, posterSrc);

	/**
	 * Detect MIME type from file extension
	 */
	function getMimeType(filename: string): string {
		const ext = filename.split('.').pop()?.toLowerCase();
		switch (ext) {
			case 'webm':
				return 'video/webm';
			case 'mp4':
				return 'video/mp4';
			case 'ogg':
			case 'ogv':
				return 'video/ogg';
			default:
				return 'video/mp4'; // Default fallback
		}
	}

	// Detect MIME types from filenames
	const primaryMimeType = getMimeType(primarySrc);
	let fallbackMimeType = $state<string | null>(null);
	if (fallbackSrc) {
		fallbackMimeType = getMimeType(fallbackSrc);
	}

	onMount(async () => {
		if (!videoAsset) {
			console.error('[lazy-video] videoAsset is null');
			hasError = true;
			isLoading = false;
			return;
		}

		try {
			// Load video URLs in parallel
			const urls = await Promise.all([
				videoAsset.src(),
				videoAsset.fallbackSrc ? videoAsset.fallbackSrc() : Promise.resolve(null)
			]);
			primaryUrl = urls[0];
			fallbackUrl = urls[1];
			isLoading = false;
		} catch (error) {
			console.error('[lazy-video] Failed to load video URLs:', error);
			hasError = true;
			isLoading = false;
		}
	});
</script>

{#if hasError}
	<!-- Fallback UI for missing/failed videos -->
	<div
		class="flex items-center justify-center bg-muted text-xs text-destructive {className}"
		style={placeholderStyle}
	>
		<div class="p-4 text-center">
			<p class="font-semibold">Video Not Found</p>
			<p class="mt-1 text-[10px] text-muted-foreground">{primarySrc}</p>
		</div>
	</div>
{:else if isLoading}
	<!-- Loading state: Show poster or placeholder -->
	{#if videoAsset?.poster}
		<PixelatedReveal
			src={videoAsset.poster.fallbackSrc}
			srcset={videoAsset.poster.srcset}
			placeholder={videoAsset.poster.placeholder}
			{alt}
			class={className}
			style={placeholderStyle}
		/>
	{:else}
		<div class="animate-pulse bg-muted {className}" style={placeholderStyle}></div>
	{/if}
{:else if primaryUrl}
	<!-- Render actual video once URLs are loaded -->
	<VideoPlayer poster={posterSrc} class={className} {style} {aspectRatio}>
		<source src={primaryUrl} type={primaryMimeType} />
		{#if fallbackUrl && fallbackMimeType}
			<source src={fallbackUrl} type={fallbackMimeType} />
		{/if}
	</VideoPlayer>
{/if}
