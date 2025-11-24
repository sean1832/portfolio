<script lang="ts">
	import { cn } from '$lib/utils';
	import Decoder from './decoder.svelte';
	import LazyImage from './lazy-image.svelte';

	interface Props {
		href?: string;
		imageSrc: string;
		imageAlt: string;
		imageSize?: string;
		title: string;
		year: string;
		imageClass?: string;
		imageWrapperClass?: string;
		footerClass?: string;
	}

	let {
		href,
		imageSrc,
		imageAlt,
		imageSize = '50vw',
		title,
		year,
		imageClass,
		imageWrapperClass,
		footerClass
	}: Props = $props();

	const Tag = href ? 'a' : 'div';
	let decoder: Decoder;
</script>

<svelte:element
	this={Tag}
	{href}
	class="flex aspect-square w-full cursor-pointer flex-col border border-transparent transition-colors duration-200 hover:border-primary hover:shadow-2xl"
	role="button"
	tabindex="0"
	onmouseenter={() => decoder?.start()}
	onmouseleave={() => decoder?.stop()}
>
	<div class={cn('relative min-h-0 w-full flex-1', imageWrapperClass)}>
		<LazyImage
			filename={imageSrc}
			alt={imageAlt}
			class={cn('absolute inset-0 h-full w-full object-cover p-4', imageClass)}
			sizes={imageSize}
		/>
	</div>

	<div class={cn('shrink-0 bg-white p-4', footerClass)}>
		<Decoder
			className="uppercase"
			text={title}
			trigger="manual"
			bind:this={decoder}
			scrambleSpeedMs={30}
			revealSpeedMs={30}
			variant="shuffle"
		/>
		<p class="text-gray-500">{year}</p>
	</div>
</svelte:element>
