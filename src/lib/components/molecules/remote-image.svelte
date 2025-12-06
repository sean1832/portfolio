<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		src: string;
		alt: string;
		sizes?: string;
		class?: string;
		style?: string;
	}

	let { src, alt, sizes = '100vw', class: className, style }: Props = $props();
</script>

<img
	{src}
	{sizes}
	{alt}
	loading="lazy"
	decoding="async"
	class={cn('h-full w-full object-cover', className)}
	{style}
/>
