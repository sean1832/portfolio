<script lang="ts">
	import type { Project } from '$lib/types/project';
	import LazyImage from '$lib/components/molecules/lazy-image.svelte';
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import ExternalLink from '../atoms/external-link.svelte';

	let { project }: { project: Project } = $props();

	// Derived state for images
	let heroImage = $derived(
		project.medias?.find((media) => media.isHero && media.type === 'image') ||
			project.medias?.find((media) => media.isCover && media.type === 'image')
	);

	// Filter out the hero image from the gallery list
	let galleryImages = $derived(
		project.medias?.filter((media) => media !== heroImage && media.type === 'image') || []
	);

	$effect(() => {
		if (!heroImage) {
			console.warn('No hero or cover image found for project ' + project.slug);
		}
	});
</script>

<div class="min-h-screen w-full">
	<!-- HERO SECTION -->
	<header class="relative h-[65vh] w-full overflow-hidden">
		{#if heroImage}
			<LazyImage filename={heroImage.src} alt={heroImage.alt} class="h-full w-full object-cover " />
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
			{#if galleryImages.length > 0}
				<section class="flex flex-col gap-24">
					{#each galleryImages as image, i}
						<figure class="group w-full">
							<div class="relative overflow-hidden">
								<LazyImage
									filename={image.src}
									alt={image.alt}
									class="h-auto w-full "
									sizes="75vw"
								/>
							</div>
							<!-- Captions -->
							<div
								class="mt-3 flex items-start justify-between border-t border-transparent pt-3 text-[10px] font-medium tracking-[0.15em] text-muted-foreground/50 uppercase transition-colors group-hover:border-border"
							>
								<span>FIG.{String(i + 1).padStart(2, '0')}</span>
								{#if image.showAlt}
									<span class="line-clamp-1 max-w-[60%] text-right">{image.alt}</span>
								{/if}
							</div>
						</figure>
					{/each}
				</section>
			{/if}
		</article>
	</main>
</div>
