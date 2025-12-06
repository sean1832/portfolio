<script lang="ts">
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import ExternalLink from '$lib/components/atoms/external-link.svelte';
	import LazyImage from '$lib/components/molecules/lazy-image.svelte';
	import LazyVideo from '$lib/components/molecules/lazy-video.svelte';
	import { GithubIcon } from '$lib/components/icons';
	import Globe from '@lucide/svelte/icons/globe';
	import Play from '@lucide/svelte/icons/play';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import type { PageData } from './$types';
	import type { ImageMedia, VideoMedia, TextMedia } from '$lib/types/media';
	import RemoteImage from '$lib/components/molecules/remote-image.svelte';
	import Codeblock from '$lib/components/atoms/code.svelte';

	let { data }: { data: PageData } = $props();
	const project = data.project;

	// Get media items
	const medias = project.medias || [];
	const hasMedia = medias.length > 0;

	// Helper to get media style
	function getMediaStyle(media: ImageMedia | VideoMedia): string {
		const styles: string[] = [];
		if (media.aspectRatio) {
			styles.push(`aspect-ratio: ${media.aspectRatio}`);
		}
		const justify = media.justify || 'center';
		const align = media.align || 'center';
		styles.push(`object-position: ${justify} ${align}`);
		return styles.join('; ');
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
		<!-- Left Column: Metadata -->
		<aside class="lg:col-span-3">
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
				<div>
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
		</aside>

		<!-- Right Column: Media Gallery -->
		<div class="lg:col-span-9">
			{#if hasMedia}
				<div class="space-y-6">
					{#each medias as media, i}
						{#if media.type === 'image' || media.type === 'remote-image'}
							<div class="border border-primary/10 bg-muted/20">
								{#if media.type === 'image'}
									<LazyImage
										filename={media.src}
										alt={media.alt}
										class="w-full object-cover"
										style={getMediaStyle(media)}
									/>
								{:else if media.type === 'remote-image'}
									<RemoteImage
										src={media.src}
										alt={media.alt}
										class="w-full object-cover"
										style={getMediaStyle(media)}
									/>
								{/if}
								{#if media.showAlt || media.description}
									<div class="border-t border-primary/10 p-3">
										<p class="text-xs text-muted-foreground">
											{media.description || media.alt}
										</p>
									</div>
								{/if}
							</div>
						{:else if media.type === 'video'}
							<div class="border border-primary/10 bg-muted/20">
								<LazyVideo
									primarySrc={media.src}
									fallbackSrc={media.fallbackSrc}
									posterSrc={media.posterSrc}
									alt={media.alt}
									class="w-full object-cover"
									style={getMediaStyle(media)}
								/>
								{#if media.showAlt || media.description}
									<div class="border-t border-primary/10 p-3">
										<p class="text-xs text-muted-foreground">
											{media.description || media.alt}
										</p>
									</div>
								{/if}
							</div>
						{:else if media.type === 'text'}
							<div class="flex flex-col justify-center bg-muted/20 p-4 sm:p-6">
								{#if media.title}
									<h3
										class="mb-3 text-xs font-semibold tracking-[0.15em] text-muted-foreground/70 uppercase"
									>
										{media.title}
									</h3>
								{/if}
								<p class="text-sm leading-relaxed sm:text-base">
									{media.content}
								</p>
							</div>
						{:else if media.type === 'code'}
							<div class="flex flex-col justify-center overflow-hidden">
								{#if media.title}
									<h3
										class="mb-3 text-xs font-semibold tracking-[0.15em] text-muted-foreground/70 uppercase"
									>
										{media.title}
									</h3>
								{/if}
								<Codeblock code={media.content} lang={media.lang} />
							</div>
						{/if}
					{/each}
				</div>
			{:else}
				<!-- No media placeholder - minimal, clean design -->
				<div
					class="flex min-h-[200px] items-center justify-center border border-dashed border-primary/20"
				>
					<p class="text-sm text-muted-foreground/50">No media available</p>
				</div>
			{/if}
		</div>
	</div>
</main>
