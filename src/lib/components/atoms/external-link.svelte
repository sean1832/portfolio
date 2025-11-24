<script lang="ts">
	import { cn } from '$lib/utils';
	import { ArrowUpRight } from '@lucide/svelte/icons';
	import type { Snippet } from 'svelte';

	interface Prop {
		href: string;
		class?: string;
		children: Snippet;
	}
	let { href, children, class: className }: Prop = $props();
</script>

<a
	{href}
	target="_blank"
	class={cn('inline transition-colors hover:text-primary hover:underline', className)}
>
	{@render children()}
	<span class="ml-1 inline-block align-middle leading-none">
		<ArrowUpRight class="h-4 w-4" />
	</span>
</a>
