<script lang="ts">
	import type { Project } from '$lib/types/project';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';

	interface Props {
		project: Project;
		collapse?: boolean;
	}

	// Default collapse to false if not provided
	let { project, collapse = false }: Props = $props();

	let isDescriptionExpanded = $state(false);
	const MAX_LENGTH = 300;

	// Use $derived so this updates if the 'project' prop changes
	let descriptionNeedsTruncation = $derived(project.description.length > MAX_LENGTH);
	let truncatedDescription = $derived.by(() => {
		if (!descriptionNeedsTruncation) return project.description;
		const lastSpaceIndex = project.description.lastIndexOf(' ', MAX_LENGTH);
		const cutIndex = lastSpaceIndex > 0 ? lastSpaceIndex : MAX_LENGTH;
		return project.description.slice(0, cutIndex) + '...';
	});
</script>

<div class="max-w-none text-justify text-sm font-light">
	{#if collapse}
		<!-- Mobile: collapsible description -->
		<p class="mt-0">
			{isDescriptionExpanded || !descriptionNeedsTruncation
				? project.description
				: truncatedDescription}
		</p>
		{#if descriptionNeedsTruncation}
			<button
				onclick={() => (isDescriptionExpanded = !isDescriptionExpanded)}
				class="mt-3 flex items-center gap-1 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
			>
				{isDescriptionExpanded ? 'Show less' : 'Show more'}
				{#if isDescriptionExpanded}
					<ChevronUp class="h-3.5 w-3.5" />
				{:else}
					<ChevronDown class="h-3.5 w-3.5" />
				{/if}
			</button>
		{/if}
	{:else}
		<!-- Desktop: full description in columns -->
		<div class="columns-1 gap-12 md:columns-2">
			<p class="mt-0">{project.description}</p>
		</div>
	{/if}
</div>
