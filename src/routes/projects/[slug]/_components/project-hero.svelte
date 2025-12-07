<script lang="ts">
	import type { DesignProjectMedia, Project } from '$lib/types/project';
	import LazyImage from '$lib/components/molecules/lazy-image.svelte';
	import LazyVideo from '$lib/components/molecules/lazy-video.svelte';
	import { getMediaStyle } from './media-utils';

	interface Props {
		media: DesignProjectMedia | undefined;
	}
	let { media }: Props = $props();

	// Convenience derived values for templates (image or video)
	let heroImage = $derived(media?.type === 'image' ? media : undefined);
	let heroVideo = $derived(media?.type === 'video' ? media : undefined);
</script>

<!-- Gradient overlay for navbar readability -->
<div
	class="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-black/40 to-transparent"
></div>

{#if heroImage?.type === 'image'}
	<LazyImage
		filename={heroImage.src}
		alt={heroImage.alt}
		class="h-full w-full object-cover "
		style={getMediaStyle(heroImage)}
	/>
{:else if heroVideo?.type === 'video'}
	{#if heroVideo.src}
		<LazyVideo
			primarySrc={heroVideo.src}
			fallbackSrc={heroVideo.fallbackSrc}
			posterSrc={heroVideo.posterSrc}
			alt={heroVideo.alt}
			class="h-full w-full object-cover"
			style={getMediaStyle(heroVideo)}
			aspectRatio={heroVideo.aspectRatio}
		/>
	{/if}
{/if}
