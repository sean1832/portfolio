<script lang="ts">
	import LazyImage from '$lib/components/molecules/lazy-image.svelte';
	import LazyVideo from '$lib/components/molecules/lazy-video.svelte';
	import {
		getMediaStyle,
		getVisualMediaIndex,
		flattenGalleryItems,
		type GalleryItem
	} from './media-utils';

	interface Props {
		galleryItems: GalleryItem[];
	}

	let { galleryItems }: Props = $props();

	// Flatten all media items (expanding groups) and filter out text/code for visual indexing
	let flatVisualMedias = $derived(
		flattenGalleryItems(galleryItems).filter((m) => m.type !== 'text' && m.type !== 'code')
	);

	// Filter gallery items that have visual content (for rendering)
	let visibleGalleryMedias = $derived(galleryItems.filter((media) => media.type !== 'text'));

	// Define grid columns based on number of items
	const columnsByCount: Record<number, string> = {
		1: 'md:grid-cols-1',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3',
		4: 'md:grid-cols-4'
	};
</script>

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
				<div class={`grid grid-cols-1 gap-6 ${columnsByCount[items.length] || 'md:grid-cols-4'}`}>
					{#each items as groupMedia}
						{@const visualIndex = getVisualMediaIndex(groupMedia, flatVisualMedias)}
						<figure class="group w-full">
							<div class="relative overflow-hidden">
								{#if groupMedia.type === 'image'}
									<LazyImage
										src={groupMedia.src}
										alt={groupMedia.alt}
										class="w-full {groupMedia.aspectRatio ? 'h-full object-cover' : 'h-auto'}"
										style={getMediaStyle(groupMedia)}
									/>
								{:else if groupMedia.type === 'video'}
									{#if groupMedia.src}
										<LazyVideo
											primarySrc={groupMedia.src}
											fallbackSrc={groupMedia.fallbackSrc}
											posterSrc={groupMedia.posterSrc}
											alt={groupMedia.alt}
											class="w-full {groupMedia.aspectRatio ? 'h-full object-cover' : 'h-auto'}"
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
