<script lang="ts">
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import MarkdownRenderer from '$lib/components/atoms/markdown-renderer.svelte';
	import { GithubIcon } from '$lib/components/icons';
	import Globe from '@lucide/svelte/icons/globe';
	import Play from '@lucide/svelte/icons/play';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import List from '@lucide/svelte/icons/list';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const project = data.project;

	// TOC state
	let tocEntries = $state<{ id: string; text: string; level: number }[]>([]);
	let showToc = $state(false);

	// Check if we have markdown content
	const hasContent = Boolean(project.markdownContent?.trim());

	// Handle TOC navigation with smooth scroll
	function scrollToHeading(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<svelte:head>
	<title>{project.name} | Zeke Zhang</title>
</svelte:head>

<main class="min-h-screen px-4 pt-24 pb-16 sm:px-8 lg:px-32 lg:pt-32">
	<!-- Back Link -->
	<a
		href="/tools"
		class="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
	>
		<ArrowLeft class="h-4 w-4" />
		<span>All Tools</span>
	</a>

	<!-- Header Section -->
	<div class="mb-12 lg:mb-16">
		<div class="flex flex-wrap items-baseline gap-4">
			<Decoder
				text={project.name.toUpperCase()}
				className="text-[28px] sm:text-[40px] lg:text-[56px] tracking-tight"
			/>
			<span class="text-lg text-muted-foreground uppercase lg:text-xl"
				>{project.type} // {project.year}</span
			>
		</div>
		<hr class="mt-4 border-primary" />
	</div>

	<!-- Main Content Grid -->
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
		<!-- Left Column: Metadata & TOC -->
		<aside class="lg:sticky lg:top-32 lg:col-span-3 lg:self-start">
			<!-- Description -->
			<div class="mb-8">
				<span
					class="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
				>
					Description
				</span>
				<p class="text-sm leading-relaxed sm:text-base">
					{project.description}
				</p>
			</div>

			<!-- Technologies -->
			{#if project.technologies.length > 0}
				<div class="mb-8">
					<span
						class="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
					>
						Technologies
					</span>
					<div class="flex flex-wrap gap-2">
						{#each project.technologies as tech}
							<span
								class="border border-primary/30 px-2 py-1 text-xs font-medium tracking-wider uppercase"
							>
								{tech}
							</span>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Links -->
			{#if project.repositoryUrl || project.websiteUrl || project.liveDemoUrl}
				<div class="mb-8">
					<span
						class="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
					>
						Links
					</span>
					<div class="flex flex-col gap-2">
						{#if project.repositoryUrl}
							<a
								href={project.repositoryUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 text-sm transition-colors hover:text-primary hover:underline"
							>
								<GithubIcon class="h-4 w-4" />
								<span>Source Code</span>
							</a>
						{/if}
						{#if project.websiteUrl}
							<a
								href={project.websiteUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 text-sm transition-colors hover:text-primary hover:underline"
							>
								<Globe class="h-4 w-4" />
								<span>Website</span>
							</a>
						{/if}
						{#if project.liveDemoUrl}
							<a
								href={project.liveDemoUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 text-sm transition-colors hover:text-primary hover:underline"
							>
								<Play class="h-4 w-4" />
								<span>Live Demo</span>
							</a>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Table of Contents (only show if we have headings) -->
			{#if tocEntries.length > 0}
				<div class="hidden lg:block">
					<span
						class="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
					>
						On This Page
					</span>
					<nav class="space-y-1">
						{#each tocEntries as entry}
							<button
								onclick={() => scrollToHeading(entry.id)}
								class="block w-full text-left text-sm text-muted-foreground transition-colors hover:text-primary"
								style="padding-left: {(entry.level - 1) * 0.75}rem"
							>
								{entry.text}
							</button>
						{/each}
					</nav>
				</div>

				<!-- Mobile TOC Toggle -->
				<div class="lg:hidden">
					<button
						onclick={() => (showToc = !showToc)}
						class="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
					>
						<List class="h-3 w-3" />
						<span>On This Page</span>
					</button>
					{#if showToc}
						<nav class="mb-6 space-y-1 border-l border-border pl-3">
							{#each tocEntries as entry}
								<button
									onclick={() => {
										scrollToHeading(entry.id);
										showToc = false;
									}}
									class="block w-full text-left text-sm text-muted-foreground transition-colors hover:text-primary"
									style="padding-left: {(entry.level - 1) * 0.75}rem"
								>
									{entry.text}
								</button>
							{/each}
						</nav>
					{/if}
				</div>
			{/if}
		</aside>

		<!-- Right Column: Markdown Content -->
		<div class="lg:col-span-9">
			{#if hasContent}
				<MarkdownRenderer content={project.markdownContent!} bind:tocEntries />
			{:else}
				<!-- Clean state for tools without documentation -->
				<div class="flex flex-col items-center justify-center py-16 text-center">
					<p class="mb-4 text-muted-foreground">
						Documentation for this tool is maintained externally.
					</p>
					{#if project.repositoryUrl}
						<a
							href={project.repositoryUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 border border-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
						>
							<GithubIcon class="h-4 w-4" />
							<span>View on GitHub</span>
						</a>
					{:else if project.websiteUrl}
						<a
							href={project.websiteUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 border border-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
						>
							<Globe class="h-4 w-4" />
							<span>View Website</span>
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</main>
