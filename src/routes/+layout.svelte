<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/organisms/navbar/navbar.svelte';
	import '@fontsource-variable/geist';
	import '@fontsource-variable/geist-mono';
	import Footer from '$lib/components/organisms/footer/footer.svelte';
	import Seo from '$lib/components/atoms/seo.svelte';

	let { children } = $props();
</script>

<!-- Default SEO - can be overridden by individual pages -->
<Seo />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
{@render children()}
<Footer />
