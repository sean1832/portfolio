<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	interface Props {
		src: string;
		srcset?: string;
		sizes?: string;
		placeholder: string;
		alt: string;
		class?: string;
		durationMs?: number;
	}

	let {
		src,
		srcset,
		placeholder,
		sizes,
		alt,
		class: className,
		durationMs = 600
	}: Props = $props();

	let canvas: HTMLCanvasElement | undefined = $state();
	let imgRef: HTMLImageElement | undefined = $state();
	let containerRef: HTMLImageElement | undefined = $state();

	// state to toggle between canvas (animation) and real img
	let isRevealed = $state(false);
	let isLoaded = $state(false);
	let isDecoded = $state(false);
	let shouldLoad = $state(false); // Controls when to actually load the image

	// progressive duration steps (percentage of original size)
	const STEPS = [0.02, 0.05, 0.1, 0.25, 0.5, 1.0];

	function drawStep(image: HTMLImageElement, scale: number) {
		if (!canvas) return;

		const w = image.naturalWidth;
		const h = image.naturalHeight;

		// resize internal canvas resolution to low-res step
		// max(1, ...) to prevent 0px dimension errors
		canvas.width = Math.max(1, Math.floor(w * scale));
		canvas.height = Math.max(1, Math.floor(h * scale));

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// disable smoothing for hard pixel image
		ctx.imageSmoothingEnabled = false;

		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	}

	function animateReveal() {
		if (!canvas || !imgRef) return;

		let startTime: number | null = null;
		let lastStepIndex = -1;

		const step = (timestamp: number) => {
			if (!startTime) startTime = timestamp;

			// calculate normalized process
			const elapsed = timestamp - startTime;
			const progress = Math.min(elapsed / durationMs, 1.0);

			// map progress to specific discrete step index
			const currentStepIndex = Math.floor(progress * (STEPS.length - 1));

			// perf: only draw if the step changed
			if (currentStepIndex > lastStepIndex && imgRef) {
				drawStep(imgRef, STEPS[currentStepIndex]);
				lastStepIndex = currentStepIndex;
			}

			// loop or finish
			if (progress < 1.0) {
				requestAnimationFrame(step);
			} else {
				// ensure final clear frame is drawn before swapping
				if (imgRef) drawStep(imgRef, 1.0);
				// wait for image to be decoded before revealing
				if (isDecoded) {
					requestAnimationFrame(() => {
						isRevealed = true;
					});
				}
			}
		};

		requestAnimationFrame(step);
	}

	async function onMainImageLoad() {
		isLoaded = true;

		// decode the image first (ensures it's ready to display without jank)
		if (!imgRef) return;

		try {
			await imgRef.decode();
			isDecoded = true;
		} catch (e) {
			// fallback if decode fails
			isDecoded = true;
		}

		// start animation only after image is decoded
		requestAnimationFrame(() => {
			animateReveal();
		});
	}

	onMount(() => {
		// Use Intersection Observer for true lazy loading
		// Images load only when scrolled into view (with 200px margin)
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						shouldLoad = true;
						observer.disconnect(); // Stop observing once triggered
					}
				});
			},
			{
				rootMargin: '200px', // Start loading 200px before entering viewport
				threshold: 0.01 // Trigger as soon as 1% is visible
			}
		);

		if (containerRef) {
			observer.observe(containerRef);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<!--placeholder load first-->
<img
	bind:this={containerRef}
	src={placeholder}
	{alt}
	aria-hidden="true"
	class={cn(className)}
	class:opacity-0={isLoaded}
	style="image-rendering: pixelated;"
/>

<canvas
	bind:this={canvas}
	class={cn(className)}
	class:hidden={!isLoaded || !isDecoded || isRevealed}
	style="image-rendering: pixelated;"
	aria-hidden="true"
></canvas>

<!--actual image - only load when shouldLoad is true-->
{#if shouldLoad}
	<img
		bind:this={imgRef}
		{src}
		{srcset}
		{sizes}
		{alt}
		decoding="async"
		class={cn(className)}
		class:opacity-0={!isRevealed}
		onload={onMainImageLoad}
	/>
{/if}
