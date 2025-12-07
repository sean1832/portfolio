<script lang="ts">
	import type { Project } from '$lib/types/project';
	import ExternalLink from '$lib/components/atoms/external-link.svelte';
	import { cn } from '$lib/utils';

	interface Props {
		project: Project;
		compact?: boolean;
	}

	let { project, compact = false }: Props = $props();
</script>

{#snippet metadataSection(title: string, items: any[] | undefined, className?: string)}
	{#if items && items.length > 0}
		<div class="flex flex-col gap-2">
			<span
				class="mb-1 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
			>
				{title}
			</span>
			<ul class="flex flex-col gap-1">
				{#each items as item}
					{@const text = typeof item === 'string' ? item : item.text}
					{@const url = typeof item === 'object' ? item.url : undefined}

					<li class={cn('text-sm leading-normal font-normal tracking-wide', className)}>
						{#if url}
							<ExternalLink href={url}>
								{text}
							</ExternalLink>
						{:else}
							{text}
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
{/snippet}

{#if compact}
	<!-- Mobile: Compact contributions only (other metadata is in drawer) -->
	{#if project.contributions && project.contributions.length > 0}
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
	{/if}
{:else}
	<!-- Desktop: Full metadata group -->
	<div class="flex flex-col gap-8">
		{#if project.location}
			<!-- Location -->
			<div class="flex flex-col gap-1">
				<span class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase">
					Location
				</span>
				<span class="text-sm font-normal tracking-wide">{project.location}</span>
			</div>
		{/if}

		<!-- Team -->
		{#if project.directors?.length || project.collaborators?.length}
			<div class="flex flex-col gap-6">
				{@render metadataSection('Director', project.directors, 'capitalize')}
				{@render metadataSection('Collaborators', project.collaborators, 'capitalize')}
			</div>
		{/if}

		{@render metadataSection('Supporters', project.supporters)}
		{@render metadataSection('Recognitions', project.awards)}
		{@render metadataSection('Publications', project.publications)}
	</div>
{/if}
