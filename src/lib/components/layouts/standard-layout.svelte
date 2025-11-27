<script lang="ts">
	import type { Project } from '$lib/types/project';
	import LazyImage from '$lib/components/molecules/lazy-image.svelte';
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import ExternalLink from '../atoms/external-link.svelte';
	import LazyVideo from '../molecules/lazy-video.svelte';
	import VideoPlayer from '../molecules/video-player.svelte';

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

	$effect(() => {
		if (!heroImage) {
			console.warn('No hero or cover image found for project ' + project.slug);
		}
	});
</script>

<div class="min-h-screen w-full">
	<!-- HERO SECTION -->
	<header class="relative h-[65vh] w-full overflow-hidden">
		{#if heroImage?.type === 'image'}
			<LazyImage filename={heroImage.src} alt={heroImage.alt} class="h-full w-full object-cover " />
		{:else if heroVideo?.type === 'video'}
			{#if heroVideo.src && heroVideo.fallbackSrc}
				<!-- NEW: Path-based video (uses registry) -->
				<LazyVideo
					primarySrc={heroVideo.src}
					fallbackSrc={heroVideo.fallbackSrc}
					posterSrc={heroVideo.posterSrc}
					alt={heroVideo.alt}
					class="h-full w-full object-cover"
				/>
			{:else}
				<!-- Missing Video Fallback or src -->
				<div class="flex h-48 w-full items-center justify-center bg-muted text-xs text-destructive">
					Missing video source or fallback source
				</div>
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
				<!-- Location -->
				<div class="flex flex-col gap-1">
					<span
						class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
						>Location</span
					>
					<span class="text-sm font-normal tracking-wide">{project.location || 'N/A'}</span>
				</div>

				<!-- Team -->
				{#if (project.directors && project.directors.length > 0) || (project.collaborators && project.collaborators.length > 0)}
					<div class="flex flex-col gap-6">
						{#if project.directors && project.directors.length > 0}
							<div>
								<span
									class="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
									>Director</span
								>
								<ul class="flex flex-col gap-1">
									{#each project.directors as dir}
										<li class="text-sm font-normal tracking-wide">
											{#if typeof dir === 'object' && dir.url}
												<a
													href={dir.url}
													target="_blank"
													rel="noreferrer"
													class="decoration-1 underline-offset-4 transition-all hover:underline"
												>
													{dir.text}
												</a>
											{:else}
												{typeof dir === 'string' ? dir : dir.text}
											{/if}
										</li>
									{/each}
								</ul>
							</div>
						{/if}

						{#if project.collaborators && project.collaborators.length > 0}
							<div>
								<span
									class="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
									>Collaborators</span
								>
								<ul class="flex flex-col gap-1">
									{#each project.collaborators as col}
										<li class="text-sm font-normal tracking-wide text-muted-foreground">
											{#if typeof col === 'object' && col.url}
												<a
													href={col.url}
													target="_blank"
													rel="noreferrer"
													class="transition-colors hover:text-foreground"
												>
													{col.text}
												</a>
											{:else}
												{typeof col === 'string' ? col : col.text}
											{/if}
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				{/if}

				<!-- Awards -->
				{#if project.awards && project.awards.length > 0}
					<div class="flex flex-col gap-2">
						<span
							class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
							>Recognition</span
						>
						<ul class="space-y-2">
							{#each project.awards as award}
								<li class="text-sm leading-normal">
									{#if award.url}
										<ExternalLink href={award.url}>
											{award.text}
										</ExternalLink>
									{:else}
										{award.text}
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!--Publications-->
				{#if project.publications && project.publications.length > 0}
					<div class="flex flex-col gap-2">
						<span
							class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase"
							>Publications</span
						>
						<ul class="space-y-2">
							{#each project.publications as publication}
								<li class="text-sm leading-normal">
									{#if publication.url}
										<ExternalLink href={publication.url}>
											{publication.text}
										</ExternalLink>
									{:else}
										{publication.text}
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
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
				<section class="flex flex-col gap-16">
					{#each galleryItems as item}
						{#if item.type === 'group'}
							<!-- Media Group (side-by-side) -->
							<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
								{#each item.items as media}
									{@const mediaIndex = galleryMedias.indexOf(media)}
									<figure class="group w-full">
										<div class="relative overflow-hidden">
											{#if media.type === 'image'}
												<LazyImage
													filename={media.src}
													alt={media.alt}
													class="w-full {media.aspectRatio ? 'h-full object-cover' : 'h-auto'}"
													sizes="40vw"
													style={media.aspectRatio ? `aspect-ratio: ${media.aspectRatio};` : ''}
												/>
											{:else if media.type === 'video'}
												{#if media.src && media.fallbackSrc}
													<LazyVideo
														primarySrc={media.src}
														fallbackSrc={media.fallbackSrc}
														posterSrc={media.posterSrc}
														alt={media.alt}
														class="w-full {media.aspectRatio ? 'h-full object-cover' : 'h-auto'}"
														style={media.aspectRatio ? `aspect-ratio: ${media.aspectRatio};` : ''}
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
										<!-- Captions -->
										<div
											class="mt-3 flex items-start justify-end border-t border-transparent pt-3 text-[10px] font-medium tracking-[0.15em] text-muted-foreground/50 uppercase transition-colors group-hover:border-border"
										>
											{#if media.showAlt}
												<span class="line-clamp-1 max-w-[60%] text-right">{media.alt}</span>
											{/if}
										</div>
									</figure>
								{/each}
							</div>
						{:else}
							<!-- Single Media -->
							{@const mediaIndex = galleryMedias.indexOf(item)}
							<figure class="group w-full">
								<div class="relative overflow-hidden">
									{#if item.type === 'image'}
										<LazyImage
											filename={item.src}
											alt={item.alt}
											class="w-full {item.aspectRatio ? 'h-full object-cover' : 'h-auto'}"
											style={item.aspectRatio ? `aspect-ratio: ${item.aspectRatio};` : ''}
											sizes="40vw"
										/>
									{:else if item.type === 'video'}
										{#if item.src && item.fallbackSrc}
											<LazyVideo
												primarySrc={item.src}
												fallbackSrc={item.fallbackSrc}
												posterSrc={item.posterSrc}
												alt={item.alt}
												class="w-full {item.aspectRatio ? 'h-full object-cover' : 'h-auto'}"
												style={item.aspectRatio ? `aspect-ratio: ${item.aspectRatio};` : ''}
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
								<!-- Captions -->
								<div
									class="mt-3 flex items-start justify-end border-t border-transparent pt-3 text-[10px] font-medium tracking-[0.15em] text-muted-foreground/50 uppercase transition-colors group-hover:border-border"
								>
									{#if item.showAlt}
										<span class="line-clamp-1 max-w-[60%] text-right">{item.alt}</span>
									{/if}
								</div>
							</figure>
						{/if}
					{/each}
				</section>
			{/if}
		</article>
	</main>
</div>
