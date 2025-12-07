<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		image?: string;
		url?: string;
		type?: 'website' | 'article';
		siteName?: string;
		twitterHandle?: string;
		keywords?: string[];
		author?: string;
		publishedTime?: string;
		modifiedTime?: string;
		noindex?: boolean;
	}

	let {
		title = 'Zeke Zhang | Computational Designer & Researcher',
		description = 'Portfolio of Zeke Zhang - Researcher and computational designer working at the intersection of code and architecture. Specializing in algorithmic design, reinforcement learning, and GPU-accelerated workflows.',
		image = '/og-image.png',
		url = 'https://zekezhang.com',
		type = 'website',
		siteName = 'Zeke Zhang Portfolio',
		twitterHandle = '@seanzhang9266',
		keywords = [
			'computational design',
			'architecture',
			'algorithmic design',
			'reinforcement learning',
			'parametric design',
			'grasshopper',
			'rhinoceros',
			'portfolio'
		],
		author = 'Zeke Zhang',
		publishedTime,
		modifiedTime,
		noindex = false
	}: Props = $props();

	// Ensure absolute URL for image
	const absoluteImageUrl = image.startsWith('http') ? image : `${url}${image}`;

	// JSON-LD structured data for Person/Organization
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Zeke Zhang',
		url: url,
		image: absoluteImageUrl,
		jobTitle: 'Computational Designer & Researcher',
		description:
			'Researcher and computational designer working at the intersection of code and architecture.',
		sameAs: [
			'https://github.com/sean1832',
			'https://www.linkedin.com/in/zeke-zhang-3b9a2b191/',
			'https://www.youtube.com/@seanzhang3873',
			'https://www.instagram.com/seanzhang9266/'
		],
		knowsAbout: [
			'Computational Design',
			'Algorithmic Architecture',
			'Reinforcement Learning',
			'GPU Computing',
			'Grasshopper',
			'Rhinoceros 3D',
			'PyTorch',
			'Machine Learning'
		]
	};

	const jsonLdString = JSON.stringify(jsonLd);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords.join(', ')} />
	<meta name="author" content={author} />

	<!-- Robots -->
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={url} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={absoluteImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="en_US" />

	<!-- Article specific (for blog posts/projects) -->
	{#if type === 'article'}
		{#if publishedTime}
			<meta property="article:published_time" content={publishedTime} />
		{/if}
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
		<meta property="article:author" content={author} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteImageUrl} />
	{#if twitterHandle}
		<meta name="twitter:creator" content={twitterHandle} />
	{/if}

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${jsonLdString}</script>`}
</svelte:head>
