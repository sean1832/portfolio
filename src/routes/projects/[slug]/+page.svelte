<script lang="ts">
	import StandardLayout from '$lib/components/layouts/standard-layout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.project.name} | Zeke Zhang</title>
</svelte:head>

<div>
	<StandardLayout project={data.project} />
</div>
