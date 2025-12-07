<script lang="ts">
	import { ZekeZhangIcon } from '$lib/components/icons';
	import { About } from '$lib/data/about';
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import Seo from '$lib/components/atoms/seo.svelte';
</script>

<Seo
	title="About Zeke Zhang | Computational Designer & Researcher"
	description="Learn about Zeke Zhang - Researcher and computational designer working at the intersection of code and architecture. Combining algorithmic design, reinforcement learning, and GPU-accelerated workflows to develop data-driven, resource-efficient design systems."
	url="https://zekezhang.com/about"
	keywords={[
		'Zeke Zhang',
		'computational designer',
		'architecture researcher',
		'algorithmic design',
		'reinforcement learning',
		'grasshopper developer',
		'rhinoceros 3d',
		'parametric architecture'
	]}
/>

<main class="min-h-screen px-4 pt-24 pb-16 sm:px-8 lg:px-32 lg:pt-32">
	<!-- Header Section -->
	<div class="mb-16 lg:mb-24">
		<Decoder
			text={About.name.toUpperCase()}
			className="text-[32px] sm:text-[48px] lg:text-[76px] tracking-tight"
		/>
		<hr class="mt-4 border-primary" />
	</div>

	<!-- Content Grid -->
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
		<!-- Left Column: Label -->
		<div class="lg:col-span-3">
			<span class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase">
				About
			</span>
		</div>

		<!-- Right Column: Bio -->
		<div class="lg:col-span-9">
			<p class="max-w-2xl text-justify text-base leading-relaxed sm:text-lg lg:text-xl">
				{About.description}
			</p>
		</div>
	</div>

	<!-- Links Section -->
	{#if About.links && About.links.length > 0}
		<div class="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
			<!-- Left Column: Label -->
			<div class="lg:col-span-3">
				<span class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase">
					Links
				</span>
			</div>

			<!-- Right Column: Link List -->
			<div class="flex flex-col gap-3 lg:col-span-9">
				{#each About.links as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-3 hover:underline hover:underline-offset-4"
					>
						{#if link.icon}
							<svelte:component this={link.icon} class="h-5 w-5" />
						{/if}
						<Decoder
							text={link.label.toUpperCase()}
							trigger="hover"
							variant="shuffle"
							scrambleSpeedMs={40}
							revealSpeedMs={40}
							className="text-base sm:text-lg"
						/>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</main>
