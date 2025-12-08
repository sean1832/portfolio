<script lang="ts">
	import PixelatedReveal from './pixelated-reveal.svelte';
	import { onMount } from 'svelte';

	interface Props {
		/** Path to image in static folder (e.g., "/projects/agentic/collage.avif") */
		src: string;
		alt: string;
		class?: string;
		style?: string;
	}

	let { src, alt, class: className, style }: Props = $props();

	// Get placeholder from pre-generated manifest, fallback to src if not found
	let placeholder = $state(src);

	onMount(async () => {
		try {
			const response = await fetch('/placeholders.json');
			const placeholders = await response.json();
			placeholder = placeholders[src] ?? src;
		} catch (e) {
			// Fallback to src if manifest doesn't exist
			placeholder = src;
		}
	});
</script>

<PixelatedReveal {src} {placeholder} {alt} {style} class={className} />
