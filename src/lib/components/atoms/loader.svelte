<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { class: className, size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'w-8 h-7',
		md: 'w-12 h-10',
		lg: 'w-16 h-14'
	};
</script>

<div
	class={cn(
		'pointer-events-none absolute inset-0 z-30 flex items-center justify-center',
		className
	)}
>
	<svg
		role="img"
		aria-label="Loading"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 207.95 168.95"
		class={cn('loader-svg overflow-visible', sizeClasses[size])}
	>
		<g>
			<!-- Back Z: Static Wireframe (Depth) -->
			<path
				class="back-z"
				d="M32.49 0h116.46L56.48 134.71h78.98l-22.73 33.78L0 168.45 89.47 34.24l-79.22-.75L32.49 0z"
			/>

			<!-- Front Z Group -->
			<g>
				<!-- 1. The Container Outline (Always visible) -->
				<path
					class="front-z-wireframe"
					d="M91.49 0h116.46l-92.47 134.71h78.98l-22.75 34.24-112.71-.5 89.47-134.21-79.22-.75L91.49 0z"
				/>

				<!-- 2. The Solid Fill (Animated Mask) -->
				<path
					class="front-z-fill"
					d="M91.49 0h116.46l-92.47 134.71h78.98l-22.75 34.24-112.71-.5 89.47-134.21-79.22-.75L91.49 0z"
				/>
			</g>
		</g>
	</svg>
</div>

<style>
	.loader-svg {
		shape-rendering: geometricPrecision;
		filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.6));
	}

	.back-z {
		fill: transparent;
		stroke: white;
		stroke-width: 3px;
		opacity: 0.2;
	}

	.front-z-wireframe {
		fill: transparent;
		stroke: white;
		stroke-width: 3px;
		opacity: 0.5;
	}

	.front-z-fill {
		fill: white;
		opacity: 1;
		/* Start fully clipped (empty) */
		clip-path: inset(100% 0 0 0);
		animation: data-fill 2s cubic-bezier(0.83, 0, 0.17, 1) infinite;
	}

	@keyframes data-fill {
		0% {
			clip-path: inset(100% 0 0 0);
		}
		60% {
			clip-path: inset(0 0 0 0);
		}
		85% {
			clip-path: inset(0 0 0 0);
			opacity: 1;
		}
		95% {
			opacity: 1;
		}
		100% {
			clip-path: inset(0 0 0 0);
			opacity: 0;
		}
	}
</style>
