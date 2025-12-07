<script lang="ts">
	import StandardLayout from '$lib/components/layouts/standard-layout.svelte';
	import Seo from '$lib/components/atoms/seo.svelte';
	import type { PageData } from './$types';
	import type { ImageMedia } from '$lib/types/media';

	export let data: PageData;

	// Get cover image for OG image
	const coverImage = data.project.medias?.find(
		(media): media is ImageMedia => media.type === 'image' && media.isCover === true
	);
	// Image paths already include /projects/ prefix in the data
	const ogImage = coverImage?.src || '/og-image.svg';
</script>

<Seo
	title="{data.project.name} | Zeke Zhang"
	description={data.project.description?.substring(0, 160) ||
		`${data.project.name} - A design project by Zeke Zhang featuring ${data.project.types?.join(', ') || 'architecture and computational design'}.`}
	url="https://zekezhang.com/projects/{data.project.slug}"
	image={ogImage}
	type="article"
	keywords={[
		data.project.name,
		...(data.project.types || []),
		'architecture',
		'computational design',
		'Zeke Zhang'
	]}
	publishedTime="{data.project.year}-01-01"
/>

<div>
	<StandardLayout project={data.project} />
</div>
