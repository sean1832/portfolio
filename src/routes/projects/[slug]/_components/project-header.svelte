<script lang="ts">
	import type { Project } from '$lib/types/project';
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import { cn } from '$lib/utils';

	interface Props {
		project: Project;
		size?: 'small' | 'large';
	}

	let { project, size = 'small' }: Props = $props();
</script>

<div class="flex flex-col gap-3">
	<h1
		class={cn(
			'leading-[0.9] font-semibold wrap-break-word uppercase',
			size === 'small' ? 'text-3xl' : 'text-5xl lg:text-6xl'
		)}
	>
		<Decoder
			text={project.name}
			revealSpeedMs={40}
			scrambleSpeedMs={10}
			trigger="load"
			variant="shuffle"
			monospace
		/>
	</h1>

	<div
		class="flex items-center gap-3 text-xs font-medium tracking-widest text-muted-foreground uppercase"
	>
		<span>{project.year}</span>
		<span class="text-border">/</span>
		<span>{project.types[0]}</span>
	</div>

	<hr class="w-8 border-border opacity-50" />
</div>
