<script lang="ts">
	import { page } from '$app/stores';
	import Decoder from '$lib/components/molecules/decoder.svelte';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	const errorMessages: Record<number, { title: string; message: string }> = {
		400: {
			title: 'Bad Request',
			message: 'The request could not be understood. Please check the URL and try again.'
		},
		401: {
			title: 'Unauthorized',
			message: 'You need to be authenticated to access this resource.'
		},
		403: {
			title: 'Forbidden',
			message: 'You do not have permission to access this resource.'
		},
		404: {
			title: 'Not Found',
			message: 'The page you are looking for does not exist or has been moved.'
		},
		500: {
			title: 'Internal Error',
			message: 'Something unexpected happened on our end. Please try again later.'
		},
		503: {
			title: 'Service Unavailable',
			message: 'The service is temporarily unavailable. Please try again later.'
		}
	};

	$effect(() => {
		// Update page title
		document.title = `${$page.status} - Zeke Zhang`;
	});

	const status = $derived($page.status);
	const errorInfo = $derived(
		errorMessages[status] || {
			title: 'Error',
			message: $page.error?.message || 'An unexpected error occurred.'
		}
	);
</script>

<main class="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-4 py-16">
	<div class="text-center">
		<!-- Error Code with Decoder Effect -->
		<div class="relative mb-6">
			<Decoder
				text={status.toString()}
				className="text-[80px] sm:text-[120px] lg:text-[180px] font-bold leading-none tracking-tighter"
				revealSpeedMs={80}
				scrambleSpeedMs={40}
				trigger="load"
				loop={false}
			/>
			<div
				class="absolute bottom-0 left-1/2 h-0.5 w-[60%] -translate-x-1/2 translate-y-2 bg-foreground"
			></div>
		</div>

		<!-- Error Title -->
		<h2 class="mb-4 text-xl font-medium tracking-widest uppercase sm:text-2xl lg:text-3xl">
			{errorInfo.title}
		</h2>

		<!-- Error Message -->
		<p class="mx-auto mb-8 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
			{errorInfo.message}
		</p>

		<!-- Back to Home Link -->
		<a
			href="/"
			class="group inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
		>
			<ArrowLeft class="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
			Return Home
		</a>
	</div>
</main>
