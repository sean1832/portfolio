<script lang="ts">
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import GalleryItem from '$lib/components/molecules/gallery-item.svelte';
	import DistortionField from '$lib/components/organisms/distortion-field/distortion-field.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import VeniceAgentVideo from '$lib/assets/projects/venice-bienale-2025/agents-perspective_10sec.mp4';

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
<div id="projects" class="flex min-h-screen items-center justify-center py-8 lg:h-screen">
	<div class="flex items-end p-4 sm:p-8 lg:p-32">
		<div class="relative flex flex-col lg:block">
			<h1 class="mb-4 text-lg lg:absolute lg:top-0 lg:right-full lg:mr-8 lg:mb-0">2025</h1>
			<video
				class="w-full max-w-[800px] lg:w-[800px]"
				src={VeniceAgentVideo}
				autoplay
				loop
				muted
				playsinline
			></video>

			<a href="/" class="w-full max-w-[800px] lg:w-auto">
				<div
					class="mt-4 min-w-100 cursor-pointer lg:absolute lg:bottom-0 lg:left-full lg:mt-0 lg:ml-8"
					role="button"
					tabindex="0"
					onmouseenter={() => decoder?.start()}
					onmouseleave={() => decoder?.stop()}
				>
					<hr class="border-primary" />
					<div class="flex items-center justify-between">
						<Decoder
							bind:this={decoder}
							text="AGENTIC ARCHITECTURE"
							variant="shuffle"
							className="text-base sm:text-lg"
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

<!--gallery-->
<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
	<GalleryItem
		imageSrc="/projects/tectonic-resilience/collage.webp"
		imageAlt="tectonic resilience collage"
		title="TECTONIC RESILIENCE"
		year="2024"
	/>

	<GalleryItem
		imageSrc="/projects/synthetic-dunescapes/section-collage.webp"
		imageAlt="synthetic dunescapes section"
		title="SYNTHETIC DUNESCAPES"
		year="2024"
	/>

	<GalleryItem
		imageSrc="/projects/mongrel-assembly/component-composition.webp"
		imageAlt="mongrel assembly component"
		title="MONGREL ASSEMBLY"
		year="2023"
	/>

	<GalleryItem
		imageSrc="/projects/modular/axo.webp"
		imageAlt="mongrel assembly component"
		title="MODULAR: NATURAL - BUILD"
		year="2022"
	/>

	<GalleryItem
		imageSrc="/projects/on-country/section.webp"
		imageAlt="mongrel assembly component"
		title="SHARA CLARKE"
		year="2021"
	/>

	<GalleryItem
		imageSrc="/projects/terra-form/hero.webp"
		imageAlt="mongrel assembly component"
		title="TERRA // FORM"
		year="2021"
	/>
</div>
