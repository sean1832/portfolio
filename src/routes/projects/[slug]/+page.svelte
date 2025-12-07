<script lang="ts">
	import Seo from '$lib/components/atoms/seo.svelte';
	import type { PageData } from './$types';
	import type { ImageMedia } from '$lib/types/media';
	import { onMount, onDestroy } from 'svelte';
	import { navbarState } from '$lib/hooks/navbar-state.svelte';
	import Info from '@lucide/svelte/icons/info';
	import * as Drawer from '$lib/components/ui/drawer';

	import {
		ProjectHero,
		ProjectHeader,
		ProjectDescription,
		ProjectMetadata,
		ProjectContributions,
		ProjectGallery,
		MediaUtils
	} from './_components';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	const project = data.project;

	// ======================
	// SEO
	// ======================
	// Get cover image for OG image
	const coverImage = project.medias?.find(
		(media): media is ImageMedia => media.type === 'image' && media.isCover === true
	);
	// Image paths already include /projects/ prefix in the data
	const ogImage = coverImage?.src || '/og-image.svg';

	// ======================
	// State and Derived
	// ======================
	// Bind hero element for height calculation
	let heroElement: HTMLElement | undefined = $state();

	// Drawer state for mobile metadata
	let isDrawerOpen = $state(false);

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

	// Filter out the hero media from the gallery list and group by groupId
	let visibleGalleryMedias = $derived(
		project.medias?.filter((media) => media !== heroMedia && !media.isHiddenGallery) || []
	);

	let galleryItems = $derived(MediaUtils.groupMediaItems(visibleGalleryMedias));

	$effect(() => {
		if (!heroMedia) {
			console.warn('No hero or cover media found for project ' + project.slug);
		}
	});
</script>

<Seo
	title="{project.name} | Zeke Zhang"
	description={project.description?.substring(0, 160) ||
		`${project.name} - A design project by Zeke Zhang featuring ${project.types?.join(', ') || 'architecture and computational design'}.`}
	url="https://zekezhang.com/projects/{project.slug}"
	image={ogImage}
	type="article"
	keywords={[
		project.name,
		...(project.types || []),
		'architecture',
		'computational design',
		'Zeke Zhang'
	]}
	publishedTime="{project.year}-01-01"
/>

<div class="min-h-screen w-full">
	<!-- HERO SECTION -->
	<header
		bind:this={heroElement}
		class={`relative w-full overflow-hidden ${project.layout === 'standard' ? 'h-[65vh]' : 'h-screen'}`}
	>
		<ProjectHero media={heroMedia} />
	</header>

	<!-- MAIN GRID LAYOUT -->
	<main
		class="mx-auto grid max-w-[1800px] grid-cols-1 gap-8 px-6 py-8 md:grid-cols-12 md:gap-16 md:px-12 md:py-12"
	>
		<!-- MOBILE: Compact header with title only -->
		<div class="flex flex-col gap-4 md:hidden">
			<!-- Header Block -->
			<ProjectHeader {project} />
			<ProjectDescription {project} collapse />

			<!-- Mobile: Compact contributions -->
			<ProjectContributions {project} compact />

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
		<aside
			class="hidden h-fit max-h-[calc(100vh-10rem)] flex-col gap-8 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] md:col-span-4 md:flex lg:sticky lg:top-32 [&::-webkit-scrollbar]:hidden"
		>
			<!-- Header Block -->
			<ProjectHeader {project} size="large" />
			<!-- Desktop: Full Metadata Group -->
			<ProjectMetadata {project} />
		</aside>

		<!-- RIGHT COLUMN: CONTENT (Gallery) -->
		<article class="flex flex-col gap-12 md:col-span-8 md:gap-20">
			<!-- Desktop only: Narrative & Contributions -->
			<section class="hidden md:block">
				<ProjectDescription {project} />
				<div class="mt-8">
					<ProjectContributions {project} />
				</div>
			</section>
			<ProjectGallery {galleryItems} />
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
					<ProjectMetadata {project} />
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>
