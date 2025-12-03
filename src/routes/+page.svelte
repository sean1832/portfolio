<script lang="ts">
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import GalleryItem from '$lib/components/molecules/gallery-item.svelte';
	import DistortionField from '$lib/components/organisms/distortion-field/distortion-field.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { designProjects, featureProjectWithVideo } from '$lib/data/designs';
	import LazyVideo from '$lib/components/molecules/lazy-video.svelte';

	let decoder: Decoder;

	let windowWidth = 1024;
	if (typeof window !== 'undefined') {
		windowWidth = window.innerWidth;
	}

	let gridSpacing = 45;
	let pointSize = 3;
	// mobile
	if (windowWidth < 640) {
		gridSpacing = 35;
		pointSize = 3;
	}

	const featureVideoMedia = featureProjectWithVideo?.medias?.find(
		(media) => media.isCover && media.type === 'video'
	);
</script>

<!--hero-->
<div class="relative flex h-screen w-full flex-col overflow-hidden">
	<DistortionField
		class="inset-0 h-[75vh] w-full"
		{gridSpacing}
		{pointSize}
		mouseForce={300}
		mouseRadius={200}
		color="#000000"
		backgroundColor="#ffffff"
		pointVariant="square"
	/>

	<Decoder
		text="ZEKE ZHANG"
		className="relative z-10 text-[32px] sm:text-[48px] lg:text-[76px] ml-4 mt-6"
	/>
	<Decoder
		text={[
			'INTELLIGENT SYNTHESIS',
			'ALGORITHMIC MORPHOGENESIS',
			'AUTONOMOUS MATERIAL RECONSTRUCTION',
			'LOW-TECH ASSEMBLY CRAFT',
			'DIFFUSION TECTONICS'
		]}
		className="relative z-10 text-[18px] sm:text-[28px] lg:text-[48px] ml-4 sm:ml-16 lg:ml-72"
	/>
</div>

<!--feature work-->
{#if featureProjectWithVideo}
	<div id="projects" class="flex min-h-screen items-center justify-center py-8 lg:h-screen">
		<div class="flex items-end p-4 sm:p-8 lg:p-32">
			<div class="relative flex flex-col lg:block">
				<h1 class="mb-4 text-lg lg:absolute lg:top-0 lg:right-full lg:mr-8 lg:mb-0">
					{featureProjectWithVideo.year}
				</h1>
				<a
					href="/projects/{featureProjectWithVideo.slug}"
					class="w-full max-w-[800px] lg:w-auto"
					tabindex="0"
					role="button"
					onmouseenter={() => decoder?.start()}
					onmouseleave={() => decoder?.stop()}
				>
					{#if featureVideoMedia}
						<LazyVideo
							primarySrc={featureVideoMedia.src}
							fallbackSrc={featureVideoMedia.fallbackSrc || ''}
							posterSrc={featureVideoMedia.posterSrc || ''}
							alt={featureVideoMedia.alt}
							class="w-full max-w-[800px] lg:w-[800px]"
						/>
					{/if}

					<div
						class="mt-4 min-w-100 cursor-pointer lg:absolute lg:bottom-0 lg:left-full lg:mt-0 lg:ml-8"
					>
						<hr class="border-primary" />
						<div class="flex items-center justify-between">
							<Decoder
								bind:this={decoder}
								text={featureProjectWithVideo.shortName || featureProjectWithVideo.name}
								variant="shuffle"
								className="text-base sm:text-lg uppercase"
								trigger="manual"
								revealSpeedMs={30}
								scrambleSpeedMs={30}
							/>
							<ArrowRight class="h-5 w-5" />
						</div>
					</div>
				</a>
			</div>
		</div>
	</div>
{/if}

<!--gallery-->
<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
	{#each designProjects as project (project.slug)}
		{#if project.medias && project.medias.find((media) => media.isCover && media.type === 'image')}
			<GalleryItem
				imageSrc={project.medias.find((media) => media.isCover)?.src || ''}
				imageAlt={project.medias.find((media) => media.isCover)?.alt || ''}
				title={project.name}
				year={project.year.toString()}
				href={`/projects/${project.slug}`}
			/>
		{/if}
	{/each}
</div>
