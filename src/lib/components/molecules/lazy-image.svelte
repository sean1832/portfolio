<script lang="ts">
	import { getImage } from '$lib/helpers/image-registry';
	import PixelatedReveal from './pixelated-reveal.svelte';

	interface Props {
		filename: string;
		alt: string;
		/**default '100vw'*/
		sizes?: string;
		class?: string;
		style?: string;
	}

	let { filename, alt, class: className, sizes, style }: Props = $props();

	// get data synchronously
	const image = getImage(filename);
</script>

{#if image}
	<PixelatedReveal
		srcset={image.srcset}
		src={image.fallbackSrc}
		placeholder={image.placeholder}
		{sizes}
		{alt}
		{style}
		class={className}
	/>
{:else}
	<div class="bg-gray-200 {className} flex items-center justify-center text-xs text-red-500">
		Image Not Found
	</div>
{/if}
