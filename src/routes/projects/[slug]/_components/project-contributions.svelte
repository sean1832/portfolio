<script lang="ts">
	import type { Project } from '$lib/types/project';

	interface Props {
		project: Project;
		compact?: boolean;
	}

	let { project, compact = false }: Props = $props();
</script>

{#if project.contributions && project.contributions.length > 0}
	<div>
		<span
			class="mb-4 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase md:mb-6"
		>
			Contributions
		</span>

		{#if compact}
			<!-- Mobile: compact inline list with minimal bars -->
			<div class="flex flex-col gap-3">
				{#each project.contributions as contrib}
					<div class="flex items-center gap-3">
						<span class="min-w-0 flex-1 truncate text-xs font-medium tracking-wide text-foreground">
							{contrib.description}
						</span>
						<div class="flex w-20 items-center gap-2">
							<div class="h-0.5 flex-1 bg-muted">
								<div class="h-full bg-foreground/70" style="width: {contrib.percent}%"></div>
							</div>
							<span class="w-8 text-right text-[10px] text-muted-foreground tabular-nums">
								{contrib.percent}%
							</span>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<!-- Desktop: full grid with progress bars -->
			<div class="grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each project.contributions as contrib}
					<div class="group flex flex-col gap-2">
						<div class="flex items-baseline justify-between gap-4">
							<span class="text-xs font-medium tracking-wide text-foreground uppercase">
								{contrib.description}
							</span>
							<span class="text-[10px] text-muted-foreground tabular-nums">
								{contrib.percent}%
							</span>
						</div>
						<div class="h-0.5 w-full bg-muted">
							<div
								class="h-full bg-foreground/60 transition-all duration-300 group-hover:bg-foreground"
								style="width: {contrib.percent}%"
							></div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
