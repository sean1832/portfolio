<script lang="ts">
	import VideoPlayer from './video-player.svelte';

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
		/**
		 * Behavior when autoplay is blocked:
		 * - 'play-button': Show a manual play button overlay (default)
		 * - 'poster-fallback': Show static poster image, hide video entirely
		 */
		autoplayFallback?: 'play-button' | 'poster-fallback';
	}

	let {
		primarySrc,
		fallbackSrc,
		posterSrc,
		alt,
		class: className,
		style,
		aspectRatio,
		autoplayFallback = 'play-button'
	}: Props = $props();

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
				return 'video/mp4';
		}
	}

	const primaryMimeType = getMimeType(primarySrc);
	const fallbackMimeType = fallbackSrc ? getMimeType(fallbackSrc) : null;
</script>

<VideoPlayer poster={posterSrc} class={className} {style} {aspectRatio} {autoplayFallback}>
	<source src={primarySrc} type={primaryMimeType} />
	{#if fallbackSrc && fallbackMimeType}
		<source src={fallbackSrc} type={fallbackMimeType} />
	{/if}
</VideoPlayer>
