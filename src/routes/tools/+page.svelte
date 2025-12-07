<script lang="ts">
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import { toolProjects } from '$lib/data/tools';
	import { GithubIcon } from '$lib/components/icons';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Globe from '@lucide/svelte/icons/globe';
	import Play from '@lucide/svelte/icons/play';
	import { goto } from '$app/navigation';
	import Seo from '$lib/components/atoms/seo.svelte';

	let decoders: Record<string, Decoder> = {};

	function handleCardClick(e: MouseEvent, slug: string) {
		// Don't navigate if clicking on a link inside the card
		if ((e.target as HTMLElement).closest('a[target="_blank"]')) {
			return;
		}
		goto(`/tools/${slug}`);
	}

	function handleKeyDown(e: KeyboardEvent, slug: string) {
		if (e.key === 'Enter') {
			goto(`/tools/${slug}`);
		}
	}
</script>

<Seo
	title="Developer Tools | Zeke Zhang"
	description="Open-source developer tools and software projects by Zeke Zhang. Explore GPT integrations, automation utilities, browser extensions, and computational design tools."
	url="https://zekezhang.com/tools"
	keywords={[
		'developer tools',
		'open source',
		'GPT tools',
		'automation',
		'browser extensions',
		'computational design tools',
		'grasshopper plugins',
		'python tools'
	]}
/>

<main class="min-h-screen px-4 pt-24 pb-16 sm:px-8 lg:px-32 lg:pt-32">
	<!-- Header Section -->
	<div class="mb-8 lg:mb-24">
		<Decoder
			text="DEVELOPER TOOLS"
			className="text-[32px] sm:text-[48px] lg:text-[76px] tracking-tight"
		/>
		<hr class="mt-4 border-primary" />
	</div>

	<!-- Content Grid -->
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
		<!-- Left Column: Label -->
		<div class="hidden lg:col-span-3 lg:block">
			<span class="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase">
				Projects
			</span>
		</div>

		<!-- Right Column: Tools List -->
		<div class="flex flex-col gap-0 lg:col-span-9">
			{#each toolProjects as tool, i (tool.slug)}
				<div
					role="button"
					tabindex="0"
					class="group cursor-pointer border-t border-primary py-6 transition-colors first:border-t-0 hover:bg-muted/30"
					onmouseenter={() => decoders[tool.slug]?.start()}
					onmouseleave={() => decoders[tool.slug]?.stop()}
					onclick={(e) => handleCardClick(e, tool.slug)}
					onkeydown={(e) => handleKeyDown(e, tool.slug)}
				>
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1">
							<div class="flex items-center gap-4">
								<Decoder
									bind:this={decoders[tool.slug]}
									text={tool.name.toUpperCase()}
									trigger="manual"
									variant="shuffle"
									scrambleSpeedMs={30}
									revealSpeedMs={30}
									className="text-lg sm:text-xl lg:text-2xl tracking-tight"
								/>
								<span class="text-sm text-muted-foreground uppercase"
									>{tool.type} // {tool.year}</span
								>
							</div>

							<p
								class="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground first-letter:uppercase sm:text-base"
							>
								{tool.description}
							</p>

							<!-- Technologies -->
							<div class="mt-3 flex flex-wrap gap-2">
								{#each tool.technologies.slice(0, 5) as tech}
									<span
										class="border border-primary/20 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase"
									>
										{tech}
									</span>
								{/each}
								{#if tool.technologies.length > 5}
									<span
										class="border border-primary/20 px-2 py-0.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase"
									>
										+{tool.technologies.length - 5}
									</span>
								{/if}
							</div>

							<!-- Links -->
							<div class="mt-4 flex items-center gap-4">
								{#if tool.repository}
									<a
										href={tool.repository.url}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
										onclick={(e) => e.stopPropagation()}
									>
										<GithubIcon class="h-4 w-4" />
										<span>Source</span>
									</a>
								{/if}
								{#if tool.website}
									<a
										href={tool.website.url}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
										onclick={(e) => e.stopPropagation()}
									>
										<Globe class="h-4 w-4" />
										<span>{tool.website.text}</span>
									</a>
								{/if}
								{#if tool.liveDemo}
									<a
										href={tool.liveDemo.url}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
										onclick={(e) => e.stopPropagation()}
									>
										<Play class="h-4 w-4" />
										<span>Demo</span>
									</a>
								{/if}
							</div>
						</div>

						<ArrowRight class="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
