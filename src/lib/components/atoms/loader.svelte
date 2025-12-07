<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<div
	class={cn(
		'pointer-events-none absolute inset-0 z-30 flex items-center justify-center',
		className
	)}
>
	<div class="flex flex-col items-center gap-4">
		<!-- Minimalist scanning animation -->
		<div class="relative h-px w-20 overflow-hidden bg-white/20">
			<div class="scan-bar absolute inset-y-0 left-0 w-1/3 bg-white/80"></div>
		</div>
		<!-- Subtle text with shadow for visibility on any background -->
		<span
			class="text-[10px] font-medium tracking-[0.3em] text-white/70 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
		>
			Loading
		</span>
	</div>
</div>

<style>
	.scan-bar {
		animation: scan 1.5s ease-in-out infinite;
	}

	@keyframes scan {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(400%);
		}
	}
</style>
