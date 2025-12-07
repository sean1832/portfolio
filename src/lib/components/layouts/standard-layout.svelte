<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Project } from '$lib/types/project';
	import LazyImage from '$lib/components/molecules/lazy-image.svelte';
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import ExternalLink from '../atoms/external-link.svelte';
	import LazyVideo from '../molecules/lazy-video.svelte';
	import { navbarState } from '$lib/hooks/navbar-state.svelte';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import Info from '@lucide/svelte/icons/info';
	import * as Drawer from '$lib/components/ui/drawer';
	import { cn } from '$lib/utils';

	let { project }: { project: Project } = $props();

	// Set navbar state based on layout
	let isImmersive = $derived(project.layout !== 'standard');

	// Bind hero element for height calculation
	let heroElement: HTMLElement | undefined = $state();

	// Mobile description expansion state
	let isDescriptionExpanded = $state(false);
	const DESCRIPTION_PREVIEW_LENGTH = 200;

	// Drawer state for mobile metadata
	let isDrawerOpen = $state(false);

	// Derived: check if description needs truncation
	let descriptionNeedsTruncation = $derived(
		project.description.length > DESCRIPTION_PREVIEW_LENGTH
	);

	// Derived: truncated description for mobile
	let truncatedDescription = $derived.by(() => {
		if (!descriptionNeedsTruncation) return project.description;
		// Find a good break point (space) near the limit
		const breakPoint = project.description.lastIndexOf(' ', DESCRIPTION_PREVIEW_LENGTH);
		return (
			project.description.slice(0, breakPoint > 0 ? breakPoint : DESCRIPTION_PREVIEW_LENGTH) + '...'
		);
	});

	onMount(() => {
		// Set immersive mode for navbar
		navbarState.setImmersive(true);

		// Update hero height for scroll calculations
		if (heroElement) {
			navbarState.setHeroHeight(heroElement.offsetHeight);
		}
	});

	onDestroy(() => {
		// Reset navbar state when leaving the page
		navbarState.reset();
	});

	// Determine the single hero media (prefer any item with `isHero`, else fallback to `isCover`)
	let heroMedia = $derived(
		project.medias?.find((m) => 'isHero' in m && (m as any).isHero) ||
			project.medias?.find((m) => 'isCover' in m && (m as any).isCover)
	);

	// Convenience derived values for templates (image or video)
	let heroImage = $derived(heroMedia?.type === 'image' ? heroMedia : undefined);
	let heroVideo = $derived(heroMedia?.type === 'video' ? heroMedia : undefined);

	// Group media items by groupId
	type MediaItem = NonNullable<Project['medias']>[number];
	type MediaGroup = { type: 'group'; groupId: string; items: MediaItem[] };
	type GalleryItem = MediaItem | MediaGroup;

	// Filter out the hero media from the gallery list
	let visibleGalleryMedias = $derived(
		project.medias?.filter((media) => media !== heroMedia && !media.isHiddenGallery) || []
	);

	let galleryItems = $derived.by(() => {
		const items: GalleryItem[] = [];
		const grouped = new Map<string, typeof visibleGalleryMedias>();

		for (const media of visibleGalleryMedias) {
			if (media.groupId) {
				if (!grouped.has(media.groupId)) {
					grouped.set(media.groupId, []);
				}
				grouped.get(media.groupId)!.push(media);
			} else {
				items.push(media);
			}
		}

		// Merge groups back into items array in order of first appearance
		const result: GalleryItem[] = [];
		const processedGroups = new Set<string>();

		for (const media of visibleGalleryMedias) {
			if (media.groupId && !processedGroups.has(media.groupId)) {
				result.push({
					type: 'group',
					groupId: media.groupId,
					items: grouped.get(media.groupId)!
				});
				processedGroups.add(media.groupId);
			} else if (!media.groupId) {
				result.push(media);
			}
		}

		return result;
	});

	// helper functions
	function getMediaStyle(media: MediaItem): string {
		// Only apply styles to image/video, not text
		if (media.type === 'text' || media.type === 'code') return '';

		// Cast to visual media type (ImageMedia | VideoMedia) after excluding text types
		const visualMedia = media as Exclude<MediaItem, { type: 'text' | 'code' }>;
		const styles: string[] = [];

		// handle aspect ratio
		if (visualMedia.aspectRatio) {
			styles.push(`aspect-ratio: ${visualMedia.aspectRatio}`);
		}

		// handle object-position for image/video alignment within container
		// this controls which part of the media is visible when cropped by object-fit: cover
		const justify = visualMedia.justify || 'center';
		const align = visualMedia.align || 'center';

		// Map align values: 'top' -> 'top', 'center' -> 'center', 'bottom' -> 'bottom'
		// Map justify values: 'left' -> 'left', 'center' -> 'center', 'right' -> 'right'
		styles.push(`object-position: ${justify} ${align}`);

		return styles.join('; ');
	}

	// Get visual media index (excluding text items from numbering)
	function getVisualMediaIndex(media: MediaItem): number {
		if (media.type === 'text') return -1;
		const visualMedias = visibleGalleryMedias.filter(
			(m): m is Exclude<MediaItem, { type: 'text' }> => m.type !== 'text'
		);
		return visualMedias.indexOf(media);
	}

	// media columns
	const columnsByCount: Record<number, string> = {
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4'
	};

	$effect(() => {
		if (!heroMedia) {
			console.warn('No hero or cover media found for project ' + project.slug);
		}
	});
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

					<li class={cn('text-sm leading-normal font-normal tracking-wide ', className)}>
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

