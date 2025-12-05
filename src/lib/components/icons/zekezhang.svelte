<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className = '', animated = false } = $props();
</script>

<svg
	role="img"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 207.95 168.95"
	class={cn('h-6 w-6 overflow-visible', animated && 'group', className)}
	fill="currentColor"
>
	<g id="prefix__Layer_1-2">
		<path
			class={cn(
				'transition-transform duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
				animated && 'will-change-transform group-hover:translate-x-18'
			)}
			d="M91.49 0h116.46l-92.47 134.71h78.98l-22.75 34.24-112.71-.5 89.47-134.21-79.22-.75L91.49 0z"
		/>
		<path
			d="M32.49 0h116.46L56.48 134.71h78.98l-22.73 33.78L0 168.45 89.47 34.24l-79.22-.75L32.49 0z"
		/>
	</g>
</svg>
