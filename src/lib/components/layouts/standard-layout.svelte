<script lang="ts">
	import type { Project } from '$lib/types/project';
	import LazyImage from '$lib/components/molecules/lazy-image.svelte';
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import ExternalLink from '../atoms/external-link.svelte';
	import LazyVideo from '../molecules/lazy-video.svelte';

	let { project }: { project: Project } = $props();

	// Derived state for images
	let heroImage = $derived(
		project.medias?.find((media) => media.isHero) || project.medias?.find((media) => media.isCover)
	);

	let heroVideo = $derived(
		project.medias?.find((media) => media.isHero && media.type === 'video') ||
			project.medias?.find((media) => media.isCover && media.type === 'video')
	);

	// Filter out the hero image from the gallery list
	let galleryMedias = $derived(project.medias?.filter((media) => media !== heroImage) || []);

	// Group media items by groupId
	type MediaItem = NonNullable<Project['medias']>[number];
	type MediaGroup = { type: 'group'; groupId: string; items: MediaItem[] };
	type GalleryItem = MediaItem | MediaGroup;

	let galleryItems = $derived.by(() => {
		const items: GalleryItem[] = [];
		const grouped = new Map<string, typeof galleryMedias>();

		for (const media of galleryMedias) {
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

		for (const media of galleryMedias) {
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
		const styles: string[] = [];

		// handle aspect ratio
		if (media.aspectRatio) {
			styles.push(`aspect-ratio: ${media.aspectRatio}`);
		}

		// handle object-position for image/video alignment within container
		// this controls which part of the media is visible when cropped by object-fit: cover
		const justify = media.justify || 'center';
		const align = media.align || 'center';

		// Map align values: 'top' -> 'top', 'center' -> 'center', 'bottom' -> 'bottom'
		// Map justify values: 'left' -> 'left', 'center' -> 'center', 'right' -> 'right'
		styles.push(`object-position: ${justify} ${align}`);

		return styles.join('; ');
	}

	// media columns
	const columnsByCount: Record<number, string> = {
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4'
	};

	$effect(() => {
		if (!heroImage) {
			console.warn('No hero or cover image found for project ' + project.slug);
		}
	});
</script>

{#snippet metadataSection(title: string, items: any[] | undefined)}
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

					<li class="text-sm leading-normal font-normal tracking-wide">
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

<div class="min-h-screen w-full">
	<!-- HERO SECTION -->
	<header class="relative h-[65vh] w-full overflow-hidden">
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
				/>
			{/if}
		{/if}
	</header>

	<!-- MAIN GRID LAYOUT -->
	<main
		class="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 px-6 py-12 md:grid-cols-12 md:gap-16 md:px-12"
	>
		<!-- LEFT COLUMN: STICKY TITLE & METADATA -->
		<aside class="flex h-fit flex-col gap-8 md:col-span-4 lg:sticky lg:top-32">
			<!-- Header Block -->
			<div class="flex flex-col gap-3">
				<h1
					class="text-3xl leading-[0.9] font-semibold tracking-tighter wrap-break-word uppercase md:text-5xl lg:text-6xl"
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

			<!-- Metadata Group -->
			<div class="flex flex-col gap-8">
				{#if project.location}
					<!-- Location -->
					<div class="flex flex-col gap-1">
						<span
							class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
							>Location</span
						>
						<span class="text-sm font-normal tracking-wide">{project.location}</span>
					</div>
				{/if}

				<!-- Team -->
				{#if project.directors?.length || project.collaborators?.length}
					<div class="flex flex-col gap-6">
						{@render metadataSection('Director', project.directors)}
						{@render metadataSection('Collaborators', project.collaborators)}
					</div>
				{/if}

				{@render metadataSection('Supporters', project.supporters)}
				{@render metadataSection('Recognitions', project.awards)}
				{@render metadataSection('Publications', project.publications)}
			</div>
		</aside>

		<!-- RIGHT COLUMN: CONTENT -->
		<article class="flex flex-col gap-20 md:col-span-8">
			<!-- Narrative & Specs -->
			<section>
				<!-- Narrative Text:  -->
				<div class="max-w-none columns-1 gap-12 text-justify text-sm font-light md:columns-2">
					<p class="mt-0">{project.description}</p>
				</div>

				<!-- Contributions Grid -->
				{#if project.contributions && project.contributions.length > 0}
					<div class="mt-8">
						<span
							class="mb-6 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
							>Contributions</span
						>
						<div class="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
							{#each project.contributions as contrib}
								<div class="flex flex-col border-t border-border pt-3">
									<span class="text-xs font-medium tracking-wider text-foreground uppercase"
										>{contrib.description}</span
									>
									<div class="mt-2 flex items-end justify-between">
										<div class="relative -top-1 mr-4 h-px flex-1 bg-muted">
											<div class="h-full bg-primary" style="width: {contrib.percent}%"></div>
										</div>
										<span class="text-[10px] font-bold text-muted-foreground"
											>{contrib.percent}%</span
										>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</section>

			<!-- Gallery -->
			{#if galleryMedias.length > 0}
				<section class="flex flex-col gap-8">
					{#each galleryItems as media}
						{@const items = media.type === 'group' ? media.items : [media]}
						<div
							class={`grid grid-cols-1 gap-6 ${columnsByCount[items.length] || 'md:grid-cols-4'}`}
						>
							{#each items as groupMedia}
								{@const mediaIndex = galleryMedias.indexOf(groupMedia)}
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
											{#if groupMedia.src && groupMedia.fallbackSrc}
												<LazyVideo
													primarySrc={groupMedia.src}
													fallbackSrc={groupMedia.fallbackSrc}
													posterSrc={groupMedia.posterSrc}
													alt={groupMedia.alt}
													class="w-full {groupMedia.aspectRatio ? 'h-full object-cover' : 'h-auto'}"
													style={getMediaStyle(groupMedia)}
												/>
											{:else}
												<!-- Missing Video Fallback or src -->
												<div
													class="flex h-48 w-full items-center justify-center bg-muted text-xs text-destructive"
												>
													Missing video source or fallback source
												</div>
											{/if}
										{/if}
									</div>
									<!-- Captions & Description -->
									<div class="mt-3 flex flex-col gap-2">
										<div
											class="flex items-start justify-between border-t border-transparent pt-1 text-[10px] font-medium tracking-[0.15em] text-muted-foreground/50 uppercase transition-colors group-hover:border-border"
										>
											FIG.{mediaIndex + 1}
											{#if groupMedia.showAlt}
												<span class="line-clamp-1 max-w-[60%] text-right">{groupMedia.alt}</span>
											{/if}
										</div>
										{#if groupMedia.description}
											<p class="text-justify text-xs leading-relaxed text-muted-foreground">
												{groupMedia.description}
											</p>
										{/if}
									</div>
								</figure>
							{/each}
						</div>
					{/each}
				</section>
			{/if}
		</article>
	</main>
</div>