{#snippet contributionsSection()}
	{#if project.contributions && project.contributions.length > 0}
		<div>
			<span
				class="mb-4 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase md:mb-6"
				>Contributions</span
			>
			<!-- Mobile: compact inline list with minimal bars -->
			<div class="flex flex-col gap-3 md:hidden">
				{#each project.contributions as contrib}
					<div class="flex items-center gap-3">
						<span class="min-w-0 flex-1 truncate text-xs font-medium tracking-wide text-foreground">
							{contrib.description}
						</span>
						<div class="flex w-20 items-center gap-2">
							<div class="h-0.5 flex-1 bg-muted">
								<div class="h-full bg-foreground/70" style="width: {contrib.percent}%"></div>
							</div>
							<span class="w-8 text-right text-[10px] text-muted-foreground tabular-nums"
								>{contrib.percent}%</span
							>
						</div>
					</div>
				{/each}
			</div>
			<!-- Desktop: full grid with progress bars -->
			<div class="hidden grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2 md:grid lg:grid-cols-3">
				{#each project.contributions as contrib}
					<div class="group flex flex-col gap-2">
						<div class="flex items-baseline justify-between gap-4">
							<span class="text-xs font-medium tracking-wide text-foreground uppercase">
								{contrib.description}
							</span>
							<span class="text-[10px] text-muted-foreground tabular-nums">{contrib.percent}%</span>
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
		</div>
	{/if}
{/snippet}

{#snippet descriptionSection()}
	<div class="max-w-none text-justify text-sm font-light">
		<!-- Mobile: collapsible description -->
		<div class="md:hidden">
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
		</div>
		<!-- Desktop: full description in columns -->
		<div class="hidden columns-1 gap-12 md:block md:columns-2">
			<p class="mt-0">{project.description}</p>
		</div>
	</div>
{/snippet}

{#snippet metadataGroup()}
	<div class="flex flex-col gap-8">
		{#if project.location}
			<!-- Location -->
			<div class="flex flex-col gap-1">
				<span class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
					>Location</span
				>
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
{/snippet}

<div class="min-h-screen w-full">
	<!-- HERO SECTION -->
	<header
		bind:this={heroElement}
		class={`relative w-full overflow-hidden ${project.layout === 'standard' ? 'h-[65vh]' : 'h-screen'}`}
	>
		<!-- Gradient overlay for navbar readability (immersive mode only) -->
		<div
			class="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-black/40 to-transparent"
		></div>

		{#if heroImage?.type === 'image'}
			<LazyImage
				filename={heroImage.src}
				alt={heroImage.alt}
				class="h-full w-full object-cover "
				style={getMediaStyle(heroImage)}
			/>
		{:else if heroVideo?.type === 'video'}
			{#if heroVideo.src}
				<LazyVideo
					primarySrc={heroVideo.src}
					fallbackSrc={heroVideo.fallbackSrc}
					posterSrc={heroVideo.posterSrc}
					alt={heroVideo.alt}
					class="h-full w-full object-cover"
					style={getMediaStyle(heroVideo)}
					aspectRatio={heroVideo.aspectRatio}
				/>
			{/if}
		{/if}
	</header>

	<!-- MAIN GRID LAYOUT -->
	<main
		class="mx-auto grid max-w-[1800px] grid-cols-1 gap-8 px-6 py-8 md:grid-cols-12 md:gap-16 md:px-12 md:py-12"
	>
		<!-- MOBILE: Compact header with title only -->
		<div class="flex flex-col gap-4 md:hidden">
			<!-- Header Block -->
			<div class="flex flex-col gap-3">
				<h1 class="text-3xl leading-[0.9] font-semibold tracking-tighter wrap-break-word uppercase">
					<Decoder
						text={project.name}
						revealSpeedMs={40}
						scrambleSpeedMs={10}
						trigger="load"
						variant="shuffle"
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

			<!-- Mobile: Compact description -->
			{@render descriptionSection()}

			<!-- Mobile: Compact contributions -->
			{@render contributionsSection()}

			<!-- Mobile: Project Details Button (opens drawer) -->
			<button
				onclick={() => (isDrawerOpen = true)}
				class="group mt-2 flex items-center gap-2 self-start border-b border-transparent pb-0.5 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:border-foreground hover:text-foreground"
			>
				<Info class="h-3 w-3" />
				View Details
			</button>
		</div>

		<!-- DESKTOP: LEFT COLUMN - STICKY TITLE & METADATA -->
		<aside class="hidden h-fit flex-col gap-8 md:col-span-4 md:flex lg:sticky lg:top-32">
			<!-- Header Block -->
			<div class="flex flex-col gap-3">
				<h1
					class="text-5xl leading-[0.9] font-semibold tracking-tighter wrap-break-word uppercase lg:text-6xl"
				>
					<Decoder
						text={project.name}
						revealSpeedMs={40}
						scrambleSpeedMs={10}
						trigger="load"
						variant="shuffle"
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

			<!-- Desktop: Full Metadata Group -->
			{@render metadataGroup()}
		</aside>

		<!-- RIGHT COLUMN: CONTENT (Gallery) -->
		<article class="flex flex-col gap-12 md:col-span-8 md:gap-20">
			<!-- Desktop only: Narrative & Contributions -->
			<section class="hidden md:block">
				{@render descriptionSection()}
				<div class="mt-8">
					{@render contributionsSection()}
				</div>
			</section>

			<!-- Gallery -->
			{#if visibleGalleryMedias.length > 0}
				<section class="flex flex-col gap-8">
					{#each galleryItems as media}
						<!-- Text media: render as standalone section -->
						{#if media.type === 'text'}
							<div>
								{#if media.title}
									<h3 class="mb-4 text-sm font-semibold tracking-wide text-foreground uppercase">
										{media.title}
									</h3>
								{/if}
								<p class="text-justify text-sm leading-relaxed font-light text-foreground">
									{media.content}
								</p>
							</div>
						{:else}
							<!-- Image/Video media -->
							{@const items = media.type === 'group' ? media.items : [media]}
							<div
								class={`grid grid-cols-1 gap-6 ${columnsByCount[items.length] || 'md:grid-cols-4'}`}
							>
								{#each items as groupMedia}
									{@const visualIndex = getVisualMediaIndex(groupMedia)}
									<figure class="group w-full">
										<div class="relative overflow-hidden">
											{#if groupMedia.type === 'image'}
												<LazyImage
													filename={groupMedia.src}
													alt={groupMedia.alt}
													class="w-full {groupMedia.aspectRatio ? 'h-full object-cover' : 'h-auto'}"
													sizes={items.length === 1 ? '65vw' : '40vw'}
													style={getMediaStyle(groupMedia)}
												/>
											{:else if groupMedia.type === 'video'}
												{#if groupMedia.src}
													<LazyVideo
														primarySrc={groupMedia.src}
														fallbackSrc={groupMedia.fallbackSrc}
														posterSrc={groupMedia.posterSrc}
														alt={groupMedia.alt}
														class="w-full {groupMedia.aspectRatio
															? 'h-full object-cover'
															: 'h-auto'}"
														style={getMediaStyle(groupMedia)}
														aspectRatio={groupMedia.aspectRatio}
													/>
												{:else}
													<!-- Missing Video src -->
													<div
														class="flex h-48 w-full items-center justify-center bg-muted text-xs text-destructive"
													>
														Missing video source
													</div>
												{/if}
											{/if}
										</div>
										<!-- Captions & Description (only for image/video) -->
										{#if groupMedia.type === 'image' || groupMedia.type === 'video'}
											<div class="mt-3 flex flex-col gap-2">
												<div
													class="flex items-start justify-between border-t border-transparent pt-1 text-[10px] font-medium tracking-[0.15em] text-muted-foreground/50 uppercase transition-colors group-hover:border-border"
												>
													{#if !groupMedia.description}
														// {visualIndex + 1}
													{/if}
													{#if groupMedia.showAlt && groupMedia.type === 'image' && !groupMedia.description}
														<span class="line-clamp-1 text-right">{groupMedia.alt}</span>
													{:else if groupMedia.showAlt && groupMedia.type === 'video' && groupMedia.alt && !groupMedia.description}
														<span class="line-clamp-1 text-right">{groupMedia.alt}</span>
													{/if}
												</div>
												{#if groupMedia.description}
													<div class="flex justify-between">
														<h3
															class="mb-1 text-sm font-semibold tracking-wide text-foreground uppercase"
														>
															{groupMedia.alt}
														</h3>
														<span class="text-[10px] font-medium text-muted-foreground/50"
															>// {visualIndex + 1}</span
														>
													</div>

													<p class="text-justify text-sm font-light text-foreground">
														{groupMedia.description}
													</p>
												{/if}
											</div>
										{/if}
									</figure>
								{/each}
							</div>
						{/if}
					{/each}
				</section>
			{/if}
		</article>
	</main>

	<!-- MOBILE: Project Details Drawer -->
	<Drawer.Root bind:open={isDrawerOpen}>
		<Drawer.Content>
			<div class="mx-auto flex w-full max-w-lg flex-col overflow-hidden">
				<Drawer.Header class="shrink-0">
					<Drawer.Title>Project Details</Drawer.Title>
					<Drawer.Description class="text-sm font-normal tracking-wide text-foreground">
						{project.name} — {project.year}
					</Drawer.Description>
				</Drawer.Header>
				<div class="flex-1 overflow-y-auto px-6 pt-6 pb-10">
					{@render metadataGroup()}
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>
